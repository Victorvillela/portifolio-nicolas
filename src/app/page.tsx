import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { InstitutionalHero } from "@/components/home/InstitutionalHero";
import { PartnersMarquee } from "@/components/home/PartnersMarquee";
import { MetricsSection } from "@/components/home/MetricsSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AboutSection } from "@/components/home/AboutSection";
import { FinalWealthCore } from "@/components/home/FinalWealthCore";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  return (
    <>
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
