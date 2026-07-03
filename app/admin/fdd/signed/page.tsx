"use client";

import { useEffect, useState, useCallback } from "react";
import { formatPhoneNumber } from "@/lib/utils/phoneFormatter";

interface SignedFddItem {
  _id: string;
  fddId?: {
    title: string;
    restaurantName?: string;
  };
  firstName: string;
  lastName: string;
  email: string;
  number?: string;
  country: string;
  state: string;
  location: string;
  documentVersion: string;
  ipAddress: string;
  userAgent: string;
  status: string;
  signedAt: string;
}

export default function SignedFddPage() {
  const [submissions, setSubmissions] = useState<SignedFddItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter states
  const [countryFilter, setCountryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const fetchSubmissions = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/fdd/signed");
      if (res.ok) {
        const data = await res.json();
        setSubmissions(data);
      } else {
        setError("Failed to fetch signed submissions");
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSubmissions();
  }, [fetchSubmissions]);

  // Derive unique lists for filters
  const uniqueCountries = Array.from(
    new Set(submissions.map((s) => s.country).filter(Boolean)),
  );
  const uniqueBrands = Array.from(
    new Set(
      submissions
        .map((s) => s.fddId?.restaurantName || s.location)
        .filter(Boolean),
    ),
  );

  // Apply filters
  const filteredSubmissions = submissions.filter((s) => {
    const matchCountry =
      countryFilter === "All" ||
      (s.country || "").toLowerCase() === countryFilter.toLowerCase();

    const matchLocation =
      !locationFilter.trim() ||
      (s.location || "")
        .toLowerCase()
        .includes(locationFilter.toLowerCase().trim());

    const sBrand = s.fddId?.restaurantName || s.location || "Global";
    const matchBrand =
      brandFilter === "All" ||
      sBrand.toLowerCase() === brandFilter.toLowerCase();

    const searchString =
      `${s.firstName} ${s.lastName} ${s.email} ${s.location} ${s.documentVersion}`.toLowerCase();
    const matchSearch =
      !searchQuery.trim() ||
      searchString.includes(searchQuery.toLowerCase().trim());

    return matchCountry && matchLocation && matchBrand && matchSearch;
  });

  // Handle render-phase page reset
  const [prevFiltersKey, setPrevFiltersKey] = useState("");
  const currentFiltersKey = `${countryFilter}|${locationFilter}|${brandFilter}|${searchQuery}`;
  if (currentFiltersKey !== prevFiltersKey) {
    setPrevFiltersKey(currentFiltersKey);
    setCurrentPage(1);
  }

  // Paginate items
  const totalPages = Math.ceil(filteredSubmissions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedSubmissions = filteredSubmissions.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const resetFilters = () => {
    setCountryFilter("All");
    setLocationFilter("");
    setBrandFilter("All");
    setSearchQuery("");
  };

  return (
    <div className="relative min-h-screen bg-subtle p-6 sm:p-8 md:p-12">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-secondary">
              Signed FDD Submissions
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Audit trail of electronic signature acknowledgments.
            </p>
          </div>
        </div>

        {/* Unified Table and Filtering Card */}
        <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md">
          {/* Header section with Scoping / Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary">Signings Log</h2>
              {(countryFilter !== "All" ||
                locationFilter !== "" ||
                brandFilter !== "All" ||
                searchQuery !== "") && (
                <button
                  onClick={resetFilters}
                  className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  Reset Filters
                </button>
              )}
            </div>

            {/* Filter Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-2xl bg-white/30 border border-white/40 shadow-sm">
              {/* Country Select */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Country
                </label>
                <select
                  value={countryFilter}
                  onChange={(e) => setCountryFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-white text-secondary text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/20 cursor-pointer"
                >
                  <option value="All">All Countries</option>
                  {uniqueCountries.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Opportunity / Location
                </label>
                <input
                  type="text"
                  placeholder="Filter by location..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-white text-secondary text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>

              {/* Brand Select */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Restaurant Brand
                </label>
                <select
                  value={brandFilter}
                  onChange={(e) => setBrandFilter(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-white text-secondary text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/20 cursor-pointer"
                >
                  <option value="All">All Brands/Locations</option>
                  {uniqueBrands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search Field */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  Search Submission
                </label>
                <input
                  type="text"
                  placeholder="Search by name, email, version..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-border bg-white text-secondary text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-secondary/20"
                />
              </div>
            </div>
          </div>

          <div className="border-t border-border/20 pt-2">
            {loading ? (
              <div className="py-12 text-center text-text-secondary">
                Loading submissions...
              </div>
            ) : error ? (
              <div className="py-12 text-center text-red-500 font-medium">
                {error}
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="py-12 text-center text-text-secondary">
                {submissions.length === 0
                  ? "No acknowledgments signed yet."
                  : "No matching submissions found."}
              </div>
            ) : (
              <div className="overflow-x-auto w-full">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-border/40 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                      <th className="pb-3 pl-2">Name</th>
                      <th className="pb-3">Contact Details</th>
                      <th className="pb-3">Opportunity Location</th>
                      <th className="pb-3">Restaurant</th>
                      <th className="pb-3">Version</th>
                      <th className="pb-3">Signed At</th>
                      <th className="pb-3">Audit Details</th>
                      <th className="pb-3 text-right pr-2">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/20">
                    {paginatedSubmissions.map((item) => (
                      <tr
                        key={item._id}
                        className="text-sm text-text hover:bg-white/10 transition-colors animate-in fade-in"
                      >
                        <td className="py-4 pl-2 font-medium text-secondary">
                          {item.firstName} {item.lastName}
                        </td>
                        <td className="py-4">
                          <span className="block text-xs font-medium text-text">
                            {item.email}
                          </span>
                          {item.number && (
                            <span className="block text-[11px] text-text-secondary mt-0.5">
                              {formatPhoneNumber(item.number)}
                            </span>
                          )}
                        </td>
                        <td className="py-4 text-text-secondary">
                          <span className="block font-medium text-secondary">
                            {item.location}
                          </span>
                          <span className="block text-[11px]">
                            {item.state}, {item.country}
                          </span>
                        </td>
                        <td className="py-4 font-semibold text-xs text-secondary">
                          {item.fddId?.restaurantName || "—"}
                        </td>
                        <td className="py-4 font-semibold text-xs text-text">
                          {item.documentVersion}
                        </td>
                        <td className="py-4 text-xs text-text-secondary">
                          {new Date(item.signedAt).toLocaleString()}
                        </td>
                        <td className="py-4 max-w-[200px] truncate">
                          <span className="block text-[11px] text-text">
                            IP: {item.ipAddress}
                          </span>
                          <span
                            className="block text-[9px] text-text-secondary truncate mt-0.5"
                            title={item.userAgent}
                          >
                            UA: {item.userAgent}
                          </span>
                        </td>
                        <td className="py-4 text-right pr-2">
                          <a
                            href={`/api/fdd/download/signed/${item._id}`}
                            className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                            download
                          >
                            Download PDF
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredSubmissions.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 mt-4 overflow-visible animate-in fade-in">
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                <span>
                  Showing{" "}
                  <span className="font-semibold text-secondary">
                    {filteredSubmissions.length === 0 ? 0 : startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-secondary">
                    {Math.min(
                      startIndex + itemsPerPage,
                      filteredSubmissions.length,
                    )}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-secondary">
                    {filteredSubmissions.length}
                  </span>{" "}
                  documents
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
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                {Array.from(
                  { length: Math.max(1, totalPages) },
                  (_, i) => i + 1,
                ).map((page) => (
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
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages || totalPages <= 1}
                  className="p-2 rounded-xl border border-border bg-white text-secondary hover:bg-secondary/5 transition-all disabled:opacity-40 disabled:hover:bg-transparent cursor-pointer disabled:cursor-not-allowed"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
