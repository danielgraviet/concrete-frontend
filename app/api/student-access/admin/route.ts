import { NextResponse } from "next/server";
import { getVerifiedUser, isAdminEmail } from "@/lib/student-access/auth";
import { listSeats, markExpiredSeats } from "@/lib/student-access/db";
import { getKeyUsage } from "@/lib/student-access/openrouter";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const user = await getVerifiedUser();
  if (!user || !isAdminEmail(user.email)) return NextResponse.json({ error: "Not authorized." }, { status: 403 });
  try {
    await markExpiredSeats();
    const seats = await listSeats();
    const students = await Promise.all(seats.map(async (seat) => {
      if (!seat.openrouter_key_hash || seat.status !== "active") return { ...seat, usage: null, limit_remaining: null, last_used_at: null };
      try { return { ...seat, ...(await getKeyUsage(seat.openrouter_key_hash)) }; }
      catch { return { ...seat, usage: null, limit_remaining: null, last_used_at: null }; }
    }));
    return NextResponse.json({ students, activeCount: students.filter((student) => student.status === "active").length, maxStudents: 10 });
  } catch (error) {
    console.error("Student dashboard read failed", error);
    return NextResponse.json({ error: "Could not load the student roster." }, { status: 503 });
  }
}
