import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { IndustryBlockSectionContent } from "@/components/content/types";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";

type IndustryBlockSectionProps = Omit<IndustryBlockSectionContent, "type"> & {
  id?: string;
  contentWidth?: "full" | "container";
};

const IndustryBlockSection = ({
  id,
  index,
  variant,
  badge,
  title,
  description,
  highlight,
  cta,
  helpItems,
  contentWidth = "full",
}: IndustryBlockSectionProps) => {
  const isDark = variant === "dark";

  return (
    <section
      id={id}
      className={cn("relative overflow-hidden py-16 sm:py-20 lg:py-24", isDark ? "bg-[#1A1612]" : "bg-[#fdfaf7]")}
    >
      {index && (
        <span
          className={cn(
            "pointer-events-none absolute top-8 right-4 font-sans text-[10rem] font-bold leading-none select-none sm:text-[14rem] lg:right-8 lg:text-[18rem]",
            isDark ? "text-white/4" : "text-black/4",
          )}
          aria-hidden
        >
          {index}
        </span>
      )}

      <div
        className={cn(
          "relative z-10",
          contentWidth === "container" ? "container" : "w-full px-5 lg:px-8 xl:px-12",
        )}
      >
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="group/content flex flex-col gap-8">
            <Badge text={badge} variant={isDark ? "glass" : "default"} />

            <Heading as="h2" weight="bold" className={cn("max-w-190 lg:text-[64px]!", isDark ? "text-white" : "text-text")}>
              {title}
            </Heading>

            <Heading as="p" tone="muted" className={cn("max-w-[90%]", isDark ? "text-white/65" : undefined)}>
              {description}
            </Heading>

            <blockquote
              className={cn(
                "border-l-2 border-primary pl-5 font-sans text-base italic leading-relaxed transition-transform duration-300 group-hover/content:translate-x-1 sm:text-lg",
                isDark ? "text-white/80" : "text-text",
              )}
            >
              {highlight}
            </blockquote>

            <Button
              href={cta.href}
              variant="primary"
              size="md"
              icon={<ArrowRightIcon className="text-white" />}
              className="w-fit transition-transform duration-300 hover:-translate-y-0.5"
            >
              {cta.label}
            </Button>
          </div>

          <div className={cn("flex flex-col gap-6 lg:border-l lg:pl-12", isDark ? "lg:border-white/10" : "lg:border-[#ece7e1]")}>
            <Heading as="h6" uppercase weight="bold" className="text-primary">
              How We Help
            </Heading>

            <ul className="flex flex-col">
              {helpItems.map((item, itemIndex) => (
                <li
                  key={item}
                  className={cn(
                    "group flex items-center justify-between gap-4 border-t py-5 transition-all duration-300 first:border-t-0 first:pt-0 hover:translate-x-1 sm:py-6",
                    isDark ? "border-white/10" : "border-[#ece7e1]",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-4">
                    <span className="flex w-8 shrink-0 items-center justify-center font-sans text-sm font-light text-primary">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("font-sans text-base leading-relaxed sm:text-lg", isDark ? "text-white" : "text-text")}>
                      {item}
                    </span>
                  </div>
                  <ArrowRightIcon className="shrink-0 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default IndustryBlockSection;
