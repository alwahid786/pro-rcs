import GradientBg from "@/components/ui/GradientBg";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import type { StrategyCardData } from "./strategy-section-data";

const StrategyCard = ({ title, subtitle, description, listItems, image, imageClassName }: StrategyCardData) => {
  return (
    <article className="relative overflow-hidden rounded-3xl px-6 py-8 shadow-md sm:px-8 sm:py-10">
      <span className="absolute inset-0 bottom-0 left-0 z-0 rotate-180 opacity-50">
        <GradientBg />
      </span>

      <div className="relative z-10">
        <Heading as="h3" multicolor={title} size="display-sm" uppercase={false} />

        <p className="mt-3 font-sans text-xl font-semibold italic leading-[142%] tracking-[-0.02em] text-text sm:text-2xl lg:mt-4 lg:text-[26px]">
          {subtitle}
        </p>

        <p className="mt-4 font-sans text-base font-medium leading-[142%] text-text-secondary lg:mt-5 lg:text-[18px]">
          {description}
        </p>

        {listItems && listItems.length > 0 && (
          <ul className="mt-4 space-y-1 font-sans text-base font-medium leading-[142%] text-text-secondary lg:mt-5 lg:text-[18px]">
            {listItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2.5 size-1.5 shrink-0 rounded-full bg-text-secondary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <Image src={image} alt="" aria-hidden className={imageClassName} />
    </article>
  );
};

export default StrategyCard;
