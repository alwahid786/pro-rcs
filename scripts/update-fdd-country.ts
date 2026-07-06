import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  const { default: mongoose } = await import("mongoose");
  const { default: Fdd } = await import("../lib/models/Fdd");
  const { default: dbConnect } = await import("../lib/db");

  await dbConnect();
  const res = await Fdd.updateOne(
    { _id: "6a463a745463bc26b2806def" },
    { $set: { country: "USA", restaurantName: "KFC" } }
  );
  console.log("Update result:", res);
  await mongoose.disconnect();
}

main();
