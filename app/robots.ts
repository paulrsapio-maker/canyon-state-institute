import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/lib/base-url";

export default function robots(): MetadataRoute.Robots {
  const base = getBaseUrl();
  const launched = process.env.SITE_LAUNCHED === "true";

  // Blocked from crawlers until launch sign-off — flip SITE_LAUNCHED=true to open it up.
  if (!launched) {
    return { rules: { userAgent: "*", disallow: "/" } };
  }

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
  };
}
