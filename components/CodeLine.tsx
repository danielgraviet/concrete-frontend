"use client";

import { useState } from "react";
import styles from "./CodeLine.module.css";

export function CodeLine({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard can be unavailable (insecure context); the text is still selectable.
    }
  }

  return (
    <div className={styles.line}>
      <pre className={styles.code}>
        <span className={styles.prompt} aria-hidden="true">
          $
        </span>
        {code}
      </pre>
      <button type="button" className={styles.copy} onClick={copy} aria-label="Copy command">
        {copied ? "Copied" : "Copy"}
      </button>
    </div>
  );
}
