# Import necessary libraries
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import os
from dotenv import load_dotenv

from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser

# Load environment variables (like your API key) from the .env file
load_dotenv()

# --- 1. LangChain Setup ---

# This is the detailed prompt that guides the AI.
# It uses placeholders like {inspiration} that will be filled with data from your frontend form.
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

# Initialize the Google Gemini Model.
# `temperature=0.8` makes the output more creative.
llm = ChatGoogleGenerativeAI(model="gemini-1.5-flash", temperature=0.8)

# Create the prompt template from our string template
prompt = ChatPromptTemplate.from_template(veda_template)

# A simple parser to get the string output from the model
output_parser = StrOutputParser()

# The LangChain "chain": it pipes the prompt, model, and parser together.
chain = prompt | llm | output_parser

# --- 2. FastAPI Server Setup ---

# Create the FastAPI app instance
app = FastAPI()

# Configure CORS (Cross-Origin Resource Sharing)
# This allows your frontend (running on a different address) to communicate with this backend.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins for simplicity.
    allow_credentials=True,
    allow_methods=["*"],  # Allows all HTTP methods.
    allow_headers=["*"],  # Allows all headers.
)

# Define the data structure for incoming requests using Pydantic.
# This ensures the data from the frontend has the correct types.
class StoryRequest(BaseModel):
    inspiration: str
    title: str | None = None
    genre: str
    tone: str
    length: int

# --- 3. API Endpoint ---

# Define the endpoint that will receive requests from your create.html page
@app.post("/api/generate")
async def generate_story(request: StoryRequest):
    """
    Receives story parameters, generates a story using LangChain,
    and returns it as JSON.
    """
    try:
        # Invoke the LangChain chain with the data from the frontend request.
        # The .dict() method converts the Pydantic model to a dictionary.
        result = chain.invoke(request.dict())

        # Process the raw string result from the AI to separate title and content
        first_newline = result.find('\n')
        if first_newline == -1: # If no newline is found, treat the whole thing as content
            story_title = request.title or "A New Tale"
            story_content = result.strip()
        else:
            story_title = result[:first_newline].strip().replace('**', '') # Remove markdown bolding from title
            story_content = result[first_newline:].strip()

        # Return the structured data to the frontend
        return {"title": story_title, "content": story_content}

    except Exception as e:
        print(f"An error occurred: {e}")
        # Return an error message to the frontend if something goes wrong
        return {"error": "Failed to generate story from AI."}

# --- 4. Server Startup ---

if __name__ == "__main__":
    import uvicorn
    print("Starting VedaTale Backend Server...")
    print("Server will be available at: http://localhost:8000")
    print("API documentation at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)