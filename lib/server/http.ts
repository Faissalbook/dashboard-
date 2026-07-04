import { NextResponse } from "next/server";
import type { ZodError } from "zod";

export function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export function jsonZodError(error: ZodError) {
  return NextResponse.json(
    { error: "Validation failed", issues: error.flatten().fieldErrors },
    { status: 422 },
  );
}
