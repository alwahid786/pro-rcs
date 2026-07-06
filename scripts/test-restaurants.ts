import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  const { default: dbConnect } = await import("../lib/db");
  const { getAvailableBrandsForLocation } = await import("../lib/services/fddService");

  await dbConnect();
  
  const res1 = await getAvailableBrandsForLocation({ country: "USA", state: "" });
  console.log("USA & empty state brands:", res1);

  const res2 = await getAvailableBrandsForLocation({ country: "USA", state: "Kentucky" });
  console.log("USA & Kentucky brands:", res2);

  const { default: mongoose } = await import("mongoose");
  await mongoose.disconnect();
}

main();
