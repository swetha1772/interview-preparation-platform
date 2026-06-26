import { useNavigate } from "react-router-dom";
import { FileText, Zap, BarChart3, Clock } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import StatCard from "../components/StatCard";
import FeatureCard from "../components/FeatureCard";

function Dashboard() {
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();
  const history = JSON.parse(localStorage.getItem('interviewHistory') || '[]');

  const interviewsCompleted = history.length;
  const averageScore = interviewsCompleted ? Math.round(history.reduce((sum, item) => sum + item.score, 0) / interviewsCompleted) : 0;
  const lastInterview = history.length ? new Date(history[0].date).toLocaleDateString() : 'No interviews yet';

  const stats = [
    { title: "Interviews Completed", value: `${interviewsCompleted}`, icon: FileText },
    { title: "Average Score", value: `${averageScore}%`, icon: Zap },
    { title: "Strongest Skill", value: "Problem Solving", icon: BarChart3 },
    { title: "Last Interview", value: `${lastInterview}`, icon: Clock }
  ];

  const features = [
    {
      icon: FileText,
      title: "Resume Interview",
      description: "Generate interview questions from your resume and practice with AI-powered feedback.",
      onClick: () => navigate("/resume-upload"),
      badge: "Popular"
    },
    {
      icon: Zap,
      title: "Role-Based Interview",
      description: "Practice for any specific role with targeted questions for your desired position.",
      onClick: () => navigate("/interview-setup"),
      badge: null
    },
    {
      icon: BarChart3,
      title: "Interview Reports",
      description: "View detailed analytics and feedback from all your previous interviews.",
      onClick: () => navigate("/reports"),
      badge: null
    }
  ];

  return (
    <div className="min-h-screen flex bg-slate-950">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden ml-64">
        <Navbar />

        <div className="flex-1 overflow-y-auto">
          {/* Main Content */}
          <div className="p-8 lg:p-12">

            {/* Welcome Section */}
            <div className="mb-12">
              <h1 className="text-4xl font-bold text-white mb-2">
                Welcome back, <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{username}</span>
              </h1>
              <p className="text-slate-400 font-medium">
                Choose your interview type and start practicing today
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className="bg-gradient-to-br from-slate-900 to-slate-800/50 border border-slate-700/50 rounded-xl p-6 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-400/10"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-slate-400 text-xs font-semibold uppercase tracking-wider">
                          {stat.title}
                        </p>
                        <p className="text-3xl font-bold text-white mt-3">
                          {stat.value}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-cyan-400/10">
                        <Icon size={20} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Feature Section */}
            <div className="mb-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-white">
                  Start Interview
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Choose how you want to practice and improve your interview skills
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, idx) => (
                  <FeatureCard
                    key={idx}
                    icon={feature.icon}
                    title={feature.title}
                    description={feature.description}
                    onClick={feature.onClick}
                    badge={feature.badge}
                    highlighted={feature.badge === "Popular"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;