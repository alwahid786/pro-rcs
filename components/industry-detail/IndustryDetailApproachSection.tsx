import type { ApproachPhasesSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import Heading from "@/components/ui/Heading";

type IndustryDetailApproachSectionProps = Omit<ApproachPhasesSectionContent, "type">;

const IndustryDetailApproachSection = ({ badge, heading, description, phases }: IndustryDetailApproachSectionProps) => {
  return (
    <section className="bg-[#1A1612] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,380px)] lg:items-end lg:gap-12">
          <div className="flex flex-col gap-6">
            <Badge text={badge} variant="glass" />

            <Heading as="h2" size="display" className="text-white lg:text-[64px]!">
              {heading.map((segment, index) => (
                <span key={index}>
                  {segment.breakBefore ? <br /> : null}
                  {segment.highlight ? <span className="text-primary">{segment.text}</span> : segment.text}
                </span>
              ))}
            </Heading>
          </div>

          <Heading as="p" className="text-sm text-white/60 sm:text-base sm:leading-7 lg:max-w-[90%] lg:justify-self-end lg:text-right">
            {description}
          </Heading>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase, index) => (
            <article
              key={phase.number}
              className={`group flex flex-col gap-5 border border-transparent p-11  transition-transform duration-300 hover:-translate-y-1 ${
                index === 0 ? "bg-[#241f1b]" : "bg-[#1F1A17]"
              }`}
            >
              <div className="flex flex-col gap-5 max-w-[240px]">
                <span className="flex items-center gap-4 font-sans text-5xl font-extralight text-primary sm:text-6xl">
                  {phase.number}
                  <span className="mt-1 h-px flex-1 bg-primary/45" aria-hidden />
                </span>
                <div className="flex flex-col gap-3">
                  <Heading as="h3" weight="bold" className="lg:text-[22px]! text-base! leading-[1.1] text-white">
                    {phase.title}
                  </Heading>
                  <Heading as="p" className="text-sm text-white/55 sm:text-base">
                    {phase.description}
                  </Heading>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryDetailApproachSection;
