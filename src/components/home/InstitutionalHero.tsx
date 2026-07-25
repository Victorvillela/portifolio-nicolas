import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { ctaLabels, site } from "@/data/site";

/*
  HOME institucional — hero (briefing): coluna única, texto centrado no
  fluxo institucional (sem objeto 3D ao lado).
*/
export function InstitutionalHero() {
  return (
    // data-theme-boundary: primeira seção clara — o PremiumHeader mede
    // este ponto para ligar a barra navy quando flutua sobre conteúdo
    // claro (papel herdado da antiga HomeTransition, removida).
    <section
      id="home"
      data-theme-boundary
      className="bg-pale-gradient relative overflow-hidden"
    >
      {/* pt-40 (mobile) > pb-28: dá espaço extra pro heading limpar o
          header fixo (sem scrim) antes de passar por trás dele ao rolar —
          ver observação de mobile no PremiumHeader. Desktop mantém o
          padding simétrico original (header lá é mais "leve"). */}
      <Container className="pt-40 pb-28 md:py-40">
        <div className="max-w-2xl">
          <SectionLabel className="eyebrow-light">
            Consultoria de investimentos
          </SectionLabel>
          <h2 className="mt-8 max-w-2xl text-4xl font-medium leading-[1.08] tracking-tight text-navy-text md:text-6xl">
            Clareza para decisões que{" "}
            <span className="font-serif italic text-bronze">
              atravessam o tempo.
            </span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-navy-text-soft">
            Estratégia patrimonial e inteligência financeira para transformar
            objetivos em decisões estruturadas, com o suporte da rede XP
            Investimentos.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <PillButton href={site.scheduleUrl} variant="navy">
              {ctaLabels.heroPrimary}
            </PillButton>
            <PillButton href="#servicos" variant="outline-navy">
              {ctaLabels.heroSecondary}
            </PillButton>
          </div>
        </div>
      </Container>
    </section>
  );
}
