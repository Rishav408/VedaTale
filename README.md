# VedaTale - AI-Generated Storytelling Platform

VedaTale is an innovative web application that leverages artificial intelligence to generate captivating stories based on user prompts. This platform allows users to create, explore, and share unique narratives, making storytelling accessible and engaging for everyone.

## Features

- **Story Creation**: Users can input prompts and generate stories using advanced AI algorithms.
- **Story Gallery**: A collection of stories created by users, allowing for exploration and inspiration.
- **User Profile**: Users can manage their profiles, view their created stories, and track their activity.
- **About/Help Section**: Information about the platform and assistance for users.

## Project Structure

```
VedaTale/
├── public/                 # Firebase Hosting static files
│   ├── index.html         # Home page
│   ├── pages/             # Additional pages
│   │   ├── create.html
│   │   ├── gallery.html
│   │   ├── about.html
│   │   └── contact.html
│   ├── scripts/           # JavaScript files
│   └── styles/            # CSS files
├── backend/               # Flask backend (for API)
│   ├── backend.py
│   └── mythology_context.py
├── firebase.json          # Firebase Hosting configuration
├── .firebaserc            # Firebase project configuration
├── requirements.txt       # Python dependencies
└── README.md
```

## Getting Started

### Prerequisites

- A modern web browser (Chrome, Firefox, Safari, etc.)
- Node.js and npm (for Firebase CLI)
- Python 3.x (for backend development)
- Firebase account

### Local Development

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/VedaTale.git
   cd VedaTale
   ```

2. For frontend development, you can use a local server:
   ```bash
   # Using Python
   cd public
   python -m http.server 8000
   
   # Or using Node.js http-server
   npx http-server public -p 8000
   ```

3. For backend development:
   ```bash
   cd backend
   pip install -r ../requirements.txt
   python backend.py
   ```

## Firebase Deployment

This project is structured for easy deployment on Firebase Hosting.

### Initial Setup

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize Firebase project (if not already done):
   ```bash
   firebase init hosting
   ```
   - Select "Use an existing project" or create a new one
   - Set public directory as `public`
   - Configure as single-page app: **No** (we have multiple HTML pages)
   - Set up automatic builds: **No**

4. Update `.firebaserc` with your Firebase project ID:
   ```json
   {
     "projects": {
       "default": "your-actual-project-id"
     }
   }
   ```

### Deploy to Firebase

1. Build/test your site locally:
   ```bash
   firebase serve
   ```
   Visit `http://localhost:5000` to preview your site.

2. Deploy to Firebase Hosting:
   ```bash
   firebase deploy --only hosting
   ```

3. Your site will be live at: `https://your-project-id.web.app`

### Backend Deployment

The Flask backend can be deployed separately:
- **Option 1**: Deploy as Firebase Cloud Functions
- **Option 2**: Deploy to a separate hosting service (Heroku, Railway, etc.)
- **Option 3**: Use Firebase Cloud Run

For Cloud Functions deployment, you'll need to restructure the backend code. See [Firebase Functions documentation](https://firebase.google.com/docs/functions) for details.

## Configuration

- **Firebase Hosting**: Configured in `firebase.json`
- **Backend API**: Update API endpoints in your JavaScript files to point to your deployed backend URL
- **Environment Variables**: Create a `.env` file in the `backend/` directory with:
  ```
  GOOGLE_API_KEY=your-google-api-key
  ```

## Usage

- Enter a prompt in the designated input area to generate a story.
- Browse the story gallery to read stories created by other users.
- Customize your user profile to enhance your experience.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.