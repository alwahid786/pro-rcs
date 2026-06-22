import StarIcon from "@/assets/icons/StarIcon";
import type { ApproachPhasesSectionContent } from "@/components/content/types";
import Heading from "@/components/ui/Heading";

type IndustryDetailApproachSectionProps = Omit<ApproachPhasesSectionContent, "type">;

const IndustryDetailApproachSection = ({ badge, heading, description, phases }: IndustryDetailApproachSectionProps) => {
  return (
    <section className="bg-[#1A1612] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end lg:gap-12">
          <div className="flex flex-col gap-6">
            <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
              <StarIcon />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{badge}</span>
            </div>

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

          <p className="font-sans text-base leading-relaxed text-white/60 sm:text-lg sm:leading-8">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {phases.map((phase) => (
            <article
              key={phase.number}
              className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-white/[0.03] p-6 sm:p-7"
            >
              <div className="h-0.5 w-full bg-primary" aria-hidden />
              <span className="font-sans text-5xl font-light text-primary sm:text-6xl">{phase.number}</span>
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-xl font-bold text-white sm:text-2xl">{phase.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-white/55 sm:text-base sm:leading-7">{phase.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryDetailApproachSection;
