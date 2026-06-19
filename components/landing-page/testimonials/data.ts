import test1 from "@/assets/imgs/test-1.png";
import test2 from "@/assets/imgs/test-2.png";
import test3 from "@/assets/imgs/test-3.png";
import type { StaticImageData } from "next/image";

export type Testimonial = {
  quote: string;
  brand: string;
  logo: StaticImageData;
};

export const testimonialsContent = {
  badge: "What Our Clients Say",
  heading: {
    prefix: "Trusted By",
    highlight: "Growing",
    suffix: "Brands",
  },
  ctaLabel: "Read Success Stories",
  items: [
    {
      quote:
        "PRO RCS helped us streamline operations across multiple locations. Their systems gave us consistency we couldn't achieve on our own.",
      brand: "Sarouja",
      logo: test2,
    },
    {
      quote:
        "From supply chain to franchise structure, the team delivered practical solutions that improved efficiency and strengthened our brand.",
      brand: "Hashem's",
      logo: test1,
    },
    {
      quote:
        "Their guidance through expansion was invaluable. We now have scalable processes that support sustainable growth across our markets.",
      brand: "Samis Shawarma",
      logo: test3,
    },
    {
      quote:
        "Working with PRO RCS transformed how we approach multi-location management. Clear strategy, strong execution, and real results.",
      brand: "Sarouja",
      logo: test2,
    },
    {
      quote:
        "The partnership brought structure to our growth plans and connected us with the right experts at every stage of expansion.",
      brand: "Hashem's",
      logo: test1,
    },
  ] satisfies Testimonial[],
};
