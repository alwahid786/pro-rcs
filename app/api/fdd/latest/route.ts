import { NextRequest, NextResponse } from "next/server";
import { getLatestFddsForLocation } from "@/lib/services/fddService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const country = searchParams.get("country") || undefined;
    const state = searchParams.get("state") || undefined;
    const restaurant = searchParams.get("restaurant") || undefined;

    const matchedFdds = await getLatestFddsForLocation({ country, state, restaurantName: restaurant });

    const results = matchedFdds.map(f => ({
      id: f._id,
      title: f.title,
      version: f.version,
      restaurantName: f.restaurantName,
      fileSize: f.fileSize,
      downloadUrl: `/api/fdd/download/${f._id}`,
      uploadedAt: f.uploadedAt,
      country: f.country,
      state: f.state,
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Latest FDD list endpoint error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
