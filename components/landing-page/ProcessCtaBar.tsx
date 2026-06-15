import processImgs from "@/assets/imgs/process-imgs.png";
import BgArrowIcon from "@/assets/icons/BgArrowIcon";
import Button from "@/components/ui/Button";
import Image from "next/image";
import { processSectionContent } from "./process-section-data";

const ProcessCtaBar = () => {
  const { cta } = processSectionContent;

  return (
    <div className="mt-8 flex flex-col items-center justify-between gap-6 rounded-3xl bg-subtle px-5 py-6 sm:flex-row sm:px-8 sm:py-7">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-5">
        <Image
          src={processImgs}
          alt="Business partners"
          className="h-14 w-auto shrink-0 object-contain sm:h-16"
          sizes="200px"
        />
        <p className="text-center font-sans text-base font-medium leading-snug text-text sm:text-left sm:text-lg">
          {cta.textPrefix} <span className="font-semibold text-primary">{cta.textHighlight}</span>
        </p>
      </div>

      <Button variant="primary" size="md" icon={<BgArrowIcon />} iconPosition="left" className="w-full shrink-0 sm:w-auto">
        {cta.buttonLabel}
      </Button>
    </div>
  );
};

export default ProcessCtaBar;
