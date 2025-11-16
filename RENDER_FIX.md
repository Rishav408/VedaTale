# Render Deployment Fix

## The Problem
Render was trying to run `gunicorn backend.py` but:
1. Gunicorn wasn't installed
2. The command syntax was wrong

## The Fix

I've made these changes:
1. ✅ Added `gunicorn` to `requirements.txt`
2. ✅ Created `render.yaml` configuration file
3. ✅ Fixed the start command

## Render Dashboard Settings

Go to your Render dashboard and update these settings:

### Option 1: Use render.yaml (Easiest)
1. In your Render service, go to **Settings**
2. Scroll down to **Build & Deploy**
3. Enable **Auto-Deploy** if you want
4. The `render.yaml` file will be automatically used

### Option 2: Manual Configuration

If render.yaml doesn't work, manually set these in Render dashboard:

**Build Command:**
```
pip install -r requirements.txt
```

**Start Command:**
```
cd backend && gunicorn --bind 0.0.0.0:$PORT backend:app
```

**OR (Simpler alternative - uses Python directly):**
```
cd backend && python backend.py
```

**Root Directory:**
Leave empty (or set to root of repo)

**Environment Variables:**
- `GOOGLE_API_KEY` = your-google-api-key-here
- `PORT` = (auto-set by Render, don't change)

## Important Notes

1. **Root Directory**: Since `requirements.txt` is in the root, keep Root Directory empty
2. **Start Command**: The `cd backend &&` part changes to the backend folder before running
3. **Module Name**: `backend:app` means the `backend.py` file (module) and the `app` object inside it

## Alternative: Simpler Start Command

If gunicorn still causes issues, use this simpler start command:

```
cd backend && python backend.py
```

This uses Python's built-in server (works fine for development/small apps).

## After Fixing

1. Save the settings in Render
2. Click **Manual Deploy** → **Deploy latest commit**
3. Wait for deployment
4. Copy your Render URL (e.g., `https://vedatale-backend.onrender.com`)
5. Update `public/scripts/config.js`:
   ```javascript
   PRODUCTION: 'https://vedatale-backend.onrender.com/api',
   ```
6. Redeploy frontend: `firebase deploy --only hosting`

## Testing

Once deployed, test your backend:
```bash
curl -X POST https://your-render-url.onrender.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"inspiration": "test", "genre": "mythology", "tone": "epic", "length": 150}'
```

You should get a JSON response with a generated story.

