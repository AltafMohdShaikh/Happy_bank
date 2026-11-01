import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getDashboardStats, getApplications } from "../data/dummyData";
import StatusBadge from "../components/StatusBadge";

export default function Dashboard() {
  const [stats, setStats] = useState({
    pendingApplications: 0,
    pendingKYC: 0,
    pendingApprovals: 0,
    totalCustomers: 0,
    totalTransactions: 0,
    activeAccounts: 0,
    dormantAccounts: 0
  });
  const [recentApps, setRecentApps] = useState([]);

  useEffect(() => {
    setStats(getDashboardStats());
    const apps = getApplications();
    setRecentApps(apps.slice(0, 8));
  }, []);

  const summaryCards = [
    { title: "Pending Applications", value: stats.pendingApplications, link: "/onboarding/applications" },
    { title: "Pending KYC", value: stats.pendingKYC, link: "/onboarding/kyc" },
    { title: "Pending Approvals", value: stats.pendingApprovals, link: "/checker/approvals" },
    { title: "Total Customers", value: stats.totalCustomers, link: "/accounts/management" },
    { title: "Total Transactions", value: stats.totalTransactions, link: "/transactions" },
    { title: "Active Accounts", value: stats.activeAccounts, link: "/accounts/management?status=Active" },
    { title: "Dormant Accounts", value: stats.dormantAccounts, link: "/accounts/management?status=Dormant" }
  ];

  return (
    <div className="space-y-5 bg-white">
      {/* Simple Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Dashboard</h1>
          <p className="text-xs text-slate-500">Happy Bank Overview and Metrics</p>
        </div>
        <Link
          to="/onboarding/applications?mode=new"
          className="bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold px-3 py-1.5 rounded"
        >
          + New Customer Application
        </Link>
      </div>

      {/* 7 Summary Cards */}
      <div>
        <h2 className="text-xs font-bold uppercase text-slate-500 mb-2.5">Summary Metrics</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
          {summaryCards.map((card, idx) => (
            <Link
              key={idx}
              to={card.link}
              className="border border-slate-200 rounded p-3 bg-white hover:border-slate-400 block"
            >
              <span className="text-[11px] text-slate-500 block leading-tight">{card.title}</span>
              <span className="text-xl font-bold text-slate-900 mt-1 block">{card.value}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Applications Table */}
      <div className="border border-slate-200 rounded">
        <div className="flex justify-between items-center p-3 border-b border-slate-200 bg-slate-50">
          <h2 className="text-xs font-bold uppercase text-slate-700">Recent Applications</h2>
          <Link to="/onboarding/applications" className="text-xs text-indigo-600 hover:underline">
            View All →
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 border-b border-slate-200 uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Application ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Mobile</th>
                <th className="py-2.5 px-3">Account Type</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Updated Date</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApps.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-semibold text-indigo-700">{app.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-800">
                    {app.personalInfo?.firstName} {app.personalInfo?.lastName}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{app.contactInfo?.mobile}</td>
                  <td className="py-2.5 px-3 text-slate-600">{app.accountScheme?.accountType}</td>
                  <td className="py-2.5 px-3">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="py-2.5 px-3 text-slate-500">{app.updatedAt || app.createdAt}</td>
                  <td className="py-2.5 px-3 text-right">
                    <Link
                      to={`/onboarding/applications?id=${app.id}`}
                      className="border border-slate-300 hover:bg-slate-50 px-2 py-0.5 rounded text-xs text-slate-700"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
