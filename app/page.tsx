import { Icon } from "@/components/Icon";
import { QuizPreview } from "@/components/QuizPreview";
import { CONCRETE_APP_URL } from "@/lib/app-url";
import styles from "./page.module.css";

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
              <a href="#how-it-works" className={styles.textLink}>How it works</a>
            </div>
          </div>
          <QuizPreview />
        </div>
      </section>

      <section id="how-it-works" className={`section section--chrome ${styles.workflow}`}>
        <div className="wrap">
          <h2 className="h2">How it works</h2>
          <ol className={styles.steps}>
            <li>
              <h3 className="h3">Bring your material</h3>
              <p className="body">Use a Markdown note or upload a PDF. Export slides and documents to PDF first.</p>
            </li>
            <li>
              <h3 className="h3">Make a quiz</h3>
              <p className="body">Choose your material and the kinds of questions you want to practice.</p>
            </li>
            <li>
              <h3 className="h3">Check your answers</h3>
              <p className="body">Take the quiz, see how you did, and turn missed questions into flashcards.</p>
            </li>
          </ol>
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
