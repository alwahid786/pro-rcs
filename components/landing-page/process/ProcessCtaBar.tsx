"use client";
import processImgs from "@/assets/imgs/process-imgs.png";
import Button from "@/components/ui/Button";
import Image from "next/image";
import ArrowRightIcon from "@iconify-react/pixelarticons/arrow-right";

import { processSectionContent } from "./data";

const ProcessCtaBar = () => {
  const { cta } = processSectionContent;

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-subtle px-4 py-5 sm:flex-row sm:px-6 sm:py-5">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
        <Image src={processImgs} alt="Business partners" className="h-10 w-auto shrink-0 object-contain" sizes="200px" />
        <p className="text-center font-sans text-base font-medium leading-snug text-text sm:text-left sm:text-lg">
          {cta.textPrefix} <span className="font-semibold text-primary">{cta.textHighlight}</span>
        </p>
      </div>

      <Button variant="primary" icon={<ArrowRightIcon width="20" height="20" />} iconPosition="right" className="">
        {cta.buttonLabel}
      </Button>
    </div>
  );
};

export default ProcessCtaBar;
