from fastapi import FastAPI, UploadFile, File, Form, Body
from fastapi.middleware.cors import CORSMiddleware
from groq import Groq
from dotenv import load_dotenv
import pdfplumber
import os
import re
import json


from database import SessionLocal
from models import User
from werkzeug.security import (
    generate_password_hash,
    check_password_hash
)
load_dotenv()

app = FastAPI()

# -----------------------------
# Groq Setup
# -----------------------------
client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)

# -----------------------------
# Upload Folder
# -----------------------------
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# -----------------------------
# CORS
# -----------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------
# Home Route
# -----------------------------
@app.get("/")
def home():
    return {"message": "Backend Running Successfully"}

@app.post("/register")
async def register(
    username: str = Form(...),
    email: str = Form(...),
    password: str = Form(...)
):
    db = SessionLocal()

    existing_user = db.query(User).filter(
        User.email == email
    ).first()

    if existing_user:
        return {"message": "Email already exists"}

    hashed_password = generate_password_hash(password)

    user = User(
        username=username,
        email=email,
        password=hashed_password
    )

    db.add(user)
    db.commit()

    return {"message": "Registration successful"}
@app.post("/login")
async def login(
    email: str = Form(...),
    password: str = Form(...)
):
    db = SessionLocal()

    user = db.query(User).filter(
        User.email == email
    ).first()

    if not user:
        return {"message": "User not found"}

    if user.password != password:
        return {"message": "Invalid password"}
        

    return {
        "message": "Login successful",
        "user_id": user.id,
        "username": user.username
    }
# -----------------------------
# Skill Extraction
# -----------------------------
def extract_skills(text):

    prompt = f"""
    Extract all technical skills from the following resume.

    Include:
    - Programming Languages
    - Frameworks
    - Libraries
    - Databases
    - Developer Tools
    - Cloud Platforms
    - AI/ML Technologies

    Resume:
    {text}

    Return ONLY a comma separated list.
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content.strip()


# -----------------------------
# Question Generation
# -----------------------------
def generate_questions(skills, interview_type, company):

    if interview_type == "company":

        prompt = f"""
        You are a senior technical interviewer at {company}.

        Candidate Skills:
        {skills}

        Generate 10 interview questions.

        Requirements:
        - Questions should resemble actual {company} interview rounds.
        - Include technical questions.
        - Include project-based questions.
        - Include coding/problem-solving questions.
        - Include behavioral questions.
        - Difficulty should increase gradually.

        Return only numbered questions.
        """

    else:

        prompt = f"""
        You are a senior software engineer conducting a technical interview.

        Candidate Skills:
        {skills}

        Generate 10 interview questions.

        Requirements:
        - Technical questions
        - Project-based questions
        - Coding questions
        - Scenario-based questions

        Difficulty:
        Easy -> Medium -> Hard

        Return only numbered questions.
        """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    return completion.choices[0].message.content.strip()


# -----------------------------
# Resume Upload Route
# -----------------------------
@app.post("/upload-resume")
async def upload_resume(
    file: UploadFile = File(...),
    interview_type: str = Form("general"),
    company: str = Form("")
):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()

            if text:
                extracted_text += text + "\n"

    # Extract skills using AI
    skills = extract_skills(extracted_text)

    # Generate questions
    questions = generate_questions(
        skills,
        interview_type,
        company
    )

    return {
        "filename": file.filename,
        "skills": skills,
        "interview_type": interview_type,
        "company": company,
        "questions": questions,
        "extracted_text": extracted_text
    }

# -----------------------------
# Generate Role-Based Questions
# -----------------------------
@app.post("/generate-role-questions")
async def generate_role_questions(data: dict = Body(...)):

    role = data["role"]

    prompt = f"""
    You are a senior technical interviewer.

    Generate 10 interview questions for a {role} position.

    Requirements:
    - Include 3 easy questions
    - Include 4 medium questions
    - Include 3 hard questions
    - Cover technical concepts relevant to the role
    - Include practical/coding questions
    - Include behavioral/scenario questions

    Return ONLY the questions, numbered 1-10, one per line.
    Do NOT include explanations or answers.
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    questions = completion.choices[0].message.content.strip()

    return {
        "role": role,
        "questions": questions
    }

# -----------------------------
# Interview Evaluation
# -----------------------------

def _extract_json_object(text: str):
    if not text:
        return None

    cleaned = text.strip()

    if cleaned.startswith("```"):
        cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned)
        cleaned = re.sub(r"\s*```$", "", cleaned)

    start = cleaned.find("{")
    end = cleaned.rfind("}")

    if start != -1 and end != -1 and end > start:
        cleaned = cleaned[start:end + 1]

    try:
        return json.loads(cleaned)
    except json.JSONDecodeError:
        return None


@app.post("/evaluate-interview")
async def evaluate_interview(data: dict = Body(...)):

    responses = data.get("responses", [])

    all_empty = True

    for item in responses:
        if str(item.get("answer", "")).strip():
            all_empty = False
            break

    if all_empty:
        return {
            "evaluation": None,
            "message": "Interview not evaluated."
        }

    responses_text = ""
    for item in responses:
        responses_text += f"Question: {item.get('question', '')}\nAnswer: {item.get('answer', '')}\n\n"

    prompt = f"""
    You are a senior software engineering interviewer.

    IMPORTANT RULES:

    1. Evaluate ONLY the answers provided.
    2. DO NOT invent answers.
    3. DO NOT assume what the candidate said.
    4. If an answer is empty, score it 0/10 and set feedback to "No answer provided".
    5. Never make up information.
    6. Return valid JSON only. Do not wrap it in markdown.

    For each question provide a result object with:
    - question
    - answer
    - score (0-10)
    - feedback
    - strengths (array)
    - weaknesses (array)

    Also provide overall metrics:
    - overall_score (0-100)
    - recommendation (Hire, Borderline, or Reject)
    - technical_score (0-10)
    - communication_score (0-10)
    - problem_solving_score (0-10)
    - confidence_score (0-10)
    - technical_feedback
    - communication_feedback
    - strengths (array of strings)
    - areas_of_improvement (array of strings)

    Return this JSON structure exactly:
    {{
      "overall_score": 0,
      "recommendation": "Borderline",
      "technical_score": 0,
      "communication_score": 0,
      "problem_solving_score": 0,
      "confidence_score": 0,
      "technical_feedback": "",
      "communication_feedback": "",
      "strengths": [],
      "areas_of_improvement": [],
      "question_results": [
        {{
          "question": "",
          "answer": "",
          "score": 0,
          "feedback": "",
          "strengths": [],
          "weaknesses": []
        }}
      ]
    }}

    Interview Responses:

    {responses_text}
    """

    completion = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ]
    )

    raw_response = completion.choices[0].message.content
    parsed = _extract_json_object(raw_response)

    if not parsed:
        parsed = {
            "overall_score": 0,
            "recommendation": "Reject",
            "technical_score": 0,
            "communication_score": 0,
            "problem_solving_score": 0,
            "confidence_score": 0,
            "technical_feedback": "Interview not evaluated.",
            "communication_feedback": "Interview not evaluated.",
            "strengths": [],
            "areas_of_improvement": ["Interview not evaluated."],
            "question_results": [
                {
                    "question": item.get("question", ""),
                    "answer": item.get("answer", ""),
                    "score": 0,
                    "feedback": "Interview not evaluated.",
                    "strengths": [],
                    "weaknesses": []
                }
                for item in responses
            ]
        }

    return {
        "evaluation": parsed,
        "message": "Evaluation completed."
    }