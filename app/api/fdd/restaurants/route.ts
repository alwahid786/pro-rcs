import { NextRequest, NextResponse } from "next/server";
import { getAvailableBrandsForLocation } from "@/lib/services/fddService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country") || undefined;
    const state = searchParams.get("state") || undefined;

    console.log("Fetching brands for location api query:", { country, state });
    const brands = await getAvailableBrandsForLocation({ country, state });
    console.log("Brands returned from service:", brands);
    return NextResponse.json(brands);
  } catch (error) {
    console.error("Get restaurants error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
