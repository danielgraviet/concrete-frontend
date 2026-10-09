import Link from "next/link";
import { FEATURES, SITE } from "@/lib/features";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={`grid ${styles.top}`}>
          <div className={styles.logoCol}>
            <img src="/brand/full-text-blocks.png" alt="Concrete" className={styles.logo} width={528} height={270} />
          </div>

          <div className={styles.col}>
            <p className="label">Features</p>
            <ul>
              {FEATURES.map((f) => (
                <li key={f.slug}>
                  <Link href={`/${f.slug}`}>
                    <span className={styles.num}>{f.index}</span>
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <p className="label">Concrete</p>
            <ul>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/download">Download</Link>
              </li>
              <li>
                <a href={SITE.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </li>
              <li>
                <a href={SITE.issues} target="_blank" rel="noreferrer">
                  Report a bug ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>Concrete — {SITE.tagline}</span>
          <span className="mono">v{SITE.version} · macOS · MIT</span>
        </div>
      </div>
    </footer>
  );
}
