import GradientBg from "@/components/ui/GradientBg";
import Heading from "@/components/ui/Heading";
import Image from "next/image";
import type { StrategyCardData } from "./data";

const StrategyCard = ({ title, subtitle, description, listItems, image, imageClassName }: StrategyCardData) => {
  return (
    <article className="relative overflow-hidden rounded-3xl px-6 py-8 shadow-md sm:px-8 sm:py-10">
      <span className="absolute inset-0 bottom-0 left-0 z-0 rotate-180 opacity-50">
        <GradientBg />
      </span>

      <div className="relative z-10 flex flex-col gap-3 lg:gap-4">
        <Heading as="h3" multicolor={title} size="display-sm" uppercase={false} />

        <p className="font-sans text-xl font-semibold italic leading-[142%] tracking-[-0.02em] text-text sm:text-2xl lg:text-[26px]">
          {subtitle}
        </p>

        <div className="flex flex-col gap-4 lg:gap-5">
          <p className="font-sans text-base font-medium leading-[142%] text-text-secondary lg:text-[18px]">
            {description}
          </p>

          {listItems && listItems.length > 0 && (
            <ul className="flex flex-col gap-1 font-sans text-base font-medium leading-[142%] text-text-secondary lg:text-[18px]">
              {listItems.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="size-1.5 shrink-0 translate-y-2.5 rounded-full bg-text-secondary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <Image src={image} alt="" aria-hidden className={imageClassName} />
    </article>
  );
};

export default StrategyCard;
