// This brand's signature: the "Patina Ledger" exhibit — a scroll-scrubbed,
// museum-label proof strip of ONE real satchel aging ten years, framed as a
// terminal file listing (day_01.jpg … year_10.jpg) instead of a gallery.
// No competitor's product photography could stand in for it.
import { Header } from "@/components/north/Header";
import { Hero } from "@/components/north/Hero";
import { PatinaLedger } from "@/components/north/PatinaLedger";
import { Marquee } from "@/components/north/Marquee";
import { NumbersBand } from "@/components/north/NumbersBand";
import { StepsRail } from "@/components/north/StepsRail";
import { TrustSection } from "@/components/north/TrustSection";
import { CTA } from "@/components/north/CTA";
import { Footer } from "@/components/north/Footer";
import { fetchProducts } from "@/lib/checkout";
import { SITE_URL } from "@/lib/site";

export default async function Home() {
  const products = await fetchProducts();

  const jsonLd =
    products.length > 0
      ? {
          "@context": "https://schema.org",
          "@graph": products.map((p) => ({
            "@type": "Product",
            "@id": `${SITE_URL}/product/${p.id}#product`,
            name: p.name,
            description: p.description || undefined,
            image: p.image_url || undefined,
            url: `${SITE_URL}/product/${p.id}`,
            brand: { "@type": "Brand", name: "North Leather" },
            offers: {
              "@type": "Offer",
              priceCurrency: p.currency || "EUR",
              price: (p.price_cents / 100).toFixed(2),
              availability:
                p.stock === 0
                  ? "https://schema.org/OutOfStock"
                  : "https://schema.org/InStock",
              url: `${SITE_URL}/product/${p.id}`,
            },
          })),
        }
      : null;

  return (
    <>
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      ) : null}
      <Header />
      <Hero />
      <PatinaLedger />
      <Marquee />
      <NumbersBand />
      <StepsRail />
      <TrustSection />
      <CTA />
      <Footer />
    </>
  );
}
