# Quick Fix for Render Deployment

## The Issue
Render error: `gunicorn: command not found`

## Quick Solution (Choose One)

### Solution 1: Use Python Directly (Easiest - Recommended)

In your Render dashboard:

1. Go to your service → **Settings**
2. **Start Command** - Change to:
   ```
   cd backend && python backend.py
   ```
3. **Build Command** - Keep as:
   ```
   pip install -r requirements.txt
   ```
4. **Root Directory** - Leave empty (root of repo)
5. Click **Save Changes**
6. Click **Manual Deploy** → **Deploy latest commit**

This uses Python's built-in server (works perfectly fine for your app).

---

### Solution 2: Use Gunicorn (Production-Grade)

I've already added `gunicorn` to `requirements.txt`. In Render dashboard:

1. **Start Command** - Set to:
   ```
   cd backend && gunicorn --bind 0.0.0.0:$PORT backend:app
   ```
2. **Build Command**:
   ```
   pip install -r requirements.txt
   ```
3. **Root Directory** - Leave empty
4. Save and redeploy

---

## Environment Variables

Make sure you have set:
- `GOOGLE_API_KEY` = your-google-api-key-here

## After Deployment

1. Wait for deployment to complete (green status)
2. Copy your Render URL (e.g., `https://vedatale-backend-xxxx.onrender.com`)
3. Update `public/scripts/config.js`:
   ```javascript
   PRODUCTION: 'https://vedatale-backend-xxxx.onrender.com/api',
   ```
   (Replace with your actual URL, and make sure to include `/api` at the end)
4. Commit and push the change
5. Redeploy frontend: `firebase deploy --only hosting`

## Test Your Backend

Once deployed, test it:
```bash
curl https://your-render-url.onrender.com/api/generate -X POST \
  -H "Content-Type: application/json" \
  -d '{"inspiration":"test","genre":"mythology","tone":"epic","length":150}'
```

If you get a JSON response with a story, it's working! ✅

