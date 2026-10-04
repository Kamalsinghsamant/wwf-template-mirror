import CampaignPageTemplate from "@/components/donation/CampaignPageTemplate";

export const metadata = {
  title: "World Rhino Day: Home for the One-Horned | WWF India",
  description:
    "Celebrate World Rhino Day by donating to WWF-India's work protecting the greater one-horned rhino from poaching and habitat loss.",
};

export default function RhinoDayPage() {
  return <CampaignPageTemplate slug="rhino-day-fundraiser" />;
}
