import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    `block px-3 py-2 text-xs font-medium rounded transition ${
      isActive ? "bg-slate-200 text-slate-900 font-bold" : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
    }`;

  const subLinkClass = ({ isActive }) =>
    `block pl-6 pr-3 py-1.5 text-xs transition ${
      isActive ? "text-indigo-600 font-bold" : "text-slate-500 hover:text-slate-800"
    }`;

  return (
    <aside className="w-56 border-r border-slate-200 bg-white h-[calc(100vh-3.5rem)] overflow-y-auto p-3 flex flex-col justify-between">
      <nav className="space-y-1">
        <p className="px-3 text-[10px] font-bold uppercase text-slate-400 mb-1">Navigation</p>
        
        {/* 1. Dashboard */}
        <NavLink to="/dashboard" className={linkClass}>
          Dashboard
        </NavLink>

        {/* 2. Onboarding */}
        <div>
          <div className="px-3 py-1 text-xs font-semibold text-slate-700">Onboarding</div>
          <div className="space-y-0.5">
            <NavLink to="/onboarding/applications" className={subLinkClass}>
              • Customer Application
            </NavLink>
            <NavLink to="/onboarding/kyc" className={subLinkClass}>
              • KYC Verification
            </NavLink>
          </div>
        </div>

        {/* 3. Checker Approvals */}
        <NavLink to="/checker/approvals" className={linkClass}>
          Checker Approvals
        </NavLink>

        {/* 4. Account Creation */}
        <NavLink to="/accounts/creation" className={linkClass}>
          Account Creation
        </NavLink>

        {/* 5. Account Management */}
        <NavLink to="/accounts/management" className={linkClass}>
          Account Management
        </NavLink>

        {/* 6. Transaction History */}
        <NavLink to="/transactions" className={linkClass}>
          Transaction History
        </NavLink>

        {/* 7. Bank Statements */}
        <NavLink to="/statements" className={linkClass}>
          Bank Statements
        </NavLink>

        {/* 8. Complaints */}
        <NavLink to="/complaints" className={linkClass}>
          Complaints
        </NavLink>

        {/* 9. Customer Requests */}
        <NavLink to="/requests" className={linkClass}>
          Customer Requests
        </NavLink>
      </nav>

      <div className="p-2 border-t border-slate-100 text-[11px] text-slate-400">
        Happy Bank Prototype
      </div>
    </aside>
  );
}
