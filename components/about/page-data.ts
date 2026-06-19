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
        { text: "About " },
        { text: "Us", highlight: true },
      ],
      description:
        "With over 20 years of experience across North America, the GCC, and international markets, PRO RCS combines deep industry knowledge with a powerful network of trusted partners.",
      secondaryButton: { label: "Book Consultation", href: "/contact" },
      primaryButton: { label: "Our Services", href: "/services" },
    },
    {
      type: "heading-intro",
      badge: "Who We Are",
      heading: {
        prefix: "Built For",
        highlight: "Operators",
      },
      description:
        "Our team includes experienced restaurant consultants, chefs, technical professionals, legal advisors, auditors, marketing and branding experts, franchise specialists, and supply chain professionals. Together, we deliver comprehensive solutions that support every stage of business growth.",
    },
  ],
} satisfies PageContent;
