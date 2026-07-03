import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifyToken } from "@/lib/utils/jwt";
import { findAdminByEmail } from "@/lib/services/adminService";
import Link from "next/link";
import dbConnect from "@/lib/db";
import Fdd from "@/lib/models/Fdd";
import SignedFdd from "@/lib/models/SignedFdd";

interface DashboardTemplate {
  _id: { toString(): string };
  title: string;
  restaurantName?: string;
  version: string;
}

interface DashboardSigned {
  _id: { toString(): string };
  firstName: string;
  lastName: string;
  fddId?: { restaurantName?: string } | null;
  location?: string;
  documentVersion: string;
  signedAt: Date | string;
}

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

  // Connect to DB and fetch dashboard metrics
  await dbConnect();

  const existingCount = await Fdd.countDocuments({
    isDeleted: false,
    isActive: true,
  });
  const signedCount = await SignedFdd.countDocuments({});

  // Query top 5 recent existing templates
  const topExisting = await Fdd.find({ isDeleted: false })
    .sort({ uploadedAt: -1 })
    .limit(5)
    .lean();

  // Query top 5 recent signed submissions
  const topSigned = await SignedFdd.find({})
    .populate({ path: "fddId", model: Fdd, select: "title restaurantName" })
    .sort({ signedAt: -1 })
    .limit(5)
    .lean();

  // Fetch monthly signing stats for the last 6 months
  const monthlyStats = [];
  const maxMonths = 6;
  for (let i = maxMonths - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(1); // prevent month rollover issues
    d.setMonth(d.getMonth() - i);
    const startOfMonth = new Date(d.getFullYear(), d.getMonth(), 1);
    const endOfMonth = new Date(
      d.getFullYear(),
      d.getMonth() + 1,
      0,
      23,
      59,
      59,
    );

    const count = await SignedFdd.countDocuments({
      signedAt: { $gte: startOfMonth, $lte: endOfMonth },
    });

    const monthLabel = d.toLocaleString("default", { month: "short" });
    monthlyStats.push({ month: monthLabel, count });
  }

  const currentMonthSignings =
    monthlyStats[monthlyStats.length - 1]?.count || 0;

  const counts = monthlyStats.map((s) => s.count);
  const maxCount = Math.max(...counts, 1);

  return (
    <div className="relative min-h-screen bg-subtle p-6 sm:p-8 md:p-12">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-30 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto space-y-8 animate-in fade-in duration-300">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-border/60 pb-5 gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-secondary">
              Admin Dashboard
            </h1>
            <p className="text-sm text-text-secondary mt-1">
              Welcome back, {admin.firstName} {admin.lastName}
            </p>
          </div>
        </div>

        {/* Top Row: 2 Metrics Widgets */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Widget 1: Active Templates */}
          <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between hover:border-secondary/20 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Active FDD Templates
                </span>
                <h3 className="text-5xl font-extrabold text-secondary mt-2 tracking-tight flex items-baseline gap-2">
                  {existingCount}
                  <span className="text-xs font-semibold text-text-secondary">
                    active
                  </span>
                </h3>
              </div>
              <div className="p-3 bg-secondary/5 rounded-2xl border border-secondary/10 text-secondary">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/20">
              <span className="text-xs text-text-secondary">
                Upload and manage franchise disclosures
              </span>
              <Link
                href="/admin/fdd/existing"
                className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
              >
                Manage Templates ➜
              </Link>
            </div>
          </div>

          {/* Widget 2: Signed FDD Documents */}
          <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between hover:border-secondary/20 transition-all duration-300">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  Signed FDD Documents
                </span>
                <h3 className="text-5xl font-extrabold text-secondary mt-2 tracking-tight flex items-baseline gap-2">
                  {signedCount}
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-100">
                    {`+${currentMonthSignings} this month`}
                  </span>
                </h3>
              </div>
              <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-100 text-emerald-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between pt-4 border-t border-border/20">
              <span className="text-xs text-text-secondary">
                Audit trails of electronic signatures
              </span>
              <Link
                href="/admin/fdd/signed"
                className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
              >
                View Submissions ➜
              </Link>
            </div>
          </div>
        </div>

        {/* Second Row: 3 Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Widget 1: Recent Existing Templates */}
          <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-secondary" />
                Recent Templates
              </h3>
              {topExisting.length === 0 ? (
                <p className="text-xs text-text-secondary py-8 text-center">
                  No templates uploaded yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {topExisting.map((tpl: DashboardTemplate) => (
                    <div
                      key={tpl._id.toString()}
                      className="p-3 bg-white/30 rounded-xl border border-border/20 flex justify-between items-center text-xs"
                    >
                      <div className="min-w-0 flex-1 pr-2">
                        <p
                          className="font-semibold text-secondary truncate"
                          title={tpl.title}
                        >
                          {tpl.title}
                        </p>
                        <p className="text-text-secondary mt-0.5">
                          {tpl.restaurantName || "Global"}
                        </p>
                      </div>
                      <span className="px-2 py-0.5 bg-secondary/5 border border-secondary/10 rounded-md font-bold text-secondary text-[10px]">
                        {tpl.version}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-border/20 mt-6 flex justify-end">
              <Link
                href="/admin/fdd/existing"
                className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
              >
                View More ➜
              </Link>
            </div>
          </div>

          {/* Widget 2: Recent Signed FDD Submissions */}
          <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-bold text-secondary mb-4 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                Recent Signings
              </h3>
              {topSigned.length === 0 ? (
                <p className="text-xs text-text-secondary py-8 text-center">
                  No signatures completed yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {topSigned.map((s: DashboardSigned) => {
                    const brand =
                      s.fddId?.restaurantName || s.location || "Global";
                    return (
                      <div
                        key={s._id.toString()}
                        className="p-3 bg-white/30 rounded-xl border border-border/20 flex justify-between items-center text-xs"
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <p className="font-semibold text-secondary truncate">
                            {s.firstName} {s.lastName}
                          </p>
                          <p className="text-text-secondary mt-0.5">
                            {brand} • {s.documentVersion}
                          </p>
                        </div>
                        <span className="text-text-secondary text-[10px] whitespace-nowrap">
                          {new Date(s.signedAt).toLocaleDateString()}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
            <div className="pt-4 border-t border-border/20 mt-6 flex justify-end">
              <Link
                href="/admin/fdd/signed"
                className="text-xs font-semibold text-secondary hover:underline flex items-center gap-1"
              >
                View More ➜
              </Link>
            </div>
          </div>

          {/* Widget 3: Monthly Signings Trend SVG Graph */}
          <div className="glass shadow-glass rounded-3xl p-6 border border-white/60 bg-white/40 backdrop-blur-md flex flex-col justify-between hover:border-secondary/20 transition-all duration-300">
            <div>
              <div className="mb-4">
                <h3 className="text-lg font-bold text-secondary flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-indigo-500" />
                  Signings Trend (Monthly)
                </h3>
                <div className="mt-2 flex items-baseline justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl font-extrabold text-secondary tracking-tight">
                      {signedCount}
                    </span>
                    <span className="text-[10px] font-bold text-text-secondary uppercase tracking-wider">
                      Total Signings
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-text-secondary/70">
                    Updated: Today
                  </span>
                </div>
              </div>

              {signedCount === 0 ? (
                <div className="h-[220px] flex flex-col items-center justify-center text-center p-6 border border-dashed border-border/60 rounded-2xl bg-white/20">
                  <svg
                    className="w-10 h-10 text-text-secondary/50 mb-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <p className="text-xs font-bold text-secondary">
                    No signings yet
                  </p>
                  <p className="text-[10px] text-text-secondary mt-1 max-w-[200px]">
                    Signing activity will appear here once users submit
                    signatures.
                  </p>
                </div>
              ) : (
                <div className="h-[220px] flex items-center justify-center">
                  <svg
                    className="w-full h-full"
                    viewBox="0 0 300 240"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient
                        id="barGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop offset="0%" stopColor="#0f172a" />
                        <stop offset="100%" stopColor="rgba(15, 23, 42, 0.4)" />
                      </linearGradient>
                    </defs>

                    {/* Grid Lines */}
                    <line
                      x1="20"
                      y1="30"
                      x2="290"
                      y2="30"
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="20"
                      y1="90"
                      x2="290"
                      y2="90"
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="20"
                      y1="150"
                      x2="290"
                      y2="150"
                      stroke="#F1F5F9"
                      strokeWidth="1"
                      strokeDasharray="3,3"
                    />
                    <line
                      x1="20"
                      y1="210"
                      x2="290"
                      y2="210"
                      stroke="#E2E8F0"
                      strokeWidth="1"
                    />

                    {/* Render the bars dynamically */}
                    {monthlyStats.map((stat, i) => {
                      const h =
                        maxCount > 0 ? (stat.count / maxCount) * 150 : 0;
                      const x = 30 + i * 44;
                      const y = 210 - h;
                      const isZero = stat.count === 0;
                      return (
                        <g key={stat.month}>
                          {/* Rounded top rect */}
                          <rect
                            x={x}
                            y={isZero ? 209 : y}
                            width="22"
                            height={isZero ? 1 : Math.max(h, 2)}
                            rx="3"
                            fill={isZero ? "#E2E8F0" : "url(#barGradient)"}
                            className="transition-all duration-300 hover:opacity-80"
                          />
                          {/* Value text above bar */}
                          {!isZero && (
                            <text
                              x={x + 11}
                              y={y - 6}
                              textAnchor="middle"
                              fontSize="9"
                              fontWeight="700"
                              fill="#475569"
                            >
                              {stat.count}
                            </text>
                          )}
                          {/* Month label below chart base */}
                          <text
                            x={x + 11}
                            y="226"
                            textAnchor="middle"
                            fontSize="9"
                            fontWeight="600"
                            fill="#64748B"
                          >
                            {stat.month}
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
