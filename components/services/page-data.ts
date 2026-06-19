import type { PageContent } from "@/components/content/types";

export const servicesPageContent = {
  slug: "services",
  meta: {
    title: "Services | RCS",
    description:
      "Nine interconnected restaurant consulting services — from franchise concept development to operations, compliance, and growth infrastructure.",
  },
  sections: [
    {
      type: "hero",
      heading: [
        { text: "We Build " },
        { text: "Restaurants", highlight: true },
        { text: " That Scale" },
      ],
      description:
        "End-To-End Consulting For Operators Ready To Franchise, Grow, And Dominate Their Market — From Concept Through Hundredth Location.",
      secondaryButton: { label: "Book Consultation", href: "/contact" },
      primaryButton: { label: "Our Services", href: "#services-list" },
    },
    {
      type: "heading-intro",
      badge: "WHAT WE OFFER",
      heading: {
        prefix: "Nine Services. One ",
        highlight: "Partner.",
      },
      description:
        "Every service is designed to interconnect — so the strategy informs the operations, the operations enable the marketing, and the marketing drives the growth.",
    },
    {
      type: "services-accordion",
      items: [
        {
          number: "01",
          title: "Franchise Concept Development",
        },
        {
          number: "02",
          title: "Market Analysis & Feasibility",
        },
        {
          number: "03",
          title: "Business Planning & Financial Modeling",
        },
        {
          number: "04",
          title: "Branding & Franchise Marketing",
        },
        {
          number: "05",
          title: "Menu Engineering & Product Development",
        },
        {
          number: "06",
          title: "Operations & Training Programs",
          tagline: "SYSTEMS FOR CONSISTENCY AT SCALE",
          description:
            "Comprehensive operations manuals, brand standards documentation, and structured training programs that ensure every franchisee delivers the same quality — location 1 or location 100.",
          keyAreas: ["Operations manuals", "Training programs", "Quality control"],
        },
        {
          number: "07",
          title: "Technology, POS & Operational Systems",
        },
        {
          number: "08",
          title: "Franchise Documentation & Compliance",
        },
      ],
    },
    {
      type: "flagship-service",
      badge: "FLAGSHIP SERVICE",
      heading: [
        { text: "Franchise " },
        { text: "Development &", highlight: true },
        { text: " Support Infrastructure" },
      ],
      description:
        "Our most comprehensive engagement — covering everything a franchisor needs to launch, protect, and grow a scalable network. Built from years of actual operator experience, not theory.",
      quote:
        "We exist to be the strategic backbone that restaurant operators rely on — from first concept to hundredth location.",
      cta: { label: "Start with Franchise Development", href: "/contact" },
      features: [
        {
          number: "01",
          title: "Documentation & Legal Compliance",
          description: "FDD prep, franchise agreements, territory protection",
        },
        {
          number: "02",
          title: "Operational Framework",
          description: "SOPs, brand standards, fee structure architecture",
        },
        {
          number: "03",
          title: "Franchisee Training & Support",
          description: "Onboarding programs, marketing playbooks, ongoing coaching",
        },
        {
          number: "04",
          title: "Strategic Growth Enablement",
          description: "Multi-unit scaling tools, territory planning, recruitment pipelines",
        },
      ],
    },
    {
      type: "process-grid",
      badge: "HOW WE WORK",
      steps: [
        {
          number: "01",
          title: "Discovery Call",
          description:
            "We map your goals, brand, and current stage in a focused strategy session.",
        },
        {
          number: "02",
          title: "Audit & Analysis",
          description:
            "Deep-dive into your operations, market position, and growth levers.",
        },
        {
          number: "03",
          title: "Strategy Delivery",
          description:
            "A tailored roadmap with clear priorities, timelines, and ownership.",
        },
        {
          number: "04",
          title: "Execution Support",
          description:
            "We stay engaged — coaching, reviewing, and adapting as you scale.",
        },
      ],
    },
  ],
} satisfies PageContent;
