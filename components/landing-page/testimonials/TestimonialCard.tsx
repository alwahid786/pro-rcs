import type { Testimonial } from "./data";
import Image from "next/image";
import testimonialBg from "@/assets/imgs/test-ele.png";

const QuoteIcon = () => (
  <svg width="28" height="22" viewBox="0 0 28 22" fill="none" aria-hidden className="text-primary">
    <path
      d="M0 21.5V9.8C0 4.4 3.8 0 8.5 0L9.8 3.8C6.2 4.8 3.8 7.6 3.8 10.8H8.5V21.5H0ZM16.2 21.5V9.8C16.2 4.4 20 0 24.7 0L26 3.8C22.4 4.8 20 7.6 20 10.8H24.7V21.5H16.2Z"
      fill="currentColor"
    />
  </svg>
);

const Stars = () => (
  <div className="flex items-center justify-center gap-1" aria-label="5 out of 5 stars">
    {Array.from({ length: 5 }).map((_, index) => (
      <svg key={index} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" className="text-text" aria-hidden>
        <path d="M7 0L8.85 4.63L14 5.27L10.5 8.87L11.35 14L7 11.63L2.65 14L3.5 8.87L0 5.27L5.15 4.63L7 0Z" />
      </svg>
    ))}
  </div>
);

const TestimonialCard = ({ quote, brand, logo }: Testimonial) => {
  return (
    <article className="flex min-h-[25rem] w-[17.5rem] overflow-hidden relative shrink-0 flex-col rounded-3xl bg-white px-6 py-8  border border-primary/30 shadow-lg sm:w-80 sm:px-7 sm:py-9">
      <Image src={testimonialBg} alt="Testimonial background" className="absolute drop-shadow-lg block bottom-[-18%] right-0 w-full" sizes="100%" />
      <section className="relative z-4 flex flex-1 flex-col gap-8">
        <div className="flex flex-col gap-5">
          <QuoteIcon />

          <p className="flex-1 font-sans text-sm leading-relaxed text-text-secondary sm:text-base sm:leading-7">{quote}</p>
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="relative size-16 overflow-hidden rounded-full sm:size-[4.5rem]">
            <Image src={logo} alt={`${brand} logo`} className="size-full object-cover" sizes="72px" />
          </div>
          <p className="font-sans text-base font-bold text-text sm:text-lg">{brand}</p>
          <Stars />
        </div>
      </section>
    </article>
  );
};

export default TestimonialCard;
