const API_BASE = "https://openrouter.ai/api/v1";
export const SPONSORED_MODEL = "deepseek/deepseek-v4-flash-0731";

function managementKey() {
  const key = process.env.OPENROUTER_MANAGEMENT_KEY;
  if (!key) throw new Error("OPENROUTER_MANAGEMENT_KEY is not configured");
  return key;
}

async function openRouter<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${managementKey()}`, "Content-Type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const message = body?.error?.message;
    throw new Error(typeof message === "string" ? message : `OpenRouter returned ${response.status}`);
  }
  return body as T;
}

export async function createStudentKey(email: string, expiresAt: Date) {
  const result = await openRouter<{ data: { hash: string; name: string }; key: string }>("/keys", {
    method: "POST",
    body: JSON.stringify({ name: `Concrete student ${email}`, limit: 5, limit_reset: "weekly", expires_at: expiresAt.toISOString(), include_byok_in_limit: true }),
  });
  return { hash: result.data.hash, name: result.data.name, key: result.key };
}

export async function assignKeyGuardrail(hash: string) {
  const guardrailId = process.env.OPENROUTER_GUARDRAIL_ID;
  if (!guardrailId) throw new Error("OPENROUTER_GUARDRAIL_ID is not configured");
  const result = await openRouter<{ assigned_count: number }>(`/guardrails/${encodeURIComponent(guardrailId)}/assignments/keys`, {
    method: "POST", body: JSON.stringify({ key_hashes: [hash] }),
  });
  if (result.assigned_count !== 1) throw new Error("OpenRouter did not assign the student key guardrail");
}

export async function assertStudentGuardrail() {
  const guardrailId = process.env.OPENROUTER_GUARDRAIL_ID;
  if (!guardrailId) throw new Error("OPENROUTER_GUARDRAIL_ID is not configured");
  const { data } = await openRouter<{ data: {
    allowed_models: string[] | null;
    allowed_providers: string[] | null;
    limit_usd: number | null;
    reset_interval: string | null;
  } }>(`/guardrails/${encodeURIComponent(guardrailId)}`);
  const modelOnly = data.allowed_models?.length === 1 && data.allowed_models[0] === SPONSORED_MODEL;
  const providerOnly = data.allowed_providers?.length === 1 && data.allowed_providers[0].toLowerCase() === "deepseek";
  if (!modelOnly || !providerOnly || data.limit_usd !== 5 || data.reset_interval !== "weekly") {
    throw new Error("Student guardrail must allow only the selected DeepSeek V4 model/provider and have a $5 weekly budget");
  }
}

export async function disableKey(hash: string) {
  await openRouter(`/keys/${encodeURIComponent(hash)}`, { method: "PATCH", body: JSON.stringify({ disabled: true }) });
}

export async function getKeyUsage(hash: string) {
  const result = await openRouter<{ data: { usage?: number; usage_weekly?: number; limit_remaining: number | null; last_used_at: string | null } }>(`/keys/${encodeURIComponent(hash)}`);
  return { usage: result.data.usage_weekly ?? result.data.usage ?? 0, limit_remaining: result.data.limit_remaining, last_used_at: result.data.last_used_at };
}
