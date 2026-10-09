import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// The link-preview card shown by Slack, iMessage, X, LinkedIn, etc.
// Next uses this for every route that doesn't define its own.
export const alt = "Concrete: make your understanding concrete. Built for CS and ACME students.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#111111";
const MARK = "#231f20";
const SIGNAL = "#e2401c";
const MUTED = "#6b6b6b";
const RULE = "#d4d4d4";

const font = (file: string) => readFile(join(process.cwd(), "assets/fonts", file));
const [interMedium, interExtraBold, monoMedium, logoSvg] = await Promise.all([
  font("Inter-Medium.ttf"),
  font("Inter-ExtraBold.ttf"),
  font("JetBrainsMono-Medium.ttf"),
  readFile(join(process.cwd(), "public/brand/triple-c-crop.svg"), "utf8"),
]);

const dataUri = (svg: string) => `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;

/** Same 4×4 module field as the home hero (components/Composition.tsx). */
function compositionSvg() {
  const q = (r: number) => `<path d="M0 0 H100 A100 100 0 0 1 0 100 Z" fill="${MARK}" transform="rotate(${r} 50 50)"/>`;
  const h = (r: number) => `<path d="M0 100 V50 A50 50 0 0 1 100 50 V100 Z" fill="${MARK}" transform="rotate(${r} 50 50)"/>`;
  const t = (r: number) => `<path d="M0 0 L100 100 H0 Z" fill="${MARK}" transform="rotate(${r} 50 50)"/>`;
  const sq = `<rect width="100" height="100" fill="${MARK}"/>`;
  const dot = `<circle cx="50" cy="50" r="50" fill="${SIGNAL}"/>`;
  const ring = `<circle cx="50" cy="50" r="50" fill="${MARK}"/><circle cx="50" cy="50" r="22" fill="#fff"/>`;
  const cells = [q(180), sq, h(0), "", sq, dot, t(90), q(270), h(90), "", sq, ring, "", q(0), h(180), sq];
  const body = cells
    .map((c, i) => `<g transform="translate(${(i % 4) * 100} ${Math.floor(i / 4) * 100})">${c}</g>`)
    .join("");
  const grid = [100, 200, 300]
    .map((v) => `<line x1="${v}" y1="0" x2="${v}" y2="400"/><line x1="0" y1="${v}" x2="400" y2="${v}"/>`)
    .join("");
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">${body}<g stroke="${RULE}" stroke-width="1" fill="none"><rect x="0.5" y="0.5" width="399" height="399"/>${grid}</g></svg>`;
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#ffffff",
          color: INK,
          fontFamily: "Inter",
          padding: "56px 64px",
        }}
      >
        {/* Left column */}
        <div style={{ display: "flex", flexDirection: "column", flex: 1, justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <img src={dataUri(logoSvg)} width={62} height={42} alt="" />
            <span style={{ fontSize: 34, fontWeight: 800, letterSpacing: -1.4 }}>Concrete</span>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 26, fontWeight: 500, marginRight: 6 }}>Built for students in</span>
              {["CS", "ACME"].map((t) => (
                <span
                  key={t}
                  style={{
                    display: "flex",
                    background: SIGNAL,
                    color: "#fff",
                    fontSize: 28,
                    fontWeight: 800,
                    padding: "6px 16px",
                    letterSpacing: -0.5,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                fontSize: 88,
                fontWeight: 800,
                lineHeight: 0.94,
                letterSpacing: -4.4,
              }}
            >
              <span>Make your</span>
              <span>understanding</span>
              <div style={{ display: "flex" }}>
                <span>concrete</span>
                <span style={{ color: SIGNAL }}>.</span>
              </div>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              borderTop: `2px solid ${INK}`,
              paddingTop: 18,
              fontFamily: "JetBrains Mono",
              fontSize: 19,
              letterSpacing: 0.6,
              textTransform: "uppercase",
              color: MUTED,
            }}
          >
            <span>Quizzes · Code reading · Flashcards</span>
            <span style={{ color: INK }}>useconcrete.app</span>
          </div>
        </div>

        {/* Right column */}
        <div style={{ display: "flex", alignItems: "center", marginLeft: 56 }}>
          <img src={dataUri(compositionSvg())} width={400} height={400} alt="" />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: interMedium, weight: 500, style: "normal" },
        { name: "Inter", data: interExtraBold, weight: 800, style: "normal" },
        { name: "JetBrains Mono", data: monoMedium, weight: 500, style: "normal" },
      ],
    },
  );
}
