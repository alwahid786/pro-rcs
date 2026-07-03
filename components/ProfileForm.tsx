"use client";

import React, { useState } from "react";
import { formatPhoneNumber } from "@/lib/utils/phoneFormatter";

interface ProfileFormProps {
  initialAdmin: {
    firstName: string;
    lastName: string;
    email: string;
    number: string;
    country: string;
    state: string;
  };
}

export default function ProfileForm({ initialAdmin }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  
  const [firstName, setFirstName] = useState(initialAdmin.firstName);
  const [lastName, setLastName] = useState(initialAdmin.lastName);
  const [number, setNumber] = useState(formatPhoneNumber(initialAdmin.number));
  const [country, setCountry] = useState(initialAdmin.country);
  const [state, setState] = useState(initialAdmin.state);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleCancel = () => {
    setFirstName(initialAdmin.firstName);
    setLastName(initialAdmin.lastName);
    setNumber(formatPhoneNumber(initialAdmin.number));
    setCountry(initialAdmin.country);
    setState(initialAdmin.state);
    setIsEditing(false);
    setSuccess(null);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/admin/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, country, state, number }),
      });

      if (res.ok) {
        setSuccess("Profile settings successfully updated!");
        setIsEditing(false);
        // Reload to refresh AdminHeader session state
        setTimeout(() => {
          window.location.reload();
        }, 1200);
      } else {
        const data = await res.json();
        setError(data.error || "Failed to update profile settings.");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const initials = (firstName[0] || "") + (lastName[0] || "");

  const inputClass = (editable: boolean) => 
    `w-full px-4 py-3 border rounded-2xl text-sm font-semibold transition-all focus:outline-none focus:ring-1 focus:ring-secondary/20 ${
      editable 
        ? "bg-white/30 border-border/30 text-secondary hover:bg-white/40 focus:bg-white/50 cursor-text" 
        : "bg-black/5 border-border/10 text-text-secondary cursor-not-allowed opacity-80"
    }`;

  return (
    <form onSubmit={handleSubmit} className="glass shadow-glass rounded-3xl p-8 border border-white/60 bg-white/40 backdrop-blur-md space-y-8 w-full">
      {/* Avatar Header */}
      <div className="flex items-center gap-4 border-b border-border/20 pb-6">
        <div className="h-16 w-16 rounded-full bg-secondary flex items-center justify-center text-white text-xl font-bold uppercase shadow-inner">
          {initials}
        </div>
        <div>
          <h3 className="text-xl font-bold text-secondary">
            {firstName} {lastName}
          </h3>
          <p className="text-xs text-text-secondary uppercase font-semibold mt-0.5">
            PRO RCS ADMINISTRATOR
          </p>
        </div>
      </div>

      {/* Grid Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* First Name */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">
            First Name
          </label>
          <input
            type="text"
            required
            maxLength={50}
            disabled={!isEditing}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass(isEditing)}
            placeholder="First Name"
          />
        </div>

        {/* Last Name */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">
            Last Name
          </label>
          <input
            type="text"
            required
            maxLength={50}
            disabled={!isEditing}
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass(isEditing)}
            placeholder="Last Name"
          />
        </div>

        {/* Email Address (Always Read-only) */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">
            Email Address
          </label>
          <input
            type="email"
            disabled
            value={initialAdmin.email}
            className={inputClass(false)}
            title="Email address cannot be changed."
          />
        </div>

        {/* Contact Number */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">
            Contact Number
          </label>
          <input
            type="text"
            required
            maxLength={17}
            disabled={!isEditing}
            value={number}
            onChange={(e) => setNumber(formatPhoneNumber(e.target.value))}
            className={inputClass(isEditing)}
            placeholder="+1 (XXX) XXX-XXXX"
          />
        </div>

        {/* Country */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">
            Country
          </label>
          <input
            type="text"
            required
            maxLength={50}
            disabled={!isEditing}
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className={inputClass(isEditing)}
            placeholder="Country"
          />
        </div>

        {/* State / Region */}
        <div className="flex flex-col space-y-1.5">
          <label className="text-[10px] font-bold text-text-secondary uppercase tracking-wider pl-1">
            State / Region
          </label>
          <input
            type="text"
            required
            maxLength={50}
            disabled={!isEditing}
            value={state}
            onChange={(e) => setState(e.target.value)}
            className={inputClass(isEditing)}
            placeholder="State / Region"
          />
        </div>

      </div>

      {/* Success / Error Alerts */}
      {success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          {success}
        </div>
      )}
      {error && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-800 text-xs font-bold rounded-2xl animate-in fade-in slide-in-from-top-2 duration-300">
          {error}
        </div>
      )}

      {/* Submit/Action Button */}
      <div className="flex justify-end gap-3 pt-4">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-3 bg-white/20 hover:bg-white/30 text-secondary text-xs font-bold rounded-2xl shadow border border-border/20 transition-all active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-secondary text-white text-xs font-bold rounded-2xl shadow transition-all hover:bg-secondary/90 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none cursor-pointer"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="px-6 py-3 bg-secondary text-white text-xs font-bold rounded-2xl shadow transition-all hover:bg-secondary/90 active:scale-95 focus:outline-none cursor-pointer"
          >
            Update Profile
          </button>
        )}
      </div>
    </form>
  );
}
