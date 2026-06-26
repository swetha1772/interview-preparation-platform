import { Bell, Settings, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const username = localStorage.getItem("username") || "User";
  const navigate = useNavigate();
  
  return (
    <div className="h-16 bg-gradient-to-r from-slate-900 to-slate-900/80 border-b border-slate-800 flex items-center justify-between px-10 sticky top-0 z-20 backdrop-blur-xl">
      {/* Left - Welcome section */}
      <div className="flex-1">
        <p className="text-slate-400 text-sm font-medium">
          Welcome back, <span className="text-cyan-400 font-semibold">{username}</span>
        </p>
        <p className="text-xs text-slate-500 mt-0.5">
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
        </p>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="p-2.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200 relative group">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-400 rounded-full" />
        </button>

        {/* Settings */}
        <button
          onClick={() => navigate('/settings')}
          className="p-2.5 rounded-lg bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800 transition-all duration-200"
        >
          <Settings size={20} />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 pl-4 border-l border-slate-700">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-white">{username}</p>
            <p className="text-xs text-slate-500">Premium</p>
          </div>
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-400/5 border border-cyan-400/30 flex items-center justify-center">
            <User size={20} className="text-cyan-400" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;