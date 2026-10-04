import React, { memo } from "react";

function BenefitsSection({
  heading = "Benefits For You And Your Workplace",
  items = [],
}) {
  return (
    <section className="py-14 sm:py-18 bg-white" aria-labelledby="benefits-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Employee & Corporate Values
          </span>
          <h2
            id="benefits-heading"
            className="text-2xl sm:text-3xl font-black text-black mt-1 uppercase"
          >
            {heading}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Meaningful conservation impact that empowers teams, elevates purpose, and drives measurable sustainability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="bg-[#f8f8f8] rounded border border-gray-200 p-8 text-center flex flex-col items-center justify-center min-h-[160px] hover:border-black transition-colors"
            >
              <div className="w-14 h-14 rounded bg-black text-white flex items-center justify-center text-xl mb-4">
                <i className={item.icon || "fa-solid fa-leaf"} aria-hidden="true" />
              </div>
              <h3 className="text-base font-bold text-black leading-snug max-w-xs">
                {item.text}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(BenefitsSection);
