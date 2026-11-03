import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser, getApplications } from "../data/dummyData";

export default function Navbar() {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const handleSearch = (e) => {
    const q = e.target.value;
    setSearchQuery(q);
    if (!q.trim()) {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }
    setIsSearching(true);
    const apps = getApplications();
    const filtered = apps
      .filter(
        (a) =>
          a.id.toLowerCase().includes(q.toLowerCase()) ||
          `${a.personalInfo?.firstName} ${a.personalInfo?.lastName}`.toLowerCase().includes(q.toLowerCase())
      )
      .slice(0, 5);
    setSearchResults(filtered);
  };

const handleLogout = () => {
  logoutUser();
  navigate("/login", { replace: true });
};

  return (
    <header className="h-14 border-b border-slate-200 bg-white px-5 flex items-center justify-between">
      {/* Brand */}
      <Link to="/dashboard" className="flex items-center gap-2 font-bold text-slate-900 text-base">
        <span>🏦</span>
        <span>Happy Bank</span>
      </Link>

      {/* Search */}
      <div className="relative w-80">
        <input
          type="text"
          placeholder="Search Application ID or Customer Name..."
          value={searchQuery}
          onChange={handleSearch}
          className="w-full border border-slate-300 rounded px-2.5 py-1 text-xs text-slate-800 focus:outline-none"
        />

        {isSearching && (
          <div className="absolute top-8 left-0 w-full bg-white border border-slate-200 rounded shadow-md z-50 text-xs">
            {searchResults.length > 0 ? (
              searchResults.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setIsSearching(false);
                    setSearchQuery("");
                    navigate(`/onboarding/applications?id=${item.id}`);
                  }}
                  className="w-full text-left px-3 py-2 hover:bg-slate-50 flex justify-between border-b last:border-0"
                >
                  <span className="font-semibold text-indigo-700">{item.id}</span>
                  <span className="text-slate-800">{item.personalInfo?.firstName} {item.personalInfo?.lastName}</span>
                </button>
              ))
            ) : (
              <p className="p-2 text-slate-500">No applications found</p>
            )}
          </div>
        )}
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-4 text-xs">
        {/* Simple Notification Icon */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="text-slate-600 hover:text-slate-900 relative"
            title="Notifications"
          >
            🔔 <span className="text-[10px] bg-red-500 text-white rounded-full px-1">2</span>
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-slate-200 rounded shadow-md p-3 z-50 text-xs space-y-2">
              <p className="font-bold border-b pb-1">Notifications</p>
              <p className="text-slate-600">APP-2026-004 awaiting Checker approval</p>
              <p className="text-slate-600">APP-2026-002 submitted for KYC verification</p>
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 text-slate-700">
          <span>{currentUser?.displayName || "Officer"}</span>
          <span className="text-slate-400">|</span>
          <button
            onClick={handleLogout}
            className="text-red-600 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
