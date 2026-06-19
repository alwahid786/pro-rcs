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
        { text: "Industries We " },
        { text: "Serve", highlight: true },
      ],
      description:
        "From fast casual to fine dining, franchise brands to multi-unit operators — we bring deep restaurant expertise to every segment of the industry.",
      secondaryButton: { label: "Book Consultation", href: "/contact" },
      primaryButton: { label: "Our Services", href: "/services" },
    },
    {
      type: "heading-intro",
      badge: "Our Expertise",
      heading: {
        prefix: "Specialized For",
        highlight: "Your Segment",
      },
      description:
        "Every restaurant segment has unique challenges. We tailor our consulting approach to the operational, financial, and growth dynamics of your specific market.",
    },
  ],
} satisfies PageContent;
