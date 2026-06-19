import footer1 from "@/assets/imgs/footer-1.png";
import footer2 from "@/assets/imgs/footer-2.png";
import footer3 from "@/assets/imgs/footer-3.png";
import type { StaticImageData } from "next/image";

export type UpperFooterImage = {
  src: StaticImageData;
  alt: string;
  rotateClass: string;
};

export const upperFooterImages: UpperFooterImage[] = [
  {
    src: footer1,
    alt: "Restaurant consultant reviewing operations",
    rotateClass: "rotate-6",
  },
  {
    src: footer2,
    alt: "Franchise business professional",
    rotateClass: "rotate-0",
  },
  {
    src: footer3,
    alt: "Restaurant leadership team member",
    rotateClass: "-rotate-6",
  },
];
