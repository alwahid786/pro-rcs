import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/utils/jwt";
import { findAdminByEmail } from "@/lib/services/adminService";
import ProfileForm from "@/components/ProfileForm";

export default async function AdminProfilePage() {
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
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-35 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto space-y-8 animate-in fade-in duration-300">
        <div className="flex items-center justify-between border-b border-border/40 pb-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-secondary">
              Profile Settings
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              View and manage administrative identity settings.
            </p>
          </div>
        </div>

        {/* Profile Card Update Form */}
        <ProfileForm
          initialAdmin={{
            firstName: admin.firstName,
            lastName: admin.lastName,
            email: admin.email,
            number: admin.number,
            country: admin.country,
            state: admin.state,
          }}
        />
      </div>
    </div>
  );
}
