import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import { FunnelTracker } from "@/components/FunnelTracker";
import { EditBridge } from "@/components/EditBridge";
import { CookieConsent } from "@/components/CookieConsent";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  ...(SITE_URL ? { metadataBase: new URL(SITE_URL) } : {}),
  title: {
    default: "North Leather — Full-Grain Bags Built to Last",
    template: "%s — North Leather",
  },
  description:
    "Full-grain, hand-stitched leather bags built to age beautifully and last a lifetime. One bag. Ten years. No warranty needed.",
  alternates: { canonical: "/" },
  verification: { google: "WlJ66mw7eszwjs5WXh-HAJ_3n22gXQA1yf23ABf0enE" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization`,
        name: "North Leather",
        url: SITE_URL,
        description:
          "North Leather makes full-grain, hand-stitched leather bags built to age beautifully and last a lifetime.",
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: "North Leather",
        url: SITE_URL,
        publisher: { "@id": `${SITE_URL}/#organization` },
      },
    ],
  };

  return (
    <html lang="en" className={mono.variable}>
      <body className="font-sans bg-gallery text-ink">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <FunnelTracker />
        <EditBridge />
        <SmoothScroll>{children}</SmoothScroll>
        <CookieConsent />
      </body>
    </html>
  );
}
