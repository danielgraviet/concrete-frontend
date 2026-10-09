"use client";

import { useEffect, useState } from "react";
import styles from "./RotatingWord.module.css";

/**
 * Cycles through `words` in place. Screen readers get the first word only
 * (via the parent's static text); the animated span is aria-hidden.
 */
export function RotatingWord({ words, interval = 2200 }: { words: string[]; interval?: number }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => setI((n) => (n + 1) % words.length), interval);
    return () => window.clearInterval(id);
  }, [words.length, interval]);

  return (
    <span className={styles.slot} aria-hidden="true">
      <span key={i} className={styles.word}>
        {words[i]}
      </span>
    </span>
  );
}
