"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/checkout";
import { checkout, fetchProducts, formatPrice } from "@/lib/checkout";
import { track } from "@/lib/funnel";
import { useCart } from "@/components/CartContext";

export function CheckoutClient() {
  const { items, remove } = useCart();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    track("checkout");
    let alive = true;
    fetchProducts().then((live) => {
      if (alive) setCatalog(live);
    });
    return () => {
      alive = false;
    };
  }, []);

  const byId = useMemo(() => {
    const m = new Map<string, Product>();
    for (const p of catalog) m.set(p.id, p);
    return m;
  }, [catalog]);

  const total = useMemo(
    () =>
      items.reduce((sum, i) => {
        const p = byId.get(i.product_id);
        return sum + (p ? p.price_cents * i.quantity : 0);
      }, 0),
    [items, byId],
  );

  const onComplete = async () => {
    const valid = items.filter((i) => byId.has(i.product_id));
    if (!valid.length) {
      setError("Your cart is empty or out of date. Please add items again.");
      return;
    }
    setError(null);
    setBusy(true);
    const ok = await checkout(valid, {
      successUrl: `${window.location.origin}/checkout/success`,
    });
    setBusy(false);
    if (!ok) setError("Checkout couldn't be started right now. Please try again in a moment.");
  };

  if (!items.length) {
    return (
      <div className="mt-10">
        <p className="text-ink/60">Your cart is empty.</p>
        <Link
          href="/shop"
          className="mt-4 inline-block text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink"
        >
          Browse the shop →
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10 max-w-md">
      <ul className="divide-y divide-hairline/50 border-y border-hairline/50">
        {items.map((i) => {
          const p = byId.get(i.product_id);
          if (!p) return null;
          return (
            <li key={i.product_id} className="flex items-center justify-between gap-4 py-4 text-sm">
              <span className="text-ink/80">
                {p.name} × {i.quantity}
              </span>
              <span className="flex items-center gap-3">
                <span className="tabular-nums text-ink/70">
                  {formatPrice(p.price_cents * i.quantity, p.currency)}
                </span>
                <button
                  type="button"
                  aria-label={`Remove ${p.name}`}
                  onClick={() => remove(i.product_id)}
                  className="text-ink/40 hover:text-ink"
                >
                  ×
                </button>
              </span>
            </li>
          );
        })}
      </ul>
      <div className="mt-4 flex justify-between text-sm font-medium text-ink">
        <span>Total</span>
        <span className="tabular-nums">{formatPrice(total)}</span>
      </div>
      <button
        type="button"
        onClick={onComplete}
        disabled={busy}
        className="mt-8 w-full bg-primary px-5 py-3 text-sm uppercase tracking-wide text-[#0d1117] transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {busy ? "Starting checkout…" : "Complete purchase"}
      </button>
      {error ? <p className="mt-3 text-sm text-primary">{error}</p> : null}
    </div>
  );
}
