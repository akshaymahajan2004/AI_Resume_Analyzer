from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import json  # Used to parse the JSON response from Gemini

from pdf_reader import extract_text
from analyzer import analyze_resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://ai-resume-analyzer-coral-ten.vercel.app"  # Adjust this if your Next.js local port changes
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/analyze")
async def analyze(
    resume: UploadFile = File(...),
    job_description: str = Form(...)
):
    try:
        # Extract plain text content from the uploaded PDF file
        resume_text = extract_text(resume.file)
        
        # Get the strict JSON string output back from the Gemini model configuration
        json_string_result = analyze_resume(resume_text, job_description)
        
        # Convert the JSON string into a native Python dictionary
        parsed_data = json.loads(json_string_result)

        # Returning the dictionary directly yields the precise structure your frontend hooks expect
        return parsed_data
        
    except Exception as e:
        # Catch errors gracefully so the server doesn't crash during processing
        return {"error": f"An error occurred during analysis processing: {str(e)}"}