"use client";

import Image from "next/image";
import logo from "@/assets/imgs/main-logo.png";
import Link from "next/link";
import SearchIcon from "@/assets/icons/SearchIcon";
import Button from "./ui/Button";

const Header = () => {
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Products",
      href: "/about",
    },
    {
      label: "Services",
      href: "/services",
    },
    {
      label: "Contact",
      href: "/contact",
    },
  ];
  return (
    <header className="flex flex-col gap-4 items-center py-3 sticky top-0 z-50">
      <section className="container flex items-center justify-between shadow-[0_4px_14px_0_#00000017,inset_0_4px_14px_0_#0000001A,inset_0_-4px_4px_0_#00000005] bg-[#ffffff30] backdrop-blur-[3px] px-5 py-3 rounded-full">
        <Image src={logo} alt="logo" width={100} height={100} />
        <nav className="flex items-center gap-4">
          {navItems.map((item) => (
            <Link href={item.href} key={item.label}>
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-4">
          <SearchIcon />
          <div className="w-px h-4 bg-border" />
          <Button variant="secondary">Login</Button>
        </div>
      </section>
    </header>
  );
};

export default Header;
