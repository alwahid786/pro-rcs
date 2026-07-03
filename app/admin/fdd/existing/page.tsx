"use client";

import { useEffect, useState, useCallback } from "react";

interface FddItem {
  _id: string;
  title: string;
  version: string;
  restaurantName?: string;
  fileSize: number;
  isActive: boolean;
  uploadedAt: string;
  country?: string;
  state?: string;
}

const formatLocation = (country?: string, state?: string) => {
  const c = country?.trim().toUpperCase();
  const s = state?.trim().toUpperCase();

  let countryName = c || "";
  if (c === "USA" || c === "US") countryName = "United States";
  else if (c === "CAN" || c === "CA") countryName = "Canada";
  else if (c === "GBR" || c === "UK") countryName = "United Kingdom";

  if (s) {
    const stateFormatted = s
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());
    return `${stateFormatted}, ${countryName}`;
  }
  return countryName || "Global";
};

export default function ExistingFddPage() {
  const [fdds, setFdds] = useState<FddItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Modal control
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [version, setVersion] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [targetCountry, setTargetCountry] = useState("");
  const [targetState, setTargetState] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // Filter states
  const [countryFilter, setCountryFilter] = useState("All");
  const [stateFilter, setStateFilter] = useState("");
  const [brandFilter, setBrandFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Dropdown state
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest(".action-trigger-btn") ||
        target.closest(".action-dropdown-menu")
      ) {
        return;
      }
      setOpenDropdownId(null);
    };
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId(openDropdownId === id ? null : id);
  };

  const fetchFdds = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/fdd");
      if (res.ok) {
        const data = await res.json();
        setFdds(data);
      } else {
        setError("Failed to fetch FDD templates");
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
    fetchFdds();
  }, [fetchFdds]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !version.trim() || !file) {
      alert("Please fill in all fields and select a PDF file.");
      return;
    }

    setUploading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("version", version);
    formData.append("restaurantName", restaurantName);
    formData.append("file", file);
    formData.append("country", targetCountry);
    formData.append("state", targetState);

    try {
      const res = await fetch("/api/admin/fdd/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        setTitle("");
        setVersion("");
        setRestaurantName("");
        setTargetCountry("");
        setTargetState("");
        setFile(null);
        setIsModalOpen(false);
        const fileInput = document.getElementById(
          "file-input",
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";

        await fetchFdds();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to upload FDD template.");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file.");
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this FDD version? This will soft-delete it to preserve legal references.",
      )
    ) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/fdd/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchFdds();
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete FDD template.");
      }
    } catch (err) {
      console.error(err);
      alert("Error deleting template.");
    }
  };

  // Derive unique values for filters
  const uniqueCountries = Array.from(
    new Set(fdds.map((f) => f.country || "USA").filter(Boolean)),
  );
  const uniqueBrands = Array.from(
    new Set(fdds.map((f) => f.restaurantName).filter(Boolean)),
  );

  // Apply filters
  const filteredFdds = fdds.filter((f) => {
    const fCountry = f.country || "USA";
    const matchCountry =
      countryFilter === "All" ||
      fCountry.toLowerCase() === countryFilter.toLowerCase();

    const matchState =
      !stateFilter.trim() ||
      (f.state || "").toLowerCase().includes(stateFilter.toLowerCase().trim());

    const matchBrand =
      brandFilter === "All" ||
      (f.restaurantName || "").toLowerCase() === brandFilter.toLowerCase();

    const matchSearch =
      !searchQuery.trim() ||
      f.title.toLowerCase().includes(searchQuery.toLowerCase().trim()) ||
      (f.restaurantName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase().trim());

    return matchCountry && matchState && matchBrand && matchSearch;
  });

  // Handle render-phase page reset
  const [prevFiltersKey, setPrevFiltersKey] = useState("");
  const currentFiltersKey = `${countryFilter}|${stateFilter}|${brandFilter}|${searchQuery}`;
  if (currentFiltersKey !== prevFiltersKey) {
    setPrevFiltersKey(currentFiltersKey);
    setCurrentPage(1);
  }

  // Paginate items
  const totalPages = Math.ceil(filteredFdds.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedFdds = filteredFdds.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const resetFilters = () => {
    setCountryFilter("All");
    setStateFilter("");
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
              Existing FDD Documents
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Manage your Franchise Disclosure Documents versions.
            </p>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 bg-secondary text-white font-semibold rounded-xl shadow-md transition-all hover:bg-secondary/90 active:scale-95 text-sm cursor-pointer"
            >
              + Add FDD Document
            </button>
          </div>
        </div>

        {/* Unified Table and Filtering Card */}
        <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md">
          {/* Header section with Scoping / Filters */}
          <div className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-secondary">
                Uploaded FDD Documents
              </h2>
              {(countryFilter !== "All" ||
                stateFilter !== "" ||
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

              {/* State Input */}
              <div className="flex flex-col gap-1">
                <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                  State / Region
                </label>
                <input
                  type="text"
                  placeholder="Filter by state..."
                  value={stateFilter}
                  onChange={(e) => setStateFilter(e.target.value)}
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
                  <option value="All">All Brands</option>
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
                  Search Document
                </label>
                <input
                  type="text"
                  placeholder="Search by name..."
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
                Loading templates...
              </div>
            ) : error ? (
              <div className="py-12 text-center text-red-500 font-medium">
                {error}
              </div>
            ) : filteredFdds.length === 0 ? (
              <div className="py-12 text-center text-text-secondary">
                No templates match your filters.
              </div>
            ) : (
              <div className="overflow-visible w-full">
                <div className="overflow-visible">
                  <table className="w-full text-left border-collapse overflow-visible">
                    <thead>
                      <tr className="border-b border-border/40 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                        <th className="pb-3 pl-2">Title</th>
                        <th className="pb-3">Franchise</th>
                        <th className="pb-3">Version</th>
                        <th className="pb-3">Applies To</th>
                        <th className="pb-3">Min. Review Period</th>
                        <th className="pb-3">E-Signature</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3">Uploaded</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border/20">
                      {paginatedFdds.map((fdd) => (
                        <tr
                          key={fdd._id}
                          className="text-sm text-text hover:bg-white/10 transition-colors animate-in fade-in overflow-visible"
                        >
                          <td
                            className="py-4 pl-2 font-medium text-secondary truncate max-w-[180px]"
                            title={fdd.title}
                          >
                            {fdd.title}
                          </td>
                          <td className="py-4 font-semibold text-secondary">
                            {fdd.restaurantName || "—"}
                          </td>
                          <td className="py-4 font-semibold">{fdd.version}</td>
                          <td className="py-4 text-xs font-semibold text-secondary">
                            {formatLocation(fdd.country, fdd.state)}
                          </td>
                          <td className="py-4 text-xs text-text-secondary">
                            14 Days
                          </td>
                          <td className="py-4 text-xs text-text-secondary">
                            Required
                          </td>
                          <td className="py-4">
                            {fdd.isActive ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                Active
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-600 border border-gray-200">
                                Inactive
                              </span>
                            )}
                          </td>
                          <td className="py-4 text-xs text-text-secondary">
                            {new Date(fdd.uploadedAt).toLocaleDateString()}
                          </td>
                          <td className="py-4 text-right pr-2 relative overflow-visible">
                            <button
                              onClick={() => toggleDropdown(fdd._id)}
                              className="action-trigger-btn inline-flex items-center gap-1 px-3 py-1.5 bg-secondary text-white text-xs font-bold rounded-xl shadow transition-all hover:bg-secondary/90 active:scale-95 focus:outline-none cursor-pointer"
                            >
                              Action
                              <svg
                                className="w-3.5 h-3.5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2.5"
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdownId === fdd._id && (
                              <div className="action-dropdown-menu absolute right-2 mt-2 w-48 origin-top-right rounded-2xl border border-border/80 bg-white p-2 shadow-[0_12px_40px_rgba(0,0,0,0.08)] backdrop-blur-md transition-all duration-300 z-50 text-left">
                                <div className="py-1 space-y-0.5">
                                  <a
                                    href={`/api/fdd/download/${fdd._id}`}
                                    download
                                    className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-text rounded-xl transition-colors hover:bg-secondary/5 hover:text-secondary cursor-pointer"
                                  >
                                    <svg
                                      className="w-4 h-4 shrink-0 text-text-secondary"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                      />
                                    </svg>
                                    Download
                                  </a>
                                  <button
                                    onClick={() => {
                                      setOpenDropdownId(null);
                                      handleDelete(fdd._id);
                                    }}
                                    className="flex items-center gap-2 w-full px-3 py-2 text-xs font-semibold text-red-600 rounded-xl transition-colors hover:bg-red-50 cursor-pointer"
                                  >
                                    <svg
                                      className="w-4 h-4 shrink-0 text-red-500"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      />
                                    </svg>
                                    Delete
                                  </button>
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {filteredFdds.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-border/40 mt-4 overflow-visible animate-in fade-in">
              <div className="flex flex-wrap items-center gap-3 text-xs text-text-secondary">
                <span>
                  Showing{" "}
                  <span className="font-semibold text-secondary">
                    {filteredFdds.length === 0 ? 0 : startIndex + 1}
                  </span>{" "}
                  to{" "}
                  <span className="font-semibold text-secondary">
                    {Math.min(startIndex + itemsPerPage, filteredFdds.length)}
                  </span>{" "}
                  of{" "}
                  <span className="font-semibold text-secondary">
                    {filteredFdds.length}
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

      {/* Upload FDD Document Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-xs transition-opacity"
            onClick={() => {
              if (!uploading) setIsModalOpen(false);
            }}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/70 backdrop-blur-lg transform transition-all animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-secondary">
                Upload FDD Document
              </h3>
              <button
                disabled={uploading}
                onClick={() => setIsModalOpen(false)}
                className="text-text-secondary hover:text-secondary text-lg font-bold disabled:opacity-50 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                  Document Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 2026 Franchise Disclosure Document"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                    Version Identifier *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. v1, v2"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                    Restaurant Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. KFC, McDonalds"
                    value={restaurantName}
                    onChange={(e) => setRestaurantName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                    Target Country
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. USA (Optional)"
                    value={targetCountry}
                    onChange={(e) => setTargetCountry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                    Target State / Region
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. California, Texas (Optional)"
                    value={targetState}
                    onChange={(e) => setTargetState(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                  PDF Document *
                </label>
                <input
                  id="file-input"
                  type="file"
                  required
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-secondary file:text-white hover:file:opacity-90 file:cursor-pointer"
                />
              </div>

              <div className="flex gap-3 justify-end pt-3">
                <button
                  type="button"
                  disabled={uploading}
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2.5 border border-border text-text-secondary hover:text-secondary rounded-xl text-sm font-semibold transition-all cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={uploading}
                  className="px-5 py-2.5 bg-secondary text-white font-semibold rounded-xl shadow-md transition-all hover:bg-secondary/90 active:scale-95 disabled:opacity-50 disabled:pointer-events-none text-sm cursor-pointer"
                >
                  {uploading ? "Uploading..." : "Upload Document"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
