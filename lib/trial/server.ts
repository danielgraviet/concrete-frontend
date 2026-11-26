import { neon } from "@neondatabase/serverless";
import { createRemoteJWKSet, jwtVerify } from "jose";

/** Same Firebase project the Concrete web app (app.useconcrete.app) signs users into. */
function projectId() {
  const id = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID?.trim();
  if (!id) throw new Error("NEXT_PUBLIC_FIREBASE_PROJECT_ID is not configured");
  return id;
}

const jwks = createRemoteJWKSet(
  new URL("https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com"),
);

export type TrialUser = { uid: string; email: string; token: string };

/** Verifies a Firebase ID token the same way the AI proxy does; requires a verified email. */
export async function verifyTrialUser(request: Request): Promise<TrialUser | null> {
  const match = /^Bearer\s+(.+)$/i.exec(request.headers.get("authorization")?.trim() ?? "");
  const token = match?.[1]?.trim();
  if (!token) return null;
  try {
    const id = projectId();
    const { payload } = await jwtVerify(token, jwks, {
      algorithms: ["RS256"],
      issuer: `https://securetoken.google.com/${id}`,
      audience: id,
      clockTolerance: 60,
      requiredClaims: ["exp", "iat", "sub"],
    });
    if (typeof payload.sub !== "string" || !payload.sub) return null;
    if (payload.email_verified !== true || typeof payload.email !== "string") return null;
    return { uid: payload.sub, email: payload.email.trim().toLowerCase(), token };
  } catch {
    return null;
  }
}

function sql() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not configured");
  return neon(url);
}

export type TrialRow = { status: "generating" | "done"; title: string | null; quiz_markdown: string | null };

export async function getTrial(uid: string) {
  const rows = await sql()`SELECT status, title, quiz_markdown FROM trial_quizzes WHERE firebase_uid = ${uid} LIMIT 1`;
  return rows[0] as TrialRow | undefined;
}

/**
 * Claims the one free quiz. Returns false when the account already has one.
 * A claim stuck in "generating" for 5 minutes (crashed function) can be retried.
 */
export async function reserveTrial(uid: string, email: string) {
  const rows = await sql()`
    INSERT INTO trial_quizzes (firebase_uid, email) VALUES (${uid}, ${email})
    ON CONFLICT (firebase_uid) DO UPDATE SET updated_at = now()
      WHERE trial_quizzes.status = 'generating' AND trial_quizzes.updated_at < now() - interval '5 minutes'
    RETURNING firebase_uid
  `;
  return rows.length > 0;
}

export async function completeTrial(uid: string, title: string, markdown: string) {
  await sql()`
    UPDATE trial_quizzes SET status = 'done', title = ${title}, quiz_markdown = ${markdown}, updated_at = now()
    WHERE firebase_uid = ${uid}
  `;
}

export async function releaseTrial(uid: string) {
  await sql()`DELETE FROM trial_quizzes WHERE firebase_uid = ${uid} AND status = 'generating'`;
}
