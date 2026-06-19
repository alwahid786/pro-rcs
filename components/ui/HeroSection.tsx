import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import type { HeadingSegment, PageButton } from "@/components/content/types";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";

export type HeroHeadingSegment = HeadingSegment;
export type HeroSectionButton = PageButton;

export type HeroSectionProps = {
  heading: HeadingSegment[];
  description: string;
  primaryButton: PageButton;
  secondaryButton: PageButton;
  className?: string;
};

const buttonBaseClasses =
  "custom-btn inline-flex w-full cursor-pointer items-center justify-center rounded-full font-medium transition-colors sm:w-auto";

const buttonVariantClasses = {
  primary: "bg-primary text-white shadow-btn-primary btn-primary text-base px-6 py-3",
  secondary: "bg-secondary text-white shadow-btn-secondary btn-secondary text-base px-6 py-3",
};

const HeroSectionButtonLink = ({
  href,
  label,
  variant,
}: HeroSectionButton & { variant: "primary" | "secondary" }) => {
  return (
    <Link href={href} className={cn(buttonBaseClasses, buttonVariantClasses[variant])}>
      <span className="inline-flex items-center justify-center gap-2">
        {label}
        <ArrowRightIcon />
      </span>
    </Link>
  );
};

const HeroSection = ({ heading, description, primaryButton, secondaryButton, className }: HeroSectionProps) => {
  return (
    <div className={cn("flex flex-col items-center text-center", className)}>
      <Heading as="h1" align="center" size="display" className="max-w-4xl">
        {heading.map((segment, index) =>
          segment.highlight ? (
            <span key={index} className="text-primary">
              {segment.text}
            </span>
          ) : (
            <span key={index}>{segment.text}</span>
          ),
        )}
      </Heading>

      <Heading as="p" align="center" tone="muted" className="mt-6 max-w-2xl sm:mt-8">
        {description}
      </Heading>

      <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-12 sm:w-auto sm:flex-row">
        <HeroSectionButtonLink {...secondaryButton} variant="secondary" />
        <HeroSectionButtonLink {...primaryButton} variant="primary" />
      </div>
    </div>
  );
};

export default HeroSection;
