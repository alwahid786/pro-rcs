import type { PageContent } from "@/components/content/types";

export type IndustryDetailContent = PageContent & {
  industrySlug: string;
};

export const industryDetailPageContent = {
  slug: "industry-detail",
  industrySlug: "restaurants",
  meta: {
    title: "Restaurant Industry | RCS",
    description:
      "End-to-end consulting for restaurant operators ready to franchise, grow, and dominate their market.",
  },
  sections: [
    {
      type: "hero",
      heading: [
        { text: "Restaurant " },
        { text: "Industry", highlight: true },
      ],
      description:
        "End-to-end consulting for operators ready to franchise, grow, and dominate their market — from concept through hundredth location.",
      secondaryButton: { label: "Book Consultation", href: "/contact" },
      primaryButton: { label: "Our Services", href: "/services" },
    },
    {
      type: "heading-intro",
      badge: "Industry Focus",
      heading: {
        prefix: "Built For",
        highlight: "Restaurants",
      },
      description:
        "We understand the unique operational, financial, and growth challenges restaurant operators face — and we build systems that solve them at scale.",
    },
  ],
} satisfies IndustryDetailContent;
