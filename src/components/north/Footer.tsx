import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-[#0a0e14] px-6 py-10 md:px-16">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 text-[11px] tracking-[0.1em] text-ink/50 md:flex-row md:justify-between">
        <span className="flex items-center gap-2 text-[12px] text-ink/70">
          <span className="text-primary">$</span> north-leather --version 2026
        </span>
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
          <Link href="/shop" className="hover:text-primary">
            <span className="text-accent">❯</span> shop
          </Link>
          <Link href="/blog" className="hover:text-primary">
            <span className="text-accent">❯</span> journal
          </Link>
          <Link href="/legal/privacy" className="hover:text-primary">
            <span className="text-accent">❯</span> privacy
          </Link>
          <Link href="/legal/cookies" className="hover:text-primary">
            <span className="text-accent">❯</span> cookies
          </Link>
        </nav>
        <span className="text-ink/30"># © {new Date().getFullYear()} north leather</span>
      </div>
    </footer>
  );
}
