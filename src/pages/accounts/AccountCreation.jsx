import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router-dom";
import { getApplications, updateApplication, createAccount, getCurrentUser } from "../../data/dummyData";
import FormInput from "../../components/FormInput";

export default function AccountCreation() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const [applications, setApplications] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [feedback, setFeedback] = useState("");

  const [accountForm, setAccountForm] = useState({
    customerId: "",
    customerName: "",
    accountNumber: "",
    accountType: "Savings",
    scheme: "Classic Savings",
    currency: "INR",
    branch: "Mumbai - Nariman Point Branch",
    nominee: "",
    initialDeposit: 10000,
    status: "Active"
  });

  const generateAccountNumber = () => {
    return `HB1000${Math.floor(100000 + Math.random() * 900000)}`;
  };

  const loadData = () => {
    const apps = getApplications();
    setApplications(apps);
    return apps;
  };

  useEffect(() => {
    const apps = loadData();
    const id = searchParams.get("id");
    if (id) {
      const match = apps.find((a) => a.id === id);
      if (match) selectApp(match);
    } else {
      const firstApproved = apps.find((a) => a.status === "Approved");
      if (firstApproved) selectApp(firstApproved);
    }
  }, [searchParams]);

  const selectApp = (app) => {
    setSelectedAppId(app.id);
    const nomineeStr =
      app.accountScheme?.nomineeAvailable === "Yes"
        ? `${app.accountScheme?.nomineeName} (${app.accountScheme?.nomineeRelationship || "Nominee"})`
        : "None";

    setAccountForm({
      customerId: app.customerId || `CUST-8800`,
      customerName: `${app.personalInfo?.firstName} ${app.personalInfo?.lastName}`,
      accountNumber: generateAccountNumber(),
      accountType: app.accountScheme?.accountType || "Savings",
      scheme: app.accountScheme?.accountType === "Current" ? "Business Current Scheme" : "Standard Savings Scheme",
      currency: app.accountScheme?.currency || "INR",
      branch: app.accountScheme?.homeBranch || "Mumbai - Nariman Point Branch",
      nominee: nomineeStr,
      initialDeposit: 10000,
      status: "Active"
    });
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setAccountForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCreateAccount = (e) => {
    e.preventDefault();
    if (!selectedAppId) return;

    const app = applications.find((a) => a.id === selectedAppId);
    if (!app) return;

    createAccount({
      customerId: accountForm.customerId,
      customerName: accountForm.customerName,
      accountNumber: accountForm.accountNumber,
      accountType: accountForm.accountType,
      scheme: accountForm.scheme,
      branch: accountForm.branch,
      balance: Number(accountForm.initialDeposit) || 0,
      status: accountForm.status,
      email: app.contactInfo?.email || "",
      mobile: app.contactInfo?.mobile || "",
      currency: accountForm.currency,
      nominee: accountForm.nominee
    });

    const activity = app.activityHistory || [];
    activity.push({
      timestamp: new Date().toLocaleString(),
      user: currentUser?.username || "maker.user",
      action: `Account ${accountForm.accountNumber} created by Maker`
    });

    updateApplication(selectedAppId, {
      status: "Account Created",
      createdAccount: {
        accountNumber: accountForm.accountNumber,
        accountType: accountForm.accountType,
        scheme: accountForm.scheme,
        branch: accountForm.branch,
        createdAt: new Date().toLocaleString()
      },
      activityHistory: activity
    });

    loadData();
    setFeedback(`Account ${accountForm.accountNumber} created successfully! Redirecting...`);
    setTimeout(() => {
      navigate(`/accounts/management?highlight=${accountForm.accountNumber}`);
    }, 1200);
  };

  const approvedList = applications.filter((a) => a.status === "Approved");
  const selectedApp = applications.find((a) => a.id === selectedAppId);

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
          <h1 className="text-lg font-bold text-slate-900">Account Creation</h1>
          <p className="text-xs text-slate-500">Create new accounts for Checker-approved applications</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left: Approved Queue */}
        <div className="md:col-span-4 border border-slate-200 rounded">
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
            Approved Applications ({approvedList.length})
          </div>

          <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
            {approvedList.map((app) => (
              <button
                key={app.id}
                onClick={() => selectApp(app)}
                className={`w-full text-left p-3 text-xs ${
                  app.id === selectedAppId ? "bg-slate-100 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-indigo-700 font-semibold">{app.id}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-semibold">Approved</span>
                </div>
                <div className="text-slate-800 mt-1 font-medium">
                  {app.personalInfo?.firstName} {app.personalInfo?.lastName}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {app.accountScheme?.accountType} • {app.accountScheme?.homeBranch}
                </div>
              </button>
            ))}
            {approvedList.length === 0 && (
              <div className="p-4 text-xs text-slate-400 text-center">
                No approved applications awaiting account creation.
              </div>
            )}
          </div>
        </div>

        {/* Right: Form */}
        <div className="md:col-span-8 border border-slate-200 rounded p-5">
          {selectedApp ? (
            <form onSubmit={handleCreateAccount} className="space-y-4">
              <div className="border-b border-slate-200 pb-3 flex justify-between items-center">
                <div>
                  <span className="font-bold text-sm text-slate-900">
                    Application: {selectedApp.id} – {selectedApp.personalInfo?.firstName} {selectedApp.personalInfo?.lastName}
                  </span>
                </div>
              </div>

              {/* Account Number Box */}
              <div className="border border-slate-200 rounded p-3 bg-slate-50 flex justify-between items-center text-xs">
                <div>
                  <span className="text-slate-500 block">Generated Account Number:</span>
                  <span className="font-mono font-bold text-base text-slate-900">{accountForm.accountNumber}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAccountForm((p) => ({ ...p, accountNumber: generateAccountNumber() }))}
                  className="border border-slate-300 hover:bg-slate-100 px-2 py-1 rounded text-xs"
                >
                  Regenerate
                </button>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormInput
                  label="Customer ID"
                  name="customerId"
                  value={accountForm.customerId}
                  onChange={handleFieldChange}
                  disabled
                />
                <FormInput
                  label="Customer Name"
                  name="customerName"
                  value={accountForm.customerName}
                  onChange={handleFieldChange}
                  disabled
                />
                <FormInput
                  label="Account Type"
                  name="accountType"
                  type="select"
                  value={accountForm.accountType}
                  onChange={handleFieldChange}
                  options={["Savings", "Current", "Salary", "Fixed Deposit"]}
                />
                <FormInput
                  label="Account Scheme"
                  name="scheme"
                  value={accountForm.scheme}
                  onChange={handleFieldChange}
                />
                <FormInput
                  label="Account Currency"
                  name="currency"
                  type="select"
                  value={accountForm.currency}
                  onChange={handleFieldChange}
                  options={["INR", "USD", "EUR", "GBP"]}
                />
                <FormInput
                  label="Home Branch"
                  name="branch"
                  type="select"
                  value={accountForm.branch}
                  onChange={handleFieldChange}
                  options={[
                    "Mumbai - Nariman Point Branch",
                    "Mumbai - Bandra Kurla Complex Branch",
                    "Delhi - Connaught Place Branch",
                    "Bengaluru - Whitefield Branch",
                    "Kolkata - Park Street Branch"
                  ]}
                />
                <div className="md:col-span-2">
                  <FormInput
                    label="Nominee Details"
                    name="nominee"
                    value={accountForm.nominee}
                    onChange={handleFieldChange}
                  />
                </div>
                <FormInput
                  label="Initial Deposit (₹)"
                  name="initialDeposit"
                  type="number"
                  value={accountForm.initialDeposit}
                  onChange={handleFieldChange}
                />
                <FormInput
                  label="Account Status"
                  name="status"
                  type="select"
                  value={accountForm.status}
                  onChange={handleFieldChange}
                  options={["Active", "Dormant", "Frozen", "Lien", "Blocked"]}
                />
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-end">
                <button
                  type="submit"
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded text-xs font-semibold"
                >
                  Create Account
                </button>
              </div>
            </form>
          ) : (
            <p className="text-slate-400 text-xs p-8 text-center">Select an approved application to create account.</p>
          )}
        </div>
      </div>
    </div>
  );
}
