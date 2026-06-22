import type { PageContent } from "@/components/content/types";
import featuredImage from "@/assets/imgs/blog/featured.jpg";
import growthImage from "@/assets/imgs/blog/growth.jpg";
import operationsImage from "@/assets/imgs/blog/operations.jpg";
import cafesImage from "@/assets/imgs/industry/cafes.jpg";
import cateringImage from "@/assets/imgs/industry/catering.jpg";
import serviceImage from "@/assets/imgs/industry/service.jpg";

export type IndustryDetailContent = PageContent & {
  industrySlug: string;
};

export const industryDetailPageContent = {
  slug: "industry-detail",
  industrySlug: "full-service-restaurants",
  meta: {
    title: "Full-Service Restaurants | RCS",
    description:
      "Full-service restaurant consulting — scalable strategy, franchise infrastructure, and operational excellence from concept through multi-unit growth.",
  },
  sections: [
    {
      type: "hero",
      heading: [
        { text: "Where Craft Meets " },
        { text: "Scalable", highlight: true, breakBefore: true },
        { text: " Strategy." },
      ],
      description:
        "Full-Service Restaurants Are Among The Most Complex Concepts To Scale — High Labor, Intricate Menus, Layered Guest Experience Standards, And Demanding Franchise Infrastructure. RCS Was Built Precisely For This Challenge. Our Team Has Operated Inside Full-Service Brands And Knows Exactly Which Levers To Pull At Every Stage Of Growth.",
      secondaryButton: { label: "Start Your Engagement", href: "/contact" },
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
      type: "challenge-deliver",
      challenge: {
        badge: "THE CHALLENGE",
        heading: {
          prefix: "Why Full-Service Operators ",
          highlight: "Stall at Scale",
        },
        description:
          "Scaling a full-service concept without degrading the guest experience is one of the hardest problems in hospitality. Most operators hit a ceiling around 3–6 locations — not because the brand isn't strong, but because their infrastructure wasn't engineered to replicate.",
      },
      deliver: {
        badge: "WHAT WE DELIVER",
        heading: "Measurable Outcomes, Every Engagement.",
        items: [
          "Franchise-ready documentation in 90–120 days",
          "Menu profitability increases averaging 8–14%",
          "Reduced labor cost through operational restructuring",
          "Consistent brand delivery across all locations",
        ],
      },
    },
    {
      type: "industry-services-grid",
      badge: "HOW WE HELP",
      heading: {
        prefix: "Services for ",
        highlight: "Full-Service",
      },
      description:
        "Every engagement is scoped to your specific situation — not templated from a playbook.",
      items: [
        {
          icon: "development",
          title: "Concept Development & Brand Positioning",
          description:
            "Define what makes your concept different, who it's for, and how to communicate that at scale. We build brand architecture that travels.",
        },
        {
          icon: "bulb",
          title: "Franchise Expansion Strategy",
          description:
            "Territory planning, franchisee profiles, fee structures, and legal frameworks — the full infrastructure needed to franchise responsibly.",
        },
        {
          icon: "menu-engineering",
          title: "Menu Engineering & Recipe Development",
          description:
            "Menus engineered for profitability and replication — balancing food cost, kitchen execution, and guest appeal at every price point.",
        },
        {
          icon: "operational",
          title: "Operational Performance Audit",
          description:
            "Deep-dive assessment of labor, flow, table turns, and service systems — identifying exactly where margin is being lost.",
        },
        {
          icon: "supply-chain",
          title: "Supply Chain Optimization",
          description:
            "Vetted vendor networks, cost management, and procurement systems built for consistency across every location in your network.",
        },
        {
          icon: "training",
          title: "Training & SOPs",
          description:
            "Comprehensive training programs and operations manuals that ensure your brand standard is delivered on day one of every new location.",
        },
      ],
    },
    {
      type: "approach-phases",
      badge: "OUR APPROACH",
      heading: [
        { text: "Four Phases. " },
        { text: "One Partnership.", highlight: true, breakBefore: true },
      ],
      description:
        "Every engagement follows a proven methodology — structured enough to deliver results, flexible enough to fit your reality.",
      phases: [
        {
          number: "01",
          title: "Brand Discovery",
          description:
            "We immerse in your concept — visiting locations, interviewing your team, and mapping your current operational reality against your growth ambition.",
        },
        {
          number: "02",
          title: "Gap Analysis",
          description:
            "We identify every structural gap between where you are and where you need to be to support franchise growth or multi-unit expansion.",
        },
        {
          number: "03",
          title: "Strategy Delivery",
          description:
            "A tailored roadmap with prioritized initiatives, investment thresholds, timelines, and success metrics for every phase of growth.",
        },
        {
          number: "04",
          title: "Execution Partnership",
          description:
            "We stay engaged through implementation — reviewing, coaching, and adapting the strategy as your business evolves.",
        },
      ],
    },
    {
      type: "testimonial",
      quote:
        "RCS doesn't just hand you a playbook and leave. They built our franchise infrastructure from the ground up and stayed with us through our first 12 units.",
      attribution: {
        title: "Multi-Unit FSR Operator",
        subtitle: "Michigan",
      },
      images: {
        featured: featuredImage,
        operations: operationsImage,
        growth: growthImage,
      },
    },
    {
      type: "also-relevant",
      badge: "ALSO RELEVANT",
      items: [
        {
          index: "02",
          title: "Quick Service Restaurants",
          description: "Speed, Profitability & Multi-Location Growth",
          image: serviceImage,
          cta: "Explore",
          href: "/industries",
        },
        {
          index: "03",
          title: "Cafes & Bakeries",
          description: "Authentic Concepts Built to Grow",
          image: cafesImage,
          cta: "Explore",
          href: "/industries",
        },
        {
          title: "Catering & Events",
          description: "Operations, Pricing & Revenue Diversification",
          image: cateringImage,
          cta: "Explore",
          href: "/industries",
        },
      ],
    },
  ],
} satisfies IndustryDetailContent;

export const industryDetailPages: Record<string, IndustryDetailContent> = {
  "full-service-restaurants": industryDetailPageContent,
};

export const getIndustryDetailPage = (slug: string) => industryDetailPages[slug];
