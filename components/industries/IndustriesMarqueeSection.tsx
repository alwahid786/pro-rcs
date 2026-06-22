"use client";

import MarqueeStar from "@/assets/icons/MarqueeStar";
import type { MarqueeSectionContent } from "@/components/content/types";
import Marquee from "react-fast-marquee";

type IndustriesMarqueeSectionProps = Omit<MarqueeSectionContent, "type">;

const IndustriesMarqueeSection = ({ items }: IndustriesMarqueeSectionProps) => {
  return (
    <section className="bg-[#1A1612] py-4 sm:py-5">
      <Marquee autoFill speed={35} gradient={false}>
        {items.map((item) => (
          <div key={item} className="mx-6 flex items-center gap-6 sm:mx-8">
            <span className="font-sans text-[12px] font-normal tracking-[0.2em] text-white uppercase">{item}</span>
            <MarqueeStar />
          </div>
        ))}
      </Marquee>
    </section>
  );
};

export default IndustriesMarqueeSection;
