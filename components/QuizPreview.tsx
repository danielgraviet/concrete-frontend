"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Icon } from "./Icon";
import { PREVIEW_QUESTIONS } from "./quizPreviewQuestions";
import styles from "./QuizPreview.module.css";

const SOURCES = [
  { name: "PDF", icon: "pdf.svg" },
  { name: "PowerPoint", icon: "powerpoint.svg" },
  { name: "Markdown", icon: "markdown.svg" },
  { name: "Google Docs", icon: "google-docs.png" },
  { name: "Google Slides", icon: "google-slides.png" },
  { name: "Word", icon: "word.svg" },
  { name: "Excel", icon: "excel.svg" },
  { name: "Audio", icon: "audio.svg" },
];

const SHUFFLE_DELAY_MS = 4000;
const REVEAL_DELAY_MS = 900;

export function QuizPreview() {
  const [activeSource, setActiveSource] = useState(0);
  const [frontQuiz, setFrontQuiz] = useState<number | null>(null);
  const [revealedQuiz, setRevealedQuiz] = useState<number | null>(null);
  const visibleQuiz = frontQuiz ?? 0;
  const backQuiz = frontQuiz === null
    ? 1
    : (frontQuiz + PREVIEW_QUESTIONS.length - 1) % PREVIEW_QUESTIONS.length;

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!document.hidden) {
        setFrontQuiz(previous => ((previous ?? 0) + 1) % PREVIEW_QUESTIONS.length);
      }
    }, SHUFFLE_DELAY_MS);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealedQuiz(visibleQuiz), REVEAL_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [visibleQuiz]);

  return (
    <section className={styles.preview} aria-label="Quiz comparison preview">
      <p className={`label ${styles.sourceLabel}`}>Choose a format</p>
      <div className={styles.sources} role="group" aria-label="Pick a source format">
        {SOURCES.map((source, index) => (
          <button
            key={source.name}
            type="button"
            aria-pressed={activeSource === index}
            className={styles.source}
            onClick={() => setActiveSource(index)}
          >
            <Image src={`/formats/${source.icon}`} alt="" width={28} height={28} unoptimized className={styles.file} />
            <span>{source.name}</span>
          </button>
        ))}
      </div>
      <div className={styles.connector} aria-hidden="true"><Icon name="arrow" /></div>
      <div className={styles.deck} data-shuffled={frontQuiz !== null}>
        {PREVIEW_QUESTIONS.map((quiz, index) => {
          const isFront = visibleQuiz === index;
          const isConcrete = index % 2 === 1;
          const revealed = revealedQuiz === index;

          return (
            <article
              key={quiz.prompt}
              className={styles.quiz}
              data-front={isFront}
              data-concrete={isConcrete}
              data-in-stack={isFront || backQuiz === index}
              aria-hidden={!isFront}
              inert={!isFront}
            >
              <p className={`label ${styles.quizLabel}`}>
                {isConcrete ? "Concrete quiz" : "Generic AI quiz"} · {quiz.subject}
              </p>
              <h2>{quiz.prompt}</h2>
              {quiz.kind === "choice" && (
                <ol className={styles.answers} aria-label="Answer choices">
                  {quiz.options.map((option, optionIndex) => (
                    <li key={option} data-correct={revealed && quiz.correct === optionIndex}>
                      <span aria-hidden="true">{String.fromCharCode(65 + optionIndex)}</span>
                      {option}
                    </li>
                  ))}
                </ol>
              )}
              {quiz.kind === "cloze" && (
                <p className={styles.sample}>
                  <strong>Answer</strong> · {revealed ? `$${quiz.solution}` : "____"}
                </p>
              )}
              {quiz.kind === "open" && (
                <p className={styles.sample}><strong>Sample response</strong> · {quiz.response}</p>
              )}
              <div className={styles.feedback} data-revealed={revealed}>
                <p className={styles.sticker}>{quiz.sticker}</p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
