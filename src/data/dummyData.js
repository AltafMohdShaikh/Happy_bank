// Happy Bank - Initial Dummy Data and LocalStorage Manager

const INITIAL_APPLICATIONS = [
  {
    id: "APP-2026-001",
    customerId: "CUST-8801",
    status: "Draft",
    createdAt: "2026-10-25 10:30 AM",
    updatedAt: "2026-10-25 10:30 AM",
    personalInfo: {
      firstName: "Vikram",
      middleName: "Kishore",
      lastName: "Malhotra",
      dob: "1990-05-14",
      gender: "Male",
      maritalStatus: "Married",
      fatherName: "Kishore Malhotra",
      motherName: "Sita Malhotra",
      nationality: "Indian",
      occupation: "Salaried",
      annualIncome: "₹10,00,000 - ₹25,00,000"
    },
    contactInfo: {
      mobile: "+91 98201 12345",
      altMobile: "+91 98201 54321",
      email: "vikram.malhotra@example.com",
      commAddress: "Flat 402, Sunshine Heights, Worli Sea Face",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400030",
      sameAddress: true,
      permAddress: "Flat 402, Sunshine Heights, Worli Sea Face, Mumbai 400030"
    },
    documents: {
      panNumber: "ABCDE1234F",
      panCardUploaded: true,
      panCardName: "pan_vikram_malhotra.pdf",
      idProofType: "Aadhaar Card",
      idProofUploaded: true,
      idProofName: "aadhaar_vikram.pdf",
      photoUploaded: true,
      photoName: "photo_vikram.jpg",
      otherDocUploaded: false,
      otherDocName: ""
    },
    accountScheme: {
      accountType: "Savings",
      currency: "INR",
      homeBranch: "Mumbai - Nariman Point Branch",
      nomineeAvailable: "Yes",
      nomineeName: "Rohini Malhotra",
      nomineeRelationship: "Spouse",
      nomineeDob: "1992-08-20"
    },
    kycDetails: null,
    checkerReviews: null,
    activityHistory: [
      { timestamp: "2026-10-25 10:30 AM", user: "maker.rahul", action: "Application created and saved as Draft" }
    ]
  },
  {
    id: "APP-2026-002",
    customerId: "CUST-8802",
    status: "Pending KYC",
    createdAt: "2026-10-26 11:15 AM",
    updatedAt: "2026-10-26 11:45 AM",
    personalInfo: {
      firstName: "Priya",
      middleName: "",
      lastName: "Sharma",
      dob: "1994-11-22",
      gender: "Female",
      maritalStatus: "Single",
      fatherName: "Omprakash Sharma",
      motherName: "Radha Sharma",
      nationality: "Indian",
      occupation: "Professional",
      annualIncome: "₹5,00,000 - ₹10,00,000"
    },
    contactInfo: {
      mobile: "+91 98765 43210",
      altMobile: "",
      email: "priya.sharma@example.com",
      commAddress: "B-204, Green Valley Apartments, Andheri West",
      city: "Mumbai",
      state: "Maharashtra",
      pinCode: "400053",
      sameAddress: true,
      permAddress: "B-204, Green Valley Apartments, Andheri West, Mumbai 400053"
    },
    documents: {
      panNumber: "FGHIJ5678K",
      panCardUploaded: true,
      panCardName: "pan_priya_sharma.pdf",
      idProofType: "Passport",
      idProofUploaded: true,
      idProofName: "passport_priya.pdf",
      photoUploaded: true,
      photoName: "photo_priya.jpg",
      otherDocUploaded: true,
      otherDocName: "utility_bill_electricity.pdf"
    },
    accountScheme: {
      accountType: "Salary",
      currency: "INR",
      homeBranch: "Mumbai - Bandra Kurla Complex Branch",
      nomineeAvailable: "Yes",
      nomineeName: "Omprakash Sharma",
      nomineeRelationship: "Father",
      nomineeDob: "1965-03-12"
    },
    kycDetails: null,
    checkerReviews: null,
    activityHistory: [
      { timestamp: "2026-10-26 11:15 AM", user: "maker.rahul", action: "Application created" },
      { timestamp: "2026-10-26 11:45 AM", user: "maker.rahul", action: "Submitted for KYC verification" }
    ]
  },
  {
    id: "APP-2026-003",
    customerId: "CUST-8803",
    status: "KYC In Progress",
    createdAt: "2026-10-27 09:20 AM",
    updatedAt: "2026-10-27 02:10 PM",
    personalInfo: {
      firstName: "Rajesh",
      middleName: "Kumar",
      lastName: "Gupta",
      dob: "1985-02-17",
      gender: "Male",
      maritalStatus: "Married",
      fatherName: "Ramswaroop Gupta",
      motherName: "Kamla Gupta",
      nationality: "Indian",
      occupation: "Business",
      annualIncome: "₹25,00,000 - ₹50,00,000"
    },
    contactInfo: {
      mobile: "+91 99112 23344",
      altMobile: "+91 99112 55667",
      email: "rajesh.gupta@tradex.com",
      commAddress: "Shop 12, Commercial Plaza, Connaught Place",
      city: "New Delhi",
      state: "Delhi",
      pinCode: "110001",
      sameAddress: false,
      permAddress: "House 45, Model Town Phase 2, Delhi 110009"
    },
    documents: {
      panNumber: "KLMNO9012P",
      panCardUploaded: true,
      panCardName: "pan_rajesh_gupta.pdf",
      idProofType: "Aadhaar Card",
      idProofUploaded: true,
      idProofName: "aadhaar_rajesh.pdf",
      photoUploaded: true,
      photoName: "photo_rajesh.jpg",
      otherDocUploaded: true,
      otherDocName: "gst_certificate.pdf"
    },
    accountScheme: {
      accountType: "Current",
      currency: "INR",
      homeBranch: "Delhi - Connaught Place Branch",
      nomineeAvailable: "No",
      nomineeName: "",
      nomineeRelationship: "",
      nomineeDob: ""
    },
    kycDetails: {
      identityDocType: "Aadhaar Card",
      identityDocNumber: "8912 3456 7890",
      nameOnDoc: "Rajesh Kumar Gupta",
      dobOnDoc: "1985-02-17",
      docIssueDate: "2018-06-15",
      docExpiryDate: "2099-12-31",
      identityDocUploaded: true,
      addressType: "Permanent",
      houseNumber: "House 45",
      street: "Model Town Phase 2",
      city: "New Delhi",
      state: "Delhi",
      pinCode: "110009",
      addressProofType: "Voter ID Card",
      addressProofUploaded: true,
      addressStatus: "Verified",
      photoUploaded: true,
      photoStatus: "Pending",
      remarks: "Physical address verification in progress with Delhi team."
    },
    checkerReviews: null,
    activityHistory: [
      { timestamp: "2026-10-27 09:20 AM", user: "maker.anita", action: "Application created" },
      { timestamp: "2026-10-27 10:00 AM", user: "maker.anita", action: "Submitted for KYC verification" },
      { timestamp: "2026-10-27 02:10 PM", user: "maker.anita", action: "KYC draft updated with Identity Proof verified" }
    ]
  },
  {
    id: "APP-2026-004",
    customerId: "CUST-8804",
    status: "Pending Checker Approval",
    createdAt: "2026-10-28 10:00 AM",
    updatedAt: "2026-10-28 04:30 PM",
    personalInfo: {
      firstName: "Ananya",
      middleName: "",
      lastName: "Patel",
      dob: "1996-09-08",
      gender: "Female",
      maritalStatus: "Single",
      fatherName: "Bhupendra Patel",
      motherName: "Savitri Patel",
      nationality: "Indian",
      occupation: "Salaried",
      annualIncome: "₹10,00,000 - ₹25,00,000"
    },
    contactInfo: {
      mobile: "+91 97234 56789",
      altMobile: "",
      email: "ananya.patel@techsolutions.com",
      commAddress: "Tower 3, Apt 1404, Prestige Tech Park Road, Kadubeesanahalli",
      city: "Bengaluru",
      state: "Karnataka",
      pinCode: "560103",
      sameAddress: true,
      permAddress: "Tower 3, Apt 1404, Prestige Tech Park Road, Bengaluru 560103"
    },
    documents: {
      panNumber: "PQRST3456U",
      panCardUploaded: true,
      panCardName: "pan_ananya_patel.pdf",
      idProofType: "Passport",
      idProofUploaded: true,
      idProofName: "passport_ananya.pdf",
      photoUploaded: true,
      photoName: "photo_ananya.jpg",
      otherDocUploaded: true,
      otherDocName: "work_offer_letter.pdf"
    },
    accountScheme: {
      accountType: "Savings",
      currency: "INR",
      homeBranch: "Bengaluru - Whitefield Branch",
      nomineeAvailable: "Yes",
      nomineeName: "Bhupendra Patel",
      nomineeRelationship: "Father",
      nomineeDob: "1963-07-19"
    },
    kycDetails: {
      identityDocType: "Passport",
      identityDocNumber: "Z9874561",
      nameOnDoc: "Ananya Patel",
      dobOnDoc: "1996-09-08",
      docIssueDate: "2020-01-10",
      docExpiryDate: "2030-01-09",
      identityDocUploaded: true,
      addressType: "Communication",
      houseNumber: "Apt 1404, Tower 3",
      street: "Prestige Tech Park Road",
      city: "Bengaluru",
      state: "Karnataka",
      pinCode: "560103",
      addressProofType: "Utility Bill",
      addressProofUploaded: true,
      addressStatus: "Verified",
      photoUploaded: true,
      photoStatus: "Verified",
      remarks: "All original documents matched with official databases. KYC Maker verified."
    },
    checkerReviews: {
      checkerActivity: { status: "Verified", remarks: "Maker checklist complete and valid." },
      applicationReview: { status: "Verified", remarks: "All mandatory personal fields entered correctly." },
      identityReview: { status: "Verified", remarks: "Passport validity confirmed until 2030." },
      panReview: { status: "Verified", remarks: "NSDL PAN active and name matches exactly." },
      addressReview: { status: "Verified", remarks: "Electricity bill recent within last 2 months." },
      photographReview: { status: "Verified", remarks: "Clear photograph, matches passport photo." },
      kycReview: { status: "Pending", remarks: "Awaiting final screening." },
      riskReview: { status: "Pending", remarks: "Low risk customer tier." },
      accountReview: { status: "Pending", remarks: "Standard savings scheme assigned." },
      finalDecision: { status: "Pending", remarks: "" }
    },
    activityHistory: [
      { timestamp: "2026-10-28 10:00 AM", user: "maker.rahul", action: "Application created" },
      { timestamp: "2026-10-28 01:15 PM", user: "maker.rahul", action: "Submitted for KYC verification" },
      { timestamp: "2026-10-28 04:30 PM", user: "maker.anita", action: "KYC Completed and submitted for Checker Approval" }
    ]
  },
  {
    id: "APP-2026-005",
    customerId: "CUST-8805",
    status: "Correction Required",
    createdAt: "2026-10-24 09:00 AM",
    updatedAt: "2026-10-26 05:10 PM",
    personalInfo: {
      firstName: "Rohan",
      middleName: "Sanjay",
      lastName: "Verma",
      dob: "1988-12-04",
      gender: "Male",
      maritalStatus: "Married",
      fatherName: "Sanjay Verma",
      motherName: "Meenakshi Verma",
      nationality: "Indian",
      occupation: "Self-Employed",
      annualIncome: "₹5,00,000 - ₹10,00,000"
    },
    contactInfo: {
      mobile: "+91 98450 11223",
      altMobile: "",
      email: "rohan.verma@craftworks.in",
      commAddress: "Plot 18, Sector 14, Urban Estate",
      city: "Gurugram",
      state: "Haryana",
      pinCode: "122001",
      sameAddress: true,
      permAddress: "Plot 18, Sector 14, Urban Estate, Gurugram 122001"
    },
    documents: {
      panNumber: "UVWXY7890Z",
      panCardUploaded: true,
      panCardName: "pan_rohan_verma.pdf",
      idProofType: "Driving License",
      idProofUploaded: true,
      idProofName: "dl_rohan_blurry.pdf",
      photoUploaded: true,
      photoName: "photo_rohan.jpg",
      otherDocUploaded: false,
      otherDocName: ""
    },
    accountScheme: {
      accountType: "Current",
      currency: "INR",
      homeBranch: "Gurugram - Cyber City Branch",
      nomineeAvailable: "Yes",
      nomineeName: "Shalini Verma",
      nomineeRelationship: "Spouse",
      nomineeDob: "1990-04-14"
    },
    kycDetails: {
      identityDocType: "Driving License",
      identityDocNumber: "HR-26-2015001234",
      nameOnDoc: "Rohan Verma",
      dobOnDoc: "1988-12-04",
      docIssueDate: "2015-08-10",
      docExpiryDate: "2035-08-09",
      identityDocUploaded: true,
      addressType: "Communication",
      houseNumber: "Plot 18",
      street: "Sector 14",
      city: "Gurugram",
      state: "Haryana",
      pinCode: "122001",
      addressProofType: "Electricity Bill",
      addressProofUploaded: false,
      addressStatus: "Requires Attention",
      photoUploaded: true,
      photoStatus: "Verified",
      remarks: "Uploaded Driving License is blurred and address proof document is missing page 2."
    },
    checkerReviews: {
      checkerActivity: { status: "Verified", remarks: "Reviewed by Checker Amit." },
      applicationReview: { status: "Verified", remarks: "Application fields okay." },
      identityReview: { status: "Requires Attention", remarks: "DL scan is too blurred, barcode not readable." },
      panReview: { status: "Verified", remarks: "PAN matches records." },
      addressReview: { status: "Requires Attention", remarks: "Electricity bill page 2 missing consumer details." },
      photographReview: { status: "Verified", remarks: "Clear photograph." },
      kycReview: { status: "Requires Attention", remarks: "Please re-upload high resolution documents." },
      riskReview: { status: "Pending", remarks: "" },
      accountReview: { status: "Pending", remarks: "" },
      finalDecision: {
        status: "Send for Correction",
        remarks: "Please ask customer for a legible colored scan of Driving License and complete 2-page electricity bill."
      }
    },
    activityHistory: [
      { timestamp: "2026-10-24 09:00 AM", user: "maker.rahul", action: "Application created" },
      { timestamp: "2026-10-24 11:30 AM", user: "maker.rahul", action: "Submitted for KYC" },
      { timestamp: "2026-10-25 03:00 PM", user: "maker.anita", action: "Submitted for Checker Approval" },
      { timestamp: "2026-10-26 05:10 PM", user: "checker.amit", action: "Sent for Correction: Legible scan of Driving License and complete electricity bill required." }
    ]
  },
  {
    id: "APP-2026-006",
    customerId: "CUST-8806",
    status: "Approved",
    createdAt: "2026-10-22 10:15 AM",
    updatedAt: "2026-10-25 03:45 PM",
    personalInfo: {
      firstName: "Meera",
      middleName: "Devi",
      lastName: "Nair",
      dob: "1992-04-12",
      gender: "Female",
      maritalStatus: "Married",
      fatherName: "K. R. Nair",
      motherName: "Devaki Nair",
      nationality: "Indian",
      occupation: "Salaried",
      annualIncome: "₹10,00,000 - ₹25,00,000"
    },
    contactInfo: {
      mobile: "+91 94471 23456",
      altMobile: "",
      email: "meera.nair@healthcorp.org",
      commAddress: "A-501, Palm Meadows, MG Road",
      city: "Kochi",
      state: "Kerala",
      pinCode: "682016",
      sameAddress: true,
      permAddress: "A-501, Palm Meadows, MG Road, Kochi 682016"
    },
    documents: {
      panNumber: "MNOPQ1234R",
      panCardUploaded: true,
      panCardName: "pan_meera_nair.pdf",
      idProofType: "Passport",
      idProofUploaded: true,
      idProofName: "passport_meera.pdf",
      photoUploaded: true,
      photoName: "photo_meera.jpg",
      otherDocUploaded: true,
      otherDocName: "salary_slip_sept.pdf"
    },
    accountScheme: {
      accountType: "Savings",
      currency: "INR",
      homeBranch: "Kochi - Marine Drive Branch",
      nomineeAvailable: "Yes",
      nomineeName: "Arjun Nair",
      nomineeRelationship: "Spouse",
      nomineeDob: "1990-11-05"
    },
    kycDetails: {
      identityDocType: "Passport",
      identityDocNumber: "M4561238",
      nameOnDoc: "Meera Devi Nair",
      dobOnDoc: "1992-04-12",
      docIssueDate: "2021-03-15",
      docExpiryDate: "2031-03-14",
      identityDocUploaded: true,
      addressType: "Communication",
      houseNumber: "A-501",
      street: "Palm Meadows, MG Road",
      city: "Kochi",
      state: "Kerala",
      pinCode: "682016",
      addressProofType: "Passport",
      addressProofUploaded: true,
      addressStatus: "Verified",
      photoUploaded: true,
      photoStatus: "Verified",
      remarks: "Full video KYC completed successfully."
    },
    checkerReviews: {
      checkerActivity: { status: "Verified", remarks: "All KYC parameters verified." },
      applicationReview: { status: "Verified", remarks: "Satisfactory." },
      identityReview: { status: "Verified", remarks: "Verified via passport portal." },
      panReview: { status: "Verified", remarks: "Verified." },
      addressReview: { status: "Verified", remarks: "Verified." },
      photographReview: { status: "Verified", remarks: "Verified." },
      kycReview: { status: "Verified", remarks: "Video KYC verified." },
      riskReview: { status: "Verified", remarks: "Low risk profile." },
      accountReview: { status: "Verified", remarks: "Scheme validated." },
      finalDecision: { status: "Approved", remarks: "Application verified and approved for Account Creation." }
    },
    activityHistory: [
      { timestamp: "2026-10-22 10:15 AM", user: "maker.rahul", action: "Application created" },
      { timestamp: "2026-10-23 02:00 PM", user: "maker.rahul", action: "Submitted for KYC" },
      { timestamp: "2026-10-24 11:00 AM", user: "maker.anita", action: "KYC Completed and submitted for Checker Approval" },
      { timestamp: "2026-10-25 03:45 PM", user: "checker.amit", action: "Approved by Checker: Ready for Account Creation" }
    ]
  },
  {
    id: "APP-2026-007",
    customerId: "CUST-8807",
    status: "Account Created",
    createdAt: "2026-10-18 09:30 AM",
    updatedAt: "2026-10-21 04:15 PM",
    personalInfo: {
      firstName: "Amit",
      middleName: "",
      lastName: "Sengupta",
      dob: "1982-07-30",
      gender: "Male",
      maritalStatus: "Married",
      fatherName: "Debashis Sengupta",
      motherName: "Aparna Sengupta",
      nationality: "Indian",
      occupation: "Salaried",
      annualIncome: "₹25,00,000 - ₹50,00,000"
    },
    contactInfo: {
      mobile: "+91 98300 45678",
      altMobile: "",
      email: "amit.sengupta@kolkatatech.in",
      commAddress: "Flat 7C, Highland Park, EM Bypass",
      city: "Kolkata",
      state: "West Bengal",
      pinCode: "700094",
      sameAddress: true,
      permAddress: "Flat 7C, Highland Park, EM Bypass, Kolkata 700094"
    },
    documents: {
      panNumber: "STUVW4567X",
      panCardUploaded: true,
      panCardName: "pan_amit_sengupta.pdf",
      idProofType: "Aadhaar Card",
      idProofUploaded: true,
      idProofName: "aadhaar_amit.pdf",
      photoUploaded: true,
      photoName: "photo_amit.jpg",
      otherDocUploaded: true,
      otherDocName: "form16_2025.pdf"
    },
    accountScheme: {
      accountType: "Savings",
      currency: "INR",
      homeBranch: "Kolkata - Park Street Branch",
      nomineeAvailable: "Yes",
      nomineeName: "Debashis Sengupta",
      nomineeRelationship: "Father",
      nomineeDob: "1955-01-14"
    },
    createdAccount: {
      accountNumber: "HB1000928341",
      accountType: "Savings",
      scheme: "Regular Savings - Zero Fee",
      branch: "Kolkata - Park Street Branch",
      initialDeposit: 25000,
      createdAt: "2026-10-21 04:15 PM"
    },
    activityHistory: [
      { timestamp: "2026-10-18 09:30 AM", user: "maker.rahul", action: "Application created" },
      { timestamp: "2026-10-19 11:20 AM", user: "maker.anita", action: "KYC Verified" },
      { timestamp: "2026-10-20 02:40 PM", user: "checker.amit", action: "Checker Approved" },
      { timestamp: "2026-10-21 04:15 PM", user: "maker.rahul", action: "Account HB1000928341 created successfully" }
    ]
  },
  {
    id: "APP-2026-008",
    customerId: "CUST-8808",
    status: "Rejected",
    createdAt: "2026-10-15 02:00 PM",
    updatedAt: "2026-10-17 11:30 AM",
    personalInfo: {
      firstName: "Suresh",
      middleName: "",
      lastName: "Iyer",
      dob: "1979-06-18",
      gender: "Male",
      maritalStatus: "Single",
      fatherName: "G. Iyer",
      motherName: "Janaki Iyer",
      nationality: "Indian",
      occupation: "Self-Employed",
      annualIncome: "₹1,00,000 - ₹5,00,000"
    },
    contactInfo: {
      mobile: "+91 98401 99887",
      altMobile: "",
      email: "suresh.iyer@tempmail.com",
      commAddress: "14, North Mada Street, Mylapore",
      city: "Chennai",
      state: "Tamil Nadu",
      pinCode: "600004",
      sameAddress: true,
      permAddress: "14, North Mada Street, Mylapore, Chennai 60004"
    },
    documents: {
      panNumber: "ZZZZZ9999Z",
      panCardUploaded: true,
      panCardName: "pan_suresh.pdf",
      idProofType: "Voter ID Card",
      idProofUploaded: true,
      idProofName: "voter_suresh.pdf",
      photoUploaded: true,
      photoName: "photo_suresh.jpg",
      otherDocUploaded: false,
      otherDocName: ""
    },
    accountScheme: {
      accountType: "Current",
      currency: "INR",
      homeBranch: "Chennai - Anna Salai Branch",
      nomineeAvailable: "No",
      nomineeName: "",
      nomineeRelationship: "",
      nomineeDob: ""
    },
    checkerReviews: {
      finalDecision: {
        status: "Reject",
        remarks: "PAN failed NSDL authentication due to invalid format and name mismatch. Blacklist check alert."
      }
    },
    activityHistory: [
      { timestamp: "2026-10-15 02:00 PM", user: "maker.rahul", action: "Application created" },
      { timestamp: "2026-10-16 10:00 AM", user: "maker.rahul", action: "Submitted for Checker Approval" },
      { timestamp: "2026-10-17 11:30 AM", user: "checker.amit", action: "Application Rejected: Invalid PAN document and negative AML verification." }
    ]
  }
];

