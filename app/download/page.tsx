import type { Metadata } from "next";
import { CodeLine } from "@/components/CodeLine";
import { SITE } from "@/lib/features";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Download",
  description: "Install Concrete on macOS. Requires Node.js 20 or newer.",
};

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
              <dt className="label">AI (optional)</dt>
              <dd>Claude Code, Codex, or OpenRouter</dd>
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
                Open an issue on GitHub ↗
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap grid">
          <div className={styles.side}>
            <p className="label">AI features</p>
            <h2 className="h2">Connect a model.</h2>
          </div>
          <div className={styles.side2}>
            <p className="lede">
              Quiz generation, tutoring, and agents need a model backend. Pick one under Settings → Tutor AI.
            </p>
            <ul className={styles.providers}>
              <li>
                <b>Claude Code CLI</b>
                <span>Logged in (Claude Pro/Max) or with an Anthropic API key</span>
              </li>
              <li>
                <b>Codex CLI</b>
                <span>Logged in (ChatGPT plan) or with an OpenAI API key</span>
              </li>
              <li>
                <b>OpenRouter</b>
                <span>API key. Quizzes and tutoring only</span>
              </li>
            </ul>
            <p className="body">Keys stay in Electron&apos;s main process and never reach the renderer.</p>
          </div>
        </div>
      </section>
    </>
  );
}
