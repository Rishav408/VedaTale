# Import necessary libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles   # ✅ added
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables (like your API key) from the .env file
load_dotenv()

# --- 1. LangChain Setup ---

veda_template = """
You are VedaTale, a master storyteller who weaves tales inspired by Hindu mythology, ancient wisdom, and timeless fables. Your voice is enchanting, wise, and suitable for all ages.

Generate a complete story based on the user's request.

**Story Requirements:**
- **Inspiration/Theme**: {inspiration}
- **Genre**: {genre}
- **Tone**: {tone}
- **Approximate Length**: {length} words
- **Suggested Title (optional)**: {title}

**Your Task:**
1. If the user did not provide a title, create a fitting and imaginative title for the story.
2. Write a compelling story that beautifully incorporates all the user's requirements.
3. Ensure the narrative is coherent, engaging, and flows naturally.
4. Format your response with the title on the very first line, followed by a blank line, and then the full story content.

**Your Generated Story:**
"""

llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.8)
prompt = ChatPromptTemplate.from_template(veda_template)
output_parser = StrOutputParser()
chain = prompt | llm | output_parser

# --- 2. FastAPI Server Setup ---

app = FastAPI()

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Data model
class StoryRequest(BaseModel):
    inspiration: str
    title: str | None = None
    genre: str
    tone: str
    length: int

# --- 3. API Endpoint ---

@app.post("/api/generate")
async def generate_story(request: StoryRequest):
    try:
        result = chain.invoke(request.dict())

        first_newline = result.find('\n')
        if first_newline == -1:
            story_title = request.title or "A New Tale"
            story_content = result.strip()
        else:
            story_title = result[:first_newline].strip().replace('**', '')
            story_content = result[first_newline:].strip()

        return {"title": story_title, "content": story_content}
    except Exception as e:
        print(f"An error occurred: {e}")
        return {"error": "Failed to generate story from AI."}

# --- 4. Serve Static Pages ---
# ✅ This makes everything inside the "pages" folder available at "/"
app.mount("/", StaticFiles(directory="pages", html=True), name="static-pages")
# Serve CSS files at /styles/*
app.mount("/styles", StaticFiles(directory="styles"), name="static-styles")
# Serve JS files at /scripts/*
app.mount("/scripts", StaticFiles(directory="scripts"), name="static-scripts")


# --- 5. Server Startup ---

if __name__ == "__main__":
    import uvicorn
    print("Starting VedaTale Backend Server...")
    print("Server will be available at: http://localhost:8000")
    print("API documentation at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)
