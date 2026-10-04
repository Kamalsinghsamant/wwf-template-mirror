import Link from "next/link";
import { headers } from "next/headers";
import Hero from "@/components/ui/Hero";
import DonationForm from "@/components/donation/DonationForm";
import AgeEligibilityNotice from "@/components/donation/AgeEligibilityNotice";
import OurPartnersSection from "@/components/home/OurPartnersSection";
import OurTestimonialSection from "@/components/home/OurTestimonialSection";
import RecognizedBySection from "@/components/home/RecognizedBySection";
import ChangemakerBand from "@/components/home/ChangemakerBand";
import ImpactStoriesSection from "@/components/home/ImpactStoriesSection";
import FeaturedMediaSection from "@/components/home/FeaturedMediaSection";
import { getHomePage, pages, normalizeHref, campaignVisuals } from "@/lib/data";
import { getOrganizationData, mapCampaignSlugToHref } from "@/services/organizationService";

export const metadata = {
  title: "Support WWF-India | Official Donation Platform",
  description:
    "Help us create a brighter future for nature & humans. Donate now to WWF-India. Contributions are 50% Tax Exempt under Section 80G.",
};

export default async function HomePage() {
  const headersList = headers();
  const hostHeader = headersList.get("x-forwarded-host") || headersList.get("host") || "";
  const hostDomain = hostHeader.split(":")[0]?.toLowerCase();
  const isVercelOrLocal =
    !hostDomain ||
    hostDomain === "localhost" ||
    hostDomain === "127.0.0.1" ||
    hostDomain.endsWith(".vercel.app");

  const activeDomain = isVercelOrLocal
    ? (process.env.NEXT_PUBLIC_DEFAULT_DOMAIN || "join.wwfindia.org")
    : hostDomain;

  const orgResponse = await getOrganizationData(activeDomain);
  const orgData = orgResponse?.data || {};
  const orgDetails = orgData.orgDetails || {};
  const camDetails = orgData.camDetails || [];
  const themeDetails = orgData.themeDetails || {};

  const homeData = getHomePage();
  const heroSection = homeData.sections[0];
  const campaignPages = pages.slice(2);

  // Map campaigns from camDetails (Choose Where Your Support Goes)
  const campaigns = camDetails.length > 0
    ? camDetails.map((cam) => {
        const slug = cam.slug;
        const targetHref = mapCampaignSlugToHref(slug);
        const assetUrl = cam.assets?.[0]?.url || cam.assets?.[0]?.thumbnail;
        const visual = campaignVisuals[slug] || {
          badge: cam.category_name || "Conservation Priority",
          bannerImage: assetUrl || "/images/ban-1home.jpg",
        };
        const goalNum = Number(cam.goal) || 1000000;
        const raisedNum = Number(cam.raised) || 0;
        const percent = Math.min(100, Math.round((raisedNum / goalNum) * 100));

        return {
          id: cam._id || slug,
          title: cam.title,
          description: cam.description,
          category: cam.category_name || "Conservation Priority",
          image: assetUrl || visual.bannerImage || "/images/ban-1home.jpg",
          href: targetHref,
          goal: goalNum,
          raised: raisedNum,
          percent,
          currency: cam.currency_symbol || "₹",
        };
      })
    : campaignPages.map((campaign) => {
        const slug = normalizeHref(campaign.url).replace(/^\//, "");
        const visual = campaignVisuals[slug] || {
          badge: "Conservation",
          bannerImage: "/images/ban-1home.jpg",
        };
        const textSection = campaign.sections?.find((s) => s.type === "text");
        return {
          id: slug,
          title: campaign.title,
          description: textSection?.content || "Help WWF-India protect nature and biodiversity across India.",
          category: visual.badge || "Conservation Priority",
          image: visual.bannerImage,
          href: normalizeHref(campaign.url),
          goal: 1000000,
          raised: 0,
          percent: 0,
          currency: "₹",
        };
      });

  // Extract authentic aboutUs from themeDetails
  const aboutUs = themeDetails.aboutUs || {
    title: "Conserving India's wildlife and wild places!",
    description: orgDetails.organization_about || "Established on 27 November 1969, WWF-India was founded with a bold vision to protect the country's wildlife and natural habitats.",
    points: "Supporting impactful initiatives with integrity\nTrusted by donors, volunteers, and partners\nMaking every contribution count toward change",
  };
  const aboutPoints = typeof aboutUs.points === "string" ? aboutUs.points.split("\n").filter(Boolean) : [];

  return (
    <div className="bg-white">
      {/* Official WWF Home Banner & Carousel from orgDetails.organization_header_images_v2 */}
      <Hero
        heading={heroSection.heading}
        content={heroSection.content}
        cta={heroSection.cta}
        badge="Conservation Appeal"
        variant="home"
        bannerImage="/images/ban-1home.jpg"
        slides={orgDetails.organization_header_images_v2 || []}
      />

      {/* Main Container: Split View with Donation Form & Conservation Story */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Clean Minimalist Mission Statement & themeDetails About Us */}
          <div className="lg:col-span-6 space-y-7">
            <div>
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">
                WWF-India Conservation Priorities
              </span>
              <h2 className="text-2xl sm:text-4xl font-extrabold text-[#000000] tracking-tight leading-tight uppercase">
                {aboutUs.title || "Securing A Future For Nature & Humans"}
              </h2>
              <p className="mt-3 text-gray-700 text-sm sm:text-base leading-relaxed">
                {aboutUs.description || "Established on 27 November 1969, WWF-India was founded with a bold vision to protect the country's wildlife and natural habitats."}
              </p>
              <p className="mt-2 text-gray-600 text-xs sm:text-sm leading-relaxed">
                Magnificent animals like the snow leopard, Indian rhino, Bengal tiger, Asian elephant and red panda are at the top of our priority list. With 56 years of science-based field experience, WWF-India protects critical species and restores vital ecosystems across India.
              </p>

              {/* Theme Points from themeDetails.aboutUs */}
              {aboutPoints.length > 0 && (
                <div className="mt-4 space-y-2 bg-[#fafafa] p-4 rounded-lg border border-gray-200">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">
                    Our Commitment
                  </span>
                  {aboutPoints.map((point, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2.5 text-xs text-gray-800 font-semibold">
                      <i className="fa-solid fa-circle-check text-emerald-600 text-xs flex-shrink-0" aria-hidden="true" />
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Impact Feature List - Clean Minimalist Style */}
            <div className="space-y-3">
              <div className="p-4 bg-[#f8f8f8] rounded border border-gray-200 flex items-start gap-3.5">
                <img
                  src="/images/icons/tiger.png"
                  alt="Tiger icon"
                  className="w-8 h-8 object-contain flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="text-sm font-bold text-black">
                    Endangered Species Protection
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Guarding wild tigers, snow leopards, and Asian elephants through anti-poaching squads and local community early-warning alerts.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#f8f8f8] rounded border border-gray-200 flex items-start gap-3.5">
                <img
                  src="/images/icons/sniffer-dogs.png"
                  alt="Sniffer Dogs icon"
                  className="w-8 h-8 object-contain flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="text-sm font-bold text-black">
                    Wildlife Crime Sniffer Dogs
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Deploying specialized canine squads to track snares, locate hidden animal parts, and aid state enforcement against traffickers.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#f8f8f8] rounded border border-gray-200 flex items-start gap-3.5">
                <img
                  src="/images/icons/aquatic.png"
                  alt="Water icon"
                  className="w-8 h-8 object-contain flex-shrink-0 mt-0.5"
                />
                <div>
                  <h3 className="text-sm font-bold text-black">
                    Freshwater, Wetlands & Climate
                  </h3>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Restoring freshwater wetlands, building coastal mangrove shields, and mobilizing community Water Mitras across India.
                  </p>
                </div>
              </div>
            </div>

            {/* Workplace Giving Callout - Clean Minimalist Dark Card */}
            <div className="p-5 bg-black rounded text-white flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                  Workplace &amp; Institutional Giving
                </span>
                <h4 className="text-base font-bold text-white mt-0.5">Workplace Giving Program</h4>
                <p className="text-xs text-gray-400">Engage employees through corporate matching and hands-on conservation.</p>
              </div>
              <Link
                href="/workplace-giving"
                className="btn-wwf-outline-white text-xs uppercase tracking-wider !py-2 !px-4 flex-shrink-0"
              >
                Explore Program
              </Link>
            </div>
          </div>

          {/* Right Column: Multi-Step Donation Form */}
          <div className="lg:col-span-6 sticky top-24">
            <DonationForm
              title={orgDetails.organization_name ? `Donate to ${orgDetails.organization_name}` : "Donate to WWF-India"}
              campaignName="General Conservation Fund"
              campaignSlug="donate-to-wwf-india"
              organizationUrl={orgDetails.organization_url || "world-wide-fund-for-nature--india"}
              organizationName={orgDetails.organization_name || "WWF-India"}
              organizationLogo={orgDetails.organization_logo || "/images/logo.png"}
            />

            {/* Age Eligibility & 80G Tax Exemption Note */}
            <AgeEligibilityNotice className="mt-3" />
          </div>
        </div>
      </div>

      {/* Featured Conservation Causes Grid - Choose Where Your Support Goes (Mapped from camDetails) */}
      <section className="bg-[#f8f8f8] py-16 sm:py-20 border-t border-gray-200" aria-labelledby="causes-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Priority Conservation Causes
            </span>
            <h2
              id="causes-heading"
              className="text-2xl sm:text-3xl font-black text-black mt-1 uppercase"
            >
              Choose Where Your Support Goes
            </h2>
            <p className="mt-1.5 text-xs sm:text-sm text-gray-600">
              Each campaign addresses critical ecological emergencies. Select a cause below to support our fieldwork.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {campaigns.map((campaign, idx) => {
              const isDoubleTiger =
                campaign.slug === "double-your-donation-for-indias-tigers" ||
                campaign.title?.toLowerCase().includes("double your donation") ||
                campaign.title?.toLowerCase().includes("india's tigers");

              return (
                <div
                  key={campaign.id || idx}
                  className="bg-white rounded-xl border border-gray-200 shadow-xs hover:shadow-xl hover:border-black transition-all duration-300 flex flex-col overflow-hidden group"
                >
                  {/* Campaign Image */}
                  <div className="relative h-44 w-full overflow-hidden bg-gray-950 flex-shrink-0">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                    <span className="absolute bottom-2.5 left-3 bg-black/80 backdrop-blur-sm text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded tracking-wider border border-white/20">
                      {campaign.category}
                    </span>
                  </div>

                  {/* Card Content & Action - Single unified flow */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-bold text-black group-hover:text-amber-800 transition-colors mb-1.5 leading-snug line-clamp-2 min-h-[44px]">
                        {campaign.title}
                      </h3>
                      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">
                        {campaign.description}
                      </p>

                      {/* Progress Bar & Matching Goal - ONLY for "Double Your Donation for India's Tigers" */}
                      {isDoubleTiger && (
                        <div className="mt-2.5 space-y-1 bg-amber-50/70 p-2 rounded-lg border border-amber-200/80">
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-bold text-emerald-800 flex items-center gap-1 text-[10px]">
                              <i className="fa-solid fa-bolt text-[9px]" aria-hidden="true" />
                              1:1 Match (2x Impact)
                            </span>
                            <span className="font-black text-black text-[11px]">
                              Goal: {campaign.currency} {campaign.goal.toLocaleString("en-IN")}
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-[#f89a35] h-1.5 rounded-full transition-all duration-500"
                              style={{ width: `${Math.max(8, campaign.percent)}%` }}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Footer: Tax Relief + Donate Button directly linked without excessive gap */}
                    <div className="pt-2.5 mt-2.5 border-t border-gray-100 flex flex-col gap-2">
                      <div className="flex items-center justify-between text-[11px] font-medium text-gray-500">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold">
                          <i className="fa-solid fa-shield-halved text-[10px]" aria-hidden="true" />
                          <span>50% Tax Relief (80G)</span>
                        </span>
                        <span className="text-[10px] text-amber-800 bg-amber-50 px-1.5 py-0.5 rounded font-bold">18+ Only</span>
                      </div>
                      <Link
                        href={campaign.href}
                        className="btn-wwf-primary !w-full !py-2.5 !px-4 text-xs font-bold uppercase tracking-wider text-center flex items-center justify-center gap-2 shadow-sm hover:shadow transition-all"
                      >
                        <span>Donate Now</span>
                        <i className="fa-solid fa-arrow-right text-[10px]" aria-hidden="true" />
                      </Link>
                    </div>
                  </div>
                </div>
            );
          })}
          </div>
        </div>
      </section>

      {/* Featured Media Strip ("As featured in" from orgDetails.organization_media) */}
      <FeaturedMediaSection
        heading={orgDetails.organization_media?.media_text || "As Featured In"}
        medias={orgDetails.organization_media?.medias || []}
      />

      {/* 1. OUR PARTNERS — minimal logo strip or 4-column quote grid from orgDetails.organization_partners */}
      <OurPartnersSection
        heading={orgDetails.organization_partners?.partners_text || "Our Partners"}
        partners={orgDetails.organization_partners?.partners || []}
      />

      {/* 2. OUR TESTIMONIAL — 4 partner quotes from orgDetails.organization_testimonial */}
      <OurTestimonialSection
        heading="Our Testimonials"
        subtitle={orgDetails.organization_testimonial?.testimonial_text || "What the world thinks about us!"}
        testimonialsList={orgDetails.organization_testimonial?.testimonials || []}
      />

      {/* 3. RECOGNIZED BY — 3 recognitions (CBSE, KVS, NVS) horizontal credential row */}
      <RecognizedBySection />

      {/* 4. WANT TO BE A CHANGEMAKER? — full-width CTA band from orgDetails.want_to_changemaker */}
      <ChangemakerBand />

      {/* 5. IMPACT STORIES — 3,000,000 learners / 100,000 educators & related programmes */}
      <ImpactStoriesSection />
    </div>
  );
}

