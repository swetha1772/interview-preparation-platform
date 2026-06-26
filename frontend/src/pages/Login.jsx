
import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const formData = new FormData();

    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/login",
        formData
      );

      if (response.data.message === "Login successful") {
        localStorage.setItem(
          "user_id",
          response.data.user_id
        );

        localStorage.setItem(
          "username",
          response.data.username
        );

        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.log(error);
      alert("Login Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">

        <div className="text-center mb-8">
          <img
    src="/logo.png"
    alt="InterviewAI Logo"
    className="w-20 h-20 mx-auto mb-4"
  />

<h1 className="text-lg font-semibold text-white">
  Interview AI
</h1>
          <p className="text-cyan-300 mt-2">
            Practice smarter. Interview better.
          </p>

          <p className="text-slate-300 text-sm mt-4">
            sign in to your account
          </p>
        </div>

        <div className="space-y-4">

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full p-3 rounded-xl bg-slate-800 text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-cyan-500 hover:bg-cyan-400 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 text-slate-900 font-semibold py-3 rounded-xl"
          >
            Sign In
          </button>
        </div>

        <div className="text-center mt-6">
          <p className="text-slate-300 text-sm">
            New User?
          </p>

          <Link
            to="/register"
            className="text-cyan-400 hover:text-cyan-300 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 inline-block"
          >
            Create Account
          </Link>
        </div>

      </div>
    </div>
  );
}

export default Login;
