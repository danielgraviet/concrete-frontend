import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { SITE } from "@/lib/features";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono-face",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? new URL(`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`)
    : undefined,
  title: {
    default: "Concrete — Learn STEM from your own notes",
    template: "%s — Concrete",
  },
  description:
    "Concrete is a local-first STEM learning workspace for Markdown notes, grounded quizzes, tutoring, spaced repetition, runnable code, and progress tracking.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "Concrete",
    description: "Write STEM notes locally, generate grounded quizzes, run code, and build durable understanding.",
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} ${mono.variable}`}>
      <body>
        <a href="#main" className="visually-hidden">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