const INITIAL_ACCOUNTS = [
  {
    customerId: "CUST-8807",
    customerName: "Amit Sengupta",
    accountNumber: "HB1000928341",
    accountType: "Savings",
    scheme: "Regular Savings - Privilege",
    branch: "Kolkata - Park Street Branch",
    balance: 75400,
    status: "Active",
    createdAt: "2026-10-21",
    email: "amit.sengupta@kolkatatech.in",
    mobile: "+91 98300 45678",
    currency: "INR",
    nominee: "Debashis Sengupta (Father)"
  },
  {
    customerId: "CUST-7701",
    customerName: "Kavita Krishnamurthy",
    accountNumber: "HB1000928102",
    accountType: "Savings",
    scheme: "Classic Savings",
    branch: "Mumbai - Nariman Point Branch",
    balance: 215600,
    status: "Active",
    createdAt: "2026-08-14",
    email: "kavita.k@zenith.com",
    mobile: "+91 98200 11992",
    currency: "INR",
    nominee: "Sanjay Krishnamurthy (Spouse)"
  },
  {
    customerId: "CUST-7702",
    customerName: "Aakash Enterprise Ltd",
    accountNumber: "HB2000847291",
    accountType: "Current",
    scheme: "Business Smart Platinum",
    branch: "Mumbai - Bandra Kurla Complex Branch",
    balance: 1485200,
    status: "Active",
    createdAt: "2026-05-19",
    email: "finance@aakashent.in",
    mobile: "+91 98211 44556",
    currency: "INR",
    nominee: "N/A (Corporate)"
  },
  {
    customerId: "CUST-7703",
    customerName: "Harish Chandra Verma",
    accountNumber: "HB1000846201",
    accountType: "Savings",
    scheme: "Senior Citizen Gold",
    branch: "Delhi - Connaught Place Branch",
    balance: 42000,
    status: "Dormant",
    createdAt: "2024-03-10",
    email: "hc.verma@delhiold.org",
    mobile: "+91 98110 33221",
    currency: "INR",
    nominee: "Saroj Verma (Spouse)"
  },
  {
    customerId: "CUST-7704",
    customerName: "Apex Retail Solutions LLP",
    accountNumber: "HB2000832109",
    accountType: "Current",
    scheme: "Trade Privilege Current",
    branch: "Bengaluru - Whitefield Branch",
    balance: 310500,
    status: "Frozen",
    createdAt: "2025-09-02",
    email: "accounts@apexretail.co",
    mobile: "+91 97410 88990",
    currency: "INR",
    nominee: "N/A (Partnership)"
  },
  {
    customerId: "CUST-7705",
    customerName: "Sunita Roy",
    accountNumber: "HB1000781290",
    accountType: "Fixed Deposit",
    scheme: "Cumulative FD - 2 Years",
    branch: "Kolkata - Park Street Branch",
    balance: 500000,
    status: "Lien",
    createdAt: "2025-11-20",
    email: "sunita.roy@gmail.com",
    mobile: "+91 98311 77443",
    currency: "INR",
    nominee: "Bimal Roy (Father)"
  },
  {
    customerId: "CUST-7706",
    customerName: "Tariq Mansoor",
    accountNumber: "HB1000672314",
    accountType: "Salary",
    scheme: "Corporate Salary Platinum",
    branch: "Gurugram - Cyber City Branch",
    balance: 8900,
    status: "Blocked",
    createdAt: "2026-01-11",
    email: "tariq.m@cyberglobal.net",
    mobile: "+91 99100 66778",
    currency: "INR",
    nominee: "Farida Mansoor (Mother)"
  }
];

