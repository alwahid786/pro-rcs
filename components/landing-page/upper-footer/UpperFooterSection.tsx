"use client";

import ArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";
import { upperFooterImages } from "./data";
import WavyForeground from "./WavyForeground";
import Button from "@/components/ui/Button";
import GradientText from "@/components/ui/GradientText";
import Heading from "@/components/ui/Heading";
import { motion, useInView } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import RoatatingStar from "@/components/ui/RoatatingStar";

const highlightColors = ["#eb692c", "#f08a52", "#e57638"];

const popTransition = {
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1] as const,
};

const UpperFooterSection = () => {
  const imagesRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(imagesRef, { once: true, amount: 0.35 });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);

    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  const imageRestY = isMobile ? "0%" : "18%";
  const imageHiddenY = isMobile ? "45%" : "75%";

  return (
    <section className="relative w-full overflow-hidden bg-white pb-0 pt-16 sm:pt-20 lg:pt-24">
      <RoatatingStar position="top-[150px] left-[-80px]" width="220" className="max-[1100px]:hidden" />
      <RoatatingStar position="top-[20px] right-[-20px]" width="120" className="max-[1100px]:hidden" />
      <section className="relative z-2">
        <div className="relative mx-auto max-w-305 px-5 text-center">
          <Heading as="h2" align="center" className="mx-auto max-w-5xl font-bold">
            Ready To Scale Your{" "}
            <GradientText colors={highlightColors} animationSpeed={3} showBorder={false} direction="vertical">
              Restaurant
            </GradientText>{" "}
            Or{" "}
            <GradientText colors={highlightColors} animationSpeed={3} showBorder={false} direction="vertical">
              Franchise
            </GradientText>{" "}
            With Confidence?
          </Heading>

          <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-12 sm:w-auto sm:flex-row sm:justify-center">
            <Button variant="secondary" size="md" icon={<ArrowRightIcon width="20" height="20" />} className="w-full sm:w-auto">
              Get A Quote
            </Button>
            <Button variant="primary" size="md" icon={<ArrowRightIcon width="20" height="20" />} className="w-full sm:w-auto">
              Book Consultation
            </Button>
          </div>
        </div>

        <div ref={imagesRef} className="relative mt-14 w-full overflow-hidden sm:mt-16 lg:mt-20">
          <div className="relative h-72 w-full sm:h-68 lg:h-80">
            <div className="absolute inset-x-0 bottom-0 z-10 flex w-full items-end justify-center gap-6 px-4 sm:gap-14 sm:px-6 lg:gap-24">
              {upperFooterImages.map((image, index) => (
                <motion.div
                  key={image.alt}
                  initial={{ y: imageHiddenY, opacity: 0 }}
                  animate={isInView ? { y: imageRestY, opacity: 1 } : { y: imageHiddenY, opacity: 0 }}
                  transition={{ ...popTransition, delay: index * 0.1 }}
                  className={`relative w-[30%] max-w-64 shrink-0 sm:max-w-72 lg:max-w-80 ${image.rotateClass}`}
                >
                  <Image src={image.src} alt={image.alt} className="aspect-[4/5] h-auto w-full object-contain" sizes="(max-width: 640px) 30vw, 320px" />
                </motion.div>
              ))}
            </div>

            <WavyForeground />
          </div>
        </div>
      </section>
    </section>
  );
};

export default UpperFooterSection;
