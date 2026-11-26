"use client";

import { useCallback, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authClient } from "@/lib/student-access/client";
import styles from "./student-access.module.css";

type Student = {
  seat: number;
  email: string;
  status: string;
  created_at: string | null;
  expires_at: string | null;
  usage: number | null;
  limit_remaining: number | null;
  last_used_at: string | null;
};

type AccessState =
  | { kind: "loading" }
  | { kind: "signed-out" }
  | { kind: "student"; email: string; verified: boolean; status: string; expiresAt?: string }
  | { kind: "admin"; students: Student[]; activeCount: number; maxStudents: number };

function isEdu(email: string) {
  return email.toLowerCase().split("@").at(-1)?.endsWith(".edu") ?? false;
}

function formatDate(value: string | null | undefined) {
  if (!value) return "—";
  return new Intl.DateTimeFormat(undefined, { dateStyle: "medium" }).format(new Date(value));
}

export function StudentAccess() {
  const [state, setState] = useState<AccessState>({ kind: "loading" });
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const [issuedKey, setIssuedKey] = useState("");
  const [copied, setCopied] = useState(false);

  const refresh = useCallback(async () => {
    const sessionResult = await authClient.getSession();
    const user = sessionResult.data?.user;
    if (!user) {
      setState({ kind: "signed-out" });
      return;
    }
    const userEmail = user.email.toLowerCase();
    const adminResult = await fetch("/api/student-access/admin", { cache: "no-store" });
    if (adminResult.ok) {
      const data = await adminResult.json();
      setState({ kind: "admin", ...data });
      return;
    }
    const studentResult = await fetch("/api/student-access/claim", { cache: "no-store" });
    const data = await studentResult.json().catch(() => ({}));
    setState({ kind: "student", email: userEmail, verified: Boolean(user.emailVerified), status: data.status ?? (user.emailVerified ? "eligible" : "verify-email"), expiresAt: data.expiresAt });
  }, []);

  useEffect(() => {
    refresh().catch(() => setState({ kind: "signed-out" }));
  }, [refresh]);

  async function signIn(mode: "signin" | "signup") {
    setBusy(true);
    setNotice("");
    try {
      if (mode === "signup") {
        const result = await authClient.signUp.email({ email: email.trim(), password, name: email.trim(), callbackURL: `${window.location.origin}/student-access` });
        if (result.error) throw new Error(result.error.message);
        setNotice("Check your inbox for Neon Auth’s verification email, then sign in here.");
      } else {
        const result = await authClient.signIn.email({ email: email.trim(), password });
        if (result.error) throw new Error(result.error.message);
        await refresh();
      }
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Sign-in failed. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  async function signOut() {
    await authClient.signOut();
    setIssuedKey("");
    setNotice("");
    await refresh();
  }

  async function claim() {
    setBusy(true);
    setNotice("");
    try {
      const response = await fetch("/api/student-access/claim", { method: "POST" });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not claim access.");
      setIssuedKey(data.key);
      setNotice("Access is ready. Copy the key now and add it in Concrete → Settings → Tutor AI. It is shown only once.");
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not claim access.");
    } finally {
      setBusy(false);
    }
  }

  async function revoke(seat: number) {
    if (!window.confirm(`Revoke sponsored access for seat ${seat}? This disables its OpenRouter key.`)) return;
    setBusy(true);
    try {
      const response = await fetch("/api/student-access/admin/revoke", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ seat }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Could not revoke access.");
      setNotice(`Seat ${seat} has been revoked.`);
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : "Could not revoke access.");
    } finally {
      setBusy(false);
    }
  }

  async function copyKey() {
    await navigator.clipboard.writeText(issuedKey);
    setCopied(true);
  }

  let content: ReactNode;
  if (state.kind === "loading") {
    content = <p className={styles.message}>Loading account…</p>;
  } else if (state.kind === "signed-out") {
    content = (
      <div className={styles.card}>
        <h2 className="h3">Sign in or create an account</h2>
        <p className={styles.copy}>Use a verified .edu address. One student account can claim one seat.</p>
        <label className={styles.label}>School email<input type="email" autoComplete="email" value={email} onChange={(event) => setEmail(event.target.value)} /></label>
        <label className={styles.label}>Password<input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} /></label>
        <div className={styles.actions}>
          <button className={styles.primary} disabled={busy || !email || !password} onClick={() => signIn("signin")}>Sign in</button>
          <button className={styles.secondary} disabled={busy || !email || !password} onClick={() => signIn("signup")}>Create account</button>
        </div>
      </div>
    );
  } else if (state.kind === "student") {
    const eligible = state.verified && isEdu(state.email);
    content = (
      <div className={styles.card}>
        <div className={styles.cardHead}><div><p className="label">Signed in</p><h2 className={styles.email}>{state.email}</h2></div><button className={styles.textButton} onClick={signOut}>Sign out</button></div>
        {!state.verified ? <p className={styles.message}>Verify your email from the message Neon Auth sent, then sign in again.</p> : null}
        {state.status === "ineligible" ? <p className={styles.message}>Sponsored access is limited to verified .edu email addresses.</p> : null}
        {eligible && state.status === "eligible" ? <><p className={styles.copy}>$5 of OpenRouter usage each week, limited to DeepSeek V4 Flash. Access expires 30 days after you claim it.</p><button className={styles.primary} disabled={busy} onClick={claim}>Claim student access</button></> : null}
        {state.status === "active" ? <p className={styles.message}>This account already claimed access. Key expiry: {formatDate(state.expiresAt)}. If you lost the key, contact the instructor.</p> : null}
        {state.status === "revoked" ? <p className={styles.message}>Access for this account was revoked.</p> : null}
        {state.status === "expired" ? <p className={styles.message}>This account’s 30-day access period has ended.</p> : null}
        {issuedKey ? <div className={styles.keyBox}><label className={styles.label}>Your OpenRouter key — copy it now<input readOnly value={issuedKey} onFocus={(event) => event.currentTarget.select()} /></label><button className={styles.secondary} onClick={copyKey}>{copied ? "Copied" : "Copy key"}</button></div> : null}
      </div>
    );
  } else {
    content = (
      <div className={styles.card}>
        <div className={styles.cardHead}><div><p className="label">Instructor dashboard</p><h2 className="h3">{state.activeCount} active · {state.students.length} / {state.maxStudents} seats used</h2></div><button className={styles.textButton} onClick={signOut}>Sign out</button></div>
        {state.students.length ? <div className={styles.tableWrap}><table className={styles.table}><thead><tr><th>Seat</th><th>Student</th><th>Status</th><th>Used this week</th><th>Remaining</th><th>Expires</th><th /></tr></thead><tbody>{state.students.map((student) => <tr key={student.seat}><td>{student.seat}</td><td>{student.email}</td><td>{student.status}</td><td>{student.usage == null ? "—" : `$${student.usage.toFixed(2)}`}</td><td>{student.limit_remaining == null ? "—" : `$${student.limit_remaining.toFixed(2)}`}</td><td>{formatDate(student.expires_at)}</td><td>{student.status === "active" ? <button className={styles.danger} disabled={busy} onClick={() => revoke(student.seat)}>Revoke</button> : null}</td></tr>)}</tbody></table></div> : <p className={styles.message}>No students have claimed access yet.</p>}
      </div>
    );
  }

  return <div className={styles.content}>{content}{notice ? <p role="status" className={styles.notice}>{notice}</p> : null}</div>;
}
