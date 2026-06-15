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
        label: "Managed IT",
        href: "/services/managed-it",
        description: "End-to-end infrastructure and support",
      },
      {
        label: "Cloud & DevOps",
        href: "/services/cloud-devops",
        description: "Scale with secure, automated systems",
      },
      {
        label: "Cybersecurity",
        href: "/services/cybersecurity",
        description: "Protect operations without slowing growth",
      },
      {
        label: "Digital Transformation",
        href: "/services/digital-transformation",
        description: "Modernize processes across locations",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Multi-Location Ops",
        href: "/solutions/multi-location",
        description: "Unified systems for every site",
      },
      {
        label: "Compliance & Risk",
        href: "/solutions/compliance",
        description: "Stay audit-ready at scale",
      },
      {
        label: "Business Intelligence",
        href: "/solutions/business-intelligence",
        description: "Turn data into decisions",
      },
      {
        label: "Process Automation",
        href: "/solutions/automation",
        description: "Reduce manual work across teams",
      },
    ],
  },
  {
    label: "Case studies",
    href: "/case-studies",
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        label: "Healthcare",
        href: "/industries/healthcare",
        description: "HIPAA-ready IT for care networks",
      },
      {
        label: "Retail & Hospitality",
        href: "/industries/retail",
        description: "POS, inventory, and guest experience",
      },
      {
        label: "Professional Services",
        href: "/industries/professional-services",
        description: "Secure collaboration at scale",
      },
      {
        label: "Manufacturing",
        href: "/industries/manufacturing",
        description: "Connected plants and supply chains",
      },
    ],
  },
  {
    label: "Company",
    href: "/company",
    children: [
      {
        label: "About Us",
        href: "/company/about",
        description: "Our story, mission, and leadership",
      },
      {
        label: "Careers",
        href: "/company/careers",
        description: "Join the team building what's next",
      },
      {
        label: "Partners",
        href: "/company/partners",
        description: "Technology and service alliances",
      },
      {
        label: "Contact",
        href: "/company/contact",
        description: "Talk to our specialists",
      },
    ],
  },
];
