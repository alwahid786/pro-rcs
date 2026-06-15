import Hero from "@/components/landing-page/Hero";
import ResultsSection from "@/components/landing-page/ResultsSection";
import StrategySection from "@/components/landing-page/StrategySection";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResultsSection />
      <StrategySection />
    </main>
  );
}
