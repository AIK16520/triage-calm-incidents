# 🌐 Triage Listener Domain Configuration

## What Domain Do You Need?

The webhook URLs require a domain where your **Triage Listener** (the Go backend) is deployed.

---

## 🎯 Deployment Options

### **Option 1: Deploy Listener to Cloud Provider (Easiest)**

Deploy the Triage Listener to a cloud platform and use their provided domain:

#### **Railway** (Recommended)
```bash
# Deploy from /Users/alikhokhar/Desktop/Triage/Triage-Listener
railway up

# You'll get a URL like:
https://triage-listener-production.up.railway.app
```

**Update `.env`:**
```bash
VITE_LISTENER_URL="https://triage-listener-production.up.railway.app"
```

**Webhook URLs become:**
- `https://triage-listener-production.up.railway.app/webhooks/vercel`
- `https://triage-listener-production.up.railway.app/webhooks/vercel/logs`

#### **Render**
```bash
# Deploy via Render dashboard
# You'll get:
https://triage-listener.onrender.com
```

**Update `.env`:**
```bash
VITE_LISTENER_URL="https://triage-listener.onrender.com"
```

#### **Fly.io**
```bash
fly launch
# You'll get:
https://triage-listener.fly.dev
```

---

### **Option 2: Use Your Own Domain**

If you own a domain (e.g., `triage.com`), set up a subdomain:

1. **Configure DNS:**
   ```
   listener.triage.com → CNAME → your-railway-app.up.railway.app
   ```

2. **Update `.env`:**
   ```bash
   VITE_LISTENER_URL="https://listener.triage.com"
   ```

3. **Configure SSL:**
   - Railway/Render auto-provisions SSL for custom domains
   - Or use Cloudflare for SSL + DDoS protection

---

### **Option 3: Local Development**

For testing locally:

1. **Run Listener locally:**
   ```bash
   cd /Users/alikhokhar/Desktop/Triage/Triage-Listener
   make run
   # Runs on http://localhost:8080
   ```

2. **Use ngrok for public URL:**
   ```bash
   ngrok http 8080
   # You'll get: https://abc123.ngrok.io
   ```

3. **Update `.env`:**
   ```bash
   VITE_LISTENER_URL="https://abc123.ngrok.io"
   ```

**Webhook URLs become:**
- `https://abc123.ngrok.io/webhooks/vercel`
- `https://abc123.ngrok.io/webhooks/vercel/logs`

---

## 🔧 How to Update the Domain

### **1. Edit `.env` file:**

```bash
# Open the file
nano /Users/alikhokhar/Desktop/triage-calm-incidents/.env

# Update this line:
VITE_LISTENER_URL="YOUR_LISTENER_URL_HERE"
```

### **2. Restart dev server:**

```bash
npm run dev
```

### **3. Test it:**

1. Go to `/dashboard/services/new`
2. Create a service
3. Check the webhook URL shown - it should use your domain!

---

## 📋 Current Configuration

**Your `.env` currently has:**
```bash
# Production URL
VITE_LISTENER_URL="https://listener.triage.com"

# Development URL (auto-used when running 'npm run dev')
VITE_DEV_LISTENER_URL="http://localhost:8080"
```

**Auto Dev/Prod Switching:**
- When you run `npm run dev` → uses `VITE_DEV_LISTENER_URL`
- When you run `npm run build` or `npm run preview` → uses `VITE_LISTENER_URL`

**This generates webhook URLs like:**
```
# In development:
http://localhost:8080/webhooks/vercel

# In production:
https://listener.triage.com/webhooks/vercel
```

---

## ✅ Recommended Setup

### **For Production:**

1. **Deploy Listener to Railway:**
   ```bash
   cd /Users/alikhokhar/Desktop/Triage/Triage-Listener
   railway login
   railway up
   ```

2. **Get the Railway URL** (something like `triage-listener-production.up.railway.app`)

3. **Update `.env`:**
   ```bash
   VITE_LISTENER_URL="https://triage-listener-production.up.railway.app"
   ```

4. **Restart frontend:**
   ```bash
   npm run dev
   ```

### **For Development:**

1. **Run listener locally:**
   ```bash
   # Terminal 1: Run listener
   cd /Users/alikhokhar/Desktop/Triage/Triage-Listener
   make run
   # Runs on http://localhost:8080
   ```

2. **Option A: Use localhost (simplest)**
   ```bash
   # .env already configured:
   VITE_DEV_LISTENER_URL="http://localhost:8080"

   # Just run your frontend:
   npm run dev
   ```
   **Note:** Webhooks from external platforms won't reach localhost. Use ngrok for testing webhooks.

3. **Option B: Use ngrok (for testing real webhooks)**
   ```bash
   # Terminal 2: Expose with ngrok
   ngrok http 8080
   # Copy the URL (e.g., https://abc123.ngrok.io)
   ```

   **Update `.env`:**
   ```bash
   VITE_DEV_LISTENER_URL="https://abc123.ngrok.io"
   ```

   **Restart frontend:**
   ```bash
   npm run dev
   ```

---

## 🎯 Next Steps

1. **Choose your deployment method** (Railway recommended)
2. **Deploy the Triage Listener** from `/Users/alikhokhar/Desktop/Triage/Triage-Listener`
3. **Update `.env`** with your listener URL
4. **Restart frontend** (`npm run dev`)
5. **Test by creating a service** - webhook URL should now use your domain!

---

## 💡 Tips

- **Auto dev/prod switching** - no need to manually change URLs between environments
- **Railway** is easiest - one command deploy with free tier
- **Custom domain** looks more professional but requires DNS setup
- **ngrok** is perfect for testing real webhooks locally (URLs change on restart)
- **localhost** works for UI testing but can't receive external webhooks
- Always use **HTTPS** for production - platforms don't accept HTTP webhooks

---

## ❓ Questions?

**Q: Do I need to own triage.com?**
A: No! Use a Railway/Render subdomain or any domain you own.

**Q: Can I use localhost?**
A: Yes for UI testing! The app auto-detects dev mode and uses `VITE_DEV_LISTENER_URL`. But external platforms (Vercel/Railway) can't reach localhost - use ngrok for testing real webhooks.

**Q: How does the dev/prod URL switching work?**
A: When you run `npm run dev`, it automatically uses `VITE_DEV_LISTENER_URL`. When you build for production (`npm run build`), it uses `VITE_LISTENER_URL`. No manual switching needed!

**Q: What if I don't deploy the listener yet?**
A: The frontend will work, but webhooks won't be received. Deploy when you're ready to test the full integration.

**Q: Where do I deploy the listener?**
A: `/Users/alikhokhar/Desktop/Triage/Triage-Listener` - it's a Go app with a Dockerfile ready.
