import { BrowserRouter, Routes, Route }
from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ResumeUpload from "./pages/ResumeUpload";
import InterviewSetup from "./pages/InterviewSetup";
import AIInterview from "./pages/AIInterview";
import Report from "./pages/Report";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume-upload" element={<ResumeUpload />} />
        <Route path="/interview-setup" element={<InterviewSetup />} />
        <Route path="/interview" element={<AIInterview />} />
        <Route path="/report" element={<Report />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/settings" element={<Settings />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;