import { NextResponse } from "next/server";
import { quizDocumentFromModelText } from "@/lib/quiz/quizDocumentFromModelText";
import { quizDocumentToMarkdown } from "@/lib/quiz/guardrails";
import { buildQuizGenerationUserPrompt, QUIZ_GENERATION_SYSTEM_PROMPT } from "@/lib/quiz/quizGenerationPrompt";
import { hasSameOrigin, verifyTrialUser } from "@/lib/trial/server";

export const maxDuration = 120;

/** Same models the app uses for quiz generation: DeepSeek V4 Flash, retried on Luna. */
const PRIMARY_MODEL = "deepseek/deepseek-v4-flash-0731";
const FALLBACK_MODEL = "openai/gpt-5.6-luna";
const MIN_NOTES = 200;
const MAX_NOTES = 12000;
/** The sample is multiple choice only so it can be checked in the browser without a grader. */
const TRIAL_MCQ_COUNT = 5;

export async function GET(request: Request) {
  const user = await verifyTrialUser(request);
  if (!user) return NextResponse.json({ error: "Sign in with a verified email first." }, { status: 401 });
  // TODO: one-free-quiz tracking was in Neon; move it to Firestore. Until then every account can generate.
  return NextResponse.json({ used: false });
}

async function callProxy(token: string, model: string, messages: Array<{ role: string; content: string }>) {
  const base = process.env.CONCRETE_AI_PROXY_URL?.replace(/\/+$/, "");
  if (!base) throw new Error("CONCRETE_AI_PROXY_URL is not configured");
  const response = await fetch(`${base}/v1/chat`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model, messages, temperature: 0.55, max_tokens: 8000, operation: "trial_quiz_generation", stream: false }),
    cache: "no-store",
  });
  const body = await response.json().catch(() => null);
  if (!response.ok) {
    const error = new Error(body?.message ?? body?.error ?? `AI proxy returned ${response.status}`);
    (error as Error & { status?: number; code?: string }).status = response.status;
    (error as Error & { status?: number; code?: string }).code = body?.error;
    throw error;
  }
  if (typeof body?.content !== "string" || !body.content.trim()) throw new Error("empty completion");
  return body.content as string;
}

export async function POST(request: Request) {
  if (!hasSameOrigin(request)) return NextResponse.json({ error: "Invalid request origin." }, { status: 403 });
  const user = await verifyTrialUser(request);
  if (!user) return NextResponse.json({ error: "Sign in with a verified email first." }, { status: 401 });

  const input = await request.json().catch(() => null);
  const topic = typeof input?.topic === "string" ? input.topic.trim().slice(0, 80) : "";
  const notes = typeof input?.notes === "string" ? input.notes.trim() : "";
  if (notes.length < MIN_NOTES) {
    return NextResponse.json({ error: `Paste at least ${MIN_NOTES} characters of notes.` }, { status: 400 });
  }
  if (notes.length > MAX_NOTES) {
    return NextResponse.json({ error: `Keep it under ${MAX_NOTES.toLocaleString()} characters for the free quiz.` }, { status: 400 });
  }

  const title = topic || "My notes";
  const sourcePath = `Trial/${title.replace(/[\\/:*?"<>|]/g, "-")}.md`;
  const messages = [
    { role: "system", content: QUIZ_GENERATION_SYSTEM_PROMPT },
    {
      role: "user",
      content: buildQuizGenerationUserPrompt({ topic: title, noteContext: notes, source: sourcePath, mcqCount: TRIAL_MCQ_COUNT, difficulty: "medium" }),
    },
  ];

  try {
    let content: string;
    try {
      content = await callProxy(user.token, PRIMARY_MODEL, messages);
    } catch (error) {
      if ((error as { status?: number }).status) throw error; // proxy refusals (quota, auth) aren't retried
      content = await callProxy(user.token, FALLBACK_MODEL, messages);
    }
    const quiz = quizDocumentFromModelText(content, title);
    quiz.questions = quiz.questions.filter((q) => q.type === "mcq");
    if (!quiz.questions.length) throw new Error("Model response had no multiple-choice questions");
    const markdown = quizDocumentToMarkdown(quiz, quiz.title);
    return NextResponse.json({ quiz, markdown, sourcePath });
  } catch (error) {
    console.error("Trial quiz generation failed", error);
    if ((error as { code?: string }).code === "quota_exceeded") {
      return NextResponse.json({ error: "This account has used its AI requests for the month." }, { status: 429 });
    }
    return NextResponse.json({ error: "Couldn't make the quiz right now. Please try again." }, { status: 502 });
  }
}
