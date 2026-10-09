import Link from "next/link";
import { Composition } from "@/components/Composition";
import { Glyph } from "@/components/Glyph";
import { RotatingWord } from "@/components/RotatingWord";
import { CORE, EXTRAS, SITE } from "@/lib/features";
import styles from "./page.module.css";
import { Icon } from "@/components/Icon";
import { BringYourOwnAI } from "@/components/BringYourOwnAI";

const OCCASIONS = ["exam", "interview", "midterm", "deadline", "code review", "final"];

/** Example questions in the style Concrete generates. Real ones come from the student's own material. */
const EXAMPLES = [
  {
    kind: "Code reading · Predict the output",
    course: "CS",
    prompt: "What does this print?",
    code: `def f(n):
    return n if n < 2 else f(n - 1) + f(n - 2)

print([f(i) for i in range(6)])`,
    answer: "[0, 1, 1, 2, 3, 5]",
  },
  {
    kind: "Code reading · Complexity",
    course: "CS",
    prompt: "What is the worst-case running time, and why?",
    code: `for i in range(n):
    j = 1
    while j < n:
        j *= 2`,
    answer: "O(n log n): the inner loop doubles j, so it runs about log n times for each of the n values of i.",
  },
  {
    kind: "Cloze",
    course: "ACME",
    prompt: "A real symmetric matrix always has ____ eigenvalues and an orthonormal basis of eigenvectors.",
    answer: "real",
  },
];

const LOOP = [
  { n: "01", title: "Bring your material.", body: "Lecture notes, PDFs, problem sets. Whatever you already study from.", href: "/material", cta: "Material" },
  { n: "02", title: "Practice it.", body: "Generate quizzes with recall, explanation, and code-reading questions.", href: "/quizzes", cta: "Quizzes" },
  { n: "03", title: "Review the gaps.", body: "See what didn't hold up, and keep it on a spaced schedule until it does.", href: "/flashcards", cta: "Flashcards" },
];

const PRINCIPLES = [
  { k: "Your material", v: "Questions come from your notes and PDFs, not from whatever a model remembers." },
  { k: "No lock-in", v: "Notes are ordinary Markdown files. Your material is never trapped in Concrete." },
  { k: "No new AI bill", v: "Runs on your Claude or ChatGPT plan, or a few cents of OpenRouter usage." },
  { k: "Open source", v: "MIT licensed. Read the code, file an issue, send a patch." },
];

