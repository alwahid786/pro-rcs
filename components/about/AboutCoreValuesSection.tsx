import Collaboration from "@/assets/icons/about/Collaboration";
import ContinuousLearning from "@/assets/icons/about/ContinuousLearning";
import Innovation from "@/assets/icons/about/Innovation";
import Integrity from "@/assets/icons/about/Integrity";
import Passion from "@/assets/icons/about/Passion";
import ResultsDriven from "@/assets/icons/about/ResultsDriven";
import type { CoreValueItem, CoreValuesSectionContent } from "@/components/content/types";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";
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

const CoreValueCard = ({ title, description, featured }: CoreValueItem & { featured?: boolean }) => {
  const Icon = coreValueIconMap[title];

  return (
    <article className={cn("flex flex-col gap-4 rounded-2xl border border-[#ece7e1] p-6 sm:p-8", featured ? "bg-[#FFF8F4]" : "bg-white")}>
      {Icon && <Icon />}

      <h3 className="font-sans text-lg font-bold text-text sm:text-xl">{title}</h3>
      <p className="font-sans text-base leading-relaxed text-text-secondary">{description}</p>
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
          {items.map((item, index) => (
            <CoreValueCard key={item.title} {...item} featured={index === 0} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCoreValuesSection;
