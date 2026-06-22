import type { PageContent } from "@/components/content/types";
import featuredImage from "@/assets/imgs/blog/featured.jpg";
import growthImage from "@/assets/imgs/blog/growth.jpg";
import marketingImage from "@/assets/imgs/blog/marketing.jpg";
import operationsImage from "@/assets/imgs/blog/operations.jpg";
import streamliningImage from "@/assets/imgs/blog/streamlining.jpg";
import trendsImage from "@/assets/imgs/blog/trends.jpg";

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
        { text: "Insights For The " },
        { text: "Modern", highlight: true },
        { text: " Operator." },
      ],
      description:
        "Strategy, Operations, And Growth Intelligence — Written By Consultants Who've Lived Inside The Restaurant Industry. No Fluff, No Generic Advice.",
      secondaryButton: { label: "Book Consultation", href: "/contact" },
      primaryButton: { label: "Our Services", href: "/services" },
    },
    {
      type: "blog-list",
      filters: ["All", "Franchise", "Operations", "Marketing", "Growth", "Trends"],
      featured: {
        slug: "why-restaurant-consulting-is-essential-for-franchise",
        featured: true,
        category: "Franchise",
        date: "May 14, 2025",
        readTime: "12 min read",
        title: "Why Restaurant Consulting Services are Essential for Structuring Your Franchise",
        excerpt:
          "Building a franchise from the ground up demands more than a great concept. Discover how expert consulting creates the structural foundation — legal, operational, and financial — that separates thriving franchise networks from stalled ones.",
        image: featuredImage,
        href: "/blog/why-restaurant-consulting-is-essential-for-franchise",
        author: {
          name: "RCS Team",
          role: "Restaurant Consultants",
        },
      },
      posts: [
        {
          slug: "elevating-guest-experiences",
          category: "Operations",
          date: "Apr 29, 2025",
          readTime: "6 min read",
          title: "Restaurant Consulting: Elevating Guest Experiences to New Heights",
          excerpt:
            "Guest experience is the new battleground for restaurant loyalty. We break down the consulting frameworks that ...",
          image: operationsImage,
          href: "/blog/elevating-guest-experiences",
        },
        {
          slug: "master-profit-growth-strategies",
          category: "Growth",
          date: "Apr 10, 2025",
          readTime: "10 min read",
          title: "Restaurant Consulting: Master Profit Growth With Proven, High-Impact Strategies",
          excerpt:
            "Profit isn't just about cutting costs — it's about engineering every touchpoint of your operation to perform. ...",
          image: growthImage,
          href: "/blog/master-profit-growth-strategies",
        },
      ],
    },
    {
      type: "blog-rows",
      posts: [
        {
          slug: "streamlining-restaurant-operations",
          category: "Operations",
          date: "Mar 22, 2025",
          readTime: "7 min read",
          title: "Streamlining Operations: How Restaurant Consulting Services Can Help Improve Efficiency",
          excerpt:
            "Operational drag is the silent killer of restaurant profitability. From kitchen layout to staffing structures, consultants identify and eliminate friction at every layer of the operation.",
          image: streamliningImage,
          href: "/blog/streamlining-restaurant-operations",
        },
        {
          slug: "marketing-strategies-for-restaurant-growth",
          category: "Marketing",
          date: "Mar 5, 2025",
          readTime: "9 min read",
          title: "Marketing Strategies for Restaurants: How Consulting Services Can Help Drive Growth",
          excerpt:
            "In a crowded market, visibility isn't enough — you need a strategy that converts awareness into foot traffic, and foot traffic into loyal regulars. Here's how consulting reshapes restaurant marketing.",
          image: marketingImage,
          href: "/blog/marketing-strategies-for-restaurant-growth",
        },
        {
          slug: "restaurant-industry-trends",
          category: "Trends",
          date: "Feb 18, 2025",
          readTime: "11 min read",
          title: "Keeping Up with the Latest Restaurant Industry Trends: How Consulting Services Can Help",
          excerpt:
            "From AI-driven ordering to ghost kitchens and sustainability mandates — the restaurant landscape is shifting faster than most operators can track. Stay ahead with strategic trend intelligence.",
          image: trendsImage,
          href: "/blog/restaurant-industry-trends",
        },
        {
          slug: "franchise-expansion-readiness",
          category: "Franchise",
          date: "Feb 4, 2025",
          readTime: "8 min read",
          title: "Is Your Restaurant Ready to Franchise? A Consultant's Checklist",
          excerpt:
            "Before you sell your first franchise unit, your brand, operations, and financial model need to be replication-ready. This checklist reveals where most operators fall short.",
          image: featuredImage,
          href: "/blog/franchise-expansion-readiness",
        },
        {
          slug: "scaling-multi-location-growth",
          category: "Growth",
          date: "Jan 20, 2025",
          readTime: "7 min read",
          title: "Scaling Beyond Location Three: What Changes When You Grow",
          excerpt:
            "The playbook that got you to three locations won't get you to ten. Here's what shifts in leadership, systems, and capital strategy as multi-unit growth accelerates.",
          image: growthImage,
          href: "/blog/scaling-multi-location-growth",
        },
      ],
    },
    {
      type: "industry-block",
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
          description: "Every engagement is held to the highest standard — no shortcuts, no half-measures.",
        },
        {
          title: "Integrity",
          description: "We tell you what you need to hear, not what you want to hear.",
        },
        {
          title: "Innovation",
          description: "We bring fresh thinking to old problems and build systems that last.",
        },
        {
          title: "Collaboration",
          description: "Your growth is our growth. We work as partners, not vendors.",
        },
      ],
    },
  ],
} satisfies PageContent;
