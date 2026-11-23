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

const title = "Concrete | Turn your notes into quizzes";
const description = "Make practice quizzes from your notes and PDFs. Take a quiz, check your answers, and review what you missed.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: { default: title, template: "%s — Concrete" },
  description,
  applicationName: SITE.name,
  openGraph: { type: "website", siteName: SITE.name, url: "/", title, description },
  twitter: { card: "summary_large_image", title, description },
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
