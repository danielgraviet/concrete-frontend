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

/** Rejects cross-site POSTs: the Origin header must match the request host. */
export function hasSameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    return new URL(origin).host === new URL(request.url).host;
  } catch {
    return false;
  }
}
