-- =============================================
-- QUICK FIX: Just add RLS policy to existing table
-- If you already created access_codes table
-- =============================================

-- 1. Enable RLS on the table
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policy if any (to avoid conflicts)
DROP POLICY IF EXISTS "Allow anonymous read for validation" ON access_codes;
DROP POLICY IF EXISTS "Allow anonymous read access codes for validation" ON access_codes;

-- 3. Create new policy allowing anyone to READ access codes
CREATE POLICY "Allow anonymous read for validation"
ON access_codes
FOR SELECT
TO anon, authenticated
USING (true);

-- 4. Verify the code you inserted
SELECT
  code,
  company_name,
  max_users,
  current_users,
  is_active,
  expires_at
FROM access_codes
WHERE code = 'TRIAFE2024' OR code = 'TRIAGE2024';

-- 5. If current_users column doesn't exist, add it
ALTER TABLE access_codes
ADD COLUMN IF NOT EXISTS current_users INTEGER DEFAULT 0;

-- 6. If is_active isn't set, update it
UPDATE access_codes
SET is_active = true
WHERE is_active IS NULL;

-- 7. Check all policies
SELECT
  schemaname,
  tablename,
  policyname,
  cmd,
  roles,
  qual
FROM pg_policies
WHERE tablename = 'access_codes';
