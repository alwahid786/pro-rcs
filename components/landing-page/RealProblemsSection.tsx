"use client";

import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import Outcome from "@/assets/icons/Outcome";
import Problem from "@/assets/icons/Problem";
import { realProblemsContent, type RealProblemCase } from "@/components/landing-page/real-problems-data";
import HeadingBlock from "@/components/ui/HeadingBlock";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { type ReactNode, useMemo, useState } from "react";

type FilterValue = (typeof realProblemsContent.filters)[number];

const MetricRow = ({ metrics }: { metrics: RealProblemCase["metrics"] }) => (
  <div className="mt-7 grid grid-cols-3 gap-4 sm:gap-6">
    {metrics.map((metric) => (
      <div key={`${metric.value}-${metric.label}`}>
        <p className="font-sans text-4xl font-bold tracking-tight text-primary sm:text-5xl">{metric.value}</p>
        <p className="mt-1 font-sans text-xs uppercase text-[#646c7d] sm:text-sm">{metric.label}</p>
      </div>
    ))}
  </div>
);

const DetailRow = ({ title, icon, text, tone }: { title: string; icon: ReactNode; text: string; tone: "problem" | "outcome" }) => (
  <div className="flex items-start gap-3">
    <div className="mt-0.5 shrink-0">{icon}</div>
    <div>
      <p className={cn("font-sans text-sm font-semibold uppercase tracking-[0.08em]", tone === "problem" ? "text-[#D71E28]" : "text-[#009966]")}>{title}</p>
      <p className="mt-1 font-sans text-[15px] leading-relaxed text-text-secondary">{text}</p>
    </div>
  </div>
);

const RealProblemsSection = () => {
  const { badge, heading, filters, cases } = realProblemsContent;
  const [activeFilter, setActiveFilter] = useState<FilterValue>("All");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filteredCases = useMemo(
    () => (activeFilter === "All" ? cases : cases.filter((item) => item.category === activeFilter)),
    [activeFilter, cases],
  );

  const featuredCases = filteredCases.slice(0, 2);
  const compactCases = filteredCases.slice(2);

  const toggleOpen = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="bg-background py-16 sm:py-20 lg:py-24">
      <div className="container">
        <HeadingBlock badge={badge} heading={heading} weight="regular" />

        <div className="mt-8 flex flex-wrap gap-2.5">
          {filters.map((filter) => {
            const isActive = activeFilter === filter;
            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={cn(
                  "rounded-full border px-4 py-1.5 font-sans text-sm transition-colors",
                  isActive ? "border-primary bg-[#fff0e6] text-primary" : "border-[#e4e1dc] bg-white text-text-secondary",
                )}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-7 grid gap-5 lg:grid-cols-2">
          {featuredCases.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <article key={item.id} className="rounded-3xl border border-[#e7e2dc] bg-[linear-gradient(180deg,#ffffff_0%,#fff4ec_100%)] p-5 shadow-[0_16px_42px_rgba(0,0,0,0.05)] sm:p-7">
                <div className="flex items-start justify-between gap-4">
                  <span className="rounded-full border border-[#e9bf9d] px-3 py-1 font-sans text-xs uppercase tracking-[0.08em] text-[#b17340]">
                    {item.category}
                  </span>
                  <Image src={item.logo} alt={`${item.brand} logo`} className="size-12 rounded-full object-cover shadow-sm" sizes="48px" />
                </div>

                <h3 className="mt-4 font-sans text-[2rem] font-bold tracking-tight text-text">{item.brand}</h3>
                <p className="mt-2 max-w-[40rem] font-sans text-[15px] leading-relaxed text-text-secondary">{item.summary}</p>

                <MetricRow metrics={item.metrics} />

                <button
                  type="button"
                  onClick={() => toggleOpen(item.id)}
                  className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 font-sans text-xs font-bold uppercase tracking-[0.08em] text-white shadow-btn-primary"
                >
                  {isOpen ? "Close" : "Read Full Story"}
                  <ChevronDownIcon className={cn("text-white transition-transform", isOpen ? "rotate-180" : "")} />
                </button>

                {isOpen && (
                  <div className="mt-6 space-y-5 border-t border-[#ece7e1] pt-5">
                    <DetailRow title="The Problem" icon={<Problem />} text={item.problem} tone="problem" />
                    <DetailRow title="Our Solution" icon={<Outcome />} text={item.outcome} tone="outcome" />
                    {item.quote && (
                      <blockquote className="border-l-2 border-[#8ab3ff] pl-3 font-sans text-base italic text-text-secondary">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    )}
                  </div>
                )}
              </article>
            );
          })}
        </div>

        <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {compactCases.map((item) => {
            const isOpen = expandedId === item.id;
            return (
              <article key={item.id} className="rounded-3xl border border-[#e7e2dc] bg-[linear-gradient(180deg,#ffffff_0%,#fff4ec_100%)] p-4 shadow-[0_14px_32px_rgba(0,0,0,0.04)] sm:p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-sans text-xs uppercase tracking-[0.08em] text-[#b17340]">{item.category}</p>
                    <h3 className="mt-2 font-sans text-[2rem] font-bold tracking-tight text-text">{item.brand}</h3>
                  </div>
                  <button type="button" onClick={() => toggleOpen(item.id)} className="text-primary">
                    <ChevronDownIcon className={cn("transition-transform", isOpen ? "rotate-180" : "")} />
                  </button>
                </div>

                <div className="mt-4 flex items-center justify-between gap-3">
                  <div>
                    <p className="font-sans text-[2.6rem] font-bold tracking-tight text-primary">{item.metrics[0].value}</p>
                    <p className="font-sans text-xs uppercase text-[#98a2b3]">{item.metrics[0].label}</p>
                  </div>
                  <Image src={item.logo} alt={`${item.brand} logo`} className="size-12 rounded-full object-cover" sizes="48px" />
                </div>

                {isOpen && (
                  <div className="mt-5 space-y-4 border-t border-[#ece7e1] pt-4">
                    <DetailRow title="Problem" icon={<Problem />} text={item.problem} tone="problem" />
                    <DetailRow title="Outcome" icon={<Outcome />} text={item.outcome} tone="outcome" />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default RealProblemsSection;

