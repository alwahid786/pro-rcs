"use client";

import ServiceInnerCard from "@/components/landing-page/ServiceInnerCard";
import { serviceData } from "@/components/landing-page/service-data";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

const SLIDE_HEIGHT = "550px";

const ServiceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isClickScrolling = useRef(false);

  const scrollToSlide = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    const container = scrollRef.current;
    if (!slide || !container) return;

    isClickScrolling.current = true;
    setActiveIndex(index);

    container.scrollTo({
      top: slide.offsetTop,
      behavior: "smooth",
    });

    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = Number(visible.target.getAttribute("data-index"));
        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      {
        root: container,
        threshold: [0.35, 0.55, 0.75],
      },
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative container mx-auto flex flex-col items-center overflow-hidden bg-white px-5 py-16 sm:py-20 lg:py-24">
      <HeadingBlock badge="Our Services" heading={{ prefix: "Our", highlight: "Services", suffix: "" }} />

      <div className="mt-10 grid w-full gap-8 lg:grid-cols-[minmax(0,340px)_1fr] lg:items-start lg:gap-12 xl:gap-16">
        <nav aria-label="Service categories" className="lg:sticky lg:top-28 lg:self-center">
          <ul className="flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:gap-4 lg:overflow-visible lg:pb-0">
            {serviceData.map((service, index) => {
              const isActive = activeIndex === index;
              const label = String(index + 1).padStart(2, "0");

              return (
                <li key={service.slug} className="shrink-0">
                  <button type="button" onClick={() => scrollToSlide(index)} aria-current={isActive ? "true" : undefined} className="group flex items-center gap-2 text-left">
                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className={cn(
                        "glass inline-flex min-w-14 items-center justify-center rounded-full px-4 py-3 text-2xl font-medium transition-colors duration-300",
                        isActive ? "bg-primary text-white" : "text-primary",
                      )}
                    >
                      {label}
                    </motion.span>

                    <motion.span
                      layout
                      transition={{ type: "spring", stiffness: 420, damping: 32 }}
                      className={cn(
                        "glass rounded-full px-4 py-3 text-base font-medium whitespace-nowrap transition-colors duration-300 sm:text-lg",
                        isActive ? "bg-secondary text-white" : "text-text group-hover:text-primary",
                      )}
                    >
                      {service.category}
                    </motion.span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        <div
          ref={scrollRef}
          className="relative h-(--service-slide-height) snap-y snap-mandatory overflow-y-auto scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ "--service-slide-height": SLIDE_HEIGHT } as CSSProperties}
        >
          {serviceData.map((service, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={service.slug}
                id={service.slug}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
                data-index={index}
                className="flex h-(--service-slide-height) snap-start snap-always items-center"
                style={{ "--service-slide-height": SLIDE_HEIGHT } as CSSProperties}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    y: isActive ? 0 : 12,
                    scale: isActive ? 1 : 0.98,
                    filter: isActive ? "blur(0px)" : "blur(1px)",
                  }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <ServiceInnerCard {...service} />
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
