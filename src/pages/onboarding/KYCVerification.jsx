import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getApplications, updateApplication, getCurrentUser } from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";
import FormInput from "../../components/FormInput";

export default function KYCVerification() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [selectedAppId, setSelectedAppId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [feedback, setFeedback] = useState("");

  const [kycForm, setKycForm] = useState({
    identityDocType: "Aadhaar Card",
    identityDocNumber: "",
    nameOnDoc: "",
    dobOnDoc: "",
    docIssueDate: "",
    docExpiryDate: "",
    identityDocUploaded: true,
    addressType: "Communication",
    houseNumber: "",
    street: "",
    city: "",
    state: "Maharashtra",
    pinCode: "",
    addressProofType: "Electricity Bill",
    addressProofUploaded: true,
    addressStatus: "Verified",
    photoUploaded: true,
    photoStatus: "Verified",
    remarks: ""
  });

  const currentUser = getCurrentUser();

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
      const pending = apps.find((a) => a.status === "Pending KYC" || a.status === "KYC In Progress");
      if (pending) selectApp(pending);
    }
  }, [searchParams]);

  const selectApp = (app) => {
    setSelectedAppId(app.id);
    if (app.kycDetails) {
      setKycForm({ ...app.kycDetails });
    } else {
      setKycForm({
        identityDocType: app.documents?.idProofType || "Aadhaar Card",
        identityDocNumber: app.documents?.panNumber || "8912 3456 7890",
        nameOnDoc: `${app.personalInfo?.firstName} ${app.personalInfo?.lastName}`,
        dobOnDoc: app.personalInfo?.dob || "",
        docIssueDate: "2020-01-15",
        docExpiryDate: "2030-01-14",
        identityDocUploaded: Boolean(app.documents?.idProofUploaded),
        addressType: "Communication",
        houseNumber: app.contactInfo?.commAddress?.split(",")[0] || "Flat 101",
        street: app.contactInfo?.commAddress?.split(",")[1] || "Main Road",
        city: app.contactInfo?.city || "",
        state: app.contactInfo?.state || "Maharashtra",
        pinCode: app.contactInfo?.pinCode || "",
        addressProofType: "Electricity Bill",
        addressProofUploaded: true,
        addressStatus: "Verified",
        photoUploaded: Boolean(app.documents?.photoUploaded),
        photoStatus: "Verified",
        remarks: "Maker preliminary checks completed."
      });
    }
  };

  const handleFieldChange = (e) => {
    const { name, value } = e.target;
    setKycForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveDraft = () => {
    if (!selectedAppId) return;
    updateApplication(selectedAppId, {
      kycDetails: kycForm,
      status: "KYC In Progress"
    });
    loadData();
    setFeedback(`KYC saved as In Progress for ${selectedAppId}.`);
    setTimeout(() => setFeedback(""), 3500);
  };

  const handleSubmitForChecker = () => {
    if (!selectedAppId) return;
    const app = applications.find((a) => a.id === selectedAppId);
    if (!app) return;

    const activity = app.activityHistory || [];
    activity.push({
      timestamp: new Date().toLocaleString(),
      user: currentUser?.username || "maker.user",
      action: `KYC submitted for Checker Approval for application ${selectedAppId}`
    });

    const checkerReviews = app.checkerReviews || {
      checkerActivity: { status: "Verified", remarks: "Maker submitted KYC." },
      applicationReview: { status: "Verified", remarks: "Application fields checked." },
      identityReview: { status: "Verified", remarks: "Identity doc verified." },
      panReview: { status: "Verified", remarks: "PAN verified." },
      addressReview: { status: "Verified", remarks: "Address verified." },
      photographReview: { status: "Verified", remarks: "Photo verified." },
      kycReview: { status: "Pending", remarks: "Checker audit pending." },
      riskReview: { status: "Pending", remarks: "Risk tier pending." },
      accountReview: { status: "Pending", remarks: "Scheme validated." },
      finalDecision: { status: "Pending", remarks: "" }
    };

    updateApplication(selectedAppId, {
      kycDetails: kycForm,
      status: "Pending Checker Approval",
      checkerReviews,
      activityHistory: activity
    });

    loadData();
    setFeedback(`Application ${selectedAppId} submitted for Checker Approval.`);
    setTimeout(() => {
      navigate(`/checker/approvals`);
    }, 1200);
  };

  const selectedApp = applications.find((a) => a.id === selectedAppId);
  const kycList = applications.filter((a) =>
    a.status === "Pending KYC" || a.status === "KYC In Progress" || a.status === "Correction Required"
  );

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
          <h1 className="text-lg font-bold text-slate-900">KYC Verification</h1>
          <p className="text-xs text-slate-500">Maker verification of identity, address, and photograph</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        {/* Left: Queue */}
        <div className="md:col-span-4 border border-slate-200 rounded">
          <div className="p-2.5 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-700">
            KYC Queue ({kycList.length})
          </div>

          <div className="divide-y divide-slate-100 max-h-[600px] overflow-y-auto">
            {kycList.map((app) => (
              <button
                key={app.id}
                onClick={() => selectApp(app)}
                className={`w-full text-left p-3 text-xs ${
                  app.id === selectedAppId ? "bg-slate-100 font-bold" : "hover:bg-slate-50"
                }`}
              >
                <div className="flex justify-between items-center">
                  <span className="text-indigo-700 font-semibold">{app.id}</span>
                  <StatusBadge status={app.status} size="sm" />
                </div>
                <div className="text-slate-800 mt-1 font-medium">
                  {app.personalInfo?.firstName} {app.personalInfo?.lastName}
                </div>
                <div className="text-slate-500 text-[11px] mt-0.5">
                  {app.accountScheme?.accountType} • {app.contactInfo?.mobile}
                </div>
              </button>
            ))}
            {kycList.length === 0 && (
              <p className="p-4 text-xs text-slate-400 text-center">No applications pending KYC</p>
            )}
          </div>
        </div>

        {/* Right: 4 KYC Sections */}
        <div className="md:col-span-8 border border-slate-200 rounded p-5 space-y-6">
          {selectedApp ? (
            <div>
              <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-4">
                <div>
                  <span className="font-bold text-sm text-slate-900">KYC: {selectedApp.id}</span>
                  <span className="ml-2"><StatusBadge status={selectedApp.status} size="sm" /></span>
                </div>
                <div className="space-x-2">
                  <button
                    onClick={handleSaveDraft}
                    className="border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded text-xs"
                  >
                    Save KYC Draft
                  </button>
                  <button
                    onClick={handleSubmitForChecker}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                  >
                    Submit for Checker Approval
                  </button>
                </div>
              </div>

              {/* Section 1 – Customer Information */}
              <div className="border border-slate-200 rounded p-3 mb-5 bg-slate-50 space-y-2">
                <h2 className="text-xs font-bold uppercase text-slate-700">Section 1 – Customer Information</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
                  <div><span className="text-slate-500">App ID:</span> <b>{selectedApp.id}</b></div>
                  <div><span className="text-slate-500">Customer ID:</span> <b>{selectedApp.customerId || "Auto-assigned"}</b></div>
                  <div><span className="text-slate-500">Customer Name:</span> <b>{selectedApp.personalInfo?.firstName} {selectedApp.personalInfo?.lastName}</b></div>
                  <div><span className="text-slate-500">DOB:</span> <b>{selectedApp.personalInfo?.dob}</b></div>
                  <div><span className="text-slate-500">Mobile:</span> <b>{selectedApp.contactInfo?.mobile}</b></div>
                  <div><span className="text-slate-500">Email:</span> <b>{selectedApp.contactInfo?.email}</b></div>
                </div>
              </div>

              {/* Section 2 – Identity Verification */}
              <div className="space-y-3 mb-5">
                <h2 className="text-xs font-bold uppercase text-slate-700 border-b border-slate-100 pb-1">
                  Section 2 – Identity Verification
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormInput
                    label="Identity Document Type"
                    name="identityDocType"
                    type="select"
                    value={kycForm.identityDocType}
                    onChange={handleFieldChange}
                    options={["Aadhaar Card", "Passport", "Voter ID Card", "Driving License", "PAN Card"]}
                  />
                  <FormInput
                    label="Document Number"
                    name="identityDocNumber"
                    value={kycForm.identityDocNumber}
                    onChange={handleFieldChange}
                    required
                  />
                  <FormInput
                    label="Name on Document"
                    name="nameOnDoc"
                    value={kycForm.nameOnDoc}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="Date of Birth on Document"
                    name="dobOnDoc"
                    type="date"
                    value={kycForm.dobOnDoc}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="Document Issue Date"
                    name="docIssueDate"
                    type="date"
                    value={kycForm.docIssueDate}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="Document Expiry Date"
                    name="docExpiryDate"
                    type="date"
                    value={kycForm.docExpiryDate}
                    onChange={handleFieldChange}
                  />
                </div>
                <div className="flex justify-between items-center text-xs border border-slate-200 rounded p-2">
                  <span>Document Upload Status: <b className="text-emerald-700">Uploaded & Verified</b></span>
                  <button
                    type="button"
                    onClick={() => {
                      setKycForm((p) => ({ ...p, identityDocUploaded: true }));
                      setFeedback("Scanned document verified.");
                    }}
                    className="border border-slate-300 hover:bg-slate-50 px-2 py-0.5 rounded text-xs"
                  >
                    Re-upload Document
                  </button>
                </div>
              </div>

              {/* Section 3 – Address Verification */}
              <div className="space-y-3 mb-5">
                <h2 className="text-xs font-bold uppercase text-slate-700 border-b border-slate-100 pb-1">
                  Section 3 – Address Verification
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <FormInput
                    label="Address Type"
                    name="addressType"
                    type="select"
                    value={kycForm.addressType}
                    onChange={handleFieldChange}
                    options={["Communication", "Permanent", "Business"]}
                  />
                  <FormInput
                    label="House / Flat Number"
                    name="houseNumber"
                    value={kycForm.houseNumber}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="Street / Area"
                    name="street"
                    value={kycForm.street}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="City"
                    name="city"
                    value={kycForm.city}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="State"
                    name="state"
                    value={kycForm.state}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="PIN Code"
                    name="pinCode"
                    value={kycForm.pinCode}
                    onChange={handleFieldChange}
                  />
                  <FormInput
                    label="Address Proof Type"
                    name="addressProofType"
                    type="select"
                    value={kycForm.addressProofType}
                    onChange={handleFieldChange}
                    options={["Electricity Bill", "Passport", "Voter ID Card", "Aadhaar Card", "Bank Statement"]}
                  />
                  <FormInput
                    label="Address Verification Status"
                    name="addressStatus"
                    type="select"
                    value={kycForm.addressStatus}
                    onChange={handleFieldChange}
                    options={["Verified", "Pending", "Requires Attention"]}
                  />
                </div>
              </div>

              {/* Section 4 – Customer Photograph */}
              <div className="space-y-3 mb-5">
                <h2 className="text-xs font-bold uppercase text-slate-700 border-b border-slate-100 pb-1">
                  Section 4 – Customer Photograph
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border border-slate-200 rounded p-3 text-xs space-y-2">
                    <span className="font-semibold block">Photograph Preview:</span>
                    <div className="w-24 h-28 border border-slate-300 rounded flex items-center justify-center text-slate-400 bg-slate-50">
                      Photo
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setKycForm((p) => ({ ...p, photoUploaded: true }));
                        setFeedback("Photograph uploaded.");
                      }}
                      className="border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded text-xs"
                    >
                      Upload Customer Photograph
                    </button>
                  </div>

                  <div className="space-y-3">
                    <FormInput
                      label="Photograph Verification Status"
                      name="photoStatus"
                      type="select"
                      value={kycForm.photoStatus}
                      onChange={handleFieldChange}
                      options={["Verified", "Pending", "Requires Attention"]}
                    />
                    <FormInput
                      label="Remarks (if required)"
                      name="remarks"
                      type="textarea"
                      rows={2}
                      value={kycForm.remarks}
                      onChange={handleFieldChange}
                      placeholder="Add maker remarks..."
                    />
                  </div>
                </div>
              </div>

              <div className="border-t border-slate-200 pt-3 flex justify-end gap-2">
                <button
                  onClick={handleSaveDraft}
                  className="border border-slate-300 hover:bg-slate-50 px-3 py-1.5 rounded text-xs"
                >
                  Save KYC Details
                </button>
                <button
                  onClick={handleSubmitForChecker}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-xs font-semibold"
                >
                  Submit for Checker Approval
                </button>
              </div>
            </div>
          ) : (
            <p className="text-slate-400 text-xs p-8 text-center">Select an application from the queue to process KYC.</p>
          )}
        </div>
      </div>
    </div>
  );
}
