import { aboutPageContent, AboutStatsSection } from "@/components/about";
import HeroSection from "@/components/ui/HeroSection";

const heroSection = aboutPageContent.sections.find((section) => section.type === "hero");
const statsSection = aboutPageContent.sections.find((section) => section.type === "stats");

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
    </main>
  );
};

export default AboutPage;
