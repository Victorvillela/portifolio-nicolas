import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  Depoimentos (briefing — substitui a antiga seção de Cases): grid de 3
  colunas, aspas grandes em serif como elemento gráfico, frase em
  destaque, nome/role menores abaixo. Sem estrelas/rating de marketplace
  — tom institucional. Conteúdo placeholder claramente marcado em
  data/testimonials.ts (regras de compliance no topo do arquivo).
*/
export function TestimonialsSection() {
  return (
    <section
      id="depoimentos"
      className="hairline-t bg-ink-950 py-28 md:py-40"
    >
      <Container>
        <SectionLabel>Depoimentos</SectionLabel>
        <h2 className="mt-8 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-fog md:text-6xl">
          Quem confia,{" "}
          <span className="font-serif italic text-parchment">
            recomenda.
          </span>
        </h2>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.displayName}
              className="hairline flex flex-col rounded-2xl bg-ink-900/50 p-8 transition-transform duration-500 ease-out hover:-translate-y-1.5"
            >
              <span
                aria-hidden
                className="font-serif text-5xl leading-none text-champagne/40"
              >
                &ldquo;
              </span>
              <blockquote className="mt-4 flex-1 text-lg leading-relaxed text-fog">
                {t.quote}
              </blockquote>
              {t.isPlaceholder && (
                <p className="mt-6 inline-block w-fit rounded-full border border-champagne/25 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-champagne/70">
                  Depoimento ilustrativo — aguardando autorização
                </p>
              )}
              <figcaption className="hairline-t mt-6 pt-6">
                <p className="text-sm font-medium text-fog">
                  {t.displayName}
                </p>
                {t.role && (
                  <p className="mt-1 text-xs text-ash">{t.role}</p>
                )}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
