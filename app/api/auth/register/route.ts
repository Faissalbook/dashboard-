import { NextRequest, NextResponse } from "next/server";

import { registerSchema } from "@/lib/validations";
import { createSessionCookie, createUser, toPublicUser } from "@/lib/server/auth";
import { jsonError, jsonZodError } from "@/lib/server/http";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = registerSchema.safeParse(body);
  if (!parsed.success) return jsonZodError(parsed.error);

  try {
    const user = createUser(parsed.data.name, parsed.data.email, parsed.data.password);
    await createSessionCookie(user.id);
    return NextResponse.json({ user: toPublicUser(user) }, { status: 201 });
  } catch (error) {
    return jsonError(error instanceof Error ? error.message : "Unable to register", 409);
  }
}
