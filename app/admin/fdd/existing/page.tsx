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

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const dm = 2;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

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
              Existing FDD Templates
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Manage your Franchise Disclosure Documents template versions.
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

        {/* Uploaded Templates Table (Full Width) */}
        <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md">
          <h2 className="text-xl font-bold text-secondary mb-5">
            Uploaded Templates
          </h2>

          {loading ? (
            <div className="py-12 text-center text-text-secondary">
              Loading templates...
            </div>
          ) : error ? (
            <div className="py-12 text-center text-red-500 font-medium">
              {error}
            </div>
          ) : fdds.length === 0 ? (
            <div className="py-12 text-center text-text-secondary">
              No templates uploaded yet. Click &ldquo;+ Add FDD Document&rdquo; to
              get started.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-border/40 text-xs font-semibold text-text-secondary uppercase tracking-wider">
                    <th className="pb-3 pl-2">Title</th>
                    <th className="pb-3">Restaurant</th>
                    <th className="pb-3">Version</th>
                    <th className="pb-3">Country</th>
                    <th className="pb-3">State</th>
                    <th className="pb-3">Size</th>
                    <th className="pb-3">Status</th>
                    <th className="pb-3">Uploaded</th>
                    <th className="pb-3 text-right pr-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/20">
                  {fdds.map((fdd) => (
                    <tr
                      key={fdd._id}
                      className="text-sm text-text hover:bg-white/10 transition-colors"
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
                      <td className="py-4 text-xs font-semibold uppercase text-secondary">
                        {fdd.country || "GLOBAL"}
                      </td>
                      <td className="py-4 text-xs font-semibold uppercase text-secondary">
                        {fdd.state || "—"}
                      </td>
                      <td className="py-4 text-text-secondary">
                        {formatBytes(fdd.fileSize)}
                      </td>
                      <td className="py-4">
                        {fdd.isActive ? (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                            Inactive
                          </span>
                        )}
                      </td>
                      <td className="py-4 text-xs text-text-secondary">
                        {new Date(fdd.uploadedAt).toLocaleDateString()}
                      </td>
                      <td className="py-4 text-right pr-2 space-x-3">
                        <a
                          href={`/api/fdd/download/${fdd._id}`}
                          className="text-xs font-semibold text-primary hover:underline cursor-pointer"
                          download
                        >
                          Download
                        </a>
                        <button
                          onClick={() => handleDelete(fdd._id)}
                          className="text-xs font-semibold text-red-600 hover:underline cursor-pointer"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload FDD Template Modal */}
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
                Upload FDD Template
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
