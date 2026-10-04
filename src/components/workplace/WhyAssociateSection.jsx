import { memo, useMemo } from "react";

const DEFAULT_COUNTERS = [
  { label: "Projects Since 1961", count: "13,000+", icon: "project.svg" },
  { label: "Social Media Followers", count: "30M+", icon: "social.svg" },
  { label: "Years of science-based conservation experience", count: "60+", icon: "science.svg" },
  { label: "Indian States", count: "22", icon: "country.svg" },
  { label: "Members", count: "5M+", icon: "member.svg" },
];

function WhyAssociateSection({
  heading = "Why Associate With WWF-INDIA?",
  content,
  counters = [],
}) {
  const items = useMemo(() => {
    return counters && counters.length > 0
      ? counters.map((c, i) => ({
          ...c,
          count: DEFAULT_COUNTERS[i]?.count || "50+",
          icon: c.icon || DEFAULT_COUNTERS[i]?.icon || "project.svg",
        }))
      : DEFAULT_COUNTERS;
  }, [counters]);

  return (
    <section className="py-16 sm:py-20 bg-[#111827] text-white relative overflow-hidden" aria-labelledby="why-associate-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-white/10 px-3 py-0.5 rounded border border-white/20">
            56 Years of Conservation Leadership
          </span>
          <h2
            id="why-associate-heading"
            className="text-2xl sm:text-4xl font-black text-white mt-3 uppercase tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-300 leading-relaxed font-normal">
            {content ||
              "WWF-India has been at the helm of various conservation projects for 56 years to preserve India's rich biodiversity, promote sustainability and create a nature-positive future. You can help reverse nature loss and protect wildlife and habitats, preserve rivers and wetlands, fight climate change and much more."}
          </p>
        </div>

        {/* Minimalist Counters Grid with Authentic SVGs from Data.json */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {items.map((counter, idx) => (
            <div
              key={idx}
              className="bg-white/5 border border-white/10 rounded p-5 text-center flex flex-col items-center justify-between"
            >
              <div className="w-12 h-12 flex items-center justify-center mb-3">
                <img
                  src={`/workplace-giving/images/svgs/${counter.icon}`}
                  alt=""
                  className="w-10 h-10 object-contain filter invert brightness-200"
                />
              </div>
              <div className="text-2xl font-black text-white mb-1">
                {counter.count}
              </div>
              <div className="text-[11px] text-gray-400 font-medium leading-tight">
                {counter.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default memo(WhyAssociateSection);
