import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import StarIcon from "@/assets/icons/StarIcon";
import type { FlagshipFeatureItem, FlagshipServiceSectionContent } from "@/components/content/types";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";

type FlagshipServiceSectionProps = Omit<FlagshipServiceSectionContent, "type">;

const FeatureRow = ({ number, title, description }: FlagshipFeatureItem) => (
  <div className="flex flex-col gap-3 border-t border-white/10 py-6 first:border-t-0 first:pt-0 sm:py-8">
    <div className="flex items-start gap-4">
      <span className="font-sans text-sm font-bold text-primary">{number}</span>
      <div className="flex flex-col gap-2">
        <h3 className="font-sans text-lg font-bold text-white sm:text-xl">{title}</h3>
        <p className="font-sans text-base leading-relaxed text-white/55">{description}</p>
      </div>
    </div>
  </div>
);

const FlagshipServiceSection = ({ badge, heading, description, quote, cta, features }: FlagshipServiceSectionProps) => {
  return (
    <section className="bg-[#1A1612] py-16 sm:py-20 lg:py-24">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-8">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
              <StarIcon />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{badge}</span>
            </div>

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

            <p className="font-sans text-base leading-relaxed text-white/65 sm:text-lg sm:leading-8">{description}</p>

            <blockquote className="border-l-2 border-primary pl-5 font-sans text-base italic leading-relaxed text-white/80 sm:text-lg">
              &ldquo;{quote}&rdquo;
            </blockquote>

            <Button
              href={cta.href}
              variant="primary"
              size="md"
              icon={<ArrowRightIcon className="text-white" />}
              className="w-full sm:w-auto"
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
