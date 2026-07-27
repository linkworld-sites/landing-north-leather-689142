"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/#ledger", label: "the-ledger", hideOnMobile: true },
  { href: "/shop", label: "shop" },
  { href: "/blog", label: "journal" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="group relative text-[12px] tracking-[0.08em] text-ink/70">
      <span className="text-accent">~/</span>
      <span className="group-hover:text-primary">{label}</span>
      <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-primary transition-transform duration-150 ease-out group-hover:scale-x-100" />
    </Link>
  );
}

export function Header() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between border-b px-6 py-4 transition-colors duration-300 md:px-16 ${
        solid ? "border-hairline bg-gallery/90 backdrop-blur-sm" : "border-transparent bg-transparent"
      }`}
    >
      <Link href="/" className="flex items-center gap-2 text-[13px] tracking-[0.1em] text-white">
        <span className="text-primary">❯</span>
        <span>north-leather</span>
        <span className="h-[1em] w-[7px] bg-primary/80 cursor-blink" aria-hidden />
      </Link>
      <nav className="flex items-center gap-4 sm:gap-8">
        {LINKS.map((l) => (
          <span key={l.href} className={l.hideOnMobile ? "hidden sm:inline-flex" : "inline-flex"}>
            <NavLink href={l.href} label={l.label} />
          </span>
        ))}
      </nav>
    </motion.header>
  );
}
