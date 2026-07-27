"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

const LINKS = [
  { href: "/#ledger", label: "The Ledger" },
  { href: "/blog", label: "Journal" },
];

function NavLink({ href, label, dark }: { href: string; label: string; dark: boolean }) {
  return (
    <Link href={href} className="group relative text-[12px] uppercase tracking-[0.18em]">
      <span className={dark ? "text-ink/80" : "text-white/85"}>{label}</span>
      <span
        className={`absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-200 ease-out group-hover:scale-x-100 ${
          dark ? "bg-ink" : "bg-white"
        }`}
      />
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
      transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-5 transition-colors duration-500 md:px-16 ${
        solid ? "bg-gallery/90 backdrop-blur-sm" : "bg-transparent"
      }`}
    >
      <Link
        href="/"
        className={`font-display text-[14px] tracking-[0.14em] ${solid ? "text-ink" : "text-white"}`}
      >
        NORTH LEATHER
      </Link>
      <nav className="flex items-center gap-8">
        {LINKS.map((l) => (
          <NavLink key={l.href} href={l.href} label={l.label} dark={solid} />
        ))}
      </nav>
    </motion.header>
  );
}
