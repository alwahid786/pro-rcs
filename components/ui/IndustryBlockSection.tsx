import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import StarIcon from "@/assets/icons/StarIcon";
import type { IndustryBlockSectionContent } from "@/components/content/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

type IndustryBlockSectionProps = Omit<IndustryBlockSectionContent, "type"> & {
  id?: string;
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
            isDark ? "text-white/[0.04]" : "text-black/[0.04]",
          )}
          aria-hidden
        >
          {index}
        </span>
      )}

      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
          <div className="flex flex-col gap-8">
            <div
              className={cn(
                "inline-flex w-fit items-center gap-2 rounded-full px-5 py-2 shadow-[0_4px_24px_rgba(0,0,0,0.15)]",
                isDark ? "border border-white/10 bg-white/5 text-white" : "border border-black/10 bg-[#1A1612] text-white",
              )}
            >
              <StarIcon />
              <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{badge}</span>
            </div>

            <h2 className={cn("font-sans text-4xl font-bold tracking-tight sm:text-5xl lg:text-[3.5rem]", isDark ? "text-white" : "text-text")}>
              {title}
            </h2>

            <p className={cn("font-sans text-base leading-relaxed sm:text-lg sm:leading-8", isDark ? "text-white/65" : "text-text-secondary")}>
              {description}
            </p>

            <blockquote
              className={cn(
                "border-l-2 border-primary pl-5 font-sans text-base italic leading-relaxed sm:text-lg",
                isDark ? "text-white/80" : "text-text",
              )}
            >
              {highlight}
            </blockquote>

            <Link
              href={cta.href}
              className="custom-btn btn-primary inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-medium text-white shadow-btn-primary sm:w-auto"
            >
              {cta.label}
              <ArrowRightIcon className="text-white" />
            </Link>
          </div>

          <div className="flex flex-col gap-6">
            <p className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary">How We Help</p>

            <ul className="flex flex-col">
              {helpItems.map((item, itemIndex) => (
                <li
                  key={item}
                  className={cn(
                    "flex items-center justify-between gap-4 border-t py-5 first:border-t-0 first:pt-0 sm:py-6",
                    isDark ? "border-white/10" : "border-[#ece7e1]",
                  )}
                >
                  <div className="flex min-w-0 items-start gap-4">
                    <span className="shrink-0 font-sans text-sm font-bold text-primary">
                      {String(itemIndex + 1).padStart(2, "0")}
                    </span>
                    <span className={cn("font-sans text-base leading-relaxed sm:text-lg", isDark ? "text-white" : "text-text")}>
                      {item}
                    </span>
                  </div>
                  <ArrowRightIcon className="shrink-0 text-primary" />
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
