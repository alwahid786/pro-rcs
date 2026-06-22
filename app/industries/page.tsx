import {
  industriesPageContent,
  IndustriesMarqueeSection,
  IndustriesStandForSection,
  IndustryBlockSection,
} from "@/components/industries";
import HeroSection from "@/components/ui/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: industriesPageContent.meta.title,
  description: industriesPageContent.meta.description,
};

const heroSection = industriesPageContent.sections.find((section) => section.type === "hero");
const marqueeSection = industriesPageContent.sections.find((section) => section.type === "marquee");
const industryBlocks = industriesPageContent.sections.filter((section) => section.type === "industry-block");
const standForSection = industriesPageContent.sections.find((section) => section.type === "stand-for");

const IndustriesPage = () => {
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

      {marqueeSection && <IndustriesMarqueeSection items={marqueeSection.items} />}

      {industryBlocks.map((block, index) => (
        <IndustryBlockSection
          key={block.title}
          id={index === 0 ? "industries-list" : undefined}
          index={block.index}
          variant={block.variant}
          badge={block.badge}
          title={block.title}
          description={block.description}
          highlight={block.highlight}
          cta={block.cta}
          helpItems={block.helpItems}
        />
      ))}

      {standForSection && (
        <IndustriesStandForSection
          badge={standForSection.badge}
          heading={standForSection.heading}
          description={standForSection.description}
          items={standForSection.items}
        />
      )}
    </main>
  );
};

export default IndustriesPage;
