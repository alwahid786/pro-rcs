"use client";

import type { ServiceAccordionItem, ServicesAccordionSectionContent } from "@/components/content/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

type ServicesAccordionSectionProps = Omit<ServicesAccordionSectionContent, "type"> & {
  id?: string;
};

const AccordionToggle = ({ isOpen }: { isOpen: boolean }) => (
  <span
    className={cn(
      "inline-flex size-9 shrink-0 items-center justify-center rounded-full border text-lg leading-none transition-colors duration-300",
      isOpen ? "border-white/20 bg-white/10 text-white" : "border-[#ece7e1] bg-white text-text",
    )}
    aria-hidden
  >
    {isOpen ? "×" : "+"}
  </span>
);

const AccordionRow = ({ item, isOpen, onToggle }: { item: ServiceAccordionItem; isOpen: boolean; onToggle: () => void }) => {
  return (
    <div className="bg-white">
      <div className={cn("transition-colors duration-300", isOpen && "bg-[#1A1612]")}>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className={cn(
            "flex w-full items-center justify-between gap-6 px-3 py-6 text-left sm:px-6 sm:py-8 lg:px-10",
            isOpen ? "text-white" : "bg-white text-text hover:bg-[#FFF8F4]",
          )}
        >
          <div className="flex min-w-0 flex-1 items-center gap-4 sm:gap-8">
            <span className={cn("shrink-0 font-sans text-sm font-light sm:text-base", isOpen ? "text-primary" : "text-text-secondary")}>{item.number}</span>
            <span className={cn("font-sans text-2xl font-bold tracking-tight sm:text-3xl", isOpen ? "text-white" : "text-text")}>{item.title}</span>
          </div>
          <AccordionToggle isOpen={isOpen} />
        </button>

        <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
          <div className="overflow-hidden">
            <div className="flex flex-col gap-8 px-4 pb-8 sm:px-8 sm:pb-10 lg:grid lg:grid-cols-[minmax(0,580px)_minmax(0,300px)] lg:gap-12 lg:px-10">
              <div className="flex flex-col gap-4">
                {item.tagline && <p className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-primary">{item.tagline}</p>}
                {item.description && <p className="font-sans text-base leading-relaxed text-white/70 sm:text-lg sm:leading-8">{item.description}</p>}
              </div>

              {item.keyAreas && item.keyAreas.length > 0 && (
                <div className="flex flex-col gap-4 lg:border-l lg:border-white/12 lg:pl-10">
                  <p className="font-sans text-xs font-bold uppercase tracking-[0.12em] text-white/40">Key Areas</p>
                  <ul className="flex flex-col gap-3">
                    {item.keyAreas.map((area) => (
                      <li key={area} className="flex items-center gap-3 rounded-xl bg-white/5 px-4 py-3 font-sans text-sm text-white sm:text-base">
                        <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                        {area}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServicesAccordionSection = ({ items, id }: ServicesAccordionSectionProps) => {
  const defaultOpenIndex = items.findIndex((item) => item.description || item.keyAreas?.length);
  const [openIndex, setOpenIndex] = useState(defaultOpenIndex >= 0 ? defaultOpenIndex : 0);

  return (
    <div id={id} className="grid gap-px overflow-hidden bg-[#ece7e1]">
      {items.map((item, index) => (
        <AccordionRow key={item.number} item={item} isOpen={openIndex === index} onToggle={() => setOpenIndex((current) => (current === index ? -1 : index))} />
      ))}
    </div>
  );
};

export default ServicesAccordionSection;
