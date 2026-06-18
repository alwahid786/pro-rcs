import service1 from "@/assets/imgs/services/service-1.png";
import service1Mob from "@/assets/imgs/services/service-1-mb.png";
import service2 from "@/assets/imgs/services/service-2.png";
import service2Mob from "@/assets/imgs/services/service-2-mb.png";
import service3 from "@/assets/imgs/services/service-3.png";
import service3Mob from "@/assets/imgs/services/service-3-mb.png";
import service4 from "@/assets/imgs/services/service-4.png";
import service4Mob from "@/assets/imgs/services/service-4-mb.png";
import service5 from "@/assets/imgs/services/service-5.png";
import service5Mob from "@/assets/imgs/services/service-5-mb.png";
import type { StaticImageData } from "next/image";

export type ServiceData = {
  slug: string;
  category: string;
  headline: string;
  offeringsHeading: string;
  points: string[];
  footerNote: string;
  image: StaticImageData;
  imageMobile: StaticImageData;
};

export const serviceData: ServiceData[] = [
  {
    slug: "consulting-strategy",
    category: "Consulting & Strategy",
    headline: "We help restaurant businesses transform into scalable franchise systems and support their growth through structured sales strategies.",
    offeringsHeading: "What we offer:",
    points: [
      "Franchise structuring",
      "SOPs and operations manuals",
      "Expansion strategy",
      "Brand consistency systems",
      "Franchise sales strategy and execution",
      "Lead generation and qualification of franchisees",
      "Coordination with franchise lawyers for FDD drafting",
    ],
    footerNote: "",
    image: service1,
    imageMobile: service1Mob,
  },
  {
    slug: "supply-chain",
    category: "Supply Chain",
    headline: "We optimize your supply chain to reduce costs, improve reliability, and strengthen vendor relationships.",
    offeringsHeading: "",
    points: [
      "Vendor sourcing and negotiation",
      "Cost optimization",
      "Inventory and logistics systems",
      "Logistics and distribution planning",
      "Master supply agreement structuring",
      "Contract renegotiation (pricing, terms and conditions)",
    ],
    footerNote: "We don't just manage your supply chain, we help you negotiate better terms and protect your margins.",
    image: service2,
    imageMobile: service2Mob,
  },
  {
    slug: "operations-systems",
    category: "Operations & Systems",
    headline: "We support your physical and operational growth end-to-end.",
    offeringsHeading: "",
    points: [
      "Quality control systems",
      "Process standardization",
      "Compliance support",
      "Risk management",
      "Access to architects and interior designers licensed across the U.S.",
      "Guidance in selecting the right general contractor (GC)",
      "Kitchen design and equipment selection to support operations and maintain optimal ticket times",
    ],
    footerNote: "",
    image: service3,
    imageMobile: service3Mob,
  },
  {
    slug: "brand-growth",
    category: "Brand & Growth",
    headline: "We help you build a menu that is scalable and profitable.",
    offeringsHeading: "",
    points: ["Access to experienced master chefs", "Menu structuring for scalability", "Costing and profitability optimization", "Standardization for multi-location consistency"],
    footerNote: "",
    image: service4,
    imageMobile: service4Mob,
  },
  {
    slug: "operations-expansion",
    category: "Operations & Systems (Expansion)",
    headline: "We help you make the right expansion decisions.",
    offeringsHeading: "",
    points: ["SEO analysis through national partners", "Market feasibility studies", "Site selection and location strategy"],
    footerNote: "",
    image: service5,
    imageMobile: service5Mob,
  },
];
