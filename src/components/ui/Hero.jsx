"use client";

import React, { useState, useEffect, useCallback, memo } from "react";
import Link from "next/link";
import { normalizeHref } from "@/lib/data";

function Hero({
  heading,
  subheading,
  content,
  cta,
  badge = "Conservation Appeal",
  variant = "home",
  bannerImage = "/images/ban-1home.jpg",
  slides = [],
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const hasSlides = slides && slides.length > 0;

  const nextSlide = useCallback(() => {
    if (!hasSlides) return;
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [hasSlides, slides.length]);

  const prevSlide = useCallback(() => {
    if (!hasSlides) return;
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [hasSlides, slides.length]);

  useEffect(() => {
    if (!hasSlides || isPaused || slides.length <= 1) return;
    const interval = setInterval(nextSlide, 7000);
    return () => clearInterval(interval);
  }, [hasSlides, isPaused, nextSlide, slides.length]);

  // Current active slide data
  const activeSlide = hasSlides ? slides[currentSlide] : null;
  const displayImage = activeSlide?.image || bannerImage;
  const displayHeading = activeSlide?.title || heading;
  const displaySubheading = activeSlide?.subtitle || subheading;
  const displayText = activeSlide?.text || activeSlide?.description || content;

  return (
    <section
      className="relative min-h-[520px] lg:min-h-[580px] flex items-center bg-[#000000] text-white overflow-hidden group/hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      aria-label="WWF-India Conservation Appeal Hero"
    >
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img
          key={displayImage}
          src={displayImage}
          alt={displayHeading}
          className="w-full h-full object-cover object-center transition-opacity duration-700 ease-in-out"
        />
        {/* Modern clean dark gradient vignette for readable typography */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/35 lg:to-transparent" />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 relative z-10 w-full">
        <div className="max-w-2xl space-y-5">
          {/* Minimalist Pill Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded text-xs font-semibold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[rgb(248,154,53)]" />
            <span>{badge}</span>
            {hasSlides && slides.length > 1 && (
              <span className="text-[10px] text-gray-300 font-mono pl-1 border-l border-white/20">
                {currentSlide + 1}/{slides.length}
              </span>
            )}
          </div>

          {/* Heading - Bold & Cinematic */}
          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight uppercase transition-all duration-300">
            {displayHeading}
          </h1>

          {displaySubheading && (
            <p className="text-lg sm:text-xl font-medium text-[#f89a35]">
              {displaySubheading}
            </p>
          )}

          {displayText && (
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
              {displayText}
            </p>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            {cta && (
              <Link
                href={normalizeHref(cta.href || "/donate-to-wwf-india")}
                className="btn-wwf-primary !py-3 !px-7 text-xs uppercase tracking-wider font-bold shadow-sm"
                id="hero-primary-cta"
              >
                <span>{cta.text || "Donate Now"}</span>
                <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
              </Link>
            )}

            {variant === "home" && (
              <Link
                href="/workplace-giving"
                className="inline-flex items-center gap-2 bg-white/10 hover:bg-white text-white hover:text-black border border-white/30 px-6 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all duration-200 backdrop-blur-sm"
              >
                <span>Workplace Giving</span>
              </Link>
            )}
          </div>

          {/* Slide Indicators & Controls when slides exist */}
          {hasSlides && slides.length > 1 && (
            <div className="pt-3 flex items-center gap-3">
              <button
                type="button"
                onClick={prevSlide}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black border border-white/20 text-white flex items-center justify-center text-xs transition-colors"
                aria-label="Previous slide"
              >
                <i className="fa-solid fa-chevron-left" aria-hidden="true" />
              </button>
              <div className="flex items-center gap-1.5">
                {slides.map((_, sIdx) => (
                  <button
                    key={sIdx}
                    type="button"
                    onClick={() => setCurrentSlide(sIdx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      sIdx === currentSlide
                        ? "w-6 bg-[#f89a35]"
                        : "w-2 bg-white/40 hover:bg-white/70"
                    }`}
                    aria-label={`Go to slide ${sIdx + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={nextSlide}
                className="w-8 h-8 rounded-full bg-black/50 hover:bg-black border border-white/20 text-white flex items-center justify-center text-xs transition-colors"
                aria-label="Next slide"
              >
                <i className="fa-solid fa-chevron-right" aria-hidden="true" />
              </button>
            </div>
          )}

          {/* Trust points */}
          <div className="pt-4 flex flex-wrap items-center gap-5 text-xs text-gray-300 border-t border-white/15">
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-emerald-400 text-xs" aria-hidden="true" />
              <span>50% Tax Relief (Sec 80G)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-circle-check text-gray-300 text-xs" aria-hidden="true" />
              <span>Instant 80G Receipt</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-building text-gray-300 text-xs" aria-hidden="true" />
              <span>Registered Charity</span>
            </div>
            <div className="flex items-center gap-1.5">
              <i className="fa-solid fa-user-check text-gray-300 text-xs" aria-hidden="true" />
              <span>Age 18+ Only</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Hero);
