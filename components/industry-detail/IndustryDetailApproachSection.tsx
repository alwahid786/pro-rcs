import type { ApproachPhasesSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import Heading from "@/components/ui/Heading";

type IndustryDetailApproachSectionProps = Omit<ApproachPhasesSectionContent, "type">;

const IndustryDetailApproachSection = ({ badge, heading, description, phases }: IndustryDetailApproachSectionProps) => {
  return (
    <section className="bg-[#1A1612] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end lg:gap-12">
          <div className="flex flex-col gap-6">
            <Badge text={badge} variant="glass" />

            <Heading as="h2" size="display" className="text-white lg:text-[52px]!">
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
          </div>

          <Heading as="p" className="text-white/60">
            {description}
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase) => (
            <article
              key={phase.number}
              className="group flex flex-col gap-5 rounded-2xl border border-white/5 bg-white/3 p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-7"
            >
              <div className="h-0.5 w-full bg-primary" aria-hidden />
              <span className="flex items-center justify-center font-sans text-5xl font-light text-primary sm:text-6xl">{phase.number}</span>
              <div className="flex flex-col gap-3">
                <Heading as="h3" weight="bold" className="text-xl text-white sm:text-2xl">
                  {phase.title}
                </Heading>
                <Heading as="p" className="text-sm text-white/55 sm:text-base">
                  {phase.description}
                </Heading>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryDetailApproachSection;
