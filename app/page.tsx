import AboutSection from "@/components/landing-page/AboutSection";
import Hero from "@/components/landing-page/Hero";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import ResultsSection from "@/components/landing-page/ResultsSection";
import StrategySection from "@/components/landing-page/StrategySection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResultsSection />
      <StrategySection />
      <AboutSection />
      <HowItWorksSection />
    </main>
  );
}