const INITIAL_TRANSACTIONS = [
  {
    id: "TXN-9024101",
    customerName: "Amit Sengupta",
    accountNumber: "HB1000928341",
    date: "2026-10-28 14:23",
    type: "Deposit",
    amount: 25000,
    paymentMode: "NEFT",
    status: "Successful",
    refNumber: "NEFT-IN-20261028-981240"
  },
  {
    id: "TXN-9024102",
    customerName: "Amit Sengupta",
    accountNumber: "HB1000928341",
    date: "2026-10-29 11:10",
    type: "Transfer",
    amount: 4500,
    paymentMode: "UPI",
    status: "Successful",
    refNumber: "UPI-IND-8829104-AP"
  },
  {
    id: "TXN-9024103",
    customerName: "Aakash Enterprise Ltd",
    accountNumber: "HB2000847291",
    date: "2026-10-30 16:45",
    type: "Deposit",
    amount: 350000,
    paymentMode: "RTGS",
    status: "Successful",
    refNumber: "RTGS-HB-20261030-1092"
  },
  {
    id: "TXN-9024104",
    customerName: "Kavita Krishnamurthy",
    accountNumber: "HB1000928102",
    date: "2026-10-30 18:02",
    type: "Withdrawal",
    amount: 10000,
    paymentMode: "Cash",
    status: "Successful",
    refNumber: "ATM-WDL-9821034"
  },
  {
    id: "TXN-9024105",
    customerName: "Apex Retail Solutions LLP",
    accountNumber: "HB2000832109",
    date: "2026-10-31 09:15",
    type: "Transfer",
    amount: 85000,
    paymentMode: "IMPS",
    status: "Failed",
    refNumber: "IMPS-FAIL-99014"
  },
  {
    id: "TXN-9024106",
    customerName: "Tariq Mansoor",
    accountNumber: "HB1000672314",
    date: "2026-10-31 10:30",
    type: "Withdrawal",
    amount: 5000,
    paymentMode: "UPI",
    status: "Failed",
    refNumber: "UPI-BLOCK-ACC-01"
  },
  {
    id: "TXN-9024107",
    customerName: "Kavita Krishnamurthy",
    accountNumber: "HB1000928102",
    date: "2026-10-31 15:40",
    type: "Deposit",
    amount: 50000,
    paymentMode: "Cheque",
    status: "Successful",
    refNumber: "CHQ-CLR-004912"
  },
  {
    id: "TXN-9024108",
    customerName: "Amit Sengupta",
    accountNumber: "HB1000928341",
    date: "2026-11-01 07:15",
    type: "EMI",
    amount: 12500,
    paymentMode: "Auto-Debit",
    status: "Successful",
    refNumber: "EMI-LOAN-889104"
  }
];

