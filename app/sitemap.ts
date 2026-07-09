import type { MetadataRoute } from "next";
import { legalPages, programs } from "@/lib/content";
import { getBaseUrl } from "@/lib/base-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const routes = [
    "",
    "/programs",
    ...programs.map((p) => `/programs/${p.slug}`),
    "/student-success",
    "/about",
    "/about/executive-team",
    "/about/commitment",
    "/about/credentials",
    "/admissions",
    "/contact",
    ...Object.keys(legalPages).map((doc) => `/${doc}`),
  ];
  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route.startsWith("/programs") ? 0.8 : 0.5,
  }));
}
