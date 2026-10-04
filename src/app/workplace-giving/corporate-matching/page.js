"use client";

import { useState, useMemo, useCallback } from "react";
import Link from "next/link";

const MATCHING_PILLARS = [
  {
    title: "Double the Impact",
    desc: "Double the impact of your contribution.",
  },
  {
    title: "Hourly Volunteering",
    desc: "Contribute your time and skills in hourly volunteering opportunities.",
  },
  {
    title: "Custom Events",
    desc: "Engage your employees through custom in-person and virtual events.",
  },
];

export default function CorporateMatchingPage() {
  const [employeeContribution, setEmployeeContribution] = useState(2500);
  const [employeeCount, setEmployeeCount] = useState(50);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [formData, setFormData] = useState({
    companyName: "",
    contactPerson: "",
    workEmail: "",
    phone: "",
    headcount: "100-500",
    message: "",
  });

  const { totalMonthlyImpact, annualTotalImpact } = useMemo(() => {
    const monthly = employeeContribution * employeeCount * 2;
    return {
      totalMonthlyImpact: monthly,
      annualTotalImpact: monthly * 12,
    };
  }, [employeeContribution, employeeCount]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    setInquirySubmitted(true);
  }, []);

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black">Home</Link>
          <i className="fa-solid fa-chevron-right text-[9px]" aria-hidden="true" />
          <Link href="/workplace-giving" className="hover:text-black">Workplace Giving</Link>
          <i className="fa-solid fa-chevron-right text-[9px]" aria-hidden="true" />
          <span className="text-black font-bold">Corporate Matching</span>
        </nav>

        {/* Page Banner with Customized Corporate Asset */}
        <div className="relative rounded-lg overflow-hidden bg-black text-white shadow-sm mb-12 min-h-[300px] flex items-center">
          <img
            src="/workplace-giving/images/Customied-Corporate-1.png"
            alt="Corporate Matching"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-transparent" />
          
          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2 border border-white/20">
              1:1 Matching Gift Program
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Corporate Matching Gifts
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              Multiply your company&apos;s sustainability footprint by matching employee donations rupee-for-rupee, boosting team engagement and maximizing conservation results on the ground.
            </p>
          </div>
        </div>

        {/* 3 Core Pillars from Data.json */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {MATCHING_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-[#f8f8f8] p-6 rounded border border-gray-200 text-center flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 rounded bg-black text-white flex items-center justify-center p-2.5 mx-auto mb-3">
                <img
                  src="/workplace-giving/images/CSR-Target-Achievement.png"
                  alt=""
                  className="w-full h-full object-contain filter invert brightness-200"
                />
              </div>
              <h3 className="text-base font-bold text-black mb-1">{pillar.title}</h3>
              <p className="text-xs text-gray-700 leading-relaxed font-medium">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Calculator + Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Calculator */}
          <div className="lg:col-span-6 bg-white rounded border border-gray-200 p-6 sm:p-7 shadow-sm">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
              Impact Simulation
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-black mb-3 uppercase">
              Matching Impact Calculator
            </h2>
            <p className="text-xs text-gray-600 mb-6">
              Adjust the sliders below to see how your corporate matching multiplies employee generosity over one year.
            </p>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-700">Average Employee Giving / Month:</span>
                  <span className="font-mono text-sm text-black">₹ {employeeContribution.toLocaleString("en-IN")}</span>
                </div>
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="250"
                  value={employeeContribution}
                  onChange={(e) => setEmployeeContribution(Number(e.target.value))}
                  className="w-full accent-black h-1.5 bg-gray-200 rounded cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs font-bold mb-2">
                  <span className="text-gray-700">Participating Employees:</span>
                  <span className="font-mono text-sm text-black">{employeeCount} members</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="1000"
                  step="10"
                  value={employeeCount}
                  onChange={(e) => setEmployeeCount(Number(e.target.value))}
                  className="w-full accent-black h-1.5 bg-gray-200 rounded cursor-pointer"
                />
              </div>

              {/* Multiplied Results Box */}
              <div className="bg-[#f8f8f8] border border-gray-200 rounded p-4 space-y-2 text-xs">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Employee Contributions / Month:</span>
                  <span className="font-bold text-black">₹ {(employeeContribution * employeeCount).toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Corporate 1:1 Match / Month:</span>
                  <span className="font-bold text-black">+ ₹ {(employeeContribution * employeeCount).toLocaleString("en-IN")}</span>
                </div>
                <div className="pt-2 border-t border-gray-200 flex justify-between items-center text-sm">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block">Total Annual Impact</span>
                    <span className="text-xl font-black text-black">
                      ₹ {annualTotalImpact.toLocaleString("en-IN")}
                    </span>
                  </div>
                  <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                    2x Impact
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry Form */}
          <div className="lg:col-span-6 bg-white rounded border border-gray-200 p-6 sm:p-7 shadow-sm">
            {inquirySubmitted ? (
              <div className="text-center py-10 animate-fade-in space-y-3">
                <div className="w-12 h-12 rounded-full bg-gray-100 text-emerald-600 flex items-center justify-center mx-auto text-2xl">
                  <i className="fa-solid fa-check" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-black text-black">
                  Inquiry Received
                </h3>
                <p className="text-xs text-gray-600 max-w-xs mx-auto">
                  Our team will reach out to <strong>{formData.workEmail}</strong> with onboarding details.
                </p>
                <button
                  type="button"
                  onClick={() => setInquirySubmitted(false)}
                  className="btn-wwf-outline-dark !py-2 !px-4 text-xs"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3.5">
                <div>
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
                    Get In Touch
                  </span>
                  <h3 className="text-lg font-black text-black uppercase">
                    Partnership Inquiry
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Company Name*</label>
                  <input
                    type="text"
                    required
                    placeholder="Company Name"
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:ring-black focus:border-black"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Contact Person*</label>
                    <input
                      type="text"
                      required
                      placeholder="Name & Designation"
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:ring-black focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Corporate Email*</label>
                    <input
                      type="email"
                      required
                      placeholder="corporate@company.com"
                      value={formData.workEmail}
                      onChange={(e) => setFormData({ ...formData, workEmail: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:ring-black focus:border-black"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Contact Phone*</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:ring-black focus:border-black"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Headcount</label>
                    <select
                      value={formData.headcount}
                      onChange={(e) => setFormData({ ...formData, headcount: e.target.value })}
                      className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:ring-black focus:border-black bg-white"
                    >
                      <option value="10-50">10 - 50 Employees</option>
                      <option value="50-200">50 - 200 Employees</option>
                      <option value="200-1000">200 - 1,000 Employees</option>
                      <option value="1000+">1,000+ Employees</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={2}
                    placeholder="CSR or workplace giving goals..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded border border-gray-300 px-3 py-1.5 text-xs focus:ring-black focus:border-black"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-wwf-primary justify-center !py-2.5 text-xs uppercase tracking-wider font-bold"
                >
                  <span>Submit Partnership Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
