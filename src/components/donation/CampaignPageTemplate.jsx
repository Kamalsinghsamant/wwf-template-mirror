import { memo, useMemo } from "react";
import Link from "next/link";
import DonationForm from "@/components/donation/DonationForm";
import AgeEligibilityNotice from "@/components/donation/AgeEligibilityNotice";
import { getPageBySlug, campaignVisuals, getCampaignPages, normalizeHref } from "@/lib/data";

const DEFAULT_VISUAL = {
  badge: "Conservation Priority",
  tagline: "Help WWF-India protect nature and biodiversity",
  bannerImage: "/images/ban-1home.jpg",
  suggestedAmounts: [
    { amount: 500, label: "Supporter", impact: "Supports frontline field activities" },
    { amount: 1000, label: "Guardian", impact: "Equips anti-poaching patrols" },
    { amount: 2500, label: "Protector", impact: "Maintains critical conservation equipment" },
    { amount: 5000, label: "Champion", impact: "Funds community conservation awareness" },
  ],
};

function CampaignPageTemplate({ slug }) {
  const pageData = useMemo(() => getPageBySlug(slug), [slug]);

  const textSection = useMemo(
    () => pageData?.sections?.find((s) => s.type === "text"),
    [pageData]
  );
  const listSection = useMemo(
    () => pageData?.sections?.find((s) => s.type === "list"),
    [pageData]
  );

  const visual = useMemo(
    () => campaignVisuals[slug] || DEFAULT_VISUAL,
    [slug]
  );

  const otherCampaigns = useMemo(
    () =>
      getCampaignPages()
        .filter((p) => normalizeHref(p.url).replace(/^\//, "") !== slug)
        .slice(0, 3),
    [slug]
  );

  const isDoubleTiger = useMemo(() => {
    return (
      slug === "double-your-donation-for-indias-tigers" ||
      slug === "protect-our-tigers" ||
      pageData?.title?.toLowerCase().includes("double your donation") ||
      pageData?.title?.toLowerCase().includes("tigers")
    );
  }, [slug, pageData?.title]);

  if (!pageData) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-bold">Campaign Not Found</h1>
        <Link href="/" className="btn-wwf-primary mt-4">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="bg-[#ffffff] min-h-screen pb-16">
      {/* Campaign Hero Banner - Modern Minimalist */}
      <section className="relative min-h-[380px] lg:min-h-[440px] flex items-center bg-[#000000] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={visual.bannerImage}
            alt={pageData.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/35 lg:to-transparent" />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 relative z-10 w-full">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-semibold text-gray-300 mb-5" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Home</Link>
            <i className="fa-solid fa-chevron-right text-[9px]" aria-hidden="true" />
            <span>Donations</span>
            <i className="fa-solid fa-chevron-right text-[9px]" aria-hidden="true" />
            <span className="text-white font-bold">{pageData.title}</span>
          </nav>

          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white border border-white/20 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wider">
              <span>{visual.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white leading-tight">
              {pageData.title}
            </h1>

            <p className="text-base sm:text-lg font-normal text-gray-200">
              {visual.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Narrative & Checklist + Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Official Content & Impact List */}
          <div className="lg:col-span-7 space-y-7">
            {/* 1:1 Matching Gift Progress Bar - ONLY for Double Your Donation for India's Tigers */}
            {isDoubleTiger && (
              <div className="bg-gradient-to-br from-amber-50/90 to-orange-50/60 border-2 border-amber-300 rounded-xl p-6 sm:p-7 shadow-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 bg-amber-200/80 px-2.5 py-0.5 rounded">
                      1:1 Matching Gift Campaign
                    </span>
                  </div>
                  <span className="text-xs font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                    <i className="fa-solid fa-bolt text-[10px]" aria-hidden="true" />
                    <span>2x Impact Multiplier Active</span>
                  </span>
                </div>

                <div>
                  <h3 className="text-lg sm:text-xl font-black text-black uppercase tracking-tight">
                    Double Your Impact for India&apos;s Wild Tigers
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-700 mt-1 leading-relaxed">
                    Every donation made during this campaign will be matched rupee-for-rupee until the matching fund of <strong>₹ 20,60,000</strong> is exhausted.
                  </p>
                </div>

                {/* Live Progress Bar */}
                <div className="space-y-2 pt-2 border-t border-amber-200/80">
                  <div className="flex items-baseline justify-between text-xs font-bold">
                    <span className="text-gray-600 uppercase tracking-wider text-[11px]">Matching Fund Target</span>
                    <span className="font-mono text-base font-black text-black">₹ 20,60,000</span>
                  </div>
                  <div className="w-full bg-amber-200/70 rounded-full h-3.5 overflow-hidden p-0.5 border border-amber-300">
                    <div
                      className="bg-gradient-to-r from-amber-500 via-[#f89a35] to-orange-500 h-full rounded-full transition-all duration-500 shadow-xs"
                      style={{ width: "35%" }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-gray-600 font-semibold pt-0.5">
                    <span className="text-emerald-800">₹ 7,21,000 Matched So Far</span>
                    <span className="font-black text-amber-900 bg-amber-200/60 px-2 py-0.5 rounded">35% Matched</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cause Text Section */}
            {textSection && (
              <div className="bg-white rounded border border-gray-200 p-6 sm:p-7">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                  Conservation Overview
                </span>
                <h2 className="text-xl sm:text-2xl font-black text-black mb-3">
                  {textSection.heading}
                </h2>
                <div className="text-gray-700 leading-relaxed text-sm sm:text-base">
                  <p>{textSection.content}</p>
                </div>
              </div>
            )}

            {/* Impact List Section ("Your support will help WWF-India:") */}
            {listSection && (
              <div className="bg-[#f8f8f8] rounded border border-gray-200 p-6 sm:p-7">
                <h3 className="text-lg sm:text-xl font-bold text-black mb-4">
                  {listSection.heading || "Your support will help WWF-India:"}
                </h3>

                <div className="space-y-3">
                  {listSection.items?.map((item, idx) => {
                    const iconPath = visual.itemIcons && visual.itemIcons[idx];
                    return (
                      <div
                        key={idx}
                        className="p-3.5 rounded bg-white border border-gray-200 flex items-start gap-3.5"
                      >
                        {iconPath ? (
                          <img
                            src={iconPath}
                            alt=""
                            className="w-6 h-6 object-contain flex-shrink-0 mt-0.5"
                          />
                        ) : (
                          <div className="w-5 h-5 rounded-full bg-black text-white flex items-center justify-center text-[10px] flex-shrink-0 mt-0.5">
                            <i className="fa-solid fa-check" aria-hidden="true" />
                          </div>
                        )}
                        <p className="text-xs sm:text-sm text-gray-800 leading-relaxed font-medium">
                          {item}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Suggested Impact Tiers - Minimal Clean Black Box */}
            {visual.suggestedAmounts && (
              <div className="bg-[#111827] text-white rounded p-6 sm:p-7">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-1">
                  Impact Metrics
                </span>
                <h3 className="text-lg sm:text-xl font-black text-white mb-4">
                  How Every Rupee Creates Change
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {visual.suggestedAmounts.map((tier, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded bg-white/5 border border-white/10"
                    >
                      <div className="flex justify-between items-baseline mb-1">
                        <span className="text-xs font-bold text-gray-300 uppercase">{tier.label}</span>
                        <span className="text-base font-black text-white">₹ {tier.amount.toLocaleString("en-IN")}</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-snug">
                        {tier.impact}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Multi-Step Donation Form */}
          <div className="lg:col-span-5 sticky top-24">
            <DonationForm
              title={pageData.title}
              campaignName={pageData.title}
              campaignSlug={slug}
              organizationUrl="world-wide-fund-for-nature--india"
              organizationName="WWF-India"
            />

            {/* Age Eligibility & 80G Tax Exemption Note */}
            <AgeEligibilityNotice className="mt-3" />
          </div>
        </div>

        {/* Other Causes To Support */}
        <div className="mt-14 pt-10 border-t border-gray-200">
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Explore More Initiatives
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-black mt-1 uppercase">
              Other Critical Conservation Efforts
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {otherCampaigns.map((other, idx) => {
              const otherSlug = normalizeHref(other.url).replace(/^\//, "");
              const otherVisual = campaignVisuals[otherSlug] || {
                badge: "Conservation",
                bannerImage: "/images/ban-1home.jpg",
              };
              return (
                <div
                  key={idx}
                  className="bg-white rounded border border-gray-200 shadow-sm hover:border-gray-400 transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="h-36 w-full relative overflow-hidden bg-gray-900">
                    <img
                      src={otherVisual.bannerImage}
                      alt={other.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" />
                    <span className="absolute bottom-2 left-2 text-[9px] font-bold uppercase tracking-wider text-white bg-black/80 px-2 py-0.5 rounded border border-white/20">
                      {otherVisual.badge}
                    </span>
                  </div>
                  <div className="p-4 flex flex-col justify-between flex-grow">
                    <h4 className="text-sm font-bold text-black mb-3">
                      {other.title}
                    </h4>
                    <Link
                      href={normalizeHref(other.url)}
                      className="text-xs font-bold text-black hover:underline uppercase tracking-wider inline-flex items-center gap-1"
                    >
                      <span>View Campaign</span>
                      <i className="fa-solid fa-arrow-right text-[9px]" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(CampaignPageTemplate);
