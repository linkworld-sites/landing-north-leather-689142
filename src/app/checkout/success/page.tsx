import Link from "next/link";
import { CartProvider } from "@/components/CartContext";
import { SuccessClient } from "./SuccessClient";

export const metadata = {
  title: "Order confirmed — North Leather",
  description: "Thank you for your order.",
};

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-gallery px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] uppercase tracking-[0.22em] text-ink/50">North Leather</p>
        <h1 className="mt-4 font-display text-[2.75rem] font-light leading-tight text-ink md:text-[3.5rem]">
          Thank you.
        </h1>
        <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink/60">
          Your order has been placed. A confirmation will follow by email —
          your piece is on its way to becoming yours.
        </p>
        <Link
          href="/shop"
          className="mt-10 inline-block text-[13px] uppercase tracking-[0.18em] text-ink/60 underline decoration-hairline underline-offset-4 hover:text-ink"
        >
          Continue shopping →
        </Link>
        <CartProvider>
          <SuccessClient />
        </CartProvider>
      </div>
    </main>
  );
}
