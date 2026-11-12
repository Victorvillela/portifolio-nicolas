import Image from "next/image";
import { site } from "@/data/site";
import { plano } from "@/data/consorcio";
import { brl, brlCentavos, simular } from "@/lib/simulacao";
import { PillButton } from "@/components/ui/PillButton";

const selos = ["Sem juros", "Sem entrada obrigatória", "Regulado pelo Banco Central"];

/*
  Hero da página NBM Consórcios — mesmo navy do hero da home, mas sem
  vídeo: o elemento visual é a própria "carta de crédito", que é o que o
  cliente efetivamente conquista. Os números do cartão saem do mesmo
  cálculo do simulador (exemplo padrão de imóvel), nunca digitados à mão.
*/
export function ConsorcioHero() {
  const credito = plano.valorPadrao;
  const { parcelaReduzida, prazo } = simular(credito);

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

        {/* CARTA DE CRÉDITO — cartão principal + cartão "fantasma" atrás */}
        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:justify-self-end">
          <div
            aria-hidden
            className="hairline absolute inset-0 translate-x-5 translate-y-6 rotate-[4deg] rounded-3xl bg-navy-elevated/40"
          />
          <figure
            aria-label="Exemplo de carta de crédito de consórcio de imóvel"
            className="hairline relative rounded-3xl bg-linear-to-br from-navy-elevated to-navy-secondary p-7 shadow-[0_30px_80px_rgba(0,0,0,0.45)] md:p-9"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Image
                  src="/images/nbmlogo-transparent.png"
                  alt=""
                  width={40}
                  height={40}
                  className="h-9 w-9 object-contain"
                />
                <span className="text-[0.62rem] font-medium uppercase tracking-[0.26em] text-silver">
                  Carta de crédito
                </span>
              </div>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-accent">
                Imóvel
              </span>
            </div>

            <p className="stat-gold mt-10 font-serif text-5xl md:text-6xl">
              {brl(credito)}
            </p>
            <p className="mt-2 text-xs text-ash">valor da carta · poder de compra à vista</p>

            <dl className="hairline-t mt-8 grid grid-cols-2 gap-y-5 pt-6">
              <div>
                <dt className="eyebrow">Prazo</dt>
                <dd className="mt-1.5 text-lg text-fog">{prazo} meses</dd>
              </div>
              <div>
                <dt className="eyebrow">Parcela reduzida</dt>
                <dd className="mt-1.5 text-lg text-fog">{brlCentavos(parcelaReduzida)}</dd>
              </div>
              <div>
                <dt className="eyebrow">Juros</dt>
                <dd className="mt-1.5 text-lg text-fog">R$ 0</dd>
              </div>
              <div>
                <dt className="eyebrow">Contemplação</dt>
                <dd className="mt-1.5 text-lg text-fog">Sorteio ou lance</dd>
              </div>
            </dl>

            {/* "linha do tempo" do grupo: decorativa */}
            <div aria-hidden className="mt-8 flex items-center gap-1.5">
              {Array.from({ length: 16 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-1 flex-1 rounded-full ${i < 6 ? "bg-blue-light" : i === 6 ? "bg-gold" : "bg-silver/15"}`}
                />
              ))}
            </div>
            <figcaption className="mt-3 text-[0.65rem] text-ash">
              Exemplo ilustrativo. Valores reais dependem do grupo e das condições vigentes.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
