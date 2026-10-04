/**
 * Organization Service
 * Fetches organization, campaigns (camDetails), testimonials, and theme content
 * from the endpoint:
 *   http://localhost:8080/organization/details/<domain-name>
 * with automatic fallback to response.json.
 */

import fallbackResponse from "../../response.json";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_URL || "http://localhost:8080";
const DEFAULT_DOMAIN = "join.wwfindia.org";

function normalizeOrgData(data) {
  if (!data) return fallbackResponse.data;

  // If already structured with orgDetails, camDetails, etc. (like response.json)
  if (data.orgDetails && data.themeDetails) {
    return {
      orgDetails: data.orgDetails,
      camDetails: Array.isArray(data.camDetails) && data.camDetails.length > 0
        ? data.camDetails
        : fallbackResponse.data.camDetails,
      themeDetails: data.themeDetails || fallbackResponse.data.themeDetails,
      formattedEvents: data.formattedEvents || fallbackResponse.data.formattedEvents || [],
    };
  }

  // If returned directly as the organization document (from live /organization/details/:url)
  return {
    orgDetails: {
      ...fallbackResponse.data.orgDetails,
      ...data,
      organization_name: data.organization_name || fallbackResponse.data.orgDetails.organization_name,
      organization_logo: data.organization_logo || fallbackResponse.data.orgDetails.organization_logo,
      organization_about: data.organization_about || fallbackResponse.data.orgDetails.organization_about,
      organization_header_images_v2: Array.isArray(data.organization_header_images_v2) && data.organization_header_images_v2.length > 0
        ? data.organization_header_images_v2
        : fallbackResponse.data.orgDetails.organization_header_images_v2,
      organization_testimonial: data.organization_testimonial || fallbackResponse.data.orgDetails.organization_testimonial,
      organization_partners: data.organization_partners || fallbackResponse.data.orgDetails.organization_partners,
      organization_media: data.organization_media || fallbackResponse.data.orgDetails.organization_media,
    },
    camDetails: Array.isArray(data.camDetails) && data.camDetails.length > 0
      ? data.camDetails
      : fallbackResponse.data.camDetails,
    themeDetails: data.themeDetails || fallbackResponse.data.themeDetails,
    formattedEvents: data.formattedEvents || fallbackResponse.data.formattedEvents || [],
  };
}

/**
 * Fetch organization data dynamically based on domain from the endpoint:
 *   http://localhost:8080/organization/details/<domain-name>
 * @param {string} domain - Host domain name (e.g. "join.wwfindia.org" or dynamic host)
 */
export async function getOrganizationData(domain = DEFAULT_DOMAIN) {
  const targetDomain = domain || DEFAULT_DOMAIN;

  // 1. Try specified host-domain first
  try {
    const url = `${API_BASE_URL}/organization/details/${encodeURIComponent(targetDomain)}`;
    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });

    if (res.ok) {
      const json = await res.json();
      if (json?.status === "success" && json?.data) {
        return {
          success: true,
          isLive: true,
          domain: targetDomain,
          data: normalizeOrgData(json.data),
        };
      }
    }
  } catch (err) {
    // Continue to fallback lookup
  }

  // 2. Try default organization slug if different from targetDomain
  if (targetDomain !== "world-wide-fund-for-nature--india") {
    try {
      const fallbackUrl = `${API_BASE_URL}/organization/details/world-wide-fund-for-nature--india`;
      const res = await fetch(fallbackUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        next: { revalidate: 60 },
      });

      if (res.ok) {
        const json = await res.json();
        if (json?.status === "success" && json?.data) {
          return {
            success: true,
            isLive: true,
            domain: "world-wide-fund-for-nature--india",
            data: normalizeOrgData(json.data),
          };
        }
      }
    } catch (err) {
      // Continue to bundled fallback
    }
  }

  // 3. Fallback to bundled response.json
  return {
    success: true,
    isFallback: true,
    domain: targetDomain,
    data: fallbackResponse.data,
  };
}

/**
 * Synchronous getter for default response data (useful for static props and SSR initial state)
 */
export function getDefaultOrganizationData() {
  return fallbackResponse.data;
}

/**
 * Map campaign slugs to the appropriate internal route
 */
export function mapCampaignSlugToHref(slug) {
  if (!slug) return "/donate-to-wwf-india";
  const clean = slug.toLowerCase().trim();

  const slugMap = {
    "donate-to-wwfindia": "/donate-to-wwf-india",
    "become-a-wwfindia-support": "/join-the-supporter-programme",
    "sniffer-dog-programme": "/support-sniffer-dog-programme",
    "double-your-donation-for-indias-tigers": "/protect-our-tigers",
    "protect-our-tigers": "/protect-our-tigers",
    "fight-climate-change": "/fight-climate-change",
    "support-water-conservation": "/support-water-conservation",
    "save-wildlife-from-extinction": "/save-wildlife-from-extinction",
    "save-snow-leopard": "/save-snow-leopard",
    "rhino-day-fundraiser": "/rhino-day-fundraiser",
  };

  return slugMap[clean] || `/${clean}`;
}
