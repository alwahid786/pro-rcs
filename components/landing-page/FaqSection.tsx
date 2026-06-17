"use client";

import ArrowRightIcon from "@/assets/icons/ArrowRightIcon";
import FaqsStar from "@/assets/icons/FaqsStar";
import { faqSectionContent } from "@/components/landing-page/faq-data";
import Button from "@/components/ui/Button";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { useState } from "react";

const FaqSection = () => {
  const { badge, heading, items, cta } = faqSectionContent;
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container">
        <HeadingBlock badge={badge} heading={heading} weight="regular" />

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px] lg:gap-8">
          <div className="rounded-3xl border border-[#e8e3dd] bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.05)] sm:p-5">
            <div className="space-y-3">
              {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                  <div key={item.question} className="rounded-2xl border border-[#ece8e2] bg-white">
                    <button
                      type="button"
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left sm:px-5"
                      onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    >
                      <span className={`font-sans text-base font-semibold sm:text-lg ${isOpen ? "text-primary" : "text-text"}`}>{item.question}</span>
                      <span
                        className={`inline-flex size-6 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${isOpen ? "bg-primary text-white" : "text-primary"}`}
                        aria-hidden
                      >
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>

                    {isOpen && <p className="px-4 pb-5 font-sans text-sm leading-relaxed text-text-secondary sm:px-5 sm:text-base">{item.answer}</p>}
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="rounded-3xl border border-[#e8e3dd] bg-white p-4 shadow-[0_16px_50px_rgba(0,0,0,0.05)] sm:p-5">
            <div className="relative rounded-2xl bg-[#fff4ee] p-4 text-center">
              <div className="absolute -top-3 right-3 rounded-full border border-[#eaded4] bg-[#fff4ee] px-3 py-1 font-sans text-[10px] font-bold uppercase tracking-[0.08em] text-[#b79f8d]">
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

