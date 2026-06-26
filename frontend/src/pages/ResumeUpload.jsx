import { useState } from "react";
import axios from "axios";
import { Upload, X, ChevronLeft, ChevronRight, FileCheck } from "lucide-react";
import { useNavigate } from 'react-router-dom';

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Badge from "../components/Badge";
import Button from "../components/Button";
import LoadingSpinner from "../components/LoadingSpinner";

function ResumeUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF resume");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("interview_type", "general");
      formData.append("company", "");

      const API_URL = import.meta.env.VITE_API_URL;

const response = await axios.post(
  `${API_URL}/upload-resume`,
  formData
);
      setResult(response.data);

      const rawQuestions = response.data.questions;
      const parsedQuestions = Array.isArray(rawQuestions)
        ? rawQuestions
        : String(rawQuestions || '')
            .split(/\d+\.\s+/)
            .filter((q) => q.trim())
            .map((q) => q.trim());

      localStorage.setItem('interviewQuestions', JSON.stringify(parsedQuestions));
      localStorage.setItem('interviewSkills', response.data.skills || '');
      localStorage.setItem('interviewRole', 'Resume-based Interview');
      localStorage.setItem('interviewCompany', response.data.company || 'Resume Review');
      localStorage.removeItem('interviewAnswers');
      localStorage.removeItem('selectedReportId');

      setCurrentQuestionIndex(0);
    } catch (error) {
      console.log(error);
      alert("Upload Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const parseQuestions = (questionsText) => {
    let questions = questionsText
      .split(/\d+\.\s+/)
      .filter((q) => q.trim())
      .map((q) => q.trim());

    if (questions.length <= 1) {
      questions = questionsText
        .split("\n\n")
        .filter((q) => q.trim())
        .map((q) => q.trim());
    }

    if (questions.length <= 1) {
      questions = questionsText
        .split("\n")
        .filter((q) => q.trim())
        .map((q) => q.trim());
    }

    return questions;
  };

  const questions = result ? parseQuestions(result.questions) : [];

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 lg:p-12">

            {/* Header */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">
                Resume Analysis
              </h1>
              <p className="text-slate-400 font-medium">
                Upload your resume to extract skills and generate targeted interview questions
              </p>
            </div>

            <div className="max-w-4xl">

              {/* Upload Section */}
              {!result && (
                <>
                  <div
                    className={`
                      relative
                      w-full
                      border-2 border-dashed
                      rounded-2xl
                      p-16
                      text-center
                      cursor-pointer
                      transition-all
                      duration-300
                      ${dragActive
                        ? 'border-cyan-400 bg-cyan-500/10 ring-2 ring-cyan-400/30'
                        : 'border-slate-600 hover:border-cyan-400/50 bg-slate-900/30'
                      }
                    `}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <label htmlFor="resume" className="cursor-pointer block">
                      <div className="flex flex-col items-center gap-4">
                        {/* Icon */}
                        <div className="p-4 rounded-lg bg-cyan-400/10">
                          <Upload size={48} className="text-cyan-400" />
                        </div>

                        {/* Text */}
                        <div>
                          <h3 className="text-2xl font-bold text-white">
                            Drop your resume here
                          </h3>
                          <p className="text-slate-400 mt-2">
                            or click to browse and select a PDF file
                          </p>
                        </div>

                        {/* File Preview */}
                        {file && (
                          <div className="flex items-center gap-3 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/30 text-cyan-300 px-4 py-3 rounded-lg mt-4">
                            <FileCheck size={20} />
                            <span className="text-sm font-semibold">{file.name}</span>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setFile(null);
                              }}
                              className="ml-2 hover:text-cyan-200 transition-colors"
                            >
                              <X size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    </label>

                    <input
                      id="resume"
                      type="file"
                      accept=".pdf"
                      className="hidden"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 mt-8">
                    <Button
                      onClick={handleUpload}
                      disabled={loading || !file}
                      loading={loading}
                      variant="primary"
                      size="lg"
                      className="flex-1"
                    >
                      {loading ? "Analyzing Resume..." : "Analyze Resume"}
                    </Button>

                    {file && (
                      <Button
                        onClick={() => setFile(null)}
                        variant="secondary"
                        size="lg"
                      >
                        Clear
                      </Button>
                    )}
                  </div>
                </>
              )}

              {/* Loading State */}
              {loading && (
                <div className="flex items-center justify-center py-16">
                  <LoadingSpinner size="lg" text="Analyzing your resume..." />
                </div>
              )}

              {/* Results Section */}
              {result && (
                <div className="space-y-12">

                  {/* Skills Section */}
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        Extracted Skills
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Skills identified from your resume
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                      {result.skills
                        .split(",")
                        .map((skill, index) => (
                          <Badge
                            key={index}
                            text={skill.trim()}
                            variant="gradient"
                            size="md"
                          />
                        ))}
                    </div>
                  </div>

                  {/* Questions Section */}
                  <div>
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-white">
                        Generated Interview Questions
                      </h2>
                      <p className="text-slate-400 text-sm mt-1">
                        Practice with these AI-generated questions
                      </p>
                    </div>

                    {/* Current Question Card */}
                    <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-cyan-400/30 rounded-2xl p-8 mb-8 backdrop-blur-xl">
                      <div className="flex items-start gap-6">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400/30 to-cyan-400/5 border border-cyan-400/50 flex items-center justify-center">
                            <span className="text-lg font-bold text-cyan-400">
                              {currentQuestionIndex + 1}
                            </span>
                          </div>
                        </div>
                        <p className="text-lg text-white leading-relaxed">
                          {questions[currentQuestionIndex]?.trim()}
                        </p>
                      </div>

                      {/* Read Again Button */}
                      <div className="mt-6 pt-6 border-t border-slate-700">
                        <button className="text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors">
                          🔊 Read Again
                        </button>
                      </div>
                    </div>

                    {/* Navigation */}
                    <div className="space-y-4">
                      {/* Progress Bar */}
                      <div className="bg-slate-900/50 rounded-lg p-4 border border-slate-700/50">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-slate-300">
                            Question Progress
                          </span>
                          <span className="text-sm font-bold text-cyan-400">
                            {currentQuestionIndex + 1} / {questions.length}
                          </span>
                        </div>
                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-300 rounded-full"
                            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
                          />
                        </div>
                      </div>

                      {/* Navigation Buttons */}
                      <div className="flex gap-4">
                        <Button
                          onClick={() => setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))}
                          disabled={currentQuestionIndex === 0}
                          variant="secondary"
                          size="md"
                        >
                          <ChevronLeft size={18} />
                          Previous
                        </Button>

                        <Button
                          onClick={() => setCurrentQuestionIndex(Math.min(questions.length - 1, currentQuestionIndex + 1))}
                          disabled={currentQuestionIndex === questions.length - 1}
                          variant="primary"
                          size="md"
                          className="flex-1"
                        >
                          Next
                          <ChevronRight size={18} />
                        </Button>
                      </div>

                      {/* Start Interview Button */}
                      <Button
                        onClick={() => navigate('/interview')}
                        variant="success"
                        size="lg"
                        fullWidth
                      >
                        Start Interview
                      </Button>
                    </div>
                  </div>

                </div>
              )}

            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default ResumeUpload;
