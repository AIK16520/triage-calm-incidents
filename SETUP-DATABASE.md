# 🗄️ Database Setup Instructions

## Problem
The `access_codes` table (and other tables) don't exist yet!

## ✅ Solution: Run the Schema Migration

### **Step 1: Open Supabase SQL Editor**

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**

### **Step 2: Copy and Run the Schema**

1. Open the file: `supabase-schema.sql` (in your project root)
2. Copy **ALL** the SQL content
3. Paste it into the Supabase SQL Editor
4. Click **"Run"** button

### **Step 3: Verify Setup**

After running, you should see output showing:
- ✅ 8 tables created
- ✅ 3 test access codes inserted

Check the last section of the output for:
```
code        | company_name           | max_users | current_users | is_active
------------|------------------------|-----------|---------------|----------
TRIAGE2024  | Triage Test Company    | 10        | 0             | true
BETA2024    | Beta Testers           | 100       | 0             | true
DEMO2024    | Demo Organization      | 5         | 0             | true
```

---

## 📋 What This Creates

### **Tables:**
1. ✅ `access_codes` - Signup access control
2. ✅ `customers` - Organizations
3. ✅ `users` - User accounts (extends auth.users)
4. ✅ `services` - Monitored services
5. ✅ `events` - Real-time event stream
6. ✅ `incident_outcomes` - AI incident analysis
7. ✅ `commands` - Automated actions
8. ✅ `waitlist_submissions` - Landing page signups

### **Security:**
- ✅ Row Level Security (RLS) enabled on all tables
- ✅ Policies for user data isolation
- ✅ Anonymous access for access code validation
- ✅ Anonymous access for waitlist submissions

### **Test Access Codes:**
- `TRIAGE2024` → "Triage Test Company" (10 users max)
- `BETA2024` → "Beta Testers" (100 users max)
- `DEMO2024` → "Demo Organization" (5 users max)

---

## 🧪 Test the Setup

### **1. Test Access Code Validation**

1. Go to: http://localhost:5173/signup (or your dev URL)
2. Enter access code: `TRIAGE2024`
3. Click "Validate Code"
4. Should see: ✅ "Valid code for Triage Test Company"

### **2. Test Signup Flow**

1. Use validated code: `TRIAGE2024`
2. Fill in:
   - Name: Your Name
   - Email: test@example.com
   - Password: password123
3. Click "Create Account"
4. Should redirect to `/dashboard`

### **3. Check Database**

In Supabase Dashboard → Table Editor:
- Check `customers` table → should have 1 row
- Check `users` table → should have 1 row
- Check `access_codes` → `current_users` should be 1

---

## 🔧 Troubleshooting

### **If you get policy errors:**
```sql
-- Run this to check policies
SELECT tablename, policyname, cmd, roles
FROM pg_policies
WHERE schemaname = 'public';
```

### **If access codes don't work:**
```sql
-- Verify codes exist
SELECT * FROM access_codes;

-- Insert a new code manually
INSERT INTO access_codes (code, company_name, max_users, is_active)
VALUES ('MYCODE2024', 'My Company', 10, true);
```

### **If tables already exist:**
```sql
-- Drop all tables (CAREFUL - deletes data!)
DROP TABLE IF EXISTS commands CASCADE;
DROP TABLE IF EXISTS incident_outcomes CASCADE;
DROP TABLE IF EXISTS events CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS access_codes CASCADE;
DROP TABLE IF EXISTS waitlist_submissions CASCADE;

-- Then re-run the schema
```

---

## 🎯 Next Steps

After setup:
1. ✅ Test signup with `TRIAGE2024`
2. ✅ Log in to dashboard
3. ✅ Add a service
4. ✅ Check all dashboard pages work

---

## 📞 Need Help?

If you see errors:
1. Copy the error message
2. Check the Supabase logs (Logs → Postgres Logs)
3. Verify all tables exist (Table Editor → should see 8 tables)
