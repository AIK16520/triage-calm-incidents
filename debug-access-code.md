# Debug Access Code Issue

## Most Likely Issue: RLS Policy

The `access_codes` table likely has RLS enabled but no policy allowing **anonymous/public reads**.

## Solution: Add RLS Policy for Anonymous Access Code Validation

Run this SQL in your Supabase SQL Editor:

```sql
-- Enable RLS on access_codes (if not already enabled)
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

-- Allow ANYONE (including non-logged-in users) to READ access codes
-- This is safe because they can only read, not modify
CREATE POLICY "Allow anonymous read access codes for validation"
ON access_codes
FOR SELECT
TO anon, authenticated
USING (true);
```

## Alternative: Check if code exists

Run this in Supabase SQL Editor to verify your code exists:

```sql
SELECT * FROM access_codes WHERE code = 'TRIAGE2024';
```

If it returns nothing, insert it:

```sql
INSERT INTO access_codes (code, company_name, max_users, is_active, current_users)
VALUES ('TRIAGE2024', 'Triage Test Company', 10, true, 0);
```

## Check current RLS policies

```sql
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'access_codes';
```

## Test the exact query being used

```sql
-- This mimics what the signup form does
SELECT *
FROM access_codes
WHERE code = 'TRIAGE2024'
  AND is_active = true;
```

## Common Issues:

1. ✅ **RLS blocking anonymous access** (most common) - Add SELECT policy above
2. ❌ Code inserted as lowercase but query searches uppercase
3. ❌ `is_active` is NULL instead of TRUE
4. ❌ Code doesn't exist in database

## After fixing, test with these values:

- Code: `TRIAGE2024` (will auto-uppercase to match)
- Or: `triage2024` (will auto-uppercase)
- Or: `triafe2024` (if that's what you actually inserted)
