import { NextRequest, NextResponse } from "next/server";

import {
  getAvailableYears,
  getMakesForYear,
  getModelsForMake,
  getTrimsForModel,
  resolveVehicleSelection,
} from "@/lib/data/vehicles";
import { getCompatibleTires } from "@/lib/data/query";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;
  const year = params.get("year");
  const makeId = params.get("makeId");
  const modelId = params.get("modelId");
  const trimId = params.get("trimId");

  if (trimId && makeId && modelId) {
    const resolved = resolveVehicleSelection(makeId, modelId, trimId);
    if (!resolved) return NextResponse.json({ error: "Vehicle not found" }, { status: 404 });
    const tires = getCompatibleTires(resolved.oemSize, {
      page: params.has("page") ? Number(params.get("page")) : undefined,
    });
    return NextResponse.json({ vehicle: resolved, tires });
  }

  if (modelId && makeId) {
    return NextResponse.json({ trims: getTrimsForModel(makeId, modelId) });
  }

  if (makeId) {
    return NextResponse.json({ models: getModelsForMake(makeId) });
  }

  if (year) {
    return NextResponse.json({ makes: getMakesForYear() });
  }

  return NextResponse.json({ years: getAvailableYears() });
}
