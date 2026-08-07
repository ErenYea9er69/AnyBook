import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Formats from "@/components/Formats";
import RequestSection from "@/components/RequestSection";
import Quotes from "@/components/Quotes";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";

// Everything a logged-out visitor sees. Unchanged from the old page.tsx,
// just moved into its own component so AppShell can pick between this
// and DashboardView based on auth state.
export default function LandingView() {
  return (
    <main>
      <Hero />
      <Mission />
      <HowItWorks />
      <Features />
      <Formats />
      <RequestSection />
      <Quotes />
      <FAQ />
      <FinalCTA />
    </main>
  );
}