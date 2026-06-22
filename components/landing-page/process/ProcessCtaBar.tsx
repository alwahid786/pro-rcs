"use client";
import processImgs from "@/assets/imgs/process-imgs.png";
import Button from "@/components/ui/Button";
import Image from "next/image";
import ArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";

import { processSectionContent } from "./data";
import RoatatingStar from "@/components/ui/RoatatingStar";

const ProcessCtaBar = () => {
  const { cta } = processSectionContent;

  return (
    <section className="relative">
      <RoatatingStar position="top-[-50px] right-[30px]" width="80" className="max-[1100px]:hidden" />
      <section className="relative z-2 flex flex-col items-stretch gap-4 rounded-xl px-5 py-3 glass shadow-[0px_4px_10px_0px_#0000001C] sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
          <Image src={processImgs} alt="Business partners" className="h-10 w-auto shrink-0 object-contain" sizes="200px" />
          <p className="text-center font-sans text-base font-medium leading-snug text-text sm:text-left sm:text-lg">
            {cta.textPrefix} <span className="font-semibold text-primary">{cta.textHighlight}</span>
          </p>
        </div>
        <Button href="/contact" variant="primary" icon={<ArrowRightIcon width="20" height="20" />} iconPosition="right" className="w-full shrink-0 sm:w-auto">
          {cta.buttonLabel}
        </Button>
      </section>
    </section>
  );
};

export default ProcessCtaBar;
