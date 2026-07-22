import { CinematicIntro } from "@/components/intro/CinematicIntro";
import { ImpactStatements } from "@/components/intro/ImpactStatements";
import { ProfileReveal } from "@/components/intro/ProfileReveal";
import { ManifestoSection } from "@/components/intro/ManifestoSection";
import { CinematicVideo } from "@/components/intro/CinematicVideo";
import { HomeTransition } from "@/components/home/HomeTransition";
import { InstitutionalHero } from "@/components/home/InstitutionalHero";
import { ClientLogoMarquee } from "@/components/home/ClientLogoMarquee";
import { MetricsSection } from "@/components/home/MetricsSection";
import { MethodologySection } from "@/components/home/MethodologySection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { TechnologySection } from "@/components/home/TechnologySection";
import { AboutSection } from "@/components/home/AboutSection";
import { FinalWealthCore } from "@/components/home/FinalWealthCore";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { FAQSection } from "@/components/home/FAQSection";

export default function Home() {
  return (
    <>
      {/* ATO 01 — hero estático */}
      <CinematicIntro />

      {/* ATOS 02–04 — frases de impacto */}
      <ImpactStatements />

      {/* ATO 05 — revelação de identidade (card → vídeo) */}
      <ProfileReveal />

      {/* ATO 06 — manifesto tipográfico */}
      <ManifestoSection />

      {/* ATO 07 — vídeo cinematográfico */}
      <CinematicVideo />

      {/* Transição para a HOME institucional */}
      <HomeTransition />

      <InstitutionalHero />
      <ClientLogoMarquee />
      <MetricsSection />

      <TestimonialsSection />

      <MethodologySection />
      <ServicesSection />
      <TechnologySection />
      <AboutSection />
      <FAQSection />
      <FinalWealthCore />
    </>
  );
}
