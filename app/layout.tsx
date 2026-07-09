import type { Metadata, Viewport } from "next";
import { Source_Serif_4, Source_Sans_3 } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { site } from "@/lib/content";
import { getBaseUrl } from "@/lib/base-url";
import { organizationJsonLd, webSiteJsonLd } from "@/lib/seo";
import JsonLd from "@/components/JsonLd";
import "./globals.css";

const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const launched = process.env.SITE_LAUNCHED === "true";

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: {
    default: `${site.name} — Career-Focused Education`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    siteName: site.name,
    title: `${site.name} — Career-Focused Education`,
    description: site.description,
    type: "website",
    locale: "en_US",
    url: "/",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${site.name} — veteran-owned, career-focused education`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Career-Focused Education`,
    description: site.description,
    images: ["/og.jpg"],
  },
  // Kept off search engines until launch approval — see CONTENT-REVIEW.md
  robots: launched ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#7a2e0e",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${sourceSerif.variable} ${sourceSans.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <JsonLd data={organizationJsonLd()} />
        <JsonLd data={webSiteJsonLd()} />
        <a
          href="#main"
          className="sr-only z-[100] rounded-lg bg-canyon px-4 py-3 font-semibold text-warm focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
