import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { InstitutionalHero } from "@/components/home/InstitutionalHero";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { MetricsSection } from "@/components/home/MetricsSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FinalWealthCore } from "@/components/home/FinalWealthCore";
import { FAQSection } from "@/components/home/FAQSection";
import { faq } from "@/data/faq";

/*
  FAQPage (schema.org) — mesmo conteúdo de data/faq.ts, já aprovado
  pelo cliente. Permite ao Google exibir as perguntas expandidas
  direto no resultado de busca (rich snippet).
*/
function dadosEstruturadosFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(dadosEstruturadosFaq()),
        }}
      />
      {/* ATO 01 — hero de vídeo (navy do início ao fim; a virada para o
          tema claro acontece direto na borda com o InstitutionalHero) */}
      <CinematicIntro />

      <InstitutionalHero />
      <PartnersMarquee />
      <MetricsSection />

      <MethodologySection />
      {/* Sobre antes de Serviços: a seção Sobre apresenta a tese da marca
          ("o mercado oferece produtos, nós oferecemos um método") e
          Serviços entra na sequência como a demonstração prática dela. */}
      <AboutSection />
      <ServicesSection />
      <FAQSection />
      <FinalWealthCore />
    </>
  );
}
