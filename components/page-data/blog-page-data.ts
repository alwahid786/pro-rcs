import type { BlogPost, PageContent } from "./types";

export const blogPosts = [
  {
    slug: "how-to-franchise-your-restaurant",
    title: "How To Franchise Your Restaurant: A Step-By-Step Guide",
    excerpt:
      "Turning a successful single location into a franchise brand requires more than great food. Here's the roadmap operators use to go from one unit to a scalable system.",
    category: "Franchising",
    date: "2026-03-12",
    readTime: "8 min read",
    href: "/blog/how-to-franchise-your-restaurant",
    author: {
      name: "RCS Team",
      role: "Restaurant Growth Consultants",
    },
  },
  {
    slug: "menu-engineering-for-multi-location-brands",
    title: "Menu Engineering For Multi-Location Brands",
    excerpt:
      "Your menu is one of the most powerful levers for margin and consistency. Learn how top operators design menus that scale without sacrificing quality.",
    category: "Operations",
    date: "2026-02-28",
    readTime: "6 min read",
    href: "/blog/menu-engineering-for-multi-location-brands",
    author: {
      name: "RCS Team",
      role: "Restaurant Growth Consultants",
    },
  },
  {
    slug: "building-franchise-ready-operations",
    title: "Building Franchise-Ready Operations Before You Expand",
    excerpt:
      "Expansion breaks brands that aren't operationally ready. These are the systems, SOPs, and training frameworks to put in place before location two.",
    category: "Operations",
    date: "2026-02-14",
    readTime: "7 min read",
    href: "/blog/building-franchise-ready-operations",
    author: {
      name: "RCS Team",
      role: "Restaurant Growth Consultants",
    },
  },
  {
    slug: "market-analysis-for-restaurant-expansion",
    title: "Market Analysis For Restaurant Expansion: What To Look For",
    excerpt:
      "Site selection and market feasibility can make or break your next location. Here's how we evaluate markets before our clients commit capital.",
    category: "Strategy",
    date: "2026-01-30",
    readTime: "5 min read",
    href: "/blog/market-analysis-for-restaurant-expansion",
    author: {
      name: "RCS Team",
      role: "Restaurant Growth Consultants",
    },
  },
  {
    slug: "franchise-marketing-that-attracts-the-right-operators",
    title: "Franchise Marketing That Attracts The Right Operators",
    excerpt:
      "Not every franchisee is a fit. Learn how to position your brand and marketing to attract partners who will protect your standards and drive growth.",
    category: "Marketing",
    date: "2026-01-18",
    readTime: "6 min read",
    href: "/blog/franchise-marketing-that-attracts-the-right-operators",
    author: {
      name: "RCS Team",
      role: "Restaurant Growth Consultants",
    },
  },
  {
    slug: "supply-chain-strategies-for-growing-restaurant-groups",
    title: "Supply Chain Strategies For Growing Restaurant Groups",
    excerpt:
      "As you add locations, vendor relationships and purchasing power become critical. These supply chain tactics help operators protect margins at scale.",
    category: "Supply Chain",
    date: "2026-01-05",
    readTime: "5 min read",
    href: "/blog/supply-chain-strategies-for-growing-restaurant-groups",
    author: {
      name: "RCS Team",
      role: "Restaurant Growth Consultants",
    },
  },
] satisfies BlogPost[];

export const blogPageContent = {
  slug: "blog",
  meta: {
    title: "Blog | RCS",
    description:
      "Insights on franchising, operations, menu engineering, and restaurant growth from the RCS consulting team.",
  },
  sections: [
    {
      type: "hero",
      heading: [
        { text: "Insights For " },
        { text: "Restaurant", highlight: true },
        { text: " Operators" },
      ],
      description:
        "Practical strategies on franchising, operations, marketing, and growth — written for operators who are building something bigger than a single location.",
      secondaryButton: { label: "Book Consultation", href: "/contact" },
      primaryButton: { label: "Our Services", href: "/services" },
    },
    {
      type: "heading-intro",
      badge: "From The RCS Team",
      heading: {
        prefix: "Latest",
        highlight: "Articles",
      },
      description:
        "Actionable guidance on the systems, decisions, and strategies that help restaurant brands scale with confidence.",
    },
    {
      type: "blog-list",
      posts: blogPosts,
    },
  ],
} satisfies PageContent;
