import {
  FlagshipServiceSection,
  servicesPageContent,
  ServicesAccordionSection,
  ServicesIntroSection,
  ServicesProcessSection,
} from "@/components/services";
import HeroSection from "@/components/ui/HeroSection";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: servicesPageContent.meta.title,
  description: servicesPageContent.meta.description,
};

const heroSection = servicesPageContent.sections.find((section) => section.type === "hero");
const introSection = servicesPageContent.sections.find((section) => section.type === "heading-intro");
const accordionSection = servicesPageContent.sections.find((section) => section.type === "services-accordion");
const flagshipSection = servicesPageContent.sections.find((section) => section.type === "flagship-service");
const processSection = servicesPageContent.sections.find((section) => section.type === "process-grid");

const ServicesPage = () => {
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

      {(introSection || accordionSection) && (
        <section className="bg-white py-16 sm:py-20 lg:py-24">
          {introSection && (
            <div className="container">
              <ServicesIntroSection badge={introSection.badge} heading={introSection.heading} description={introSection.description} />
            </div>
          )}
          {accordionSection && (
            <div className="mt-10 w-full px-5 lg:mt-12 lg:px-8 xl:px-12">
              <ServicesAccordionSection id="services-list" items={accordionSection.items} />
            </div>
          )}
        </section>
      )}

      {flagshipSection && (
        <FlagshipServiceSection
          badge={flagshipSection.badge}
          heading={flagshipSection.heading}
          description={flagshipSection.description}
          quote={flagshipSection.quote}
          cta={flagshipSection.cta}
          features={flagshipSection.features}
        />
      )}

      {processSection && <ServicesProcessSection badge={processSection.badge} steps={processSection.steps} />}
    </main>
  );
};

export default ServicesPage;
