import logo1 from "@/assets/imgs/hero-car/logo-1.png";
import logo2 from "@/assets/imgs/hero-car/logo-2.png";
import logo3 from "@/assets/imgs/hero-car/logo-3.png";
import logo4 from "@/assets/imgs/hero-car/logo-4.png";
import logo5 from "@/assets/imgs/hero-car/logo-5.png";
import logo6 from "@/assets/imgs/hero-car/logo-6.png";
import logo7 from "@/assets/imgs/hero-car/logo-7.png";
import logo8 from "@/assets/imgs/hero-car/logo-8.png";
import type { StaticImageData } from "next/image";

export type HeroCarouselLogo = {
  src: StaticImageData;
  alt: string;
};

export const heroCarouselLogos: HeroCarouselLogo[] = [
  { src: logo1, alt: "Hashem's 1959" },
  { src: logo2, alt: "Partner logo" },
  { src: logo3, alt: "Sarouja" },
  { src: logo4, alt: "Partner logo" },
  { src: logo5, alt: "Partner logo" },
  { src: logo6, alt: "Partner logo" },
  { src: logo7, alt: "Partner logo" },
  { src: logo8, alt: "Partner logo" },
];
