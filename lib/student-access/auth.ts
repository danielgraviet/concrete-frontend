import { createNeonAuth } from "@neondatabase/auth/next/server";

function getAuth() {
  const baseUrl = process.env.NEON_AUTH_BASE_URL;
  const cookieSecret = process.env.NEON_AUTH_COOKIE_SECRET;
  if (!baseUrl || !cookieSecret || cookieSecret.length < 32) {
    throw new Error("Configure NEON_AUTH_BASE_URL and a 32+ character NEON_AUTH_COOKIE_SECRET");
  }
  return createNeonAuth({ baseUrl, cookies: { secret: cookieSecret, sessionDataTtl: 60 } });
}

export async function handleAuthRequest(request: Request) {
  const handlers = getAuth().handler();
  return request.method === "GET" ? handlers.GET(request) : handlers.POST(request);
}

export async function getVerifiedUser() {
  const { data } = await getAuth().getSession();
  const user = data?.user;
  if (!user || !user.emailVerified || typeof user.email !== "string") return null;
  return { id: user.id, email: user.email.trim().toLowerCase() };
}

export function isEduAddress(email: string) {
  const domain = email.slice(email.lastIndexOf("@") + 1);
  return email.includes("@") && domain.endsWith(".edu");
}

export function isAdminEmail(email: string) {
  return email === process.env.STUDENT_ACCESS_ADMIN_EMAIL?.trim().toLowerCase();
}

export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try { return new URL(origin).host === new URL(request.url).host; } catch { return false; }
}
