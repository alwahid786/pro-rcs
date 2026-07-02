"use client";

import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import AdminAvatarDropdown from "@/components/header/AdminAvatarDropdown";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef, useCallback } from "react";
import logo from "@/assets/imgs/main-logo.png";

type AdminHeaderProps = {
  admin: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default function AdminHeader({ admin }: AdminHeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [fddOpen, setFddOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleOpenFdd = useCallback(() => {
    clearCloseTimer();
    setFddOpen(true);
  }, [clearCloseTimer]);

  const handleCloseFdd = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setFddOpen(false), 120);
  }, [clearCloseTimer]);

  return (
    <header
      className={cn(
        "pointer-events-none sticky top-0 z-50 overflow-visible px-4 transition-all duration-300",
        scrolled
          ? "pt-2 pb-2 sm:pt-2.5 sm:pb-2.5"
          : "pt-4 pb-5 sm:pt-5 sm:pb-6",
      )}
    >
      <div className="container pointer-events-auto overflow-visible mx-auto max-w-6xl">
        <section
          className={cn(
            "animate-header-enter flex items-center justify-between gap-4 overflow-visible rounded-full border transition-all duration-500",
            scrolled
              ? "border-white/40 bg-white/70 backdrop-blur-md shadow-md px-4 py-1.5 sm:px-6 sm:py-2 lg:px-8"
              : "border-white/60 shadow-glass px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 glass backdrop-blur-sm",
          )}
        >
          {/* Logo */}
          <Link
            href="/admin/dashboard"
            className="shrink-0 transition-opacity hover:opacity-80"
          >
            <Image
              src={logo}
              alt="PRO RCS Admin"
              width={118}
              height={48}
              priority
              className="h-10 w-auto sm:h-11"
            />
            <span className="sr-only">Admin Dashboard</span>
          </Link>

          {/* Navigation Links */}
          <nav className="flex items-center gap-7 lg:gap-9">
            <Link
              href="/admin/dashboard"
              className="rounded-full px-1 py-1 text-[15px] font-medium text-text transition-colors duration-200 hover:text-secondary"
            >
              Home
            </Link>

            {/* FDD Dropdown Menu */}
            <div
              className="relative"
              onMouseEnter={handleOpenFdd}
              onMouseLeave={handleCloseFdd}
              onFocus={handleOpenFdd}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget as Node)) {
                  handleCloseFdd();
                }
              }}
            >
              <button
                type="button"
                aria-expanded={fddOpen}
                aria-haspopup="true"
                className={cn(
                  "group flex items-center gap-1.5 rounded-full px-1 py-1 text-[15px] font-medium text-text transition-colors duration-200 cursor-pointer",
                  "hover:text-secondary focus-visible:outline-none",
                  fddOpen && "text-secondary",
                )}
              >
                FDD
                <ChevronDownIcon
                  className={cn(
                    "text-text-secondary transition-transform duration-300 ease-out group-hover:text-secondary",
                    fddOpen && "rotate-180 text-secondary",
                  )}
                />
              </button>

              <div
                className={cn(
                  "absolute top-full left-1/2 z-50 w-52 -translate-x-1/2 pt-4",
                  "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
                  fddOpen
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none -translate-y-2 opacity-0",
                )}
              >
                <div className="relative overflow-hidden rounded-2xl border border-[#ece7e1] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
                  <ul className="flex flex-col gap-0.5">
                    <li>
                      <Link
                        href="/admin/fdd/existing"
                        className="group/item flex flex-col rounded-xl px-3.5 py-2.5 transition-colors duration-200 hover:bg-secondary/5"
                      >
                        <span className="block text-sm font-medium text-text transition-colors group-hover/item:text-secondary">
                          Existing FDD
                        </span>
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/admin/fdd/signed"
                        className="group/item flex flex-col rounded-xl px-3.5 py-2.5 transition-colors duration-200 hover:bg-secondary/5"
                      >
                        <span className="block text-sm font-medium text-text transition-colors group-hover/item:text-secondary">
                          Signed FDD
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </nav>

          {/* Right Section (Avatar Dropdown) */}
          <div className="flex items-center gap-3">
            <AdminAvatarDropdown admin={admin} />
          </div>
        </section>
      </div>
    </header>
  );
}
