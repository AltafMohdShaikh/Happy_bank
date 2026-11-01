import React, { useState, useEffect } from "react";
import { getComplaints, updateComplaint } from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";

export default function Complaints() {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [newStatus, setNewStatus] = useState("Open");
  const [resolutionRemarks, setResolutionRemarks] = useState("");
  const [feedback, setFeedback] = useState("");

  const loadData = () => {
    setComplaints(getComplaints());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenEdit = (comp) => {
    setSelectedComplaint(comp);
    setNewStatus(comp.status);
    setResolutionRemarks(comp.resolutionRemarks || "");
  };

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;

    updateComplaint(selectedComplaint.id, {
      status: newStatus,
      resolutionRemarks
    });

    loadData();
    setFeedback(`Complaint ${selectedComplaint.id} updated.`);
    setSelectedComplaint(null);
    setTimeout(() => setFeedback(""), 3000);
  };

  const filteredComplaints = complaints.filter((c) => {
    const matchesSearch =
      c.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || c.status === statusFilter;
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
          <h1 className="text-lg font-bold text-slate-900">Complaints</h1>
          <p className="text-xs text-slate-500">List of customer grievances and resolution tracking</p>
        </div>
      </div>

      {/* Table Container */}
      <div className="border border-slate-200 rounded">
        <div className="p-3 border-b border-slate-200 flex justify-between items-center gap-3">
          <input
            type="text"
            placeholder="Search by ID, Customer, Account..."
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
              <option value="All">All ({complaints.length})</option>
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Complaint ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Customer ID</th>
                <th className="py-2.5 px-3">Account Number</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Assigned Employee</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.map((comp) => (
                <tr key={comp.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-700">{comp.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">{comp.customerName}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{comp.customerId}</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-700">{comp.accountNumber}</td>
                  <td className="py-2.5 px-3">{comp.category}</td>
                  <td className="py-2.5 px-3 max-w-xs truncate text-slate-600" title={comp.description}>
                    {comp.description}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{comp.date}</td>
                  <td className="py-2.5 px-3"><StatusBadge status={comp.status} size="sm" /></td>
                  <td className="py-2.5 px-3 text-slate-600">{comp.assignedEmployee}</td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleOpenEdit(comp)}
                      className="border border-slate-300 hover:bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Complaint Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded bg-white p-5 border border-slate-300 space-y-3">
            <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs text-slate-900">Update Complaint: {selectedComplaint.id}</h3>
                <p className="text-[11px] text-slate-500">{selectedComplaint.customerName} • {selectedComplaint.accountNumber}</p>
              </div>
              <button onClick={() => setSelectedComplaint(null)} className="text-slate-400 hover:text-slate-700 text-xs">✕</button>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Description:</span>
                <p className="p-2 border rounded bg-slate-50 text-slate-700">{selectedComplaint.description}</p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border border-slate-300 rounded p-1.5 bg-white"
                >
                  <option value="Open">Open</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Resolution Remarks</label>
                <textarea
                  rows={2}
                  value={resolutionRemarks}
                  onChange={(e) => setResolutionRemarks(e.target.value)}
                  className="w-full border border-slate-300 rounded p-1.5"
                  placeholder="Enter resolution remarks..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedComplaint(null)}
                  className="border border-slate-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded font-semibold"
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
