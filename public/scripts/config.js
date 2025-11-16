// API Configuration
// This file manages the backend API endpoint based on the environment

const API_CONFIG = {
    // Production API URL - Update this with your deployed backend URL
    // Options: Railway, Render, PythonAnywhere, etc.
    // Example: 'https://your-app-name.railway.app/api'
    // Example: 'https://vedatale-backend.onrender.com/api'
    PRODUCTION: 'https://your-backend-url.com/api',
    
    // Local development API URL
    LOCAL: 'http://localhost:5000/api',
    
    // Auto-detect environment
    getBaseURL: function() {
        // Check if we're running on localhost
        if (window.location.hostname === 'localhost' || 
            window.location.hostname === '127.0.0.1' ||
            window.location.hostname === '') {
            return this.LOCAL;
        }
        // Otherwise use production URL
        return this.PRODUCTION;
    }
};

// Export for use in other scripts
window.API_CONFIG = API_CONFIG;

