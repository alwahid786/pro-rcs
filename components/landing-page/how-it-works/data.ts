import Assesment from "@/assets/icons/hiw/Assesment";
import Discovery from "@/assets/icons/hiw/Discovery";
import GlobalReach from "@/assets/icons/hiw/GlobalReach";
import Implementation from "@/assets/icons/hiw/Implementation";
import Optimziation from "@/assets/icons/hiw/Optimziation";
import OurPositioning from "@/assets/icons/hiw/OurPositioning";
import type { ComponentType } from "react";

export type HowItWorksStep = {
  number: string;
  title: string;
  description: string;
  icon: ComponentType;
};

export type HowItWorksFeature = {
  title: string;
  description: string;
  icon: ComponentType;
  tags?: string[];
};

export const howItWorksContent = {
  badge: "Our Working",
  heading: {
    prefix: "How It",
    highlight: "Works",
  },
  steps: [
    {
      number: "01",
      title: "Discovery",
      description: "We learn your business inside out — operations, goals, and growth gaps.",
      icon: Discovery,
    },
    {
      number: "02",
      title: "Assessment",
      description:
        "We audit your systems, team, and processes to identify gaps and prioritize the biggest opportunities.",
      icon: Assesment,
    },
    {
      number: "03",
      title: "Implementation",
      description:
        "We execute the plan alongside your team — rolling out solutions, training staff, and tracking progress.",
      icon: Implementation,
    },
    {
      number: "04",
      title: "Optimization",
      description:
        "We fine-tune what's working, eliminate what's not, and set you up for sustainable, long-term growth.",
      icon: Optimziation,
    },
  ] satisfies HowItWorksStep[],
  features: [
    {
      title: "Global Reach",
      description: "Currently working with clients across three key markets, delivering results where it matters most.",
      icon: GlobalReach,
      tags: ["United States", "Canada", "GCC"],
    },
    {
      title: "Our Positioning",
      description:
        "Positioned at the crossroads of strategy and execution, we serve ambitious restaurant businesses that need more than advice — they need systems, partnerships, and a dedicated team committed to their growth.",
      icon: OurPositioning,
    },
  ] satisfies HowItWorksFeature[],
};
