"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";

export function ProductActions({ product }: { product: Product }) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    track("product_view", { product_id: product.id });
  }, [product.id]);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => {
          add(product);
          setAdded(true);
        }}
        disabled={product.stock === 0}
        className="border border-current px-6 py-3 text-sm uppercase tracking-wide text-ink transition-opacity hover:opacity-70 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {product.stock === 0 ? "Out of stock" : "Add to cart"}
      </button>
      {added ? (
        <Link
          href="/checkout"
          className="text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink"
        >
          Added — go to checkout →
        </Link>
      ) : null}
    </div>
  );
}
