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
          tagline: "FROM IDEA TO FRANCHISABLE CONCEPT",
          description:
            "We help operators refine their brand positioning, unit economics, and franchise model so the concept is attractive to franchisees and sustainable at scale.",
          keyAreas: ["Concept validation", "Franchise model design", "Unit economics", "Growth roadmap"],
        },
        {
          number: "02",
          title: "Market Analysis & Feasibility",
          tagline: "DATA-DRIVEN EXPANSION DECISIONS",
          description:
            "Territory analysis, competitive mapping, and demand forecasting to identify where your brand can win before you commit capital to new markets.",
          keyAreas: ["Market sizing", "Site selection criteria", "Competitive analysis", "Feasibility reporting"],
        },
        {
          number: "03",
          title: "Business Planning & Financial Modeling",
          tagline: "CLARITY BEFORE YOU SCALE",
          description:
            "Investor-ready financial models, pro formas, and growth scenarios that align operations, marketing, and expansion with realistic returns.",
          keyAreas: ["Pro forma development", "Franchisee ROI modeling", "Capital planning", "Investor materials"],
        },
        {
          number: "04",
          title: "Branding & Franchise Marketing",
          tagline: "BUILT TO ATTRACT THE RIGHT FRANCHISEES",
          description:
            "Brand strategy, franchise sales messaging, and recruitment marketing that positions your concept clearly and drives qualified franchisee pipeline.",
          keyAreas: ["Brand positioning", "Franchise sales collateral", "Lead generation", "Recruitment funnels"],
        },
        {
          number: "05",
          title: "Menu Engineering & Product Development",
          tagline: "MARGIN-FOCUSED MENU STRATEGY",
          description:
            "Menu architecture, pricing strategy, and product innovation designed to improve profitability while protecting brand consistency across locations.",
          keyAreas: ["Menu design", "Cost optimization", "Product innovation", "Pricing strategy"],
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
          tagline: "TOOLS THAT ENABLE SCALE",
          description:
            "POS selection, tech stack planning, and operational system integration so multi-unit operators run with visibility, speed, and control.",
          keyAreas: ["POS evaluation", "System integration", "Reporting dashboards", "Tech vendor management"],
        },
        {
          number: "08",
          title: "Franchise Documentation & Compliance",
          tagline: "PROTECT THE NETWORK AS YOU GROW",
          description:
            "FDD preparation, franchise agreements, compliance frameworks, and documentation systems that protect franchisors and franchisees alike.",
          keyAreas: ["FDD preparation", "Legal documentation", "Compliance audits", "Territory protection"],
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
