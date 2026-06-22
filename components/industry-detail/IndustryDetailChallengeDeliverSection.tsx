import CheckIcon from "@/assets/icons/CheckIcon";
import type { ChallengeDeliverSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import Heading from "@/components/ui/Heading";

type IndustryDetailChallengeDeliverSectionProps = Omit<ChallengeDeliverSectionContent, "type">;

const IndustryDetailChallengeDeliverSection = ({ challenge, deliver }: IndustryDetailChallengeDeliverSectionProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="flex flex-col gap-8 bg-[#1A1612] px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <Badge text={challenge.badge} variant="glass" />

        <Heading as="h2" size="display" multicolor={challenge.heading} className="text-white lg:text-[52px]!" />

        <Heading as="p" className="text-white/65">
          {challenge.description}
        </Heading>
      </div>

      <div className="flex flex-col gap-8 bg-white px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <Badge text={deliver.badge} />

        <Heading as="h2" weight="bold" className="lg:text-[2.75rem]!">
          {deliver.heading}
        </Heading>

        <ul className="flex flex-col gap-5">
          {deliver.items.map((item) => (
            <li key={item} className="group flex items-start gap-4 transition-transform duration-300 hover:translate-x-1">
              <CheckIcon />
              <Heading as="p" tone="muted">
                {item}
              </Heading>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default IndustryDetailChallengeDeliverSection;
