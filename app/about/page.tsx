import { aboutPageContent } from "@/components/about";
import HeroSection from "@/components/ui/HeroSection";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <HeroSection
        heading={aboutPageContent.sections[0].heading}
        description={aboutPageContent.sections[0].description || ""}
        primaryButton={aboutPageContent.sections[0].primaryButton || { label: "", href: "" }}
        secondaryButton={aboutPageContent.sections[0].secondaryButton || { label: "", href: "" }}
      />
    </>
  );
};

export default AboutPage;
