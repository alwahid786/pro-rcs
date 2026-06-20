import HowItWorksFeatureCard from "./HowItWorksFeatureCard";
import HowItWorksStepCard from "./HowItWorksStepCard";
import { howItWorksContent } from "./data";
import HeadingBlock from "@/components/ui/HeadingBlock";

const HowItWorksSection = () => {
  const { badge, heading, steps, features } = howItWorksContent;

  return (
    <section className="bg-white container mx-auto py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex flex-col gap-10">
        <HeadingBlock badge={badge} heading={heading} weight="regular" />

        <div className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <HowItWorksStepCard key={step.number} {...step} />
            ))}
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            {features.map((feature) => (
              <HowItWorksFeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
