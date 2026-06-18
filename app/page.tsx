import AboutSection from "@/components/landing-page/AboutSection";
import FaqSection from "@/components/landing-page/FaqSection";
import Hero from "@/components/landing-page/Hero";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import ProcessSection from "@/components/landing-page/ProcessSection";
import RealProblemsSection from "@/components/landing-page/RealProblemsSection";
import ResultsSection from "@/components/landing-page/ResultsSection";
import StrategySection from "@/components/landing-page/StrategySection";
import TestimonialsSection from "@/components/landing-page/TestimonialsSection";
import UpperFooterSection from "@/components/landing-page/UpperFooterSection";
import WhatSetsApartSection from "@/components/landing-page/WhatSetsApartSection";

import service1 from "@/assets/imgs/services/service-1.png";
import service1Mob from "@/assets/imgs/services/service-1-mb.png";
import ServiceInnerCard from "@/components/landing-page/ServiceInnerCard";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResultsSection />
      <StrategySection />
      <AboutSection />
      <HowItWorksSection />

      <ServiceInnerCard
        title="Consulting & Strategy"
        description="We help restaurant businesses transform into scalable franchise systems and support their growth through structured sales strategies."
        listItems={["Franchise Development", "Sales Strategy", "Franchise Support", "Franchise Training", "Franchise Marketing", "Franchise Operations", "Franchise Finance"]}
        image={service1}
        imageMobile={service1Mob}
      />

      <ProcessSection />
      <RealProblemsSection />
      <WhatSetsApartSection />
      <TestimonialsSection />
      <FaqSection />
      <UpperFooterSection />
    </main>
  );
}
