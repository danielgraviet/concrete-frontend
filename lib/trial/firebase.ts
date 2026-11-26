"use client";

import { getApps, initializeApp, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  isSignInWithEmailLink,
  onAuthStateChanged,
  sendSignInLinkToEmail,
  signInWithEmailLink,
  signOut,
  type User,
} from "firebase/auth";
import { collection, doc, getFirestore, writeBatch } from "firebase/firestore";

const EMAIL_KEY = "concrete-trial-email";

/** False until the NEXT_PUBLIC_FIREBASE_* variables are set; the section then links to the app instead. */
export const trialConfigured = Boolean(
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY &&
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN &&
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID &&
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
);

function app(): FirebaseApp {
  return (
    getApps()[0] ??
    initializeApp({
      apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
      authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    })
  );
}

export function watchUser(callback: (user: User | null) => void) {
  return onAuthStateChanged(getAuth(app()), callback);
}

/** Creates the Concrete account on first use: the magic link signs the person in (or up). */
export async function sendMagicLink(email: string) {
  const url = new URL(window.location.href);
  url.hash = "try-it";
  await sendSignInLinkToEmail(getAuth(app()), email, { url: url.toString(), handleCodeInApp: true });
  window.localStorage.setItem(EMAIL_KEY, email);
}

/**
 * Finishes sign-in when the page was opened from the magic link.
 * Returns "needs-email" when the link was opened on another device.
 */
export async function completeMagicLink(emailOverride?: string): Promise<"none" | "signed-in" | "needs-email"> {
  const auth = getAuth(app());
  const href = window.location.href;
  if (!isSignInWithEmailLink(auth, href)) return "none";
  const email = emailOverride ?? window.localStorage.getItem(EMAIL_KEY);
  if (!email) return "needs-email";
  await signInWithEmailLink(auth, email, href);
  window.localStorage.removeItem(EMAIL_KEY);
  const clean = new URL(href);
  clean.search = "";
  window.history.replaceState(null, "", clean.toString());
  return "signed-in";
}

export async function idToken(user: User) {
  return user.getIdToken();
}

export function signOutTrial() {
  return signOut(getAuth(app()));
}

/** Matches encodeDataKey in markdown-vault/src/backend/cloud/paths.ts (folder doc ids). */
function encodeDataKey(key: string) {
  return encodeURIComponent(key).replace(/[._!~*'()]/g, (ch) => `%${ch.charCodeAt(0).toString(16).toUpperCase().padStart(2, "0")}`);
}

/**
 * Saves the pasted notes and the generated quiz into the person's Concrete vault,
 * using the same Firestore layout as the web app, so both are waiting when they open it.
 */
export async function saveToVault(uid: string, files: Array<{ path: string; body: string }>) {
  const db = getFirestore(app());
  const batch = writeBatch(db);
  const user = doc(db, "users", uid);
  const folders = new Set(files.map((f) => f.path.split("/").slice(0, -1).join("/")).filter(Boolean));
  for (const folder of folders) batch.set(doc(collection(user, "folders"), encodeDataKey(folder)), { path: folder });
  const updatedAt = new Date().toISOString();
  for (const file of files) {
    batch.set(doc(collection(user, "notes")), {
      path: file.path,
      body: file.body,
      updatedAt,
      size: new TextEncoder().encode(file.body).byteLength,
    });
  }
  await batch.commit();
}
