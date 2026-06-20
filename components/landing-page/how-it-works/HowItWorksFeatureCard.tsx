import GradientCard from "@/components/ui/GradientCard";
import Heading from "@/components/ui/Heading";
import type { HowItWorksFeature } from "./data";

const HowItWorksFeatureCard = ({ title, description, icon: Icon, tags }: HowItWorksFeature) => {
  return (
    <GradientCard className="px-5 py-6 sm:px-6 sm:py-8">
      <div className="relative z-10 flex h-full flex-col gap-6">
        <div className="flex flex-col gap-4">
          <span className="text-primary">
            <Icon />
          </span>

          <span className="block h-1 w-12 rounded-full bg-primary" aria-hidden />
        </div>

        <div className="flex flex-col gap-3">
          <Heading as="h3" size="card-title" weight="bold">
            {title}
          </Heading>

          <p className="font-sans text-base font-medium leading-[142%] text-text-secondary lg:text-[18px]">{description}</p>
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="rounded-full border border-border bg-white px-4 py-1.5 font-sans text-sm font-medium text-text">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </GradientCard>
  );
};

export default HowItWorksFeatureCard;
