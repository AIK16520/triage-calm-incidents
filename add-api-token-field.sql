-- ============================================
-- Add API Token Storage to Services Table
-- ============================================
-- Run this in Supabase SQL Editor to complete the service setup flow

-- Option 1: Simple (Plain Text - NOT RECOMMENDED for production)
-- Only use for development/testing
ALTER TABLE services
ADD COLUMN IF NOT EXISTS platform_api_token TEXT;

COMMENT ON COLUMN services.platform_api_token IS 'Platform API token for executing actions (should be encrypted in production)';

-- Option 2: Encrypted (RECOMMENDED for production)
-- Enable pgcrypto extension first
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Add encrypted column
ALTER TABLE services
ADD COLUMN IF NOT EXISTS encrypted_api_token BYTEA;

-- Create encryption helper function
CREATE OR REPLACE FUNCTION encrypt_service_token(
    p_service_id UUID,
    p_token TEXT,
    p_encryption_key TEXT
)
RETURNS void AS $$
BEGIN
    UPDATE services
    SET encrypted_api_token = pgp_sym_encrypt(p_token, p_encryption_key)
    WHERE id = p_service_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create decryption helper function (backend use only)
CREATE OR REPLACE FUNCTION decrypt_service_token(
    p_service_id UUID,
    p_encryption_key TEXT
)
RETURNS TEXT AS $$
DECLARE
    decrypted_token TEXT;
BEGIN
    SELECT pgp_sym_decrypt(encrypted_api_token, p_encryption_key)
    INTO decrypted_token
    FROM services
    WHERE id = p_service_id;

    RETURN decrypted_token;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update RLS policy to exclude API tokens from SELECT
-- This prevents clients from reading raw tokens
DROP POLICY IF EXISTS "Users can read own customer services" ON services;

CREATE POLICY "Users can read own customer services"
ON services
FOR SELECT
TO authenticated
USING (
  customer_id IN (
    SELECT customer_id FROM users WHERE id = auth.uid()
  )
);

-- Add note: The column 'platform_api_token' or 'encrypted_api_token'
-- should be excluded from SELECT queries in application code

-- ============================================
-- Verification
-- ============================================

-- Check column exists
SELECT
    column_name,
    data_type,
    is_nullable
FROM information_schema.columns
WHERE table_name = 'services'
    AND column_name IN ('platform_api_token', 'encrypted_api_token');

-- ============================================
-- Usage Example (in application code)
-- ============================================

/*
For plain text (development only):
```typescript
const { data: service } = await supabase
  .from('services')
  .insert({
    name: 'My Service',
    platform: 'vercel',
    platform_service_id: 'prj_123',
    platform_api_token: apiToken,  // Add this field
    webhook_secret: crypto.randomUUID(),
    is_active: true
  })
```

For encrypted (production):
```typescript
// 1. Insert service without token
const { data: service } = await supabase
  .from('services')
  .insert({...})
  .select()
  .single()

// 2. Encrypt and store token via RPC
await supabase.rpc('encrypt_service_token', {
  p_service_id: service.id,
  p_token: apiToken,
  p_encryption_key: process.env.ENCRYPTION_KEY
})
```

For retrieving (backend only):
```typescript
const { data: decryptedToken } = await supabase
  .rpc('decrypt_service_token', {
    p_service_id: serviceId,
    p_encryption_key: process.env.ENCRYPTION_KEY
  })
```
*/
