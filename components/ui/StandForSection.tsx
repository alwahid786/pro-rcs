import type { StandForSectionContent } from "@/components/content/types";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";

type StandForSectionProps = Omit<StandForSectionContent, "type"> & {
  className?: string;
};

const StandForSection = ({ badge, heading, description, items, className }: StandForSectionProps) => {
  return (
    <section className={cn("bg-white py-16 sm:py-20 lg:py-24", className)}>
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,360px)] lg:items-end lg:gap-12">
          <HeadingBlock badge={badge} heading={heading} weight="semibold" uppercase={false} headingClassName="max-w-3xl" />
          <p className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg sm:leading-8">{description}</p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
          {items.map((item, index) => (
            <div
              key={item.title}
              className={cn("flex flex-col gap-4 lg:px-8 lg:first:pl-0 lg:last:pr-0", index > 0 && "lg:border-l lg:border-[#ece7e1]")}
            >
              <span className="size-2 rounded-full bg-primary" aria-hidden />
              <h3 className="font-sans text-xl font-bold text-text sm:text-2xl">{item.title}</h3>
              <p className="font-sans text-base leading-relaxed text-text-secondary">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StandForSection;
