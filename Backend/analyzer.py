from dotenv import load_dotenv
from google import genai
from google.genai import types  # Required for response schema configuration
from pydantic import BaseModel, Field
import os 

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GENAI_API_KEY")
)

# This schema strictly defines the keys your frontend typescript interface needs
class AnalyzerResponseSchema(BaseModel):
    ats_score: int = Field(description="An ATS score out of 100 based on the job description alignment")
    ats_feedback: str = Field(description="A concise summary of how well the resume matches the job description")
    skills_found: list[str] = Field(description="List of matching skills found in both the resume and job description")
    missing_skills: list[str] = Field(description="List of crucial skills missing from the resume that are required by the job description")
    suggestions: list[str] = Field(description="Actionable improvement suggestions to optimize the resume")
    interview_questions: list[str] = Field(description="3 to 5 realistic interview preparation questions based on gaps or relevant skills")

def analyze_resume(resume_text: str, job_description: str) -> str:
    prompt = f"""
    You are an expert ATS (Applicant Tracking System) optimizer. Analyze the provided resume against the job description.

    Resume Text:
    {resume_text}

    Job Description:
    {job_description}
    """

    # Enforce Gemini to respond strictly following the JSON structure schema
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
        config=types.GenerateContentConfig(
            response_mime_type="application/json",
            response_schema=AnalyzerResponseSchema,
        ),
    )
    
    # This guarantees that response.text is a clean JSON string matching the schema keys
    return response.text