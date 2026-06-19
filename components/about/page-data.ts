import type { PageContent } from "@/components/content/types";

export const aboutPageContent = {
  slug: "about",
  meta: {
    title: "About Us | RCS",
    description:
      "With over 20 years of experience across North America, the GCC, and international markets, PRO RCS delivers comprehensive restaurant growth solutions.",
  },
  sections: [
    {
      type: "hero",
      heading: [
        { text: "Built By Restaurant " },
        { text: "Professionals", highlight: true },
        { text: " For Restaurant " },
        { text: "Operators", highlight: true },
      ],
      description:
        "RCS Was Founded By A Team Of Seasoned Restaurant Professionals With A Passion For Helping Businesses Scale Through Innovative Strategies, Operational Excellence, And Supply Chain Mastery.",
      secondaryButton: { label: "Book Consultation", href: "/contact" },
      primaryButton: { label: "Our Services", href: "/services" },
    },
    {
      type: "stats",
      badge: "Numbers that speak for themselves",
      items: [
        {
          value: "250+",
          title: "Franchised Units Launched",
          description: "In the past two years alone.",
        },
        {
          value: "15+",
          title: "Years of Combined Experience",
          description: "Industry veterans on our team.",
        },
        {
          value: "50+",
          title: "Restaurant Brands Served",
          description: "From independents to chains.",
        },
        {
          value: "100%",
          title: "Results-Driven Approach",
          description: "Measurable outcomes every time.",
        },
      ],
    },
    {
      type: "our-story",
      badge: "OUR STORY",
      heading: {
        prefix: "A Firm Built From the ",
        highlight: "Inside Out",
      },
      paragraphs: [
        "Restaurant Consulting Services (RCS) was founded by a team of veteran restaurant industry professionals who lived through the challenges operators face every day — from managing complex supply chains to navigating franchise growth. We didn't come from the outside looking in. We came from within the industry, and that makes all the difference.",
        "Today, RCS serves clients ranging from small independents to large multi-unit chains, delivering tailored, results-oriented solutions that drive real, sustainable growth. Our track record speaks for itself: over 250 franchised units developed and launched in just two years.",
      ],
      features: [
        "Deep industry expertise from real operators",
        "Data-driven strategies with measurable outcomes",
        "End-to-end support from concept to scale",
      ],
      card: {
        badge: "Founded with Purpose",
        mission: {
          title: "Mission",
          text: "Empower restaurants through operational excellence and franchise growth",
        },
        vision: {
          title: "Vision",
          text: "Become the nation's top restaurant consulting firm",
        },
        location: {
          title: "Dearborn, Michigan",
          address: "14661 Rotunda Drive, Dearborn, MI 48120",
        },
      },
    },
    {
      type: "mission-vision",
      badge: "WHAT DRIVES US",
      heading: [
        { text: "Our " },
        { text: "Mission", highlight: true },
        { text: " & " },
        { text: "Vision", highlight: true },
      ],
      mission: {
        title: "Our Mission",
        description:
          "To empower restaurants and franchises through innovative strategies, operational excellence, and supply chain management — leveraging industry expertise and data-driven insights to support sustainable scaling.",
        quote:
          "We exist to be the strategic backbone that restaurant operators rely on — from first concept to hundredth location.",
      },
      vision: {
        title: "Our Vision",
        description:
          "To become the nation's premier restaurant consulting firm — a trusted, long-term partner for operators of all sizes seeking smart franchise growth, optimized supply chains, and operational excellence.",
        quote:
          "A future where every restaurant operator, no matter their size, has access to enterprise-grade strategy and support.",
      },
    },
    {
      type: "core-values",
      badge: "WHAT SETS US APART",
      heading: {
        prefix: "Our Core ",
        highlight: "Values",
      },
      description:
        "These principles aren't just words on a wall — they shape every recommendation, every strategy, and every relationship we build.",
      items: [
        {
          icon: "💎",
          title: "Integrity",
          description:
            "We operate with honesty, transparency, and the highest professional standards in every client engagement.",
        },
        {
          icon: "💡",
          title: "Innovation",
          description:
            "We stay ahead of industry trends with forward-thinking solutions that give our clients a competitive edge.",
        },
        {
          icon: "🔗",
          title: "Collaboration",
          description:
            "We work in close partnership with our clients at every stage, ensuring alignment and shared success.",
        },
        {
          icon: "📊",
          title: "Results-Driven",
          description:
            "Every strategy we develop is focused on delivering measurable, meaningful outcomes for your business.",
        },
        {
          icon: "🖤",
          title: "Passion",
          description:
            "We bring genuine dedication and enthusiasm to every project — your success is our personal mission.",
        },
        {
          icon: "📚",
          title: "Continuous Learning",
          description:
            "We keep pace with industry shifts, technology, and best practices to keep you ahead of the curve.",
        },
      ],
    },
    {
      type: "expertise-areas",
      badge: "WHAT WE DO",
      heading: {
        prefix: "Our Areas of ",
        highlight: "Expertise",
      },
      cta: { label: "View All Services", href: "/services" },
      cards: [
        {
          number: "01",
          title: "Restaurant Consulting",
          variant: "dark",
          items: [
            "Concept Development",
            "Menu Engineering",
            "Franchise Expansion",
            "Operational Optimization",
          ],
        },
        {
          number: "02",
          title: "Hospitality Services",
          variant: "light",
          items: [
            "Guest Experience Design",
            "Service Excellence Training",
            "Brand Building",
            "Staff Development",
          ],
        },
        {
          number: "03",
          title: "Supply Chain",
          variant: "light",
          items: [
            "Vendor Sourcing",
            "Cost Reduction Strategies",
            "Logistics Optimization",
            "Compliance Management",
          ],
        },
      ],
    },
    {
      type: "cta-contact",
      badge: "READY TO SCALE YOUR BUSINESS?",
      heading: [
        { text: "Let's Build Your " },
        { text: "Success Story", highlight: true },
        { text: " Together" },
      ],
      description:
        "Whether you're a single-location operator or a growing multi-unit chain, we have the expertise and tools to take your business to the next level.",
      primaryButton: { label: "Book a Consultation", href: "/contact" },
      secondaryButton: { label: "Get a Quote", href: "/contact" },
      contactItems: [
        {
          label: "Email Us",
          value: "info@proros.com",
        },
        {
          label: "Our Office",
          value: "Dearborn, MI 48120",
        },
        {
          label: "Office Hours",
          value: "Mon-Fri, 8AM - 5PM",
        },
      ],
    },
  ],
} satisfies PageContent;
