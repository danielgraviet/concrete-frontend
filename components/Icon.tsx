/**
 * Inline SVG icons. Unicode arrows such as ↗ and ▶ render as colour emoji on
 * iOS, so every symbol on the site is drawn here instead and follows the text colour.
 */
type IconName = "arrow" | "external" | "play" | "check" | "half";

const PATHS: Record<IconName, React.ReactNode> = {
  arrow: <path d="M2 8h11M9 4l4 4-4 4" />,
  external: <path d="M4 12L12 4M5.5 4H12v6.5" />,
  play: <path d="M4 3l9 5-9 5z" fill="currentColor" stroke="none" />,
  check: <path d="M3 8.5l3.2 3L13 4.5" />,
  half: (
    <>
      <circle cx="8" cy="8" r="5.5" />
      <path d="M8 2.5a5.5 5.5 0 0 1 0 11z" fill="currentColor" stroke="none" />
    </>
  ),
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 16 16"
      width="1em"
      height="1em"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
      style={{ display: "inline-block", verticalAlign: "-0.125em", flex: "none" }}
    >
      {PATHS[name]}
    </svg>
  );
}
