"use client";

import React, { useRef, useState, useEffect, useCallback, useMemo, memo } from "react";

const testimonials = [
  {
    organisation: "HSBC India",
    role_tag: "Partner",
    logo: "/images/partners/hsbc.svg",
    avatar: "https://crowdera-platform.s3.ap-south-1.amazonaws.com/gocrowdera/background/702c1a4b-85fe-4b16-a553-ef7411f9131a_thumbnail_10.jpeg",
    domain: "Water, Research & Citizen Engagement",
    quote:
      "For more than two decades, the partnership between WWF-India and HSBC India has demonstrated what's possible when organisations with a shared purpose work together. Grounded in research, evidence and citizen engagement, WWF-India's approach has helped deliver impactful programmes across diverse geographies in India.",
  },
  {
    organisation: "Microsoft India",
    role_tag: "Partner",
    logo: "/images/partners/microsoft.svg",
    avatar: "https://crowdera-platform.s3.ap-south-1.amazonaws.com/gocrowdera/background/dfa5f013-332e-4f96-95d0-f105f7bf8360_thumbnail_9.png",
    domain: "AI & Forest Fire Preparedness",
    quote:
      "Our partnership with WWF-India has been a powerful example of how technology and conservation can come together for real-world impact. Through close collaboration and shared commitment, we have leveraged AI and data to strengthen forest fire preparedness and support government and community-led resilience efforts. We value WWF-India as a trusted partner in advancing sustainable, technology-enabled conservation in India.",
  },
  {
    organisation: "Capgemini",
    role_tag: "Partner",
    logo: "/images/partners/capgemini.svg",
    avatar: "https://crowdera-platform.s3.ap-south-1.amazonaws.com/gocrowdera/background/b163989f-98bc-494b-a8af-e5c7e5f1c6a4_thumbnail_ada.jpeg",
    domain: "One Planet Academy Digital Learning",
    quote:
      "At Capgemini, we believe that technology and education together can unlock powerful pathways for sustainable development. Our partnership with WWF-India for One Planet Academy — an interactive digital environment-education portal — reflects this commitment. Co-creating this platform has enabled us to bring high-quality, engaging and action-oriented environmental learning to students and teachers across India.",
  },
  {
    organisation: "Warner Bros. Discovery",
    role_tag: "Partner",
    logo: "/images/partners/warner-bros.svg",
    avatar: "https://crowdera-platform.s3.ap-south-1.amazonaws.com/gocrowdera/background/3cbf3b7d-1cfa-4386-a635-319b32e4e2cb_thumbnail_images.jpeg",
    domain: "Tiger Conservation & Sundarbans",
    quote:
      "For over eight years, Warner Bros. Discovery has been proud to partner with WWF-India, supporting impactful efforts in tiger conservation, reducing human-tiger conflict and safeguarding the fragile mangroves of the Sundarbans. WWF-India's on-ground commitment continues to drive meaningful, lasting change for both wildlife and communities.",
  },
];

