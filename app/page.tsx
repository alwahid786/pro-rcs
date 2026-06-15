import AboutSection from "@/components/landing-page/AboutSection";
import Hero from "@/components/landing-page/Hero";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import ProcessSection from "@/components/landing-page/ProcessSection";
import ResultsSection from "@/components/landing-page/ResultsSection";
import StrategySection from "@/components/landing-page/StrategySection";
import UpperFooterSection from "@/components/landing-page/UpperFooterSection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResultsSection />
      <StrategySection />
      <AboutSection />
      <HowItWorksSection />
      <ProcessSection />
      <UpperFooterSection />
    </main>
  );
}
