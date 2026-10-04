"use client";

import React, { useState, useCallback, memo } from "react";
import Link from "next/link";

function ChangemakerBand() {
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpen = useCallback(() => setModalOpen(true), []);
  const handleClose = useCallback(() => setModalOpen(false), []);

  return (
    <>
      <section className="bg-black text-white py-20 sm:py-24 border-t border-gray-900 relative overflow-hidden" aria-labelledby="changemaker-heading">
        {/* Subtle background glow */}
        <div
          className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent pointer-events-none opacity-50"
          aria-hidden="true"
        />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Subtle kicker */}
          <span className="text-xs font-bold uppercase tracking-widest text-[#f89a35] mb-3 block">
            Get Involved
          </span>

          {/* Big, quiet, confident heading */}
          <h2
            id="changemaker-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight"
          >
            Want to be a changemaker?
          </h2>

          {/* One line of copy */}
          <p className="mt-4 text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-normal leading-relaxed">
            You can become a changemaker by creating a fundraising campaign for this organization.
          </p>

          {/* One button */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={handleOpen}
              className="btn-wwf-primary !px-8 !py-3.5 text-sm uppercase tracking-wider font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 group cursor-pointer"
              aria-label="Get involved and create a fundraising campaign"
            >
              <span>Get Involved</span>
              <i className="fa-solid fa-arrow-right text-xs group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </button>
          </div>

          {/* Subtext */}
          <p className="mt-6 text-[11px] text-gray-400 uppercase tracking-widest">
            Campaign creation platform powered by Raisefree (previously gocrowdera)
          </p>
        </div>
      </section>

      {/* Changemaker Action Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="changemaker-modal-title"
        >
          <div className="bg-white text-black rounded-lg max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-black p-1 cursor-pointer"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark text-lg" aria-hidden="true" />
            </button>

            <span className="text-[10px] font-bold text-[#e08524] uppercase tracking-widest block mb-1">
              Start a Peer Fundraiser
            </span>
            <h3
              id="changemaker-modal-title"
              className="text-xl font-black uppercase text-black mb-3"
            >
              Become a Changemaker
            </h3>

            <p className="text-xs text-gray-600 leading-relaxed mb-6">
              You can become a changemaker by creating a fundraising campaign for WWF-India. Rally your friends, colleagues, and family to support wildlife and conservation fieldwork.
            </p>

            <div className="space-y-3">
              <Link
                href="/donate-to-wwf-india"
                onClick={handleClose}
                className="btn-wwf-primary !w-full text-center text-xs uppercase tracking-wider !py-3 font-bold block"
              >
                Create Campaign on Platform
              </Link>
              <Link
                href="/workplace-giving"
                onClick={handleClose}
                className="btn-wwf-outline-dark !w-full text-center text-xs uppercase tracking-wider !py-3 font-bold block"
              >
                Explore Workplace Giving
              </Link>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
              <span className="flex items-center gap-1.5 text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Support is online</span>
              </span>
              <span>Chat with Raisefree</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default memo(ChangemakerBand);
