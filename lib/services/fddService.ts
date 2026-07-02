import dbConnect from "@/lib/db";
import Fdd, { IFdd } from "@/lib/models/Fdd";
import SignedFdd, { ISignedFdd } from "@/lib/models/SignedFdd";
import mongoose from "mongoose";

export async function createFddRecord(data: {
  title: string;
  version: string;
  filePath: string;
  downloadName: string;
  fileSize: number;
  documentHash: string;
  country?: string;
  state?: string;
  restaurantName?: string;
}): Promise<IFdd> {
  await dbConnect();

  const country = data.country ? data.country.trim().toUpperCase() : "";
  const state = data.state ? data.state.trim().toUpperCase() : "";
  const restaurantName = data.restaurantName ? data.restaurantName.trim() : "";

  // Deactivate all previous active versions for the exact same country, state, and restaurantName combination
  await Fdd.updateMany(
    { isDeleted: false, country, state, restaurantName },
    { $set: { isActive: false } }
  );

  const newFdd = new Fdd({
    ...data,
    country,
    state,
    restaurantName,
    isActive: true,
    isDeleted: false,
  });

  return newFdd.save();
}

export async function getLatestFdd(query?: { country?: string; state?: string; restaurantName?: string }): Promise<IFdd | null> {
  await dbConnect();

  const country = query?.country ? query.country.trim().toUpperCase() : "";
  const state = query?.state ? query.state.trim().toUpperCase() : "";
  const restaurantName = query?.restaurantName ? query.restaurantName.trim() : "";

  // 1. If country is specified, strictly query within that country
  if (country) {
    if (state) {
      // 1a. Look for exact country and state match
      const exactMatch = await Fdd.findOne({
        isActive: true,
        isDeleted: false,
        country,
        state,
        ...(restaurantName ? { restaurantName: { $regex: new RegExp(`^${restaurantName}$`, "i") } } : {}),
      }).exec();
      if (exactMatch) return exactMatch;
    }

    // 1b. Fall back to country-wide template (empty state) for this country
    const countryFallback = await Fdd.findOne({
      isActive: true,
      isDeleted: false,
      country,
      state: "",
      ...(restaurantName ? { restaurantName: { $regex: new RegExp(`^${restaurantName}$`, "i") } } : {}),
    }).exec();
    if (countryFallback) return countryFallback;

    // 1c. If still not found and no state is specified, find any template in the country for this restaurant brand
    if (!state) {
      const anyStateMatch = await Fdd.findOne({
        isActive: true,
        isDeleted: false,
        country,
        ...(restaurantName ? { restaurantName: { $regex: new RegExp(`^${restaurantName}$`, "i") } } : {}),
      }).sort({ uploadedAt: -1 }).exec();
      if (anyStateMatch) return anyStateMatch;
    }

    // Do NOT fall back to global templates (country: "") if a specific country was requested
    return null;
  }

  // 2. If country is NOT specified (Global / Other)
  if (state) {
    // 2a. Look for state match with empty country
    const stateMatch = await Fdd.findOne({
      isActive: true,
      isDeleted: false,
      country: "",
      state,
      ...(restaurantName ? { restaurantName: { $regex: new RegExp(`^${restaurantName}$`, "i") } } : {}),
    }).exec();
    if (stateMatch) return stateMatch;
  }

  // 2b. Fall back to global template (empty country and empty state)
  const globalFallback = await Fdd.findOne({
    isActive: true,
    isDeleted: false,
    country: "",
    state: "",
    ...(restaurantName ? { restaurantName: { $regex: new RegExp(`^${restaurantName}$`, "i") } } : {}),
  }).exec();
  if (globalFallback) return globalFallback;

  // 2c. If still not found and no state is specified, find any global template for this restaurant brand
  if (!state) {
    const anyGlobalStateMatch = await Fdd.findOne({
      isActive: true,
      isDeleted: false,
      country: "",
      ...(restaurantName ? { restaurantName: { $regex: new RegExp(`^${restaurantName}$`, "i") } } : {}),
    }).sort({ uploadedAt: -1 }).exec();
    if (anyGlobalStateMatch) return anyGlobalStateMatch;
  }

  return null;
}

export async function getAvailableBrandsForLocation(query?: { country?: string; state?: string }): Promise<string[]> {
  await dbConnect();

  const country = query?.country ? query.country.trim().toUpperCase() : "";
  const state = query?.state ? query.state.trim().toUpperCase() : "";

  const filter = {
    isActive: true,
    isDeleted: false,
    restaurantName: { $ne: "" },
    country: country || "",
    ...(state
      ? { state: { $in: [state, ""] } }
      : country
      ? {}
      : { state: "" }),
  };

  const brands = await Fdd.distinct("restaurantName", filter).exec();
  return brands;
}

export async function getAllActiveFdds(): Promise<IFdd[]> {
  await dbConnect();
  return Fdd.find({ isDeleted: false }).sort({ uploadedAt: -1 }).exec();
}

export async function softDeleteFddRecord(id: string): Promise<IFdd | null> {
  await dbConnect();
  const fdd = await Fdd.findById(id);
  if (!fdd) {
    return null;
  }

  const wasActive = fdd.isActive;
  fdd.isDeleted = true;
  fdd.isActive = false;
  fdd.deletedAt = new Date();
  await fdd.save();

  // Self-healing: if deleted version was active, promote the next most recent version matching the same location and restaurant name to active
  if (wasActive) {
    const nextActive = await Fdd.findOne({
      isDeleted: false,
      country: fdd.country,
      state: fdd.state,
      restaurantName: fdd.restaurantName,
    }).sort({ uploadedAt: -1 });
    if (nextActive) {
      nextActive.isActive = true;
      await nextActive.save();
    }
  }

  return fdd;
}

export async function createSignedFddRecord(data: Partial<ISignedFdd>): Promise<ISignedFdd> {
  await dbConnect();
  const signed = new SignedFdd(data);
  return signed.save();
}

export async function getLatestFddsForLocation(query?: { country?: string; state?: string; restaurantName?: string }): Promise<IFdd[]> {
  await dbConnect();

  const country = query?.country ? query.country.trim().toUpperCase() : "";
  const state = query?.state ? query.state.trim().toUpperCase() : "";
  const restaurantName = query?.restaurantName ? query.restaurantName.trim() : "";

  const brands = await getAvailableBrandsForLocation({ country, state });

  const targetBrands = restaurantName 
    ? brands.filter(b => b.toLowerCase() === restaurantName.toLowerCase())
    : brands;

  const results: IFdd[] = [];

  for (const brand of targetBrands) {
    const fdd = await getLatestFdd({ country, state, restaurantName: brand });
    if (fdd) {
      results.push(fdd);
    }
  }

  return results.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime());
}

export async function getAllSignedFdds(): Promise<ISignedFdd[]> {
  await dbConnect();
  return SignedFdd.find().populate("fddId").sort({ signedAt: -1 }).exec();
}
