import { useNavigate } from 'react-router-dom';
import { Download, Share2, ArrowRight, ArrowLeft, Search, TrendingUp, Target } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import ScoreIndicator from '../components/ScoreIndicator';
import Button from '../components/Button';
import Badge from '../components/Badge';

function Report() {
  const navigate = useNavigate();

  const interviewHistory = JSON.parse(localStorage.getItem('interviewHistory') || '[]');
  const selectedReportId = localStorage.getItem('selectedReportId');
  const latestReport = interviewHistory.length ? interviewHistory[0] : null;
  const report = selectedReportId
    ? interviewHistory.find((item) => String(item.id) === String(selectedReportId)) || latestReport
    : latestReport;

  const savedInterviewQuestions = JSON.parse(localStorage.getItem('interviewQuestions') || 'null');
  const savedInterviewAnswers = JSON.parse(localStorage.getItem('interviewAnswers') || 'null');
  const savedEvaluation = JSON.parse(localStorage.getItem('interviewEvaluation') || 'null');
  const interviewQuestions = report?.questions || savedInterviewQuestions;
  const interviewAnswers = report?.answers || savedInterviewAnswers;
  const evaluation = report?.evaluation || savedEvaluation;
  const role = report?.role || localStorage.getItem('interviewRole') || 'Target Role';
  const company = report?.company || localStorage.getItem('interviewCompany') || 'Target Company';
  const interviewDate = report?.date ? new Date(report.date).toLocaleDateString() : new Date().toLocaleDateString();
  const duration = report?.duration || '00:00';

  const storedQuestions = interviewQuestions?.length ? interviewQuestions : [
    'Tell me about yourself and your professional background.',
    'What motivated you to apply for this position?',
    'Walk me through a challenging project you recently completed.'
  ];

  const reportData = {
    overallScore: evaluation?.overall_score ?? 0,
    recommendation: evaluation?.recommendation || 'Pending',
    interviewDate,
    role,
    company,
    duration
  };

  const hasEvaluation = Boolean(evaluation && (evaluation.question_results?.length || evaluation.overall_score != null || evaluation.recommendation || evaluation.strengths?.length || evaluation.areas_of_improvement?.length));

  const questionAnalysis = storedQuestions.map((question, idx) => {
    const answer = interviewAnswers?.[idx] || '';
    const backendQuestion = evaluation?.question_results?.[idx] || null;
    const answerText = answer.trim() ? answer : 'No answer provided';

    return {
      id: idx + 1,
      question,
      yourAnswer: answerText,
      score: backendQuestion?.score ?? null,
      feedback: backendQuestion?.feedback || (hasEvaluation ? 'Interview not evaluated.' : 'Interview not evaluated.')
    };
  });

  const skillScores = [
    { name: 'Technical Knowledge', score: evaluation?.technical_score ?? 0, category: 'Technical' },
    { name: 'Communication', score: evaluation?.communication_score ?? 0, category: 'Soft Skills' },
    { name: 'Confidence', score: evaluation?.confidence_score ?? 0, category: 'Soft Skills' },
    { name: 'Problem Solving', score: evaluation?.problem_solving_score ?? 0, category: 'Technical' }
  ];

  const strengths = evaluation?.strengths?.length ? evaluation.strengths : ['Interview not evaluated.'];
  const improvements = evaluation?.areas_of_improvement?.length ? evaluation.areas_of_improvement : ['Interview not evaluated.'];

  const getRecommendationColor = () => {
    switch (String(reportData.recommendation).toLowerCase()) {
      case 'hire':
        return { bg: 'from-emerald-400/20 to-emerald-400/5', border: 'border-emerald-400/30', text: 'text-emerald-400', label: 'Hire' };
      case 'borderline':
        return { bg: 'from-yellow-400/20 to-yellow-400/5', border: 'border-yellow-400/30', text: 'text-yellow-400', label: 'Borderline' };
      case 'reject':
        return { bg: 'from-red-400/20 to-red-400/5', border: 'border-red-400/30', text: 'text-red-400', label: 'Reject' };
      default:
        return { bg: 'from-slate-400/20 to-slate-400/5', border: 'border-slate-400/30', text: 'text-slate-400', label: 'Pending' };
    }
  };

  const recommendationColor = getRecommendationColor();

  const handleExport = () => {
    const reportPayload = {
      role: reportData.role,
      company: reportData.company,
      date: interviewDate,
      score: reportData.overallScore,
      recommendation: reportData.recommendation,
      duration: reportData.duration,
      questions: storedQuestions,
      answers: interviewAnswers
    };
    const blob = new Blob([JSON.stringify(reportPayload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `interview-report-${Date.now()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const summary = `Interview Report for ${reportData.role} on ${interviewDate}: Score ${reportData.overallScore}%, Recommendation ${reportData.recommendation}.`;
    try {
      await navigator.clipboard.writeText(summary);
      alert('Report summary copied to clipboard');
    } catch {
      alert('Unable to copy summary. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 lg:p-12">

            {/* Header with Navigation */}
            <div className="flex items-center justify-between mb-12">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">
                  Interview Report
                </h1>
                <p className="text-slate-400">
                  {reportData.role} • {reportData.interviewDate}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  onClick={handleExport}
                  variant="secondary"
                  size="md"
                >
                  <Download size={18} />
                  Export
                </Button>
                <Button
                  onClick={handleShare}
                  variant="secondary"
                  size="md"
                >
                  <Share2 size={18} />
                  Share
                </Button>
              </div>
            </div>

            {!hasEvaluation && (
              <div className="mb-8 rounded-2xl border border-slate-700/50 bg-slate-900/60 p-6 text-center text-slate-300">
                Interview not evaluated.
              </div>
            )}

            {/* Score Overview Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">

              {/* Overall Score */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 border border-slate-700/50 rounded-2xl p-8 flex flex-col items-center justify-center backdrop-blur-xl">
                <ScoreIndicator
                  score={reportData.overallScore}
                  maxScore={100}
                  label="Overall Score"
                  size="lg"
                  showPercentage={true}
                />
              </div>

              {/* Recommendation Card */}
              <div className={`
                bg-gradient-to-br ${recommendationColor.bg}
                border ${recommendationColor.border}
                rounded-2xl p-8
                backdrop-blur-xl
              `}>
                <p className="text-sm text-slate-300 font-medium uppercase tracking-wider mb-3">Recommendation</p>
                <h2 className={`text-4xl font-bold ${recommendationColor.text} mb-4`}>
                  {recommendationColor.label}
                </h2>
                <p className="text-sm text-slate-400">
                  {reportData.recommendation === 'hire'
                    ? 'Strong performance across all areas. Ready for next rounds.'
                    : reportData.recommendation === 'borderline'
                    ? 'Good performance. May need additional assessment.'
                    : 'Consider preparing more for this type of role.'}
                </p>
              </div>

              {/* Interview Details */}
              <div className="bg-gradient-to-br from-cyan-400/10 to-blue-400/10 border border-cyan-400/20 rounded-2xl p-8 backdrop-blur-xl">
                <p className="text-sm text-slate-300 font-medium uppercase tracking-wider mb-4">Interview Details</p>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs text-slate-500">Role Interviewed For</p>
                    <p className="text-white font-semibold mt-1">{reportData.role}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">Duration</p>
                    <p className="text-white font-semibold mt-1">{reportData.duration}</p>
                  </div>
                </div>
              </div>

            </div>

            {/* Skill Scores */}
            <div className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">Performance by Skill</h2>
                <p className="text-slate-400 text-sm">Detailed breakdown of your skills</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skillScores.map((skill, idx) => (
                  <div key={idx} className="bg-slate-900/50 border border-slate-700/50 rounded-lg p-6 hover:border-cyan-400/30 transition-all">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-white font-semibold">{skill.name}</h3>
                        <p className="text-xs text-slate-500 mt-1">{skill.category}</p>
                      </div>
                      <Badge text={`${skill.score}%`} variant="primary" size="sm" />
                    </div>

                    {/* Skill Progress Bar */}
                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          skill.score >= 8 ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' :
                          skill.score >= 5 ? 'bg-gradient-to-r from-cyan-400 to-blue-500' :
                          'bg-gradient-to-r from-yellow-400 to-yellow-500'
                        }`}
                        style={{ width: `${Math.min(100, (skill.score / 10) * 100)}%` }}
                      />
                    </div>
                    {idx === 0 && evaluation?.technical_feedback && (
                      <p className="mt-3 text-sm text-slate-400">{evaluation.technical_feedback}</p>
                    )}
                    {idx === 1 && evaluation?.communication_feedback && (
                      <p className="mt-3 text-sm text-slate-400">{evaluation.communication_feedback}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Question-wise Analysis */}
            <div className="mb-12">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">Question-wise Analysis</h2>
                <p className="text-slate-400 text-sm">Your answers and feedback</p>
              </div>

              <div className="space-y-4">
                {questionAnalysis.map((item) => (
                  <div key={item.id} className="bg-gradient-to-r from-slate-900 to-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-400/30 transition-all">

                    {/* Question Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-2">{item.question}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{item.yourAnswer}</p>
                      </div>
                      <div className="flex-shrink-0 ml-6">
                        <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 border border-cyan-400/30 flex items-center justify-center">
                          <div className="text-center">
                            <div className="text-lg font-bold text-cyan-400">{item.score !== null && item.score !== undefined ? item.score : '—'}</div>
                            <div className="text-xs text-slate-400">{item.score !== null && item.score !== undefined ? '/10' : ''}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="pt-4 border-t border-slate-700">
                      <p className="text-sm text-slate-300">
                        <span className="font-semibold text-cyan-400">Feedback: </span>
                        {item.feedback}
                      </p>
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* Strengths and Improvements */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">

              {/* Strengths */}
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                    <TrendingUp size={24} className="text-emerald-400" />
                    Your Strengths
                  </h2>
                </div>

                <div className="space-y-3">
                  {strengths.map((strength, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-emerald-400/10 border border-emerald-400/20 hover:border-emerald-400/40 transition-all">
                      <div className="w-6 h-6 rounded-full bg-emerald-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-emerald-400">✓</span>
                      </div>
                      <p className="text-sm text-slate-300">{strength}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Areas for Improvement */}
              <div>
                <div className="mb-6">
                  <h2 className="text-xl font-bold text-white flex items-center gap-2 mb-1">
                    <Target size={24} className="text-yellow-400" />
                    Areas for Improvement
                  </h2>
                </div>

                <div className="space-y-3">
                  {improvements.map((improvement, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 rounded-lg bg-yellow-400/10 border border-yellow-400/20 hover:border-yellow-400/40 transition-all">
                      <div className="w-6 h-6 rounded-full bg-yellow-400/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-xs text-yellow-400">→</span>
                      </div>
                      <p className="text-sm text-slate-300">{improvement}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-8 border-t border-slate-700">
              <Button
                onClick={() => navigate('/dashboard')}
                variant="secondary"
                size="lg"
              >
                <ArrowLeft size={18} />
                Back to Dashboard
              </Button>

              <Button
                onClick={() => navigate('/interview-setup')}
                variant="primary"
                size="lg"
                className="flex-1"
              >
                Practice Another Interview
              </Button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Report;
