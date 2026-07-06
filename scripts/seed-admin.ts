import { loadEnvConfig } from "@next/env";

// Load environment variables synchronously
loadEnvConfig(process.cwd());

async function main() {
  console.log("Seeding admin user...");

  try {
    // Dynamically import mongoose and the adminService to ensure they load after env configs are set
    const { seedAdminUser } = await import("../lib/services/adminService");
    const mongoose = (await import("mongoose")).default;

    const admin = await seedAdminUser({
      firstName: "Test",
      lastName: "admin",
      email: "superadmin@gmail.com",
      password: "Password123!",
      country: "USA",
      state: "LosAngles",
      number: "+1 (343) 2432434",
    } as unknown as Parameters<typeof seedAdminUser>[0]);

    console.log(`Seeding complete! Admin user created/updated with ID: ${admin._id}`);
    await mongoose.disconnect();
  } catch (error) {
    console.error("Failed to seed admin user:", error);
    process.exit(1);
  }
}

main();
