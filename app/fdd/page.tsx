"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";

interface FddMetadata {
  id: string;
  title: string;
  version: string;
  restaurantName?: string;
  fileSize: number;
  downloadUrl: string;
  uploadedAt: string;
}

export default function PublicFddPage() {
  const [country, setCountry] = useState("USA");
  const [state, setState] = useState("");
  const [restaurants, setRestaurants] = useState<string[]>([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [templates, setTemplates] = useState<FddMetadata[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingRestaurants, setLoadingRestaurants] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredTemplates = templates.filter((tpl) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      tpl.title.toLowerCase().includes(q) ||
      (tpl.restaurantName && tpl.restaurantName.toLowerCase().includes(q))
    );
  });

  const fetchRestaurants = useCallback(async () => {
    setLoadingRestaurants(true);
    try {
      const url = `/api/fdd/restaurants?country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRestaurants(data);
        setSelectedRestaurant("");
      } else {
        setRestaurants([]);
        setSelectedRestaurant("");
      }
    } catch {
      setRestaurants([]);
      setSelectedRestaurant("");
    } finally {
      setLoadingRestaurants(false);
    }
  }, [country, state]);

  const fetchLatestTemplates = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const url = `/api/fdd/latest?country=${encodeURIComponent(country)}&state=${encodeURIComponent(state)}&restaurant=${encodeURIComponent(selectedRestaurant)}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setTemplates(data);
        if (data.length === 0) {
          setError("No active Franchise Disclosure Document found for this location.");
        }
      } else {
        setTemplates([]);
        if (res.status === 404) {
          setError("No active Franchise Disclosure Document found for this location.");
        } else {
          setError("Failed to fetch templates.");
        }
      }
    } catch {
      setTemplates([]);
      setError("An unexpected error occurred while fetching the templates.");
    } finally {
      setLoading(false);
    }
  }, [country, state, selectedRestaurant]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      await Promise.resolve();
      if (active) {
        fetchRestaurants();
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [fetchRestaurants]);

  useEffect(() => {
    let active = true;
    const run = async () => {
      await Promise.resolve();
      if (active) {
        fetchLatestTemplates();
      }
    };
    run();
    return () => {
      active = false;
    };
  }, [fetchLatestTemplates]);

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  return (
    <div className="relative min-h-screen bg-subtle py-20 px-6 sm:px-8 md:px-12 flex flex-col items-center justify-start">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-35 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-4xl space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
            Franchise Disclosure Document (FDD)
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            Select your country, state, and restaurant brand to download or sign the latest Franchise Disclosure Document version.
          </p>
        </div>

        {/* Filter Section at the top */}
        <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <h3 className="text-lg font-bold text-secondary">
              Target Opportunity Scoping
            </h3>
            {(country !== "USA" || state !== "" || selectedRestaurant !== "" || searchQuery !== "") && (
              <button
                type="button"
                onClick={() => {
                  setCountry("USA");
                  setState("");
                  setSelectedRestaurant("");
                  setSearchQuery("");
                }}
                className="px-3 py-1.5 text-xs font-semibold bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-xl border border-rose-200 shadow-sm transition-all duration-200 cursor-pointer animate-in fade-in slide-in-from-top-1"
              >
                ✕ Reset Filters
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                Country
              </label>
              <select
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm cursor-pointer bg-white"
              >
                <option value="USA">United States</option>
                <option value="CANADA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="">Global / Other</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                State / Region
              </label>
              <input
                type="text"
                placeholder="e.g. Kentucky (Optional)"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                Restaurant Brand
              </label>
              <select
                value={selectedRestaurant}
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                disabled={loadingRestaurants || restaurants.length === 0}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm cursor-pointer bg-white disabled:opacity-50"
              >
                <option value="">All Restaurants</option>
                {restaurants.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-secondary uppercase mb-1">
                Search Document
              </label>
              <input
                type="text"
                placeholder="Search by name or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-border bg-white/50 focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm bg-white"
              />
            </div>
          </div>
        </div>

        {/* Document Listing Details below */}
        <div className="space-y-8">
          {loading ? (
            <div className="glass shadow-glass rounded-3xl p-8 border border-white/60 bg-white/40 backdrop-blur-md py-16 text-center text-sm text-text-secondary">
              <span className="inline-block animate-pulse">Loading active document details...</span>
            </div>
          ) : filteredTemplates.length > 0 ? (
            <div className="space-y-6">
              {filteredTemplates.map((tpl) => (
                <div key={tpl.id} className="glass shadow-glass rounded-3xl p-8 border border-white/60 bg-white/40 backdrop-blur-md space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between border-b border-border/40 pb-4">
                    <div>
                      <h3 className="text-xl font-bold text-secondary">
                        {tpl.title}
                      </h3>
                      <p className="text-sm text-text-secondary mt-0.5">
                        Brand: <span className="font-semibold text-secondary">{tpl.restaurantName || "—"}</span>
                      </p>
                    </div>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      Active Document
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                    <div className="p-4 bg-white/30 rounded-2xl border border-border/30">
                      <span className="block text-xs font-semibold text-text-secondary uppercase mb-1">Version</span>
                      <span className="font-bold text-secondary text-lg">{tpl.version}</span>
                    </div>
                    <div className="p-4 bg-white/30 rounded-2xl border border-border/30">
                      <span className="block text-xs font-semibold text-text-secondary uppercase mb-1">File Size</span>
                      <span className="font-bold text-secondary text-lg">{formatBytes(tpl.fileSize)}</span>
                    </div>
                    <div className="p-4 bg-white/30 rounded-2xl border border-border/30">
                      <span className="block text-xs font-semibold text-text-secondary uppercase mb-1">Release Date</span>
                      <span className="font-bold text-secondary text-lg">{new Date(tpl.uploadedAt).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-col md:flex-row gap-4">
                    <a
                      href={tpl.downloadUrl}
                      className="flex-1 inline-flex justify-center items-center gap-2 py-3 bg-white/70 hover:bg-white text-secondary font-semibold rounded-xl border border-border/60 transition-all text-xs cursor-pointer text-center"
                      download
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Download Document for Review
                    </a>
                    <Link
                      href={`/fdd/sign/${tpl.id}`}
                      className="flex-1 py-3 bg-secondary text-white font-semibold rounded-xl shadow-md transition-all hover:bg-secondary/90 text-xs cursor-pointer text-center block"
                    >
                      Review and submit E-signature Document
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass shadow-glass rounded-3xl p-8 border border-white/60 bg-white/40 backdrop-blur-md py-12 text-center text-sm text-text-secondary font-medium animate-in fade-in duration-300">
              {searchQuery.trim() && templates.length > 0
                ? `No documents matching "${searchQuery}" found.`
                : error || "No active Franchise Disclosure Document found for this location."}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
