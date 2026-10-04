import React, { memo } from "react";

/**
 * Centralized Age Eligibility & 80G Statutory Notice
 * Standardized across all donation sections and campaign pages.
 */
function AgeEligibilityNotice({
  variant = "card", // "card" | "banner" | "compact"
  className = "",
}) {
  if (variant === "banner") {
    return (
      <div
        className={`bg-amber-50 border border-amber-300 rounded p-3 text-xs text-amber-950 flex items-start gap-2.5 ${className}`}
        role="note"
        aria-label="Statutory Age Requirement"
      >
        <i
          className="fa-solid fa-triangle-exclamation text-amber-600 mt-0.5 text-sm flex-shrink-0"
          aria-hidden="true"
        />
        <div className="leading-snug">
          <span className="font-bold text-[11px] uppercase tracking-wider block text-amber-900">
            Eligibility &amp; Statutory Age Notice
          </span>
          <span className="text-amber-800">
            Individuals over 18 years of age are only valid for donations. Donations can strictly be made by adult Indian nationals.
          </span>
        </div>
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <div className={`flex items-center justify-between text-xs text-gray-500 font-medium ${className}`}>
        <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
          <i className="fa-solid fa-shield-halved text-[11px]" aria-hidden="true" />
          <span>50% Tax Relief (Sec 80G)</span>
        </span>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
          Age 18+ Required
        </span>
      </div>
    );
  }

  // Default "card" variant
  return (
    <div
      className={`bg-gray-50 rounded p-3.5 border border-gray-200 text-xs text-gray-600 space-y-1.5 ${className}`}
      role="note"
      aria-label="Age Eligibility & 80G Tax Exemption Note"
    >
      <div className="flex items-center justify-between font-bold text-black">
        <div className="flex items-center gap-1.5">
          <i className="fa-solid fa-shield-halved text-emerald-600 text-xs" aria-hidden="true" />
          <span>50% Tax Relief (Sec 80G)</span>
        </div>
        <span className="text-[10px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
          Age 18+ Required
        </span>
      </div>
      <p className="text-[11px] text-gray-500 leading-relaxed">
        Individuals over 18 years of age are only valid for donations. Contributions qualify for 50% tax deduction under Section 80G of the Income Tax Act.
      </p>
    </div>
  );
}

export default memo(AgeEligibilityNotice);
