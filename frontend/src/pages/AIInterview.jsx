import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Mic, MicOff, Send, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';
import ProgressBar from '../components/ProgressBar';
import QuestionCard from '../components/QuestionCard';
import TranscriptBox from '../components/TranscriptBox';
import LoadingSpinner from '../components/LoadingSpinner';

function AIInterview() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(600); // 10 minutes
  const [recordingState, setRecordingState] = useState('idle'); // idle, listening, processing
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [allAnswers, setAllAnswers] = useState(() => {
    const saved = localStorage.getItem('interviewAnswers');
    return saved ? JSON.parse(saved) : {};
  });
  const recognitionRef = useRef(null);
  const isSpeechSupported = typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);

  // Mock questions
  const storedRole = localStorage.getItem('interviewRole');
  const storedExperience = localStorage.getItem('interviewExperience');
  const storedCompany = localStorage.getItem('interviewCompany');
  const storedQuestions = JSON.parse(localStorage.getItem('interviewQuestions') || 'null');

  const defaultQuestions = [
    'Tell me about yourself and your professional background.',
    'What motivated you to apply for this position?',
    'Walk me through a challenging project you recently completed.',
    'How do you handle conflicts with team members?',
    'What are your greatest strengths and weaknesses?',
    'How do you stay updated with the latest technologies in your field?',
    'Describe a time when you failed and what you learned from it.',
    'Where do you see yourself in 5 years?'
  ];

  const questions = storedQuestions?.length ? storedQuestions : defaultQuestions;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 0) {
          handleSubmitInterview();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const transcriptRef = useRef(transcript);

  useEffect(() => {
    const savedAnswer = allAnswers[currentQuestion] || '';
    transcriptRef.current = savedAnswer;
    setTranscript(savedAnswer);
    setRecordingState('idle');
    setIsRecording(false);
  }, [currentQuestion, allAnswers]);

  const saveAnswer = (answerText, questionIndex = currentQuestion) => {
    const updatedAnswer = answerText.trim();
    const updated = {
      ...allAnswers,
      [questionIndex]: updatedAnswer
    };
    localStorage.setItem('interviewAnswers', JSON.stringify(updated));
    setAllAnswers(updated);
    transcriptRef.current = updatedAnswer;
    return updated;
  };

  const handleTranscriptChange = (value) => {
    setTranscript(value);
    transcriptRef.current = value;
  };

  const readQuestionAloud = () => {
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(questions[currentQuestion]);
    utterance.rate = 0.95;
    utterance.pitch = 1;
    utterance.volume = 1;
    window.speechSynthesis.speak(utterance);
  };

  const handleStartRecording = () => {
    if (!isSpeechSupported) {
      alert('Speech recognition is not supported in this browser. Please use a supported browser like Chrome.');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.continuous = true;

    recognition.onstart = () => {
      setRecordingState('listening');
      setIsRecording(true);
      setTranscript('');
      transcriptRef.current = '';
    };

    recognition.onresult = (event) => {
      const transcriptText = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join(' ');

      transcriptRef.current = transcriptText;
      setTranscript(transcriptText);
    };

    recognition.onerror = () => {
      setRecordingState('idle');
      setIsRecording(false);
      alert('Unable to access the microphone or speech recognition failed.');
    };

    recognition.onend = () => {
      if (recognitionRef.current) {
        // Restart listening automatically when the session ends because of a pause.
        recognitionRef.current.start();
        return;
      }

      setRecordingState('processing');
      setIsRecording(false);
      const transcriptText = transcriptRef.current.trim();
      setTranscript(transcriptText);
      saveAnswer(transcriptText);
      setRecordingState('idle');
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleStopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      saveAnswer(transcriptRef.current || transcript || allAnswers[currentQuestion] || '');
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      saveAnswer(transcriptRef.current || transcript || allAnswers[currentQuestion] || '');
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitInterview = async () => {
    const finalAnswers = {
      ...allAnswers,
      [currentQuestion]: transcriptRef.current.trim() || allAnswers[currentQuestion] || ''
    };

    const finalQuestions = questions;
    const duration = formatTime(600 - timeRemaining);

    const history = JSON.parse(localStorage.getItem('interviewHistory') || '[]');

    try {
  setIsSubmitting(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const response = await axios.post(
    `${API_URL}/evaluate-interview`,
    {
      responses: finalQuestions.map((question, idx) => ({
        question,
        answer: finalAnswers[idx] || ""
      }))
    }
  );

      const evaluation = response.data?.evaluation || null;

      const newReport = {
        id: Date.now(),
        role: storedRole || 'Target Role',
        company: storedCompany || 'Target Company',
        date: new Date().toISOString(),
        score: evaluation?.overall_score ?? 0,
        recommendation: evaluation?.recommendation || 'Pending',
        duration,
        status: 'completed',
        questions: finalQuestions,
        answers: finalAnswers,
        evaluation
      };

      localStorage.setItem('interviewAnswers', JSON.stringify(finalAnswers));
      localStorage.setItem('interviewQuestions', JSON.stringify(finalQuestions));
      localStorage.setItem('interviewEvaluation', JSON.stringify(evaluation));
      localStorage.setItem('interviewHistory', JSON.stringify([newReport, ...history]));
      localStorage.removeItem('selectedReportId');
      navigate('/report');
    } catch (error) {
      const newReport = {
        id: Date.now(),
        role: storedRole || 'Target Role',
        company: storedCompany || 'Target Company',
        date: new Date().toISOString(),
        score: 0,
        recommendation: 'Pending',
        duration,
        status: 'completed',
        questions: finalQuestions,
        answers: finalAnswers,
        evaluation: null
      };

      localStorage.setItem('interviewAnswers', JSON.stringify(finalAnswers));
      localStorage.setItem('interviewQuestions', JSON.stringify(finalQuestions));
      localStorage.setItem('interviewEvaluation', JSON.stringify(null));
      localStorage.setItem('interviewHistory', JSON.stringify([newReport, ...history]));
      localStorage.removeItem('selectedReportId');
      navigate('/report');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm">
          <LoadingSpinner size="lg" text="Evaluating your interview..." />
        </div>
      )}
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 lg:p-12">

            {/* Header with Progress and Timer */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    Interview in Progress
                  </h1>
                  <p className="text-slate-400">
                    Question {currentQuestion + 1} of {questions.length}
                  </p>
                </div>

                {/* Timer */}
                <div className={`
                  flex items-center gap-3 px-4 py-3 rounded-lg
                  ${timeRemaining < 120 ? 'bg-red-400/20 border border-red-400/50' : 'bg-cyan-400/10 border border-cyan-400/30'}
                `}>
                  <Clock size={20} className={timeRemaining < 120 ? 'text-red-400' : 'text-cyan-400'} />
                  <span className={`font-bold text-lg ${timeRemaining < 120 ? 'text-red-400' : 'text-cyan-400'}`}>
                    {formatTime(timeRemaining)}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <ProgressBar current={currentQuestion} total={questions.length} />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Left Column - Question */}
              <div className="lg:col-span-2 space-y-6">

                {/* Question Card */}
                <QuestionCard
                  questionNumber={currentQuestion + 1}
                  question={questions[currentQuestion]}
                  isActive={true}
                  hasAnswer={!!allAnswers[currentQuestion]}
                  onReadAgain={() => {
                    readQuestionAloud();
                  }}
                />

                {/* Read Question Aloud Button */}
                <button
                  onClick={readQuestionAloud}
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-gradient-to-r from-cyan-400/20 to-blue-400/20 border border-cyan-400/30 text-cyan-300 hover:text-cyan-200 hover:bg-cyan-400/30 transition-all duration-300 font-medium text-sm"
                >
                  🔊 Read Question Aloud
                </button>

                {/* Recording Controls */}
                <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 backdrop-blur-xl">

                  {/* Recording State Indicator */}
                  <div className="mb-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-3 h-3 rounded-full ${
                        recordingState === 'idle' ? 'bg-slate-500' :
                        recordingState === 'listening' ? 'bg-emerald-400 animate-pulse' :
                        'bg-cyan-400 animate-pulse'
                      }`} />
                      <span className="text-sm font-medium text-slate-300">
                        {recordingState === 'idle' ? 'Ready' :
                         recordingState === 'listening' ? 'Listening...' :
                         'Processing...'}
                      </span>
                    </div>

                    {isRecording && (
                      <div className="flex gap-2">
                        <div className="animate-bounce w-2 h-2 bg-emerald-400 rounded-full" />
                        <div className="animate-bounce w-2 h-2 bg-emerald-400 rounded-full animation-delay-200" />
                        <div className="animate-bounce w-2 h-2 bg-emerald-400 rounded-full animation-delay-400" />
                      </div>
                    )}
                  </div>

                  {/* Voice Control Buttons */}
                  <div className="flex gap-4">
                    <Button
                      onClick={handleStartRecording}
                      disabled={isRecording}
                      variant={isRecording ? 'secondary' : 'primary'}
                      size="lg"
                      className="flex-1"
                    >
                      <Mic size={20} />
                      Begin Answer
                    </Button>

                    <Button
                      onClick={handleStopRecording}
                      disabled={!isRecording}
                      variant="danger"
                      size="lg"
                      className="flex-1"
                    >
                      <MicOff size={20} />
                      Finish Answer
                    </Button>
                  </div>

                  {/* Info Note */}
                  <div className="flex items-start gap-3 mt-6 p-4 bg-slate-800/50 border border-slate-700/50 rounded-lg">
                    <AlertCircle size={18} className="text-cyan-400 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-300">
                      Take your time and speak clearly. The AI will capture your response and provide feedback on your communication, confidence, and technical knowledge.
                    </p>
                  </div>

                </div>

              </div>

              {/* Right Column - Transcript */}
              <div className="space-y-6">
                <TranscriptBox
                  transcript={transcript}
                  isLive={isRecording}
                  onCopy={() => console.log('Copied')}
                />

                <div className="bg-slate-900/70 border border-slate-700/50 rounded-2xl p-6">
                  <label className="block text-sm font-semibold text-slate-300 mb-3">Type or edit your answer</label>
                  <textarea
                    value={transcript}
                    onChange={(e) => handleTranscriptChange(e.target.value)}
                    rows={6}
                    className="w-full rounded-xl border border-slate-700 bg-slate-950 text-slate-100 p-4 text-sm focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 outline-none transition-all"
                    placeholder="Type your answer here if your browser does not support voice input."
                  />
                </div>

                {/* Interview Stats */}
                <div className="bg-gradient-to-br from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 rounded-lg p-6">
                  <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Questions Answered</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {Object.keys(allAnswers).length} / {questions.length}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 mb-1">Time Spent</p>
                      <p className="text-2xl font-bold text-cyan-400">
                        {formatTime(600 - timeRemaining)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Navigation Footer */}
            <div className="flex gap-4 mt-12">
              <Button
                onClick={handlePreviousQuestion}
                disabled={currentQuestion === 0}
                variant="secondary"
                size="lg"
              >
                <ChevronLeft size={18} />
                Previous Question
              </Button>

              {currentQuestion === questions.length - 1 ? (
                <Button
                  onClick={handleSubmitInterview}
                  variant="success"
                  size="lg"
                  className="flex-1"
                >
                  <Send size={18} />
                  Submit Interview
                </Button>
              ) : (
                <Button
                  onClick={handleNextQuestion}
                  variant="primary"
                  size="lg"
                  className="flex-1"
                >
                  Next Question
                  <ChevronRight size={18} />
                </Button>
              )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AIInterview;
