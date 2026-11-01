import React from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

export default function MainLayout() {
  const location = useLocation();
  const pathParts = location.pathname.split("/").filter(Boolean);

  const breadcrumbLabels = {
    dashboard: "Dashboard",
    onboarding: "Onboarding",
    applications: "Customer Application",
    kyc: "KYC Verification",
    checker: "Checker Approvals",
    approvals: "Pending Approvals",
    review: "Application Review",
    accounts: "Accounts",
    creation: "Account Creation",
    management: "Account Management",
    transactions: "Transaction History",
    statements: "Bank Statements",
    complaints: "Complaints",
    requests: "Customer Requests"
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 flex flex-col font-sans">
      <Navbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto p-5 bg-white">
          {/* Breadcrumb Trail */}
          <div className="mb-3 text-xs text-slate-500 flex items-center gap-1.5 border-b border-slate-100 pb-2">
            <Link to="/dashboard" className="hover:text-slate-800">Home</Link>
            {pathParts.map((part, index) => {
              const url = `/${pathParts.slice(0, index + 1).join("/")}`;
              const label = breadcrumbLabels[part] || part;
              const isLast = index === pathParts.length - 1;
              return (
                <span key={url} className="flex items-center gap-1.5">
                  <span className="text-slate-300">/</span>
                  {isLast ? (
                    <span className="font-semibold text-slate-700">{label}</span>
                  ) : (
                    <Link to={url} className="hover:text-slate-800">{label}</Link>
                  )}
                </span>
              );
            })}
          </div>

          <Outlet />
        </main>
      </div>
    </div>
  );
}
