import { SearchOverlayProvider } from "@/lib/search-overlay-context";
import Header from "@/components/Header";
import SearchOverlay from "@/components/SearchOverlay";
import AuthModal from "@/components/AuthModal";
import Hero from "@/components/Hero";
import Mission from "@/components/Mission";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Formats from "@/components/Formats";
import RequestSection from "@/components/RequestSection";
import Quotes from "@/components/Quotes";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <SearchOverlayProvider>
      <div className="grain"></div>

      <Header />
      <SearchOverlay />
      <AuthModal />

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

      <Footer />
    </SearchOverlayProvider>
  );
}
