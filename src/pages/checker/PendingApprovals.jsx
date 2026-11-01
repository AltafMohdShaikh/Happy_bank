import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";

export default function PendingApprovals() {
  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("Pending Checker Approval");

  const loadData = () => {
    const apps = getApplications();
    setApplications(apps);
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${app.personalInfo?.firstName} ${app.personalInfo?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" ? true : app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const pendingCount = applications.filter((a) => a.status === "Pending Checker Approval").length;

  return (
    <div className="space-y-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Checker Approvals</h1>
          <p className="text-xs text-slate-500">Applications awaiting Checker review and sign-off ({pendingCount} pending)</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-slate-200 rounded">
        <div className="p-3 border-b border-slate-200 flex justify-between items-center gap-3">
          <input
            type="text"
            placeholder="Search by ID or Name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-slate-300 rounded px-2.5 py-1 text-xs w-72 focus:outline-none"
          />

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-slate-500">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="border border-slate-300 rounded px-2 py-1 text-xs"
            >
              <option value="Pending Checker Approval">Pending Approval ({pendingCount})</option>
              <option value="Approved">Approved</option>
              <option value="Correction Required">Correction Required</option>
              <option value="Rejected">Rejected</option>
              <option value="All">All ({applications.length})</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Application ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Account Scheme</th>
                <th className="py-2.5 px-3">Home Branch</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Submitted Date</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredApps.length > 0 ? (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-semibold text-indigo-700">{app.id}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-800">
                      {app.personalInfo?.firstName} {app.personalInfo?.lastName}
                    </td>
                    <td className="py-2.5 px-3 text-slate-600">{app.accountScheme?.accountType}</td>
                    <td className="py-2.5 px-3 text-slate-600">{app.accountScheme?.homeBranch}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={app.status} size="sm" /></td>
                    <td className="py-2.5 px-3 text-slate-500">{app.updatedAt || app.createdAt}</td>
                    <td className="py-2.5 px-3 text-right">
                      <Link
                        to={`/checker/review/${app.id}`}
                        className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2.5 py-1 rounded text-xs font-semibold"
                      >
                        Review
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="py-6 text-center text-slate-400">
                    No applications found in this status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
