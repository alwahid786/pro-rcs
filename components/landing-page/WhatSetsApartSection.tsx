"use client";

import Heading from "@/components/ui/Heading";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { type ReactNode } from "react";
import { whatSetsApartContent, type ApartCard, type ApartIconKey } from "./what-sets-apart-data";
import GradientBg from "../ui/GradientBg";

const cardOffsets = [
  "translate-y-0 sm:translate-y-5 lg:translate-y-12",
  "translate-y-0 sm:-translate-y-5 lg:translate-y-0",
  "translate-y-0 sm:translate-y-5 lg:translate-y-10",
  "translate-y-0 sm:-translate-y-5 lg:translate-y-0",
];

const ExpertiseIcon = () => (
  <motion.svg viewBox="0 0 176 88" fill="none" aria-hidden preserveAspectRatio="none" className="h-23 w-full">
    <motion.path
      d="M0 62C30 53 58 38 96 36C126 34 151 36 176 33V88H0V62Z"
      fill="url(#expGradient)"
      initial={{ opacity: 0.65 }}
      animate={{ opacity: [0.65, 1, 0.7] }}
      transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
    />
    <defs>
      <linearGradient id="expGradient" x1="88" y1="34" x2="88" y2="86" gradientUnits="userSpaceOnUse">
        <stop stopColor="#E86D2A" stopOpacity="0.65" />
        <stop offset="1" stopColor="#E86D2A" stopOpacity="0.08" />
      </linearGradient>
    </defs>
  </motion.svg>
);

const ConsultingIcon = () => (
  <motion.svg viewBox="0 0 176 88" fill="none" aria-hidden className="h-23 w-full">
    <motion.path
      d="M12 70L56 56L102 40L164 24"
      stroke="#EB692C"
      strokeWidth="2.2"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 0.6, ease: "easeInOut" }}
    />
    {[12, 56, 102, 164].map((x, idx) => (
      <motion.circle
        key={x}
        cx={x}
        cy={[70, 56, 40, 24][idx]}
        r="4"
        fill="#EB692C"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.15, 1] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: idx * 0.16, ease: "easeOut" }}
      />
    ))}
  </motion.svg>
);

const ScaleIcon = () => (
  <div className="flex h-23 w-full items-end justify-between gap-4">
    {[0.74, 1, 0.8].map((h, idx) => (
      <motion.span
        key={idx}
        className="flex-1 rounded-t-md bg-primary"
        style={{ height: `${h * 64}px` }}
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, delay: idx * 0.14, ease: "easeInOut" }}
      />
    ))}
  </div>
);

const GlobalIcon = () => (
  <motion.svg viewBox="0 0 176 92" aria-hidden className="h-23 w-full">
    <g transform="translate(88 46)">
      <circle r="31" fill="#E2A13F" />
      <circle r="25.5" fill="#fff" />
      <circle r="21" fill="#D45F1E" />
      <circle r="14.5" fill="none" stroke="#fff" strokeWidth="2.4" />
      <circle r="4" fill="#fff" />
      <rect x="-3.2" y="-35.5" width="6.4" height="10.2" rx="2.4" fill="#fff" />
      <motion.circle
        r="31"
        fill="none"
        stroke="#E2A13F"
        strokeWidth="3"
        strokeDasharray="196"
        strokeDashoffset="20"
        animate={{ strokeDashoffset: [20, 0, 20] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
      />
    </g>
  </motion.svg>
);

const iconMap: Record<ApartIconKey, () => ReactNode> = {
  expertise: ExpertiseIcon,
  consulting: ConsultingIcon,
  scale: ScaleIcon,
  global: GlobalIcon,
};

const GlassCard = ({ card, className }: { card: ApartCard; className?: string }) => {
  const Icon = iconMap[card.iconKey];
  return (
    <article className={cn("relative isolate", className)}>
      <div className="absolute left-1/2 top-0 z-0 -translate-x-1/2 translate-y-[-56%]">
        <div className="flex size-16 items-center justify-center rounded-full bg-[linear-gradient(180deg,#da671f_0%,#bd4d10_100%)] text-4xl font-medium text-white shadow-[0_16px_30px_rgba(218,103,31,0.5)]">
          {card.number}
        </div>
      </div>

      <div className="relative z-20 bg-white/10 shadow-md border border-white/70 backdrop-blur-[2px] py-10 px-6 rounded-3xl">
        <Heading as="h3" multicolor={card.title} uppercase={false} className="mt-6 text-center text-[2.2rem] leading-[1.1] tracking-[-0.02em]" />

        <div className="mt-5 min-h-23 w-full">{Icon()}</div>

        <p className="mt-4 text-center font-sans text-base leading-relaxed text-text-secondary">{card.description}</p>
      </div>
    </article>
  );
};

const WhatSetsApartSection = () => {
  const { badge, heading, cards } = whatSetsApartContent;
  return (
    <section className="relative overflow-hidden bg-[#FFF8F4] py-16 sm:py-20 lg:py-24">
      <div className="absolute inset-0 ">
        <div className={cn("pointer-events-none relative h-full w-full overflow-hidden")} aria-hidden>
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-30 w-full rounded-full bg-[#C04A12]/80 blur-[80px]" />
        </div>
      </div>
      <div className="container relative z-2">
        <HeadingBlock badge={badge} heading={heading} isCenter weight="regular" />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-14 lg:grid-cols-4 lg:gap-6">
          {cards.map((card, index) => (
            <GlassCard key={card.number} card={card} className={cardOffsets[index]} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatSetsApartSection;
