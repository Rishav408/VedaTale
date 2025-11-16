# Troubleshooting "Failed to fetch" Error

## Quick Diagnostic Steps

### Step 1: Check Backend Health
Open browser console (F12) and run:
```javascript
fetch('https://vedatale.onrender.com/api/health')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error)
```

**Expected:** `{status: "ok", message: "Backend is running"}`
**If error:** Backend might be sleeping or down

### Step 2: Check API Endpoint
```javascript
fetch('https://vedatale.onrender.com/api/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    inspiration: "test",
    genre: "mythology",
    tone: "epic",
    length: 150
  })
})
.then(r => r.json())
.then(console.log)
.catch(console.error)
```

### Step 3: Check Network Tab
1. Open browser DevTools (F12)
2. Go to **Network** tab
3. Try generating a story
4. Look for the request to `vedatale.onrender.com`
5. Check:
   - Status code (should be 200)
   - Response headers (check CORS headers)
   - Error message

## Common Causes & Fixes

### Issue 1: Render Free Tier Sleeping
**Symptom:** First request fails, second works
**Fix:** Wait 30-60 seconds after first request, then try again
**Permanent Fix:** Upgrade to paid plan or use Railway

### Issue 2: CORS Error
**Symptom:** Console shows CORS error
**Fix:** I've updated the backend to explicitly allow your Firebase domain
**Action:** Redeploy backend to Render

### Issue 3: Backend Not Running
**Symptom:** Health check fails
**Fix:** 
1. Check Render dashboard → Logs
2. Verify `GOOGLE_API_KEY` is set
3. Check if backend crashed

### Issue 4: Wrong URL
**Symptom:** 404 or connection refused
**Fix:** Verify `public/scripts/config.js` has correct URL:
```javascript
PRODUCTION: 'https://vedatale.onrender.com/api',
```

### Issue 5: Network/Firewall
**Symptom:** Timeout errors
**Fix:** Check if your network blocks Render domains

## Next Steps

1. **Redeploy Backend** with updated CORS configuration
2. **Test health endpoint** first
3. **Check browser console** for detailed errors
4. **Check Render logs** for backend errors

