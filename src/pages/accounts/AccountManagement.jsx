import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getAccounts, updateAccountStatus } from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";

export default function AccountManagement() {
  const [searchParams] = useSearchParams();
  const [accounts, setAccounts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedAccount, setSelectedAccount] = useState(null);
  const [newStatus, setNewStatus] = useState("Active");
  const [feedback, setFeedback] = useState("");

  const loadData = () => {
    const list = getAccounts();
    setAccounts(list);
  };

  useEffect(() => {
    loadData();
    const queryStatus = searchParams.get("status");
    const queryHighlight = searchParams.get("highlight");
    if (queryStatus) setStatusFilter(queryStatus);
    if (queryHighlight) setSearchTerm(queryHighlight);
  }, [searchParams]);

  const handleOpenStatusModal = (acc) => {
    setSelectedAccount(acc);
    setNewStatus(acc.status);
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!selectedAccount) return;

    updateAccountStatus(selectedAccount.accountNumber, newStatus);
    loadData();
    setFeedback(`Account ${selectedAccount.accountNumber} status changed to ${newStatus}.`);
    setSelectedAccount(null);
    setTimeout(() => setFeedback(""), 3500);
  };

  const filteredAccounts = accounts.filter((acc) => {
    const matchesSearch =
      acc.accountNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.customerId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      acc.branch.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || acc.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4 bg-white">
      {feedback && (
        <div className="bg-slate-800 text-white px-3 py-2 text-xs rounded font-medium">
          {feedback}
        </div>
      )}

      {/* Header */}
      <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Account Management</h1>
          <p className="text-xs text-slate-500">Searchable list of customer accounts and status actions</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-slate-200 rounded">
        {/* Toolbar */}
        <div className="p-3 border-b border-slate-200 flex justify-between items-center gap-3">
          <input
            type="text"
            placeholder="Search by Account, Name, ID, Branch..."
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
              <option value="All">All ({accounts.length})</option>
              <option value="Active">Active</option>
              <option value="Dormant">Dormant</option>
              <option value="Frozen">Frozen</option>
              <option value="Lien">Lien</option>
              <option value="Blocked">Blocked</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Customer ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Account Number</th>
                <th className="py-2.5 px-3">Account Type</th>
                <th className="py-2.5 px-3">Branch</th>
                <th className="py-2.5 px-3">Account Status</th>
                <th className="py-2.5 px-3">Creation Date</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((acc) => (
                  <tr key={acc.accountNumber} className="hover:bg-slate-50">
                    <td className="py-2.5 px-3 font-mono text-slate-600">{acc.customerId}</td>
                    <td className="py-2.5 px-3 font-medium text-slate-900">{acc.customerName}</td>
                    <td className="py-2.5 px-3 font-mono font-semibold text-indigo-700">{acc.accountNumber}</td>
                    <td className="py-2.5 px-3 text-slate-600">{acc.accountType}</td>
                    <td className="py-2.5 px-3 text-slate-600">{acc.branch}</td>
                    <td className="py-2.5 px-3"><StatusBadge status={acc.status} size="sm" /></td>
                    <td className="py-2.5 px-3 text-slate-500">{acc.createdAt}</td>
                    <td className="py-2.5 px-3 text-right">
                      <button
                        onClick={() => handleOpenStatusModal(acc)}
                        className="border border-slate-300 hover:bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold"
                      >
                        Change Status
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="py-6 text-center text-slate-400">
                    No accounts found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Change Status Modal */}
      {selectedAccount && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-sm rounded bg-white p-5 border border-slate-300 space-y-4">
            <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs text-slate-900">Change Account Status</h3>
                <p className="text-[11px] text-slate-500">{selectedAccount.accountNumber} - {selectedAccount.customerName}</p>
              </div>
              <button onClick={() => setSelectedAccount(null)} className="text-slate-400 hover:text-slate-700 text-xs">✕</button>
            </div>

            <form onSubmit={handleSaveStatus} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Select Status
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border border-slate-300 rounded p-1.5 text-xs"
                >
                  <option value="Active">Active</option>
                  <option value="Dormant">Dormant</option>
                  <option value="Frozen">Frozen</option>
                  <option value="Lien">Lien</option>
                  <option value="Blocked">Blocked</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedAccount(null)}
                  className="border border-slate-300 px-3 py-1 rounded text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded text-xs font-semibold"
                >
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
