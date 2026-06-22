import type { HeadingIntroSectionContent } from "@/components/content/types";
import HeadingBlock from "@/components/ui/HeadingBlock";

type ServicesIntroSectionProps = Omit<HeadingIntroSectionContent, "type">;

const ServicesIntroSection = ({ badge, heading, description }: ServicesIntroSectionProps) => {
  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:items-end lg:gap-12">
      <HeadingBlock badge={badge} heading={heading} weight="semibold" uppercase={false} headingClassName="max-w-3xl lg:text-[64px]!" />
      <p className="font-sans text-sm leading-relaxed text-text-secondary sm:text-base sm:leading-7 lg:max-w-[90%] lg:justify-self-end lg:text-right">
        {description}
      </p>
    </div>
  );
};

export default ServicesIntroSection;
