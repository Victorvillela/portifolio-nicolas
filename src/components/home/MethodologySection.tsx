"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  Metodologia (briefing): 4 pilares; desktop com lista à esquerda e
  visual abstrato à direita reagindo à etapa ativa.
*/

/* Metodologia pública da NBM Consultoria (briefing) — não inventar etapas. */
const PILLARS = [
  {
    number: "01",
    title: "Análise",
    description:
      "Avaliar a saúde financeira: balanços, resultados, fluxo de caixa e contexto.",
  },
  {
    number: "02",
    title: "Planejamento",
    description:
      "Definir e estruturar metas de longo prazo — aposentadoria, imóvel, expansão de negócio.",
  },
  {
    number: "03",
    title: "Gestão",
    description:
      "Construir decisões de investimento alinhadas ao perfil de risco, objetivos e horizonte.",
  },
  {
    number: "04",
    title: "Acompanhamento",
    description:
      "Monitorar regularmente e ajustar as recomendações conforme as circunstâncias mudam.",
  },
];

export function MethodologySection() {
  const [active, setActive] = useState(0);

  return (
    <section
      aria-label="Metodologia"
      className="hairline-light-t bg-paper-soft py-28 md:py-40"
    >
      <Container>
        <SectionLabel className="eyebrow-light">Metodologia</SectionLabel>

        <div className="mt-14 grid gap-16 md:mt-20 md:grid-cols-2">
          <ol className="flex flex-col">
            {PILLARS.map((pillar, i) => (
              <li key={pillar.number} className="hairline-light-b">
                <button
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-expanded={active === i}
                  className="w-full py-6 text-left"
                >
                  <span className="flex items-baseline gap-6">
                    <span
                      className={`font-serif text-lg transition-colors duration-500 ${active === i ? "text-champagne" : "text-navy-text-soft/50"}`}
                    >
                      {pillar.number}
                    </span>
                    <span
                      className={`text-xl font-medium uppercase tracking-wide transition-colors duration-500 md:text-2xl ${active === i ? "text-navy-text" : "text-navy-text-soft"}`}
                    >
                      {pillar.title}
                    </span>
                  </span>
                  <span
                    className={`mt-3 block max-w-md pl-12 text-sm leading-relaxed text-navy-text-soft transition-all duration-500 ${active === i ? "max-h-32 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
                  >
                    {pillar.description}
                  </span>
                </button>
              </li>
            ))}
          </ol>

          {/* visual abstrato reagindo à etapa ativa */}
          <div
            aria-hidden
            className="relative hidden items-center justify-center md:flex"
          >
            <div className="relative h-72 w-72">
              {PILLARS.map((pillar, i) => (
                <div
                  key={pillar.number}
                  className="absolute inset-0 rounded-full border transition-all duration-700"
                  style={{
                    borderColor:
                      i <= active
                        ? "color-mix(in srgb, var(--color-blue) 40%, transparent)"
                        : "color-mix(in srgb, var(--color-bg-primary) 8%, transparent)",
                    transform: `scale(${0.4 + i * 0.2}) rotate(${active * 45 + i * 12}deg)`,
                    borderStyle: i % 2 === 0 ? "solid" : "dashed",
                  }}
                />
              ))}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-serif text-5xl italic text-bronze/80 transition-all duration-500">
                  {PILLARS[active].number}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
