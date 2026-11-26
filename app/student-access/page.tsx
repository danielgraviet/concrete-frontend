import type { Metadata } from "next";
import { StudentAccess } from "./StudentAccess";
import styles from "./student-access.module.css";

export const metadata: Metadata = { title: "Student access" };
export const dynamic = "force-dynamic";

export default function StudentAccessPage() {
  return (
    <section className={styles.page}>
      <div className="wrap">
        <p className="label">Concrete · Sponsored access</p>
        <h1 className="h2">Student access</h1>
        <p className={styles.intro}>Sign in with a verified .edu email to claim a weekly OpenRouter allowance for Concrete.</p>
        <StudentAccess />
      </div>
    </section>
  );
}
