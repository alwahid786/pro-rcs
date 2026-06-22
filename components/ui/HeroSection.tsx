"use client";

import ArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";
import type { HeadingSegment, PageButton } from "@/components/content/types";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import { cn } from "@/lib/utils";
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

const HeroSection = ({ heading, description, primaryButton, secondaryButton, className }: HeroSectionProps) => {
  return (
    <div className={cn("relative z-10 flex flex-col items-center gap-10 px-5 py-20 text-center sm:gap-12 md:py-30", className)}>
      <div className="absolute top-1/2 left-1/2 h-30 w-175 -translate-y-1/2 rounded-full bg-[#C04A12]/40 blur-[80px]" />
      <RoatatingStar position="top-0 right-[-30px]" width="130" />
      <RoatatingStar position="bottom-[-30px] left-[-30px]" width="130" />
      <div className="flex max-w-6xl flex-col items-center gap-6 sm:gap-8">
        <Heading as="h1" align="center" size="display" className="lg:text-[62px]!">
          {heading.map((segment, index) => (
            <span key={index}>
              {segment.breakBefore && <br />}
              {segment.highlight ? (
                <span className="text-primary">{segment.text}</span>
              ) : (
                segment.text
              )}
            </span>
          ))}
        </Heading>

        <Heading as="p" align="center" tone="muted" className="max-w-2xl">
          {description}
        </Heading>
      </div>

      <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
        <Button
          href={secondaryButton.href}
          variant="secondary"
          size="md"
          icon={<ArrowRightIcon width="20" height="20" />}
          className="w-fit transition-transform duration-300 hover:-translate-y-0.5"
        >
          {secondaryButton.label}
        </Button>
        <Button
          href={primaryButton.href}
          variant="primary"
          size="md"
          icon={<ArrowRightIcon width="20" height="20" />}
          className="w-fit transition-transform duration-300 hover:-translate-y-0.5"
        >
          {primaryButton.label}
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
