from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import pdfplumber
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_FOLDER = "uploads"

@app.get("/")
def home():
    return {"message": "Backend running successfully"}


@app.post("/upload-resume")
async def upload_resume(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text()

            if text:
                extracted_text += text + "\n"

    skills_list = [
    "Python",
    "Java",
    "JavaScript",
    "HTML",
    "CSS",
    "SQL",
    "React",
    "FastAPI",
    "Machine Learning",
    "AI",
    "OpenCV"
    ]

    detected_skills = []

    for skill in skills_list:
        if skill.lower() in extracted_text.lower():
           detected_skills.append(skill)

    return {
    "filename": file.filename,
    "skills": detected_skills,
    "extracted_text": extracted_text
 }