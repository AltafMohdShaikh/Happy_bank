import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  getApplications,
  createApplication,
  updateApplication,
  getCurrentUser
} from "../../data/dummyData";
import StatusBadge from "../../components/StatusBadge";
import FormInput from "../../components/FormInput";

const INITIAL_FORM = {
  // Section 1 – Personal Information
  personalInfo: {
    firstName: "",
    middleName: "",
    lastName: "",
    dob: "",
    gender: "Male",
    maritalStatus: "Single",
    fatherName: "",
    motherName: "",
    nationality: "Indian",
    occupation: "Salaried",
    annualIncome: "₹5,00,000 - ₹10,00,000"
  },
  // Section 2 – Contact Information
  contactInfo: {
    mobile: "",
    altMobile: "",
    email: "",
    commAddress: "",
    city: "",
    state: "Maharashtra",
    pinCode: "",
    sameAddress: true,
    permAddress: ""
  },
  // Section 3 – Documents
  documents: {
    panNumber: "",
    panCardUploaded: false,
    panCardName: "",
    idProofType: "Aadhaar Card",
    idProofUploaded: false,
    idProofName: "",
    photoUploaded: false,
    photoName: "",
    otherDocUploaded: false,
    otherDocName: ""
  },
  // Section 4 – Account Scheme
  accountScheme: {
    accountType: "Savings",
    currency: "INR",
    homeBranch: "Mumbai - Nariman Point Branch",
    nomineeAvailable: "Yes",
    nomineeName: "",
    nomineeRelationship: "Spouse",
    nomineeDob: ""
  }
};

const STEP_TITLES = [
  "1. Personal Information",
  "2. Contact Information",
  "3. Documents",
  "4. Account Scheme"
];