const INITIAL_COMPLAINTS = [
  {
    id: "CMP-2026-101",
    customerName: "Amit Sengupta",
    customerId: "CUST-8807",
    accountNumber: "HB1000928341",
    category: "Net Banking / App Issue",
    description: "Unable to download September PDF bank statement from mobile app.",
    date: "2026-10-27",
    status: "In Progress",
    assignedEmployee: "Pooja Hegde (IT Support)",
    resolutionRemarks: "Ticket escalated to App Engineering team for statement generator fix."
  },
  {
    id: "CMP-2026-102",
    customerName: "Harish Chandra Verma",
    customerId: "CUST-7703",
    accountNumber: "HB1000846201",
    category: "Account Dormancy",
    description: "Account was marked dormant despite periodic interest credit. Customer requests reactivation.",
    date: "2026-10-29",
    status: "Open",
    assignedEmployee: "Suresh Nair (Branch Ops)",
    resolutionRemarks: "Pending biometric re-verification at Delhi branch."
  },
  {
    id: "CMP-2026-103",
    customerName: "Kavita Krishnamurthy",
    customerId: "CUST-7701",
    accountNumber: "HB1000928102",
    category: "ATM Transaction Failed",
    description: "Amount ₹10,000 debited during ATM withdrawal on 20th Oct but cash was not dispensed.",
    date: "2026-10-20",
    status: "Resolved",
    assignedEmployee: "Manoj Joshi (ATM Reconciliation)",
    resolutionRemarks: "ATM cash counter log inspected. ₹10,000 auto-reversal credited on 22nd Oct ref REV-ATM-8910."
  },
  {
    id: "CMP-2026-104",
    customerName: "Apex Retail Solutions LLP",
    customerId: "CUST-7704",
    accountNumber: "HB2000832109",
    category: "Account Freeze Inquiry",
    description: "Account frozen without prior written notice to director.",
    date: "2026-10-28",
    status: "Open",
    assignedEmployee: "Rohan Deshmukh (Legal Compliance)",
    resolutionRemarks: "Compliance notice served under GST department order #GST-2026/894. Under legal review."
  }
];

