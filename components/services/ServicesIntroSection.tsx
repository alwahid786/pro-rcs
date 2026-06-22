import type { HeadingIntroSectionContent } from "@/components/content/types";
import HeadingBlock from "@/components/ui/HeadingBlock";

type ServicesIntroSectionProps = Omit<HeadingIntroSectionContent, "type">;

const ServicesIntroSection = ({ badge, heading, description }: ServicesIntroSectionProps) => {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-12">
      <HeadingBlock badge={badge} heading={heading} weight="semibold" uppercase={false} headingClassName="max-w-3xl" />
      <p className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8">{description}</p>
    </div>
  );
};

export default ServicesIntroSection;
