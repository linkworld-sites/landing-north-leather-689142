import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CartProvider } from "@/components/CartContext";
import { fetchProducts, formatPrice } from "@/lib/checkout";
import { SITE_URL } from "@/lib/site";
import { ProductActions } from "./ProductActions";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const products = await fetchProducts();
  const product = products.find((p) => p.id === id);
  if (!product) return {};
  return {
    title: `${product.name} — North Leather`,
    description: product.description || `${product.name} — full-grain leather, ${formatPrice(product.price_cents, product.currency)}.`,
    alternates: { canonical: `/product/${product.id}` },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await fetchProducts();
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description || undefined,
    image: product.image_url || undefined,
    url: `${SITE_URL}/product/${product.id}`,
    offers: {
      "@type": "Offer",
      priceCurrency: product.currency || "EUR",
      price: (product.price_cents / 100).toFixed(2),
      availability:
        product.stock === 0
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${SITE_URL}/product/${product.id}`,
    },
  };

  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-4xl">
        <Link
          href="/shop"
          className="text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink"
        >
          ← Shop
        </Link>
        <div className="mt-10 grid gap-12 md:grid-cols-2 md:items-center">
          <div className="aspect-[4/5] w-full overflow-hidden rounded-lg bg-wall">
            {product.image_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-ink/30">
                <span className="font-display text-2xl">{product.name}</span>
              </div>
            )}
          </div>
          <div>
            <h1 className="font-display text-[2.25rem] font-light leading-tight text-ink md:text-[2.75rem]">
              {product.name}
            </h1>
            <p className="mt-3 text-lg tabular-nums text-ink/70">
              {formatPrice(product.price_cents, product.currency)}
            </p>
            {product.description ? (
              <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60">
                {product.description}
              </p>
            ) : null}
            <CartProvider>
              <ProductActions product={product} />
            </CartProvider>
          </div>
        </div>
      </div>
    </main>
  );
}
