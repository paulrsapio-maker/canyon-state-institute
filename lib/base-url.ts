import { site } from "./content";

/** Canonical origin for metadata/sitemap/robots — real domain once launched,
 *  Vercel URL for shareable previews, spec placeholder locally. */
export function getBaseUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  const vercel =
    process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
  if (vercel) return `https://${vercel}`;
  return site.url;
}
