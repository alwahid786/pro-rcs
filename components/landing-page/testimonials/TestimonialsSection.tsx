"use client";

import TestimonialCard from "./TestimonialCard";
import { testimonialsContent } from "./data";
import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import Button from "@/components/ui/Button";
import HeadingBlock from "@/components/ui/HeadingBlock";
import RoatatingStar from "@/components/ui/RoatatingStar";
import { motion } from "motion/react";
import { useEffect, useMemo, useState } from "react";

const desktopArcPositions = {
  "-2": { x: -430, y: -24, scale: 0.84, opacity: 0.38, zIndex: 10 },
  "-1": { x: -235, y: 10, scale: 0.92, opacity: 0.72, zIndex: 20 },
  "0": { x: 0, y: 56, scale: 1, opacity: 1, zIndex: 30 },
  "1": { x: 235, y: 10, scale: 0.92, opacity: 0.72, zIndex: 20 },
  "2": { x: 430, y: -24, scale: 0.84, opacity: 0.38, zIndex: 10 },
} as const;

const getCircularOffset = (index: number, activeIndex: number, total: number) => {
  let offset = index - activeIndex;
  if (offset > total / 2) offset -= total;
  if (offset < -total / 2) offset += total;
  return offset;
};

const TestimonialsSection = () => {
  const { badge, heading, ctaLabel, items } = testimonialsContent;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 3400);

    return () => clearInterval(timer);
  }, [items.length]);

  const carouselItems = useMemo(
    () =>
      items.map((item, index) => {
        const offset = getCircularOffset(index, activeIndex, items.length);
        return { ...item, index, offset };
      }),
    [activeIndex, items],
  );

  return (
    <section className="bg-[#FFF8F4] py-16 sm:py-20 w-full lg:py-24 relative overflow-hidden">
      {/* <RoatatingStar position="top-[-100px] right-[-30px]" width="220" className="max-[1100px]:hidden" /> */}
      <div className="container flex flex-col items-center text-center">
        <HeadingBlock badge={badge} heading={heading} isCenter weight="regular" />

        <Button variant="primary" size="md" icon={<ArrowRightIcon className="text-white" />} className="mt-8 sm:mt-10">
          {ctaLabel}
        </Button>
      </div>

      <div className="relative mt-12 md:hidden sm:mt-14 lg:mt-16">
        <div className="flex items-end gap-4 overflow-x-auto px-6 pb-6 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 sm:px-10 [&::-webkit-scrollbar]:hidden">
          {items.map((item, index) => (
            <div key={`${item.brand}-${index}`} className="shrink-0">
              <TestimonialCard {...item} />
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto mt-16 hidden h-[31rem] max-w-[1450px] md:block lg:mt-20">
        <div className="absolute inset-0">
          {carouselItems.map((item) => {
            const boundedOffset = Math.max(-2, Math.min(2, item.offset)) as -2 | -1 | 0 | 1 | 2;
            const arc = desktopArcPositions[String(boundedOffset) as keyof typeof desktopArcPositions];

            return (
              <motion.div
                key={`${item.brand}-${item.index}`}
                className="absolute left-1/2 top-0 -translate-x-1/2"
                style={{ zIndex: arc.zIndex }}
                animate={{
                  x: arc.x,
                  y: arc.y,
                  scale: arc.scale,
                  opacity: arc.opacity,
                }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
              >
                <TestimonialCard quote={item.quote} brand={item.brand} logo={item.logo} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
