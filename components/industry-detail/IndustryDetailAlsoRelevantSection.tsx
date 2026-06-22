import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import StarIcon from "@/assets/icons/StarIcon";
import type { AlsoRelevantSectionContent } from "@/components/content/types";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";

type IndustryDetailAlsoRelevantSectionProps = Omit<AlsoRelevantSectionContent, "type">;

const IndustryDetailAlsoRelevantSection = ({ badge, items }: IndustryDetailAlsoRelevantSectionProps) => {
  return (
    <section className="bg-[#fdfaf7] py-16 sm:py-20 lg:py-24">
      <div className="container flex flex-col gap-10 lg:gap-12">
        <div className="flex items-center gap-6">
          <div className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#1A1612] px-5 py-2 text-white shadow-[0_4px_24px_rgba(0,0,0,0.2)]">
            <StarIcon />
            <span className="font-sans text-xs font-bold uppercase tracking-[0.08em]">{badge}</span>
          </div>
          <div className="hidden h-px flex-1 bg-[#ece7e1] sm:block" aria-hidden />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => {
            const content = (
              <>
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image as StaticImageData}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                <div className="flex flex-col gap-3 p-6">
                  <h3 className="font-sans text-xl font-bold text-text">{item.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-text-secondary">{item.description}</p>
                  <span className="inline-flex items-center gap-2 font-sans text-sm font-medium text-primary">
                    {item.cta}
                    <ArrowRightIcon className="text-primary" />
                  </span>
                </div>
              </>
            );

            if (item.href) {
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)] transition-transform hover:-translate-y-1"
                >
                  {content}
                </Link>
              );
            }

            return (
              <div
                key={item.title}
                className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
              >
                {content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IndustryDetailAlsoRelevantSection;
