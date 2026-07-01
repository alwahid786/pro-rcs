"use client";

import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import type { NavItem } from "@/components/header/nav-data";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useCallback, useRef, useState } from "react";

type NavDropdownProps = {
  item: NavItem & { children: NonNullable<NavItem["children"]> };
};

const NavDropdown = ({ item }: NavDropdownProps) => {
  const [open, setOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = useCallback(() => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  }, []);

  const handleOpen = useCallback(() => {
    clearCloseTimer();
    setOpen(true);
  }, [clearCloseTimer]);

  const handleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 120);
  }, [clearCloseTimer]);

  return (
    <div
      className="relative"
      onMouseEnter={handleOpen}
      onMouseLeave={handleClose}
      onFocus={handleOpen}
      onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          handleClose();
        }
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-haspopup="true"
        className={cn(
          "group flex items-center gap-1.5 rounded-full px-1 py-1 text-[15px] font-medium text-text transition-colors duration-200",
          "hover:text-secondary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/30",
          open && "text-secondary",
        )}
      >
        {item.label}
        <ChevronDownIcon
          className={cn(
            "text-text-secondary transition-transform duration-300 ease-out",
            open && "rotate-180 text-secondary",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute top-full left-1/2 z-50 w-72 -translate-x-1/2 pt-4",
          "transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-2 opacity-0",
        )}
      >
        <div className="relative overflow-hidden rounded-2xl border border-[#ece7e1] bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
          <ul className="flex flex-col gap-0.5">
            {item.children.map((child, index) => (
              <li
                key={child.href}
                className="animate-dropdown-item"
                style={{ animationDelay: open ? `${index * 40}ms` : "0ms" }}
              >
                <Link
                  href={child.href}
                  className="group/item flex flex-col gap-0.5 rounded-xl px-3.5 py-3 transition-colors duration-200 hover:bg-secondary/5"
                >
                  <span className="block text-sm font-medium text-text transition-colors group-hover/item:text-secondary">
                    {child.label}
                  </span>
                  {child.description && (
                    <span className="block text-xs leading-relaxed text-text-secondary">
                      {child.description}
                    </span>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavDropdown;
