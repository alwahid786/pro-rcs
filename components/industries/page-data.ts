import type { PageContent } from "@/components/content/types";

export const industriesPageContent = {
  slug: "industries",
  meta: {
    title: "Industries | RCS",
    description:
      "Restaurant consulting expertise across fast casual, fine dining, QSR, franchise brands, and multi-unit operators.",
  },
  sections: [
    {
      type: "hero",
      heading: [
        { text: "Every " },
        { text: "Format", highlight: true },
        { text: ". Every Stage." },
      ],
      description:
        "Whether You're Running A Single Food Truck Or Scaling A Full-Service Franchise Network, RCS Brings The Same Operational Depth And Strategic Precision To Every Engagement.",
      secondaryButton: { label: "Explore Your Industry", href: "#industries-list" },
      primaryButton: { label: "View Services", href: "/services" },
    },
    {
      type: "marquee",
      items: [
        "CATERING & EVENTS",
        "FOOD TRUCKS & POP-UPS",
        "FULL-SERVICE RESTAURANTS",
        "QUICK SERVICE & QSR",
        "CAFES & BAKERIES",
      ],
    },
    {
      type: "industry-block",
      index: "1",
      variant: "light",
      badge: "SPEED, PROFITABILITY & FRANCHISE GROWTH",
      title: "Quick Service Restaurants",
      description:
        "QSR is a game of speed, consistency, and unit economics. RCS helps quick-service operators tighten operations, strengthen franchise systems, and scale profitably across markets.",
      highlight: "Fast food moves fast. Your strategy should too.",
      cta: { label: "Work With Us", href: "/contact" },
      helpItems: [
        "Efficiency audits & throughput optimization",
        "POS & technology implementation",
        "Franchise development & territory planning",
        "Data-driven marketing strategies",
        "Multi-location performance management",
      ],
    },
    {
      type: "industry-block",
      index: "2",
      variant: "dark",
      badge: "CONCEPT TO MULTI UNIT EXPANSION",
      title: "Full-Service Restaurants",
      description:
        "From white-tablecloth dining to casual full-service concepts, RCS partners with restaurateurs at every growth stage. We align your brand, operations, and financials to support sustainable scaling — whether you're launching a flagship or franchising your tenth location.",
      highlight: "The most complex format to scale. The one we know best.",
      cta: { label: "Work With Us", href: "/industries/full-service-restaurants" },
      helpItems: [
        "Concept development & brand positioning",
        "Franchise structure & expansion planning",
        "Menu engineering & recipe development",
        "Supply chain optimization",
        "Operations manuals & training programs",
      ],
    },
    {
      type: "industry-block",
      index: "3",
      variant: "light",
      badge: "OPERATIONS, PRICING & REVENUE DIVERSIFICATION",
      title: "Catering & Events",
      description:
        "Catering is high-margin and high-complexity. RCS helps catering and event operations streamline logistics, sharpen pricing, differentiate in competitive markets, and build recurring revenue streams that stabilize growth year-round.",
      highlight: "Turn events into a repeatable, scalable revenue engine.",
      cta: { label: "Work With Us", href: "/contact" },
      helpItems: [
        "Strategic growth & market positioning",
        "Operational streamlining & logistics",
        "Pricing optimization & margin analysis",
        "Revenue diversification strategy",
        "Brand differentiation & client acquisition",
      ],
    },
    {
      type: "industry-block",
      index: "4",
      variant: "dark",
      badge: "COMMUNITY-ROOTED GROWTH & BRAND INNOVATION",
      title: "Cafes & Bakeries",
      description:
        "Cafes and bakeries thrive on experience, community, and product craft — but scaling without losing that authenticity is the hard part. RCS helps you modernize systems, strengthen your supply chain, and build a brand that earns loyalty in every market you enter.",
      highlight: "Scale without losing the soul of the brand.",
      cta: { label: "Work With Us", href: "/contact" },
      helpItems: [
        "Concept development & brand strategy",
        "Menu innovation & seasonal programming",
        "Supply chain management for specialty goods",
        "System modernization & tech integration",
        "Community-brand building & local marketing",
      ],
    },
    {
      type: "stand-for",
      badge: "OUR COMMITMENT",
      heading: {
        prefix: "What We Stand For ",
        highlight: "Across Every Industry",
      },
      description:
        "These aren't aspirational values on a slide deck — they're the standard we hold every client engagement to.",
      items: [
        {
          title: "Excellence",
          description:
            "Every engagement is held to the highest standard — no shortcuts, no half-measures.",
        },
        {
          title: "Integrity",
          description:
            "We tell you what you need to hear, not what you want to hear.",
        },
        {
          title: "Innovation",
          description:
            "We bring fresh thinking to old problems and build systems that last.",
        },
        {
          title: "Collaboration",
          description:
            "Your growth is our growth. We work as partners, not vendors.",
        },
      ],
    },
  ],
} satisfies PageContent;
