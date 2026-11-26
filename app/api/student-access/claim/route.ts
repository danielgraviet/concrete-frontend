import { NextResponse } from "next/server";
import { getVerifiedUser, hasSameOrigin, isEduAddress } from "@/lib/student-access/auth";
import { activateSeat, getSeatForUser, releaseFailedSeat, reserveSeat } from "@/lib/student-access/db";
import { assertStudentGuardrail, assignKeyGuardrail, createStudentKey, disableKey, SPONSORED_MODEL } from "@/lib/student-access/openrouter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getVerifiedUser();
  if (!user) return NextResponse.json({ error: "Sign in with a verified .edu email first." }, { status: 401 });
  if (!isEduAddress(user.email)) return NextResponse.json({ error: "Use a verified email address ending in .edu." }, { status: 403 });
  const seat = await getSeatForUser(user.id);
  if (!seat) return NextResponse.json({ status: "eligible", model: SPONSORED_MODEL, weeklyLimit: 5 });
  return NextResponse.json({ status: seat.status, expiresAt: seat.expires_at, model: SPONSORED_MODEL, weeklyLimit: 5 });
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await getVerifiedUser();
  if (!user) return NextResponse.json({ error: "Sign in with a verified .edu email first." }, { status: 401 });
  if (!isEduAddress(user.email)) return NextResponse.json({ error: "Use a verified email address ending in .edu." }, { status: 403 });
  if (await getSeatForUser(user.id)) return NextResponse.json({ error: "This account already claimed a student seat." }, { status: 409 });

  try {
    await assertStudentGuardrail();
  } catch (error) {
    console.error("Student OpenRouter guardrail is missing or misconfigured", error);
    return NextResponse.json({ error: "Student access is not configured yet. Please contact the instructor." }, { status: 503 });
  }

  let reserved;
  try {
    reserved = await reserveSeat(user.id, user.email);
  } catch (error) {
    const existing = await getSeatForUser(user.id).catch(() => undefined);
    if (existing) return NextResponse.json({ error: "This account already claimed a student seat." }, { status: 409 });
    console.error("Could not reserve a student seat", error);
    return NextResponse.json({ error: "No student seats are available." }, { status: 409 });
  }
  if (!reserved) return NextResponse.json({ error: "No student seats are available." }, { status: 409 });

  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  let key: Awaited<ReturnType<typeof createStudentKey>> | undefined;
  try {
    key = await createStudentKey(user.email, expiresAt);
    // Don't deliver the key to the student until the server-side restriction is active.
    await assignKeyGuardrail(key.hash);
    await activateSeat(user.id, key.hash, key.name, expiresAt);
    return NextResponse.json({ key: key.key, expiresAt: expiresAt.toISOString(), model: SPONSORED_MODEL, weeklyLimit: 5 });
  } catch (error) {
    if (key) {
      try { await disableKey(key.hash); } catch { /* best-effort cleanup */ }
    }
    try { await releaseFailedSeat(user.id); } catch { /* preserve the provisioning error */ }
    console.error("Student OpenRouter key provisioning failed", error);
    return NextResponse.json({ error: "Could not issue access right now. Please try again later." }, { status: 502 });
  }
}
