import { neon } from "@neondatabase/serverless";

function getSql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

export async function getSeatForUser(userId: string) {
  const sql = getSql();
  await sql`
    UPDATE student_access_seats SET status = 'expired', updated_at = now()
    WHERE auth_user_id = ${userId} AND status = 'active' AND expires_at <= now()
  `;
  const rows = await sql`
    SELECT seat, auth_user_id, email, status, openrouter_key_hash,
           openrouter_key_name, created_at, expires_at, revoked_at
    FROM student_access_seats WHERE auth_user_id = ${userId} LIMIT 1
  `;
  return rows[0] as {
    seat: number; auth_user_id: string; email: string; status: string;
    openrouter_key_hash: string | null; openrouter_key_name: string | null;
    created_at: string | null; expires_at: string | null; revoked_at: string | null;
  } | undefined;
}

export async function reserveSeat(userId: string, email: string) {
  const sql = getSql();
  const rows = await sql`
    WITH available AS (
      SELECT seat FROM student_access_seats
      WHERE status = 'available' ORDER BY seat LIMIT 1 FOR UPDATE SKIP LOCKED
    )
    UPDATE student_access_seats AS seats
    SET auth_user_id = ${userId}, email = ${email}, status = 'provisioning', updated_at = now()
    FROM available
    WHERE seats.seat = available.seat
      AND NOT EXISTS (SELECT 1 FROM student_access_seats existing WHERE existing.auth_user_id = ${userId})
    RETURNING seats.seat
  `;
  return rows[0] as { seat: number } | undefined;
}

export async function activateSeat(userId: string, keyHash: string, keyName: string, expiresAt: Date) {
  const sql = getSql();
  const rows = await sql`
    UPDATE student_access_seats
    SET status = 'active', openrouter_key_hash = ${keyHash}, openrouter_key_name = ${keyName},
        created_at = now(), expires_at = ${expiresAt.toISOString()}, updated_at = now()
    WHERE auth_user_id = ${userId} AND status = 'provisioning'
    RETURNING seat
  `;
  if (!rows.length) throw new Error("Reserved student seat could not be activated");
}

export async function releaseFailedSeat(userId: string) {
  const sql = getSql();
  await sql`
    UPDATE student_access_seats
    SET auth_user_id = NULL, email = NULL, status = 'available', updated_at = now()
    WHERE auth_user_id = ${userId} AND status = 'provisioning'
  `;
}

export async function listSeats() {
  const sql = getSql();
  return sql`
    SELECT seat, auth_user_id, email, status, openrouter_key_hash,
           openrouter_key_name, created_at, expires_at, revoked_at
    FROM student_access_seats WHERE status <> 'available' ORDER BY seat
  ` as Promise<Array<{
    seat: number; auth_user_id: string; email: string; status: string;
    openrouter_key_hash: string | null; openrouter_key_name: string | null;
    created_at: string | null; expires_at: string | null; revoked_at: string | null;
  }>>;
}

export async function getSeatByNumber(seat: number) {
  const sql = getSql();
  const rows = await sql`
    SELECT seat, status, openrouter_key_hash FROM student_access_seats WHERE seat = ${seat} LIMIT 1
  `;
  return rows[0] as { seat: number; status: string; openrouter_key_hash: string | null } | undefined;
}

export async function markSeatRevoked(seat: number) {
  const sql = getSql();
  await sql`UPDATE student_access_seats SET status = 'revoked', revoked_at = now(), updated_at = now() WHERE seat = ${seat} AND status = 'active'`;
}

export async function markExpiredSeats() {
  const sql = getSql();
  await sql`UPDATE student_access_seats SET status = 'expired', updated_at = now() WHERE status = 'active' AND expires_at <= now()`;
}
