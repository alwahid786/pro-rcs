"use client";
import ArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";
import type { HeadingSegment, PageButton } from "@/components/content/types";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
import Link from "next/link";
import RoatatingStar from "./RoatatingStar";

export type HeroHeadingSegment = HeadingSegment;
export type HeroSectionButton = PageButton;

export type HeroSectionProps = {
  heading: HeadingSegment[];
  description: string;
  primaryButton: PageButton;
  secondaryButton: PageButton;
  className?: string;
};

const buttonBaseClasses = "custom-btn inline-flex w-full cursor-pointer items-center justify-center rounded-full font-medium transition-colors sm:w-auto";

const buttonVariantClasses = {
  primary: "bg-primary text-white shadow-btn-primary btn-primary text-base px-6 py-3",
  secondary: "bg-secondary text-white shadow-btn-secondary btn-secondary text-base px-6 py-3",
};

const HeroSectionButtonLink = ({ href, label, variant }: HeroSectionButton & { variant: "primary" | "secondary" }) => {
  return (
    <Link href={href} className={cn(buttonBaseClasses, buttonVariantClasses[variant])}>
      <span className="inline-flex items-center justify-center gap-2">
        {label}
        <ArrowRightIcon width="20" height="20" />
      </span>
    </Link>
  );
};

const HeroSection = ({ heading, description, primaryButton, secondaryButton, className }: HeroSectionProps) => {
  return (
    <div className={cn("flex relative z-10 px-5 md:py-30 py-20 flex-col items-center gap-10 text-center sm:gap-12", className)}>
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 h-30 w-175 rounded-full bg-[#C04A12]/40 blur-[80px]" />
      <RoatatingStar position="top-0 right-[-30px]" width="130" />
      <RoatatingStar position="bottom-[-30px] left-[-30px]" width="130" />
      <div className="flex max-w-6xl flex-col items-center gap-6 sm:gap-8">
        <Heading as="h1" align="center" size="display" className="lg:text-[62px]!">
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

        <Heading as="p" align="center" tone="muted" className="max-w-2xl">
          {description}
        </Heading>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
        <HeroSectionButtonLink {...secondaryButton} variant="secondary" />
        <HeroSectionButtonLink {...primaryButton} variant="primary" />
      </div>
    </div>
  );
};

export default HeroSection;
