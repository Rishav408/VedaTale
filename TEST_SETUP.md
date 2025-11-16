# Testing Your Setup

## ✅ What You Did Right

1. ✅ Backend deployed to Render: `https://vedatale.onrender.com`
2. ✅ Frontend deployed to Firebase: `https://vedatale-4805.web.app`
3. ✅ Config file updated with Render URL
4. ✅ Frontend redeployed with new config

## 🔍 Verification Steps

### Step 1: Check Backend is Running
Visit: `https://vedatale.onrender.com`

You should see a 404 error (this is normal - the backend only has `/api/generate` endpoint, not a root page).

### Step 2: Test Backend API Directly

Open your browser console (F12) and run:
```javascript
fetch('https://vedatale.onrender.com/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    inspiration: "A brave warrior",
    genre: "mythology",
    tone: "epic",
    length: 150
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

If you get a story back, backend is working! ✅

### Step 3: Test Frontend

1. Visit: `https://vedatale-4805.web.app/pages/create.html`
2. Open browser console (F12)
3. Fill the form and click "Generate Story"
4. Check console for any errors

## 🐛 Common Issues

### Issue 1: "Failed to fetch"
**Cause:** Backend might be spinning up (Render free tier)
**Fix:** Wait 30 seconds and try again

### Issue 2: CORS Error
**Cause:** Backend CORS not configured
**Fix:** Check `backend/backend.py` has `CORS(app)` enabled

### Issue 3: 404 on API
**Cause:** Wrong URL path
**Fix:** Make sure config.js has `/api` at the end: `https://vedatale.onrender.com/api`

### Issue 4: Backend returns error
**Cause:** Missing GOOGLE_API_KEY
**Fix:** Check Render dashboard → Environment Variables

## 📋 Current Configuration

- **Frontend URL:** `https://vedatale-4805.web.app`
- **Backend URL:** `https://vedatale.onrender.com`
- **API Endpoint:** `https://vedatale.onrender.com/api/generate`
- **Config File:** `public/scripts/config.js` ✅ Updated

## ✅ Everything Looks Correct!

Your setup appears to be correct. If you're experiencing issues, please share:
1. What error message you see
2. Browser console errors (F12)
3. What happens when you try to generate a story

