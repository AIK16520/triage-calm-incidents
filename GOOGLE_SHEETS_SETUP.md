# Google Sheets Setup - Step by Step Guide

## Quick Setup (5 minutes)

### Step 1: Create Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create a new spreadsheet
3. Name it "Triage Waitlist" (or any name you prefer)
4. In Row 1, add these headers (one per column):
   - **A1**: `Timestamp`
   - **B1**: `Name`
   - **C1**: `Email`
   - **D1**: `Company`
   - **E1**: `Team Size`
   - **F1**: `Comments`

### Step 2: Create Apps Script
1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with a code editor
3. Delete all the default code (the `function myFunction()` example)
4. Copy the entire contents of `google-apps-script.js` from this project
5. Paste it into the Apps Script editor
6. Click **Save** (💾 icon) or press `Ctrl+S` / `Cmd+S`
7. Name your project: "Triage Waitlist Handler" (or any name)

### Step 3: Deploy as Web App
1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in:
   - **Description**: "Waitlist Form Handler"
   - **Execute as**: `Me` (your email)
   - **Who has access**: `Anyone` (important!)
5. Click **Deploy**
6. **IMPORTANT**: You may see a warning about authorization - click **Authorize access**
7. Choose your Google account
8. Click **Advanced** → **Go to [Project Name] (unsafe)** (this is safe, it's your own script)
9. Click **Allow**
10. Copy the **Web App URL** (it looks like: `https://script.google.com/macros/s/AKfycby.../exec`)

### Step 4: Add URL to Your Project
1. Create a `.env` file in your project root (if it doesn't exist)
2. Add this line:
   ```
   VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   (Replace with your actual URL from Step 3)
3. Save the file
4. **Restart your dev server** (stop and run `npm run dev` or `bun dev` again)

### Step 5: Test It!
1. Fill out the waitlist form on your website
2. Submit it
3. Check your Google Sheet - you should see a new row with the data!

## Troubleshooting

### Script doesn't work?
- Make sure "Who has access" is set to **Anyone** (not "Only myself")
- Make sure you authorized the script when prompted
- Check that the URL in `.env` is correct (ends with `/exec`)

### Form submits but no data in sheet?
- Check the Apps Script execution log: **Executions** tab in Apps Script editor
- Make sure your sheet headers match exactly: Timestamp, Name, Email, Company, Team Size, Comments

### Still having issues?
- The script includes a `test()` function - you can run it in Apps Script to verify it works
- Check browser console for any errors

## Security Note
The Web App URL is public, but it only allows POST requests to your specific sheet. It's safe to use in your frontend code.




