'use client';

import ServiceInnerCard from "@/components/services/ServiceInnerCard";
import { serviceData } from "@/components/services/service-section-data";
import HeadingBlock from "@/components/ui/HeadingBlock";
import RoatatingStar from "@/components/ui/RoatatingStar";
import { cn } from "@/lib/utils";
import { motion } from "motion/react";
import { useCallback, useEffect, useRef, useState, type CSSProperties } from "react";

const DESKTOP_BREAKPOINT = '(min-width: 1100px)';
const SLIDE_HEIGHT = '550px';

const ServiceSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);
  const isClickScrolling = useRef(false);

  useEffect(() => {
    const media = window.matchMedia(DESKTOP_BREAKPOINT);
    const updateViewport = () => setIsDesktop(media.matches);

    updateViewport();
    media.addEventListener('change', updateViewport);

    return () => media.removeEventListener('change', updateViewport);
  }, []);

  const scrollToSlide = useCallback((index: number) => {
    const slide = slideRefs.current[index];
    const container = scrollRef.current;
    if (!slide || !container) return;

    isClickScrolling.current = true;
    setActiveIndex(index);

    container.scrollTo({
      top: slide.offsetTop,
      behavior: 'smooth',
    });

    window.setTimeout(() => {
      isClickScrolling.current = false;
    }, 700);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const container = scrollRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrolling.current) return;

        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const index = Number(visible.target.getAttribute('data-index'));
        if (!Number.isNaN(index)) {
          setActiveIndex(index);
        }
      },
      {
        root: container,
        threshold: [0.35, 0.55, 0.75],
      }
    );

    slideRefs.current.forEach((slide) => {
      if (slide) observer.observe(slide);
    });

    return () => observer.disconnect();
  }, [isDesktop]);

  return (
    <section className="relative container mx-auto flex flex-col items-center gap-10 overflow-hidden bg-white px-5 py-16 sm:py-20 lg:py-24">
      <HeadingBlock
        isCenter
        badge="WHAT WE DO"
        heading={{ prefix: 'Our', highlight: 'Services', suffix: '' }}
      />

      <div className="flex w-full flex-col gap-10 min-[1100px]:hidden">
        {serviceData.map((service) => (
          <ServiceInnerCard key={service.slug} {...service} />
        ))}
      </div>
      <RoatatingStar position="top-[200px] right-0" width="120" className="max-[1100px]:hidden" />

      <div className="relative hidden w-full grid-cols-[minmax(0,340px)_1fr] items-start gap-12 rounded-2xl bg-linear-to-br from-cyan-100 via-white to-orange-100 px-10 py-12 shadow-lg min-[1100px]:grid xl:gap-16">
        <nav aria-label="Service categories" className="sticky top-28 self-center">
          <ul className="flex flex-col gap-4">
            {serviceData.map((service, index) => {
              const isActive = activeIndex === index;
              const label = String(index + 1).padStart(2, '0');

              return (
                <li key={service.slug}>
                  <button
                    type="button"
                    onClick={() => scrollToSlide(index)}
                    aria-current={isActive ? 'true' : undefined}
                    className="group flex items-center gap-2 text-left"
                  >
                    <motion.span
                      layout
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className={cn(
                        'glass inline-flex min-w-14 items-center justify-center rounded-full px-4 py-3 text-2xl font-medium transition-colors duration-300',
                        isActive
                          ? 'bg-primary text-white'
                          : 'text-primary border border-gray-200/50 shadow-sm'
                      )}
                    >
                      {label}
                    </motion.span>

                    <motion.span
                      layout
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className={cn(
                        'glass rounded-full px-4 py-3 text-base font-medium whitespace-nowrap transition-colors duration-300 sm:text-lg',
                        isActive
                          ? 'bg-secondary text-white'
                          : 'text-text group-hover:text-primary border border-gray-200/50 shadow-sm'
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
          className="relative flex h-(--service-slide-height) flex-col gap-10 snap-y snap-mandatory overflow-y-auto scroll-smooth scrollbar-none [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          style={{ '--service-slide-height': SLIDE_HEIGHT } as CSSProperties}
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
                className="flex h-(--service-slide-height) shrink-0 snap-start snap-always items-center"
                style={{ '--service-slide-height': SLIDE_HEIGHT } as CSSProperties}
              >
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isActive ? 1 : 0.35,
                    y: isActive ? 0 : 12,
                    scale: isActive ? 1 : 0.98,
                    filter: isActive ? 'blur(0px)' : 'blur(1px)',
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
