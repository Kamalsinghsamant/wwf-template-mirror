/**
 * Campaign Service for fetching dynamic campaign content from Crowdera API
 * with fallback to local Data.json.
 */

import { getPageBySlug } from "@/lib/data";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_URL || "https://devapi.crowdera.com";

/**
 * Fetch campaign details from Crowdera API
 * GET /campaign/:slug
 */
export async function getCampaignDetails(slug) {
  try {
    const res = await fetch(`${API_BASE_URL}/campaign/${slug}`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 }, // ISR cache for 60 seconds
    });

    if (res.ok) {
      const data = await res.json();
      if (data?.data || data?.status === "success") {
        return {
          success: true,
          data: data.data || data,
          isLive: true,
        };
      }
    }
  } catch (err) {
    console.warn(`[campaignService] Live fetch failed for "${slug}":`, err.message);
  }

  // Graceful fallback to verified Data.json page definition
  const fallbackPage = getPageBySlug(slug);

  return {
    success: true,
    data: fallbackPage,
    isFallback: true,
  };
}

/**
 * Fetch organization details
 * GET /organization/:slug
 */
export async function getOrganizationDetails(slug = "wwf-india") {
  try {
    const res = await fetch(`${API_BASE_URL}/organization/${slug}`, {
      method: "GET",
      headers: { Accept: "application/json" },
      next: { revalidate: 300 },
    });

    if (res.ok) {
      const data = await res.json();
      return { success: true, data: data.data || data };
    }
  } catch (err) {
    console.warn(`[campaignService] Organization fetch warning:`, err.message);
  }

  return {
    success: true,
    data: {
      name: "WWF-India",
      slug: "wwf-india",
      currency: "INR",
      min_Ind_donation_amt: 100,
    },
  };
}
