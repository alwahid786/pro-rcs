import Gemini from "@/assets/icons/industry/Gemini";
import type { TestimonialSectionContent } from "@/components/content/types";
import Image, { type StaticImageData } from "next/image";

type IndustryDetailTestimonialSectionProps = Omit<TestimonialSectionContent, "type">;

const GalleryImage = ({ src, alt, className }: { src: StaticImageData | string; alt: string; className?: string }) => (
  <div className={`group/image relative overflow-hidden rounded-2xl ${className ?? ""}`}>
    <Image
      src={src}
      alt={alt}
      fill
      className="object-cover transition-transform duration-500 group-hover/image:scale-105"
      sizes="(max-width: 1024px) 100vw, 50vw"
    />
  </div>
);

const IndustryDetailTestimonialSection = ({ quote, attribution, images }: IndustryDetailTestimonialSectionProps) => {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2">
      <div className="group flex flex-col justify-center gap-8 bg-white px-5 py-16 transition-colors duration-300 hover:bg-[#fdfaf7] sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <div className="h-0.5 w-8 bg-primary transition-all duration-300 group-hover:w-12" aria-hidden />

        <blockquote className="font-sans text-2xl font-medium italic leading-snug text-text sm:text-3xl sm:leading-tight lg:text-[2rem] lg:leading-[1.35]">
          &ldquo;{quote}&rdquo;
        </blockquote>

        <div className="flex items-center gap-4 transition-transform duration-300 group-hover:translate-x-1">
          <Gemini />
          <div className="flex flex-col gap-0.5">
            <p className="font-sans text-base font-bold text-text">{attribution.title}</p>
            <p className="font-sans text-sm text-text-secondary">{attribution.subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid min-h-[320px] grid-cols-2 grid-rows-2 gap-3 bg-[#fdfaf7] p-5 sm:gap-4 sm:p-8 lg:min-h-[480px]">
        <GalleryImage src={images.featured} alt="Restaurant interior" className="col-span-1 row-span-2 min-h-[280px] lg:min-h-full" />
        <GalleryImage src={images.operations} alt="Chef plating a dish" className="min-h-[140px]" />
        <GalleryImage src={images.growth} alt="Dining table setting" className="min-h-[140px]" />
      </div>
    </section>
  );
};

export default IndustryDetailTestimonialSection;
