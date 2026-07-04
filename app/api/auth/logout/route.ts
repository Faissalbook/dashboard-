import { NextResponse } from "next/server";

import { destroySessionCookie } from "@/lib/server/auth";

export async function POST() {
  await destroySessionCookie();
  return NextResponse.json({ success: true });
}
