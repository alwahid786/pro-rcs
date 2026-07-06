import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  const { default: mongoose } = await import("mongoose");
  const { default: Fdd } = await import("../lib/models/Fdd");
  const { default: dbConnect } = await import("../lib/db");

  await dbConnect();
  
  // Set restaurantName to KFC for any document where it is empty but title or version implies KFC
  const res = await Fdd.updateMany(
    { restaurantName: { $exists: false } },
    { $set: { restaurantName: "KFC" } }
  );
  console.log("Updated documents with missing restaurantName field:", res);

  // Also update specific document that was uploaded recently
  const res2 = await Fdd.updateOne(
    { _id: "6a46495d63ecab81ecfa032c" },
    { $set: { restaurantName: "KFC" } }
  );
  console.log("Updated recent document:", res2);

  await mongoose.disconnect();
}

main();
