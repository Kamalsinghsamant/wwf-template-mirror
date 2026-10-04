import { memo } from "react";

function StatsSection({ items = [] }) {
  if (!items || items.length === 0) return null;

  return (
    <section className="py-12 bg-[#ffffff] border-y border-gray-200" aria-label="Workplace Impact Statistics">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
            Verified Industry Data
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-black mt-1 uppercase">
            Why Workplace Giving Matters Now
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {items.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#f8f8f8] rounded border border-gray-200 p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl sm:text-5xl font-black text-black tracking-tight">
                    {stat.percentage}
                  </span>
                </div>
                <p className="text-gray-700 text-sm leading-relaxed font-medium">
                  {stat.text}
                </p>
              </div>

              {stat.source && (
                <div className="mt-5 pt-3 border-t border-gray-200 flex items-center justify-between">
                  <span className="text-[10px] text-gray-400 font-semibold uppercase">
                    Industry Report
                  </span>
                  <a
                    href={stat.source}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-black hover:underline inline-flex items-center gap-1"
                    aria-label={`View report for ${stat.percentage}`}
                  >
                    <span>Read Report</span>
                    <i className="fa-solid fa-arrow-up-right-from-square text-[9px]" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(StatsSection);
