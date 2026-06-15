import Facebook from "@/assets/icons/socials/Facebook";
import Instagram from "@/assets/icons/socials/Instagram";
import Linkedin from "@/assets/icons/socials/Linkedin";
import Youtube from "@/assets/icons/socials/Youtube";
import type { ComponentType } from "react";

export type FooterNavLink = {
  label: string;
  href: string;
};

export type FooterSocialLink = {
  label: string;
  href: string;
  icon: ComponentType;
};

export const footerNavLinks: FooterNavLink[] = [
  { label: "Terms", href: "#" },
  { label: "Privacy", href: "#" },
  { label: "Cookies", href: "#" },
  { label: "Product", href: "#" },
  { label: "Company", href: "#" },
];

export const footerSocialLinks: FooterSocialLink[] = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Facebook", href: "#", icon: Facebook },
  { label: "Instagram", href: "#", icon: Instagram },
  { label: "YouTube", href: "#", icon: Youtube },
];
