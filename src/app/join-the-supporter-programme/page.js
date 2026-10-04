import CampaignPageTemplate from "@/components/donation/CampaignPageTemplate";

export const metadata = {
  title: "Become a WWF-India Supporter | WWF-India",
  description:
    "Make a one-time donation and become a WWF-India Supporter for up to five years. Receive a supporter kit, quarterly magazine, and 10% shop discount.",
};

export default function SupporterProgrammePage() {
  return <CampaignPageTemplate slug="join-the-supporter-programme" />;
}
