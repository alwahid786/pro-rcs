import type { PageContent } from "@/components/content/types";
import { blogPosts } from "./posts-data";

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
