import GradientCard from "@/components/ui/GradientCard";
import Heading from "@/components/ui/Heading";
import type { HowItWorksStep } from "./data";

const HowItWorksStepCard = ({ number, title, description, icon: Icon }: HowItWorksStep) => {
  return (
    <GradientCard className="p-6 sm:p-8">
      <div className="relative z-10 flex h-full flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <Heading as="p" size="step-number" aria-hidden className=" text-[#F9CEBA80]">
            {number}
          </Heading>
          <span className="shrink-0 text-primary">
            <Icon />
          </span>
        </div>

        <div className="flex flex-col gap-3">
          <Heading as="h3" size="card-title" weight="bold">
            {title}
          </Heading>

          <p className="font-sans text-base font-medium leading-[142%] text-text-secondary ">{description}</p>
        </div>
      </div>
    </GradientCard>
  );
};

export default HowItWorksStepCard;
