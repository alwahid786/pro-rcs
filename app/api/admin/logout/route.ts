import { logoutAdmin } from "@/lib/controllers/adminAuthController";

export async function POST() {
  return logoutAdmin();
}
