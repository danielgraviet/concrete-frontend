"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CORE } from "@/lib/features";
import { CONCRETE_APP_URL } from "@/lib/app-url";
import styles from "./SiteHeader.module.css";

export function SiteHeader() {
  const pathname = usePathname();
  // The menu is open for one pathname only, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className={styles.header}>
        <div className={`wrap ${styles.bar}`}>
          <Link href="/" className={styles.brand} aria-label="Concrete home">
            <img src="/brand/triple-c-crop.svg" alt="" width={46} height={31} className={styles.mark} />
            <span className={styles.word}>Concrete</span>
          </Link>

          <nav className={styles.nav} aria-label="Features">
            {CORE.map((f) => {
              const active = pathname === `/${f.slug}`;
              return (
                <Link
                  key={f.slug}
                  href={`/${f.slug}`}
                  className={`${styles.link} ${active ? styles.active : ""}`}
                  aria-current={active ? "page" : undefined}
                >
                  {f.name}
                </Link>
              );
            })}
          </nav>

          <div className={styles.end}>
            <Link href="/about" className={`${styles.link} ${styles.about} ${pathname === "/about" ? styles.active : ""}`}>
              About
            </Link>
            <a href={CONCRETE_APP_URL} className={styles.cta}>
              Open Concrete
            </a>
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={open}
              aria-controls="site-menu"
              onClick={() => setOpen(!open)}
            >
              <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
              <span className={`${styles.burger} ${open ? styles.burgerOpen : ""}`} aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      {/* Outside <header>: its backdrop-filter would otherwise become the containing block
          for this fixed overlay, clipping it to the header height (notably on iOS Safari). */}
      <div id="site-menu" className={`${styles.menu} ${open ? styles.menuOpen : ""}`} hidden={!open}>
        <div className="wrap">
          <ul className={styles.menuList}>
            {CORE.map((f) => (
              <li key={f.slug}>
                <Link href={`/${f.slug}`} className={styles.menuItem}>
                  <span className={styles.menuName}>{f.name}</span>
                </Link>
              </li>
            ))}
            <li><Link href="/about" className={styles.menuItem}><span className={styles.menuName}>About</span></Link></li>
          </ul>
        </div>
      </div>
    </>
  );
}
