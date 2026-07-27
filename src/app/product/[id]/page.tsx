import Link from "next/link";
import { notFound } from "next/navigation";
import { CartProvider } from "@/components/CartContext";
import { fetchProducts, formatPrice } from "@/lib/checkout";
import { ProductActions } from "./ProductActions";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const products = await fetchProducts();
  const product = products.find((p) => p.id === id);
  if (!product) notFound();

  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
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
