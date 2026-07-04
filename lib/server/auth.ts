import { randomBytes, scryptSync, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

import { demoCustomer } from "@/lib/data/account";

export const SESSION_COOKIE = "obsidian_session";

interface StoredUser {
  id: string;
  name: string;
  email: string;
  salt: string;
  passwordHash: string;
}

declare global {
  var __obsidianUsers: Map<string, StoredUser> | undefined;
  var __obsidianSessions: Map<string, string> | undefined;
}

function hash(password: string, salt: string) {
  return scryptSync(password, salt, 64).toString("hex");
}

function seedDemoUser(store: Map<string, StoredUser>) {
  const salt = randomBytes(16).toString("hex");
  store.set(demoCustomer.email.toLowerCase(), {
    id: demoCustomer.id,
    name: demoCustomer.name,
    email: demoCustomer.email,
    salt,
    passwordHash: hash("password123", salt),
  });
}

function getUsers() {
  if (!globalThis.__obsidianUsers) {
    globalThis.__obsidianUsers = new Map();
    seedDemoUser(globalThis.__obsidianUsers);
  }
  return globalThis.__obsidianUsers;
}

function getSessions() {
  if (!globalThis.__obsidianSessions) globalThis.__obsidianSessions = new Map();
  return globalThis.__obsidianSessions;
}

export function findUserByEmail(email: string) {
  return getUsers().get(email.toLowerCase());
}

export function listUsers() {
  return Array.from(getUsers().values()).map(toPublicUser);
}

export function createUser(name: string, email: string, password: string) {
  const users = getUsers();
  if (users.has(email.toLowerCase())) {
    throw new Error("An account with this email already exists");
  }
  const salt = randomBytes(16).toString("hex");
  const user: StoredUser = {
    id: `customer-${randomBytes(6).toString("hex")}`,
    name,
    email,
    salt,
    passwordHash: hash(password, salt),
  };
  users.set(email.toLowerCase(), user);
  return user;
}

export function verifyCredentials(email: string, password: string) {
  const user = findUserByEmail(email);
  if (!user) return null;
  const candidate = hash(password, user.salt);
  const a = Buffer.from(candidate, "hex");
  const b = Buffer.from(user.passwordHash, "hex");
  if (a.length !== b.length || !timingSafeEqual(a, b)) return null;
  return user;
}

export function toPublicUser(user: StoredUser) {
  return { id: user.id, name: user.name, email: user.email };
}

export async function createSessionCookie(userId: string) {
  const token = randomBytes(24).toString("hex");
  getSessions().set(token, userId);
  const store = await cookies();
  store.set(SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function destroySessionCookie() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (token) getSessions().delete(token);
  store.delete(SESSION_COOKIE);
}

export async function getSessionUser() {
  const store = await cookies();
  const token = store.get(SESSION_COOKIE)?.value;
  if (!token) return null;
  const userId = getSessions().get(token);
  if (!userId) return null;
  for (const user of getUsers().values()) {
    if (user.id === userId) return toPublicUser(user);
  }
  return null;
}
