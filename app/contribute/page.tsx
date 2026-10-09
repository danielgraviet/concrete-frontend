import type { Metadata } from "next";
import { CodeLine } from "@/components/CodeLine";
import { Icon } from "@/components/Icon";
import { SITE } from "@/lib/features";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Concrete is open source and built together. Review code, ship features students use, and work on open problems: cloud sync, sharing, model evals, LLM-as-judge grading, and learning as an RL problem.",
};

const WHY = [
  {
    title: "Real code review",
    body: "Every pull request is reviewed, and you review other people's too. It's how the codebase stays solid and how everyone gets better.",
  },
  {
    title: "A concrete project to point to",
    body: "Ship features that real students use. Link your merged pull requests on a resume or walk through them in an interview.",
  },
  {
    title: "Hard problems, still open",
    body: "Not just bug fixes. Sync, collaboration, model evaluation, and learning science are all open questions here.",
  },
];

const CHALLENGES = [
  {
    area: "Systems",
    title: "Cloud support",
    body: "Take notes, quizzes, and progress beyond one Mac: accounts, sync across devices, and conflict handling for plain Markdown files.",
  },
  {
    area: "Product · Systems",
    title: "Sharing and collaboration",
    body: "Let a study group share a course's notes, quiz banks, and flashcard decks, and work on them together.",
  },
  {
    area: "Evals",
    title: "The best model for tutoring and quizzing",
    body: "Build evals that compare models on question accuracy, difficulty, grounding, and cost, then pick sensible defaults with evidence.",
  },
  {
    area: "ML",
    title: "LLM as judge",
    body: "Grade open-response and explain-it-back answers reliably against key points, and measure how often the grader agrees with a human.",
  },
  {
    area: "Research",
    title: "Learning as an RL problem",
    body: "Treat learning as a partially observed control problem: choose what to show next, when to review, and how hard to make it, rewarded by delayed retention rather than short-term accuracy.",
    href: SITE.learningVision,
    cta: "Read the vision doc",
  },
  {
    area: "Performance",
    title: "Faster quiz generation",
    body: "Cut the wait between choosing your material and answering the first question, without lowering question quality.",
    href: "https://github.com/danielgraviet/concrete/issues/46",
    cta: "Issue #46",
  },
];

const STEPS = [
  { title: "Pick an issue", body: "Browse the open issues, or open one describing your bug or idea before starting a larger change." },
  { title: "Branch", body: "Fork the repo and create a focused branch with your initials, like dg/fix-agent-workflow." },
  { title: "Build and test", body: "Make your change and check it locally with npm run build." },
  { title: "Open a pull request", body: "Explain what changed, why it helps learners, and how you tested it. Then it goes through review." },
];

export default function ContributePage() {
  const { stats } = SITE;
  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="wrap grid">
          <p className={`label ${styles.full}`}>Contribute</p>
          <h1 className={`display ${styles.full}`}>
            Build it with us<span className={styles.dot}>.</span>
          </h1>
          <p className={`lede ${styles.lede}`}>
            Concrete is open source and built in the open by students and engineers. Every change is reviewed, every
            decision is on GitHub, and there&apos;s room for you on the team.
          </p>
          <dl className={styles.stats}>
            {[
              { k: "Contributors", v: stats.contributors },
              { k: "Stars", v: stats.stars },
              { k: "Forks", v: stats.forks },
              { k: "License", v: "MIT" },
            ].map((s) => (
              <div key={s.k}>
                <dd>{s.v}</dd>
                <dt className="label">{s.k}</dt>
              </div>
            ))}
          </dl>
          <div className={`btn-row ${styles.full}`}>
            <a href={SITE.openIssues} className="btn btn--solid" target="_blank" rel="noreferrer">
              Browse open issues <span className="arrow"><Icon name="external" /></span>
            </a>
            <a href={SITE.github} className="btn btn--line" target="_blank" rel="noreferrer">
              Star on GitHub <span className="arrow"><Icon name="external" /></span>
            </a>
          </div>
        </div>
      </section>

      {/* ── Why ────────────────────────────────────────── */}
      <section className="section section--chrome">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>Why contribute</p>
            <h2 className={`h2 ${styles.headTitle}`}>A collective effort, not a black box.</h2>
          </div>
          <ol className={styles.why}>
            {WHY.map((w, i) => (
              <li key={w.title}>
                <span className={styles.bigNum}>{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{w.title}</h3>
                <p className="body">{w.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Open problems ──────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>Open problems</p>
            <div className={styles.headTitle}>
              <h2 className="h2">Technical challenges worth your time.</h2>
              <p className={`lede ${styles.headLede}`}>
                Pick one that excites you. Open an issue to talk it through before you start.
              </p>
            </div>
          </div>
          <ul className={styles.challenges}>
            {CHALLENGES.map((c) => (
              <li key={c.title} className={styles.challenge}>
                <span className={styles.area}>{c.area}</span>
                <h3 className="h3">{c.title}</h3>
                <p className="body">{c.body}</p>
                <a href={c.href ?? SITE.issues} target="_blank" rel="noreferrer" className={styles.challengeLink}>
                  {c.cta ?? "Start the discussion"} <Icon name="external" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── How to start ───────────────────────────────── */}
      <section className="section section--chrome">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>How to start</p>
            <div className={styles.headTitle}>
              <h2 className="h2">From fork to merged.</h2>
              <p className={`lede ${styles.headLede}`}>
                You don&apos;t need to be an expert in Electron or AI. Documentation, bug reports, UI polish, and testing
                all count.
              </p>
            </div>
          </div>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title}>
                <span className="index">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="h3">{s.title}</h3>
                <p className="body">{s.body}</p>
              </li>
            ))}
          </ol>
          <div className={styles.clone}>
            <CodeLine code="git clone https://github.com/danielgraviet/concrete.git && cd concrete && npm install" />
          </div>
          <p className={styles.links}>
            <a href={SITE.goodFirstIssues} target="_blank" rel="noreferrer">
              Good first issues <Icon name="external" />
            </a>
            <a href={SITE.contributing} target="_blank" rel="noreferrer">
              Contributing guide <Icon name="external" />
            </a>
          </p>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────── */}
      <section className="section section--ink">
        <div className={`wrap grid ${styles.cta}`}>
          <h2 className={`h1 ${styles.ctaTitle}`}>Pick a problem. Open a PR.</h2>
          <div className={styles.ctaSide}>
            <p className="body">
              Start small or start ambitious. Either way, you&apos;ll have a concrete project to point to, and a team that
              reviews your work.
            </p>
            <div className="btn-row">
              <a href={SITE.openIssues} className="btn btn--solid" target="_blank" rel="noreferrer">
                Open issues <span className="arrow"><Icon name="external" /></span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
