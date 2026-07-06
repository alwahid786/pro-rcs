"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

interface FddMetadata {
  id: string;
  title: string;
  version: string;
  restaurantName?: string;
  fileSize: number;
  downloadUrl: string;
  uploadedAt: string;
  country?: string;
  state?: string;
}

interface FddListingProps {
  templates: FddMetadata[];
}

const formatLocation = (country?: string, state?: string) => {
  const c = country?.trim().toUpperCase();
  const s = state?.trim().toUpperCase();
  
  let countryName = c || "";
  if (c === "USA" || c === "US") countryName = "United States";
  else if (c === "CAN" || c === "CA") countryName = "Canada";
  else if (c === "GBR" || c === "UK") countryName = "United Kingdom";

  if (s) {
    const stateFormatted = s.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
    return `${stateFormatted}, ${countryName}`;
  }
  return countryName || "Global";
};

export default function FddListing({ templates }: FddListingProps) {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Close dropdown on click outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Close dropdown if click is outside trigger button and dropdown menu
      if (target.closest(".action-trigger-btn") || target.closest(".action-dropdown-menu")) {
        return;
      }
      setOpenDropdownId(null);
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const [prevTemplates, setPrevTemplates] = useState(templates);
  if (templates !== prevTemplates) {
    setPrevTemplates(templates);
    setCurrentPage(1);
  }

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const totalPages = Math.ceil(templates.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTemplates = templates.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="overflow-visible w-full">
      <div className="overflow-visible">
        <table className="w-full text-left border-collapse overflow-visible">
          <thead>
            <tr className="border-b border-border/40 text-xs font-semibold text-text-secondary uppercase tracking-wider">
              <th className="pb-3 pl-2">Title</th>
              <th className="pb-3">Franchise</th>
              <th className="pb-3">Version</th>
              <th className="pb-3">Applies To</th>
              <th className="pb-3">Effective Date</th>
              <th className="pb-3">Min. Review Period</th>
              <th className="pb-3">E-Signature</th>
              <th className="pb-3 text-right pr-2">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/20 overflow-visible">
            {paginatedTemplates.map((tpl) => (
              <tr
                key={tpl.id}
                className="text-sm text-text hover:bg-white/10 transition-colors overflow-visible"
              >
                <td className="py-4 pl-2 font-medium text-secondary max-w-[200px] truncate" title={tpl.title}>
                  {tpl.title}
                </td>
                <td className="py-4 font-semibold text-secondary">{tpl.restaurantName || "—"}</td>
                <td className="py-4 font-semibold text-xs text-text">{tpl.version}</td>
                <td className="py-4 text-xs text-text-secondary">{formatLocation(tpl.country, tpl.state)}</td>
                <td className="py-4 text-xs text-text-secondary">
                  {new Date(tpl.uploadedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </td>
                <td className="py-4 text-xs font-semibold text-secondary">14 Days</td>
                <td className="py-4 text-xs font-bold text-emerald-600">Required</td>
                <td className="py-4 text-right pr-2 relative overflow-visible">
                  <button
                    onClick={() => toggleDropdown(tpl.id)}
                    className="action-trigger-btn inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-xl shadow transition-all hover:bg-secondary/90 active:scale-95 focus:outline-none cursor-pointer"
                  >
                    Action
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {openDropdownId === tpl.id && (
                    <div
                      className="action-dropdown-menu absolute right-2 mt-2 w-72 origin-top-right rounded-2xl border border-border/80 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 z-50 text-left"
                    >
                      <div className="py-1 space-y-0.5">
                        <a
                          href={tpl.downloadUrl}
                          download
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-text rounded-xl transition-colors hover:bg-secondary/5 hover:text-secondary cursor-pointer"
                        >
                          <svg className="w-4 h-4 shrink-0 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                          </svg>
                          Download Document for Review
                        </a>
                        <Link
                          href={`/fdd/sign/${tpl.id}`}
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-text rounded-xl transition-colors hover:bg-secondary/5 hover:text-secondary cursor-pointer"
                        >
                          <svg className="w-4 h-4 shrink-0 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                          </svg>
                          Review and submit E-signature Document
                        </Link>
                      </div>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {templates.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 mt-4 overflow-visible animate-in fade-in">
          <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
            <span>
              Showing <span className="font-semibold text-secondary">{templates.length === 0 ? 0 : startIndex + 1}</span> to{" "}
              <span className="font-semibold text-secondary">
                {Math.min(startIndex + itemsPerPage, templates.length)}
              </span>{" "}
              of <span className="font-semibold text-secondary">{templates.length}</span> documents
            </span>
            
            <span className="hidden sm:inline text-border/60">|</span>
            
            <div className="flex items-center gap-1.5">
              <span>Show</span>
              <select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="px-2 py-0.5 rounded-lg border border-border bg-white text-secondary text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-secondary/20 cursor-pointer"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
              <span>per page</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 overflow-visible">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-xl border border-border bg-white text-secondary hover:bg-secondary/5 transition-all disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {Array.from({ length: Math.max(1, totalPages) }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                disabled={totalPages <= 1}
                className={`w-9 h-9 rounded-xl border text-xs font-bold transition-all ${
                  currentPage === page
                    ? "bg-secondary border-secondary text-white shadow-sm"
                    : "border-border bg-white text-secondary hover:bg-secondary/5"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages <= 1}
              className="p-2 rounded-xl border border-border bg-white text-secondary hover:bg-secondary/5 transition-all disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
