import React from "react";

const STATUS_CONFIGS = {
  // Application & KYC Statuses
  Draft: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },
  "Pending KYC": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300" },
  "KYC In Progress": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
  "Pending Checker Approval": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-300" },
  "Correction Required": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-300" },
  Approved: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
  "Account Created": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-300" },
  Rejected: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-300" },

  // Account Statuses
  Active: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
  Dormant: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300" },
  Frozen: { bg: "bg-sky-50", text: "text-sky-700", border: "border-sky-300" },
  Lien: { bg: "bg-indigo-50", text: "text-indigo-700", border: "border-indigo-300" },
  Blocked: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-300" },

  // Transaction Statuses
  Successful: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
  Failed: { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-300" },

  // Checker Checklist Review item statuses
  Verified: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
  "Requires Attention": { bg: "bg-amber-50", text: "text-amber-800", border: "border-amber-300" },
  Pending: { bg: "bg-slate-100", text: "text-slate-700", border: "border-slate-300" },

  // Complaints / Requests
  Open: { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-300" },
  "In Progress": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
  Resolved: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" },
  Closed: { bg: "bg-slate-100", text: "text-slate-600", border: "border-slate-300" },
  Processing: { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-300" },
  Completed: { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-300" }
};

export default function StatusBadge({ status, size = "md", className = "" }) {
  const config = STATUS_CONFIGS[status] || {
    bg: "bg-slate-100",
    text: "text-slate-700",
    border: "border-slate-200"
  };

  const sizeClasses =
    size === "sm"
      ? "text-xs px-2 py-0.5"
      : size === "lg"
      ? "text-sm px-3 py-1 font-semibold"
      : "text-xs px-2.5 py-1 font-medium";

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border ${config.bg} ${config.text} ${config.border} ${sizeClasses} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          config.text.includes("emerald")
            ? "bg-emerald-500"
            : config.text.includes("rose")
            ? "bg-rose-500"
            : config.text.includes("amber")
            ? "bg-amber-500"
            : config.text.includes("blue") || config.text.includes("sky")
            ? "bg-blue-500"
            : config.text.includes("purple") || config.text.includes("indigo")
            ? "bg-purple-500"
            : config.text.includes("orange")
            ? "bg-orange-500"
            : "bg-slate-400"
        }`}
      />
      {status || "Unknown"}
    </span>
  );
}
