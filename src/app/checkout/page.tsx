import Link from "next/link";
import { CartProvider } from "@/components/CartContext";
import { CheckoutClient } from "./CheckoutClient";

export const metadata = {
  title: "Checkout — North Leather",
  description: "Complete your order.",
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/shop"
          className="text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink"
        >
          ← Shop
        </Link>
        <p className="mt-8 text-[11px] uppercase tracking-[0.22em] text-ink/50">North Leather</p>
        <h1 className="mt-4 font-display text-[2.75rem] font-light leading-tight text-ink md:text-[3.5rem]">
          Checkout
        </h1>
        <CartProvider>
          <CheckoutClient />
        </CartProvider>
      </div>
    </main>
  );
}
