"use client";

import Badge from "@/components/ui/Badge";
import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

const graphColors = ["#eb692c", "#f08a52", "#e57638"];

const serviceData = [
  { label: "Brands Customers", value: 75, className: "left-1/2 top-0 -translate-x-1/2" },
  { label: "States", value: 25, className: "left-0 top-1/2 -translate-y-1/2" },
  { label: "National & International Suppliers", value: 100, className: "bottom-2 left-1/2 -translate-x-1/2" },
];

const revenueData = [
  { label: "QSR", values: { 2023: 68, 2024: 58, 2025: 63 } },
  { label: "Casual", values: { 2023: 94, 2024: 35, 2025: 40 } },
  { label: "Fine Dining", values: { 2023: 74, 2024: 47, 2025: 53 } },
  { label: "Growth", values: { 2023: 88, 2024: 28, 2025: 31 } },
];

const years = ["2023", "2024", "2025"] as const;

const ResultsSection = () => {
  const serviceChartRef = useRef<HTMLCanvasElement>(null);
  const revenueChartRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const serviceCanvas = serviceChartRef.current;
    const revenueCanvas = revenueChartRef.current;

    if (!serviceCanvas || !revenueCanvas) {
      return;
    }

    const serviceChart = new Chart(serviceCanvas, {
      type: "doughnut",
      data: {
        labels: serviceData.map((item) => item.label),
        datasets: [
          {
            data: serviceData.map((item) => item.value),
            backgroundColor: graphColors,
            borderColor: "#000000",
            borderWidth: 8,
            hoverOffset: 4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "62%",
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1a1a1a",
            borderColor: "rgba(255,255,255,0.12)",
            borderWidth: 1,
            callbacks: {
              label: (context) => `${context.parsed}+ ${context.label}`,
            },
          },
        },
      },
    });

    const revenueChart = new Chart(revenueCanvas, {
      type: "bar",
      data: {
        labels: revenueData.map((item) => item.label),
        datasets: years.map((year, index) => ({
          label: year,
          data: revenueData.map((item) => item.values[year]),
          backgroundColor: graphColors[index],
          borderRadius: 3,
          borderSkipped: false,
          barPercentage: 0.7,
          categoryPercentage: 0.72,
        })),
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            border: {
              display: false,
            },
            grid: {
              display: false,
            },
            ticks: {
              color: "rgba(255,255,255,0.35)",
              font: {
                size: 11,
              },
            },
          },
          y: {
            min: 0,
            max: 120,
            border: {
              color: "rgba(255,255,255,0.10)",
            },
            grid: {
              color: "rgba(255,255,255,0.10)",
            },
            ticks: {
              color: "rgba(255,255,255,0.35)",
              stepSize: 30,
              callback: (value) => `+${value}%`,
              font: {
                size: 11,
              },
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            backgroundColor: "#1a1a1a",
            borderColor: "rgba(255,255,255,0.12)",
            borderWidth: 1,
            callbacks: {
              label: (context) => `${context.dataset.label}: +${context.parsed.y}%`,
            },
          },
        },
      },
    });

    return () => {
      serviceChart.destroy();
      revenueChart.destroy();
    };
  }, []);

  return (
    <section className="relative bg-white px-5 pb-16 pt-20 sm:pb-20 lg:pb-24">
      <div className="mx-auto max-w-305 rounded-[1.75rem] bg-[#151515] p-4 shadow-[0_0_94px_0_#00000026] sm:p-6 lg:p-8">
        <div className="flex justify-center">
          <Badge showIcon text="Numbers That Speak For Themselves" />
        </div>

        <div className="mt-6 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <article className="rounded-2xl bg-black px-4 py-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6 sm:py-7">
            <div>
              <h2 className="text-lg font-semibold sm:text-xl">Service breakdown</h2>
              <p className="mt-1 text-xs text-white/45 sm:text-sm">What clients engage most</p>
            </div>

            <div className="relative mx-auto mt-8 flex min-h-65 max-w-md items-center justify-center sm:min-h-77.5">
              <div className="h-52 w-52 sm:h-64 sm:w-64">
                <canvas ref={serviceChartRef} aria-label="Service breakdown chart" role="img" />
              </div>

              {serviceData.map((stat) => (
                <div
                  key={stat.label}
                  className={`absolute z-10 rounded-md border border-white/10 bg-[#1a1a1a]/95 px-3 py-2 text-center text-[11px] font-medium text-white shadow-[0_12px_28px_rgba(0,0,0,0.35)] sm:text-xs ${stat.className}`}
                >
                  {stat.value}+ {stat.label}
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-2xl bg-black px-4 py-5 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] sm:px-6 sm:py-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold sm:text-xl">Revenue growth comparison</h2>
                <p className="mt-1 text-xs text-white/45 sm:text-sm">Average % increase across client portfolio</p>
              </div>
              <div className="w-fit rounded-full border border-white/10 bg-[#1a1a1a] px-3 py-1.5 text-[11px] font-medium text-white/80">2023 + 2025</div>
            </div>

            <div className="mt-8 h-64 sm:h-72">
              <canvas ref={revenueChartRef} aria-label="Revenue growth comparison chart" role="img" />
            </div>

            <div className="mt-5 flex flex-wrap gap-4 text-xs text-white/60">
              {years.map((year, index) => (
                <div key={year} className="flex items-center gap-2">
                  <span className="size-3 rounded-sm" style={{ backgroundColor: graphColors[index] }} />
                  <span>{year}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};

export default ResultsSection;
