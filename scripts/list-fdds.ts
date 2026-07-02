import { loadEnvConfig } from "@next/env";
loadEnvConfig(process.cwd());

async function main() {
  const { default: mongoose } = await import("mongoose");
  const { default: Fdd } = await import("../lib/models/Fdd");
  const { default: dbConnect } = await import("../lib/db");

  await dbConnect();
  const fdds = await Fdd.find({});
  console.log("ALL FDDS:", JSON.stringify(fdds, null, 2));
  await mongoose.disconnect();
}

main();
