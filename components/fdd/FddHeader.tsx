"use client";

interface FddHeaderProps {
  country: string;
  setCountry: (val: string) => void;
  state: string;
  setState: (val: string) => void;
  restaurants: string[];
  selectedRestaurant: string;
  setSelectedRestaurant: (val: string) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  loadingRestaurants: boolean;
}

export default function FddHeader({
  country,
  setCountry,
  state,
  setState,
  restaurants,
  selectedRestaurant,
  setSelectedRestaurant,
  searchQuery,
  setSearchQuery,
  loadingRestaurants,
}: FddHeaderProps) {
  const isFilterActive =
    country !== "USA" || state !== "" || selectedRestaurant !== "" || searchQuery !== "";

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <h3 className="text-lg font-bold text-secondary">
          Target Opportunity Scoping
        </h3>
        {isFilterActive && (
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
            className="w-full px-3 py-2 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm cursor-pointer"
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
            className="w-full px-3 py-2 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
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
            className="w-full px-3 py-2 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm cursor-pointer disabled:opacity-50"
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
            className="w-full px-3 py-2 rounded-xl border border-border bg-white focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
          />
        </div>
      </div>
    </div>
  );
}
