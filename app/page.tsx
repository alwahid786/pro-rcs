import { AboutSection } from '@/components/about';
import {
  ContactSection,
  FaqSection,
  Hero,
  HowItWorksSection,
  ProcessSection,
  RealProblemsSection,
  ResultsSection,
  StrategySection,
  TestimonialsSection,
  UpperFooterSection,
  WhatSetsApartSection,
} from '@/components/landing-page';
import { ServiceSection } from '@/components/services';

export default function Home() {
  return (
    <main className="flex-1 overflow-x-clip">
      <Hero />
      <ResultsSection />
      <ServiceSection />
      <StrategySection />
      <HowItWorksSection />
      <RealProblemsSection />
      <WhatSetsApartSection />
      <ProcessSection />
      <TestimonialsSection />
      <FaqSection />
      <AboutSection />
      <ContactSection />
      <UpperFooterSection />
    </main>
  );
}
