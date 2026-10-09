import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/features";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Summers pouring concrete in the Treasure Valley, a word that stuck, and the product it was waiting for.",
};

const PHOTOS = [
  {
    n: "01",
    slot: "wide",
    src: "/media/bailey-construction-team.webp",
    alt: "Four members of the crew standing in front of a work truck and equipment trailer at dawn",
    caption: "The crew, early morning, before a pour.",
    sizes: "(max-width: 900px) 100vw, 66vw",
  },
  {
    n: "02",
    slot: "tall",
    src: "/media/first-patio.webp",
    alt: "A freshly poured concrete patio still in its wooden forms, with tools scattered on the grass",
    caption: "My first patio, forms still on.",
    sizes: "(max-width: 900px) 100vw, 33vw",
  },
  {
    n: "03",
    slot: "half",
    src: "/media/concrete-cole-backyard.webp",
    alt: "Two workers screeding wet concrete under a covered backyard patio",
    caption: "Screeding a backyard patio with Cole.",
    sizes: "(max-width: 900px) 100vw, 50vw",
  },
  {
    n: "04",
    slot: "half",
    src: "/media/boise-house-concrete-driveway.webp",
    alt: "A newly finished concrete driveway and walkway in front of a white house",
    caption: "A finished driveway in Boise.",
    sizes: "(max-width: 900px) 100vw, 50vw",
  },
] as const;

const POUR = [
  { step: "Set the forms", body: "Give the material a shape. Notes, folders, and links.", feature: "Notes", href: "/notes" },
  { step: "Place it", body: "Work the material in. Quizzes pull it out of your head and back onto the page.", feature: "Quizzes", href: "/quizzes" },
  { step: "Finish it", body: "Smooth the rough spots. Ask the tutor until the explanation holds.", feature: "Tutor", href: "/tutor" },
  { step: "Let it cure", body: "Strength comes with time. Spaced review keeps it setting.", feature: "Review", href: "/review" },
];

const MARKS = [
  { src: "/brand/triple-c-crop.svg", name: "Triple C", use: "Favicon and app icon" },
  { src: "/brand/square-boxy-crop.svg", name: "Square", use: "Primary lock-up" },
  { src: "/brand/cinderblock-crop.svg", name: "Cinderblock", use: "Wide lock-up" },
  { src: "/brand/full-text-blocks.png", name: "Blocks", use: "Wordmark as modules" },
];

