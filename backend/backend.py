import os
import google.generativeai as genai
from flask import Flask, request, jsonify
from flask_cors import CORS
from dotenv import load_dotenv
import re
from mythology_context import get_mythology_prompt

# Load environment variables
load_dotenv()

# Configure Google AI
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
genai.configure(api_key=GOOGLE_API_KEY)

# Initialize the model
model = genai.GenerativeModel('gemini-1.5-flash')

app = Flask(__name__)
# Enable CORS for frontend-backend communication
# Allow requests from Firebase domain and localhost
CORS(app, resources={
    r"/api/*": {
        "origins": [
            "https://vedatale-frontend.onrender.com",  # Render frontend
            "https://vedatale-4805.web.app",  # Firebase (keep for backup)
            "https://vedatale-4805.firebaseapp.com",  # Firebase alternative
            "http://localhost:5000",
            "http://127.0.0.1:5000"
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})

def estimate_token_count(text):
    """Estimate token count (1 token ≈ 4 characters)"""
    return max(50, len(text) // 4)

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({"status": "ok", "message": "Backend is running"}), 200

@app.route('/api/generate', methods=['POST'])
def generate_story():
    try:
        # Get request data
        data = request.json
        inspiration = data.get('inspiration', '')
        genre = data.get('genre', 'mythology')
        tone = data.get('tone', 'epic')
        length = int(data.get('length', 150))
        title = data.get('title', '')
        
        # Validate input
        if not inspiration:
            return jsonify({"error": "Story inspiration is required"}), 400
        
        # Generate mythology context
        mythology_prompt = get_mythology_prompt(genre, tone)
        
        # Create detailed prompt
        prompt = f"""
        You are VedaTale, an AI storyteller specializing in family-friendly narratives inspired by Hindu mythology.
        Generate a {length}-word {genre} story with a {tone} tone.
        
        Mythology Context: {mythology_prompt}
        User Inspiration: {inspiration}
        
        Guidelines:
        1. Weave Hindu mythological elements naturally into the narrative
        2. Maintain a {tone} tone throughout
        3. Create {length} words exactly (count and verify)
        4. Structure the story with a clear beginning, middle, and end
        5. Focus on positive themes like courage, wisdom, devotion, and righteousness
        6. Keep content appropriate for all ages
        7. {f"Title: {title}" if title else "Generate a creative title"}
        
        Output Format:
        Title: [Generated Title]
        Content: [Story Content]
        """
        
        # Generate story
        response = model.generate_content(
            prompt,
            generation_config=genai.types.GenerationConfig(
                max_output_tokens=estimate_token_count(prompt) * 2,
                temperature=0.8 if tone == "creative" else 0.5,
                top_p=0.9
            ),
            safety_settings=[
                {
                    "category": "HARM_CATEGORY_HARASSMENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_HATE_SPEECH", 
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                },
                {
                    "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                    "threshold": "BLOCK_MEDIUM_AND_ABOVE"
                }
            ]
        )
        
        # Check if response is valid
        if not response.text:
            # Check finish reason
            if hasattr(response, 'candidates') and response.candidates:
                finish_reason = response.candidates[0].finish_reason
                if finish_reason == 2:  # SAFETY
                    return jsonify({"error": "Content was blocked by safety filters. Please try a different inspiration or tone."}), 400
                elif finish_reason == 3:  # RECITATION
                    return jsonify({"error": "Content was blocked due to recitation concerns. Please try a different inspiration."}), 400
                elif finish_reason == 4:  # OTHER
                    return jsonify({"error": "Content generation failed. Please try again."}), 400
                else:
                    return jsonify({"error": f"Content generation failed with reason: {finish_reason}"}), 400
            else:
                return jsonify({"error": "No content generated. Please try again."}), 400
        
        # Process response
        story_text = response.text.strip()
        
        # Extract title if not provided
        if not title:
            title_match = re.search(r'Title: (.+)', story_text)
            if title_match:
                title = title_match.group(1).strip()
                story_text = story_text.replace(title_match.group(0), '').strip()
        
        # Clean up content
        content_match = re.search(r'Content: (.+)', story_text, re.DOTALL)
        if content_match:
            content = content_match.group(1).strip()
        else:
            content = story_text
        
        return jsonify({
            "title": title,
            "content": content,
            "genre": genre,
            "tone": tone,
            "length": length
        })
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    # Get port from environment variable (for deployment platforms)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)