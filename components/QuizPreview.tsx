"use client";

import Image from "next/image";
import { useState } from "react";
import { Icon } from "./Icon";
import styles from "./QuizPreview.module.css";

const SOURCES = [
  { name: "PDF", icon: "pdf.svg", status: "Ready to use", instruction: "Upload a PDF to make a quiz." },
  { name: "PowerPoint", icon: "powerpoint.svg", status: "Via PDF", instruction: "Export your PowerPoint deck to PDF, then upload it." },
  { name: "Markdown", icon: "markdown.svg", status: "Ready to use", instruction: "Start from a Markdown note in Concrete." },
  { name: "Google Docs", icon: "google-docs.png", status: "Via PDF", instruction: "Export your Google Doc to PDF, then upload it." },
  { name: "Google Slides", icon: "google-slides.png", status: "Via PDF", instruction: "Export your Google Slides deck to PDF, then upload it." },
  { name: "Word", icon: "word.svg", status: "Via PDF", instruction: "Export your Word document to PDF, then upload it." },
  { name: "Excel", icon: "excel.svg", status: "Unsupported", instruction: "Excel workbooks aren't supported yet." },
  { name: "Audio", icon: "audio.svg", status: "Unsupported", instruction: "Audio uploads aren't supported yet. You can paste a transcript into a note." },
];

const ANSWERS = [
  "To state the main argument",
  "To list every supporting detail",
  "To summarize the conclusion",
];

export function QuizPreview() {
  const [activeSource, setActiveSource] = useState(0);
  const [answer, setAnswer] = useState<number | null>(null);

  return (
    <section className={styles.preview} aria-label="Interactive quiz preview">
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
            <small>{source.status}</small>
          </button>
        ))}
      </div>
      <p className={styles.instruction} aria-live="polite">{SOURCES[activeSource].instruction}</p>
      <div className={styles.connector} aria-hidden="true"><Icon name="arrow" /></div>
      <div className={styles.quiz}>
        <p className="label">Sample quiz</p>
        <h2>What is the main purpose of a thesis statement?</h2>
        <div className={styles.answers} role="group" aria-label="Choose an answer">
          {ANSWERS.map((option, index) => (
            <button
              key={option}
              type="button"
              aria-pressed={answer === index}
              data-result={answer === index ? index === 0 ? "correct" : "incorrect" : undefined}
              onClick={() => setAnswer(index)}
            >
              <span aria-hidden="true">{String.fromCharCode(65 + index)}</span>
              {option}
            </button>
          ))}
        </div>
        <p className={styles.feedback} role="status">
          {answer === null ? "Pick an answer to try it." : answer === 0
            ? "Correct. A thesis states the main argument the rest of the essay supports."
            : "Try again. Think about what the whole essay sets out to show."}
        </p>
      </div>
    </section>
  );
}
