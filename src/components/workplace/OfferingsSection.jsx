import { memo } from "react";
import Link from "next/link";
import { normalizeHref } from "@/lib/data";

function OfferingsSection({
  heading = "Something For Everyone",
  items = [],
}) {
  return (
    <section className="py-16 sm:py-20 bg-white" aria-labelledby="offerings-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Workplace Giving Formats
          </span>
          <h2
            id="offerings-heading"
            className="text-2xl sm:text-3xl font-black text-black mt-1 uppercase"
          >
            {heading}
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-gray-600">
            Tailored conservation engagement models for corporate teams, leadership collectives, and individual changemakers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {items.map((offering, idx) => {
            const isLeaders = idx === 0 || offering.title.toLowerCase().includes("leaders");
            const imageSrc = isLeaders
              ? "/workplace-giving/images/Patronage.png"
              : "/workplace-giving/images/Customied-Corporate-1.png";

            return (
              <div
                key={idx}
                className="bg-white rounded border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                <div>
                  {/* Real Offering Image from Data.json */}
                  <div className="relative h-56 w-full overflow-hidden bg-gray-900">
                    <img
                      src={imageSrc}
                      alt={offering.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <div className="absolute bottom-4 left-5 right-5 text-white">
                      <span className="inline-block bg-white/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-1 border border-white/20">
                        {isLeaders ? "Regular Giving" : "Corporate Matching"}
                      </span>
                      <h3 className="text-xl font-bold tracking-tight text-white uppercase">
                        {offering.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Body & Features */}
                  <div className="p-6">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">
                      Program Pillars
                    </p>
                    <ul className="space-y-2.5">
                      {offering.features.map((feature, fIdx) => {
                        const isSubItem = ["learning hub", "ideas lab", "action zone"].includes(
                          feature.toLowerCase()
                        );
                        return (
                          <li
                            key={fIdx}
                            className={`flex items-start gap-3 ${
                              isSubItem
                                ? "ml-7 py-1 px-3 bg-[#f8f8f8] rounded border border-gray-200 text-xs font-semibold text-black"
                                : "text-xs sm:text-sm text-gray-800 font-medium"
                            }`}
                          >
                            <img
                              src="/workplace-giving/images/CSR-Target-Achievement.png"
                              alt=""
                              className="w-5 h-5 object-contain flex-shrink-0 mt-0.5"
                            />
                            <span>{feature}</span>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="p-6 pt-0 mt-2">
                  <Link
                    href={normalizeHref(offering.cta?.href || "/workplace-giving")}
                    className="btn-wwf-primary w-full justify-center !py-2.5 text-xs font-bold uppercase tracking-wider"
                  >
                    <span>{offering.cta?.text || "Learn More"}</span>
                    <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default memo(OfferingsSection);
