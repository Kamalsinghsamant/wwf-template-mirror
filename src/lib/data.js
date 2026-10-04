import rawData from "../../Data.json";

export const data = rawData;
export const site = rawData.site;
export const globalNavigation = rawData.global_navigation;
export const globalCtas = rawData.global_ctas;
export const pages = rawData.pages;

/**
 * Normalizes URLs to clean Next.js paths.
 * E.g., 'donate-to-wwf-india.php' -> '/donate-to-wwf-india'
 * 'https://donate.wwfindia.org/workplace-giving' -> '/workplace-giving'
 */
export function normalizeHref(href) {
  if (!href) return "/";
  if (href.startsWith("http")) {
    try {
      const url = new URL(href);
      let path = url.pathname;
      if (path.endsWith(".php")) {
        path = path.slice(0, -4);
      }
      return path || "/";
    } catch {
      return href;
    }
  }
  let path = href.startsWith("/") ? href : `/${href}`;
  if (path.endsWith(".php")) {
    path = path.slice(0, -4);
  }
  return path;
}

// Pre-index pages into Map for O(1) instantaneous slug resolution
const slugToPageMap = new Map();
slugToPageMap.set("home", pages[0]);
slugToPageMap.set("", pages[0]);
slugToPageMap.set("workplace-giving", pages[1]);
pages.forEach((p) => {
  const pSlug = normalizeHref(p.url).replace(/^\//, "");
  if (pSlug) {
    slugToPageMap.set(pSlug, p);
  }
});

// Support response.json camDetails slugs and aliases
const rhinoPage = {
  title: "World Rhino Day: Home for the One-Horned",
  url: "/rhino-day-fundraiser",
  sections: [
    {
      type: "text",
      heading: "Conserving the Greater One-Horned Rhino",
      content:
        "Celebrate World Rhino Day by donating to WWF-India's work protecting the greater one-horned rhino from poaching and habitat loss. Through habitat restoration, anti-poaching patrols, and community engagement, WWF-India is working to ensure that this iconic giant thrives across its grassland strongholds.",
    },
    {
      type: "list",
      heading: "Your support will help WWF-India:",
      items: [
        "Equip frontline forest rangers with surveillance gear and anti-poaching patrol kits",
        "Restore and reconnect degraded grassland corridors between Kaziranga, Manas, and Orang",
        "Support rapid rescue units and veterinary emergency care for orphaned rhino calves",
        "Strengthen intelligence-led wildlife crime networks against illegal horn trafficking",
      ],
    },
  ],
};
slugToPageMap.set("rhino-day-fundraiser", rhinoPage);
slugToPageMap.set("donate-to-wwfindia", pages[2]);
slugToPageMap.set("become-a-wwfindia-support", pages[3]);
slugToPageMap.set("double-your-donation-for-indias-tigers", pages[8]);

export function getHomePage() {
  return pages[0];
}

export function getWorkplaceGivingPage() {
  return pages[1];
}

export function getPageBySlug(slug) {
  if (!slug) return pages[0];
  const cleanSlug = slug.replace(/^\//, "").replace(/\.php$/, "");
  return slugToPageMap.get(cleanSlug) || null;
}

export function getCampaignPages() {
  return pages.slice(2);
}

// Campaign visual assets, official WWF images & impact bullets mapping
export const campaignVisuals = {
  "donate-to-wwf-india": {
    badge: "General Conservation Fund",
    tagline: "Building a future where humans live in harmony with nature",
    bannerImage: "/images/wwf-india.jpg",
    icon: "fa-solid fa-earth-americas",
    accentColor: "#f38e43",
    bgPattern: "wildlife",
    suggestedAmounts: [
      { amount: 500, label: "Supporter", impact: "Provides basic field rations for frontline forest watchers" },
      { amount: 1000, label: "Guardian", impact: "Supports native sapling planting and local community nurseries" },
      { amount: 2500, label: "Protector", impact: "Helps maintain solar fences mitigating human-wildlife conflict" },
      { amount: 5000, label: "Champion", impact: "Contributes to camera trap installations in critical corridors" },
    ],
    itemIcons: [
      "/images/icons/conflict.png",
      "/images/icons/poaching.png",
      "/images/icons/awareness.png",
      "/images/icons/aquatic.png",
      "/images/icons/plastic.png",
      "/images/icons/conflict.png",
      "/images/icons/research.png"
    ]
  },
  "join-the-supporter-programme": {
    badge: "Membership Programme",
    tagline: "Become a WWF-India Supporter for lasting conservation impact",
    bannerImage: "/images/supporter.webp",
    icon: "fa-solid fa-id-card",
    accentColor: "#2d5a27",
    suggestedAmounts: [
      { amount: 1500, label: "1-Year Supporter", impact: "Supporter kit + 4 quarterly magazines + 10% merchandise discount" },
      { amount: 3000, label: "2-Year Supporter", impact: "Extended membership pack + webinar invites + conservation certificate" },
      { amount: 5000, label: "3-Year Guardian", impact: "Full supporter benefits + priority access to conservation workshops" },
      { amount: 10000, label: "5-Year Champion", impact: "Lifetime community status + exclusive wildlife calendar and pin" },
    ],
    itemIcons: [
      "/images/icons/education.png",
      "/images/icons/awareness.png",
      "/images/icons/training.png",
      "/images/icons/research.png"
    ]
  },
  "save-wildlife-from-extinction": {
    badge: "Endangered Species Protection",
    tagline: "Defending India's most vulnerable species and their native habitats",
    bannerImage: "/images/save-wildlife.webp",
    icon: "fa-solid fa-paw",
    accentColor: "#ea580c",
    suggestedAmounts: [
      { amount: 750, label: "Wild Supporter", impact: "Contributes to GPS collars and radio telemetry monitoring" },
      { amount: 1500, label: "Habitat Shield", impact: "Funds 1 km corridor surveillance against illegal snares" },
      { amount: 3000, label: "Species Defender", impact: "Equips anti-poaching patrols with night-vision kits" },
      { amount: 7500, label: "Wildlife Champion", impact: "Sponsors community rapid response squads for one month" },
    ],
    itemIcons: [
      "/images/icons/conflict.png",
      "/images/icons/research.png",
      "/images/icons/training.png",
      "/images/icons/conflict.png",
      "/images/icons/poaching.png"
    ]
  },
  "fight-climate-change": {
    badge: "Climate Resilience & Sinks",
    tagline: "Tackling global warming through natural climate solutions",
    bannerImage: "/images/climate.png",
    icon: "fa-solid fa-temperature-arrow-up",
    accentColor: "#0d9488",
    suggestedAmounts: [
      { amount: 800, label: "Mangrove Sapling", impact: "Plants and nurtures 20 mangrove saplings in coastal belts" },
      { amount: 1600, label: "Wetland Restorer", impact: "Funds silt-removal tools for freshwater carbon sinks" },
      { amount: 3500, label: "Clean Energy", impact: "Supports solar micro-grid training in fringe villages" },
      { amount: 8000, label: "Climate Leader", impact: "Funds community climate vulnerability assessment in high-risk zones" },
    ],
    itemIcons: [
      "/images/icons/aquatic.png",
      "/images/icons/plastic.png",
      "/images/icons/training.png",
      "/images/icons/awareness.png",
      "/images/icons/aquatic.png",
      "/images/icons/plastic.png"
    ]
  },
  "support-sniffer-dog-programme": {
    badge: "Wildlife Crime Prevention Squad",
    tagline: "Super-sniffers on the frontline fighting illegal wildlife trafficking",
    bannerImage: "/images/sniffer-dog.png",
    icon: "fa-solid fa-dog",
    accentColor: "#f38e43",
    suggestedAmounts: [
      { amount: 1000, label: "Canine Care", impact: "Provides specialized nutrition and veterinary checks for 1 dog" },
      { amount: 2500, label: "Sniffer Gear", impact: "Provides training dummies, harnesses, and handler equipment" },
      { amount: 5000, label: "Detector Squad", impact: "Contributes to Deep Search Metal Detectors for finding poacher traps" },
      { amount: 12000, label: "Squad Sponsor", impact: "Funds month-long advanced scent-detection training for canine squad" },
    ],
    itemIcons: [
      "/images/icons/sniffer-dogs.png",
      "/images/icons/training.png",
      "/images/icons/metal-detectors.png",
      "/images/icons/forensic-kit.png",
      "/images/icons/awareness.png"
    ]
  },
  "support-water-conservation": {
    badge: "Freshwater & Wetland Conservation",
    tagline: "Revitalizing rivers, lakes, and aquifers for millions of lives",
    bannerImage: "/images/swc.png",
    icon: "fa-solid fa-droplet",
    accentColor: "#0284c7",
    suggestedAmounts: [
      { amount: 600, label: "Water Steward", impact: "Funds water-testing kits for local community Water Mitras" },
      { amount: 1500, label: "Wetland Reviver", impact: "Restores natural water recharge channels in peri-urban wetlands" },
      { amount: 3000, label: "River Dolphin Guard", impact: "Supports acoustic monitoring for endangered Ganges river dolphins" },
      { amount: 7500, label: "Water School", impact: "Funds water conservation curriculum across 5 rural schools" },
    ],
    itemIcons: [
      "/images/icons/aquatic.png",
      "/images/icons/aquatic.png",
      "/images/icons/aquatic.png",
      "/images/icons/training.png",
      "/images/icons/education.png"
    ]
  },
  "protect-our-tigers": {
    badge: "Tiger Reserve Conservation",
    tagline: "Guarding India's national animal across 20+ tiger reserves",
    bannerImage: "/images/ti.webp",
    icon: "fa-solid fa-shield-cat",
    accentColor: "#f97316",
    suggestedAmounts: [
      { amount: 750, label: "Bagh Mitra", impact: "Equips local volunteer alert squads tracking tiger movements" },
      { amount: 1800, label: "Corridor Keeper", impact: "Maintains wildlife passage signage and solar lights in farm edges" },
      { amount: 4000, label: "Interim Relief Fund", impact: "Contributes to rapid compensation for cattle loss to prevent retaliatory kills" },
      { amount: 10000, label: "Apex Protector", impact: "Sponsors high-resolution camera trap deployment in sensitive corridors" },
    ],
    itemIcons: [
      "/images/icons/tiger.png",
      "/images/icons/conflict.png",
      "/images/icons/conflict.png",
      "/images/icons/research.png",
      "/images/icons/poaching.png"
    ]
  },
  "double-your-donation-for-indias-tigers": {
    badge: "1:1 Matching Gift",
    tagline: "Every donation doubled until the ₹20,60,000 matching fund is exhausted",
    bannerImage: "https://crowdera-platform.s3.ap-south-1.amazonaws.com/CDRA/campaign-assets/a61efc98-12ae-4a72-aa2e-31d609e54d25_original_doubletiger.png",
    icon: "fa-solid fa-shield-cat",
    accentColor: "#f97316",
    suggestedAmounts: [
      { amount: 1000, label: "Double Impact", impact: "Provides ₹2,000 equivalent for anti-poaching patrols" },
      { amount: 2500, label: "Corridor Guardian", impact: "Provides ₹5,000 equivalent for wildlife monitoring & early warning" },
      { amount: 5000, label: "Bagh Protector", impact: "Provides ₹10,000 equivalent for Bagh Mitra community units" },
      { amount: 10000, label: "Apex Champion", impact: "Provides ₹20,000 equivalent for camera trap arrays & patrol gear" },
    ],
    itemIcons: [
      "/images/icons/tiger.png",
      "/images/icons/conflict.png",
      "/images/icons/conflict.png",
      "/images/icons/research.png",
      "/images/icons/poaching.png"
    ]
  },
  "save-snow-leopard": {
    badge: "High Altitude Himalayas",
    tagline: "Protecting the ghost of the mountains in fragile Himalayan heights",
    bannerImage: "/images/sl.webp",
    icon: "fa-solid fa-mountain",
    accentColor: "#38bdf8",
    suggestedAmounts: [
      { amount: 1000, label: "Mountain Scout", impact: "Provides sub-zero winter gear for high-altitude survey teams" },
      { amount: 2500, label: "Predator-Proof Corral", impact: "Contributes to building reinforced livestock pens for local pastoralists" },
      { amount: 5500, label: "Satellite Collar", impact: "Supports non-invasive genetic tracking and camera monitoring" },
      { amount: 12500, label: "Himalayan Guardian", impact: "Sponsors long-term coexistence program with Changpa and Ladakhi communities" },
    ],
    itemIcons: [
      "/images/icons/snow-leopard.png",
      "/images/icons/research.png",
      "/images/icons/conflict.png",
      "/images/icons/awareness.png",
      "/images/icons/poaching.png"
    ]
  },
  "rhino-day-fundraiser": {
    badge: "Greater One-Horned Rhino",
    tagline: "Protecting the greater one-horned rhino from poaching and habitat loss",
    bannerImage: "https://crowdera-platform.s3.ap-south-1.amazonaws.com/CDRA/campaign-assets/270ac639-ff0f-4565-8118-99720461df02_original_shutterstock_rhino_64832.webp",
    icon: "fa-solid fa-shield",
    accentColor: "#f59e0b",
    suggestedAmounts: [
      { amount: 1000, label: "Rhino Scout", impact: "Equips anti-poaching squads in Kaziranga & Manas" },
      { amount: 2500, label: "Habitat Restorer", impact: "Helps restore degraded grassland corridors" },
      { amount: 5000, label: "Field Surveillance", impact: "Supports thermal imaging and patrol equipment" },
      { amount: 10000, label: "Rhino Guardian", impact: "Funds community vigilance and emergency rescue units" },
    ],
    itemIcons: [
      "/images/icons/research.png",
      "/images/icons/aquatic.png",
      "/images/icons/poaching.png",
      "/images/icons/awareness.png"
    ]
  },
};
