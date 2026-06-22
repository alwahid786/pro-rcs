import CheckIcon from "@/assets/icons/CheckIcon";
import StarIcon from "@/assets/icons/StarIcon";
import type { ChallengeDeliverSectionContent } from "@/components/content/types";
import Heading from "@/components/ui/Heading";

type IndustryDetailChallengeDeliverSectionProps = Omit<ChallengeDeliverSectionContent, "type">;

const IndustryDetailChallengeDeliverSection = ({ challenge, deliver }: IndustryDetailChallengeDeliverSectionProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-8 bg-[#1A1612] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
          <StarIcon />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{challenge.badge}</span>
        </div>

        <Heading as="h2" size="display" className="text-white lg:text-[52px]!">
          {challenge.heading.prefix}
          <span className="text-primary">{challenge.heading.highlight}</span>
          {challenge.heading.suffix}
        </Heading>

        <p className="font-sans text-base leading-relaxed text-white/65 sm:text-lg sm:leading-8">{challenge.description}</p>
      </div>

      <div className="flex flex-col gap-8 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#1A1612] px-5 py-2 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <StarIcon />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{deliver.badge}</span>
        </div>

        <h2 className="font-sans text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-[2.75rem]">{deliver.heading}</h2>

        <ul className="flex flex-col gap-5">
          {deliver.items.map((item) => (
            <li key={item} className="flex items-start gap-4">
              <CheckIcon />
              <span className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IndustryDetailChallengeDeliverSection;