function OurTestimonialSection({
  heading = "Our Testimonials",
  subtitle = "What the world thinks about us!",
  testimonialsList = [],
}) {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const displayTestimonials = useMemo(() => {
    if (!testimonialsList || testimonialsList.length === 0) return testimonials;
    return testimonialsList.map((t, idx) => {
      const fallback = testimonials[idx] || {};
      return {
        organisation: t.title || fallback.organisation || "Partner",
        role_tag: t.designation || fallback.role_tag || "Partner",
        logo: fallback.logo || "/images/partners/hsbc.svg",
        avatar: t.image || fallback.avatar || null,
        domain: fallback.domain || "Conservation & Strategic Impact",
        quote: t.description || fallback.quote || "",
      };
    });
  }, [testimonialsList]);

  const checkScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active card index
    const cardWidth = scrollRef.current.children[0]?.clientWidth || 400;
    const gap = 24; // gap-6 is 24px
    const index = Math.round(scrollLeft / (cardWidth + gap));
    setActiveIndex(Math.min(Math.max(index, 0), testimonials.length - 1));
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    checkScrollState();
    el.addEventListener("scroll", checkScrollState, { passive: true });
    window.addEventListener("resize", checkScrollState);
    return () => {
      el.removeEventListener("scroll", checkScrollState);
      window.removeEventListener("resize", checkScrollState);
    };
  }, [checkScrollState]);

  const scroll = useCallback((direction) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[0];
    const scrollAmount = card ? card.clientWidth + 24 : 500;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const scrollToIndex = useCallback((idx) => {
    if (!scrollRef.current) return;
    const card = scrollRef.current.children[idx];
    if (card) {
      card.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    }
  }, []);

  return (
    <section className="bg-[#f8f9fa] py-16 sm:py-24 border-t border-gray-200 overflow-hidden" aria-labelledby="testimonial-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Left-Right Carousel Navigation Controls */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10 gap-6">
          <div>
            <span className="text-xs font-bold text-[#f89a35] uppercase tracking-widest block mb-1">
              Global Endorsements
            </span>
            <h2
              id="testimonial-heading"
              className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight"
            >
              {heading}
            </h2>
            <p className="mt-2 text-sm sm:text-base font-medium text-gray-700">
              {subtitle}
            </p>
          </div>

          {/* Controls: Scroll Arrows & Counter */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            <span className="text-xs font-bold text-gray-500 tracking-wider mr-2">
              {activeIndex + 1} / {displayTestimonials.length}
            </span>
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "bg-white text-black hover:bg-black hover:text-white hover:border-black shadow-xs cursor-pointer"
                  : "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
              }`}
              aria-label="Previous testimonial"
            >
              <i className="fa-solid fa-chevron-left text-xs" aria-hidden="true" />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center transition-all ${
                canScrollRight
                  ? "bg-white text-black hover:bg-black hover:text-white hover:border-black shadow-xs cursor-pointer"
                  : "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
              }`}
              aria-label="Next testimonial"
            >
              <i className="fa-solid fa-chevron-right text-xs" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Single Row Horizontal Scroll Carousel (Snap-To-Card) */}
        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-1 snap-x snap-mandatory scroll-smooth focus:outline-none scrollbar-thin scrollbar-thumb-gray-300"
          style={{ scrollbarWidth: "thin" }}
          tabIndex={0}
          role="region"
          aria-label="Partner testimonials carousel"
        >
          {displayTestimonials.map((item, index) => (
            <div
              key={index}
              className="min-w-[85vw] sm:min-w-[500px] md:min-w-[560px] lg:min-w-[580px] max-w-[600px] shrink-0 snap-start bg-white rounded-xl p-7 sm:p-9 border border-gray-200 hover:border-black shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Header: Official Logo / Avatar + Verified Badge */}
                <div className="flex items-center justify-between gap-4 mb-6 pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-3">
                    {item.avatar ? (
                      <img
                        src={item.avatar}
                        alt={`${item.organisation} avatar`}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                    ) : null}
                    <div className="h-10 px-3 bg-[#fafafa] rounded-md p-1.5 flex items-center justify-center border border-gray-100">
                      {item.logo ? (
                        <img
                          src={item.logo}
                          alt={`${item.organisation} logo`}
                          className="max-h-7 max-w-[110px] w-auto object-contain"
                        />
                      ) : (
                        <span className="text-xs font-bold text-black">{item.organisation}</span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded text-[11px] font-semibold">
                    <i className="fa-solid fa-circle-check text-[10px]" aria-hidden="true" />
                    <span>Verified Partner</span>
                  </div>
                </div>

                {/* Decorative Accent Quote Mark */}
                <div
                  className="text-[#f89a35] text-4xl sm:text-5xl font-serif font-black leading-none mb-3 opacity-80 select-none"
                  aria-hidden="true"
                >
                  &ldquo;
                </div>

                {/* Quote Content */}
                <blockquote className="text-sm sm:text-base text-gray-700 leading-relaxed italic mb-6">
                  {item.quote}
                </blockquote>
              </div>

              {/* Organisation Name as Small Label */}
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-black bg-gray-100 px-2.5 py-1 rounded border border-gray-200 inline-block mr-2">
                    {item.organisation}
                  </span>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                    {item.role_tag}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-gray-500 hidden sm:block">
                  {item.domain}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {displayTestimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              className={`transition-all duration-300 rounded-full ${
                activeIndex === i
                  ? "w-8 h-2 bg-[#f89a35]"
                  : "w-2 h-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(OurTestimonialSection);
