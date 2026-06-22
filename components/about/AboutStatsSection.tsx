import type { StatsSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

type AboutStatsSectionProps = Pick<StatsSectionContent, "badge" | "items">;

const AboutStatsSection = ({ badge, items }: AboutStatsSectionProps) => {
  return (
    <section className="relative z-10 bg-[#1A1612] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col items-center gap-12 sm:gap-14">
        <Badge text={badge} variant="glass" className="[&_span]:font-medium [&_span]:normal-case [&_span]:capitalize" />

        <div className="grid w-full gap-10 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-0">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={cn("flex flex-col justify-center gap-2 lg:p-10 p-8", index % 2 === 1 && "sm:border-l sm:border-white/10", index > 0 && "lg:border-l lg:border-white/10")}
            >
              <p className="font-sans text-4xl font-extralight tracking-tight text-primary sm:text-5xl lg:text-6xl">{item.value}</p>
              <h3 className="font-sans lg:text-xl text-base font-bold leading-snug text-white sm:text-lg max-w-60">{item.title}</h3>
              <p className="font-sans leading-relaxed text-white/45">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStatsSection;
