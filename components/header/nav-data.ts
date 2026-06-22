export type NavChild = {
  label: string;
  href: string;
  description?: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

export const navItems: NavItem[] = [
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "All Services",
        href: "/services",
        description: "Nine consulting services for restaurant growth",
      },
      {
        label: "Service Framework",
        href: "/services#services-list",
        description: "Explore the full service stack and key areas",
      },
      {
        label: "Flagship Program",
        href: "/services#flagship-service",
        description: "Franchise development and support infrastructure",
      },
      {
        label: "How We Work",
        href: "/services#how-we-work",
        description: "Discovery to execution in four phases",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/industries",
    children: [
      {
        label: "Industry Solutions",
        href: "/industries",
        description: "Built for each restaurant format and growth stage",
      },
      {
        label: "Full-Service Restaurants",
        href: "/industries/full-service-restaurants",
        description: "Scalable strategy and operational systems",
      },
      {
        label: "Service Programs",
        href: "/services",
        description: "From concept development to execution support",
      },
      {
        label: "Insights & Playbooks",
        href: "/blog",
        description: "Franchise, operations, growth, and trends content",
      },
    ],
  },
  {
    label: "Case studies",
    href: "/blog",
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        label: "All Industries",
        href: "/industries#industries-list",
        description: "Quick service, full-service, cafes, and catering",
      },
      {
        label: "Full-Service Restaurants",
        href: "/industries/full-service-restaurants",
        description: "Deep strategy and operations support for scaling",
      },
      {
        label: "Catering & Events",
        href: "/industries#industries-list",
        description: "Logistics, pricing, and recurring revenue strategy",
      },
      {
        label: "Cafes & Bakeries",
        href: "/industries#industries-list",
        description: "Community-driven growth and brand systems",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      {
        label: "About Us",
        href: "/about",
        description: "Our story, mission, values, and expertise",
      },
      {
        label: "Services",
        href: "/services",
        description: "Explore our consulting and growth programs",
      },
      {
        label: "Industries",
        href: "/industries",
        description: "See where we help operators scale",
      },
      {
        label: "Insights",
        href: "/blog",
        description: "Read strategic content for modern operators",
      },
    ],
  },
];
