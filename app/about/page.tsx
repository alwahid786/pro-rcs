import { aboutPageContent, AboutSection } from "@/components/about";
import HeroSection from "@/components/ui/HeroSection";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <HeroSection
        heading={aboutPageContent.sections[0].heading}
        description={aboutPageContent.sections[0].description}
        primaryButton={aboutPageContent.sections[0].primaryButton}
        secondaryButton={aboutPageContent.sections[0].secondaryButton}
      />
      <AboutSection />
    </>
  );
};

export default AboutPage;
