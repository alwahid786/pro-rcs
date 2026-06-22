import { aboutPageContent, AboutMissionVisionSection, AboutOurStorySection, AboutStatsSection } from "@/components/about";
import HeroSection from "@/components/ui/HeroSection";

const heroSection = aboutPageContent.sections.find((section) => section.type === "hero");
const statsSection = aboutPageContent.sections.find((section) => section.type === "stats");
const ourStorySection = aboutPageContent.sections.find((section) => section.type === "our-story");
const missionVisionSection = aboutPageContent.sections.find((section) => section.type === "mission-vision");

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
    </main>
  );
};

export default AboutPage;
