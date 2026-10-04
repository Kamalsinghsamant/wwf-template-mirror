import React, { memo } from "react";
import Link from "next/link";
import { globalNavigation, normalizeHref } from "@/lib/data";

const donationsItem = globalNavigation.main_nav.find(
  (item) => item.type === "dropdown"
);
const donationChildren = donationsItem ? donationsItem.children : [];

function Footer() {

  return (
    <footer className="bg-[#111827] text-white mt-auto border-t border-gray-800">
      {/* 80G Tax Exemption Feature Bar - Clean, Minimalist */}
      <div className="border-b border-gray-800 bg-[#0d121c] py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white text-lg flex-shrink-0">
              <i className="fa-solid fa-receipt text-gray-300" aria-hidden="true" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-wide">
                50% Tax Exemption Under Section 80G
              </h3>
              <p className="text-gray-400 text-xs mt-0.5">
                All donations to WWF-India qualify for 50% tax deduction under Section 80G of the Income Tax Act, 1961.
              </p>
            </div>
          </div>
          <Link
            href="/donate-to-wwf-india"
            className="btn-wwf-primary text-xs uppercase tracking-wider font-bold !py-2.5 !px-5 flex-shrink-0"
          >
            Donate & Claim Tax Relief
          </Link>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Column 1: Organization */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo.webp"
                alt="WWF-India Logo"
                className="h-10 w-auto object-contain bg-white p-1 rounded"
              />
              <div className="flex flex-col">
                <span className="text-base font-bold tracking-tight text-white uppercase">
                  WWF-India
                </span>
                <span className="text-[9px] text-gray-400 uppercase tracking-widest">
                  For A Living Planet
                </span>
              </div>
            </div>
            <p className="text-gray-400 text-xs leading-relaxed">
              WWF-India is committed to creating a future where humans live in harmony with nature. For over 56 years, we have worked on the ground to preserve biodiversity and build sustainable communities.
            </p>
            <div className="text-[11px] text-gray-400 space-y-0.5 pt-2">
              <p className="font-semibold text-gray-300">Registered Office:</p>
              <p>WWF-India, 172-B, Lodi Estate, New Delhi - 110003</p>
              <p>CIN: Trust Act 1882</p>
            </div>
          </div>

          {/* Column 2: Conservation Campaigns */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-4 pb-2 border-b border-gray-800">
              Conservation Causes
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              {donationChildren.map((item, idx) => (
                <li key={idx}>
                  <Link
                    href={normalizeHref(item.href)}
                    className="hover:text-white transition-colors flex items-center justify-between group"
                  >
                    <span>{item.text}</span>
                    <i className="fa-solid fa-angle-right text-[9px] opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Giving Programs */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-4 pb-2 border-b border-gray-800">
              Programmes
            </h4>
            <ul className="space-y-2 text-xs text-gray-400">
              <li>
                <Link href="/workplace-giving" className="hover:text-white transition-colors block">
                  Workplace Giving Program
                </Link>
              </li>
              <li>
                <Link href="/workplace-giving/leaders-for-change" className="hover:text-white transition-colors block pl-2 text-gray-500">
                  • Leaders for Change
                </Link>
              </li>
              <li>
                <Link href="/workplace-giving/corporate-matching" className="hover:text-white transition-colors block pl-2 text-gray-500">
                  • Corporate Matching
                </Link>
              </li>
              <li>
                <Link href="/join-the-supporter-programme" className="hover:text-white transition-colors block pt-1">
                  Supporter Programme
                </Link>
              </li>
              <li>
                <Link href="/donate-to-wwf-india" className="hover:text-white transition-colors block">
                  Individual Giving
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Compliance & Channels */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-200 mb-4 pb-2 border-b border-gray-800">
              Compliance & Security
            </h4>
            <div className="bg-black/30 p-3 rounded border border-gray-800 text-[11px] text-gray-400 space-y-1.5">
              <p>• <strong>80G Relief:</strong> 50% deduction on taxable income.</p>
              <p>• <strong>Indian Nationals Only:</strong> Only Indian bank instruments accepted.</p>
              <p>• <strong>Instant Receipt:</strong> Digital certificate generated automatically.</p>
            </div>

            <div>
              <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Official Channels
              </p>
              <div className="flex items-center gap-3">
                <a
                  href="https://www.facebook.com/wwfindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-gray-800 hover:bg-black flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-gray-700"
                  aria-label="WWF-India Facebook"
                >
                  <i className="fa-brands fa-facebook-f text-xs" aria-hidden="true" />
                </a>
                <a
                  href="https://twitter.com/wwfindia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-gray-800 hover:bg-black flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-gray-700"
                  aria-label="WWF-India X"
                >
                  <i className="fa-brands fa-x-twitter text-xs" aria-hidden="true" />
                </a>
                <a
                  href="https://www.instagram.com/wwfindia/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-gray-800 hover:bg-black flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-gray-700"
                  aria-label="WWF-India Instagram"
                >
                  <i className="fa-brands fa-instagram text-xs" aria-hidden="true" />
                </a>
                <a
                  href="https://www.youtube.com/user/WWFIndia"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded bg-gray-800 hover:bg-black flex items-center justify-center text-gray-300 hover:text-white transition-colors border border-gray-700"
                  aria-label="WWF-India YouTube"
                >
                  <i className="fa-brands fa-youtube text-xs" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} WWF-India. All rights reserved. Registered Charity Trust.</p>

          {/* Powered by Crowdera */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-gray-400">Powered by</span>
            <a
              href="https://gocrowdera.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-white px-2.5 py-1 rounded hover:opacity-90 transition-opacity"
              aria-label="Powered by Crowdera"
            >
              <img
                src="https://crowdera-platform.s3.ap-south-1.amazonaws.com/assets/crowdera-logo-188x40.svg"
                alt="Crowdera"
                className="h-4 sm:h-4.5 w-auto object-contain"
              />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>FCRA Compliance</span>
            <span>80G Certificate</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
