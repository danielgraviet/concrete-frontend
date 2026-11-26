import { NextResponse } from "next/server";
import { getVerifiedUser, hasSameOrigin, isAdminEmail } from "@/lib/student-access/auth";
import { getSeatByNumber, markSeatRevoked } from "@/lib/student-access/db";
import { disableKey } from "@/lib/student-access/openrouter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await getVerifiedUser();
  if (!user || !isAdminEmail(user.email)) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  const body = await request.json().catch(() => null);
  const seatNumber = Number(body?.seat);
  if (!Number.isInteger(seatNumber) || seatNumber < 1 || seatNumber > 10) return NextResponse.json({ error: "Invalid student seat." }, { status: 400 });
  const seat = await getSeatByNumber(seatNumber);
  if (!seat || seat.status !== "active" || !seat.openrouter_key_hash) return NextResponse.json({ error: "That student key is not active." }, { status: 409 });
  try {
    await disableKey(seat.openrouter_key_hash);
    await markSeatRevoked(seatNumber);
    return NextResponse.json({ status: "revoked" });
  } catch (error) {
    console.error("Student key revocation failed", error);
    return NextResponse.json({ error: "Could not revoke this key. Please retry." }, { status: 502 });
  }
}
