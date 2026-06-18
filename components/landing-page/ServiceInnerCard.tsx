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
    <article
      className={cn(
        "relative overflow-hidden",
        "max-[1100px]:min-h-130 max-[1100px]:rounded-3xl",
        "min-[1100px]:max-w-225",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat min-[1100px]:hidden"
        style={{
          backgroundImage: `url(${imageMobile.src})`,
        }}
      />

      <div className="absolute inset-0 bg-black/45 min-[1100px]:hidden" aria-hidden />

      <Image src={image} alt={category} className="hidden h-full w-full object-contain min-[1100px]:block" priority />

      <div
        className={cn(
          "relative z-10 flex h-full min-h-[inherit] flex-col",
          "max-[1100px]:justify-between max-[1100px]:p-6",
        )}
      >
        <div
          className={cn(
            "glass rounded-full px-6 py-4 text-xl font-medium",
            "max-[1100px]:mt-0 max-[1100px]:inline-block max-[1100px]:self-start max-[1100px]:text-white",
            "min-[1100px]:absolute min-[1100px]:top-3.75 min-[1100px]:left-0 min-[1100px]:text-black",
          )}
        >
          {category}
        </div>

        <div
          className={cn(
            "flex flex-col gap-4 text-base text-white",
            "max-[1100px]:mt-auto",
            "min-[1100px]:absolute min-[1100px]:right-0 min-[1100px]:bottom-0 min-[1100px]:p-4",
          )}
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
      </div>
    </article>
  );
};

export default ServiceInnerCard;
