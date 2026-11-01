import React, { useState, useEffect } from "react";
import { getRequests, updateRequest } from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";

export default function CustomerRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedRequest, setSelectedRequest] = useState(null);
  const [newStatus, setNewStatus] = useState("Pending");
  const [remarks, setRemarks] = useState("");
  const [feedback, setFeedback] = useState("");

  const loadData = () => {
    setRequests(getRequests());
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleOpenProcess = (req) => {
    setSelectedRequest(req);
    setNewStatus(req.status);
    setRemarks(req.remarks || "");
  };

  const handleSaveUpdate = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    updateRequest(selectedRequest.id, {
      status: newStatus,
      remarks
    });

    loadData();
    setFeedback(`Request ${selectedRequest.id} updated.`);
    setSelectedRequest(null);
    setTimeout(() => setFeedback(""), 3000);
  };

  const filteredRequests = requests.filter((r) => {
    const matchesSearch =
      r.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.accountNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "All" || r.status === statusFilter;
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
          <h1 className="text-lg font-bold text-slate-900">Customer Requests</h1>
          <p className="text-xs text-slate-500">Service requests submitted by bank customers</p>
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
              <option value="All">All ({requests.length})</option>
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-2.5 px-3">Request ID</th>
                <th className="py-2.5 px-3">Customer Name</th>
                <th className="py-2.5 px-3">Customer ID</th>
                <th className="py-2.5 px-3">Account Number</th>
                <th className="py-2.5 px-3">Request Type</th>
                <th className="py-2.5 px-3">Description</th>
                <th className="py-2.5 px-3">Request Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Remarks</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.map((req) => (
                <tr key={req.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-semibold text-slate-700">{req.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">{req.customerName}</td>
                  <td className="py-2.5 px-3 font-mono text-slate-600">{req.customerId}</td>
                  <td className="py-2.5 px-3 font-mono text-indigo-700">{req.accountNumber}</td>
                  <td className="py-2.5 px-3">{req.type}</td>
                  <td className="py-2.5 px-3 max-w-xs truncate text-slate-600" title={req.description}>
                    {req.description}
                  </td>
                  <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap">{req.date}</td>
                  <td className="py-2.5 px-3"><StatusBadge status={req.status} size="sm" /></td>
                  <td className="py-2.5 px-3 text-slate-500 text-[11px] max-w-xs truncate" title={req.remarks}>
                    {req.remarks}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <button
                      onClick={() => handleOpenProcess(req)}
                      className="border border-slate-300 hover:bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold"
                    >
                      Process
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Process Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-md rounded bg-white p-5 border border-slate-300 space-y-3">
            <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-xs text-slate-900">Process Request: {selectedRequest.id}</h3>
                <p className="text-[11px] text-slate-500">{selectedRequest.customerName} • {selectedRequest.type}</p>
              </div>
              <button onClick={() => setSelectedRequest(null)} className="text-slate-400 hover:text-slate-700 text-xs">✕</button>
            </div>

            <form onSubmit={handleSaveUpdate} className="space-y-3 text-xs">
              <div>
                <span className="text-slate-500 block mb-0.5">Description:</span>
                <p className="p-2 border rounded bg-slate-50 text-slate-700">{selectedRequest.description}</p>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Status</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full border border-slate-300 rounded p-1.5 bg-white"
                >
                  <option value="Pending">Pending</option>
                  <option value="Processing">Processing</option>
                  <option value="Completed">Completed</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-700 font-semibold mb-1">Remarks</label>
                <textarea
                  rows={2}
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  className="w-full border border-slate-300 rounded p-1.5"
                  placeholder="Enter employee remarks..."
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedRequest(null)}
                  className="border border-slate-300 px-3 py-1 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded font-semibold"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
