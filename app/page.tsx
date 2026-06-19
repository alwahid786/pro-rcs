import AboutSection from '@/components/landing-page/AboutSection';
import ContactSection from '@/components/landing-page/ContactSection';
import FaqSection from '@/components/landing-page/FaqSection';
import Hero from '@/components/landing-page/Hero';
import HowItWorksSection from '@/components/landing-page/HowItWorksSection';
import ProcessSection from '@/components/landing-page/ProcessSection';
import RealProblemsSection from '@/components/landing-page/RealProblemsSection';
import ResultsSection from '@/components/landing-page/ResultsSection';
import StrategySection from '@/components/landing-page/StrategySection';
import TestimonialsSection from '@/components/landing-page/TestimonialsSection';
import UpperFooterSection from '@/components/landing-page/UpperFooterSection';
import WhatSetsApartSection from '@/components/landing-page/WhatSetsApartSection';
import ServiceSection from '@/components/landing-page/ServiceSection';

export default function Home() {
  return (
    <main className="flex-1">
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
