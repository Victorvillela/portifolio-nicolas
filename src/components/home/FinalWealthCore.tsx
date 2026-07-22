import { MagneticButton } from "@/components/ui/MagneticButton";
import { ctaLabels, site } from "@/data/site";

/*
  CTA final (briefing): o patrimônio encontrou direção.
*/
export function FinalWealthCore() {
  return (
    <section
      id="contato"
      className="hairline-t bg-halo-champagne relative overflow-hidden py-32 md:py-48"
    >
      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <h2 className="text-4xl font-medium leading-tight tracking-tight text-fog md:text-6xl">
          Seu patrimônio já existe.
        </h2>
        <p className="mt-4 font-serif text-2xl italic text-parchment md:text-4xl">
          Agora ele precisa de direção.
        </p>
        <div className="mt-10">
          <MagneticButton href={`mailto:${site.email}`}>
            {ctaLabels.final}
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