/** Square → halves → quarters → system, drawn as four panels. */
function Construction() {
  const ink = "var(--mark)";
  return (
    <ol className={styles.construct}>
      <li>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <rect width="100" height="100" fill={ink} />
        </svg>
        <span className="label">01 Square</span>
      </li>
      <li>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <rect width="100" height="100" fill={ink} />
          <rect x="50" width="50" height="100" fill="var(--paper)" />
          <path d="M50 0 A50 50 0 0 1 50 100 Z" fill={ink} />
        </svg>
        <span className="label">02 Halves</span>
      </li>
      <li>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path d="M0 0 H50 V50 H0 Z" fill={ink} />
          <path d="M100 50 A50 50 0 0 0 50 0 V50 Z" fill={ink} />
          <path d="M0 100 A50 50 0 0 1 50 50 V100 Z" fill={ink} />
          <path d="M50 50 H100 V100 Z" fill="var(--signal)" />
        </svg>
        <span className="label">03 Quarters</span>
      </li>
      <li>
        <svg viewBox="0 0 100 100" aria-hidden="true">
          {[0, 1, 2, 3].map((i) => (
            <g key={i} transform={`translate(${(i % 2) * 50} ${Math.floor(i / 2) * 50})`}>
              <rect width="50" height="50" fill={ink} />
              <circle cx={i % 2 ? 31 : 19} cy="25" r="15" fill="var(--paper)" />
            </g>
          ))}
        </svg>
        <span className="label">04 System</span>
      </li>
    </ol>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className={styles.hero}>
        <div className="wrap grid">
          <p className={`label ${styles.full}`}>About</p>
          <h1 className={`display ${styles.full}`}>
            Make it concrete<span className={styles.dot}>.</span>
          </h1>
          <p className={`lede ${styles.lede}`}>Before Concrete was software, it was summers "slinging mud".</p>
        </div>
      </section>

      {/* ── Summers ─────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>01 / Summers</p>
            <div className={styles.headTitle}>
              <h2 className="h2">Hard but satisfying work. Like most things.</h2>
              <div className={styles.story}>
                <p className="body">
                  Every summer in high school I poured concrete around the Treasure Valley with my best friend, Cole,
                  his dad, and his brother. We started early, pushed heavy wheelbarrows, and worked fast.
                </p>
                <p className="body">
                  It was hard work, but it built character. It was also a lot of fun. It was cool to see something in
                  the real world that you built, and that was built to last.
                </p>
              </div>
            </div>
          </div>

          <div className={styles.photos}>
            {PHOTOS.map((p) => (
              <figure key={p.src} className={`${styles.photo} ${styles[p.slot]}`}>
                <div className={styles.photoFrame}>
                  <Image src={p.src} alt={p.alt} fill sizes={p.sizes} className={styles.photoImg} />
                </div>
                <figcaption>
                  <span className="index">{p.n}</span>
                  <span className={styles.caption}>{p.caption}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ── The word ────────────────────────────────────── */}
      <section className="section section--ink">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>02 / The word</p>
            <div className={styles.headTitle}>
              <p className="lede">
                Then I went to school and studied engineering. The concrete work ended, but the word stuck with me.
                Concrete means something you can stand on: specific, tested, real.
              </p>
            </div>
          </div>
          <ul className={styles.phrases}>
            {["a concrete example", "a concrete implementation", "a concrete understanding"].map((ph) => (
              <li key={ph}>
                <span className={styles.phraseLead}>{ph.replace(/ \w+$/, "")} </span>
                {ph.split(" ").pop()}
                <span className={styles.dot}>.</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── The product ─────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>03 / The product</p>
            <div className={styles.headTitle}>
              <h2 className="h2">Why the name Concrete?</h2>
              <div className={styles.story}>
                <p className="body">
                  For years Concrete was a word I liked, waiting for something that deserved it. This app is that
                  thing: a place where loose notes harden into understanding you can build on.
                </p>
                <p className="body">
                  Learning works a lot like a pour. You set the forms, place the material, finish it, and give it time
                  to cure.
                </p>
              </div>
            </div>
          </div>
          <ol className={styles.pour}>
            {POUR.map((s, i) => (
              <li key={s.step}>
                <span className="index">{String(i + 1).padStart(2, "0")}</span>
                <p className="h3">{s.step}</p>
                <p className="body">{s.body}</p>
                <Link href={s.href} className={styles.pourLink}>
                  {s.feature} →
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--chrome">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>The mark</p>
            <div className={styles.headTitle}>
              <h2 className="h2">One square, divided.</h2>
              <p className={`lede ${styles.headLede}`}>
                The identity starts with a square, divided into halves, split into quarters, then repeated to make a
                larger system. Notes work the same way: small units, linked into something useful.
              </p>
            </div>
          </div>
          <Construction />
          <figure className={styles.drawing}>
            <img src="/brand/construction.svg" alt="Construction drawing of the Concrete wordmark on the square grid" />
            <figcaption className="label">Construction drawing — the wordmark, set on the module grid</figcaption>
          </figure>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>Marks</p>
            <h2 className={`h2 ${styles.headTitle}`}>Four lock-ups, one system.</h2>
          </div>
          <ul className={styles.marks}>
            {MARKS.map((m) => (
              <li key={m.name}>
                <div className={styles.markBox}>
                  <img src={m.src} alt={`${m.name} mark`} />
                </div>
                <p className={styles.markName}>{m.name}</p>
                <p className="label">{m.use}</p>
              </li>
            ))}
          </ul>

          <div className={styles.palette}>
            {[
              { hex: "#111111", name: "Ink" },
              { hex: "#6b6b6b", name: "Muted" },
              { hex: "#e2e2e2", name: "Rule" },
              { hex: "#f6f6f6", name: "Chrome" },
              { hex: "#ffffff", name: "Paper" },
              { hex: "#e2401c", name: "Signal" },
            ].map((c) => (
              <div key={c.name} className={styles.swatch}>
                <span style={{ background: c.hex }} />
                <b>{c.name}</b>
                <span className="mono">{c.hex}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--ink">
        <div className="wrap grid">
          <div className={styles.status}>
            <p className="label">Status</p>
            <h2 className="h2">Experimental, and moving fast.</h2>
          </div>
          <div className={styles.statusBody}>
            <p className="lede">
              The core note, quiz, tutor, agent, and sandbox workflows are usable. Learning analytics and the trajectory
              dataset formats are still evolving. Expect APIs, file formats, and UI details to change.
            </p>
            <p className="body">
              Contributions from students, educators, and curious builders are welcome. Documentation, bug reports, UI
              polish, and testing all help. You don&apos;t need to be an expert in Electron or AI.
            </p>
            <div className="btn-row">
              <a href={SITE.github} className="btn btn--line" target="_blank" rel="noreferrer">
                Contribute on GitHub <span className="arrow">↗</span>
              </a>
              <Link href="/download" className="btn btn--solid">
                Download <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
