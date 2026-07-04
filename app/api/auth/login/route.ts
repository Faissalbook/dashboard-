import { NextRequest, NextResponse } from "next/server";

import { loginSchema } from "@/lib/validations";
import { createSessionCookie, toPublicUser, verifyCredentials } from "@/lib/server/auth";
import { jsonError, jsonZodError } from "@/lib/server/http";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = loginSchema.safeParse(body);
  if (!parsed.success) return jsonZodError(parsed.error);

  const user = verifyCredentials(parsed.data.email, parsed.data.password);
  if (!user) return jsonError("Invalid email or password", 401);

  await createSessionCookie(user.id);
  return NextResponse.json({ user: toPublicUser(user) });
}
