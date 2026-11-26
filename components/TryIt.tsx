"use client";

import type { User } from "firebase/auth";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { CONCRETE_APP_URL } from "@/lib/app-url";
import type { McqQuestion, QuizDocument } from "@/lib/quiz/types";
import { trialConfigured, completeMagicLink, idToken, saveToVault, sendMagicLink, signOutTrial, watchUser } from "@/lib/trial/firebase";
import styles from "./TryIt.module.css";

type Step =
  | { kind: "loading" }
  | { kind: "signed-out"; sentTo?: string }
  | { kind: "confirm-email" }
  | { kind: "ready" }
  | { kind: "generating" }
  | { kind: "quiz"; quiz: QuizDocument; saved: boolean; fresh: boolean };

const MIN_NOTES = 200;

function errorText(error: unknown, fallback: string) {
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (code.includes("invalid-email")) return "That email address doesn't look right.";
  if (code.includes("invalid-action-code") || code.includes("expired-action-code")) return "That sign-in link has expired. Send a new one.";
  if (code.includes("network")) return "Network error. Check your connection and try again.";
  return error instanceof Error && error.message ? error.message : fallback;
}

export function TryIt() {
  const [step, setStep] = useState<Step>(trialConfigured ? { kind: "loading" } : { kind: "signed-out" });
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!trialConfigured) return;
    completeMagicLink()
      .then((result) => {
        if (result === "needs-email") setStep({ kind: "confirm-email" });
        if (result === "signed-in") document.getElementById("try-it")?.scrollIntoView();
      })
      .catch((err) => setError(errorText(err, "Couldn't finish signing in.")));

    return watchUser(async (next) => {
      setUser(next);
      if (!next) {
        setStep((current) => (current.kind === "confirm-email" ? current : { kind: "signed-out" }));
        return;
      }
      try {
        const response = await fetch("/api/trial/quiz", { headers: { Authorization: `Bearer ${await idToken(next)}` }, cache: "no-store" });
        const data = await response.json();
        setStep(data.used ? { kind: "quiz", quiz: data.quiz, saved: true, fresh: false } : { kind: "ready" });
      } catch {
        setStep({ kind: "ready" });
      }
    });
  }, []);

  async function sendLink(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await sendMagicLink(email.trim());
      setStep({ kind: "signed-out", sentTo: email.trim() });
    } catch (err) {
      setError(errorText(err, "Couldn't send the link."));
    } finally {
      setBusy(false);
    }
  }

  async function confirmEmail(event: React.FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      await completeMagicLink(email.trim());
    } catch (err) {
      setError(errorText(err, "Couldn't finish signing in."));
    } finally {
      setBusy(false);
    }
  }

  async function generate(event: React.FormEvent) {
    event.preventDefault();
    if (!user) return;
    setError("");
    setStep({ kind: "generating" });
    try {
      const response = await fetch("/api/trial/quiz", {
        method: "POST",
        headers: { Authorization: `Bearer ${await idToken(user)}`, "Content-Type": "application/json" },
        body: JSON.stringify({ topic, notes }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Couldn't make the quiz.");
      const quiz: QuizDocument = data.quiz;
      const saved = await saveToVault(user.uid, [
        { path: data.sourcePath, body: `# ${topic.trim() || "My notes"}\n\n${notes.trim()}\n` },
        { path: `Trial/${quiz.title.replace(/[\\/:*?"<>|]/g, "-")}.md`, body: data.markdown },
      ]).then(() => true, () => false);
      setStep({ kind: "quiz", quiz, saved, fresh: true });
    } catch (err) {
      setError(errorText(err, "Couldn't make the quiz."));
      setStep({ kind: "ready" });
    }
  }

  let body: React.ReactNode;
  if (!trialConfigured) {
    body = (
      <a href={CONCRETE_APP_URL} className="btn btn--solid">
        Make a quiz in Concrete <span className="arrow"><Icon name="arrow" /></span>
      </a>
    );
  } else if (step.kind === "loading") {
    body = <p className={styles.muted}>Loading…</p>;
  } else if (step.kind === "signed-out" && step.sentTo) {
    body = (
      <div className={styles.card}>
        <h3 className="h3">Check your inbox</h3>
        <p className={styles.muted}>We sent a sign-in link to <b>{step.sentTo}</b>. Open it on this device to make your quiz.</p>
        <button type="button" className={styles.textButton} onClick={() => setStep({ kind: "signed-out" })}>Use a different email</button>
      </div>
    );
  } else if (step.kind === "signed-out" || step.kind === "confirm-email") {
    const confirming = step.kind === "confirm-email";
    body = (
      <form className={styles.card} onSubmit={confirming ? confirmEmail : sendLink}>
        <h3 className="h3">{confirming ? "Confirm your email" : "Make one free quiz"}</h3>
        <p className={styles.muted}>
          {confirming
            ? "You opened the link on a different device. Enter the same email to finish signing in."
            : "Enter your email and we’ll send a sign-in link. It also creates your Concrete account, so your quiz is saved for later."}
        </p>
        <div className={styles.inline}>
          <input type="email" required autoComplete="email" placeholder="you@school.edu" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" />
          <button type="submit" className="btn btn--solid" disabled={busy}>
            {confirming ? "Continue" : "Send link"} <span className="arrow"><Icon name="arrow" /></span>
          </button>
        </div>
      </form>
    );
  } else if (step.kind === "ready" || step.kind === "generating") {
    const generating = step.kind === "generating";
    body = (
      <form className={styles.card} onSubmit={generate}>
        <div className={styles.cardHead}>
          <h3 className="h3">Paste your notes</h3>
          <button type="button" className={styles.textButton} onClick={() => signOutTrial()}>{user?.email} · Sign out</button>
        </div>
        <label className={styles.field}>
          Topic
          <input value={topic} onChange={(e) => setTopic(e.target.value)} maxLength={80} placeholder="e.g. Binary search trees" disabled={generating} />
        </label>
        <label className={styles.field}>
          Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} rows={9} maxLength={12000} placeholder="Paste a page or two of class notes…" disabled={generating} />
          <span className={styles.count}>{notes.trim().length.toLocaleString()} / 12,000</span>
        </label>
        <button type="submit" className="btn btn--solid" disabled={generating || notes.trim().length < MIN_NOTES}>
          {generating ? "Making your quiz…" : "Make my quiz"} <span className="arrow"><Icon name="arrow" /></span>
        </button>
        {notes.trim().length > 0 && notes.trim().length < MIN_NOTES ? <p className={styles.muted}>Paste at least {MIN_NOTES} characters.</p> : null}
      </form>
    );
  } else {
    body = <TrialQuiz quiz={step.quiz} saved={step.saved} fresh={step.fresh} email={user?.email ?? ""} />;
  }

  return (
    <div className={styles.tryIt}>
      {body}
      {error ? <p role="alert" className={styles.error}>{error}</p> : null}
    </div>
  );
}

function TrialQuiz({ quiz, saved, fresh, email }: { quiz: QuizDocument; saved: boolean; fresh: boolean; email: string }) {
  const questions = quiz.questions.filter((q): q is McqQuestion => q.type === "mcq");
  const [picks, setPicks] = useState<Record<string, string>>({});
  const [checked, setChecked] = useState(false);
  const score = questions.filter((q) => q.options.find((o) => o.id === picks[q.id])?.correct).length;
  const allPicked = questions.every((q) => picks[q.id]);

  return (
    <div className={styles.quizWrap}>
      <div className={styles.quiz}>
        <p className="label">{fresh ? "Your quiz" : "Your free quiz"}</p>
        <h3 className="h3">{quiz.title}</h3>
        <ol className={styles.questions}>
          {questions.map((q, qi) => (
            <li key={q.id}>
              <p className={styles.prompt}>{q.prompt}</p>
              <div className={styles.answers} role="group" aria-label={`Question ${qi + 1}`}>
                {q.options.map((o, oi) => {
                  const picked = picks[q.id] === o.id;
                  const result = checked ? (o.correct ? "correct" : picked ? "incorrect" : undefined) : undefined;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      aria-pressed={picked}
                      data-result={result}
                      disabled={checked}
                      onClick={() => setPicks((p) => ({ ...p, [q.id]: o.id }))}
                    >
                      <span aria-hidden="true">{String.fromCharCode(65 + oi)}</span>
                      {o.text}
                    </button>
                  );
                })}
              </div>
            </li>
          ))}
        </ol>
        {checked ? (
          <p className={styles.score} role="status">You got {score} of {questions.length}.</p>
        ) : (
          <button type="button" className="btn btn--solid" disabled={!allPicked} onClick={() => setChecked(true)}>
            Check answers <span className="arrow"><Icon name="arrow" /></span>
          </button>
        )}
      </div>

      <aside className={styles.next}>
        <p className="label">Your account is ready</p>
        <h3 className="h3">Keep going in Concrete.</h3>
        <p>
          {saved
            ? "Your notes and this quiz are already saved in your Concrete account. Open it to retake the quiz, add more notes, and make as many quizzes as you want."
            : "Your Concrete account is set up. Open it to add more notes and make as many quizzes as you want."}
        </p>
        <p className={styles.muted}>Sign in with {email || "the same email"} to pick up where you left off.</p>
        <a href={CONCRETE_APP_URL} className="btn btn--solid">
          Open Concrete <span className="arrow"><Icon name="arrow" /></span>
        </a>
      </aside>
    </div>
  );
}
