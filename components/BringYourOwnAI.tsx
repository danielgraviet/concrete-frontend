import styles from "./BringYourOwnAI.module.css";

const OPTIONS = [
  {
    name: "Claude Code",
    plan: "Your Claude Pro or Max plan",
    body: "Log in to the Claude Code CLI once. Concrete uses that login. No API key or extra billing.",
  },
  {
    name: "Codex",
    plan: "Your ChatGPT plan",
    body: "Log in to the Codex CLI with the ChatGPT account you already pay for, and Concrete puts it to work.",
  },
  {
    name: "OpenRouter",
    plan: "Pay per use, often pennies",
    body: "No subscription at all. Add an OpenRouter key and pick a fast, cheap model for quizzes and tutoring.",
  },
];

/** The "no new AI bill" pitch: bring an existing subscription, or OpenRouter for pennies. */
export function BringYourOwnAI({ label = "Bring your own AI" }: { label?: string }) {
  return (
    <section className="section section--ink">
      <div className="wrap">
        <div className={`grid ${styles.head}`}>
          <p className={`label ${styles.headLabel}`}>{label}</p>
          <div className={styles.headTitle}>
            <h2 className="h2">No new AI bill.</h2>
            <p className={`lede ${styles.lede}`}>
              Concrete doesn&apos;t sell AI credits. Bring the subscription you already pay for and put it to work on
              your studying.
            </p>
          </div>
        </div>

        <ul className={styles.options}>
          {OPTIONS.map((o, i) => (
            <li key={o.name} className={styles.option}>
              <span className="index">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="h3">{o.name}</h3>
              <p className={styles.plan}>{o.plan}</p>
              <p className="body">{o.body}</p>
            </li>
          ))}
        </ul>

        <figure className={styles.quote}>
          <p className="label">Creator&apos;s pick · DeepSeek V4 Flash on OpenRouter</p>
          <blockquote>
            &ldquo;After a month of heavy use, more than 50 quizzes, DeepSeek V4 Flash cost me about five
            cents.&rdquo;
          </blockquote>
          <figcaption>
            <b>Daniel Graviet</b>
            <span>Creator of Concrete</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
