import type { StaticImageData } from "next/image";

/** Shared heading with one highlighted phrase — used in badges, section titles, etc. */
export type MulticolorHeading = {
  prefix: string;
  highlight: string;
  suffix?: string;
};

/** Multi-segment heading — any segment can be highlighted (orange). */
export type HeadingSegment = {
  text: string;
  highlight?: boolean;
};

export type PageButton = {
  label: string;
  href: string;
};

export type PageMeta = {
  title: string;
  description?: string;
};

// ---------------------------------------------------------------------------
// Section content types (discriminated union via `type`)
// ---------------------------------------------------------------------------

export type HeroSectionContent = {
  type: "hero";
  heading: HeadingSegment[];
  description: string;
  primaryButton: PageButton;
  secondaryButton: PageButton;
};

export type HeadingIntroSectionContent = {
  type: "heading-intro";
  badge: string;
  heading: MulticolorHeading;
  description: string;
};

export type StatItem = {
  value: string;
  title: string;
  description: string;
};

export type StatsSectionContent = {
  type: "stats";
  badge: string;
  items: StatItem[];
};

export type OurStorySectionContent = {
  type: "our-story";
  badge: string;
  heading: MulticolorHeading;
  paragraphs: string[];
  features: string[];
  card: {
    badge: string;
    mission: { title: string; text: string };
    vision: { title: string; text: string };
    location: { title: string; address: string };
  };
};

export type MissionVisionCard = {
  title: string;
  description: string;
  quote: string;
};

export type MissionVisionSectionContent = {
  type: "mission-vision";
  badge: string;
  heading: HeadingSegment[];
  mission: MissionVisionCard;
  vision: MissionVisionCard;
};

export type CoreValueItem = {
  icon: string;
  title: string;
  description: string;
};

export type CoreValuesSectionContent = {
  type: "core-values";
  badge: string;
  heading: MulticolorHeading;
  description: string;
  items: CoreValueItem[];
};

export type ExpertiseAreaCard = {
  number: string;
  title: string;
  items: string[];
  variant: "dark" | "light";
};

export type ExpertiseAreasSectionContent = {
  type: "expertise-areas";
  badge: string;
  heading: MulticolorHeading;
  cta: PageButton;
  cards: ExpertiseAreaCard[];
};

export type CtaContactItem = {
  label: string;
  value: string;
  href?: string;
};

export type CtaContactSectionContent = {
  type: "cta-contact";
  badge: string;
  heading: HeadingSegment[];
  description: string;
  primaryButton: PageButton;
  secondaryButton: PageButton;
  contactItems: CtaContactItem[];
};

export type ServiceAccordionItem = {
  number: string;
  title: string;
  tagline?: string;
  description?: string;
  keyAreas?: string[];
};

export type ServicesAccordionSectionContent = {
  type: "services-accordion";
  items: ServiceAccordionItem[];
};

export type FlagshipFeatureItem = {
  number: string;
  title: string;
  description: string;
};

export type FlagshipServiceSectionContent = {
  type: "flagship-service";
  badge: string;
  heading: HeadingSegment[];
  description: string;
  quote: string;
  cta: PageButton;
  features: FlagshipFeatureItem[];
};

export type ProcessGridStep = {
  number: string;
  title: string;
  description: string;
};

export type ProcessGridSectionContent = {
  type: "process-grid";
  badge: string;
  steps: ProcessGridStep[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  readTime: string;
  href: string;
  image?: StaticImageData | string;
  author?: {
    name: string;
    role?: string;
  };
};

export type BlogListSectionContent = {
  type: "blog-list";
  badge?: string;
  heading?: MulticolorHeading;
  description?: string;
  posts: BlogPost[];
};

/** Any section that can appear on a page. Add new section types here as pages grow. */
export type PageSection =
  | HeroSectionContent
  | HeadingIntroSectionContent
  | StatsSectionContent
  | OurStorySectionContent
  | MissionVisionSectionContent
  | CoreValuesSectionContent
  | ExpertiseAreasSectionContent
  | CtaContactSectionContent
  | ServicesAccordionSectionContent
  | FlagshipServiceSectionContent
  | ProcessGridSectionContent
  | BlogListSectionContent;

/** Top-level page content — compose sections in any order per page. */
export type PageContent = {
  slug: string;
  meta: PageMeta;
  sections: PageSection[];
};
