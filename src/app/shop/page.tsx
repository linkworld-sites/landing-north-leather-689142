import Link from "next/link";
import { CartProvider } from "@/components/CartContext";
import ShopClient from "@/components/ShopClient";
import { fetchProducts, formatPrice } from "@/lib/checkout";

export const metadata = {
  title: "Shop — North Leather",
  description: "Full-grain leather bags built to age beautifully and last a lifetime.",
  alternates: { canonical: "/shop" },
};

export default async function ShopPage() {
  const products = await fetchProducts();

  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink"
        >
          ← Home
        </Link>
        <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ink/50">North Leather</p>
        <h1 className="mt-4 font-display text-[2.75rem] font-light leading-tight text-ink md:text-[3.5rem]">
          Shop
        </h1>
        <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink/60">
          Bags built to earn their character. Each piece is cut from full-grain
          leather and hand-stitched to be carried for years, not seasons.
        </p>

        {products.length === 0 ? (
          <p className="mt-16 text-ink/60">
            The shop is being restocked — check back shortly.
          </p>
        ) : (
          <>
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-2 border-t border-hairline/50 pt-6 text-[13px]">
              {products.map((p) => (
                <Link
                  key={p.id}
                  href={`/product/${p.id}`}
                  className="text-ink/70 underline decoration-hairline underline-offset-4 hover:text-ink"
                >
                  {p.name} — {formatPrice(p.price_cents, p.currency)}
                </Link>
              ))}
            </div>

            <div className="mt-16">
              <CartProvider>
                <ShopClient products={products} />
              </CartProvider>
            </div>

            <p className="mt-16">
              <Link
                href="/checkout"
                className="text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink"
              >
                Go to checkout →
              </Link>
            </p>
          </>
        )}
      </div>
    </main>
  );
}
