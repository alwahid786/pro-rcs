import {
  getIndustryDetailPage,
  industryDetailPages,
  IndustryDetailAlsoRelevantSection,
  IndustryDetailApproachSection,
  IndustryDetailChallengeDeliverSection,
  IndustryDetailServicesGridSection,
  IndustryDetailTestimonialSection,
} from "@/components/industry-detail";
import { IndustriesMarqueeSection } from "@/components/industries";
import HeroSection from "@/components/ui/HeroSection";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type IndustryDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const generateStaticParams = () => Object.keys(industryDetailPages).map((slug) => ({ slug }));

export const generateMetadata = async ({ params }: IndustryDetailPageProps): Promise<Metadata> => {
  const { slug } = await params;
  const page = getIndustryDetailPage(slug);

  if (!page) {
    return { title: "Industry | RCS" };
  }

  return {
    title: page.meta.title,
    description: page.meta.description,
  };
};

const IndustryDetailPage = async ({ params }: IndustryDetailPageProps) => {
  const { slug } = await params;
  const page = getIndustryDetailPage(slug);

  if (!page) {
    notFound();
  }

  const heroSection = page.sections.find((section) => section.type === "hero");
  const marqueeSection = page.sections.find((section) => section.type === "marquee");
  const challengeDeliverSection = page.sections.find((section) => section.type === "challenge-deliver");
  const servicesGridSection = page.sections.find((section) => section.type === "industry-services-grid");
  const approachSection = page.sections.find((section) => section.type === "approach-phases");
  const testimonialSection = page.sections.find((section) => section.type === "testimonial");
  const alsoRelevantSection = page.sections.find((section) => section.type === "also-relevant");

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

      {challengeDeliverSection && (
        <IndustryDetailChallengeDeliverSection
          challenge={challengeDeliverSection.challenge}
          deliver={challengeDeliverSection.deliver}
        />
      )}

      {servicesGridSection && (
        <IndustryDetailServicesGridSection
          badge={servicesGridSection.badge}
          heading={servicesGridSection.heading}
          description={servicesGridSection.description}
          items={servicesGridSection.items}
        />
      )}

      {approachSection && (
        <IndustryDetailApproachSection
          badge={approachSection.badge}
          heading={approachSection.heading}
          description={approachSection.description}
          phases={approachSection.phases}
        />
      )}

      {testimonialSection && (
        <IndustryDetailTestimonialSection
          quote={testimonialSection.quote}
          attribution={testimonialSection.attribution}
          images={testimonialSection.images}
        />
      )}

      {alsoRelevantSection && (
        <IndustryDetailAlsoRelevantSection badge={alsoRelevantSection.badge} items={alsoRelevantSection.items} />
      )}
    </main>
  );
};

export default IndustryDetailPage;
