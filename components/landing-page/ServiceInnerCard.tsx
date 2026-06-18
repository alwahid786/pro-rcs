import type { ServiceData } from "@/components/landing-page/service-data";
import { cn } from "@/lib/utils";
import Image from "next/image";

const ServiceInnerCard = ({
  category,
  headline,
  offeringsHeading,
  points,
  footerNote,
  image,
  imageMobile,
  className,
}: ServiceData & { className?: string }) => {
  return (
    <article className={cn("relative max-w-225 overflow-hidden", className)}>
      <div
        className="absolute inset-0 hidden bg-cover bg-center bg-no-repeat max-[900px]:block"
        style={{
          backgroundImage: `url(${imageMobile.src})`,
        }}
      />

      <div
        className="
        glass absolute top-3.75 left-0 z-10
        rounded-full px-6 py-4
        text-xl font-medium text-black
        max-[900px]:static
        max-[900px]:mt-5
        max-[900px]:mb-6
        max-[900px]:ml-5
        max-[900px]:inline-block
        max-[900px]:text-white
      "
      >
        {category}
      </div>

      <Image src={image} alt={category} className="h-full w-full object-contain max-[900px]:hidden" priority />

      <div
        className="
        absolute right-0 bottom-0 z-10
        flex flex-col gap-4
        p-4 text-base text-white
        max-[900px]:static
        max-[900px]:p-6
      "
      >
        <p>{headline}</p>

        {offeringsHeading && <p className="font-medium">{offeringsHeading}</p>}

        <ul className="flex list-inside list-disc flex-col gap-2 pl-4">
          {points.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        {footerNote && <p>{footerNote}</p>}
      </div>
    </article>
  );
};

export default ServiceInnerCard;
