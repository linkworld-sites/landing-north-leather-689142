import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-[11px] uppercase tracking-[0.18em] text-white/50 md:flex-row md:justify-between">
        <span className="font-display text-[13px] tracking-[0.14em] text-white/80">
          North Leather
        </span>
        <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          <Link href="/shop" className="hover:text-white/80">Shop</Link>
          <Link href="/blog" className="hover:text-white/80">Journal</Link>
          <Link href="/legal/privacy" className="hover:text-white/80">Privacy</Link>
          <Link href="/legal/cookies" className="hover:text-white/80">Cookies</Link>
        </nav>
        <span className="text-white/30">© {new Date().getFullYear()} North Leather</span>
      </div>
    </footer>
  );
}
