import StrategyCard from "@/components/landing-page/StrategyCard";
import { strategySectionContent } from "@/components/landing-page/strategy-section-data";
import HeadingBlock from "@/components/ui/HeadingBlock";

const StrategySection = () => {
  const { badge, heading, cards } = strategySectionContent;

  return (
    <section className="relative container mx-auto flex flex-col items-center overflow-hidden bg-white px-5 py-16 sm:py-20 lg:py-24">
      <HeadingBlock badge={badge} heading={heading} />

      <div className="mt-10 grid w-full gap-5 lg:grid-cols-2 lg:gap-8">
        {cards.map((card) => (
          <StrategyCard key={`${card.title.prefix}-${card.title.highlight}`} {...card} />
        ))}
      </div>
    </section>
  );
};

export default StrategySection;