export default function Home() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="wrap">
          <div className={styles.meta}>
            <p className={styles.audience}>
              <span className={styles.audienceText}>Built for students in</span>
              <span className={styles.tag}>CS</span>
              <span className={styles.tag}>ACME</span>
            </p>
            <span className="label">v{SITE.version} · macOS · MIT</span>
          </div>

          <div className={`grid ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <h1 className={`display ${styles.title}`}>
                <span className="visually-hidden">Make your understanding concrete before the exam.</span>
                <span aria-hidden="true">
                  Make your
                  <br />
                  understanding
                  <br />
                  concrete before
                  <br />
                  the <RotatingWord words={OCCASIONS} />
                  <span className={styles.dot}>.</span>
                </span>
              </h1>
              <p className={`lede ${styles.lede}`}>
                Turn your notes into quizzes, code-reading practice, and flashcards. Find the gaps and review them while
                there&apos;s still time. Built for <strong className={styles.strong}>CS and ACME students</strong>, and for engineers who quiz themselves to stay
                sharp.
              </p>
              <div className="btn-row">
                <Link href="/download" className="btn btn--solid">
                  Download for Mac <span className="arrow"><Icon name="arrow" /></span>
                </Link>
                <a href={SITE.github} className="btn btn--line" target="_blank" rel="noreferrer">
                  View on GitHub <span className="arrow"><Icon name="external" /></span>
                </a>
              </div>
              <p className={`label ${styles.reqs}`}>
                macOS · Node 20+ · Runs on the AI subscription you already have
              </p>
            </div>
            <div className={styles.heroArt}>
              <Composition />
            </div>
          </div>
        </div>
      </section>

      {/* ── Built for CS & ACME ────────────────────────── */}
      <section className="section section--chrome">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>Built for CS &amp; ACME</p>
            <div className={styles.headTitle}>
              <h2 className="h2">Practice the way you&apos;ll be tested.</h2>
              <p className={`lede ${styles.headLede}`}>
                Tracing code, reasoning about complexity, and recalling definitions exactly. These are the skills
                technical exams and interviews check.
              </p>
            </div>
          </div>

          <ul className={styles.examples}>
            {EXAMPLES.map((ex) => (
              <li key={ex.kind + ex.course} className={styles.example}>
                <div className={styles.exampleHead}>
                  <span className="label">{ex.kind}</span>
                  <span className={styles.course}>{ex.course}</span>
                </div>
                <p className={styles.examplePrompt}>{ex.prompt}</p>
                {ex.code && <pre className={styles.exampleCode}>{ex.code}</pre>}
                <details className={styles.answer}>
                  <summary>Show answer</summary>
                  <p>{ex.answer}</p>
                </details>
              </li>
            ))}
          </ul>
          <p className={`label ${styles.footnote}`}>Examples. Your questions are generated from your own material.</p>
        </div>
      </section>

      <BringYourOwnAI />

      {/* ── Index ──────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>How you practice</p>
            <h2 className={`h2 ${styles.headTitle}`}>Every tool starts from your material and points you toward what you don&apos;t know yet.</h2>
          </div>

          <ul className={styles.index}>
            {CORE.map((f) => (
              <li key={f.slug}>
                <Link href={`/${f.slug}`} className={styles.row}>
                  <span className={styles.rowNum}>{f.index}</span>
                  <span className={styles.rowName}>{f.name}</span>
                  <span className={styles.rowSummary}>{f.summary}</span>
                  <Glyph name={f.glyph} className={styles.rowGlyph} />
                  <span className={styles.rowArrow} aria-hidden="true">
                    <Icon name="arrow" />
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <div className={styles.extras}>
            <span className="label">Also in Concrete</span>
            {EXTRAS.map((f) => (
              <Link key={f.slug} href={`/${f.slug}`} className={styles.extraLink}>
                <b>{f.name}</b> {f.summary} <Icon name="arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── The loop ───────────────────────────────────── */}
      <section className="section section--ink">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>The loop</p>
            <div className={styles.headTitle}>
              <h2 className="h2">Bring it. Practice it. Review it.</h2>
              <p className={`lede ${styles.loopLede}`}>
                You bring the course material. Concrete turns it into practice and shows you where to spend your next
                hour.
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
                  {l.cta} <Icon name="arrow" />
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
            <h2 className={`h2 ${styles.headTitle}`}>Your material, your AI, no lock-in.</h2>
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

      {/* ── Why Concrete ───────────────────────────────── */}
      <section className="section">
        <div className="wrap grid">
          <div className={styles.markArt}>
            <img src="/brand/square-boxy-crop.svg" alt="The Concrete mark" width={218} height={274} />
          </div>
          <div className={styles.markCopy}>
            <p className="label">Why Concrete</p>
            <h2 className="h2">A concrete example. A concrete understanding.</h2>
            <p className="body">
              The name comes from summers spent pouring concrete, and from a word that stuck: understanding you can
              stand on.
            </p>
            <Link href="/about" className="btn btn--line">
              About Concrete <span className="arrow"><Icon name="arrow" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className={`section section--ink ${styles.cta}`}>
        <div className="wrap grid">
          <h2 className={`h1 ${styles.ctaTitle}`}>Know what you actually know.</h2>
          <div className={styles.ctaSide}>
            <p className="body">
              Concrete is an experimental, open-source Mac app. Bring your course material, practice it, and review what
              didn&apos;t stick.
            </p>
            <div className="btn-row">
              <Link href="/download" className="btn btn--solid">
                Get Concrete <span className="arrow"><Icon name="arrow" /></span>
              </Link>
              <Link href="/contribute" className="btn btn--line">
                Contribute <span className="arrow"><Icon name="arrow" /></span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
