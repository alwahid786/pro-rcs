import type { ReactNode } from "react";
import Bulb from "@/assets/icons/industry/Bulb";
import Development from "@/assets/icons/industry/Development";
import MenuEngineering from "@/assets/icons/industry/MenuEngineering";
import Operational from "@/assets/icons/industry/Operational";
import SupplyChain from "@/assets/icons/industry/SupplyChain";
import Training from "@/assets/icons/industry/Training";
import type { IndustryServicesGridSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import Heading from "@/components/ui/Heading";

type IndustryDetailServicesGridSectionProps = Omit<IndustryServicesGridSectionContent, "type">;

const serviceIcons: Record<string, ReactNode> = {
  development: <Development />,
  bulb: <Bulb />,
  "menu-engineering": <MenuEngineering />,
  operational: <Operational />,
  "supply-chain": <SupplyChain />,
  training: <Training />,
};

const IndustryDetailServicesGridSection = ({ badge, heading, description, items }: IndustryDetailServicesGridSectionProps) => {
  return (
    <section className="bg-[#fdfaf7] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="flex flex-col gap-8">
          <div className="flex justify-center">
            <Badge showIcon text={badge} />
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,320px)] lg:items-end lg:gap-12">
            <Heading as="h2" size="display" multicolor={heading} uppercase={false} weight="semibold" className="lg:text-[52px]!" />
            <p className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8">{description}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-2xl border border-[#ece7e1] bg-[#ece7e1] sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <article key={item.title} className="flex flex-col gap-5 bg-white p-6 sm:p-8">
              {serviceIcons[item.icon] ?? <Development />}
              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-lg font-bold text-text sm:text-xl">{item.title}</h3>
                <p className="font-sans text-sm leading-relaxed text-text-secondary sm:text-base sm:leading-7">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustryDetailServicesGridSection;
