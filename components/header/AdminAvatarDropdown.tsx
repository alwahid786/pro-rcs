"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type AdminAvatarDropdownProps = {
  admin: {
    firstName: string;
    lastName: string;
    email: string;
  };
};

export default function AdminAvatarDropdown({ admin }: AdminAvatarDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const initials = `${admin.firstName[0] || ""}${admin.lastName[0] || ""}`.toUpperCase();

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/admin/login");
        router.refresh();
      }
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-white font-semibold text-sm shadow transition-transform duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-secondary/30 cursor-pointer"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        {initials}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-56 origin-top-right rounded-2xl border border-border/80 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 z-50">
          <div className="px-3 py-2 border-b border-border/40">
            <p className="text-xs text-text-secondary">Logged in as</p>
            <p className="text-sm font-semibold text-text truncate">
              {admin.firstName} {admin.lastName}
            </p>
            <p className="text-xs text-text-secondary truncate mt-0.5">{admin.email}</p>
          </div>
          <div className="py-1 mt-1 space-y-0.5">
            <Link
              href="/admin/profile"
              onClick={() => setIsOpen(false)}
              className="flex w-full items-center px-3 py-2 text-sm text-text rounded-xl transition-colors hover:bg-secondary/5 hover:text-secondary"
            >
              Profile Settings
            </Link>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex w-full items-center px-3 py-2 text-sm text-red-600 rounded-xl transition-colors hover:bg-red-50 text-left focus:outline-none cursor-pointer"
            >
              {isLoggingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
