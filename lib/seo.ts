import type { Metadata } from "next";
import { site, type Program } from "./content";
import { getBaseUrl } from "./base-url";

const OG_IMAGE = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: `${site.name} — veteran-owned, career-focused education`,
};

/** Per-page metadata: title template + description + canonical + full OG/Twitter
 *  cards (the title template does not cascade into og/twitter, so compose here). */
export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  const fullTitle = `${title} · ${site.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: fullTitle,
      description,
      url: path,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [OG_IMAGE.url],
    },
  };
}

export function organizationJsonLd() {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "@id": `${base}/#organization`,
    name: site.name,
    url: base,
    logo: `${base}/icon-512.png`,
    image: `${base}/og.jpg`,
    description: site.description,
    slogan: site.tagline,
  };
}

export function webSiteJsonLd() {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${base}/#website`,
    name: site.name,
    url: base,
    publisher: { "@id": `${base}/#organization` },
  };
}

/** Course list for a program page (spec §7: Organization + Course schema).
 *  Generated from lib/content.ts, so it always reflects the published catalog. */
export function programCoursesJsonLd(program: Program) {
  const base = getBaseUrl();
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${program.name} — ${site.name}`,
    itemListElement: program.courses.map((course, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: course.title,
        description: `${course.format} course, ${course.length} — part of ${program.name} at ${site.name}.`,
        provider: { "@id": `${base}/#organization` },
        occupationalCredentialAwarded: course.credential,
        url: `${base}/programs/${program.slug}`,
      },
    })),
  };
}
