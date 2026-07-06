"use client";

import { useEffect, useState, useCallback } from "react";
import FddHeader from "@/components/fdd/FddHeader";
import FddListing from "@/components/fdd/FddListing";

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

  return (
    <div className="relative min-h-screen bg-subtle py-20 px-6 sm:px-8 md:px-12 flex flex-col items-center justify-start">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-35 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 w-full container mx-auto space-y-10">
        <div className="text-center space-y-3">
          <h1 className="text-4xl font-extrabold tracking-tight text-secondary sm:text-5xl">
            Franchise Disclosure Document (FDD)
          </h1>
          <p className="text-base text-text-secondary max-w-2xl mx-auto">
            Select your country, state, and restaurant brand to download or sign the latest Franchise Disclosure Document version.
          </p>
        </div>

        {/* Single Unified Glass Card wrapping filters and table */}
        <div className="glass shadow-glass rounded-3xl p-6 sm:p-8 border border-white/60 bg-white/40 backdrop-blur-md space-y-8 overflow-visible">
          <FddHeader
            country={country}
            setCountry={setCountry}
            state={state}
            setState={setState}
            restaurants={restaurants}
            selectedRestaurant={selectedRestaurant}
            setSelectedRestaurant={setSelectedRestaurant}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            loadingRestaurants={loadingRestaurants}
          />

          <div className="border-t border-border/40" />

          {/* Document Listing Details inside the card */}
          <div className="space-y-4 overflow-visible">
            {loading ? (
              <div className="py-16 text-center text-sm text-text-secondary">
                <span className="inline-block animate-pulse font-medium">Loading active document details...</span>
              </div>
            ) : filteredTemplates.length > 0 ? (
              <FddListing templates={filteredTemplates} />
            ) : (
              <div className="py-12 text-center text-sm text-text-secondary font-medium animate-in fade-in duration-300">
                {searchQuery.trim() && templates.length > 0
                  ? `No documents matching "${searchQuery}" found.`
                  : error || "No active Franchise Disclosure Document found for this location."}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
