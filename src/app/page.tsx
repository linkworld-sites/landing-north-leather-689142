// Signature moment: The Patina Ledger is a single satchel photographed on the
// same seamless, same light, at five real ages — the ONE proof no competitor
// leather brand can borrow, because it's provenance, not a template.
import { Header } from "@/components/north/Header";
import { Hero } from "@/components/north/Hero";
import { StickyShowcase } from "@/components/north/StickyShowcase";
import { PatinaLedger } from "@/components/north/PatinaLedger";
import { QuotePanel } from "@/components/north/QuotePanel";
import { NumbersBand } from "@/components/north/NumbersBand";
import { TimelineRows } from "@/components/north/TimelineRows";
import { SplitCTA } from "@/components/north/SplitCTA";
import { Footer } from "@/components/north/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-gallery">
      <Header />
      <Hero />
      <StickyShowcase />
      <PatinaLedger />
      <QuotePanel />
      <NumbersBand />
      <TimelineRows />
      <SplitCTA />
      <Footer />
    </main>
  );
}
