import Link from "next/link";
import { FEATURES, getFeature, nextFeature, type FeatureSlug } from "@/lib/features";
import { Glyph } from "./Glyph";
import { Frame, Specimen } from "./Specimen";
import styles from "./FeaturePage.module.css";

export function FeaturePage({ slug }: { slug: FeatureSlug }) {
  const f = getFeature(slug);
  const next = nextFeature(slug);

  return (
    <>
      {/* ── Hero ───────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="wrap">
          <div className={styles.meta}>
            <span className="index">
              {f.index} / {String(FEATURES.length).padStart(2, "0")}
            </span>
            <nav className="label" aria-label="Breadcrumb">
              <Link href="/" className={styles.crumb}>
                Concrete
              </Link>{" "}
              / {f.name}
            </nav>
          </div>

          <div className={`grid ${styles.heroGrid}`}>
            <h1 className={`display ${styles.name}`}>{f.name}</h1>
            <Glyph name={f.glyph} accent className={styles.glyph} />
            <div className={styles.heroText}>
              <h2 className="h2">{f.headline}</h2>
            </div>
            <p className={`lede ${styles.lede}`}>{f.lede}</p>
          </div>

          <dl className={styles.specs}>
            {f.specs.map((sp) => (
              <div key={sp.label} className={styles.spec}>
                <dt className="label">{sp.label}</dt>
                <dd>{sp.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Media ──────────────────────────────────────── */}
      <section className={`section section--chrome ${styles.media}`}>
        <div className="wrap">
          <div className={styles.mediaInner}>
            {f.media ? (
              <Frame title={`Concrete — ${f.name}`}>
                <img src={f.media.src} alt={f.media.alt} className={styles.gif} loading="eager" />
              </Frame>
            ) : (
              <Specimen slug={f.slug} />
            )}
          </div>
          <p className={`label ${styles.caption}`}>
            {f.media ? "Recorded in Concrete" : "Illustration in the Concrete theme"}
          </p>
        </div>
      </section>

      {/* ── How it works ───────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>How it works</p>
            <h2 className={`h2 ${styles.headTitle}`}>Three steps.</h2>
          </div>
          <ol className={styles.steps}>
            {f.steps.map((st, i) => (
              <li key={st.title} className={styles.step}>
                <span className={styles.stepNum}>{i + 1}</span>
                <h3 className="h3">{st.title}</h3>
                <p className="body">{st.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Specimen (when the hero showed a recording) ── */}
      {f.media && (
        <section className="section section--chrome">
          <div className="wrap grid">
            <div className={styles.specText}>
              <p className="label">Up close</p>
              <h2 className="h2">{f.summary}</h2>
              <p className="body">An illustrative example, drawn in the app&apos;s Concrete theme.</p>
            </div>
            <div className={styles.specBox}>
              <Specimen slug={f.slug} />
            </div>
          </div>
        </section>
      )}

      {/* ── Details ────────────────────────────────────── */}
      <section className="section">
        <div className="wrap">
          <div className={`grid ${styles.head}`}>
            <p className={`label ${styles.headLabel}`}>Why it matters</p>
          </div>
          <div className={styles.details}>
            {f.details.map((d) => (
              <article key={d.title} className={styles.detail}>
                <span className={styles.square} aria-hidden="true" />
                <h3 className="h3">{d.title}</h3>
                <p className="body">{d.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Next ───────────────────────────────────────── */}
      <Link href={`/${next.slug}`} className={styles.next}>
        <div className={`wrap ${styles.nextInner}`}>
          <div>
            <p className="label">Next — {next.index}</p>
            <p className={`h1 ${styles.nextName}`}>
              {next.name} <span className={styles.nextArrow}>→</span>
            </p>
            <p className={styles.nextSummary}>{next.summary}</p>
          </div>
          <Glyph name={next.glyph} className={styles.nextGlyph} />
        </div>
      </Link>
    </>
  );
}
