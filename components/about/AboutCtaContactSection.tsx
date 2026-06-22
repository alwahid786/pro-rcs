"use client";

import Clock from "@/assets/icons/about/Clock";
import Email from "@/assets/icons/about/Email";
import LocationOrange from "@/assets/icons/about/LocationOrange";
import ArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";
import StarIcon from "@/assets/icons/StarIcon";
import type { CtaContactItem, CtaContactSectionContent } from "@/components/content/types";
import Button from "@/components/ui/Button";
import Heading from "@/components/ui/Heading";
import type { ComponentType } from "react";

type AboutCtaContactSectionProps = Omit<CtaContactSectionContent, "type">;

const contactIconMap: Record<string, ComponentType> = {
  "Email Us": Email,
  "Our Office": LocationOrange,
  "Office Hours": Clock,
};

const ContactIcon = ({ label }: { label: string }) => {
  const Icon = contactIconMap[label];

  if (!Icon) return null;

  return <Icon />;
};

const ContactItem = ({ label, value, href }: CtaContactItem) => {
  const content = (
    <>
      <ContactIcon label={label} />
      <div className="flex flex-col gap-1 text-left">
        <span className="font-sans text-xs text-white/45">{label}</span>
        <span className="font-sans text-sm font-medium text-white sm:text-base">{value}</span>
      </div>
    </>
  );

  if (href) {
    return (
      <a href={href} className="flex items-center gap-3 transition-opacity hover:opacity-90 sm:gap-4">
        {content}
      </a>
    );
  }

  return <div className="flex items-center gap-3 sm:gap-4">{content}</div>;
};

const AboutCtaContactSection = ({ badge, heading, description, primaryButton, secondaryButton, contactItems }: AboutCtaContactSectionProps) => {
  return (
    <section className="relative overflow-hidden bg-[#1A1612] py-16 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden>
        <div className="h-80 w-full max-w-175 rounded-full bg-[#C04A12]/45 blur-[100px]" />
      </div>

      <div className="container relative z-10 flex flex-col items-center gap-10 text-center sm:gap-12">
        <div className="flex max-w-4xl flex-col items-center gap-6 sm:gap-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm text-white shadow-[0_4px_24px_rgba(0,0,0,0.35)]">
            <StarIcon />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{badge}</span>
          </div>

          <Heading as="h2" align="center" size="display" className="text-white lg:text-[62px]!">
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

          <p className="max-w-2xl font-sans text-base leading-relaxed text-white/60 sm:text-lg sm:leading-8">{description}</p>
        </div>

        <div className="flex w-full flex-col items-center justify-center gap-4 sm:w-auto sm:flex-row">
          <Button
            href={primaryButton.href}
            variant="primary"
            size="md"
            icon={<ArrowRightIcon width="20" height="20" className="text-white" />}
            className="w-full sm:w-auto"
          >
            {primaryButton.label}
          </Button>
          <Button
            href={secondaryButton.href}
            variant="ghost"
            size="md"
            icon={<ArrowRightIcon width="20" height="20" className="text-white" />}
            className="w-full sm:w-auto"
          >
            {secondaryButton.label}
          </Button>
        </div>

        <div className="h-px w-full max-w-5xl bg-white/10" />

        <div className="grid w-full max-w-5xl grid-cols-1 gap-8 sm:grid-cols-3 sm:gap-6">
          {contactItems.map((item) => (
            <ContactItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutCtaContactSection;
