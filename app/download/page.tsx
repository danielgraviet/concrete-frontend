import type { Metadata } from "next";
import { SITE } from "@/lib/features";
import styles from "./page.module.css";
import { Icon } from "@/components/Icon";
import { BringYourOwnAI } from "@/components/BringYourOwnAI";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Download",
  description: "Download Concrete for Mac. Runs on the AI subscription you already have.",
  path: "/download",
});

const STEPS = [
  { title: "Download", note: "Click the button above. The .dmg lands in your Downloads folder." },
  { title: "Install", note: "Open the .dmg and drag Concrete into Applications." },
  {
    title: "Open it",
    note: "macOS may warn that Concrete is from an unidentified developer. Right-click the app, choose Open, then confirm.",
  },
];

const FIRST_QUIZ = [
  {
    title: "Connect a model",
    body: "Open Settings › Tutor AI. Pick Claude Code or Codex to use the subscription you already pay for, or paste an OpenRouter key.",
  },
  {
    title: "Add your material",
    body: "Put lecture notes or PDFs in your vault at ~/Documents/Concrete. One folder per course works well.",
  },
  {
    title: "Generate a quiz",
    body: "Open a note and use the quiz controls. Add more notes, or a PDF page range, as sources.",
  },
];

const TROUBLE = [
  {
    q: "“Concrete can’t be opened because it is from an unidentified developer”",
    a: "Right-click (or Control-click) the app in Applications and choose Open, then confirm in the dialog. You only need to do this once.",
  },
  { q: "The app won’t open at all", a: "Make sure you dragged Concrete into Applications before opening it, not running it straight from the mounted .dmg." },
];

export default function DownloadPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="wrap grid">
          <p className={`label ${styles.kicker}`}>Download · v{SITE.version}</p>
          <h1 className={`display ${styles.title}`}>Get Concrete.</h1>
          <p className={`lede ${styles.lede}`}>
            Concrete is a free, open-source Mac app. Download it, drag it into Applications, and start practicing.
          </p>
          <div className={styles.downloadBox}>
            <div className="btn-row">
              <a href={SITE.dmgUrl} className="btn btn--solid">
                Download <span className="arrow"><Icon name="arrow" /></span>
              </a>
            </div>
            <p className="label">For Mac · Apple Silicon</p>
          </div>
        </div>
      </section>

      <section className="section section--chrome">
        <div className="wrap">
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title} className={`grid ${styles.step}`}>
                <span className={styles.num}>{i + 1}</span>
                <div className={styles.stepText}>
                  <h2 className="h3">{s.title}</h2>
                  {s.note && <p className="body">{s.note}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap grid">
          <div className={styles.side}>
            <p className="label">Open source</p>
            <h2 className="h2">Concrete&apos;s source is public. Help build it.</h2>
          </div>
          <div className={styles.side2}>
            <p className="lede">
              Concrete is built by {SITE.stats.contributors} contributors who review each other&apos;s code. Pick an open
              problem, from cloud sync to LLM-as-judge grading, and ship something you can point to.
            </p>
            <div className="btn-row">
              <Link href="/contribute" className="btn btn--solid">
                Start contributing <span className="arrow"><Icon name="arrow" /></span>
              </Link>
              <a href={SITE.github} className="btn btn--line" target="_blank" rel="noreferrer">
                Star on GitHub <span className="arrow"><Icon name="external" /></span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.firstHead}`}>
            <div className={styles.side}>
              <p className="label">Then</p>
              <h2 className="h2">Your first quiz.</h2>
            </div>
            <p className={`lede ${styles.side2}`}>
              Once the window is open, three steps get you from an empty vault to real practice.
            </p>
          </div>
          <ol className={styles.first}>
            {FIRST_QUIZ.map((s, i) => (
              <li key={s.title}>
                <span className="index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="body">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap grid">
          <div className={styles.side}>
            <p className="label">Troubleshooting</p>
            <h2 className="h2">If something&apos;s off.</h2>
          </div>
          <div className={styles.faq}>
            {TROUBLE.map((t) => (
              <details key={t.q} className={styles.item}>
                <summary>
                  <span className="mono">{t.q}</span>
                  <span className={styles.plus} aria-hidden="true" />
                </summary>
                <p className="body">{t.a}</p>
              </details>
            ))}
            <p className={`body ${styles.more}`}>
              Still stuck?{" "}
              <a href={SITE.issues} target="_blank" rel="noreferrer">
                Open an issue on GitHub <Icon name="external" />
              </a>
            </p>
          </div>
        </div>
      </section>

      <BringYourOwnAI label="AI features" />
    </>
  );
}
