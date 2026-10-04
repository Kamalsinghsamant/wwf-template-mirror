"use client";

import React, { useState, useCallback, useMemo, memo } from "react";

const partnersData = [
  {
    id: "hsbc",
    organisation: "HSBC India",
    logo: "/images/partners/hsbc.svg",
    domain: "Water, Research & Citizen Engagement",
    tenure: "20+ Years Partnership",
    quote:
      "For more than two decades, the partnership between WWF-India and HSBC India has demonstrated what's possible when organisations with a shared purpose work together. Grounded in research, evidence and citizen engagement, WWF-India's approach has helped deliver impactful programmes across diverse geographies in India.",
  },
  {
    id: "microsoft",
    organisation: "Microsoft India",
    logo: "/images/partners/microsoft.svg",
    domain: "AI & Forest Fire Preparedness",
    tenure: "Tech-Enabled Conservation",
    quote:
      "Our partnership with WWF-India has been a powerful example of how technology and conservation can come together for real-world impact. Through close collaboration and shared commitment, we have leveraged AI and data to strengthen forest fire preparedness and support government and community-led resilience efforts. We value WWF-India as a trusted partner in advancing sustainable, technology-enabled conservation in India.",
  },
  {
    id: "capgemini",
    organisation: "Capgemini",
    logo: "/images/partners/capgemini.svg",
    domain: "One Planet Academy Digital Learning",
    tenure: "Digital Co-Creation",
    quote:
      "At Capgemini, we believe that technology and education together can unlock powerful pathways for sustainable development. Our partnership with WWF-India for One Planet Academy — an interactive digital environment-education portal — reflects this commitment. Co-creating this platform has enabled us to bring high-quality, engaging and action-oriented environmental learning to students and teachers across India.",
  },
  {
    id: "warner",
    organisation: "Warner Bros. Discovery",
    logo: "/images/partners/warner-bros.svg",
    domain: "Tiger Conservation & Sundarbans Mangroves",
    tenure: "8+ Years Stewardship",
    quote:
      "For over eight years, Warner Bros. Discovery has been proud to partner with WWF-India, supporting impactful efforts in tiger conservation, reducing human-tiger conflict and safeguarding the fragile mangroves of the Sundarbans. WWF-India's on-ground commitment continues to drive meaningful, lasting change for both wildlife and communities.",
  },
];

function OurPartnersSection({
  heading = "Our Partners",
  partners = [],
}) {
  const [selectedQuote, setSelectedQuote] = useState(null);

  const displayPartners = useMemo(() => {
    if (!partners || partners.length === 0) return partnersData;
    return partners.map((p, idx) => {
      const fallback = partnersData[idx] || {};
      return {
        id: p.alt_text?.toLowerCase().replace(/\s+/g, "-") || fallback.id || `partner-${idx}`,
        organisation: p.alt_text || fallback.organisation || "Partner",
        logo: p.logo || fallback.logo,
        link: p.link || "",
        domain: fallback.domain || "Conservation & Sustainability",
        tenure: fallback.tenure || "Valued Partner",
        quote: fallback.quote || "Collaborating with WWF-India to drive meaningful, lasting conservation change.",
      };
    });
  }, [partners]);

  const handleClose = useCallback(() => {
    setSelectedQuote(null);
  }, []);

  const handleSelect = useCallback((partner) => {
    setSelectedQuote(partner);
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24 border-t border-gray-200" aria-labelledby="partners-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Modern Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold text-[#f89a35] uppercase tracking-widest block mb-1.5">
            Strategic Alliances
          </span>
          <h2
            id="partners-heading"
            className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-2.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
            Collaborating with forward-looking industry leaders to build long-term, technology-driven solutions for nature and communities across India.
          </p>
        </div>

        {/* 4-Column Modern Partner Cards with Authentic Media & SVG Logos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayPartners.map((partner) => {
            return (
              <div
                key={partner.id}
                className="group relative bg-[#ffffff] rounded-xl border border-gray-200 hover:border-black p-6 flex flex-col justify-between transition-all duration-300 shadow-xs hover:shadow-xl hover:-translate-y-1"
              >
                <div>
                  {/* Top Bar: Clean SVG Logo Container */}
                  <div className="h-16 w-full bg-[#f9fafb] rounded-lg border border-gray-100 flex items-center justify-center p-3 mb-5 group-hover:bg-white group-hover:border-gray-200 transition-colors">
                    <img
                      src={partner.logo}
                      alt={`${partner.organisation} official logo`}
                      className="max-h-9 max-w-[170px] w-auto object-contain filter group-hover:contrast-110 transition-all"
                    />
                  </div>

                  {/* Tenure Tag */}
                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f89a35]" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      {partner.tenure}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-black group-hover:text-[#f89a35] transition-colors leading-snug mb-1.5">
                    {partner.organisation}
                  </h3>

                  <p className="text-xs font-semibold text-gray-800 mb-3 leading-snug">
                    {partner.domain}
                  </p>

                  <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed italic border-l-2 border-[#f89a35]/40 pl-3">
                    "{partner.quote}"
                  </p>
                </div>

                {/* Footer Action Button */}
                <div className="mt-5 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleSelect(partner)}
                    className="w-full text-xs font-bold text-black uppercase tracking-wider bg-gray-50 hover:bg-black hover:text-white py-2.5 px-3 rounded transition-all duration-200 flex items-center justify-center gap-1.5 group/btn cursor-pointer"
                    aria-label={`Read full testimonial from ${partner.organisation}`}
                  >
                    <span>Read Testimonial</span>
                    <i className="fa-solid fa-arrow-right text-[10px] group-hover/btn:translate-x-1 transition-transform" aria-hidden="true" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal: Full Partner Testimonial with Logo & Editorial Layout */}
        {selectedQuote && (
          <div
            className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
            role="dialog"
            aria-modal="true"
            aria-labelledby="partner-modal-title"
          >
            <div className="bg-white rounded-xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100">
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-black w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
              </button>

              {/* Modal Logo & Header */}
              <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                <div className="h-14 w-36 bg-[#f9fafb] rounded border border-gray-200 p-2 flex items-center justify-center">
                  <img
                    src={selectedQuote.logo}
                    alt={selectedQuote.organisation}
                    className="max-h-8 max-w-[120px] object-contain"
                  />
                </div>
                <div>
                  <h4 id="partner-modal-title" className="text-base font-bold text-black">
                    {selectedQuote.organisation}
                  </h4>
                  <span className="text-[11px] font-semibold text-[#f89a35] uppercase tracking-wider block">
                    {selectedQuote.tenure}
                  </span>
                </div>
              </div>

              {/* Full Quote */}
              <div className="relative mb-6">
                <span className="text-[#f89a35] text-5xl font-serif font-black absolute -top-5 -left-1 opacity-25 select-none" aria-hidden="true">
                  &ldquo;
                </span>
                <p className="text-sm sm:text-base text-gray-700 leading-relaxed italic relative z-10 pl-4">
                  {selectedQuote.quote}
                </p>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500 font-medium">
                <span>Domain: {selectedQuote.domain}</span>
                <button
                  onClick={handleClose}
                  className="btn-wwf-primary !py-1.5 !px-4 text-xs font-bold uppercase tracking-wider cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default memo(OurPartnersSection);
