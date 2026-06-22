import type { ProcessGridSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import Heading from "@/components/ui/Heading";

type ServicesProcessSectionProps = Omit<ProcessGridSectionContent, "type">;

const ServicesProcessSection = ({ badge, steps }: ServicesProcessSectionProps) => {
  return (
    <section className="bg-[#fdfaf7] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <Badge text={badge} />

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`group flex flex-col gap-5 transition-transform duration-300 hover:-translate-y-1 lg:px-8 lg:first:pl-0 lg:last:pr-0${index > 0 ? " lg:border-l lg:border-[#ece7e1]" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span className="flex w-12 items-center justify-center font-sans text-4xl font-light text-primary/50 sm:text-5xl">{step.number}</span>
                <span className="hidden h-px flex-1 bg-primary/25 lg:block" aria-hidden />
              </div>

              <div className="flex flex-col gap-3">
                <Heading as="h3" weight="bold" className="text-xl sm:text-2xl">
                  {step.title}
                </Heading>
                <Heading as="p" tone="muted">
                  {step.description}
                </Heading>
              </div>

              {index < steps.length - 1 && <div className="h-px bg-[#ece7e1] lg:hidden" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesProcessSection;