const INITIAL_REQUESTS = [
  {
    id: "REQ-2026-401",
    customerName: "Amit Sengupta",
    customerId: "CUST-8807",
    accountNumber: "HB1000928341",
    type: "Bank Statement Request",
    date: "2026-10-28",
    description: "Request for official stamped statement for FY 2025-26 for visa application.",
    status: "Completed",
    remarks: "Stamped statement generated and dispatched via courier on 29-Oct."
  },
  {
    id: "REQ-2026-402",
    customerName: "Aakash Enterprise Ltd",
    customerId: "CUST-7702",
    accountNumber: "HB2000847291",
    type: "Bulk Statement Request",
    date: "2026-10-30",
    description: "Annual consolidated bulk statement across all sub-accounts in Excel format.",
    status: "Processing",
    remarks: "Finance batch run scheduled for tonight."
  },
  {
    id: "REQ-2026-403",
    customerName: "Kavita Krishnamurthy",
    customerId: "CUST-7701",
    accountNumber: "HB1000928102",
    type: "Account-Related Request",
    date: "2026-10-31",
    description: "Request to add new communication email and upgrade debit card to Platinum contactless.",
    status: "Pending",
    remarks: "Awaiting customer signature verification."
  },
  {
    id: "REQ-2026-404",
    customerName: "Harish Chandra Verma",
    customerId: "CUST-7703",
    accountNumber: "HB1000846201",
    type: "Other Service Requests",
    date: "2026-11-01",
    description: "Request for doorstep banking executive for senior citizen KYC verification.",
    status: "Pending",
    remarks: "Assigned to Connaught Place branch field executive."
  }
];

