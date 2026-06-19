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
