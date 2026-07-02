import type { Metadata } from "next";
import { DM_Sans, Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { headers, cookies } from "next/headers";
import { verifyToken } from "@/lib/utils/jwt";
import { findAdminByEmail } from "@/lib/services/adminService";
import AdminHeader from "@/components/AdminHeader";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PRO RCS",
  description:
    "From startup to multi-location growth, we build the structure, processes, and partnerships that keep your operations efficient, compliant, and profitable.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headerList = await headers();
  const pathname = headerList.get("x-pathname") || "";
  const isAdmin = pathname.startsWith("/admin");
  const isAdminLogin = pathname === "/admin/login";

  let admin = null;
  if (isAdmin && !isAdminLogin) {
    try {
      const cookieStore = await cookies();
      const token = cookieStore.get("admin_token")?.value;
      if (token) {
        const payload = await verifyToken(token);
        if (payload) {
          const adminDoc = await findAdminByEmail(payload.email);
          if (adminDoc) {
            admin = {
              firstName: adminDoc.firstName,
              lastName: adminDoc.lastName,
              email: adminDoc.email,
            };
          }
        }
      }
    } catch (e) {
      console.error("Failed to load admin context in layout:", e);
    }
  }

  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col overflow-x-clip bg-background font-sans text-foreground">
        {isAdmin && !isAdminLogin && admin && <AdminHeader admin={admin} />}
        {!isAdmin && <Header />}
        <main className="flex-1 overflow-x-clip">{children} </main>

        {!isAdmin && <Footer />}
      </body>
    </html>
  );
}
