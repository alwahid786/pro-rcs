import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { ExpertiseAreaCard, ExpertiseAreasSectionContent } from "@/components/content/types";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AboutExpertiseAreasSectionProps = Omit<ExpertiseAreasSectionContent, "type">;

const ExpertiseCard = ({ number, title, items, variant }: ExpertiseAreaCard) => {
  const isDark = variant === "dark";

  return (
    <article
      className={cn(
        "flex flex-col gap-6 rounded-3xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-8",
        isDark ? "bg-[#221d1a]" : "bg-white",
      )}
    >
      <span className="inline-flex size-10 items-center justify-center rounded-full border border-primary/20 bg-primary/10 font-sans text-sm font-bold text-primary">
        {number}
      </span>

      <div className="flex flex-col gap-5">
        <h3 className={cn("font-sans text-xl font-bold sm:text-2xl", isDark ? "text-white" : "text-text")}>{title}</h3>

        <ul className="flex flex-col gap-3">
          {items.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
              <span className={cn("font-sans text-base leading-relaxed", isDark ? "text-white/60" : "text-text-secondary")}>{item}</span>
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

          <Link
            href={cta.href}
            className="custom-btn btn-primary inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-white shadow-btn-primary sm:w-auto"
          >
            {cta.label}
            <ArrowRightIcon className="text-white" />
          </Link>
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
