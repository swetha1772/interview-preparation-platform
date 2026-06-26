import {
  LayoutDashboard,
  FileText,
  Mic,
  BarChart3,
  Settings,
  LogOut,
  Brain,
  ChevronRight
} from "lucide-react";

import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    { icon: FileText, label: 'Resume Interview', path: '/resume-upload' },
    { icon: Mic, label: 'Role Interview', path: '/interview-setup' },
    { icon: BarChart3, label: 'Reports', path: '/reports' },
  ];

  return (
    <div className="w-64 fixed left-0 top-0 h-screen bg-gradient-to-b from-slate-950 to-slate-900 border-r border-slate-800/50 flex flex-col shadow-2xl">

      {/* Logo Section */}
      <div className="p-6 border-b border-slate-800/50 flex items-center gap-3 hover:bg-slate-900/50 transition-colors">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/30 to-cyan-400/5 flex items-center justify-center border border-cyan-400/50">
          <Brain size={24} className="text-cyan-400" />
        </div>
        <div>
          <h1 className="text-sm font-black text-white tracking-tight">
            Interview<span className="text-cyan-400">AI</span>
          </h1>
          <p className="text-xs text-slate-500 font-medium">Preparation Platform</p>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-3">Main</p>
        
        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.path);
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center justify-between px-4 py-3 rounded-lg
                transition-all duration-300 cursor-pointer
                group relative
                ${active
                  ? 'bg-gradient-to-r from-cyan-400/20 to-cyan-400/5 text-cyan-400 border-l-2 border-cyan-400'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'
                }
              `}
            >
              <div className="flex items-center gap-3">
                <Icon size={18} className={active ? 'text-cyan-400' : 'group-hover:text-cyan-400/50'} />
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {active && <ChevronRight size={16} className="text-cyan-400" />}
            </Link>
          );
        })}
      </nav>

      {/* Settings & Logout */}
      <div className="p-4 border-t border-slate-800/50 space-y-2">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider px-4 mb-2">Settings</p>

        <Link
          to="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800/30 transition-all duration-300"
        >
          <Settings size={18} />
          <span className="font-medium text-sm">Settings</span>
        </Link>

        <button
          onClick={() => {
            localStorage.removeItem('user_id');
            localStorage.removeItem('username');
            localStorage.removeItem('interviewRole');
            localStorage.removeItem('interviewExperience');
            localStorage.removeItem('interviewCompany');
            localStorage.removeItem('interviewQuestions');
            localStorage.removeItem('interviewAnswers');
            localStorage.removeItem('selectedReportId');
            navigate('/');
          }}
          className="w-full flex items-center gap-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer active:scale-95"
        >
          <LogOut size={18} />
          <span className="font-medium text-sm">Logout</span>
        </button>
      </div>

    </div>
  );
}

export default Sidebar;