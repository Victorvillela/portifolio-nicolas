import { cases } from "@/data/cases";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  Cases (briefing): cards grandes com categoria, título, desafio,
  contexto, estratégia e resultado — sem rentabilidade, sem promessas.
  Conteúdo placeholder claramente marcado em data/cases.ts.
  Hover: zoom sutil 1.00 → 1.03 e seta que se move.
*/
export function CasesGrid() {
  return (
    <section id="cases" className="hairline-t bg-ink-950 py-28 md:py-40">
      <Container>
        <SectionLabel>Cases</SectionLabel>
        <h2 className="mt-8 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-fog md:text-6xl">
          Decisões reais. Estratégias construídas para{" "}
          <span className="font-serif italic text-parchment">
            contextos reais.
          </span>
        </h2>

        <div className="mt-16 flex flex-col gap-8">
          {cases.map((caseStudy, i) => (
            <article
              key={caseStudy.title}
              className="group hairline relative overflow-hidden rounded-2xl bg-ink-900/50 transition-transform duration-700 ease-out hover:scale-[1.015] md:hover:scale-[1.03]"
            >
              <div className="grid gap-8 p-8 md:grid-cols-[0.9fr_1.1fr] md:p-12">
                <div>
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-lg text-champagne/60">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="eyebrow">{caseStudy.category}</span>
                  </div>
                  <h3 className="mt-6 max-w-md text-2xl font-medium leading-snug text-fog md:text-3xl">
                    {caseStudy.title}
                  </h3>
                  {caseStudy.isPlaceholder && (
                    <p className="mt-4 inline-block rounded-full border border-champagne/25 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-champagne/70">
                      Conteúdo ilustrativo — substituir por case real
                    </p>
                  )}
                  <span
                    aria-hidden
                    className="mt-8 hidden text-2xl text-ash transition-all duration-500 group-hover:translate-x-2 group-hover:text-fog md:inline-block"
                  >
                    →
                  </span>
                </div>

                <dl className="grid gap-6 sm:grid-cols-2">
                  {(
                    [
                      ["Desafio", caseStudy.challenge],
                      ["Contexto", caseStudy.context],
                      ["Estratégia", caseStudy.strategy],
                      ["Resultado", caseStudy.outcome],
                    ] as const
                  ).map(([label, text]) => (
                    <div key={label}>
                      <dt className="eyebrow">{label}</dt>
                      <dd className="mt-3 text-sm leading-relaxed text-ash">
                        {text}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* brilho discreto no hover */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at 20% 0%, rgba(143,184,232,0.06), transparent 60%)",
                }}
              />
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
