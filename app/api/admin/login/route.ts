import { loginAdmin } from "@/lib/controllers/adminAuthController";

export async function POST(request: Request) {
  return loginAdmin(request);
}
