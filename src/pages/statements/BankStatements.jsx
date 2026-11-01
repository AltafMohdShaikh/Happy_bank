import React, { useState, useEffect } from "react";
import { getAccounts, getTransactions } from "../../data/dummyData";

export default function BankStatements() {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [selectedAccountNumber, setSelectedAccountNumber] = useState("");
  const [startDate, setStartDate] = useState("2026-10-01");
  const [endDate, setEndDate] = useState("2026-11-01");
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    const accs = getAccounts();
    const txns = getTransactions();
    setAccounts(accs);
    setTransactions(txns);
    if (accs.length > 0) {
      setSelectedAccountNumber(accs[0].accountNumber);
    }
  }, []);

  const selectedAccount = accounts.find((a) => a.accountNumber === selectedAccountNumber) || accounts[0];

  const handleDownloadIndividual = () => {
    if (!selectedAccount) return;
    const content = `HAPPY BANK - ACCOUNT STATEMENT
Customer ID: ${selectedAccount.customerId}
Customer Name: ${selectedAccount.customerName}
Account Number: ${selectedAccount.accountNumber}
Account Type: ${selectedAccount.accountType}
Statement Period: ${startDate} to ${endDate}
Current Balance: INR ${selectedAccount.balance}
`;
    const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `statement_${selectedAccount.accountNumber}.txt`;
    link.click();
    setFeedback(`Statement for ${selectedAccount.accountNumber} downloaded.`);
    setTimeout(() => setFeedback(""), 3000);
  };

  const handleBulkDownload = () => {
    const csvContent =
      "Customer ID,Customer Name,Account Number,Account Type,Branch,Balance,Status\n" +
      accounts.map((a) => `"${a.customerId}","${a.customerName}","${a.accountNumber}","${a.accountType}","${a.branch}",${a.balance},"${a.status}"`).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "bulk_statements.csv";
    link.click();
    setFeedback(`Bulk statements exported for ${accounts.length} accounts.`);
    setTimeout(() => setFeedback(""), 3000);
  };

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
          <h1 className="text-lg font-bold text-slate-900">Bank Statements</h1>
          <p className="text-xs text-slate-500">Generate individual customer statements and bulk downloads</p>
        </div>
        <button
          onClick={handleBulkDownload}
          className="border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded text-xs font-semibold"
        >
          Bulk Statement Download
        </button>
      </div>

      {/* Statement Configuration */}
      <div className="border border-slate-200 rounded p-4 space-y-4">
        <h2 className="text-xs font-bold uppercase text-slate-700 border-b border-slate-100 pb-1">
          Statement Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Account Number Search / Select</label>
            <select
              value={selectedAccountNumber}
              onChange={(e) => setSelectedAccountNumber(e.target.value)}
              className="w-full border border-slate-300 rounded p-1.5 bg-white"
            >
              {accounts.map((a) => (
                <option key={a.accountNumber} value={a.accountNumber}>
                  {a.accountNumber} - {a.customerName} ({a.accountType})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Statement Start Date</label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border border-slate-300 rounded p-1.5 bg-white"
            />
          </div>

          <div>
            <label className="block text-slate-600 mb-1 font-semibold">Statement End Date</label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border border-slate-300 rounded p-1.5 bg-white"
            />
          </div>
        </div>

        {/* Selected Account Info Display */}
        {selectedAccount && (
          <div className="border border-slate-200 rounded p-3 bg-slate-50 grid grid-cols-2 md:grid-cols-6 gap-2 text-xs">
            <div><span className="text-slate-500">Customer ID:</span> <b>{selectedAccount.customerId}</b></div>
            <div><span className="text-slate-500">Customer Name:</span> <b>{selectedAccount.customerName}</b></div>
            <div><span className="text-slate-500">Account Number:</span> <b>{selectedAccount.accountNumber}</b></div>
            <div><span className="text-slate-500">Account Type:</span> <b>{selectedAccount.accountType}</b></div>
            <div><span className="text-slate-500">Start Date:</span> <b>{startDate}</b></div>
            <div><span className="text-slate-500">End Date:</span> <b>{endDate}</b></div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-slate-100">
          <button
            onClick={handleDownloadIndividual}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-xs font-semibold"
          >
            Individual Statement Download
          </button>
        </div>
      </div>
    </div>
  );
}
