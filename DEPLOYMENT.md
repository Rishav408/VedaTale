# Backend Deployment Guide

Your frontend is deployed on Firebase, but the backend needs to be deployed separately. Here are the easiest options:

## Quick Fix: Update API URL

1. Deploy your backend using one of the options below
2. Update `public/scripts/config.js` with your backend URL:
   ```javascript
   PRODUCTION: 'https://your-deployed-backend-url.com/api',
   ```
3. Redeploy to Firebase: `firebase deploy --only hosting`

## Deployment Options

### Option 1: Railway (Recommended - Easiest)

**Steps:**
1. Go to [railway.app](https://railway.app) and sign up with GitHub
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your VedaTale repository
4. Railway will auto-detect it's a Python project
5. In the settings, set:
   - **Root Directory**: `backend`
   - **Start Command**: `python backend.py`
   - **Environment Variables**: Add `GOOGLE_API_KEY=your-key-here`
6. Railway will give you a URL like: `https://your-app-name.railway.app`
7. Update `public/scripts/config.js`:
   ```javascript
   PRODUCTION: 'https://your-app-name.railway.app/api',
   ```
8. Redeploy frontend: `firebase deploy --only hosting`

**Note:** Railway's free tier includes $5 credit monthly.

### Option 2: Render (Free Tier Available)

**Steps:**
1. Go to [render.com](https://render.com) and sign up
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `vedatale-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `python backend.py`
   - **Environment Variables**: `GOOGLE_API_KEY=your-key-here`
5. Click "Create Web Service"
6. Render will give you a URL like: `https://vedatale-backend.onrender.com`
7. Update `public/scripts/config.js`:
   ```javascript
   PRODUCTION: 'https://vedatale-backend.onrender.com/api',
   ```
8. Redeploy frontend: `firebase deploy --only hosting`

**Note:** Free tier may spin down after inactivity (takes ~30s to wake up).

### Option 3: PythonAnywhere (Free Tier)

**Steps:**
1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Sign up for free account
3. Upload your `backend` folder files
4. Create a new web app
5. Set environment variables in the web app configuration
6. Get your URL and update `config.js`
7. Redeploy frontend

### Option 4: Local Testing (Temporary Solution)

For testing purposes, you can run the backend locally:

1. Open a terminal in the `backend` folder
2. Run: `python backend.py`
3. Keep this terminal open while testing
4. The frontend will work locally at `http://localhost:5000`

**Note:** This only works when testing locally, not on the deployed site.

## Important: CORS Configuration

Your backend already has CORS enabled. If you deploy to a specific domain, you can restrict it in `backend/backend.py`:

```python
CORS(app, resources={r"/api/*": {"origins": ["https://vedatale-4805.web.app"]}})
```

## Testing Your Deployment

After deploying, test your backend:

```bash
curl -X POST https://your-backend-url.com/api/generate \
  -H "Content-Type: application/json" \
  -d '{"inspiration": "A brave warrior", "genre": "mythology", "tone": "epic", "length": 300}'
```

You should get a JSON response with the generated story.

## Troubleshooting

**"Failed to fetch" error:**
- Make sure your backend is deployed and running
- Check that the URL in `config.js` is correct
- Verify CORS is enabled in your backend
- Check browser console for detailed error messages

**Backend not responding:**
- Check your deployment logs
- Verify environment variables are set correctly
- Make sure the port is configured correctly (most platforms auto-detect)

