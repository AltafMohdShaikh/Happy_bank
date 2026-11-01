import React, { useState, useEffect } from "react";
import { getTransactions } from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";

export default function TransactionHistory() {
  const [transactions, setTransactions] = useState([]);
  const [searchNameOrAcc, setSearchNameOrAcc] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  useEffect(() => {
    setTransactions(getTransactions());
  }, []);

  const filteredTransactions = transactions.filter((txn) => {
    const matchesSearch =
      txn.accountNumber.toLowerCase().includes(searchNameOrAcc.toLowerCase()) ||
      txn.customerName.toLowerCase().includes(searchNameOrAcc.toLowerCase()) ||
      txn.id.toLowerCase().includes(searchNameOrAcc.toLowerCase());

    const matchesType = typeFilter === "All" || txn.type === typeFilter;
    const matchesStatus = statusFilter === "All" || txn.status === statusFilter;

    let matchesDate = true;
    if (startDate && txn.date < startDate) matchesDate = false;
    if (endDate && txn.date > `${endDate} 23:59`) matchesDate = false;

    return matchesSearch && matchesType && matchesStatus && matchesDate;
  });

  return (
    <div className="space-y-4 bg-white">
      {/* Header */}
      <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Transaction History</h1>
          <p className="text-xs text-slate-500">Record of customer banking transactions</p>
        </div>
      </div>

      {/* Filters Toolbar */}
      <div className="border border-slate-200 rounded p-3 bg-slate-50 space-y-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 text-xs">
          <div>
            <label className="block text-slate-500 mb-0.5">Search Name / Account</label>
            <input
              type="text"
              placeholder="Search..."
              value={searchNameOrAcc}
              onChange={(e) => setSearchNameOrAcc(e.target.value)}
              className="w-full border border-slate-300 rounded px-2 py-1 bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-500 mb-0.5">Transaction Type</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full border border-slate-300 rounded px-2 py-1 bg-white"
            >
              <option value="All">All Types</option>
              <option value="Deposit">Deposit</option>
              <option value="Withdrawal">Withdrawal</option>
              <option value="Transfer">Transfer</option>
              <option value="EMI">EMI</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 mb-0.5">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full border border-slate-300 rounded px-2 py-1 bg-white"
            >
              <option value="All">All Statuses</option>
              <option value="Successful">Successful</option>
              <option value="Failed">Failed</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-500 mb-0.5">Date Range</label>
            <div className="flex gap-1 items-center">
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full border border-slate-300 rounded px-1 py-1 bg-white text-xs"
              />
              <span className="text-slate-400">-</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full border border-slate-300 rounded px-1 py-1 bg-white text-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="border border-slate-200 rounded overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Transaction ID</th>
              <th className="py-2.5 px-3">Customer Name</th>
              <th className="py-2.5 px-3">Account Number</th>
              <th className="py-2.5 px-3">Date</th>
              <th className="py-2.5 px-3">Type</th>
              <th className="py-2.5 px-3 text-right">Amount (₹)</th>
              <th className="py-2.5 px-3">Payment Mode</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3">Reference Number</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((txn) => (
                <tr key={txn.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono text-slate-600">{txn.id}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">{txn.customerName}</td>
                  <td className="py-2.5 px-3 font-mono font-semibold text-indigo-700">{txn.accountNumber}</td>
                  <td className="py-2.5 px-3 text-slate-500">{txn.date}</td>
                  <td className="py-2.5 px-3">{txn.type}</td>
                  <td className="py-2.5 px-3 font-mono font-bold text-right">
                    ₹{txn.amount.toLocaleString("en-IN")}
                  </td>
                  <td className="py-2.5 px-3 text-slate-600">{txn.paymentMode}</td>
                  <td className="py-2.5 px-3"><StatusBadge status={txn.status} size="sm" /></td>
                  <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500">{txn.refNumber}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={9} className="py-6 text-center text-slate-400">
                  No transactions match search criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