// LocalStorage Keys
const KEYS = {
  APPLICATIONS: "hb_applications",
  ACCOUNTS: "hb_accounts",
  TRANSACTIONS: "hb_transactions",
  COMPLAINTS: "hb_complaints",
  REQUESTS: "hb_requests",
  USER: "hb_user"
};

// Safe JSON parser / getter
const getStorage = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch (e) {
    console.error(`Error reading ${key} from localStorage:`, e);
    return fallback;
  }
};

const setStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error saving ${key} to localStorage:`, e);
  }
};

// Initialization helper to ensure storage is populated
export const initializeData = () => {
  if (!localStorage.getItem(KEYS.APPLICATIONS)) {
    setStorage(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  }
  if (!localStorage.getItem(KEYS.ACCOUNTS)) {
    setStorage(KEYS.ACCOUNTS, INITIAL_ACCOUNTS);
  }
  if (!localStorage.getItem(KEYS.TRANSACTIONS)) {
    setStorage(KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
  }
  if (!localStorage.getItem(KEYS.COMPLAINTS)) {
    setStorage(KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  }
  if (!localStorage.getItem(KEYS.REQUESTS)) {
    setStorage(KEYS.REQUESTS, INITIAL_REQUESTS);
  }
  if (!localStorage.getItem(KEYS.USER)) {
    setStorage(KEYS.USER, {
      username: "john.maker",
      displayName: "John Maker",
      role: "Maker / Officer",
      branch: "Mumbai Main Branch",
      email: "john.maker@happybank.internal"
    });
  }
};

// Applications API
export const getApplications = () => getStorage(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);

export const saveApplications = (apps) => {
  setStorage(KEYS.APPLICATIONS, apps);
  return apps;
};

export const getApplicationById = (id) => {
  const apps = getApplications();
  return apps.find((a) => a.id === id) || null;
};

export const updateApplication = (id, updates) => {
  const apps = getApplications();
  const index = apps.findIndex((a) => a.id === id);
  if (index !== -1) {
    apps[index] = {
      ...apps[index],
      ...updates,
      updatedAt: new Date().toLocaleString()
    };
    saveApplications(apps);
    return apps[index];
  }
  return null;
};

export const createApplication = (appData) => {
  const apps = getApplications();
  const newId = `APP-2026-${String(apps.length + 1).padStart(3, "0")}`;
  const newCustomerId = `CUST-${8800 + apps.length + 1}`;
  const newApp = {
    ...appData,
    id: newId,
    customerId: newCustomerId,
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString(),
    activityHistory: [
      {
        timestamp: new Date().toLocaleString(),
        user: getCurrentUser()?.username || "maker.user",
        action: `Application ${newId} created with status: ${appData.status || "Draft"}`
      }
    ]
  };
  apps.unshift(newApp);
  saveApplications(apps);
  return newApp;
};

// Accounts API
export const getAccounts = () => getStorage(KEYS.ACCOUNTS, INITIAL_ACCOUNTS);

export const saveAccounts = (accounts) => {
  setStorage(KEYS.ACCOUNTS, accounts);
  return accounts;
};

export const updateAccountStatus = (accountNumber, newStatus) => {
  const accounts = getAccounts();
  const index = accounts.findIndex((a) => a.accountNumber === accountNumber);
  if (index !== -1) {
    accounts[index] = { ...accounts[index], status: newStatus };
    saveAccounts(accounts);
    return accounts[index];
  }
  return null;
};

export const createAccount = (accountData) => {
  const accounts = getAccounts();
  const newAccount = {
    ...accountData,
    createdAt: new Date().toISOString().split("T")[0]
  };
  accounts.unshift(newAccount);
  saveAccounts(accounts);
  return newAccount;
};

// Transactions API
export const getTransactions = () => getStorage(KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);

export const addTransaction = (txnData) => {
  const txns = getTransactions();
  const newTxn = {
    ...txnData,
    id: `TXN-${9024100 + txns.length + 1}`,
    date: new Date().toISOString().replace("T", " ").substring(0, 16)
  };
  txns.unshift(newTxn);
  setStorage(KEYS.TRANSACTIONS, txns);
  return newTxn;
};

// Complaints API
export const getComplaints = () => getStorage(KEYS.COMPLAINTS, INITIAL_COMPLAINTS);

export const updateComplaint = (id, updates) => {
  const complaints = getComplaints();
  const index = complaints.findIndex((c) => c.id === id);
  if (index !== -1) {
    complaints[index] = { ...complaints[index], ...updates };
    setStorage(KEYS.COMPLAINTS, complaints);
    return complaints[index];
  }
  return null;
};

export const createComplaint = (complaintData) => {
  const complaints = getComplaints();
  const newId = `CMP-2026-${100 + complaints.length + 1}`;
  const newComplaint = {
    ...complaintData,
    id: newId,
    date: new Date().toISOString().split("T")[0],
    status: complaintData.status || "Open"
  };
  complaints.unshift(newComplaint);
  setStorage(KEYS.COMPLAINTS, complaints);
  return newComplaint;
};

// Requests API
export const getRequests = () => getStorage(KEYS.REQUESTS, INITIAL_REQUESTS);

export const updateRequest = (id, updates) => {
  const requests = getRequests();
  const index = requests.findIndex((r) => r.id === id);
  if (index !== -1) {
    requests[index] = { ...requests[index], ...updates };
    setStorage(KEYS.REQUESTS, requests);
    return requests[index];
  }
  return null;
};

export const createRequest = (reqData) => {
  const requests = getRequests();
  const newId = `REQ-2026-${400 + requests.length + 1}`;
  const newReq = {
    ...reqData,
    id: newId,
    date: new Date().toISOString().split("T")[0],
    status: reqData.status || "Pending"
  };
  requests.unshift(newReq);
  setStorage(KEYS.REQUESTS, requests);
  return newReq;
};

// User Profile / Auth State
export const getCurrentUser = () => {
  return getStorage(KEYS.USER, {
    username: "john.maker",
    displayName: "John Maker",
    role: "Maker / Officer",
    branch: "Mumbai Main Branch",
    email: "john.maker@happybank.internal"
  });
};

export const setCurrentUser = (userData) => {
  setStorage(KEYS.USER, userData);
};

export const logoutUser = () => {
  localStorage.removeItem(KEYS.USER);
};

// Reset prototype data to defaults
export const resetToDefaultData = () => {
  setStorage(KEYS.APPLICATIONS, INITIAL_APPLICATIONS);
  setStorage(KEYS.ACCOUNTS, INITIAL_ACCOUNTS);
  setStorage(KEYS.TRANSACTIONS, INITIAL_TRANSACTIONS);
  setStorage(KEYS.COMPLAINTS, INITIAL_COMPLAINTS);
  setStorage(KEYS.REQUESTS, INITIAL_REQUESTS);
  setStorage(KEYS.USER, {
    username: "john.maker",
    displayName: "John Maker",
    role: "Maker / Officer",
    branch: "Mumbai Main Branch",
    email: "john.maker@happybank.internal"
  });
};

// Calculate dashboard summary metrics
export const getDashboardStats = () => {
  const apps = getApplications();
  const accounts = getAccounts();
  const transactions = getTransactions();

  const pendingApplications = apps.filter((a) => a.status === "Draft" || a.status === "Correction Required").length;
  const pendingKYC = apps.filter((a) => a.status === "Pending KYC" || a.status === "KYC In Progress").length;
  const pendingApprovals = apps.filter((a) => a.status === "Pending Checker Approval").length;
  
  // Total unique customers counted across accounts and applications
  const customerIds = new Set([
    ...accounts.map((a) => a.customerId),
    ...apps.map((a) => a.customerId).filter(Boolean)
  ]);
  const totalCustomers = customerIds.size;

  const totalTransactions = transactions.length;
  const activeAccounts = accounts.filter((a) => a.status === "Active").length;
  const dormantAccounts = accounts.filter((a) => a.status === "Dormant").length;

  return {
    pendingApplications,
    pendingKYC,
    pendingApprovals,
    totalCustomers,
    totalTransactions,
    activeAccounts,
    dormantAccounts
  };
};
