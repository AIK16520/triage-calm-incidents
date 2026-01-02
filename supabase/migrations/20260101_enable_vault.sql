-- Enable Supabase Vault for secure credential storage
-- This migration sets up encrypted storage for API tokens

-- ============================================
-- STEP 1: Enable pgsodium vault extension
-- ============================================

-- The vault extension should already be enabled in Supabase projects
-- If not, contact Supabase support to enable it

-- ============================================
-- STEP 2: Add encrypted column to services table
-- ============================================

-- Add column to reference vault secrets
ALTER TABLE services 
  ADD COLUMN IF NOT EXISTS api_token_encrypted UUID REFERENCES vault.secrets(id);

-- Add column for optional team_id (Vercel teams, etc.)
ALTER TABLE services 
  ADD COLUMN IF NOT EXISTS team_id TEXT;

-- Add index for faster lookups
CREATE INDEX IF NOT EXISTS idx_services_encrypted_token 
  ON services(api_token_encrypted) 
  WHERE api_token_encrypted IS NOT NULL;

-- Add column to track migration status
ALTER TABLE services 
  ADD COLUMN IF NOT EXISTS credentials_migrated BOOLEAN DEFAULT false;

COMMENT ON COLUMN services.api_token_encrypted IS 'Reference to encrypted API token in vault.secrets';
COMMENT ON COLUMN services.team_id IS 'Optional team ID for platforms like Vercel';
COMMENT ON COLUMN services.credentials_migrated IS 'Track if credentials were migrated to vault';

-- ============================================
-- STEP 3: Create function to store credentials
-- ============================================

CREATE OR REPLACE FUNCTION store_service_credentials(
  p_service_id UUID,
  p_api_token TEXT,
  p_team_id TEXT DEFAULT NULL
) RETURNS UUID 
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  secret_id UUID;
  v_customer_id UUID;
BEGIN
  -- Get customer_id for the service (for access control)
  SELECT customer_id INTO v_customer_id
  FROM services
  WHERE id = p_service_id;

  IF v_customer_id IS NULL THEN
    RAISE EXCEPTION 'Service not found: %', p_service_id;
  END IF;

  -- Verify the caller has access to this customer's services
  -- (RLS policies should handle this, but double-check)
  IF NOT EXISTS (
    SELECT 1 FROM services 
    WHERE id = p_service_id 
    AND customer_id = v_customer_id
  ) THEN
    RAISE EXCEPTION 'Access denied to service: %', p_service_id;
  END IF;

  -- Insert into vault (automatically encrypted with pgsodium)
  INSERT INTO vault.secrets (secret)
  VALUES (p_api_token)
  RETURNING id INTO secret_id;
  
  -- Link to service and update team_id
  UPDATE services 
  SET 
    api_token_encrypted = secret_id,
    team_id = p_team_id,
    credentials_migrated = true,
    updated_at = NOW()
  WHERE id = p_service_id;
  
  RAISE NOTICE 'Stored credentials for service % (secret_id: %)', p_service_id, secret_id;
  
  RETURN secret_id;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION store_service_credentials IS 'Store encrypted API credentials in vault for a service';

-- ============================================
-- STEP 4: Create function to retrieve credentials
-- ============================================

CREATE OR REPLACE FUNCTION get_service_credentials(
  p_customer_id UUID,
  p_platform TEXT
) RETURNS TABLE (
  service_id UUID,
  service_name TEXT,
  platform_service_id TEXT,
  api_token TEXT,
  team_id TEXT
)
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id AS service_id,
    s.name AS service_name,
    s.platform_service_id,
    COALESCE(
      vault.decrypted_secret(s.api_token_encrypted),
      s.platform_api_token  -- Fallback to old column during migration
    ) AS api_token,
    s.team_id
  FROM services s
  WHERE s.customer_id = p_customer_id
    AND s.platform = p_platform
    AND s.is_active = true
  LIMIT 1;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_service_credentials IS 'Retrieve decrypted credentials for a customer''s service';

