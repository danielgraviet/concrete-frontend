import { Icon } from "@/components/Icon";
import { QuizPreview } from "@/components/QuizPreview";
import { TryIt } from "@/components/TryIt";
import { CONCRETE_APP_URL } from "@/lib/app-url";
import styles from "./page.module.css";

const PROGRESS_EXAMPLE = [
  { day: "Mon", score: 40 },
  { day: "Wed", score: 60 },
  { day: "Fri", score: 90 },
];

export default function Home() {
  return (
    <>
      <section className={styles.hero}>
        <div className={`wrap ${styles.heroGrid}`}>
          <div>
            <h1 className={`display ${styles.title}`}>
              Turn your notes into quizzes<span>.</span>
            </h1>
            <p className="lede">
              Make a practice quiz from your class notes or PDFs. Whatever you’re studying, see what you remember and what to review.
            </p>
            <div className="btn-row">
              <a href={CONCRETE_APP_URL} className="btn btn--solid">
                Make a quiz <span className="arrow"><Icon name="arrow" /></span>
              </a>
              <a href="#try-it" className={styles.textLink}>Try it free</a>
            </div>
          </div>
          <QuizPreview />
        </div>
      </section>

      <section className={`section ${styles.progress}`} aria-labelledby="progress-heading">
        <div className={`wrap ${styles.progressGrid}`}>
          <div>
            <h2 className="h2" id="progress-heading">See what’s getting stronger.</h2>
            <p className={`lede ${styles.progressLede}`}>
              Concrete saves your quiz results and breaks them down by skill. See where you’re losing points, focus your review there, and check your next score to see what stuck.
            </p>
          </div>

          <figure className={styles.progressChart}>
            <figcaption className={styles.chartCaption}>
              <div>
                <p className="label">Sample skill history</p>
                <p className={styles.chartSkill}>Claims and evidence</p>
              </div>
              <span className={styles.chartGain}>+50 pts</span>
            </figcaption>
            <ol className={styles.attempts} aria-label="Quiz scores by day">
              {PROGRESS_EXAMPLE.map(({ day, score }) => (
                <li className={styles.attempt} key={day}>
                  <div className={styles.barTrack}>
                    <div className={styles.bar} style={{ height: `${score}%` }}>
                      <span>{score}%</span>
                    </div>
                  </div>
                  <span>{day}</span>
                </li>
              ))}
            </ol>
            <p className={styles.chartNote}>Monday’s quiz flagged this skill for review. By Friday, the score rose from 40% to 90%.</p>
          </figure>
        </div>
      </section>

      <section id="try-it" className={`section section--chrome ${styles.workflow}`}>
        <div className="wrap">
          <h2 className="h2">Try it on your own notes</h2>
          <p className={`lede ${styles.tryLede}`}>
            Paste your notes and get a quick quiz made the same way Concrete makes them. You get one free quiz, saved to your new account.
          </p>
          <TryIt />
        </div>
      </section>

      <section className={`section section--ink ${styles.cta}`}>
        <div className={`wrap ${styles.ctaRow}`}>
          <h2 className="h2">Ready to test yourself?</h2>
          <a href={CONCRETE_APP_URL} className="btn btn--solid">
            Make a quiz <span className="arrow"><Icon name="arrow" /></span>
          </a>
        </div>
      </section>
    </>
  );
}
