import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getApplicationById,
  updateApplication,
  getCurrentUser,
  getApplications
} from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";

const REVIEW_SECTIONS_CONFIG = [
  { key: "checkerActivity", title: "1. Checker Activity" },
  { key: "applicationReview", title: "2. Application Review" },
  { key: "identityReview", title: "3. Identity Review" },
  { key: "panReview", title: "4. PAN Review" },
  { key: "addressReview", title: "5. Address Review" },
  { key: "photographReview", title: "6. Photograph Review" },
  { key: "kycReview", title: "7. KYC Review" },
  { key: "riskReview", title: "8. Risk Review" },
  { key: "accountReview", title: "9. Account Review" }
];

export default function ApplicationReview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [application, setApplication] = useState(null);
  const [feedback, setFeedback] = useState("");

  const [reviews, setReviews] = useState({
    checkerActivity: { status: "Verified", remarks: "Maker submission checked." },
    applicationReview: { status: "Verified", remarks: "Details complete." },
    identityReview: { status: "Verified", remarks: "ID valid." },
    panReview: { status: "Verified", remarks: "PAN matches." },
    addressReview: { status: "Verified", remarks: "Address proof valid." },
    photographReview: { status: "Verified", remarks: "Photo clear." },
    kycReview: { status: "Verified", remarks: "KYC compliant." },
    riskReview: { status: "Verified", remarks: "Low risk." },
    accountReview: { status: "Verified", remarks: "Scheme valid." }
  });

  const [decisionRemarks, setDecisionRemarks] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const loadApp = () => {
    let app = getApplicationById(id);
    if (!app) {
      const apps = getApplications();
      app = apps.find((a) => a.status === "Pending Checker Approval") || apps[0];
    }
    if (app) {
      setApplication(app);
      if (app.checkerReviews) {
        setReviews((prev) => ({ ...prev, ...app.checkerReviews }));
        if (app.checkerReviews.finalDecision) {
          setDecisionRemarks(app.checkerReviews.finalDecision.remarks || "");
        }
      }
    }
  };

  useEffect(() => {
    loadApp();
  }, [id]);

  const handleStatusChange = (key, status) => {
    setReviews((prev) => ({
      ...prev,
      [key]: { ...prev[key], status }
    }));
  };

  const handleRemarksChange = (key, remarks) => {
    setReviews((prev) => ({
      ...prev,
      [key]: { ...prev[key], remarks }
    }));
  };

  const handleFinalDecision = (action) => {
    if ((action === "Send for Correction" || action === "Reject") && !decisionRemarks.trim()) {
      setErrorMsg(`Mandatory remarks required for '${action}'.`);
      return;
    }
    setErrorMsg("");

    const timestamp = new Date().toLocaleString();
    const checkerUser = currentUser?.username || "checker.sarah";
    const activity = application.activityHistory || [];

    let newStatus = application.status;
    if (action === "Approve") newStatus = "Approved";
    if (action === "Send for Correction") newStatus = "Correction Required";
    if (action === "Reject") newStatus = "Rejected";

    activity.push({
      timestamp,
      user: checkerUser,
      action: `${action} by Checker: ${decisionRemarks || "No remarks"}`
    });

    const fullReviews = {
      ...reviews,
      finalDecision: {
        status: action,
        remarks: decisionRemarks,
        decidedBy: checkerUser,
        decidedAt: timestamp
      }
    };

    updateApplication(application.id, {
      status: newStatus,
      checkerReviews: fullReviews,
      activityHistory: activity
    });

    if (action === "Approve") {
      navigate(`/accounts/creation?id=${application.id}`);
    } else {
      navigate("/checker/approvals");
    }
  };

  if (!application) {
    return <div className="p-8 text-xs text-slate-500">Loading application...</div>;
  }

  return (
    <div className="space-y-4 bg-white">
      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Checker Review: {application.id}</h1>
          <p className="text-xs text-slate-500">Customer: {application.personalInfo?.firstName} {application.personalInfo?.lastName} • Branch: {application.accountScheme?.homeBranch}</p>
        </div>
        <div className="flex items-center gap-2">
          <StatusBadge status={application.status} />
          <Link to="/checker/approvals" className="border border-slate-300 hover:bg-slate-50 px-2.5 py-1 rounded text-xs">
            Back to Approvals
          </Link>
        </div>
      </div>

      {/* Customer Quick Summary */}
      <div className="border border-slate-200 rounded p-3 bg-slate-50 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
        <div><span className="text-slate-500">Customer ID:</span> <b>{application.customerId || "N/A"}</b></div>
        <div><span className="text-slate-500">PAN:</span> <b>{application.documents?.panNumber || "N/A"}</b></div>
        <div><span className="text-slate-500">Account Type:</span> <b>{application.accountScheme?.accountType}</b></div>
        <div><span className="text-slate-500">Mobile:</span> <b>{application.contactInfo?.mobile}</b></div>
      </div>

      {/* 9 Review Checkpoints */}
      <div className="border border-slate-200 rounded">
        <div className="p-2.5 bg-slate-100 border-b border-slate-200 font-bold text-xs text-slate-700">
          Review Sections (1 – 9)
        </div>

        <div className="divide-y divide-slate-100 p-3 space-y-3">
          {REVIEW_SECTIONS_CONFIG.map((sec) => {
            const current = reviews[sec.key] || { status: "Pending", remarks: "" };
            return (
              <div key={sec.key} className="pt-2 first:pt-0 flex flex-col md:flex-row md:items-center justify-between gap-2">
                <span className="text-xs font-semibold text-slate-800 w-52">{sec.title}</span>

                <div className="flex items-center gap-2 flex-1">
                  <select
                    value={current.status}
                    onChange={(e) => handleStatusChange(sec.key, e.target.value)}
                    className="border border-slate-300 rounded px-2 py-1 text-xs"
                  >
                    <option value="Verified">Verified</option>
                    <option value="Requires Attention">Requires Attention</option>
                    <option value="Pending">Pending</option>
                  </select>

                  <input
                    type="text"
                    value={current.remarks}
                    onChange={(e) => handleRemarksChange(sec.key, e.target.value)}
                    placeholder="Remarks..."
                    className="border border-slate-300 rounded px-2 py-1 text-xs flex-1"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Section 10: Final Decision */}
      <div className="border border-slate-300 rounded p-4 bg-white space-y-3">
        <h2 className="text-xs font-bold uppercase text-slate-900 border-b border-slate-200 pb-1">
          10. Final Decision
        </h2>

        {errorMsg && (
          <p className="text-xs text-red-600 font-semibold">{errorMsg}</p>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Remarks / Rejection Reason / Correction Notes:
          </label>
          <textarea
            rows={2}
            value={decisionRemarks}
            onChange={(e) => {
              setDecisionRemarks(e.target.value);
              setErrorMsg("");
            }}
            placeholder="Enter remarks (mandatory for Send for Correction and Reject)..."
            className="w-full border border-slate-300 rounded p-2 text-xs"
          />
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            onClick={() => handleFinalDecision("Approve")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-xs font-bold"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => handleFinalDecision("Send for Correction")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-1.5 rounded text-xs font-bold"
          >
            Send for Correction
          </button>
          <button
            type="button"
            onClick={() => handleFinalDecision("Reject")}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 rounded text-xs font-bold"
          >
            Reject
          </button>
        </div>
      </div>

      {/* Activity History */}
      <div className="border border-slate-200 rounded p-3">
        <h3 className="text-xs font-bold uppercase text-slate-700 mb-2">Simulated Activity History</h3>
        <div className="space-y-1 text-xs">
          {application.activityHistory?.map((item, idx) => (
            <div key={idx} className="text-slate-600">
              <span className="text-slate-400">[{item.timestamp}]</span> <b>{item.user}:</b> {item.action}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
