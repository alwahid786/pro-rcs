import StarIcon from "@/assets/icons/StarIcon";
import type { ProcessGridSectionContent } from "@/components/content/types";

type ServicesProcessSectionProps = Omit<ProcessGridSectionContent, "type">;

const ServicesProcessSection = ({ badge, steps }: ServicesProcessSectionProps) => {
  return (
    <section className="bg-[#fdfaf7] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-[#1A1612] px-5 py-2 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
          <StarIcon />
          <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{badge}</span>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`flex flex-col gap-5 lg:px-8 lg:first:pl-0 lg:last:pr-0${index > 0 ? " lg:border-l lg:border-[#ece7e1]" : ""}`}
            >
              <div className="flex items-center gap-4">
                <span className="font-sans text-4xl font-light text-primary/50 sm:text-5xl">{step.number}</span>
                <span className="hidden h-px flex-1 bg-primary/25 lg:block" aria-hidden />
              </div>

              <div className="flex flex-col gap-3">
                <h3 className="font-sans text-xl font-bold text-text sm:text-2xl">{step.title}</h3>
                <p className="font-sans text-base leading-relaxed text-text-secondary">{step.description}</p>
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
