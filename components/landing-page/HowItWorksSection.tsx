import HowItWorksFeatureCard from "@/components/landing-page/HowItWorksFeatureCard";
import HowItWorksStepCard from "@/components/landing-page/HowItWorksStepCard";
import { howItWorksContent } from "@/components/landing-page/how-it-works-data";
import HeadingBlock from "@/components/ui/HeadingBlock";

const HowItWorksSection = () => {
  const { badge, heading, steps, features } = howItWorksContent;

  return (
    <section className="bg-white container mx-auto py-16 sm:py-20 lg:py-24">
      <div className="mx-auto ">
        <HeadingBlock badge={badge} heading={heading} weight="regular" />

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <HowItWorksStepCard key={step.number} {...step} />
          ))}
        </div>

        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {features.map((feature) => (
            <HowItWorksFeatureCard key={feature.title} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
