import Image from "next/image";
import { plano } from "@/data/consorcio";
import { brl, brlCentavos, simular } from "@/lib/simulacao";

/*
  "Carta de crédito" da NBM Consórcios — o objeto visual da marca. Usada
  no hero de /consorcios e no convite da home (ConsorcioConvite), para o
  visitante reconhecer a marca ao trocar de página. Números saem do
  mesmo cálculo do simulador (data/consorcio.ts → plano).
*/
export function CartaCredito({ className = "" }: { className?: string }) {
  const credito = plano.valorPadrao;
  const { parcelaReduzida, prazo } = simular(credito);

  return (
    <div className={`relative mx-auto w-full max-w-md ${className}`}>
      {/* data-carta: ganchos do "teaser de baralho" da home
          (.carta-teaser em globals.css); no hero de /consorcios não há
          o wrapper, então nada anima */}
      <div
        aria-hidden
        data-carta="back"
        className="hairline absolute inset-0 translate-x-5 translate-y-6 rotate-[4deg] rounded-3xl bg-navy-elevated/40"
      />
      <figure
        data-carta="front"
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
            <dd className="mt-1.5 text-lg text-fog">
              {brlCentavos(parcelaReduzida)}
            </dd>
          </div>
          <div>
            <dt className="eyebrow">Juros</dt>
            <dd className="mt-1.5 text-lg text-fog">
              R$ 0
            </dd>
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
          Exemplo ilustrativo. Valores reais dependem do grupo e das
          condições vigentes. Veja o valor da parcela que cabe no seu
          orçamento no simulador.
        </figcaption>
      </figure>
    </div>
  );
}
