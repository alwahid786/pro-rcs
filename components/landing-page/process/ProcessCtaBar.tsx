"use client";
import processImgs from "@/assets/imgs/process-imgs.png";
import Button from "@/components/ui/Button";
import Image from "next/image";
import ArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";

import { processSectionContent } from "./data";
import { div } from "motion/react-client";

const ProcessCtaBar = () => {
  const { cta } = processSectionContent;

  return (
    <section className="shadow-[0px_4px_10px_0px_#0000001C] mt-10 px-5 py-3 rounded-xl glass flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <Image src={processImgs} alt="Business partners" className="h-10 w-auto shrink-0 object-contain" sizes="200px" />
        <p className="text-center font-sans text-base font-medium leading-snug text-text sm:text-left sm:text-lg">
          {cta.textPrefix} <span className="font-semibold text-primary">{cta.textHighlight}</span>
        </p>
      </div>
      <Button variant="primary" icon={<ArrowRightIcon width="20" height="20" />} iconPosition="right" className="w-full shrink-0 sm:w-auto">
        {cta.buttonLabel}s
      </Button>
    </section>
  );
};

export default ProcessCtaBar;
