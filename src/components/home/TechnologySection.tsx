import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { TechChartScene } from "@/components/three/TechChartScene";
import { DataRainOverlay } from "@/components/three/DataRainOverlay";

/*
  Tecnologia (briefing): dados e tecnologia apoiam análise e organização —
  nunca vendidos como previsão de mercado.

  Visual: "monitor" escuro com um gráfico 3D animado (barras + linha de
  tendência com glow, TechChartScene) e uma chuva de dados atrás
  (DataRainOverlay, canvas 2D). Paleta contida ao card escuro — o resto
  da seção continua no tema claro. Nada de candlestick verde/vermelho
  nem estética de corretora (regra do briefing) — cor varia só com
  altura das barras, sem semântica de alta/baixa.
*/

export function TechnologySection() {
  return (
    <section
      aria-label="Tecnologia"
      className="hairline-light-t bg-paper py-28 md:py-40"
    >
      <Container className="grid items-center gap-16 md:grid-cols-2">
        <div>
          <SectionLabel className="eyebrow-light">Tecnologia</SectionLabel>
          <h2 className="mt-8 text-4xl font-medium leading-tight tracking-tight text-navy-text md:text-5xl">
            Tecnologia para analisar.
            <br />
            <span className="font-serif italic text-bronze">
              Estratégia para decidir.
            </span>
          </h2>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-navy-text-soft">
            Dados organizam a informação e ampliam a qualidade da análise —
            cenários, correlações, exposição a risco. Mas nenhum modelo prevê
            o mercado. A decisão final é sempre estratégica: contexto,
            objetivos e disciplina de longo prazo.
          </p>
        </div>

        <div aria-hidden className="hidden md:block">
          <div className="shadow-paper relative aspect-[4/3] overflow-hidden rounded-2xl bg-ink-950">
            {/* grid sutil de profundidade — puro CSS, sem custo de WebGL extra */}
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(143,184,232,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(143,184,232,0.08) 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
            <DataRainOverlay className="absolute inset-0 opacity-45" />
            <TechChartScene className="absolute inset-0" />
            {/* vinheta interna — reforça a leitura de "tela" */}
            <div
              className="pointer-events-none absolute inset-0 rounded-2xl"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(143,184,232,0.12), inset 0 0 60px rgba(7,12,20,0.55)",
              }}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
