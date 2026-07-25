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

/*
  Metadados institucionais: o site fala pela EMPRESA, então título,
  siteName e dados estruturados usam brandMark ("NBM Consultoria"), não
  o nome da pessoa. É por esse título que o resultado aparece no Google.
*/
const tituloPadrao = `${site.brandMark} — Consultoria de Investimentos e Planejamento Financeiro`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: tituloPadrao,
    template: `%s — ${site.brandMark}`,
  },
  description: site.headline,
  // canônica: evita o Google tratar variações de URL como páginas distintas
  alternates: { canonical: "/" },
  openGraph: {
    title: tituloPadrao,
    description: site.headline,
    url: site.url,
    type: "website",
    locale: "pt_BR",
    siteName: site.brandMark,
  },
  twitter: {
    card: "summary_large_image",
    title: tituloPadrao,
    description: site.headline,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  // só emite a meta tag quando o token estiver preenchido em data/site.ts
  ...(site.googleSiteVerification
    ? { verification: { google: site.googleSiteVerification } }
    : {}),
};

export const viewport: Viewport = {
  // espelha --color-bg-primary (globals.css); metadata do Next não
  // resolve var(), então este é o único hex que precisa ser literal
  themeColor: "#0A1A2F",
  colorScheme: "dark",
};

/*
  Dados estruturados (schema.org). É o que permite ao Google entender
  que existe uma EMPRESA por trás do site — nome, endereço, canais e
  área de atuação — em vez de apenas texto solto. Alimenta o painel de
  conhecimento e a busca por nome da marca.

  Só campos com dado real entram: os canais vêm de data/site.ts e o
  endereço é o declarado no perfil oficial. Não acrescentar aqui nada
  que a empresa não publique.
*/
function dadosEstruturados() {
  const { address } = site;
  return {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    name: site.brandMark,
    description: site.headline,
    url: site.url,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      addressRegion: address.state,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: "BR",
    sameAs: [site.linkedin, site.instagram, site.facebook].filter(Boolean),
  };
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${geist.variable} ${instrumentSerif.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(dadosEstruturados()),
          }}
        />
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
