-- =============================================
-- FIX ACCESS_CODES RLS FOR SIGNUP PAGE
-- This allows anonymous users to validate access codes during signup
-- =============================================

-- Enable RLS on access_codes (should already be enabled)
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies to avoid conflicts
DROP POLICY IF EXISTS "Allow anonymous read for validation" ON access_codes;
DROP POLICY IF EXISTS "Allow anonymous read access codes for validation" ON access_codes;
DROP POLICY IF EXISTS "anon_read_access_codes" ON access_codes;

-- Create policy allowing ANONYMOUS users to read access codes
-- This is needed for the signup page to validate codes BEFORE user is authenticated
CREATE POLICY "anon_read_access_codes"
ON access_codes
FOR SELECT
TO anon, authenticated
USING (true);

-- Verify the policy was created
SELECT
  schemaname,
  tablename,
  policyname,
  cmd,
  roles,
  qual
FROM pg_policies
WHERE tablename = 'access_codes';

-- Test query to verify access (this should work now)
SELECT
  code,
  company_name,
  max_users,
  current_users,
  is_active
FROM access_codes
WHERE is_active = true;
