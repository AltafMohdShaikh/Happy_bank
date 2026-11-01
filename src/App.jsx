import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import CustomerApplication from "./pages/onboarding/CustomerApplication";
import KYCVerification from "./pages/onboarding/KYCVerification";
import PendingApprovals from "./pages/checker/PendingApprovals";
import ApplicationReview from "./pages/checker/ApplicationReview";
import AccountCreation from "./pages/accounts/AccountCreation";
import AccountManagement from "./pages/accounts/AccountManagement";
import TransactionHistory from "./pages/transactions/TransactionHistory";
import BankStatements from "./pages/statements/BankStatements";
import Complaints from "./pages/complaints/Complaints";
import CustomerRequests from "./pages/requests/CustomerRequests";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Initial Entry Route */}
        <Route path="/login" element={<Login />} />

        {/* Main Application Wrapper with Navbar, Sidebar, and Breadcrumb */}
        <Route element={<MainLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Onboarding Module */}
          <Route path="/onboarding/applications" element={<CustomerApplication />} />
          <Route path="/onboarding/kyc" element={<KYCVerification />} />

          {/* Checker Approval Module */}
          <Route path="/checker/approvals" element={<PendingApprovals />} />
          <Route path="/checker/review/:id" element={<ApplicationReview />} />
          <Route path="/checker/review" element={<ApplicationReview />} />

          {/* Accounts Module */}
          <Route path="/accounts/creation" element={<AccountCreation />} />
          <Route path="/accounts/create" element={<AccountCreation />} />
          <Route path="/accounts/management" element={<AccountManagement />} />

          {/* Transactions, Statements, Complaints & Requests */}
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/statements" element={<BankStatements />} />
          <Route path="/complaints" element={<Complaints />} />
          <Route path="/requests" element={<CustomerRequests />} />
        </Route>

        {/* Default route redirect to Login as required */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
