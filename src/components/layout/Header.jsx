"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { globalNavigation, normalizeHref } from "@/lib/data";

const donationsItem = globalNavigation.main_nav.find(
  (item) => item.type === "dropdown"
);
const donationChildren = donationsItem ? donationsItem.children : [];

/** WWF signature font — main nav (uppercase on-screen) */
const desktopNavLink =
  "font-display text-base font-bold uppercase tracking-wide transition-colors py-2 border-b-2";
const mobileNavLink =
  "font-display block px-3 py-2.5 rounded text-base font-bold uppercase";
const mobileCauseLink =
  "font-display block px-3 py-2.5 rounded text-sm font-bold uppercase";
const dropdownCauseLink =
  "font-display flex items-center justify-between px-4 py-3 text-base font-bold uppercase transition-colors";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [donationsDropdownOpen, setDonationsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef(null);

  // Handle scroll effect with passive listener
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDonationsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setDonationsDropdownOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Top Tax Relief & Verification Bar - Minimalist Dark */}
      <div className="bg-[#111827] text-white text-xs py-2 px-4 border-b border-gray-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold text-gray-300">
              Tax Exemption (Section 80G):
            </span>
            <span className="text-gray-400">
              All contributions are 50% Tax Exempt under Section 80G of the Income Tax Act.
            </span>
          </div>
          <div className="flex items-center gap-4 text-gray-400">
            <a
              href="tel:+911141504814"
              className="hover:text-white transition-colors flex items-center gap-1.5"
            >
              <i className="fa-solid fa-phone text-[10px]" aria-hidden="true" />
              <span>011-41504814</span>
            </a>
            <span className="text-gray-600">|</span>
            <span className="text-gray-300 flex items-center gap-1.5">
              <i className="fa-solid fa-shield-halved text-[11px] text-emerald-400" aria-hidden="true" />
              <span>Official WWF-India Platform</span>
            </span>
          </div>
        </div>
      </div>

      {/* Main Header - Clean Black and White */}
      <header
        className={`sticky top-0 z-50 bg-white transition-all duration-200 border-b ${
          scrolled ? "shadow-sm border-gray-200 py-2.5" : "border-gray-200 py-3.5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* WWF Logo - Context-aware for Workplace Giving */}
            <Link
              href={pathname.startsWith("/workplace-giving") ? "/workplace-giving" : "/"}
              className="flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded p-1 group"
              aria-label={pathname.startsWith("/workplace-giving") ? "WWF-India Workplace Giving" : "WWF-India Home"}
            >
              <img
                src={pathname.startsWith("/workplace-giving") ? "/workplace-giving/images/logo.png" : "/images/logo.webp"}
                alt={pathname.startsWith("/workplace-giving") ? "WWF-India Workplace Giving Logo" : "WWF-India Logo"}
                className="h-10 sm:h-12 w-auto object-contain"
              />
              <div className="border-l border-gray-200 pl-3 hidden sm:flex flex-col justify-center">
                <span className="font-display font-extrabold text-sm sm:text-base tracking-tight text-[#000000] uppercase">
                  WWF-India
                </span>
                <span className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest">
                  {pathname.startsWith("/workplace-giving") ? "Workplace Giving Program" : "For A Living Planet"}
                </span>
              </div>
            </Link>

            {/* Desktop Navigation - Minimalist Black & White */}
            <nav className="hidden lg:flex items-center gap-8" aria-label="Main Navigation">
              {pathname.startsWith("/workplace-giving") ? (
                <>
                  <Link
                    href="/workplace-giving"
                    className={`${desktopNavLink} ${
                      pathname === "/workplace-giving"
                        ? "text-[#000000] border-[#000000]"
                        : "text-gray-700 border-transparent hover:text-[#000000]"
                    }`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/workplace-giving/leaders-for-change"
                    className={`${desktopNavLink} ${
                      pathname === "/workplace-giving/leaders-for-change"
                        ? "text-[#000000] border-[#000000]"
                        : "text-gray-700 border-transparent hover:text-[#000000]"
                    }`}
                  >
                    Leaders for Change
                  </Link>

                  <Link
                    href="/workplace-giving/corporate-matching"
                    className={`${desktopNavLink} ${
                      pathname === "/workplace-giving/corporate-matching"
                        ? "text-[#000000] border-[#000000]"
                        : "text-gray-700 border-transparent hover:text-[#000000]"
                    }`}
                  >
                    Corporate Matching
                  </Link>

                  <Link
                    href="/"
                    className={`${desktopNavLink} text-gray-700 border-transparent hover:text-[#000000] flex items-center gap-1`}
                  >
                    <span>All Donations</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[10px] text-gray-400" aria-hidden="true" />
                  </Link>
                </>
              ) : (
                <>
                  {/* Workplace Giving */}
                  <Link
                    href="/workplace-giving"
                    className={`${desktopNavLink} ${
                      pathname.startsWith("/workplace-giving")
                        ? "text-[#000000] border-[#000000]"
                        : "text-gray-700 border-transparent hover:text-[#000000]"
                    }`}
                  >
                    Workplace Giving
                  </Link>

                  {/* Supporter Programme */}
                  <Link
                    href="/join-the-supporter-programme"
                    className={`${desktopNavLink} ${
                      pathname === "/join-the-supporter-programme"
                        ? "text-[#000000] border-[#000000]"
                        : "text-gray-700 border-transparent hover:text-[#000000]"
                    }`}
                  >
                    Supporter Programme
                  </Link>

                  {/* Donations Dropdown */}
                  <div className="relative" ref={dropdownRef}>
                    <button
                      type="button"
                      onClick={() => setDonationsDropdownOpen(!donationsDropdownOpen)}
                      className={`${desktopNavLink} flex items-center gap-1.5 ${
                        donationsDropdownOpen ||
                        (!pathname.startsWith("/workplace-giving") &&
                          pathname !== "/" &&
                          pathname !== "/join-the-supporter-programme")
                          ? "text-[#000000] border-[#000000]"
                          : "text-gray-700 border-transparent hover:text-[#000000]"
                      }`}
                      aria-expanded={donationsDropdownOpen}
                      aria-haspopup="true"
                    >
                      <span>Donations</span>
                      <i
                        className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${
                          donationsDropdownOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </button>

                    {/* Dropdown Menu - Minimalist Surface */}
                    {donationsDropdownOpen && (
                      <div
                        className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50 animate-fade-in"
                        role="menu"
                      >
                        <div className="px-4 py-2 border-b border-gray-100 bg-gray-50">
                          <span className="font-display text-sm font-bold text-gray-500 uppercase tracking-wider">
                            Conservation Causes
                          </span>
                        </div>
                        {donationChildren.map((item, idx) => {
                          const href = normalizeHref(item.href);
                          const isActive = pathname === href;
                          return (
                            <Link
                              key={idx}
                              href={href}
                              onClick={() => setDonationsDropdownOpen(false)}
                              className={`${dropdownCauseLink} ${
                                isActive
                                  ? "bg-gray-100 text-[#000000]"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-[#000000]"
                              }`}
                              role="menuitem"
                            >
                              <span>{item.text}</span>
                              <i
                                className="fa-solid fa-arrow-right text-[10px] text-gray-400"
                                aria-hidden="true"
                              />
                            </Link>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </>
              )}
            </nav>

            {/* Header CTA Button - Specific rgb(248, 154, 53) */}
            <div className="flex items-center gap-4">
              <Link
                href={pathname.startsWith("/workplace-giving") ? "/workplace-giving#workplace-form" : "/donate-to-wwf-india"}
                className="btn-wwf-primary text-xs sm:text-sm font-bold uppercase tracking-wider !py-2.5 !px-6"
                id="header-donate-btn"
              >
                <i className="fa-solid fa-heart text-xs" aria-hidden="true" />
                <span>{pathname.startsWith("/workplace-giving") ? "Donate Now" : "DONATE"}</span>
              </Link>

              {/* Hamburger Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded text-gray-700 hover:text-black hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
              >
                <i
                  className={`fa-solid ${
                    mobileMenuOpen ? "fa-xmark text-lg" : "fa-bars text-lg"
                  }`}
                  aria-hidden="true"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white shadow-lg animate-fade-in">
            <div className="px-4 pt-3 pb-6 space-y-3">
              {pathname.startsWith("/workplace-giving") ? (
                <>
                  <div className="font-display px-3 py-1 text-sm font-bold text-gray-500 uppercase tracking-wider">
                    Workplace Giving Menu
                  </div>
                  <Link
                    href="/workplace-giving"
                    className={`${mobileNavLink} ${
                      pathname === "/workplace-giving" ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/workplace-giving/leaders-for-change"
                    className={`${mobileNavLink} ${
                      pathname === "/workplace-giving/leaders-for-change"
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Leaders for Change
                  </Link>

                  <Link
                    href="/workplace-giving/corporate-matching"
                    className={`${mobileNavLink} ${
                      pathname === "/workplace-giving/corporate-matching"
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Corporate Matching
                  </Link>

                  <Link
                    href="/"
                    className={`${mobileNavLink} text-gray-700 hover:bg-gray-50`}
                  >
                    All WWF Causes
                  </Link>

                  <div className="pt-3 border-t border-gray-200">
                    <Link
                      href="/workplace-giving#workplace-form"
                      className="w-full btn-wwf-primary justify-center text-center text-xs uppercase tracking-wider"
                    >
                      <i className="fa-solid fa-heart text-xs" aria-hidden="true" />
                      <span>Donate Now</span>
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/"
                    className={`${mobileNavLink} ${
                      pathname === "/" ? "bg-gray-100 text-black" : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Home
                  </Link>

                  <Link
                    href="/workplace-giving"
                    className={`${mobileNavLink} ${
                      pathname.startsWith("/workplace-giving")
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Workplace Giving
                  </Link>

                  <Link
                    href="/join-the-supporter-programme"
                    className={`${mobileNavLink} ${
                      pathname === "/join-the-supporter-programme"
                        ? "bg-gray-100 text-black"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    Supporter Programme
                  </Link>

                  <div className="pt-2 border-t border-gray-100">
                    <div className="font-display px-3 py-1.5 text-sm font-bold text-gray-400 uppercase tracking-wider">
                      Donation Causes
                    </div>
                    <div className="grid gap-1 pl-2">
                      {donationChildren.map((item, idx) => {
                        const href = normalizeHref(item.href);
                        const isActive = pathname === href;
                        return (
                          <Link
                            key={idx}
                            href={href}
                            className={`${mobileCauseLink} ${
                              isActive
                                ? "bg-gray-100 text-black"
                                : "text-gray-600 hover:bg-gray-50 hover:text-black"
                            }`}
                          >
                            {item.text}
                          </Link>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <Link
                      href="/donate-to-wwf-india"
                      className="w-full btn-wwf-primary justify-center text-center text-xs uppercase tracking-wider"
                    >
                      <i className="fa-solid fa-heart text-xs" aria-hidden="true" />
                      <span>Donate to WWF-India</span>
                    </Link>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </header>
    </>
  );
}
