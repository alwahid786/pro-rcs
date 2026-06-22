import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { FlagshipFeatureItem, FlagshipServiceSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";

type FlagshipServiceSectionProps = Omit<FlagshipServiceSectionContent, "type">;

const FeatureRow = ({ number, title, description }: FlagshipFeatureItem) => (
  <div className="group flex flex-col gap-3 border-t border-white/10 py-6 transition-all duration-300 first:border-t-0 first:pt-0 hover:translate-x-1 sm:py-8">
    <div className="flex items-center gap-4">
      <span className="flex w-8 shrink-0 items-center justify-center font-sans text-sm font-light text-primary">{number}</span>
      <div className="flex flex-col gap-2">
        <Heading as="h3" weight="bold" className="text-lg text-white sm:text-xl">
          {title}
        </Heading>
        <Heading as="p" className="text-white/55">
          {description}
        </Heading>
      </div>
    </div>
  </div>
);

const FlagshipServiceSection = ({ badge, heading, description, quote, cta, features }: FlagshipServiceSectionProps) => {
  return (
    <section className="bg-[#1A1612] py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="group/content flex flex-col gap-8">
            <Badge text={badge} variant="glass" />

            <Heading as="h2" size="display" className="text-white lg:text-[62px]!">
              {heading.map((segment, index) =>
                segment.highlight ? (
                  <span key={index} className="text-primary">
                    {segment.text}
                  </span>
                ) : (
                  <span key={index}>{segment.text}</span>
                ),
              )}
            </Heading>

            <Heading as="p" className="text-white/65">
              {description}
            </Heading>

            <blockquote className="border-l-2 border-primary pl-5 font-sans text-base italic leading-relaxed text-white/80 transition-transform duration-300 group-hover/content:translate-x-1 sm:text-lg">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <Button
              href={cta.href}
              variant="primary"
              size="md"
              icon={<ArrowRightIcon className="text-white" />}
              className="w-fit transition-transform duration-300 hover:-translate-y-0.5"
            >
              {cta.label}
            </Button>
          </div>

          <div className="flex flex-col">
            {features.map((feature) => (
              <FeatureRow key={feature.number} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlagshipServiceSection;
