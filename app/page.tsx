import Link from "next/link";
import { Composition } from "@/components/Composition";
import { Glyph } from "@/components/Glyph";
import { FEATURES, SITE } from "@/lib/features";
import styles from "./page.module.css";

const LOOP = [
  { n: "01", title: "Write it down.", body: "Collect working knowledge in notes that stay ordinary files on disk.", href: "/notes", cta: "Notes" },
  { n: "02", title: "Explore the idea.", body: "Follow links, talk a concept through with the tutor, and run the example.", href: "/tutor", cta: "Tutor" },
  { n: "03", title: "Make it stick.", body: "Come back to quizzes and flashcards over time, and watch the gaps close.", href: "/review", cta: "Review" },
];

const PRINCIPLES = [
  { k: "Local-first", v: "No account. No cloud. Your vault is a folder on your Mac." },
  { k: "Plain files", v: "Markdown in, Markdown out. Open your notes in any editor." },
  { k: "Your model", v: "Claude Code, Codex, or OpenRouter, with the login you already have." },
  { k: "Open source", v: "MIT licensed. Read the code, file an issue, send a patch." },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="wrap">
          <div className={styles.meta}>
            <span className="label">A local-first workspace for learning STEM</span>
            <span className="label">
              v{SITE.version} · macOS · MIT
            </span>
          </div>

          <div className={`grid ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <h1 className={`display ${styles.title}`}>
                Learn from
                <br />
                your own
                <br />
                notes<span className={styles.dot}>.</span>
              </h1>
              <p className={`lede ${styles.lede}`}>
                Write notes in Markdown, then generate quizzes, flashcards, and explanations grounded in exactly what
                you&apos;re studying.
              </p>
              <div className="btn-row">
                <Link href="/download" className="btn btn--solid">
                  Download for Mac <span className="arrow">→</span>
                </Link>
                <a href={SITE.github} className="btn btn--line" target="_blank" rel="noreferrer">
                  View on GitHub <span className="arrow">↗</span>
                </a>
              </div>
            </div>
            <div className={styles.heroArt}>
              <Composition />
            </div>
          </div>
        </div>
      </section>

      {/* ── Index ──────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>Index</p>
            <h2 className={`h2 ${styles.headTitle}`}>Seven tools. One workspace. Every one starts from a note.</h2>
          </div>

          <ul className={styles.index}>
            {FEATURES.map((f) => (
              <li key={f.slug}>
                <Link href={`/${f.slug}`} className={styles.row}>
                  <span className={styles.rowNum}>{f.index}</span>
                  <span className={styles.rowName}>{f.name}</span>
                  <span className={styles.rowSummary}>{f.summary}</span>
                  <Glyph name={f.glyph} className={styles.rowGlyph} />
                  <span className={styles.rowArrow} aria-hidden="true">
                    →
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The loop ───────────────────────────────────── */}
      <section className="section section--ink">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>The learning loop</p>
            <div className={styles.headTitle}>
              <h2 className="h2">Build a little. Then build on it.</h2>
              <p className={`lede ${styles.loopLede}`}>
                Move from collecting information to being able to use it. Every practice session stays one click from
                the source note.
              </p>
            </div>
          </div>
          <ol className={styles.loop}>
            {LOOP.map((l) => (
              <li key={l.n} className={styles.loopItem}>
                <span className={styles.loopNum}>{l.n}</span>
                <h3 className="h3">{l.title}</h3>
                <p className="body">{l.body}</p>
                <Link href={l.href} className={styles.loopLink}>
                  {l.cta} →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Principles ─────────────────────────────────── */}
      <section className="section section--chrome">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>Principles</p>
            <h2 className={`h2 ${styles.headTitle}`}>Your notes, your machine, your model.</h2>
          </div>
          <dl className={styles.principles}>
            {PRINCIPLES.map((p, i) => (
              <div key={p.k} className={styles.principle}>
                <span className="index">{String(i + 1).padStart(2, "0")}</span>
                <dt className="h3">{p.k}</dt>
                <dd className="body">{p.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── The mark ───────────────────────────────────── */}
      <section className="section">
        <div className="wrap grid">
          <div className={styles.markArt}>
            <img src="/brand/square-boxy-crop.svg" alt="The Concrete mark" width={218} height={274} />
          </div>
          <div className={styles.markCopy}>
            <p className="label">The mark</p>
            <h2 className="h2">One square, divided.</h2>
            <p className="body">
              Concrete&apos;s identity starts with a square, divided into halves, then quarters, then repeated into a
              larger system. The workspace works the same way: small notes, linked into something useful.
            </p>
            <Link href="/about" className="btn btn--line">
              About Concrete <span className="arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className={`section section--ink ${styles.cta}`}>
        <div className="wrap grid">
          <h2 className={`h1 ${styles.ctaTitle}`}>Make room for what you&apos;re learning.</h2>
          <div className={styles.ctaSide}>
            <p className="body">
              Concrete is an experimental Mac app for people who want their notes, study tools, and AI workflow in one
              local-first workspace.
            </p>
            <div className="btn-row">
              <Link href="/download" className="btn btn--solid">
                Get Concrete <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
