import Link from "next/link";
import { CORE, SITE } from "@/lib/features";
import { CONCRETE_APP_URL } from "@/lib/app-url";
import styles from "./SiteFooter.module.css";
import { Icon } from "@/components/Icon";

export function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className="wrap">
        <div className={`grid ${styles.top}`}>
          <div className={styles.logoCol}>
            <img src="/brand/full-text-blocks.png" alt="Concrete" className={styles.logo} width={528} height={270} />
          </div>

          <div className={styles.col}>
            <p className="label">Practice</p>
            <ul>
              {CORE.map((f) => (
                <li key={f.slug}>
                  <Link href={`/${f.slug}`}>
                    {f.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.col}>
            <p className="label">Concrete</p>
            <ul>
              <li><a href={CONCRETE_APP_URL}>Open Concrete</a></li>
              <li><Link href="/about">About</Link></li>
              <li>
                <Link href="/student-access">Student access</Link>
              </li>
              <li>
                <a href={SITE.issues} target="_blank" rel="noreferrer">
                  Report a bug <Icon name="external" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles.bottom}>
          <span>Concrete</span>
        </div>
      </div>
    </footer>
  );
}
