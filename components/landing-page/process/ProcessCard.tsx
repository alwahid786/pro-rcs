import GradientCard from "@/components/ui/GradientCard";
import Heading from "@/components/ui/Heading";
import type { ProcessStep } from "./data";

const ProcessCard = ({ number, title, description }: ProcessStep) => {
  return (
    <GradientCard className="p-6 sm:p-8 ">
      <div className="relative z-10 flex pb-10 h-full flex-col max-w-[90%]">
        <Heading as="p" size="step-number" aria-hidden className="text-[#F9CEBA80] text-[180px]!">
          {number}
        </Heading>

        <Heading as="h3" size="card-title" weight="bold" multicolor={title} className="mt-6 text-[42px]!" uppercase={false} />

        <p className="mt-3 font-sans text-xl font-medium leading-[142%] text-text-secondary">{description}</p>
      </div>
    </GradientCard>
  );
};

export default ProcessCard;
