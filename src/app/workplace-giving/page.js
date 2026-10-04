import Hero from "@/components/ui/Hero";
import StatsSection from "@/components/workplace/StatsSection";
import BenefitsSection from "@/components/workplace/BenefitsSection";
import WhyAssociateSection from "@/components/workplace/WhyAssociateSection";
import OfferingsSection from "@/components/workplace/OfferingsSection";
import FaqAccordion from "@/components/workplace/FaqAccordion";
import DonationForm from "@/components/donation/DonationForm";
import AgeEligibilityNotice from "@/components/donation/AgeEligibilityNotice";
import { getWorkplaceGivingPage } from "@/lib/data";

export const metadata = {
  title: "Workplace Giving Program | WWF India",
  description:
    "Create a lasting impact for the planet through your workplace. 50% Tax Relief under Section 80G.",
};

export default function WorkplaceGivingPage() {
  const wpData = getWorkplaceGivingPage();
  const heroSection = wpData.sections[0];
  const statsSection = wpData.sections[1];
  const whatIsSection = wpData.sections[2];
  const benefitsSection = wpData.sections[3];
  const whySection = wpData.sections[4];
  const offeringsSection = wpData.sections[5];
  const faqSection = wpData.sections[6];
  const form0 = wpData.forms[0];

  return (
    <div className="space-y-0 bg-white">
      {/* Authentic Workplace Giving Header Image from Data.json Assets */}
      <Hero
        heading={heroSection.heading}
        subheading={heroSection.subheading}
        cta={{ text: "Donate Now", href: "#workplace-form" }}
        badge="Workplace Giving Program"
        variant="workplace"
        bannerImage="/workplace-giving/images/home.jpg"
      />

      {/* Stats Section from Data.json Page 1 section 1 */}
      <StatsSection items={statsSection?.items || []} />

      {/* What Is Workplace Giving Section from Data.json Page 1 section 2 with Authentic Image j-t-g.jpg */}
      <section className="py-14 sm:py-20 bg-white border-b border-gray-100" aria-labelledby="what-is-heading">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            {/* Left Column: Text Content from Data.json */}
            <div className="lg:col-span-7 space-y-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider block">
                About The Initiative
              </span>
              <h2
                id="what-is-heading"
                className="text-2xl sm:text-4xl font-black text-black uppercase tracking-tight"
              >
                {whatIsSection?.heading || "What Is Workplace Giving?"}
              </h2>
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
                {whatIsSection?.content}
              </p>
              
              <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-gray-700">
                <div className="flex items-center gap-2 bg-[#f8f8f8] px-3.5 py-2 rounded border border-gray-200">
                  <i className="fa-solid fa-users text-black" aria-hidden="true" />
                  <span>Employee Engagement</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8f8f8] px-3.5 py-2 rounded border border-gray-200">
                  <i className="fa-solid fa-hand-holding-heart text-black" aria-hidden="true" />
                  <span>Corporate Matching</span>
                </div>
                <div className="flex items-center gap-2 bg-[#f8f8f8] px-3.5 py-2 rounded border border-gray-200">
                  <i className="fa-solid fa-seedling text-black" aria-hidden="true" />
                  <span>On-ground Volunteering</span>
                </div>
              </div>
            </div>

            {/* Right Column: Authentic Workplace Giving Activity Photo j-t-g.jpg */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-black group">
                <img
                  src="/workplace-giving/images/j-t-g.jpg"
                  alt="WWF-India Workplace Engagement Activity"
                  className="w-full h-80 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-medium">
                  <span className="font-bold">WWF-India Workplace Engagement</span> &bull; Hands-on Corporate Conservation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section from Data.json Page 1 section 3 */}
      <BenefitsSection
        heading={benefitsSection?.heading}
        items={benefitsSection?.items || []}
      />

      {/* Why Associate with WWF-India Section with Counter SVGs from Data.json Page 1 section 4 */}
      <WhyAssociateSection
        heading={whySection?.heading}
        content={whySection?.content}
        counters={whySection?.counters || []}
      />

      {/* Offerings Section with Authentic Images from Data.json Page 1 section 5 */}
      <OfferingsSection
        heading={offeringsSection?.heading}
        items={offeringsSection?.items || []}
      />

      {/* Dedicated Workplace Donation Form Section from Data.json Page 1 form 0 */}
      <section id="workplace-form" className="py-16 sm:py-20 bg-[#f8f8f8] border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
              Workplace Enrollment
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-black mt-1 uppercase">
              {form0?.title || "LEADERS FOR CHANGE"}
            </h2>
            <p className="mt-1.5 text-xs text-gray-600 max-w-lg mx-auto">
              Select your contribution tier to support conservation projects directly through your workplace.
            </p>
          </div>

          <DonationForm
            title={form0?.title || "LEADERS FOR CHANGE"}
            campaignName="Workplace Giving Program"
            isWorkplace={true}
          />

          {/* Age Eligibility & 80G Tax Exemption Note */}
          <AgeEligibilityNotice className="mt-4 !bg-white" />
        </div>
      </section>

      {/* FAQ Accordion Section from Data.json Page 1 section 6 */}
      <FaqAccordion
        heading={faqSection?.heading || "FAQ's"}
        items={faqSection?.items || []}
      />
    </div>
  );
}