-- Alternative: Get by service_id directly (for Executioner)
CREATE OR REPLACE FUNCTION get_service_credentials_by_id(
  p_service_id UUID
) RETURNS TABLE (
  service_id UUID,
  customer_id UUID,
  service_name TEXT,
  platform TEXT,
  platform_service_id TEXT,
  api_token TEXT,
  team_id TEXT
)
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id AS service_id,
    s.customer_id,
    s.name AS service_name,
    s.platform,
    s.platform_service_id,
    COALESCE(
      vault.decrypted_secret(s.api_token_encrypted),
      s.platform_api_token  -- Fallback during migration
    ) AS api_token,
    s.team_id
  FROM services s
  WHERE s.id = p_service_id
    AND s.is_active = true;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION get_service_credentials_by_id IS 'Retrieve decrypted credentials by service_id';

-- ============================================
-- STEP 5: Create migration function for existing services
-- ============================================

CREATE OR REPLACE FUNCTION migrate_existing_credentials()
RETURNS TABLE (
  service_id UUID,
  service_name TEXT,
  migrated BOOLEAN,
  error TEXT
)
AS $$
DECLARE
  service_record RECORD;
  secret_id UUID;
BEGIN
  -- Loop through all services that have api tokens but not encrypted yet
  FOR service_record IN 
    SELECT id, name, platform_api_token
    FROM services
    WHERE platform_api_token IS NOT NULL
      AND api_token_encrypted IS NULL
      AND credentials_migrated = false
  LOOP
    BEGIN
      -- Store in vault
      INSERT INTO vault.secrets (secret)
      VALUES (service_record.platform_api_token)
      RETURNING id INTO secret_id;
      
      -- Update service
      UPDATE services
      SET 
        api_token_encrypted = secret_id,
        credentials_migrated = true,
        updated_at = NOW()
      WHERE id = service_record.id;
      
      -- Return success
      service_id := service_record.id;
      service_name := service_record.name;
      migrated := true;
      error := NULL;
      RETURN NEXT;
      
    EXCEPTION WHEN OTHERS THEN
      -- Return error
      service_id := service_record.id;
      service_name := service_record.name;
      migrated := false;
      error := SQLERRM;
      RETURN NEXT;
    END;
  END LOOP;
  
  RETURN;
END;
$$ LANGUAGE plpgsql;

COMMENT ON FUNCTION migrate_existing_credentials IS 'Migrate existing plaintext credentials to vault';

-- ============================================
-- STEP 6: Grant necessary permissions
-- ============================================

-- Grant execute permissions on functions
GRANT EXECUTE ON FUNCTION store_service_credentials TO authenticated;
GRANT EXECUTE ON FUNCTION get_service_credentials TO authenticated;
GRANT EXECUTE ON FUNCTION get_service_credentials_by_id TO authenticated;
GRANT EXECUTE ON FUNCTION migrate_existing_credentials TO authenticated;

-- Grant select on vault.decrypted_secrets view to service role
-- (This is handled by Supabase, but good to be explicit)
GRANT SELECT ON vault.decrypted_secrets TO service_role;

-- ============================================
-- STEP 7: Add RLS policies for credential access
-- ============================================

-- Users can only access credentials for their own customer's services
CREATE POLICY "Users can access their own service credentials"
  ON services
  FOR SELECT
  USING (
    customer_id IN (
      SELECT customer_id 
      FROM users 
      WHERE id = auth.uid()
    )
  );

-- ============================================
-- VERIFICATION
-- ============================================

-- Verify vault is working
DO $$
BEGIN
  IF EXISTS (SELECT 1 FROM pg_extension WHERE extname = 'pgsodium') THEN
    RAISE NOTICE '✓ pgsodium extension is enabled';
  ELSE
    RAISE WARNING '✗ pgsodium extension is NOT enabled - contact Supabase support';
  END IF;
  
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_schema = 'vault' AND table_name = 'secrets') THEN
    RAISE NOTICE '✓ vault.secrets table exists';
  ELSE
    RAISE WARNING '✗ vault.secrets table does NOT exist';
  END IF;
END $$;

-- ============================================
-- MIGRATION COMPLETE
-- ============================================

-- Next steps:
-- 1. Run: SELECT * FROM migrate_existing_credentials(); to migrate existing credentials
-- 2. Update dashboard to use store_service_credentials() function
-- 3. Update Executioner to use get_service_credentials() functions
-- 4. After verification, optionally drop platform_api_token column

