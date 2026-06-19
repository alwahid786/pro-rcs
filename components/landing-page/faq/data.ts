export type FaqItem = {
  question: string;
  answer: string;
};

export const faqSectionContent = {
  badge: "Frequently Asked Questions",
  heading: {
    prefix: "Got",
    highlight: "Questions?",
  },
  cta: {
    title: "Still have questions?",
    description: "Our restaurant growth specialists are ready to understand your challenges and craft a custom strategy for your business.",
    buttonLabel: "Book a Free Consultation",
    helperLabel: "Need More Help?",
    joinLabel: "Join 200+ growing restaurants",
  },
  items: [
    {
      question: "How can RCS help increase my restaurant revenue?",
      answer:
        "We take a data-driven approach to identify growth opportunities across operations, marketing, and customer experience. From menu engineering and pricing optimization to digital marketing campaigns and loyalty programs, we implement strategies that deliver measurable revenue growth within 60-90 days.",
    },
    {
      question: "Do you work with new restaurants or only established brands?",
      answer:
        "We support both new and established brands. For startups, we help build strong systems and launch readiness. For established businesses, we optimize operations, scale expansion, and improve profitability.",
    },
    {
      question: "What services are included in your consulting packages?",
      answer:
        "Our packages can include operational audits, growth strategy, franchise structuring, supply-chain optimization, brand positioning, and implementation support based on your goals.",
    },
    {
      question: "How long does a typical restaurant growth project take?",
      answer:
        "Most projects run between 8 and 16 weeks depending on scope, existing systems, and growth targets. We define milestones early so progress stays measurable.",
    },
    {
      question: "Can you help with franchising and expansion?",
      answer:
        "Yes. We help design franchise-ready systems, documentation, and expansion roadmaps so your brand can scale consistently across locations.",
    },
    {
      question: "Do you offer remote consulting services?",
      answer:
        "Yes. We work with clients remotely and on-site, using a flexible model based on your market, team setup, and project phase.",
    },
  ] satisfies FaqItem[],
};

