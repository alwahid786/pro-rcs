import Badge from "@/components/ui/Badge";
import StrategyCard from "@/components/landing-page/StrategyCard";
import { strategySectionContent } from "@/components/landing-page/strategy-section-data";

const StrategySection = () => {
  const { badge, heading, cards } = strategySectionContent;

  return (
    <section className="relative container mx-auto flex flex-col items-center overflow-hidden bg-white px-5 py-16 sm:py-20 lg:py-24">
      <Badge showIcon text={badge} />

      <h2 className="mt-6 max-w-3xl text-center font-sans text-4xl font-bold uppercase leading-[121%] tracking-[-0.03em] text-text sm:text-5xl lg:text-[62px]">
        {heading.prefix} <span className="text-primary">{heading.highlight}</span> {heading.suffix}
      </h2>

      <div className="mt-10 grid w-full gap-5 lg:grid-cols-2 lg:gap-8">
        {cards.map((card) => (
          <StrategyCard key={`${card.titlePrefix}-${card.titleHighlight}`} {...card} />
        ))}
      </div>
    </section>
  );
};

export default StrategySection;
