"use client";

import React, { useState, useMemo, useCallback, memo } from "react";

function FaqAccordion({
  heading = "FAQ's",
  items = [],
}) {
  const [openIndex, setOpenIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleIndex = useCallback((index) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  }, []);

  const filteredItems = useMemo(
    () =>
      items.filter(
        (item) =>
          item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [items, searchQuery]
  );

  return (
    <section className="py-16 sm:py-20 bg-[#f8f8f8] border-t border-gray-200" aria-labelledby="faq-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Questions & Answers
          </span>
          <h2
            id="faq-heading"
            className="text-2xl sm:text-3xl font-black text-black mt-1 uppercase"
          >
            {heading}
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
            Frequently asked questions about WWF-India&apos;s Workplace Giving and 80G tax deduction benefits.
          </p>

          {/* Quick Search */}
          <div className="mt-5 max-w-md mx-auto relative">
            <i className="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-gray-400 text-xs" aria-hidden="true" />
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded border border-gray-300 text-xs focus:border-black focus:ring-black bg-white"
              aria-label="Search FAQ questions"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-2 text-[10px] text-gray-400 hover:text-black"
                aria-label="Clear search"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredItems.length === 0 ? (
            <div className="text-center py-6 bg-white rounded border border-gray-200 text-gray-500 text-xs">
              No matching questions found for &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded border border-gray-200 transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleIndex(idx)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-black"
                    aria-expanded={isOpen}
                    aria-controls={`faq-content-${idx}`}
                    id={`faq-btn-${idx}`}
                  >
                    <span className="text-sm font-bold text-black leading-snug">
                      {item.question}
                    </span>
                    <span
                      className={`w-6 h-6 rounded flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                        isOpen
                          ? "bg-black text-white rotate-180"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      <i className="fa-solid fa-chevron-down text-[10px]" aria-hidden="true" />
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      id={`faq-content-${idx}`}
                      role="region"
                      aria-labelledby={`faq-btn-${idx}`}
                      className="px-5 pb-5 pt-1 text-xs sm:text-sm text-gray-700 leading-relaxed border-t border-gray-100"
                    >
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(FaqAccordion);
