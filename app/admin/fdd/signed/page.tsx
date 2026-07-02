"use client";

import { useEffect, useState, useCallback } from "react";

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
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredSubmissions = submissions.filter((item) => {
    const searchString = `${item.firstName} ${item.lastName} ${item.email} ${item.location} ${item.documentVersion}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="relative min-h-screen bg-subtle p-6 sm:p-8 md:p-12">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-secondary">
              Signed FDD Submissions
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Audit trail of electronic signature acknowledgments.
            </p>
          </div>

          <div className="w-full md:w-72">
            <input
              type="text"
              placeholder="Search submissions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-border bg-white/50 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-secondary/20 transition-all text-sm"
            />
          </div>
        </div>

        {/* Submissions Table */}
        <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md">
          {loading ? (
            <div className="py-12 text-center text-text-secondary">Loading submissions...</div>
          ) : error ? (
            <div className="py-12 text-center text-red-500 font-medium">{error}</div>
          ) : filteredSubmissions.length === 0 ? (
            <div className="py-12 text-center text-text-secondary">
              {submissions.length === 0
                ? "No acknowledgments signed yet."
                : "No matching submissions found."}
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                  {filteredSubmissions.map((item) => (
                    <tr key={item._id} className="text-sm text-text hover:bg-white/10 transition-colors">
                      <td className="py-4 pl-2 font-medium text-secondary">
                        {item.firstName} {item.lastName}
                      </td>
                      <td className="py-4">
                        <span className="block text-xs font-medium text-text">{item.email}</span>
                        {item.number && (
                          <span className="block text-[11px] text-text-secondary mt-0.5">
                            {item.number}
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-text-secondary">
                        <span className="block font-medium text-secondary">{item.location}</span>
                        <span className="block text-[11px]">
                          {item.state}, {item.country}
                        </span>
                      </td>
                      <td className="py-4 font-semibold text-xs text-secondary">
                        {item.fddId?.restaurantName || "—"}
                      </td>
                      <td className="py-4 font-semibold text-xs text-text">{item.documentVersion}</td>
                      <td className="py-4 text-xs text-text-secondary">
                        {new Date(item.signedAt).toLocaleString()}
                      </td>
                      <td className="py-4 max-w-[200px] truncate">
                        <span className="block text-[11px] text-text">IP: {item.ipAddress}</span>
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
      </div>
    </div>
  );
}
