import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setCurrentUser, initializeData } from "../data/dummyData";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("john.maker");
  const [password, setPassword] = useState("password123");

  const handleLogin = (e) => {
    e.preventDefault();
    initializeData();
    setCurrentUser({
      username: username || "john.maker",
      displayName: username?.includes("checker") ? "Sarah Checker" : "John Maker",
      role: username?.includes("checker") ? "Checker Officer" : "Maker Officer",
      branch: "Mumbai Main Branch"
    });
    navigate("/dashboard");
  };

  const handleRegisterCustomer = () => {
    initializeData();
    navigate("/onboarding/applications?mode=new");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4 text-slate-800">
      <div className="w-full max-w-sm border border-slate-300 rounded p-6 bg-white space-y-4">
        <div className="text-center border-b border-slate-200 pb-3">
          <h1 className="text-xl font-bold text-slate-900">Happy Bank</h1>
          <p className="text-xs text-slate-500">Banking Management Skeleton</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
              placeholder="Username"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-slate-300 rounded px-2.5 py-1.5 text-xs text-slate-800 focus:outline-none"
              placeholder="Password"
            />
          </div>

          <div className="pt-2 space-y-2">
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded text-xs font-semibold"
            >
              Login
            </button>

            <button
              type="button"
              onClick={handleRegisterCustomer}
              className="w-full border border-slate-300 hover:bg-slate-50 text-slate-700 py-2 rounded text-xs font-medium"
            >
              Register Customer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
