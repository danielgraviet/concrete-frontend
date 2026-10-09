import type { Metadata } from "next";
import { CodeLine } from "@/components/CodeLine";
import { SITE } from "@/lib/features";
import styles from "./page.module.css";
import { Icon } from "@/components/Icon";
import { BringYourOwnAI } from "@/components/BringYourOwnAI";
import Link from "next/link";
import { pageMetadata } from "@/lib/metadata";

export const metadata: Metadata = pageMetadata({
  title: "Download",
  description:
    "Install Concrete on macOS in about five minutes. Runs on the AI subscription you already have.",
  path: "/download",
});

const STEPS: { title: string; note?: string; code: string[] }[] = [
  {
    title: "Install Homebrew",
    note: "The macOS package manager. It will ask for your password; nothing shows as you type. Already have it? Skip ahead.",
    code: [
      '/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"',
      "echo 'eval \"$(/opt/homebrew/bin/brew shellenv)\"' >> ~/.zprofile && eval \"$(/opt/homebrew/bin/brew shellenv)\"",
    ],
  },
  {
    title: "Install Node.js",
    note: "Concrete needs Node 20 or newer. npm comes with it.",
    code: ["brew install node"],
  },
  {
    title: "Download Concrete",
    note: "If macOS asks to install the Command Line Developer Tools for git, click Install, then run this again.",
    code: ["git clone https://github.com/danielgraviet/concrete.git && cd concrete"],
  },
  {
    title: "Install dependencies",
    note: "npm warn lines are fine.",
    code: ["npm install"],
  },
  {
    title: "Launch",
    note: "The Concrete window opens and creates your vault in ~/Documents/Concrete on first launch. Quit with ⌘Q.",
    code: ["npm run dev"],
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
  { q: "brew: command not found", a: "Run the PATH command from step 1, or open a new Terminal window." },
  { q: "Node is older than 20", a: "Run brew upgrade node." },
  { q: "The window never appears", a: "Make sure nothing else is using port 5173, then run npm run dev again." },
  { q: "npm install permission errors", a: "Don't use sudo. Delete node_modules and run npm install again." },
];

export default function DownloadPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="wrap grid">
          <p className={`label ${styles.kicker}`}>Download · v{SITE.version}</p>
          <h1 className={`display ${styles.title}`}>Get Concrete.</h1>
          <p className={`lede ${styles.lede}`}>
            Concrete is an experimental desktop app for macOS. Install it from source in about five minutes. Open
            Terminal (⌘ Space, type “Terminal”) and run each step.
          </p>
          <dl className={styles.req}>
            <div>
              <dt className="label">Platform</dt>
              <dd>macOS</dd>
            </div>
            <div>
              <dt className="label">Runtime</dt>
              <dd>Node.js 20+</dd>
            </div>
            <div>
              <dt className="label">For quizzes + tutor</dt>
              <dd>Your Claude or ChatGPT plan, or an OpenRouter key</dd>
            </div>
          </dl>
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
                <div className={styles.stepCode}>
                  {s.code.map((c) => (
                    <CodeLine key={c} code={c} />
                  ))}
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
            <h2 className="h2">You just cloned the source. Help build it.</h2>
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
            <p className="label">Later</p>
            <h2 className="h2">Open it again.</h2>
            <p className="body">From then on, this is all you need.</p>
            <CodeLine code="cd concrete && npm run dev" />
          </div>
          <div className={styles.side2}>
            <p className="label">Package</p>
            <h2 className="h2">Build the app.</h2>
            <p className="body">The packaged app is written to release/.</p>
            <CodeLine code="npm run build && npm run pack:mac" />
          </div>
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
