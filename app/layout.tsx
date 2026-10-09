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
  // Absolute URLs for link previews (Slack, iMessage, X) must point at the real domain.
  metadataBase: new URL(SITE.url),
  title: {
    default: "Concrete — Make your understanding concrete before the exam",
    template: "%s — Concrete",
  },
  description:
    "Turn your CS and ACME notes into quizzes, code-reading practice, and flashcards. Find the gaps before the exam, the interview, or the deadline.",
  applicationName: SITE.name,
  openGraph: {
    type: "website",
    siteName: SITE.name,
    url: "/",
    title: "Concrete — Make your understanding concrete before the exam",
    description:
      "Quizzes, code-reading practice, and flashcards from your own CS and ACME notes. Runs on the AI subscription you already have. Free and open source.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Concrete — Make your understanding concrete before the exam",
    description:
      "Quizzes, code-reading practice, and flashcards from your own CS and ACME notes. Free and open source.",
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
