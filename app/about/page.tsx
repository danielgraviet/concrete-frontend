import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import { Icon } from "@/components/Icon";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "About",
  description:
    "Why Concrete exists and how it helps students study from their own notes.",
  path: "/about",
});

const VALUES = [
  {
    title: "Code you can trace",
    body: "Predict the output, find the bug, state the complexity. Practice reading code the way exams and interviews ask.",
    feature: "Quizzes",
    href: "/quizzes",
  },
  {
    title: "Definitions you can recall",
    body: "Keep theorems, algorithms, and key facts on a spaced schedule so they're there when you need them.",
    feature: "Flashcards",
    href: "/flashcards",
  },
  {
    title: "Gaps you can see",
    body: "A skill-by-skill breakdown after every quiz shows exactly where to spend your next hour.",
    feature: "Progress",
    href: "/progress",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="wrap grid">
          <p className={`label ${styles.full}`}>About</p>
          <h1 className={`${styles.full} ${styles.phrases}`}>
            {["example", "implementation", "understanding"].map((word, i) => (
              <span key={word} className={i === 2 ? styles.phraseKey : undefined}>
                <span className={styles.phraseLead}>a concrete </span>
                {word}
                <span className={styles.dot}>.</span>
              </span>
            ))}
          </h1>
          <p className={`lede ${styles.lede}`}>
            Concrete means something you can stand on: specific, tested, real. That&apos;s what your understanding
            needs to be before an exam, an interview, or a deadline.
          </p>
        </div>
      </section>

      {/* ── Who it's for ────────────────────────────────── */}
      <section className="section section--chrome">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>01 / Why I built it</p>
            <div className={styles.headTitle}>
              <h2 className="h2">Valuable knowledge is concrete knowledge.</h2>
              <div className={styles.story}>
                <p className="body">
                  I study engineering, and I use Concrete every day. Today we can learn almost anything, but the
                  knowledge that&apos;s actually valuable is concrete: you can remember it, apply it, and build on it.
                </p>
                <p className="body">
                  I&apos;d finish a class, move on, and forget what I learned weeks later. What helped was quizzing
                  myself and coming back to the things I missed. Concrete makes that easier with the material you
                  already study, whatever the subject.
                </p>
              </div>
            </div>
          </div>
          <ul className={styles.values}>
            {VALUES.map((v, i) => (
              <li key={v.title}>
                <span className="index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{v.title}</h3>
                <p className="body">{v.body}</p>
                <Link href={v.href} className={styles.pourLink}>
                  {v.feature} <Icon name="arrow" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
