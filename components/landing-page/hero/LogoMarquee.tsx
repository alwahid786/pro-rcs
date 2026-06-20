"use client";

import { heroCarouselLogos } from "./data";
import Image from "next/image";
import Marquee from "react-fast-marquee";

const LogoMarquee = () => {
  return (
    <div className="relative w-full">
      <Marquee autoFill speed={28} pauseOnHover>
        {heroCarouselLogos.map((logo, index) => (
          <div key={`${logo.src.src}-${index}`} className="mx-5 flex size-[4.5rem] shrink-0 items-center justify-center overflow-hidden rounded-full sm:mx-7 sm:size-20">
            <Image src={logo.src} alt={logo.alt} width={80} height={80} className="h-full w-full object-contain p-1.5" sizes="80px" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default LogoMarquee;
