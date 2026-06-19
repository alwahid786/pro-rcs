import ProcessCard from "./ProcessCard";
import ProcessCtaBar from "./ProcessCtaBar";
import { processSectionContent } from "./data";
import HeadingBlock from "@/components/ui/HeadingBlock";

const ProcessSection = () => {
  const { badge, heading, steps } = processSectionContent;

  return (
    <section className="container mx-auto bg-white py-16 sm:py-20 lg:py-24">
      <HeadingBlock badge={badge} heading={heading} weight="regular" />

      <div className="mt-10 grid gap-5 lg:grid-cols-3">
        {steps.map((step) => (
          <ProcessCard key={step.number} {...step} />
        ))}
      </div>

      <ProcessCtaBar />
    </section>
  );
};

export default ProcessSection;
