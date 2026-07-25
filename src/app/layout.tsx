import type { Metadata, Viewport } from "next";
import { Geist, Instrument_Serif } from "next/font/google";
import { site } from "@/data/site";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { PremiumHeader } from "@/components/layout/PremiumHeader";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Estratégia Patrimonial`,
    template: `%s — ${site.name}`,
  },
  description: site.headline,
  openGraph: {
    title: `${site.name} — Estratégia Patrimonial`,
    description: site.headline,
    type: "website",
    locale: "pt_BR",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Estratégia Patrimonial`,
    description: site.headline,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  // espelha --color-bg-primary (globals.css); metadata do Next não
  // resolve var(), então este é o único hex que precisa ser literal
  themeColor: "#0A1A2F",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>
        <a
          href="#home"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-fog focus:px-4 focus:py-2 focus:text-xs focus:text-ink-950"
        >
          Pular para o conteúdo institucional
        </a>
        <SmoothScrollProvider>
          <PremiumHeader />
          <main>{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
