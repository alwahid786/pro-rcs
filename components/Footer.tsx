import footerLogo from "@/assets/imgs/footer-logo.png";
import { footerNavLinks, footerSocialLinks } from "@/components/footer/footer-data";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-white py-14">
      <div className="container mx-auto flex flex-col gap-[100px]">
        <nav aria-label="Footer navigation" className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 sm:gap-x-12">
          {footerNavLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="font-sans text-sm font-medium text-text underline underline-offset-4 transition-colors hover:text-primary sm:text-base"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-10">
          <div className="flex justify-center">
            <Image
              src={footerLogo}
              alt="PRO RCS Franchise Development Brand Scale"
              className="h-auto w-full max-w-4xl object-contain"
              sizes="(max-width: 1220px) 100vw, 896px"
              priority={false}
            />
          </div>

          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row sm:items-center">
            <p className="font-sans text-sm text-text-secondary sm:text-base">© 2026 PRO RCS. All Rights Reserved.</p>

            <div className="flex items-center gap-3 sm:gap-4">
              {footerSocialLinks.map((social) => {
                const Icon = social.icon;

                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="inline-flex size-12 shrink-0 items-center justify-center transition-opacity hover:opacity-80 sm:size-14 [&_svg]:size-full"
                  >
                    <Icon />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
