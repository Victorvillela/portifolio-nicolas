import type { Metadata } from "next";
import { site } from "@/data/site";
import { faqConsorcio } from "@/data/consorcio";
import { ConsorcioHero } from "@/components/consorcio/ConsorcioHero";
import { BlackFridayBanner } from "@/components/consorcio/BlackFridayBanner";
import { ConquistasSection } from "@/components/consorcio/ConquistasSection";
import { ComparativoSection } from "@/components/consorcio/ComparativoSection";
import { SimuladorSection } from "@/components/consorcio/SimuladorSection";
import { ComoFuncionaSection } from "@/components/consorcio/ComoFuncionaSection";
import { ParaQuemSection } from "@/components/consorcio/ParaQuemSection";
import { FAQSection } from "@/components/home/FAQSection";
import { MagneticButton } from "@/components/ui/MagneticButton";

const descricao =
  "Consórcio de imóveis, veículos, pesados e serviços sem juros, com planejamento e estratégia de contemplação da NBM. Simule e compare com o financiamento.";

export const metadata: Metadata = {
  title: "NBM Consórcios — imóveis e veículos sem juros",
  description: descricao,
  alternates: { canonical: "/consorcios" },
  openGraph: {
    title: `NBM Consórcios | ${site.brandMark}`,
    description: descricao,
    url: `${site.url}/consorcios`,
    type: "website",
    locale: "pt_BR",
    siteName: site.brandMark,
  },
};

function dadosEstruturadosFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqConsorcio.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/*
  NBM Consórcios — página própria, aberta em nova aba pelos botões
  "Consórcios NBM" da home. Mesma arquitetura bi-tonal do site:
  hero navy → seções claras (a primeira tem data-theme-boundary) →
  simulador navy → seções claras → CTA final navy.
*/
export default function ConsorciosPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturadosFaq()) }}
      />
      <ConsorcioHero />
      <BlackFridayBanner />
      <ConquistasSection />
      <ComparativoSection />
      <SimuladorSection />
      <ComoFuncionaSection />
      <ParaQuemSection />
      <FAQSection
        items={faqConsorcio}
        id="faq-consorcio"
        titulo="Dúvidas sobre consórcio,"
        tituloDestaque="respondidas sem rodeios."
      />

      <section className="hairline-t bg-halo-champagne relative overflow-hidden py-32 md:py-44">
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-4xl font-medium leading-tight tracking-tight text-fog md:text-6xl">
            Sua próxima conquista
          </h2>
          <p className="mt-4 font-serif text-2xl italic text-parchment md:text-4xl">
            começa com um plano.
          </p>
          <div className="mt-10">
            <MagneticButton href={site.consorcioWhatsapp}>
              Falar com um especialista
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
}
