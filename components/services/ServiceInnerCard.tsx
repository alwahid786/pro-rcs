import type { ServiceData } from "@/components/services/service-section-data";
import { cn } from "@/lib/utils";

const ServiceInnerCard = ({ category, headline, offeringsHeading, points, footerNote, image, imageMobile, className }: ServiceData & { className?: string }) => {
  return (
    <article
      className={cn(
        "relative w-full",
        "max-[1100px]:flex max-[1100px]:min-h-130 max-[1100px]:flex-col max-[1100px]:gap-6 max-[1100px]:rounded-none",
        "min-[1100px]:min-h-137.5 min-[1100px]:max-w-225",
        className,
      )}
    >
      <div
        className="absolute inset-0 bg-cover bg-center rounded-2xl bg-no-repeat min-[1100px]:hidden"
        style={{
          backgroundImage: `url(${imageMobile.src})`,
        }}
        aria-hidden
      />

      <div
        className="absolute inset-0 hidden bg-cover bg-left rounded-2xl bg-no-repeat min-[1100px]:block"
        style={{
          backgroundImage: `url(${image.src})`,
        }}
        role="img"
        aria-label={category}
      />

      <div
        className={cn(
          "glass relative z-20 flex items-center justify-center rounded-full px-4 py-3 min-[1100px]:min-w-65 text-xl font-medium",
          "max-[1100px]:mx-6 max-[1100px]:inline-block max-[1100px]:self-start max-[1100px]:text-white",
          "min-[1100px]:absolute mt-4 min-[1100px]:left-1 min-[1100px]:text-black border border-gray-200/50 shadow-sm",
        )}
      >
        {category}
      </div>

      <div
        className={cn(
          "relative z-10 flex flex-col gap-4 text-base text-white",
          "max-[1100px]:p-6",
          "min-[1100px]:absolute min-[1100px]:left-[10px] min-[1100px]:bottom-[45px] min-[1100px]:p-4",
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
    </article>
  );
};

export default ServiceInnerCard;
