# Email Capture Setup Instructions

This guide will help you set up email capture from your landing page to Google Sheets.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Echotrader Waitlist" (or your preferred name)
4. Copy the Spreadsheet ID from the URL
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Copy the `SPREADSHEET_ID` part

## Step 2: Deploy Google Apps Script

1. Go to [Google Apps Script](https://script.google.com/)
2. Click **"New Project"**
3. Copy the entire contents of `google-apps-script.js` into the editor
4. Replace `'YOUR_SPREADSHEET_ID'` with your actual Spreadsheet ID from Step 1
5. Click **"Deploy"** → **"New deployment"**
6. Click the gear icon next to "Select type" and choose **"Web app"**
7. Configure the deployment:
   - **Description**: "Echotrader Email Capture"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone"
8. Click **"Deploy"**
9. You may need to authorize the script:
   - Click "Authorize access"
   - Choose your Google account
   - Click "Advanced" → "Go to [project name] (unsafe)"
   - Click "Allow"
10. Copy the **Web app URL** (it looks like: `https://script.google.com/macros/s/...../exec`)

## Step 3: Update Your Landing Page

1. Open `index.html`
2. Find line 409 where it says:
   ```javascript
   const APPS_SCRIPT_URL = 'YOUR_APPS_SCRIPT_URL';
   ```
3. Replace `'YOUR_APPS_SCRIPT_URL'` with your actual Web app URL from Step 2
4. Save the file

## Step 4: Test and Deploy

1. Test locally:
   ```bash
   python -m http.server 8000
   ```
   Visit `http://localhost:8000` and try submitting an email

2. Deploy to GitHub Pages:
   ```bash
   git add .
   git commit -m "Add email capture functionality"
   git push
   ```

## Verification

1. After deployment, visit your live site
2. Enter a test email address
3. Click "Join Waitlist"
4. Check your Google Sheet - you should see a new row with:
   - Timestamp
   - Email address
   - Source: "Landing Page"

## Troubleshooting

**Problem: Emails not appearing in the sheet**
- Make sure you've replaced `YOUR_SPREADSHEET_ID` in the Apps Script
- Make sure you've replaced `YOUR_APPS_SCRIPT_URL` in index.html
- Check the Apps Script execution logs: Script editor → Executions

**Problem: Authorization errors**
- Re-deploy the script and make sure "Who has access" is set to "Anyone"
- Check that the script has permission to access your spreadsheet

**Problem: Form shows error message**
- Open browser console (F12) to see detailed error messages
- Verify the Apps Script URL is correct and the deployment is active

## Data Structure

Your Google Sheet will have these columns:
- **Timestamp**: When the email was submitted
- **Email**: The email address
- **Source**: Always "Landing Page" (useful if you add more sources later)

## Next Steps

Consider adding:
- Email validation service (e.g., ZeroBounce, NeverBounce)
- Automated welcome email via Zapier/Make
- Dashboard to view signups over time
- Export functionality for email marketing platforms
