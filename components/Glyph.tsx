import type { Glyph as GlyphName } from "@/lib/features";

/**
 * Feature glyphs. Every shape is cut from the same 100×100 square module
 * that the Concrete mark is built on: halves, quarters, and circles.
 * `accent` paints one element in the signal colour.
 */
export function Glyph({
  name,
  accent = false,
  className,
  title,
}: {
  name: GlyphName;
  accent?: boolean;
  className?: string;
  title?: string;
}) {
  const ink = "currentColor";
  const hi = accent ? "var(--signal)" : "currentColor";

  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      {name === "square" && (
        <>
          <rect x="0" y="0" width="100" height="100" fill={ink} />
          <rect x="50" y="50" width="50" height="50" fill={hi === ink ? "var(--paper)" : hi} />
          <path d="M50 50 H100 V100 Z" fill={ink} />
        </>
      )}
      {name === "circle" && (
        <>
          <rect x="0" y="0" width="100" height="100" fill="none" stroke={ink} strokeWidth="2" />
          <circle cx="50" cy="50" r="50" fill={ink} />
          <circle cx="50" cy="50" r="18" fill={hi === ink ? "var(--paper)" : hi} />
        </>
      )}
      {name === "half" && (
        <>
          <path d="M0 50 A50 50 0 0 1 100 50 Z" fill={ink} />
          <rect x="0" y="50" width="100" height="50" fill={hi} />
        </>
      )}
      {name === "quarter" && (
        <>
          <path d="M0 0 H100 A100 100 0 0 1 0 100 Z" fill={ink} />
          <circle cx="78" cy="78" r="22" fill={hi} />
        </>
      )}
      {name === "triangle" && (
        <>
          <path d="M0 0 L100 100 H0 Z" fill={ink} />
          <path d="M0 0 H100 V100 Z" fill="none" stroke={ink} strokeWidth="2" />
          <circle cx="72" cy="28" r="14" fill={hi} />
        </>
      )}
      {name === "bars" && (
        <>
          <rect x="0" y="60" width="28" height="40" fill={ink} />
          <rect x="36" y="30" width="28" height="70" fill={ink} />
          <rect x="72" y="0" width="28" height="100" fill={hi} />
        </>
      )}
      {name === "cc" && (
        <>
          <rect x="0" y="20" width="100" height="60" fill={ink} />
          <circle cx="28" cy="50" r="18" fill="var(--paper)" />
          <circle cx="72" cy="50" r="18" fill={hi === ink ? "var(--paper)" : hi} />
          <rect x="0" y="44" width="10" height="12" fill="var(--paper)" />
          <rect x="90" y="44" width="10" height="12" fill="var(--paper)" />
        </>
      )}
    </svg>
  );
}
