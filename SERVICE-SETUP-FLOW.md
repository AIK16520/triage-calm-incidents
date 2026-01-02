# Service Setup Flow - Platform-Specific Configuration

## ✅ What We Built

The AddService page now has **dynamic fields** that change based on the selected platform!

---

## 🎯 Flow Overview

1. **User selects platform** (Vercel, Railway, Render, Netlify)
2. **Form shows platform-specific fields**:
   - Different labels for Project ID
   - Platform-specific help text
   - API Token field (if needed)
   - Relevant instructions
3. **On success**, shows:
   - Webhook URL (to configure in platform)
   - Log Drain URL (Vercel only)
   - Webhook Secret (for signature verification)
   - Step-by-step setup instructions

---

## 📋 Platform-Specific Fields

### **Vercel** ▲
**User Provides:**
- Service Name
- Vercel Project ID (`prj_abc123xyz`)
- Vercel API Token (for executing rollbacks)

**We Provide:**
- Webhook URL: `https://listener.triage.com/webhooks/vercel`
- Log Drain URL: `https://listener.triage.com/webhooks/vercel/logs` ✨
- Webhook Secret (auto-generated UUID)

**Note:** No service_id parameter needed! The listener identifies the service from the webhook payload's project ID.

**Setup Steps:**
1. Go to Vercel project → Settings → Webhooks
2. Add webhook URL
3. Paste webhook secret
4. Select events: deployment errors, build failures, runtime errors
5. Optional: Configure log drain in Settings → Log Drains

---

### **Railway** 🚂
**User Provides:**
- Service Name
- Railway Project ID
- Railway API Token

**We Provide:**
- Webhook URL: `https://listener.triage.com/webhooks/railway`
- Webhook Secret

**No log drain support**

---

### **Render** 🎨
**User Provides:**
- Service Name
- Render Service ID (`srv_abc123xyz`)
- Render API Key

**We Provide:**
- Webhook URL: `https://listener.triage.com/webhooks/render`
- Webhook Secret

**No log drain support**

---

### **Netlify** ◆
**User Provides:**
- Service Name
- Netlify Site ID
- Netlify Access Token

**We Provide:**
- Webhook URL: `https://listener.triage.com/webhooks/netlify`
- Webhook Secret

**No log drain support**

---

## 🗄️ Database Schema Notes

### **Current Schema (`services` table)**
```sql
CREATE TABLE services (
    id UUID PRIMARY KEY,
    customer_id UUID,
    name TEXT,
    platform TEXT,  -- 'vercel', 'railway', etc.
    platform_service_id TEXT,  -- Project ID from platform
    platform_project_name TEXT,
    is_active BOOLEAN,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
);
```

### **⚠️ Missing Field: API Token Storage**

The API tokens (Vercel API token, Railway token, etc.) are currently **NOT stored** in the database.

**Options:**

**Option 1: Add to services table**
```sql
ALTER TABLE services
ADD COLUMN platform_api_token TEXT;  -- Encrypted
```

**Option 2: Add to customers table (if tokens are customer-level)**
```sql
ALTER TABLE customers
ADD COLUMN platform_credentials JSONB;  -- Store multiple platform tokens
-- Example: {"vercel": "token123", "railway": "token456"}
```

**Option 3: Separate credentials table (most secure)**
```sql
CREATE TABLE service_credentials (
    id UUID PRIMARY KEY,
    service_id UUID REFERENCES services(id),
    credential_type TEXT,  -- 'api_token', 'oauth_token', etc.
    encrypted_value TEXT,  -- Use pgcrypto or app-level encryption
    created_at TIMESTAMPTZ
);
```

**Recommended:** Option 3 for security + flexibility

---

## 🔐 Security Considerations

1. **Never store API tokens in plain text** - encrypt them
2. **Use Supabase pgcrypto** or encrypt at application level
3. **Webhook secrets** are already UUID-based (good!)
4. **RLS policies** should restrict access to credentials

---

## 🧪 Testing the Flow

1. Go to `/dashboard/services/new`
2. Enter service name: "My Test API"
3. Select platform: "Vercel"
4. Form shows:
   - ✅ "Vercel Project ID" field
   - ✅ "Vercel API Token" field
   - ✅ Help text specific to Vercel
5. Fill in:
   - Project ID: `prj_test123`
   - API Token: `test_token_xyz`
6. Click "Create Service"
7. Success screen shows:
   - ✅ Webhook URL (platform-only, no service_id param)
   - ✅ Log Drain URL (Vercel only!)
   - ✅ Webhook Secret (can copy)
   - ✅ Setup instructions

---

## 📝 Next Steps

### **To Complete Integration:**

1. **Add credential storage to database:**
   ```sql
   -- Run in Supabase SQL Editor
   ALTER TABLE services
   ADD COLUMN platform_api_token TEXT;

   -- Or use encrypted approach
   CREATE EXTENSION IF NOT EXISTS pgcrypto;

   ALTER TABLE services
   ADD COLUMN encrypted_api_token BYTEA;
   ```

2. **Update AddService.tsx to save API token:**
   ```typescript
   const { data: service, error } = await supabase
     .from('services')
     .insert({
       name,
       platform,
       platform_service_id: projectId,
       platform_api_token: apiToken,  // Add this
       webhook_secret: webhookSecret,
       is_active: true
     })
   ```

3. **Encrypt before storing:**
   ```typescript
   // Option 1: Use Supabase pgcrypto (server-side)
   await supabase.rpc('encrypt_api_token', {
     service_id: serviceId,
     token: apiToken
   })

   // Option 2: Encrypt client-side (using crypto library)
   const encryptedToken = await encryptToken(apiToken)
   ```

4. **Update RLS policies** to protect credentials:
   ```sql
   -- Don't allow clients to read raw API tokens
   CREATE POLICY "Users cannot read platform_api_token"
   ON services
   FOR SELECT
   TO authenticated
   USING (
     customer_id IN (
       SELECT customer_id FROM users WHERE id = auth.uid()
     )
   )
   WITH CHECK (platform_api_token IS NULL);  -- Exclude from SELECT
   ```

---

## ✨ Features Implemented

- ✅ Dynamic form fields based on platform
- ✅ Platform-specific labels and placeholders
- ✅ Contextual help text
- ✅ API token fields (password type)
- ✅ "What happens next?" info box
- ✅ Success screen with multiple URLs
- ✅ Copy buttons for webhook URL, log drain URL, and secret
- ✅ Platform-specific setup instructions
- ✅ Log Drain URL for Vercel only
- ✅ Disabled submit until platform selected

---

## 🎨 UI Improvements

- Clean, progressive disclosure (fields appear after platform selected)
- Platform-specific emoji icons in success screen
- Color-coded info boxes (green for success, blue for instructions)
- Password-masked API token field
- Copy-paste friendly URLs with visual feedback
- Responsive layout