export default function CustomerApplication() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [applications, setApplications] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  // Mode: "list", "form", "view"
  const [viewMode, setViewMode] = useState("list");
  const [currentStep, setCurrentStep] = useState(1);
  const [activeAppId, setActiveAppId] = useState(null);
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [message, setMessage] = useState("");

  const currentUser = getCurrentUser();

  const loadData = () => {
    const apps = getApplications();
    setApplications(apps);
    return apps;
  };

  useEffect(() => {
    const apps = loadData();
    const mode = searchParams.get("mode");
    const id = searchParams.get("id");

    if (mode === "new") {
      handleCreateNew();
    } else if (id) {
      const found = apps.find((a) => a.id === id);
      if (found) {
        if (found.status === "Draft" || found.status === "Correction Required") {
          handleEdit(found);
        } else {
          handleView(found);
        }
      }
    }
  }, [searchParams]);

  const showFeedback = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 4000);
  };

  // Handlers for inputs
  const handlePersonalChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      personalInfo: { ...prev.personalInfo, [name]: value }
    }));
  };

  const handleContactChange = (e) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setFormData((prev) => {
      const updated = { ...prev.contactInfo, [name]: val };
      if (name === "sameAddress" && val) {
        updated.permAddress = updated.commAddress;
      }
      if (name === "commAddress" && prev.contactInfo.sameAddress) {
        updated.permAddress = val;
      }
      return { ...prev, contactInfo: updated };
    });
  };

  const handleDocsChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [name]: value }
    }));
  };

  const handleSimulatedDocUpload = (docField, nameField, defaultName) => {
    setFormData((prev) => ({
      ...prev,
      documents: {
        ...prev.documents,
        [docField]: true,
        [nameField]: defaultName
      }
    }));
    showFeedback(`Uploaded: ${defaultName}`);
  };

  const handleSchemeChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      accountScheme: { ...prev.accountScheme, [name]: value }
    }));
  };

  // Navigation between steps
  const handleNext = () => {
    // Basic field checks per step
    if (currentStep === 1) {
      if (!formData.personalInfo.firstName?.trim() || !formData.personalInfo.lastName?.trim()) {
        showFeedback("Please enter at least First Name and Last Name.");
        return;
      }
    } else if (currentStep === 2) {
      if (!formData.contactInfo.mobile?.trim() || !formData.contactInfo.email?.trim()) {
        showFeedback("Please enter Mobile Number and Email Address.");
        return;
      }
    } else if (currentStep === 3) {
      if (!formData.documents.panNumber?.trim()) {
        showFeedback("Please enter PAN Card Number.");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleCreateNew = () => {
    setFormData(INITIAL_FORM);
    setActiveAppId(null);
    setCurrentStep(1);
    setViewMode("form");
  };

  const handleEdit = (app) => {
    setFormData({
      personalInfo: { ...app.personalInfo },
      contactInfo: { ...app.contactInfo },
      documents: { ...app.documents },
      accountScheme: { ...app.accountScheme }
    });
    setActiveAppId(app.id);
    setCurrentStep(1);
    setViewMode("form");
  };

  const handleView = (app) => {
    setFormData({
      personalInfo: { ...app.personalInfo },
      contactInfo: { ...app.contactInfo },
      documents: { ...app.documents },
      accountScheme: { ...app.accountScheme }
    });
    setActiveAppId(app.id);
    setCurrentStep(1);
    setViewMode("view");
  };

  const handleCancel = () => {
    setViewMode("list");
    setActiveAppId(null);
    setCurrentStep(1);
    setSearchParams({});
  };

  const handleSaveDraft = () => {
    if (activeAppId) {
      updateApplication(activeAppId, {
        ...formData,
        status: "Draft"
      });
      showFeedback(`Application ${activeAppId} saved as Draft.`);
    } else {
      const newApp = createApplication({
        ...formData,
        status: "Draft"
      });
      showFeedback(`New Application ${newApp.id} saved as Draft.`);
    }
    loadData();
    setViewMode("list");
    setSearchParams({});
  };

  const handleSubmitForKYC = () => {
    if (!formData.personalInfo.firstName || !formData.contactInfo.mobile || !formData.documents.panNumber) {
      showFeedback("Please ensure First Name, Mobile Number, and PAN are entered before submitting for KYC.");
      return;
    }

    if (activeAppId) {
      const existing = applications.find((a) => a.id === activeAppId);
      const activity = existing?.activityHistory || [];
      activity.push({
        timestamp: new Date().toLocaleString(),
        user: currentUser?.username || "maker.user",
        action: `Submitted application ${activeAppId} for KYC verification`
      });

      updateApplication(activeAppId, {
        ...formData,
        status: "Pending KYC",
        activityHistory: activity
      });
      showFeedback(`Application ${activeAppId} submitted for KYC verification!`);
    } else {
      const newApp = createApplication({
        ...formData,
        status: "Pending KYC"
      });
      showFeedback(`Application ${newApp.id} created & submitted for KYC verification!`);
    }

    loadData();
    setViewMode("list");
    setSearchParams({});
  };

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${app.personalInfo?.firstName} ${app.personalInfo?.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactInfo?.mobile?.includes(searchTerm) ||
      app.documents?.panNumber?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const selectedAppDetails = applications.find((a) => a.id === activeAppId);

  return (
    <div className="space-y-4">
      {/* Feedback Banner */}
      {message && (
        <div className="bg-slate-800 text-white px-4 py-2 text-xs rounded font-medium flex justify-between items-center">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center border-b border-slate-200 pb-3">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Customer Application</h1>
          <p className="text-xs text-slate-500">Create, edit, and submit customer onboarding applications</p>
        </div>

        {viewMode === "list" && (
          <button
            onClick={handleCreateNew}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
          >
            + Create Application
          </button>
        )}
      </div>

      {/* ================= STEP-BY-STEP FORM / VIEW MODE ================= */}
      {viewMode !== "list" ? (
        <div className="bg-white border border-slate-200 rounded p-5 space-y-6">
          {/* Top Bar with Application ID & Status */}
          <div className="flex justify-between items-center border-b border-slate-200 pb-3">
            <div>
              <span className="font-bold text-sm text-slate-900">
                {viewMode === "form" ? (activeAppId ? `Edit ${activeAppId}` : "New Application") : `View ${activeAppId}`}
              </span>
              {selectedAppDetails && (
                <span className="ml-3"><StatusBadge status={selectedAppDetails.status} /></span>
              )}
            </div>

            <button
              onClick={handleCancel}
              className="text-xs text-slate-600 hover:text-slate-900 underline"
            >
              Back to List
            </button>
          </div>

          {/* Simple Step Indicator: Personal Information → Contact Information → Documents → Account Scheme */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3 text-xs">
            {STEP_TITLES.map((title, idx) => {
              const stepNum = idx + 1;
              const isActive = currentStep === stepNum;
              const isDone = currentStep > stepNum;
              return (
                <div key={title} className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(stepNum)}
                    className={`font-semibold px-2 py-1 rounded text-xs transition ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : isDone
                        ? "bg-slate-100 text-slate-800 hover:bg-slate-200"
                        : "text-slate-400"
                    }`}
                  >
                    {title}
                  </button>
                  {idx < STEP_TITLES.length - 1 && <span className="text-slate-300">→</span>}
                </div>
              );
            })}
          </div>

          {/* Correction Remarks Banner if applicable */}
          {selectedAppDetails?.status === "Correction Required" && (
            <div className="border border-orange-300 bg-orange-50 text-orange-800 p-3 rounded text-xs">
              <span className="font-bold">Checker Correction Remarks: </span>
              <span>{selectedAppDetails.checkerReviews?.finalDecision?.remarks || "Please update required fields."}</span>
            </div>
          )}

          {/* ================= STEP 1: PERSONAL INFORMATION ================= */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-1">
                Step 1: Personal Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormInput
                  label="First Name"
                  name="firstName"
                  value={formData.personalInfo.firstName}
                  onChange={handlePersonalChange}
                  required
                  disabled={viewMode === "view"}
                  placeholder="e.g. Vikram"
                />
                <FormInput
                  label="Middle Name"
                  name="middleName"
                  value={formData.personalInfo.middleName}
                  onChange={handlePersonalChange}
                  disabled={viewMode === "view"}
                  placeholder="e.g. Kishore"
                />
                <FormInput
                  label="Last Name"
                  name="lastName"
                  value={formData.personalInfo.lastName}
                  onChange={handlePersonalChange}
                  required
                  disabled={viewMode === "view"}
                  placeholder="e.g. Malhotra"
                />
                <FormInput
                  label="Date of Birth"
                  name="dob"
                  type="date"
                  value={formData.personalInfo.dob}
                  onChange={handlePersonalChange}
                  required
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="Gender"
                  name="gender"
                  type="select"
                  value={formData.personalInfo.gender}
                  onChange={handlePersonalChange}
                  options={["Male", "Female", "Other"]}
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="Marital Status"
                  name="maritalStatus"
                  type="select"
                  value={formData.personalInfo.maritalStatus}
                  onChange={handlePersonalChange}
                  options={["Single", "Married", "Divorced", "Widowed"]}
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="Father's Name"
                  name="fatherName"
                  value={formData.personalInfo.fatherName}
                  onChange={handlePersonalChange}
                  disabled={viewMode === "view"}
                  placeholder="e.g. Kishore Malhotra"
                />
                <FormInput
                  label="Mother's Name"
                  name="motherName"
                  value={formData.personalInfo.motherName}
                  onChange={handlePersonalChange}
                  disabled={viewMode === "view"}
                  placeholder="e.g. Sita Malhotra"
                />
                <FormInput
                  label="Nationality"
                  name="nationality"
                  value={formData.personalInfo.nationality}
                  onChange={handlePersonalChange}
                  disabled={viewMode === "view"}
                  placeholder="Indian"
                />
                <FormInput
                  label="Occupation"
                  name="occupation"
                  type="select"
                  value={formData.personalInfo.occupation}
                  onChange={handlePersonalChange}
                  options={["Salaried", "Self-Employed", "Business", "Professional", "Retired", "Student", "Homemaker"]}
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="Annual Income Range"
                  name="annualIncome"
                  type="select"
                  value={formData.personalInfo.annualIncome}
                  onChange={handlePersonalChange}
                  options={[
                    "Below ₹1,00,000",
                    "₹1,00,000 - ₹5,00,000",
                    "₹5,00,000 - ₹10,00,000",
                    "₹10,00,000 - ₹25,00,000",
                    "₹25,00,000 - ₹50,00,000",
                    "Above ₹50,00,000"
                  ]}
                  disabled={viewMode === "view"}
                />
              </div>
            </div>
          )}

          {/* ================= STEP 2: CONTACT INFORMATION ================= */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-1">
                Step 2: Contact Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormInput
                  label="Mobile Number"
                  name="mobile"
                  value={formData.contactInfo.mobile}
                  onChange={handleContactChange}
                  required
                  disabled={viewMode === "view"}
                  placeholder="+91 98201 12345"
                />
                <FormInput
                  label="Alternate Mobile Number"
                  name="altMobile"
                  value={formData.contactInfo.altMobile}
                  onChange={handleContactChange}
                  disabled={viewMode === "view"}
                  placeholder="+91 98201 54321"
                />
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.contactInfo.email}
                  onChange={handleContactChange}
                  required
                  disabled={viewMode === "view"}
                  placeholder="applicant@example.com"
                />
                <div className="md:col-span-3">
                  <FormInput
                    label="Communication Address"
                    name="commAddress"
                    type="textarea"
                    value={formData.contactInfo.commAddress}
                    onChange={handleContactChange}
                    required
                    disabled={viewMode === "view"}
                    placeholder="House/Flat number, building, street, area"
                  />
                </div>
                <FormInput
                  label="City"
                  name="city"
                  value={formData.contactInfo.city}
                  onChange={handleContactChange}
                  disabled={viewMode === "view"}
                  placeholder="e.g. Mumbai"
                />
                <FormInput
                  label="State"
                  name="state"
                  type="select"
                  value={formData.contactInfo.state}
                  onChange={handleContactChange}
                  options={[
                    "Maharashtra",
                    "Delhi",
                    "Karnataka",
                    "Tamil Nadu",
                    "West Bengal",
                    "Gujarat",
                    "Haryana",
                    "Kerala",
                    "Telangana",
                    "Uttar Pradesh"
                  ]}
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="PIN Code"
                  name="pinCode"
                  value={formData.contactInfo.pinCode}
                  onChange={handleContactChange}
                  disabled={viewMode === "view"}
                  placeholder="e.g. 400030"
                />

                <div className="md:col-span-3">
                  <FormInput
                    label="Permanent Address Same as Communication Address"
                    name="sameAddress"
                    type="checkbox"
                    checked={formData.contactInfo.sameAddress}
                    onChange={handleContactChange}
                    disabled={viewMode === "view"}
                  />
                </div>

                {!formData.contactInfo.sameAddress && (
                  <div className="md:col-span-3">
                    <FormInput
                      label="Permanent Address"
                      name="permAddress"
                      type="textarea"
                      value={formData.contactInfo.permAddress}
                      onChange={handleContactChange}
                      disabled={viewMode === "view"}
                      placeholder="Permanent address..."
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP 3: DOCUMENTS ================= */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-1">
                Step 3: Documents
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 1. PAN Card */}
                <div className="border border-slate-200 rounded p-3 bg-white">
                  <FormInput
                    label="PAN Card"
                    name="panNumber"
                    value={formData.documents.panNumber}
                    onChange={handleDocsChange}
                    required
                    disabled={viewMode === "view"}
                    placeholder="e.g. ABCDE1234F"
                  />
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-500">
                      {formData.documents.panCardUploaded ? `File: ${formData.documents.panCardName}` : "No file uploaded"}
                    </span>
                    {viewMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => handleSimulatedDocUpload("panCardUploaded", "panCardName", "pan_card.pdf")}
                        className="border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded text-xs"
                      >
                        {formData.documents.panCardUploaded ? "Re-upload" : "Upload PAN"}
                      </button>
                    )}
                  </div>
                </div>

                {/* 2. Identity / Address Proof */}
                <div className="border border-slate-200 rounded p-3 bg-white">
                  <FormInput
                    label="Identity / Address Proof"
                    name="idProofType"
                    type="select"
                    value={formData.documents.idProofType}
                    onChange={handleDocsChange}
                    options={["Aadhaar Card", "Passport", "Voter ID Card", "Driving License"]}
                    disabled={viewMode === "view"}
                  />
                  <div className="mt-2 flex justify-between items-center text-xs">
                    <span className="text-slate-500">
                      {formData.documents.idProofUploaded ? `File: ${formData.documents.idProofName}` : "No file uploaded"}
                    </span>
                    {viewMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => handleSimulatedDocUpload("idProofUploaded", "idProofName", "identity_doc.pdf")}
                        className="border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded text-xs"
                      >
                        {formData.documents.idProofUploaded ? "Re-upload" : "Upload Document"}
                      </button>
                    )}
                  </div>
                </div>

                {/* 3. Customer Photograph */}
                <div className="border border-slate-200 rounded p-3 bg-white">
                  <span className="block text-xs font-semibold uppercase text-slate-600 mb-1">Customer Photograph</span>
                  <div className="flex justify-between items-center text-xs mt-2">
                    <span className="text-slate-500">
                      {formData.documents.photoUploaded ? `File: ${formData.documents.photoName}` : "No photograph uploaded"}
                    </span>
                    {viewMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => handleSimulatedDocUpload("photoUploaded", "photoName", "customer_photo.jpg")}
                        className="border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded text-xs"
                      >
                        {formData.documents.photoUploaded ? "Change Photo" : "Upload Photo"}
                      </button>
                    )}
                  </div>
                </div>

                {/* 4. Other Supporting Documents */}
                <div className="border border-slate-200 rounded p-3 bg-white">
                  <span className="block text-xs font-semibold uppercase text-slate-600 mb-1">Other Supporting Documents</span>
                  <div className="flex justify-between items-center text-xs mt-2">
                    <span className="text-slate-500">
                      {formData.documents.otherDocUploaded ? `File: ${formData.documents.otherDocName}` : "Optional"}
                    </span>
                    {viewMode !== "view" && (
                      <button
                        type="button"
                        onClick={() => handleSimulatedDocUpload("otherDocUploaded", "otherDocName", "supporting_doc.pdf")}
                        className="border border-slate-300 hover:bg-slate-50 px-2 py-1 rounded text-xs"
                      >
                        Upload Document
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 4: ACCOUNT SCHEME ================= */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-800 border-b border-slate-100 pb-1">
                Step 4: Account Scheme
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <FormInput
                  label="Account Type"
                  name="accountType"
                  type="select"
                  value={formData.accountScheme.accountType}
                  onChange={handleSchemeChange}
                  options={["Savings", "Current", "Salary", "Fixed Deposit", "Recurring Deposit"]}
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="Account Currency"
                  name="currency"
                  type="select"
                  value={formData.accountScheme.currency}
                  onChange={handleSchemeChange}
                  options={["INR", "USD", "EUR", "GBP"]}
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="Home Branch"
                  name="homeBranch"
                  type="select"
                  value={formData.accountScheme.homeBranch}
                  onChange={handleSchemeChange}
                  options={[
                    "Mumbai - Nariman Point Branch",
                    "Mumbai - Bandra Kurla Complex Branch",
                    "Delhi - Connaught Place Branch",
                    "Bengaluru - Whitefield Branch",
                    "Kolkata - Park Street Branch",
                    "Chennai - Anna Salai Branch",
                    "Gurugram - Cyber City Branch"
                  ]}
                  disabled={viewMode === "view"}
                />
                <FormInput
                  label="Nominee Available"
                  name="nomineeAvailable"
                  type="select"
                  value={formData.accountScheme.nomineeAvailable}
                  onChange={handleSchemeChange}
                  options={["Yes", "No"]}
                  disabled={viewMode === "view"}
                />

                {formData.accountScheme.nomineeAvailable === "Yes" && (
                  <>
                    <FormInput
                      label="Nominee Name"
                      name="nomineeName"
                      value={formData.accountScheme.nomineeName}
                      onChange={handleSchemeChange}
                      required
                      disabled={viewMode === "view"}
                      placeholder="e.g. Rohini Malhotra"
                    />
                    <FormInput
                      label="Nominee Relationship"
                      name="nomineeRelationship"
                      type="select"
                      value={formData.accountScheme.nomineeRelationship}
                      onChange={handleSchemeChange}
                      options={["Spouse", "Father", "Mother", "Son", "Daughter", "Brother", "Sister"]}
                      disabled={viewMode === "view"}
                    />
                    <FormInput
                      label="Nominee Date of Birth"
                      name="nomineeDob"
                      type="date"
                      value={formData.accountScheme.nomineeDob}
                      onChange={handleSchemeChange}
                      disabled={viewMode === "view"}
                    />
                  </>
                )}
              </div>
            </div>
          )}

          {/* ================= STEP BUTTONS: Back, Next, Save Draft, Cancel ================= */}
          <div className="border-t border-slate-200 pt-4 flex justify-between items-center">
            {/* Left side: Back or Cancel */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCancel}
                className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs"
              >
                Cancel
              </button>
              {currentStep > 1 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold"
                >
                  ← Back
                </button>
              )}
            </div>

            {/* Right side: Save Draft, Next / Submit */}
            <div className="flex gap-2">
              {viewMode !== "view" && (
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="border border-slate-300 hover:bg-slate-50 text-slate-700 px-3 py-1.5 rounded text-xs font-semibold"
                >
                  Save Draft
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1.5 rounded text-xs font-semibold"
                >
                  Next →
                </button>
              ) : (
                viewMode !== "view" && (
                  <button
                    type="button"
                    onClick={handleSubmitForKYC}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded text-xs font-semibold"
                  >
                    Submit for KYC
                  </button>
                )
              )}

              {viewMode === "view" && (selectedAppDetails?.status === "Draft" || selectedAppDetails?.status === "Correction Required") && (
                <button
                  type="button"
                  onClick={() => setViewMode("form")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1.5 rounded text-xs font-semibold"
                >
                  Edit Application
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ================= APPLICATIONS LIST ================= */
        <div className="bg-white border border-slate-200 rounded">
          {/* Search & Filter */}
          <div className="p-3 border-b border-slate-200 flex justify-between items-center gap-3">
            <input
              type="text"
              placeholder="Search by ID, name, mobile, PAN..."
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
                <option value="All">All ({applications.length})</option>
                <option value="Draft">Draft</option>
                <option value="Pending KYC">Pending KYC</option>
                <option value="KYC In Progress">KYC In Progress</option>
                <option value="Pending Checker Approval">Pending Checker Approval</option>
                <option value="Correction Required">Correction Required</option>
                <option value="Approved">Approved</option>
                <option value="Account Created">Account Created</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Application ID</th>
                  <th className="py-2.5 px-3">Customer Name</th>
                  <th className="py-2.5 px-3">Mobile</th>
                  <th className="py-2.5 px-3">Account Scheme</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Updated Date</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
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
                      <td className="py-2.5 px-3 text-slate-600">{app.contactInfo?.mobile}</td>
                      <td className="py-2.5 px-3 text-slate-600">{app.accountScheme?.accountType}</td>
                      <td className="py-2.5 px-3">
                        <StatusBadge status={app.status} size="sm" />
                      </td>
                      <td className="py-2.5 px-3 text-slate-500">{app.updatedAt || app.createdAt}</td>
                      <td className="py-2.5 px-3 text-right space-x-1">
                        <button
                          onClick={() => handleView(app)}
                          className="border border-slate-300 hover:bg-slate-50 px-2 py-0.5 rounded text-xs text-slate-700"
                        >
                          View
                        </button>
                        {(app.status === "Draft" || app.status === "Correction Required") && (
                          <button
                            onClick={() => handleEdit(app)}
                            className="bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-2 py-0.5 rounded text-xs font-semibold"
                          >
                            Edit
                          </button>
                        )}
                        {app.status === "Pending KYC" && (
                          <button
                            onClick={() => navigate(`/onboarding/kyc?id=${app.id}`)}
                            className="bg-blue-50 text-blue-700 hover:bg-blue-100 px-2 py-0.5 rounded text-xs font-semibold"
                          >
                            KYC
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400">
                      No applications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
