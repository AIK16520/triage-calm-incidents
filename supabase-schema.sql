-- =============================================
-- TRIAGE DATABASE SCHEMA
-- Complete schema for the Triage application
-- Run this in Supabase SQL Editor
-- =============================================

-- =============================================
-- 1. ACCESS CODES TABLE
-- For managing signup access during private beta
-- =============================================
CREATE TABLE IF NOT EXISTS access_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  company_name TEXT NOT NULL,
  max_users INTEGER NOT NULL DEFAULT 10,
  current_users INTEGER NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  expires_at TIMESTAMP WITH TIME ZONE,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE access_codes ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to read access codes (for signup validation)
CREATE POLICY "Allow anonymous read for validation"
ON access_codes
FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated admins can modify (add later)
CREATE POLICY "Allow authenticated update"
ON access_codes
FOR UPDATE
TO authenticated
USING (true);

-- =============================================
-- 2. CUSTOMERS TABLE
-- Organizations/companies using Triage
-- =============================================
CREATE TABLE IF NOT EXISTS customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  tier TEXT NOT NULL DEFAULT 'free' CHECK (tier IN ('free', 'pro', 'enterprise')),
  access_code_id UUID REFERENCES access_codes(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE customers ENABLE ROW LEVEL SECURITY;

-- Users can only see their own customer
CREATE POLICY "Users can read own customer"
ON customers
FOR SELECT
TO authenticated
USING (
  id IN (
    SELECT customer_id FROM users WHERE id = auth.uid()
  )
);

-- =============================================
-- 3. USERS TABLE
-- Extends Supabase auth.users
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('owner', 'admin', 'member')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can read their own record
CREATE POLICY "Users can read own data"
ON users
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Users can update their own record
CREATE POLICY "Users can update own data"
ON users
FOR UPDATE
TO authenticated
USING (id = auth.uid());

-- Allow inserts during signup
CREATE POLICY "Allow insert during signup"
ON users
FOR INSERT
TO authenticated
WITH CHECK (id = auth.uid());

-- =============================================
-- 4. SERVICES TABLE
-- Monitored services (Vercel, Railway, etc.)
-- =============================================
CREATE TABLE IF NOT EXISTS services (
  service_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_id UUID REFERENCES customers(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  platform TEXT NOT NULL CHECK (platform IN ('vercel', 'railway', 'render', 'netlify')),
  platform_service_id TEXT,
  webhook_secret TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Users can only see services from their customer
CREATE POLICY "Users can read own customer services"
ON services
FOR SELECT
TO authenticated
USING (
  customer_id IN (
    SELECT customer_id FROM users WHERE id = auth.uid()
  )
);

-- Users can insert services for their customer
CREATE POLICY "Users can insert own customer services"
ON services
FOR INSERT
TO authenticated
WITH CHECK (
  customer_id IN (
    SELECT customer_id FROM users WHERE id = auth.uid()
  )
);

-- Users can update their customer's services
CREATE POLICY "Users can update own customer services"
ON services
FOR UPDATE
TO authenticated
USING (
  customer_id IN (
    SELECT customer_id FROM users WHERE id = auth.uid()
  )
);

-- =============================================
-- 5. EVENTS TABLE
-- Real-time event stream from services
-- =============================================
CREATE TABLE IF NOT EXISTS events (
  event_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(service_id) ON DELETE CASCADE,
  service_name TEXT,
  severity TEXT CHECK (severity IN ('critical', 'error', 'warning', 'info')),
  message TEXT NOT NULL,
  metadata JSONB,
  timestamp TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Users can read events from their customer's services
CREATE POLICY "Users can read own customer events"
ON events
FOR SELECT
TO authenticated
USING (
  service_id IN (
    SELECT s.service_id
    FROM services s
    INNER JOIN users u ON s.customer_id = u.customer_id
    WHERE u.id = auth.uid()
  )
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_events_service_id ON events(service_id);
CREATE INDEX IF NOT EXISTS idx_events_timestamp ON events(timestamp DESC);

-- =============================================
-- 6. INCIDENT_OUTCOMES TABLE
-- AI-analyzed incidents and their resolutions
-- =============================================
CREATE TABLE IF NOT EXISTS incident_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(service_id) ON DELETE CASCADE,
  root_cause TEXT,
  action_taken TEXT NOT NULL,
  incident_resolved BOOLEAN NOT NULL DEFAULT false,
  time_to_resolution INTEGER, -- seconds
  llm_confidence DECIMAL(3,2), -- 0.00 to 1.00
  outcome TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE incident_outcomes ENABLE ROW LEVEL SECURITY;

-- Users can read incidents from their customer's services
CREATE POLICY "Users can read own customer incidents"
ON incident_outcomes
FOR SELECT
TO authenticated
USING (
  service_id IN (
    SELECT s.service_id
    FROM services s
    INNER JOIN users u ON s.customer_id = u.customer_id
    WHERE u.id = auth.uid()
  )
);

-- =============================================
-- 7. COMMANDS TABLE
-- Automated actions/commands executed by AI
-- =============================================
CREATE TABLE IF NOT EXISTS commands (
  command_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id UUID REFERENCES services(service_id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'queued' CHECK (status IN ('queued', 'processing', 'completed', 'failed')),
  result JSONB,
  queued_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE commands ENABLE ROW LEVEL SECURITY;

-- Users can read commands from their customer's services
CREATE POLICY "Users can read own customer commands"
ON commands
FOR SELECT
TO authenticated
USING (
  service_id IN (
    SELECT s.service_id
    FROM services s
    INNER JOIN users u ON s.customer_id = u.customer_id
    WHERE u.id = auth.uid()
  )
);

-- =============================================
-- 8. WAITLIST_SUBMISSIONS TABLE
-- Landing page waitlist sign-ups
-- =============================================
CREATE TABLE IF NOT EXISTS waitlist_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  company TEXT,
  team_size TEXT,
  comments TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE waitlist_submissions ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (from landing page)
CREATE POLICY "Allow anonymous waitlist submissions"
ON waitlist_submissions
FOR INSERT
TO anon
WITH CHECK (true);

-- =============================================
-- TRIGGERS FOR UPDATED_AT
-- =============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply triggers
CREATE TRIGGER update_access_codes_updated_at
  BEFORE UPDATE ON access_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at
  BEFORE UPDATE ON customers
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_services_updated_at
  BEFORE UPDATE ON services
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_incident_outcomes_updated_at
  BEFORE UPDATE ON incident_outcomes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- INSERT TEST DATA
-- =============================================

-- Insert test access codes
INSERT INTO access_codes (code, company_name, max_users, is_active, notes)
VALUES
  ('TRIAGE2024', 'Triage Test Company', 10, true, 'Main test code'),
  ('BETA2024', 'Beta Testers', 100, true, 'Beta access'),
  ('DEMO2024', 'Demo Organization', 5, true, 'Demo code')
ON CONFLICT (code) DO NOTHING;

-- =============================================
-- VERIFY SCHEMA
-- =============================================

-- Check all tables
SELECT
  schemaname,
  tablename
FROM pg_tables
WHERE schemaname = 'public'
  AND tablename IN (
    'access_codes',
    'customers',
    'users',
    'services',
    'events',
    'incident_outcomes',
    'commands',
    'waitlist_submissions'
  )
ORDER BY tablename;

-- Check access_codes
SELECT
  code,
  company_name,
  max_users,
  current_users,
  is_active
FROM access_codes;

-- =============================================
-- DONE!
-- You can now use codes: TRIAGE2024, BETA2024, or DEMO2024
-- =============================================
