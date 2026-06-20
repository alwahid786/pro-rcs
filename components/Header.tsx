"use client";

import SearchIcon from "@/assets/icons/SearchIcon";
import MobileMenu from "@/components/header/MobileMenu";
import NavDropdown from "@/components/header/NavDropdown";
import { navItems } from "@/components/header/nav-data";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logo from "@/assets/imgs/main-logo.png";

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="pointer-events-none sticky top-0 z-50 overflow-visible px-4 pt-4 pb-5 sm:px-5 sm:pt-5 sm:pb-6">
        <div className="container pointer-events-auto overflow-visible">
          <section
            className={cn(
              "animate-header-enter flex items-center justify-between gap-4 overflow-visible rounded-full border border-white/60 px-4 py-2.5 shadow-glass transition-all duration-500 sm:px-6 sm:py-3 lg:px-8 glass backdrop-blur-sm",
            )}
          >
            <Link href="/" className="shrink-0 transition-opacity hover:opacity-80">
              <Image src={logo} alt="PRO RCS" width={118} height={48} priority className="h-10 w-auto sm:h-11" />
            </Link>

            <nav className="hidden items-center gap-7 lg:flex xl:gap-9">
              {navItems.map((item) =>
                item.children ? (
                  <NavDropdown key={item.label} item={{ ...item, children: item.children }} />
                ) : (
                  <Link key={item.label} href={item.href} className="rounded-full px-1 py-1 text-[15px] font-medium text-text transition-colors duration-200 hover:text-secondary">
                    {item.label}
                  </Link>
                ),
              )}
            </nav>

            <div className="flex items-center gap-3 sm:gap-4">
              <button type="button" aria-label="Search" className="hidden shrink-0 transition-transform duration-200 hover:scale-105 active:scale-95 sm:block">
                <SearchIcon />
              </button>

              <div className="hidden h-5 w-px bg-border sm:block" />

              <Button variant="secondary" size="sm" className="hidden sm:inline-flex">
                Get A Quote
              </Button>

              <button
                type="button"
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                onClick={() => setMobileOpen((open) => !open)}
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border/80 bg-white/70 lg:hidden"
              >
                <span className={cn("absolute h-0.5 w-4 rounded-full bg-secondary transition-all duration-300", mobileOpen ? "translate-y-0 rotate-45" : "-translate-y-1")} />
                <span className={cn("absolute h-0.5 w-4 rounded-full bg-secondary transition-all duration-300", mobileOpen ? "opacity-0" : "opacity-100")} />
                <span className={cn("absolute h-0.5 w-4 rounded-full bg-secondary transition-all duration-300", mobileOpen ? "translate-y-0 -rotate-45" : "translate-y-1")} />
              </button>
            </div>
          </section>
        </div>
      </header>

      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
};

export default Header;
