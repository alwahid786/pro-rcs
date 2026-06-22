import {
  aboutPageContent,
  AboutCoreValuesSection,
  AboutCtaContactSection,
  AboutExpertiseAreasSection,
  AboutMissionVisionSection,
  AboutOurStorySection,
  AboutStatsSection,
} from "@/components/about";
import HeroSection from "@/components/ui/HeroSection";

const heroSection = aboutPageContent.sections.find((section) => section.type === "hero");
const statsSection = aboutPageContent.sections.find((section) => section.type === "stats");
const ourStorySection = aboutPageContent.sections.find((section) => section.type === "our-story");
const missionVisionSection = aboutPageContent.sections.find((section) => section.type === "mission-vision");
const coreValuesSection = aboutPageContent.sections.find((section) => section.type === "core-values");
const expertiseAreasSection = aboutPageContent.sections.find((section) => section.type === "expertise-areas");
const ctaContactSection = aboutPageContent.sections.find((section) => section.type === "cta-contact");

const AboutPage = () => {
  return (
    <main className="flex-1 overflow-x-clip">
      {heroSection && (
        <HeroSection
          heading={heroSection.heading}
          description={heroSection.description}
          primaryButton={heroSection.primaryButton}
          secondaryButton={heroSection.secondaryButton}
        />
      )}

      {statsSection && <AboutStatsSection badge={statsSection.badge} items={statsSection.items} />}

      {ourStorySection && (
        <AboutOurStorySection
          badge={ourStorySection.badge}
          heading={ourStorySection.heading}
          paragraphs={ourStorySection.paragraphs}
          features={ourStorySection.features}
          card={ourStorySection.card}
        />
      )}

      {missionVisionSection && (
        <AboutMissionVisionSection
          badge={missionVisionSection.badge}
          heading={missionVisionSection.heading}
          mission={missionVisionSection.mission}
          vision={missionVisionSection.vision}
        />
      )}

      {coreValuesSection && (
        <AboutCoreValuesSection
          badge={coreValuesSection.badge}
          heading={coreValuesSection.heading}
          description={coreValuesSection.description}
          items={coreValuesSection.items}
        />
      )}

      {expertiseAreasSection && (
        <AboutExpertiseAreasSection
          badge={expertiseAreasSection.badge}
          heading={expertiseAreasSection.heading}
          cta={expertiseAreasSection.cta}
          cards={expertiseAreasSection.cards}
        />
      )}

      {ctaContactSection && (
        <AboutCtaContactSection
          badge={ctaContactSection.badge}
          heading={ctaContactSection.heading}
          description={ctaContactSection.description}
          primaryButton={ctaContactSection.primaryButton}
          secondaryButton={ctaContactSection.secondaryButton}
          contactItems={ctaContactSection.contactItems}
        />
      )}
    </main>
  );
};

export default AboutPage;
