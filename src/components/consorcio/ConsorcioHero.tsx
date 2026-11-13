import { site } from "@/data/site";
import { PillButton } from "@/components/ui/PillButton";
import { CartasSimulacao } from "./CartasSimulacao";

const selos = ["Sem juros", "Sem entrada obrigatória", "Regulado pelo Banco Central"];

/*
  Hero da página NBM Consórcios — mesmo navy do hero da home, mas sem
  vídeo: o elemento visual é a própria "carta de crédito", que é o que o
  cliente efetivamente conquista. Os números do cartão saem do mesmo
  cálculo do simulador (exemplo padrão de imóvel), nunca digitados à mão.
*/
export function ConsorcioHero() {
  return (
    <section
      id="inicio-consorcio"
      className="bg-halo-champagne relative overflow-hidden bg-navy"
    >
      {/* grade técnica sutil + brilho azul no canto — profundidade sem foto */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(var(--color-silver)_1px,transparent_1px),linear-gradient(90deg,var(--color-silver)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_70%_60%_at_70%_40%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-blue-light/20 blur-3xl"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-16 px-6 pb-20 pt-32 md:px-10 md:pb-24 lg:grid-cols-[1.1fr_0.9fr] lg:pt-48">
        <div>
          <p className="eyebrow flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-champagne/50" />
            NBM Consórcios
          </p>
          <h1 className="mt-8 text-5xl font-semibold leading-[1.02] tracking-tight text-fog md:text-7xl">
            Conquiste o que
            <br />
            <span className="text-silver">você planeja.</span>
          </h1>
          <p className="mt-4 font-serif text-3xl italic text-parchment md:text-4xl">
            Sem pagar juros ao banco.
          </p>
          <p className="mt-8 max-w-lg text-base leading-relaxed text-ash">
            Consórcio de imóveis, veículos, pesados e serviços com a mesma
            lógica que aplicamos ao seu patrimônio: planejamento, estratégia
            de contemplação e acompanhamento do início ao fim.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PillButton href="#simulador" className="w-full sm:w-auto">
              Simular meu consórcio
            </PillButton>
            <PillButton
              href={site.consorcioWhatsapp}
              variant="outline"
              className="w-full sm:w-auto"
            >
              Falar com especialista
            </PillButton>
          </div>

          <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            {selos.map((selo) => (
              <li
                key={selo}
                className="flex items-center gap-2.5 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-silver/80"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-blue-light" />
                {selo}
              </li>
            ))}
          </ul>
        </div>

        {/* BARALHO DE SIMULAÇÕES — cartas no formato do simulador, com o
            mesmo gesto do teaser da carta na home */}
        <CartasSimulacao className="lg:mx-0 lg:justify-self-end" />
      </div>
    </section>
  );
}
