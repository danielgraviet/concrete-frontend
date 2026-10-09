import styles from "./Composition.module.css";

/**
 * The hero composition: a 4×4 field of square modules, each divided the way
 * the mark is — into halves, quarters, and circles. One signal-coloured
 * circle anchors it, as in a Bauhaus poster.
 */
type Cell =
  | { k: "sq" }
  | { k: "empty" }
  | { k: "circle"; signal?: boolean }
  | { k: "quarter"; r: 0 | 90 | 180 | 270 }
  | { k: "half"; r: 0 | 90 | 180 | 270 }
  | { k: "tri"; r: 0 | 90 | 180 | 270 }
  | { k: "ring" };

const CELLS: Cell[] = [
  { k: "quarter", r: 180 }, { k: "sq" }, { k: "half", r: 0 }, { k: "empty" },
  { k: "sq" }, { k: "circle", signal: true }, { k: "tri", r: 90 }, { k: "quarter", r: 270 },
  { k: "half", r: 90 }, { k: "empty" }, { k: "sq" }, { k: "ring" },
  { k: "empty" }, { k: "quarter", r: 0 }, { k: "half", r: 180 }, { k: "sq" },
];

function Shape({ cell }: { cell: Cell }) {
  switch (cell.k) {
    case "sq":
      return <rect width="100" height="100" fill="var(--mark)" />;
    case "empty":
      return null;
    case "circle":
      return <circle cx="50" cy="50" r="50" fill={cell.signal ? "var(--signal)" : "var(--mark)"} />;
    case "ring":
      return (
        <>
          <circle cx="50" cy="50" r="50" fill="var(--mark)" />
          <circle cx="50" cy="50" r="22" fill="var(--paper)" />
        </>
      );
    case "quarter":
      return <path d="M0 0 H100 A100 100 0 0 1 0 100 Z" fill="var(--mark)" transform={`rotate(${cell.r} 50 50)`} />;
    case "half":
      return <path d="M0 100 V50 A50 50 0 0 1 100 50 V100 Z" fill="var(--mark)" transform={`rotate(${cell.r} 50 50)`} />;
    case "tri":
      return <path d="M0 0 L100 100 H0 Z" fill="var(--mark)" transform={`rotate(${cell.r} 50 50)`} />;
  }
}

export function Composition({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={`${styles.comp} ${className ?? ""}`} aria-hidden="true">
      {CELLS.map((cell, i) => (
        <g
          key={i}
          transform={`translate(${(i % 4) * 100} ${Math.floor(i / 4) * 100})`}
          className={styles.cell}
          style={{ animationDelay: `${i * 45}ms` }}
        >
          <Shape cell={cell} />
        </g>
      ))}
      {/* module grid */}
      <g stroke="var(--rule-strong)" strokeWidth="1" fill="none" className={styles.lines}>
        <rect x="0.5" y="0.5" width="399" height="399" />
        {[100, 200, 300].map((v) => (
          <g key={v}>
            <line x1={v} y1="0" x2={v} y2="400" />
            <line x1="0" y1={v} x2="400" y2={v} />
          </g>
        ))}
      </g>
    </svg>
  );
}
