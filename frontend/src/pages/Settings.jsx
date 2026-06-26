import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import Button from '../components/Button';

function Settings() {
  const navigate = useNavigate();
  const username = localStorage.getItem('username') || 'User';

  const handleClearSession = () => {
    localStorage.removeItem('interviewRole');
    localStorage.removeItem('interviewExperience');
    localStorage.removeItem('interviewCompany');
    localStorage.removeItem('interviewQuestions');
    localStorage.removeItem('interviewAnswers');
    alert('Session settings cleared. Your interview data is preserved.');
  };

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          <div className="p-8 lg:p-12">
            <div className="flex items-center justify-between mb-10">
              <div>
                <h1 className="text-4xl font-bold text-white">Settings</h1>
                <p className="text-slate-400 mt-2">Manage your account preferences and session settings.</p>
              </div>
              <Button onClick={() => navigate('/dashboard')} variant="secondary" size="md">
                <ArrowLeft size={18} />
                Back
              </Button>
            </div>

            <div className="max-w-3xl space-y-8">
              <div className="bg-slate-900/70 border border-slate-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Account</h2>
                <div className="space-y-3 text-slate-300">
                  <p><span className="font-semibold text-white">Username:</span> {username}</p>
                  <p><span className="font-semibold text-white">Stored session:</span> role-based interview preferences and current session data</p>
                </div>
              </div>

              <div className="bg-slate-900/70 border border-slate-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Session Controls</h2>
                <p className="text-slate-400 mb-6">Clear only the currently stored interview session values without deleting your saved reports.</p>
                <Button onClick={handleClearSession} variant="danger" size="lg" className="w-full">
                  Clear Interview Session
                </Button>
              </div>

              <div className="bg-slate-900/70 border border-slate-700/50 rounded-3xl p-8">
                <h2 className="text-2xl font-semibold text-white mb-4">Support</h2>
                <p className="text-slate-400 mb-3">If you need a real interview experience, please connect the backend and audio services.</p>
                <p className="text-sm text-slate-500">Your current UI is designed to provide a polished interview flow while your backend integration supplies the real evaluation data.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Settings;
