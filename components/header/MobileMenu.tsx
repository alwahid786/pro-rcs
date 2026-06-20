"use client";

import ChevronDownIcon from "@/assets/icons/ChevronDownIcon";
import { navItems } from "@/components/header/nav-data";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useState } from "react";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const MobileMenu = ({ open, onClose }: MobileMenuProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);

  return (
    <div
      className={cn(
        "fixed inset-x-4 top-22 z-40 lg:hidden",
        "transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]",
        open
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-4 opacity-0",
      )}
    >
      <div className="flex max-h-[calc(100vh-6.5rem)] flex-col gap-4 overflow-y-auto rounded-3xl border border-white/50 bg-white/85 p-4 shadow-glass backdrop-blur-xl">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div key={item.label} className="rounded-2xl">
                <button
                  type="button"
                  onClick={() =>
                    setExpanded((current) =>
                      current === item.label ? null : item.label,
                    )
                  }
                  className="flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] font-medium text-text"
                >
                  {item.label}
                  <ChevronDownIcon
                    className={cn(
                      "transition-transform duration-300",
                      expanded === item.label && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-out",
                    expanded === item.label
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <ul className="flex flex-col gap-0.5 pb-2 pl-2">
                      {item.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={onClose}
                            className="block rounded-xl px-4 py-2.5 text-sm text-text-secondary hover:bg-secondary/5 hover:text-text"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className="rounded-xl px-4 py-3 text-[15px] font-medium text-text hover:bg-secondary/5"
              >
                {item.label}
              </Link>
            ),
          )}
        </nav>

        <div className="border-t border-border/60 pt-4">
          <Button variant="secondary" className="w-full" size="md">
            Get A Quote
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
