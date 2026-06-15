export type ProcessStep = {
  number: string;
  title: {
    prefix: string;
    highlight: string;
  };
  description: string;
};

export const processSectionContent = {
  badge: "How We Work",
  heading: {
    prefix: "Our",
    highlight: "Process",
  },
  steps: [
    {
      number: "01",
      title: {
        prefix: "Discover &",
        highlight: "Analyze",
      },
      description:
        "We evaluate your business, market position, and growth potential—analyzing your operations, financial performance, competitive landscape, and customer base.",
    },
    {
      number: "02",
      title: {
        prefix: "Structure &",
        highlight: "Build",
      },
      description:
        "We design systems, strategies, and frameworks tailored to your business needs—aligning operations, workflows, and decision-making processes to improve efficiency, ensure consistency, and support scalable, long-term growth.",
    },
    {
      number: "03",
      title: {
        prefix: "Launch &",
        highlight: "Scale",
      },
      description:
        "We support implementation and guide your business through expansion and long-term growth—ensuring smooth execution, monitoring performance, and continuously optimizing strategies to sustain momentum and maximize results.",
    },
  ] satisfies ProcessStep[],
  cta: {
    textPrefix: "Align with Businesses that",
    textHighlight: "Choose Quality",
    buttonLabel: "Start Now",
  },
};
