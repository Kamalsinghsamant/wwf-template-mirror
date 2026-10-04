"use client";

import { useState, useMemo, useCallback } from "react";
import { initiateRazorpayCheckout } from "@/services/paymentService";
import { getCampaignFormConfig } from "@/utils/donationCampaignPresets";
import AgeEligibilityNotice from "./AgeEligibilityNotice";

export default function DonationForm({
  title = "LEADERS FOR CHANGE",
  campaignName = "Support WWF-India",
  campaignSlug = null,
  isWorkplace = false,
  presetAmounts = null,
  organizationUrl = "world-wide-fund-for-nature--india",
  organizationName = "WWF-India",
  organizationLogo = "/images/logo.png",
}) {
  const campaignConfig = useMemo(
    () => getCampaignFormConfig(campaignSlug || campaignName || title),
    [campaignSlug, campaignName, title]
  );

  const activeFrequencies = useMemo(
    () =>
      isWorkplace
        ? ["Monthly", "Annual"]
        : campaignConfig.frequencies || ["One-time", "Monthly"],
    [isWorkplace, campaignConfig]
  );

  const initialFrequency = useMemo(
    () =>
      isWorkplace
        ? "Monthly"
        : campaignConfig.defaultFrequency || activeFrequencies[0],
    [isWorkplace, campaignConfig, activeFrequencies]
  );

  const [frequency, setFrequency] = useState(initialFrequency);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [paymentDetails, setPaymentDetails] = useState(null);

  // Active amounts list computed from campaign config
  const activeAmountList = useMemo(
    () =>
      campaignConfig.amounts[frequency] ||
      Object.values(campaignConfig.amounts)[0] ||
      [],
    [campaignConfig, frequency]
  );

  const initialTier = useMemo(
    () => activeAmountList.find((t) => t.popular) || activeAmountList[0],
    [activeAmountList]
  );
  const initialAmount = initialTier ? initialTier.amount : 1000;

  // Form State
  const [formData, setFormData] = useState({
    frequency: initialFrequency,
    selectedAmount: initialAmount,
    customAmount: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    location: "DELHI",
    address: "",
    pin: "",
    city: "",
    state: "",
    nationality: "Indian",
    identificationType: "PAN",
    idNumber: "",
    dob: "",
    ageConfirmed: true,
    termsAccepted: false,
    paymentMethod: "razorpay",
  });

  const [errors, setErrors] = useState({});

  const finalAmount = useMemo(
    () =>
      formData.customAmount
        ? Number(formData.customAmount)
        : formData.selectedAmount,
    [formData.customAmount, formData.selectedAmount]
  );

  // Max DOB string for 18+ requirement (user must be 18 or older)
  const maxDobString = useMemo(() => {
    const maxDobDate = new Date();
    maxDobDate.setFullYear(maxDobDate.getFullYear() - 18);
    return maxDobDate.toISOString().split("T")[0];
  }, []);

  const handleFrequencyChange = useCallback(
    (newFreq) => {
      setFrequency(newFreq);
      const newAmounts = campaignConfig.amounts[newFreq] || [];
      const tier = newAmounts.find((t) => t.popular) || newAmounts[0];
      const newSelected = tier ? tier.amount : 1000;
      setFormData((prev) => ({
        ...prev,
        frequency: newFreq,
        selectedAmount: newSelected,
        customAmount: "",
      }));
    },
    [campaignConfig]
  );

  const handleInputChange = useCallback((field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validateStep1 = useCallback(() => {
    const errs = {};
    const amount = formData.customAmount
      ? parseFloat(formData.customAmount)
      : formData.selectedAmount;

    if (!amount || amount < 100) {
      errs.amount = "Minimum donation amount is ₹ 100.";
    }

    if (!formData.name.trim()) {
      errs.name = "Full Name is required.";
    } else if (formData.name.trim().length < 3) {
      errs.name = "Name must be at least 3 characters.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    const phoneDigits = formData.phone.replace(/\D/g, "");
    if (!formData.phone) {
      errs.phone = "10-digit mobile number is required.";
    } else if (phoneDigits.length !== 10) {
      errs.phone = "Phone must be exactly 10 digits.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData.customAmount, formData.selectedAmount, formData.name, formData.email, formData.phone]);

  const validateStep2 = useCallback(() => {
    const errs = {};

    if (isWorkplace && !formData.company.trim()) {
      errs.company = "Company Name is required.";
    }

    if (!formData.address.trim()) {
      errs.address = "Address is required for 80G tax receipt.";
    }

    if (!formData.pin.trim() || formData.pin.length !== 6) {
      errs.pin = "Please enter a valid 6-digit PIN code.";
    }

    if (!formData.city.trim()) {
      errs.city = "City is required.";
    }

    if (!formData.state.trim()) {
      errs.state = "State is required.";
    }

    if (formData.identificationType === "PAN") {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
      if (!formData.idNumber.trim()) {
        errs.idNumber = "PAN is required for Section 80G tax exemption.";
      } else if (!panRegex.test(formData.idNumber.trim().toUpperCase())) {
        errs.idNumber = "Valid 10-digit PAN required (e.g. ABCDE1234F).";
      }
    } else if (!formData.idNumber.trim()) {
      errs.idNumber = `${formData.identificationType} number is required.`;
    }

    // 18+ Age Validation (Statutory Compliance)
    if (!formData.dob) {
      errs.dob = "Date of Birth is required. Individuals over 18 years of age are only valid for donations.";
    } else {
      const birthDate = new Date(formData.dob);
      const now = new Date();
      let age = now.getFullYear() - birthDate.getFullYear();
      const m = now.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && now.getDate() < birthDate.getDate())) {
        age--;
      }
      if (isNaN(age) || age < 18) {
        errs.dob = "Individuals over 18 years of age are only valid for donations. Donors must be at least 18 years old.";
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [isWorkplace, formData.company, formData.address, formData.pin, formData.city, formData.state, formData.identificationType, formData.idNumber, formData.dob]);

  const validateStep3 = useCallback(() => {
    const errs = {};
    if (!formData.ageConfirmed) {
      errs.ageConfirmed = "Individuals over 18 years of age are only valid for donations. Please confirm you meet the age requirement.";
    }
    if (!formData.termsAccepted) {
      errs.terms = "You must agree to the tax exemption declaration.";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }, [formData.ageConfirmed, formData.termsAccepted]);

  const handleNext = useCallback((e) => {
    e.preventDefault();
    if (currentStep === 1) {
      if (validateStep1()) setCurrentStep(2);
    } else if (currentStep === 2) {
      if (validateStep2()) setCurrentStep(3);
    }
  }, [currentStep, validateStep1, validateStep2]);

  const handleBack = useCallback(() => {
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (!validateStep3()) return;

    setSubmitting(true);
    setPaymentError("");

    const targetSlug =
      campaignSlug ||
      campaignName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    try {
      await initiateRazorpayCheckout({
        campaignName,
        slug: targetSlug,
        organizationUrl,
        organizationName,
        organizationLogo,
        amount: finalAmount,
        donor: formData,
        recurring: frequency === "Monthly",
        onSuccess: (result) => {
          setSubmitting(false);
          setPaymentDetails(result);
          setSubmitted(true);
        },
        onDismiss: () => {
          setSubmitting(false);
        },
        onError: (errMsg) => {
          setSubmitting(false);
          setPaymentError(errMsg || "Payment could not be completed. Please try again.");
        },
      });
    } catch (err) {
      setSubmitting(false);
      setPaymentError(err.message || "Failed to launch payment gateway. Please check your connection.");
    }
  }, [validateStep3, campaignSlug, campaignName, finalAmount, formData, frequency]);

  return (
    <div
      id="donation-form-wrapper"
      className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
    >
      {/* Form Header - Minimalist White and Black */}
      <div className="bg-[#ffffff] border-b border-gray-200 p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                Section 80G Tax Deductible
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-[#000000] tracking-tight uppercase mt-0.5">
              {title && title !== "LEADERS FOR CHANGE" ? title : (campaignConfig.title || title)}
            </h3>
            <p className="text-xs text-gray-500">
              Supporting: <span className="font-semibold text-black">{campaignName}</span>
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500 font-semibold bg-gray-50 border border-gray-200 px-2.5 py-1 rounded">
            <i className="fa-solid fa-lock text-emerald-600 text-[11px]" aria-hidden="true" />
            <span>Secure</span>
          </div>
        </div>

        {/* Step Progress Indicators - Minimal Clean Line */}
        <div className="mt-5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep >= 1 ? "bg-black text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              1
            </span>
            <span className={`font-semibold ${currentStep === 1 ? "text-black" : "text-gray-400"}`}>
              Amount
            </span>
          </div>

          <div className="flex-1 h-px bg-gray-200 mx-3" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep >= 2 ? "bg-black text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              2
            </span>
            <span className={`font-semibold ${currentStep === 2 ? "text-black" : "text-gray-400"}`}>
              Details & 80G
            </span>
          </div>

          <div className="flex-1 h-px bg-gray-200 mx-3" />

          <div className="flex items-center gap-2">
            <span
              className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                currentStep >= 3 ? "bg-black text-white" : "bg-gray-100 text-gray-400"
              }`}
            >
              3
            </span>
            <span className={`font-semibold ${currentStep === 3 ? "text-black" : "text-gray-400"}`}>
              Pay
            </span>
          </div>
        </div>
      </div>

      {/* Main Form Area */}
      <div className="p-6 sm:p-7">
        {submitted ? (
          /* Confirmation Screen */
          <div className="text-center py-6 animate-fade-in space-y-6">
            <div className="w-16 h-16 bg-gray-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto text-3xl">
              <i className="fa-solid fa-circle-check" aria-hidden="true" />
            </div>

            <div>
              <span className="inline-block text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded uppercase tracking-wider mb-2 border border-emerald-200">
                Payment Authorized & Verified
              </span>
              <h4 className="text-2xl font-black text-black">
                Thank You, {formData.name}!
              </h4>
              <p className="text-sm text-gray-600 max-w-md mx-auto mt-2">
                Your generous contribution of{" "}
                <strong className="text-black">₹ {finalAmount.toLocaleString("en-IN")}</strong> ({frequency})
                towards <strong className="text-black">{campaignName}</strong> has been confirmed.
              </p>
            </div>

            {/* Receipt Summary Card */}
            <div className="bg-gray-50 border border-gray-200 rounded p-4 text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between pb-2 border-b border-gray-200 font-bold text-black">
                <span>Transaction Ref:</span>
                <span className="font-mono text-emerald-800">
                  {paymentDetails?.paymentId ||
                    paymentDetails?.orderId ||
                    `WWF-${Date.now().toString().slice(-8)}`}
                </span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Donor Email:</span>
                <span>{formData.email}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>PAN for 80G:</span>
                <span className="font-mono uppercase">{formData.idNumber || "PROVIDED"}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax Exemption Status:</span>
                <span className="text-emerald-700 font-bold">50% Relief Eligible (Sec 80G)</span>
              </div>
              <div className="flex justify-between text-gray-600 pt-1 border-t border-gray-200">
                <span>Payment Mode:</span>
                <span className="uppercase font-semibold">
                  {formData.paymentMethod} (Razorpay Secure)
                </span>
              </div>
            </div>

            {paymentDetails?.receiptUrl && (
              <div className="pt-1">
                <a
                  href={paymentDetails.receiptUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 btn-wwf-outline-dark !py-2.5 !px-5 text-xs font-bold"
                >
                  <i className="fa-solid fa-file-invoice text-emerald-600" />
                  <span>Download 80G Tax Receipt</span>
                </a>
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                setSubmitted(false);
                setPaymentDetails(null);
                setCurrentStep(1);
              }}
              className="btn-wwf-dark !px-7 text-xs uppercase tracking-wider"
            >
              Make Another Donation
            </button>
          </div>
        ) : (
          <form onSubmit={currentStep === 3 ? handleSubmit : handleNext} noValidate>
            {/* Universal Age Eligibility Alert Box */}
            <AgeEligibilityNotice variant="banner" className="mb-5" />

            {/* STEP 1: Frequency, Amount & Personal Details */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                {/* Frequency Toggle - Clean Black & White */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Frequency
                  </label>
                  <div
                    className={`grid gap-2 p-1 bg-gray-100 rounded border border-gray-200 ${
                      activeFrequencies.length === 2 ? "grid-cols-2" : "grid-cols-3"
                    }`}
                  >
                    {activeFrequencies.map((freq) => (
                      <button
                        key={freq}
                        type="button"
                        onClick={() => handleFrequencyChange(freq)}
                        className={`py-2 px-3 rounded text-xs font-bold transition-all ${
                          frequency === freq
                            ? "bg-white text-black shadow-sm"
                            : "text-gray-600 hover:text-black"
                        }`}
                      >
                        {freq} {freq.includes("Year") ? "Support" : "Giving"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount Selection Cards */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">
                    Select Amount ({frequency})
                  </label>
                  <div
                    className={`grid grid-cols-1 ${
                      activeAmountList.length === 4 ? "sm:grid-cols-4" : "sm:grid-cols-3"
                    } gap-2.5`}
                  >
                    {activeAmountList.map((tier) => {
                      const isSelected =
                        !formData.customAmount && formData.selectedAmount === tier.amount;
                      return (
                        <button
                          key={tier.amount}
                          type="button"
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              selectedAmount: tier.amount,
                              customAmount: "",
                            }));
                          }}
                          className={`p-3 rounded border text-left transition-all relative flex flex-col justify-between ${
                            isSelected
                              ? "border-black bg-gray-50 shadow-sm ring-1 ring-black"
                              : "border-gray-200 hover:border-gray-400 bg-white"
                          }`}
                        >
                          <div>
                            <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">
                              {tier.label}
                            </span>
                            <span className="text-lg font-black text-black">
                              ₹ {tier.amount.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <span className="text-[10px] text-gray-500 mt-1 block leading-tight">
                            {tier.desc}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Custom Amount Field */}
                  <div className="mt-2.5">
                    <div className="relative">
                      <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 font-bold text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        placeholder="Or enter custom amount in INR"
                        value={formData.customAmount}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            customAmount: e.target.value,
                          }))
                        }
                        className="block w-full rounded border border-gray-300 pl-7 pr-12 py-2 text-sm text-gray-900 focus:border-black focus:ring-black"
                      />
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[10px] text-gray-400 font-bold">
                        INR
                      </span>
                    </div>
                    {errors.amount && (
                      <p className="mt-1 text-xs text-red-600">{errors.amount}</p>
                    )}
                  </div>
                </div>

                {/* Personal Details */}
                <div className="pt-3 border-t border-gray-200 space-y-3">
                  <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
                    Personal Information
                  </h4>

                  {/* Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      Full Name (as per PAN/Tax ID)*
                    </label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. Rahul Sharma"
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className={`block w-full rounded border px-3 py-2 text-sm text-gray-900 focus:ring-black focus:border-black ${
                        errors.name ? "border-red-500 bg-red-50/20" : "border-gray-300"
                      }`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-xs text-red-600">{errors.name}</p>
                    )}
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Email Address (for 80G receipt)*
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="rahul@domain.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        className={`block w-full rounded border px-3 py-2 text-sm text-gray-900 focus:ring-black focus:border-black ${
                          errors.email ? "border-red-500 bg-red-50/20" : "border-gray-300"
                        }`}
                      />
                      {errors.email && (
                        <p className="mt-1 text-xs text-red-600">{errors.email}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Mobile Number (10 digits)*
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-2.5 text-xs text-gray-500 font-bold">
                          +91
                        </span>
                        <input
                          type="tel"
                          name="phone"
                          maxLength={10}
                          placeholder="9876543210"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          className={`block w-full rounded border pl-10 pr-3 py-2 text-sm text-gray-900 focus:ring-black focus:border-black ${
                            errors.phone ? "border-red-500 bg-red-50/20" : "border-gray-300"
                          }`}
                        />
                      </div>
                      {errors.phone && (
                        <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Step 1 Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <span className="text-[11px] text-gray-400">
                    *Only Indian nationals can donate.
                  </span>
                  <button
                    type="submit"
                    className="btn-wwf-primary text-xs uppercase tracking-wider font-bold !py-2.5 !px-6"
                  >
                    <span>Continue</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Address & Identification */}
            {currentStep === 2 && (
              <div className="space-y-4 animate-fade-in">
                {/* Workplace Giving Specific: Company & Location */}
                {isWorkplace && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2 border-b border-gray-100">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Company Name*
                      </label>
                      <input
                        type="text"
                        name="company"
                        placeholder="e.g. Acme Corporation"
                        value={formData.company}
                        onChange={(e) => handleInputChange("company", e.target.value)}
                        className={`block w-full rounded border px-3 py-2 text-sm focus:ring-black focus:border-black ${
                          errors.company ? "border-red-500 bg-red-50/20" : "border-gray-300"
                        }`}
                      />
                      {errors.company && (
                        <p className="mt-1 text-xs text-red-600">{errors.company}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        City Region*
                      </label>
                      <select
                        name="location"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-black focus:border-black bg-white"
                      >
                        <option value="DELHI">DELHI</option>
                        <option value="NCR">NCR</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Chennai">Chennai</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Address */}
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Address (Mandatory for Section 80G Certificate)*
                  </label>
                  <input
                    type="text"
                    name="address"
                    placeholder="House/Street, Landmark"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className={`block w-full rounded border px-3 py-2 text-sm focus:ring-black focus:border-black ${
                      errors.address ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.address && (
                    <p className="mt-1 text-xs text-red-600">{errors.address}</p>
                  )}
                </div>

                {/* PIN, City, State */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      PIN Code*
                    </label>
                    <input
                      type="text"
                      maxLength={6}
                      name="pin"
                      placeholder="110001"
                      value={formData.pin}
                      onChange={(e) => handleInputChange("pin", e.target.value)}
                      className={`block w-full rounded border px-3 py-2 text-sm focus:ring-black focus:border-black ${
                        errors.pin ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.pin && (
                      <p className="mt-1 text-xs text-red-600">{errors.pin}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      placeholder="City"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className={`block w-full rounded border px-3 py-2 text-sm focus:ring-black focus:border-black ${
                        errors.city ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.city && (
                      <p className="mt-1 text-xs text-red-600">{errors.city}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1">
                      State*
                    </label>
                    <input
                      type="text"
                      name="state"
                      placeholder="State"
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className={`block w-full rounded border px-3 py-2 text-sm focus:ring-black focus:border-black ${
                        errors.state ? "border-red-500" : "border-gray-300"
                      }`}
                    />
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-600">{errors.state}</p>
                    )}
                  </div>
                </div>

                {/* Identification for 80G */}
                <div className="pt-2 border-t border-gray-100">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        Identification Type*
                      </label>
                      <select
                        name="identificationType"
                        value={formData.identificationType}
                        onChange={(e) => handleInputChange("identificationType", e.target.value)}
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-black focus:border-black bg-white"
                      >
                        <option value="PAN">PAN (Income Tax Exemption)</option>
                        <option value="Aadhar">Aadhar</option>
                        <option value="Passport">Passport</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-600 mb-1">
                        {formData.identificationType} Number*
                      </label>
                      <input
                        type="text"
                        name="idNumber"
                        placeholder={formData.identificationType === "PAN" ? "ABCDE1234F" : "ID Number"}
                        value={formData.idNumber}
                        onChange={(e) =>
                          handleInputChange("idNumber", e.target.value.toUpperCase())
                        }
                        className={`block w-full rounded border px-3 py-2 text-sm uppercase font-mono focus:ring-black focus:border-black ${
                          errors.idNumber ? "border-red-500" : "border-gray-300"
                        }`}
                      />
                      {errors.idNumber && (
                        <p className="mt-1 text-xs text-red-600">{errors.idNumber}</p>
                      )}
                    </div>
                  </div>

                  {/* Date of Birth & Age 18+ Validation */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1 flex items-center justify-between">
                        <span>Date of Birth (18+ Required)*</span>
                        <span className="text-[10px] text-gray-500 font-normal">DD/MM/YYYY</span>
                      </label>
                      <input
                        type="date"
                        name="dob"
                        max={maxDobString}
                        value={formData.dob}
                        onChange={(e) => handleInputChange("dob", e.target.value)}
                        className={`block w-full rounded border px-3 py-2 text-sm focus:ring-black focus:border-black ${
                          errors.dob ? "border-red-500 bg-red-50/40" : "border-gray-300"
                        }`}
                      />
                      {errors.dob ? (
                        <p className="mt-1 text-xs text-red-600 font-semibold flex items-center gap-1">
                          <i className="fa-solid fa-circle-exclamation text-xs" />
                          <span>{errors.dob}</span>
                        </p>
                      ) : (
                        <p className="mt-1 text-[10px] text-gray-500">
                          Individuals over 18 years of age are only valid for donations.
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">
                        Nationality*
                      </label>
                      <select
                        name="nationality"
                        value={formData.nationality}
                        onChange={(e) => handleInputChange("nationality", e.target.value)}
                        className="block w-full rounded border border-gray-300 px-3 py-2 text-sm focus:ring-black focus:border-black bg-white"
                      >
                        <option value="Indian">Indian (Resident / NRI)</option>
                      </select>
                      <p className="mt-1 text-[10px] text-gray-500">
                        *Only Indian nationals can donate on this platform.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Step 2 Actions */}
                <div className="pt-3 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-wwf-outline-dark !py-2 !px-4 text-xs"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-wwf-primary text-xs uppercase tracking-wider font-bold !py-2.5 !px-6"
                  >
                    Review & Pay
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Verification, Terms & Payment */}
            {currentStep === 3 && (
              <div className="space-y-5 animate-fade-in">
                {/* Donation Summary - Clean Minimalist Box */}
                <div className="bg-gray-50 border border-gray-200 rounded p-4">
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                    Donation Summary
                  </h4>
                  <div className="space-y-1.5 text-xs text-black">
                    <div className="flex justify-between pb-1.5 border-b border-gray-200">
                      <span className="text-gray-600">Campaign:</span>
                      <span className="font-semibold">{campaignName}</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-gray-200">
                      <span className="text-gray-600">Frequency:</span>
                      <span className="font-semibold">{frequency}</span>
                    </div>
                    <div className="flex justify-between pb-1.5 border-b border-gray-200">
                      <span className="text-gray-600">Donor:</span>
                      <span>{formData.name}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm pt-1">
                      <span className="font-bold">Total Contribution:</span>
                      <span className="text-xl font-black text-black">
                        ₹ {finalAmount.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Razorpay Direct Gateway Info */}
                <div className="bg-gray-50 border border-gray-200 rounded p-3.5 text-xs">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 flex items-center justify-center font-bold text-xs">
                        <i className="fa-solid fa-lock text-[11px]" />
                      </div>
                      <div>
                        <span className="font-bold text-black block text-xs">Razorpay Secure Checkout</span>
                        <span className="text-[11px] text-gray-500">
                          Select UPI, Cards, NetBanking, QR or Wallets in the payment popup
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                      <i className="fa-solid fa-qrcode" title="UPI / QR" />
                      <i className="fa-solid fa-credit-card" title="Debit & Credit Cards" />
                      <i className="fa-solid fa-building-columns" title="NetBanking" />
                    </div>
                  </div>
                </div>

                {/* Age Eligibility Checkbox (18+ Requirement) */}
                <div className="bg-amber-50/70 p-3 rounded border border-amber-200">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="ageConfirmed"
                      checked={formData.ageConfirmed}
                      onChange={(e) => handleInputChange("ageConfirmed", e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-[11px] text-amber-950 leading-normal font-medium">
                      <strong>Age Declaration:</strong> I confirm that I am an individual over 18 years of age and legally permitted to make this charitable contribution.
                    </span>
                  </label>
                  {errors.ageConfirmed && (
                    <p className="mt-1.5 text-xs text-red-600 font-semibold flex items-center gap-1">
                      <i className="fa-solid fa-circle-exclamation text-xs" />
                      <span>{errors.ageConfirmed}</span>
                    </p>
                  )}
                </div>

                {/* Terms and Tax Declaration Checkbox from Data.json */}
                <div className="bg-gray-50 p-3 rounded border border-gray-200">
                  <label className="flex items-start gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.termsAccepted}
                      onChange={(e) => handleInputChange("termsAccepted", e.target.checked)}
                      className="mt-0.5 h-3.5 w-3.5 rounded border-gray-300 text-black focus:ring-black"
                    />
                    <span className="text-[11px] text-gray-600 leading-normal">
                      As per the Indian Income Tax Department&apos;s rules, a donor is required to add their Full Name, Address, and PAN number in case they wish to claim tax exemption.
                    </span>
                  </label>
                  {errors.terms && (
                    <p className="mt-1.5 text-xs text-red-600 font-semibold">{errors.terms}</p>
                  )}
                </div>

                {/* Payment Error Alert */}
                {paymentError && (
                  <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded text-xs flex items-start gap-2">
                    <i className="fa-solid fa-triangle-exclamation text-red-500 mt-0.5" />
                    <span>{paymentError}</span>
                  </div>
                )}

                {/* Step 3 Actions */}
                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={handleBack}
                    className="btn-wwf-outline-dark !py-2 !px-4 text-xs"
                  >
                    Back
                  </button>

                  {/* Primary Pay Now CTA: rgb(248, 154, 53) */}
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-wwf-primary !px-7 text-xs uppercase tracking-wider font-bold !py-3 flex items-center gap-2"
                  >
                    {submitting ? (
                      <>
                        <i className="fa-solid fa-circle-notch fa-spin text-xs" />
                        <span>Opening Razorpay Gateway...</span>
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-lock text-[10px]" aria-hidden="true" />
                        <span>Proceed to Pay: ₹ {finalAmount.toLocaleString("en-IN")}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </div>

      {/* Form Bottom Note with Age Notice */}
      <div className="bg-gray-50 border-t border-gray-100 py-2.5 px-6 text-center text-[11px] text-gray-500">
        <span>*Individuals over 18 years of age are only valid for donations. Only Indian nationals can donate on this platform. 50% Tax Relief under Sec 80G.</span>
      </div>
    </div>
  );
}
