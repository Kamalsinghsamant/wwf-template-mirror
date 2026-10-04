/**
 * Authentic Campaign Donation Form Presets
 * Extracted directly from live WWF India donation platforms (https://donate.wwfindia.org)
 */

export const CAMPAIGN_PRESETS = {
  // 1. Supporter Programme
  "join-the-supporter-programme": {
    title: "BECOME A WWF-INDIA SUPPORTER",
    subtitle: "Join our core conservation supporter network",
    frequencies: ["Multi-Year", "Monthly"],
    defaultFrequency: "Multi-Year",
    amounts: {
      "Multi-Year": [
        { label: "1 YEAR", amount: 4000, desc: "Supporter Kit & Quarterly Pack" },
        { label: "2 YEARS", amount: 7000, desc: "Extended Conservation Pack" },
        { label: "3 YEARS", amount: 9000, desc: "Multi-Year Impact Partner" },
        { label: "5 YEARS", amount: 15000, desc: "Premier 5-Year Guardian", popular: true },
      ],
      Monthly: [
        { label: "SUPPORTER", amount: 750, desc: "Monthly Supporter Partner" },
        { label: "HERO", amount: 1500, desc: "Equips wildlife patrol", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Restores vital habitat" },
      ],
    },
  },

  // 2. Workplace Giving
  "workplace-giving": {
    title: "LEADERS FOR CHANGE",
    subtitle: "Bringing nature closer to your workplace",
    frequencies: ["Monthly", "Annual"],
    defaultFrequency: "Monthly",
    amounts: {
      Monthly: [
        { label: "SUPPORTER", amount: 750, desc: "Maintains field nursery" },
        { label: "HERO", amount: 1250, desc: "Equips anti-poaching watcher", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Restores vital habitat" },
      ],
      Annual: [
        { label: "SUPPORTER", amount: 9000, desc: "Annual wetland support" },
        { label: "HERO", amount: 15000, desc: "Annual wildlife monitoring", popular: true },
        { label: "CHAMPION", amount: 24000, desc: "Community tiger defense" },
      ],
    },
  },
  "leaders-for-change": {
    title: "LEADERS FOR CHANGE",
    subtitle: "Workplace conservation leadership",
    frequencies: ["Monthly", "Annual"],
    defaultFrequency: "Monthly",
    amounts: {
      Monthly: [
        { label: "SUPPORTER", amount: 750, desc: "Maintains field nursery" },
        { label: "HERO", amount: 1250, desc: "Equips anti-poaching watcher", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Restores vital habitat" },
      ],
      Annual: [
        { label: "SUPPORTER", amount: 9000, desc: "Annual wetland support" },
        { label: "HERO", amount: 15000, desc: "Annual wildlife monitoring", popular: true },
        { label: "CHAMPION", amount: 24000, desc: "Community tiger defense" },
      ],
    },
  },

  // 3. Protect Our Tigers
  "protect-our-tigers": {
    title: "SAVE OUR TIGERS",
    subtitle: "Protect India's national animal and apex predator",
    frequencies: ["One-time", "Monthly"],
    defaultFrequency: "One-time",
    amounts: {
      "One-time": [
        { label: "DEFENDER", amount: 5000, desc: "Camera trap deployment" },
        { label: "PROTECTOR", amount: 10000, desc: "Anti-poaching patrol gear", popular: true },
        { label: "GUARDIAN", amount: 25000, desc: "Tiger corridor protection" },
      ],
      Monthly: [
        { label: "FRIEND", amount: 750, desc: "Community early-warning alert" },
        { label: "HERO", amount: 1500, desc: "Anti-poaching watcher rations", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Habitat & prey monitoring" },
      ],
    },
  },

  // 4. Save Snow Leopard
  "save-snow-leopard": {
    title: "PROTECT SNOW LEOPARDS",
    subtitle: "Conserve the ghost of the high Himalayas",
    frequencies: ["One-time", "Monthly"],
    defaultFrequency: "One-time",
    amounts: {
      "One-time": [
        { label: "DEFENDER", amount: 5000, desc: "Predator-proof corral upgrade" },
        { label: "PROTECTOR", amount: 10000, desc: "High-altitude thermal trap", popular: true },
        { label: "GUARDIAN", amount: 25000, desc: "Himalayan community defense" },
      ],
      Monthly: [
        { label: "FRIEND", amount: 750, desc: "Local pastoralist insurance" },
        { label: "HERO", amount: 1500, desc: "Snow leopard tracking survey", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "High altitude biodiversity watch" },
      ],
    },
  },

  // 5. Sniffer Dog Programme
  "support-sniffer-dog-programme": {
    title: "SUPER SNIFFER PROGRAMME",
    subtitle: "Train and deploy sniffer dogs to combat wildlife crime",
    frequencies: ["One-time", "Monthly"],
    defaultFrequency: "One-time",
    amounts: {
      "One-time": [
        { label: "DEFENDER", amount: 5000, desc: "Canine veterinary medical kit" },
        { label: "PROTECTOR", amount: 10000, desc: "Specialized training equipment", popular: true },
        { label: "GUARDIAN", amount: 25000, desc: "K9 anti-smuggling deployment" },
      ],
      Monthly: [
        { label: "FRIEND", amount: 750, desc: "Nutritional diet supply" },
        { label: "HERO", amount: 1500, desc: "Handler field gear & health check", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Canine anti-poaching patrol" },
      ],
    },
  },

  // 6. Support Water Conservation
  "support-water-conservation": {
    title: "SUPPORT WATER CONSERVATION",
    subtitle: "Revive freshwater basins and critical wetlands",
    frequencies: ["One-time", "Monthly"],
    defaultFrequency: "One-time",
    amounts: {
      "One-time": [
        { label: "DEFENDER", amount: 5000, desc: "Riparian bank restoration" },
        { label: "PROTECTOR", amount: 10000, desc: "Freshwater flow sensor", popular: true },
        { label: "GUARDIAN", amount: 25000, desc: "River basin community wetland" },
      ],
      Monthly: [
        { label: "FRIEND", amount: 750, desc: "Wetland cleanliness drive" },
        { label: "HERO", amount: 1500, desc: "Water quality test kit", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Freshwater dolphin protection" },
      ],
    },
  },

  // 7. Fight Climate Change
  "fight-climate-change": {
    title: "FIGHT CLIMATE CHANGE",
    subtitle: "Build ecological resilience against climate extremes",
    frequencies: ["One-time", "Monthly"],
    defaultFrequency: "One-time",
    amounts: {
      "One-time": [
        { label: "DEFENDER", amount: 5000, desc: "Community resilience workshop" },
        { label: "PROTECTOR", amount: 10000, desc: "Mangrove carbon sink planting", popular: true },
        { label: "GUARDIAN", amount: 25000, desc: "Renewable solar microgrid" },
      ],
      Monthly: [
        { label: "FRIEND", amount: 750, desc: "Youth climate initiative" },
        { label: "HERO", amount: 1500, desc: "Ecosystem carbon monitoring", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Climate adaptation programme" },
      ],
    },
  },

  // 8. Save Wildlife from Extinction
  "save-wildlife-from-extinction": {
    title: "SAVE WILDLIFE FROM EXTINCTION",
    subtitle: "Secure endangered species across India",
    frequencies: ["One-time", "Monthly"],
    defaultFrequency: "One-time",
    amounts: {
      "One-time": [
        { label: "DEFENDER", amount: 5000, desc: "Veterinary rescue supplies" },
        { label: "PROTECTOR", amount: 10000, desc: "Anti-poaching patrol setup", popular: true },
        { label: "GUARDIAN", amount: 25000, desc: "Corridor connectivity project" },
      ],
      Monthly: [
        { label: "FRIEND", amount: 750, desc: "Forest corridor patrol" },
        { label: "HERO", amount: 1500, desc: "Ranger field survival gear", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Endangered rhino protection" },
      ],
    },
  },

  // 9. General / Donate to WWF-India & Home
  "donate-to-wwf-india": {
    title: "DONATE TO WWF-INDIA",
    subtitle: "Support our nationwide conservation mission",
    frequencies: ["One-time", "Monthly"],
    defaultFrequency: "One-time",
    amounts: {
      "One-time": [
        { label: "SUPPORTER", amount: 5000, desc: "General conservation fund" },
        { label: "HERO", amount: 10000, desc: "Equips wildlife frontliners", popular: true },
        { label: "CHAMPION", amount: 25000, desc: "Vital ecosystem restoration" },
      ],
      Monthly: [
        { label: "SUPPORTER", amount: 750, desc: "Sustaining field operations" },
        { label: "HERO", amount: 1500, desc: "Equips wildlife watcher", popular: true },
        { label: "CHAMPION", amount: 2000, desc: "Species recovery support" },
      ],
    },
  },
};

/**
 * Returns the matching campaign configuration or defaults to general donation
 */
export function getCampaignFormConfig(slugOrTitle = "") {
  if (!slugOrTitle) {
    return CAMPAIGN_PRESETS["donate-to-wwf-india"];
  }

  const clean = slugOrTitle
    .toLowerCase()
    .replace(/^(\/|#)/, "")
    .replace(/\.php$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Direct match
  if (CAMPAIGN_PRESETS[clean]) {
    return CAMPAIGN_PRESETS[clean];
  }

  // Partial match by key
  for (const [key, config] of Object.entries(CAMPAIGN_PRESETS)) {
    if (clean.includes(key) || key.includes(clean)) {
      return config;
    }
  }

  // Default to general donation
  return CAMPAIGN_PRESETS["donate-to-wwf-india"];
}
