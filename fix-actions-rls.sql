-- Fix RLS policies for Actions page to show commands

-- Check if commands table exists and has data
-- SELECT COUNT(*) FROM commands;

-- Drop existing policies if any
DROP POLICY IF EXISTS "Users can view their own commands" ON commands;
DROP POLICY IF EXISTS "Users can view their customer's commands" ON commands;

-- Enable RLS on commands table
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view commands for their customer's services
-- This handles both service_id-linked and direct customer_id-linked commands
CREATE POLICY "Users can view their customer's commands"
  ON commands
  FOR SELECT
  TO authenticated
  USING (
    -- Check via service_id
    service_id IN (
      SELECT s.id
      FROM services s
      INNER JOIN users u ON u.customer_id = s.customer_id
      WHERE u.id = auth.uid()
    )
    OR
    -- Check via direct customer_id (for records without service_id)
    customer_id IN (
      SELECT customer_id
      FROM users
      WHERE id = auth.uid()
    )
  );

-- Allow service role full access (for Executioner)
CREATE POLICY "Service role has full access to commands"
  ON commands
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Also make sure services table has proper RLS for the join
DROP POLICY IF EXISTS "Users can view their customer's services" ON services;

CREATE POLICY "Users can view their customer's services"
  ON services
  FOR SELECT
  TO authenticated
  USING (
    customer_id IN (
      SELECT customer_id 
      FROM users 
      WHERE id = auth.uid()
    )
  );

-- =============================================
-- FIX INCIDENT_OUTCOMES TABLE RLS
-- =============================================

DROP POLICY IF EXISTS "Users can view their customer's incidents" ON incident_outcomes;
DROP POLICY IF EXISTS "Users can read own customer incidents" ON incident_outcomes;

-- Enable RLS on incident_outcomes table
ALTER TABLE incident_outcomes ENABLE ROW LEVEL SECURITY;

-- Allow authenticated users to view incidents for their customer's services
CREATE POLICY "Users can view their customer's incidents"
  ON incident_outcomes
  FOR SELECT
  TO authenticated
  USING (
    -- Check via service_id
    service_id IN (
      SELECT s.id
      FROM services s
      INNER JOIN users u ON u.customer_id = s.customer_id
      WHERE u.id = auth.uid()
    )
    OR
    -- Check via direct customer_id (for records without service_id)
    customer_id IN (
      SELECT customer_id
      FROM users
      WHERE id = auth.uid()
    )
  );

-- Allow service role full access (for backend services)
CREATE POLICY "Service role has full access to incidents"
  ON incident_outcomes
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- =============================================
-- FIX ORPHANED RECORDS (NULL customer_id)
-- =============================================

-- First, check if you have orphaned records
-- SELECT COUNT(*) FROM commands WHERE customer_id IS NULL;
-- SELECT COUNT(*) FROM incident_outcomes WHERE customer_id IS NULL;

-- Get your customer_id
-- SELECT customer_id FROM users WHERE id = auth.uid();

-- Option 1: Update orphaned commands to your customer_id
-- Replace 'YOUR_CUSTOMER_ID_HERE' with the actual UUID from the query above
-- UPDATE commands
-- SET customer_id = 'YOUR_CUSTOMER_ID_HERE'
-- WHERE customer_id IS NULL;

-- Option 2: Delete orphaned records (if they're just test data)
-- DELETE FROM commands WHERE customer_id IS NULL;
-- DELETE FROM incident_outcomes WHERE customer_id IS NULL;

-- =============================================
-- TEST QUERIES
-- =============================================

-- Test query for commands (run this after applying policies)
-- SELECT
--   c.command_id,
--   c.action,
--   c.status,
--   c.queued_at,
--   s.name as service_name
-- FROM commands c
-- LEFT JOIN services s ON s.id = c.service_id
-- ORDER BY c.queued_at DESC
-- LIMIT 10;

-- Test query for incidents (run this after applying policies)
-- SELECT
--   i.id,
--   i.root_cause,
--   i.action_taken,
--   i.incident_resolved,
--   s.name as service_name
-- FROM incident_outcomes i
-- LEFT JOIN services s ON s.id = i.service_id
-- ORDER BY i.created_at DESC
-- LIMIT 10;

