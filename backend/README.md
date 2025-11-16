# VedaTale Backend API

Flask backend for the VedaTale story generation API.

## Setup

1. Install dependencies:
```bash
pip install -r ../requirements.txt
```

2. Create a `.env` file in this directory:
```
GOOGLE_API_KEY=your-google-api-key-here
```

3. Run locally:
```bash
python backend.py
```

The API will be available at `http://localhost:5000`

## API Endpoint

### POST /api/generate

Generates a story based on user input.

**Request Body:**
```json
{
  "inspiration": "A brave warrior",
  "title": "The Warrior's Journey",
  "genre": "mythology",
  "tone": "epic",
  "length": 300
}
```

**Response:**
```json
{
  "title": "The Warrior's Journey",
  "content": "Story content here...",
  "genre": "mythology",
  "tone": "epic",
  "length": 300
}
```

## Deployment Options

### Option 1: Railway (Recommended - Easy & Free)

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your VedaTale repository
5. Add environment variable: `GOOGLE_API_KEY=your-key`
6. Railway will auto-detect Python and deploy
7. Update `public/scripts/config.js` with your Railway URL

### Option 2: Render (Free Tier Available)

1. Go to [render.com](https://render.com)
2. Sign up and create a new "Web Service"
3. Connect your GitHub repository
4. Settings:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `cd backend && python backend.py`
   - Environment: `GOOGLE_API_KEY=your-key`
5. Deploy and get your URL
6. Update `public/scripts/config.js` with your Render URL

### Option 3: PythonAnywhere (Free Tier)

1. Go to [pythonanywhere.com](https://www.pythonanywhere.com)
2. Sign up for free account
3. Upload your backend files
4. Configure web app
5. Set environment variables
6. Update `public/scripts/config.js` with your PythonAnywhere URL

### Option 4: Firebase Cloud Functions (Requires Code Changes)

This requires converting Flask to Firebase Functions. See Firebase documentation.

## CORS Configuration

The backend already has CORS enabled for all origins. If you need to restrict it:

```python
CORS(app, resources={r"/api/*": {"origins": ["https://vedatale-4805.web.app"]}})
```

## Testing

Test the API locally:
```bash
curl -X POST http://localhost:5000/api/generate \
  -H "Content-Type: application/json" \
  -d '{"inspiration": "A brave warrior", "genre": "mythology", "tone": "epic", "length": 300}'
```

