import React, { memo } from "react";
import Link from "next/link";

const relatedProgrammes = [
  {
    name: "One Planet Academy",
    type: "Digital environment-education portal",
    badge: "Digital Learning Lab",
    partner: "Co-created with Capgemini",
    image: "/images/education/one-planet-academy.jpg",
    description:
      "An interactive digital environment-education portal co-created with Capgemini, bringing high-quality, engaging and action-oriented environmental learning to students and teachers across India.",
    href: "https://academy.wwfindia.org",
    external: true,
    ctaText: "Explore Portal",
  },
  {
    name: "Wild Wisdom Quiz",
    type: "National wildlife quiz",
    badge: "Asia's Largest Wildlife Quiz",
    partner: "Recognized by CBSE • Supported by KVS & NVS",
    image: "/images/education/wild-wisdom-quiz.jpg",
    description:
      "Asia's largest wildlife quiz, conceived in 2008 by WWF India and TRAFFIC India, recognised by CBSE as a CCE activity and supported by KVS and NVS.",
    href: "https://quiz.wwfindia.org",
    external: true,
    ctaText: "Discover Quiz",
  },
  {
    name: "Model Conference of Parties (MCOP)",
    type: "Student-led conference",
    badge: "Youth UN Simulation",
    partner: "Youth for Nature & Climate",
    image: "/images/education/model-cop.jpg",
    description:
      "A platform welcoming students from diverse geographies to become changemakers for nature, simulating the UN Conference of Parties.",
    href: "/workplace-giving/leaders-for-change",
    external: false,
    ctaText: "View Initiative",
  },
];

function ImpactStoriesSection() {
  return (
    <section className="bg-white py-16 sm:py-24 border-t border-gray-200" aria-labelledby="impact-heading">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#f89a35] uppercase tracking-widest block mb-1">
            Environment Education Programme
          </span>
          <h2
            id="impact-heading"
            className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight"
          >
            Impact Stories
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600 leading-relaxed">
            Three million learners and 100,000 educators reached in a decade, building a generation ready to act for a sustainable planet.
          </p>
        </div>

        {/* Modern Metrics Showcase: Oversized Numbers (clamp 4rem–8rem) with media badge */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 sm:mb-20">
          {/* Card 1: 3,000,000 Learners */}
          <div className="bg-[#fbfbfb] rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-black transition-all flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-[#f89a35]/15 to-transparent pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#f89a35] bg-amber-50 px-2.5 py-1 rounded border border-amber-200/50">
                  Decade Milestone
                </span>
                <span className="text-xs text-gray-400 font-semibold">Across 28 States</span>
              </div>
              <div
                className="font-black text-black tracking-tight select-none"
                style={{ fontSize: "clamp(3.75rem, 7vw, 6.75rem)", lineHeight: 0.95 }}
              >
                3,000,000
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-4">
                Learners Reached in a Decade
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                Three million learners reached in a decade, building a generation ready to act for a sustainable planet.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200/70 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>Classroom to Field Conservation</span>
              <span className="font-bold text-black group-hover:text-[#f89a35] transition-colors">3M+ Empowered &rarr;</span>
            </div>
          </div>

          {/* Card 2: 100,000 Educators */}
          <div className="bg-[#fbfbfb] rounded-2xl p-8 sm:p-10 border border-gray-200 hover:border-black transition-all flex flex-col justify-between relative overflow-hidden group shadow-xs hover:shadow-md">
            <div className="absolute top-0 right-0 w-32 h-32 bg-radial-gradient from-emerald-500/15 to-transparent pointer-events-none" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-[11px] font-bold uppercase tracking-widest text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200/50">
                  Pedagogical Reach
                </span>
                <span className="text-xs text-gray-400 font-semibold">National Network</span>
              </div>
              <div
                className="font-black text-black tracking-tight select-none"
                style={{ fontSize: "clamp(3.75rem, 7vw, 6.75rem)", lineHeight: 0.95 }}
              >
                100,000
              </div>
              <h3 className="text-base sm:text-lg font-bold text-gray-900 mt-4">
                Educators Reached in a Decade
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                100,000 educators reached in a decade across India with comprehensive pedagogical conservation tools and workshop training.
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-gray-200/70 flex items-center justify-between text-xs text-gray-500 font-medium">
              <span>Teacher Training & Curricula</span>
              <span className="font-bold text-black group-hover:text-emerald-700 transition-colors">100k+ Certified &rarr;</span>
            </div>
          </div>
        </div>

        {/* Rich Media Section: 3 Related Programmes with Photography & Badges */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 pb-4 border-b border-gray-200 gap-2">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#f89a35] block mb-1">
                Core Initiatives
              </span>
              <h3 className="text-xl sm:text-2xl font-black text-black uppercase tracking-tight">
                Related Education Programmes
              </h3>
            </div>
            <p className="text-xs text-gray-500 max-w-md">
              Engaging students, teachers, and schools nationwide through digital portals, national competitions, and policy simulations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
            {relatedProgrammes.map((prog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-gray-200 hover:border-black overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Real Photography Media Banner */}
                  <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                    <img
                      src={prog.image}
                      alt={prog.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <span className="absolute bottom-3 left-3 bg-black/85 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded border border-white/20">
                      {prog.badge}
                    </span>
                  </div>

                  {/* Card Content */}
                  <div className="p-6">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#e08524] block mb-1">
                      {prog.partner}
                    </span>
                    <h4 className="text-base sm:text-lg font-bold text-black group-hover:text-[#f89a35] transition-colors leading-snug mb-2">
                      {prog.name}
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      {prog.description}
                    </p>
                  </div>
                </div>

                {/* Card CTA Footer */}
                <div className="p-6 pt-0 mt-auto">
                  {prog.external ? (
                    <a
                      href={prog.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-wwf-outline-dark !w-full text-center text-xs font-bold uppercase tracking-wider !py-2.5 flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white transition-all"
                    >
                      <span>{prog.ctaText}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square text-[10px]" aria-hidden="true" />
                    </a>
                  ) : (
                    <Link
                      href={prog.href}
                      className="btn-wwf-outline-dark !w-full text-center text-xs font-bold uppercase tracking-wider !py-2.5 flex items-center justify-center gap-2 group-hover:bg-black group-hover:text-white transition-all"
                    >
                      <span>{prog.ctaText}</span>
                      <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(ImpactStoriesSection);
