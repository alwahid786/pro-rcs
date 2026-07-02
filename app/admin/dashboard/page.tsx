import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/utils/jwt";
import { findAdminByEmail } from "@/lib/services/adminService";
import LogoutButton from "./LogoutButton";

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;

  if (!token) {
    redirect("/admin/login");
  }

  const payload = await verifyToken(token);
  if (!payload) {
    redirect("/admin/login");
  }

  const admin = await findAdminByEmail(payload.email);
  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="relative min-h-screen bg-subtle p-6 sm:p-8 md:p-12">
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto space-y-8">
        <div className="flex items-center justify-between border-b border-border/60 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-secondary">
              Admin Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Welcome back, {admin.firstName} {admin.lastName}
            </p>
          </div>
          <LogoutButton />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between min-h-[220px]">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Logged In Successfully
              </span>
              <h2 className="text-2xl font-bold text-secondary mt-4">
                Operational Overview
              </h2>
              <p className="text-sm text-text-secondary mt-2 max-w-md">
                You have successfully authenticated to the PRO RCS administrative portal. Currently, all operational systems are running with no active service flags.
              </p>
            </div>
            <div className="text-xs text-text-secondary pt-4 border-t border-border/30 mt-4">
              Last Database Sync: {new Date().toLocaleString()}
            </div>
          </div>

          <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md">
            <h3 className="text-lg font-bold text-secondary mb-4">
              Admin Profile Info
            </h3>
            <div className="space-y-4">
              <div>
                <span className="text-xs text-text-secondary block">Full Name</span>
                <span className="text-sm font-medium text-text">{admin.firstName} {admin.lastName}</span>
              </div>
              <div>
                <span className="text-xs text-text-secondary block">Email</span>
                <span className="text-sm font-medium text-text">{admin.email}</span>
              </div>
              <div>
                <span className="text-xs text-text-secondary block">Contact Number</span>
                <span className="text-sm font-medium text-text">{admin.number}</span>
              </div>
              <div>
                <span className="text-xs text-text-secondary block">Location</span>
                <span className="text-sm font-medium text-text">{admin.state}, {admin.country}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
