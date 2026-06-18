import AboutSection from "@/components/landing-page/AboutSection";
import FaqSection from "@/components/landing-page/FaqSection";
import Hero from "@/components/landing-page/Hero";
import HowItWorksSection from "@/components/landing-page/HowItWorksSection";
import ProcessSection from "@/components/landing-page/ProcessSection";
import RealProblemsSection from "@/components/landing-page/RealProblemsSection";
import ResultsSection from "@/components/landing-page/ResultsSection";
import StrategySection from "@/components/landing-page/StrategySection";
import TestimonialsSection from "@/components/landing-page/TestimonialsSection";
import UpperFooterSection from "@/components/landing-page/UpperFooterSection";
import WhatSetsApartSection from "@/components/landing-page/WhatSetsApartSection";
import Image from "next/image";

import service1 from "@/assets/imgs/services/service-1.png";
import service1Mob from "@/assets/imgs/services/service-1-mb.png";

export default function Home() {
  return (
    <main className="flex-1">
      <Hero />
      <ResultsSection />
      <StrategySection />
      <AboutSection />
      <HowItWorksSection />

      <section className="container mx-auto bg-pink-300">
        <article className="relative max-w-225 overflow-hidden">
          <div
            className="hidden max-[900px]:block absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${service1Mob.src})`,
            }}
          />

          <div
            className="
              absolute top-3.75 left-0 z-10
              px-6 py-4
              text-xl font-medium text-black
              glass rounded-full
              max-[900px]:static
              max-[900px]:inline-block
              max-[900px]:mb-6
              max-[900px]:ml-5
              max-[900px]:mt-5
              max-[900px]:text-white
            "
          >
            Consulting & Strategy
          </div>

          <Image src={service1} alt="service" className="w-full h-full object-contain max-[900px]:hidden" priority />

          <div
            className="
              absolute bottom-0 right-0 z-10
              flex flex-col gap-4
              p-4 text-base text-white

              max-[900px]:static
              max-[900px]:p-6
            "
          >
            <p>
              We help restaurant businesses transform into scalable franchise systems and support their growth through structured sales strategies.
              <br />
              What we offer:
            </p>

            <ul className="flex flex-col gap-2 pl-4 list-disc list-inside">
              <li>Franchise Development</li>
              <li>Sales Strategy</li>
              <li>Franchise Support</li>
              <li>Franchise Training</li>
              <li>Franchise Marketing</li>
              <li>Franchise Operations</li>
              <li>Franchise Finance</li>
            </ul>
          </div>
        </article>
      </section>

      <ProcessSection />
      <RealProblemsSection />
      <WhatSetsApartSection />
      <TestimonialsSection />
      <FaqSection />
      <UpperFooterSection />
    </main>
  );
}
