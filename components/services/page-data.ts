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
      badge: "What We Offer",
      heading: {
        prefix: "Nine Services. One",
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
          tagline: "FROM IDEA TO FRANCHISE-READY BRAND",
          description:
            "We help you refine your concept, define your value proposition, and build the foundation for a franchise model that attracts the right operators and scales with integrity.",
          keyAreas: ["Concept refinement", "Brand positioning", "Franchise model design"],
        },
        {
          number: "02",
          title: "Market Analysis & Feasibility",
          tagline: "DATA-DRIVEN EXPANSION DECISIONS",
          description:
            "We evaluate market demand, competitive landscape, and location viability so every expansion decision is backed by research — not guesswork.",
          keyAreas: ["Market research", "Competitive analysis", "Site feasibility"],
        },
        {
          number: "03",
          title: "Business Planning & Financial Modeling",
          tagline: "NUMBERS THAT SUPPORT YOUR GROWTH",
          description:
            "We build financial models, unit economics, and growth projections that give you and your investors confidence in every phase of expansion.",
          keyAreas: ["Financial modeling", "Unit economics", "Investor-ready plans"],
        },
        {
          number: "04",
          title: "Branding & Franchise Marketing",
          tagline: "A BRAND THAT SELLS ITSELF",
          description:
            "We develop brand systems and marketing strategies that attract franchisees, drive customer loyalty, and maintain consistency across every location.",
          keyAreas: ["Brand identity", "Franchise marketing", "Customer acquisition"],
        },
        {
          number: "05",
          title: "Menu Engineering & Product Development",
          tagline: "MENUS BUILT FOR SCALE AND MARGIN",
          description:
            "We optimize your menu for profitability, operational efficiency, and consistency — so every location delivers the same great experience.",
          keyAreas: ["Menu costing", "Product development", "Operational efficiency"],
        },
        {
          number: "06",
          title: "Operations & Training Programs",
          tagline: "SYSTEMS FOR CONSISTENCY AT SCALE",
          description:
            "We develop comprehensive operations manuals, training programs, and quality control systems that enable your team to deliver the same exceptional experience at location 2, 10, or 100 — regardless of who's running the shift.",
          keyAreas: ["Operations manuals", "Training programs", "Quality control"],
        },
        {
          number: "07",
          title: "Technology, POS & Operational Systems",
          tagline: "TECH THAT POWERS YOUR OPERATIONS",
          description:
            "We help you select and implement the right POS, inventory, and operational technology stack to streamline workflows and give you real-time visibility across locations.",
          keyAreas: ["POS selection", "Inventory systems", "Reporting & analytics"],
        },
        {
          number: "08",
          title: "Franchise Documentation & Compliance",
          tagline: "LEGAL AND OPERATIONAL READINESS",
          description:
            "We coordinate with franchise attorneys and compliance specialists to ensure your FDD, agreements, and operational documentation meet regulatory standards.",
          keyAreas: ["FDD preparation", "Franchise agreements", "Compliance support"],
        },
        {
          number: "09",
          title: "Supply Chain & Vendor Optimization",
          tagline: "MARGINS PROTECTED AT SCALE",
          description:
            "We optimize vendor relationships, negotiate better terms, and build supply chain systems that protect your margins as you grow from one location to many.",
          keyAreas: ["Vendor negotiation", "Cost optimization", "Distribution planning"],
        },
      ],
    },
    {
      type: "flagship-service",
      badge: "Flagship Service",
      heading: [
        { text: "Franchise " },
        { text: "Development &", highlight: true },
        { text: " Support Infrastructure" },
      ],
      description:
        "RCS's flagship offering brings together everything you need to turn a successful restaurant into a franchise-ready brand — from legal documentation and operational systems to franchisee recruitment and ongoing support infrastructure.",
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
      badge: "How We Work",
      steps: [
        {
          number: "01",
          title: "Discovery Call",
          description:
            "We learn about your concept, goals, and current challenges in a no-pressure conversation.",
        },
        {
          number: "02",
          title: "Audit & Analysis",
          description:
            "We evaluate operations, financials, and market position to identify the highest-leverage opportunities.",
        },
        {
          number: "03",
          title: "Custom Roadmap",
          description:
            "You receive a prioritized, actionable plan tailored to your brand and growth timeline.",
        },
        {
          number: "04",
          title: "Implementation & Support",
          description:
            "We guide execution of every initiative and provide ongoing support as you scale.",
        },
      ],
    },
  ],
} satisfies PageContent;
