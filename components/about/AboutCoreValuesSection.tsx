import Collaboration from "@/assets/icons/about/Collaboration";
import ContinuousLearning from "@/assets/icons/about/ContinuousLearning";
import Innovation from "@/assets/icons/about/Innovation";
import Integrity from "@/assets/icons/about/Integrity";
import Passion from "@/assets/icons/about/Passion";
import ResultsDriven from "@/assets/icons/about/ResultsDriven";
import type { CoreValueItem, CoreValuesSectionContent } from "@/components/content/types";
import HeadingBlock from "@/components/ui/HeadingBlock";
import type { ComponentType } from "react";

type AboutCoreValuesSectionProps = Omit<CoreValuesSectionContent, "type">;

const coreValueIconMap: Record<string, ComponentType> = {
  Integrity,
  Innovation,
  Collaboration,
  "Results-Driven": ResultsDriven,
  Passion,
  "Continuous Learning": ContinuousLearning,
};

const CoreValueCard = ({ title, description }: CoreValueItem) => {
  const Icon = coreValueIconMap[title];

  return (
    <article className="group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-[#ece7e1] bg-white p-6 shadow-[0_12px_32px_rgba(0,0,0,0.04)] transition-all duration-300 hover:-translate-y-2 hover:border-transparent hover:bg-[#221d1a] hover:shadow-[0_24px_48px_rgba(0,0,0,0.14)] sm:p-8">
      <div
        className="absolute -top-5 -right-5 z-1 h-40 w-40 rounded-full bg-primary/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100"
        aria-hidden
      />

      <div className="relative z-10 flex flex-col gap-4">
        {Icon && <Icon />}

        <h3 className="font-sans text-lg font-bold text-text transition-colors duration-300 group-hover:text-white sm:text-xl">{title}</h3>
        <p className="font-sans text-base leading-relaxed text-text-secondary transition-colors duration-300 group-hover:text-white/60">{description}</p>
      </div>
    </article>
  );
};

const AboutCoreValuesSection = ({ badge, heading, description, items }: AboutCoreValuesSectionProps) => {
  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col items-center gap-10 lg:gap-12">
        <div className="flex max-w-3xl flex-col items-center gap-6 text-center">
          <HeadingBlock badge={badge} heading={heading} isCenter weight="semibold" uppercase={false} headingClassName="max-w-4xl" />
          <p className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8">{description}</p>
        </div>

        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {items.map((item) => (
            <CoreValueCard key={item.title} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCoreValuesSection;
