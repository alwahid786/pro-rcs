"use client";

import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import FaqsStar from "@/assets/icons/FaqsStar";
import { faqSectionContent } from "./data";
import Button from "@/components/ui/Button";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import RoatatingStar from "@/components/ui/RoatatingStar";

const accordionTransition = {
  duration: 0.4,
  ease: [0.22, 1, 0.36, 1] as const,
};

const FaqSection = () => {
  const { badge, heading, items, cta } = faqSectionContent;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24 relative">
      <RoatatingStar position="top-[100px] right-[-30px]" width="220" className="max-[1100px]:hidden" />
      <RoatatingStar position="top-[150px] left-[-80px]" width="220" className="max-[1100px]:hidden" />
      <div className="container relative z-2">
        <HeadingBlock badge={badge} heading={heading} weight="regular" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div>
            <div className="space-y-3">
              {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <motion.div
                    key={item.question}
                    layout
                    transition={{ layout: accordionTransition }}
                    className={cn("overflow-hidden rounded-2xl border shadow-lg glass transition-colors duration-300", isOpen ? "border-primary/40" : "border-primary/20")}
                  >
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 p-6 text-left"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                      aria-expanded={isOpen}
                    >
                      <span className={cn("font-sans text-base font-semibold transition-colors duration-300 sm:text-lg", isOpen ? "text-primary" : "text-text/70")}>
                        {item.question}
                      </span>

                      <motion.span
                        animate={{
                          backgroundColor: isOpen ? "var(--primary)" : "transparent",
                          color: isOpen ? "#ffffff" : "var(--primary)",
                          scale: isOpen ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="inline-flex size-6 shrink-0 items-center justify-center rounded-lg text-xl shadow-xl"
                        aria-hidden
                      >
                        <AnimatePresence mode="wait" initial={false}>
                          <motion.span
                            key={isOpen ? "minus" : "plus"}
                            initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                            animate={{ opacity: 1, rotate: 0, scale: 1 }}
                            exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                            transition={{ duration: 0.2 }}
                            className="leading-none"
                          >
                            {isOpen ? "−" : "+"}
                          </motion.span>
                        </AnimatePresence>
                      </motion.span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={accordionTransition}
                          className="overflow-hidden"
                        >
                          <motion.hr
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 1 }}
                            exit={{ scaleX: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                            className="mx-auto max-w-[95%] origin-center border-primary/40"
                          />

                          <motion.p
                            initial={{ y: -8, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -8, opacity: 0 }}
                            transition={{ ...accordionTransition, delay: 0.05 }}
                            className="px-4 py-5 font-sans text-sm leading-relaxed text-text-secondary sm:px-5 sm:text-base"
                          >
                            {item.answer}
                          </motion.p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-3xl glass p-4 shadow-xl sm:p-5">
            <div className="relative rounded-2xl bg-gradient-to-br from-primary/30 via-primary/20 to-primary/10 p-4 text-center">
              <div className="absolute -top-3 right-3 rounded-full border bg-white/10 shadow-lg backdrop-blur-[2px] border-primary/20 px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-primary">
                {cta.helperLabel}
              </div>
              <div className="mx-auto w-fit">
                <FaqsStar />
              </div>
              <p className="mt-1 font-sans text-sm font-medium text-text-secondary">Professional Consultant</p>
            </div>

            <h3 className="mt-5 font-sans text-3xl font-bold tracking-tight text-text">{cta.title}</h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">{cta.description}</p>

            <Button variant="primary" size="md" icon={<ArrowRightIcon className="text-white" />} className="mt-6 w-full justify-center">
              {cta.buttonLabel}
            </Button>

            <div className="mt-6 flex items-center gap-3">
              <div className="flex -space-x-2">
                <span className="size-4 rounded-full bg-[#f7d2c1]" />
                <span className="size-4 rounded-full bg-[#f3c5af]" />
                <span className="size-4 rounded-full bg-[#f1b497]" />
              </div>
              <p className="font-sans text-xs text-text-secondary">{cta.joinLabel}</p>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
