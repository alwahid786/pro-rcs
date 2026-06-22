import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { ExpertiseAreaCard, ExpertiseAreasSectionContent } from "@/components/content/types";
import Button from "@/components/ui/Button";
import HeadingBlock from "@/components/ui/HeadingBlock";

type AboutExpertiseAreasSectionProps = Omit<ExpertiseAreasSectionContent, "type">;

const ExpertiseCard = ({ number, title, items }: Omit<ExpertiseAreaCard, "variant">) => {
  return (
    <article className="group relative flex flex-col gap-6 overflow-hidden rounded-3xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-colors duration-300 hover:bg-[#221d1a] sm:p-8">
      <div className="absolute -top-5 -right-5 z-1 h-40 w-40 rounded-full bg-primary/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" aria-hidden />

      <span className="relative z-10 inline-flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-sans text-sm font-bold text-primary">
        {number}
      </span>

      <div className="relative z-10 flex flex-col gap-5">
        <h3 className="font-sans text-xl font-bold text-text transition-colors duration-300 group-hover:text-white sm:text-2xl">{title}</h3>

        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className="font-sans text-base leading-relaxed text-text-secondary transition-colors duration-300 group-hover:text-white/60">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
};

const AboutExpertiseAreasSection = ({ badge, heading, cta, cards }: AboutExpertiseAreasSectionProps) => {
  return (
    <section className="bg-[#fdfaf7] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="flex w-full flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <HeadingBlock badge={badge} heading={heading} weight="semibold" uppercase={false} headingClassName="max-w-3xl" />

          <Button
            href={cta.href}
            variant="primary"
            size="md"
            icon={<ArrowRightIcon className="text-white" />}
            className="w-full shrink-0 sm:w-auto"
          >
            {cta.label}
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 lg:gap-6">
          {cards.map((card) => (
            <ExpertiseCard key={card.number} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutExpertiseAreasSection;
