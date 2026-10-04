import Link from "next/link";
import DonationForm from "@/components/donation/DonationForm";
import AgeEligibilityNotice from "@/components/donation/AgeEligibilityNotice";

export const metadata = {
  title: "Leaders for Change | Workplace Giving | WWF-India",
  description:
    "Join Leaders for Change, WWF-India's flagship regular workplace giving program with quarterly conservation themes, Learning Hub, Ideas Lab, and Action Zone.",
};

const PILLARS = [
  {
    title: "Learning Hub",
    icon: "fa-solid fa-graduation-cap",
    desc: "Curated webinars, conservation masterclasses by WWF scientists, and insider briefings on environmental issues.",
  },
  {
    title: "Ideas Lab",
    icon: "fa-solid fa-lightbulb",
    desc: "Collaborative workshops where employees brainstorm and prototype sustainability solutions for their workplace and homes.",
  },
  {
    title: "Action Zone",
    icon: "fa-solid fa-person-hiking",
    desc: "Exclusive ground volunteering, nature trails, wetland cleanups, and tree planting expeditions across Delhi-NCR, Mumbai, Bangalore, and Chennai.",
  },
];

export default function LeadersForChangePage() {

  return (
    <div className="py-10 sm:py-14 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-xs font-semibold text-gray-500 mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-black">Home</Link>
          <i className="fa-solid fa-chevron-right text-[9px]" aria-hidden="true" />
          <Link href="/workplace-giving" className="hover:text-black">Workplace Giving</Link>
          <i className="fa-solid fa-chevron-right text-[9px]" aria-hidden="true" />
          <span className="text-black font-bold">Leaders for Change</span>
        </nav>

        {/* Page Banner with Official Workplace Asset j-t-g.jpg */}
        <div className="relative rounded-lg overflow-hidden bg-black text-white shadow-sm mb-12 min-h-[300px] flex items-center">
          <img
            src="/workplace-giving/images/j-t-g.jpg"
            alt="Leaders for Change"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-transparent" />
          
          <div className="relative z-10 p-8 sm:p-12 max-w-2xl">
            <span className="inline-block bg-white/20 text-white text-[11px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider mb-2 border border-white/20">
              Flagship Regular Giving Programme
            </span>
            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white">
              Leaders For Change
            </h1>
            <p className="mt-3 text-sm sm:text-base text-gray-200 leading-relaxed font-normal">
              A transformative regular giving experience connecting employees directly with WWF-India&apos;s field conservation efforts through quarterly ecological themes and hands-on participation.
            </p>
          </div>
        </div>

        {/* Main Grid: Program Details + Multi-Step Enrollment Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: The 3 Core Offerings from Data.json */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                Hands-on Conservation Architecture
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-black">
                Three Hands-on Offerings
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 mt-1">
                Every quarterly theme features three dynamic pillars designed to spark awareness, inspire innovation, and drive on-ground action.
              </p>
            </div>

            <div className="space-y-3">
              {PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-[#f8f8f8] p-5 rounded border border-gray-200 flex items-start gap-4"
                >
                  <div className="w-10 h-10 rounded bg-black text-white flex items-center justify-center p-2 flex-shrink-0">
                    <img
                      src="/workplace-giving/images/CSR-Target-Achievement.png"
                      alt=""
                      className="w-full h-full object-contain filter invert brightness-200"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-black">
                      {pillar.title}
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Quarterly Theme Callout */}
            <div className="bg-gray-50 border border-gray-200 rounded p-5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-500 block mb-1">
                Current Quarterly Theme
              </span>
              <h4 className="text-base font-bold text-black mb-1.5">
                Wildlife Corridors & Habitat Connectivity
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Explore how secure migration corridors in Central India and the Western Ghats protect big cats and Asian elephants from fatal human-wildlife conflict.
              </p>
            </div>
          </div>

          {/* Right Column: Multi-Step Enrollment Form */}
          <div className="lg:col-span-6 sticky top-24">
            <DonationForm
              title="ENROL IN LEADERS FOR CHANGE"
              campaignName="Leaders for Change Workplace Initiative"
              isWorkplace={true}
            />
            {/* Age Eligibility & 80G Statutory Notice */}
            <AgeEligibilityNotice className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
