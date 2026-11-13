"use client";

import { useEffect, useId, useRef, useState } from "react";
import { blackFriday, plano } from "@/data/consorcio";
import { site } from "@/data/site";
import { brl, brlCentavos, simular } from "@/lib/simulacao";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";

/*
  Simulador do consórcio de imóvel — números com base nas simulações
  reais da NBM Consórcios (coeficientes em data/consorcio.ts → plano).
  O cartão de resultado segue o mesmo formato do simulador da
  NBM Consórcios (crédito, parcela antes/depois da contemplação,
  prazo), na identidade da NBM. Termina em dois CTAs de WhatsApp: a
  proposta com a simulação já escrita e o contato direto.
*/
/*
  Cartão de resultado como BARALHO (mesmo gesto do hero de /consorcios):
  cada novo valor "dá" uma carta nova — a atual desliza para a direita
  e some, e a próxima sobe da pilha com os preços novos.

  Dois valores de crédito:
    - credito      → o do controle, ao vivo (o número grande da esquerda)
    - cartaCredito → o da carta na mesa; só muda ao "fechar" o valor:
                     clique num atalho, soltar o slider, ou 350 ms parado
                     (teclado/arrasto sem pointerup). Assim arrastar não
                     dispara uma carta por passo de R$ 5 mil.
*/
const ESPERA_CARTA = 350;

export function SimuladorSection() {
  const [credito, setCredito] = useState(plano.valorPadrao);
  const [cartaCredito, setCartaCredito] = useState(plano.valorPadrao);
  // carta que está saindo (valor anterior) e chave que remonta a nova
  const [saindo, setSaindo] = useState<number | null>(null);
  const [rodada, setRodada] = useState(0);
  const espera = useRef<ReturnType<typeof setTimeout>>(undefined);
  // espelho de cartaCredito para o timeout não ler um valor antigo
  const naMesa = useRef(plano.valorPadrao);
  const idValor = useId();

  const darCarta = (valor: number) => {
    clearTimeout(espera.current);
    if (valor === naMesa.current) return;
    setSaindo(naMesa.current);
    naMesa.current = valor;
    setCartaCredito(valor);
    setRodada((n) => n + 1);
  };

  const mudarCredito = (valor: number) => {
    setCredito(valor);
    clearTimeout(espera.current);
    espera.current = setTimeout(() => darCarta(valor), ESPERA_CARTA);
  };

  useEffect(() => () => clearTimeout(espera.current), []);

  const preenchimento = ((credito - plano.valorMin) / (plano.valorMax - plano.valorMin)) * 100;

  return (
    <section
      id="simulador"
      aria-label="Simulador de consórcio"
      className="relative overflow-hidden bg-navy py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 bottom-0 h-[30rem] w-[30rem] rounded-full bg-blue/25 blur-3xl"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <p className="eyebrow flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-champagne/50" />
            Simulador
          </p>
          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tight text-fog md:text-5xl">
            Quanto custa{" "}
            <span className="font-serif italic text-parchment">a sua conquista?</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ash">
            Escolha o crédito e veja a parcela reduzida até a contemplação, a
            parcela depois dela e quanto isso representa frente a um
            financiamento.
          </p>
        </div>

        {/*
          Entradas e resultado SEMPRE lado a lado (pedido do cliente,
          2026-11-13): no celular o visitante mexe no valor e vê a parcela
          na mesma tela. Abaixo de 640px (sm) as duas cartas entram numa
          versão compacta, e o que não cabe em meia tela (Black Friday,
          botões de WhatsApp e aviso legal) desce para baixo das duas.
          -mx-3 no celular devolve parte do respiro lateral do Container
          para as colunas.
        */}
        <div className="-mx-3 mt-14 grid grid-cols-2 gap-2.5 sm:mx-0 sm:gap-4 lg:grid-cols-[1fr_1.1fr] lg:gap-6">
          {/* ENTRADAS */}
          <div className="hairline flex min-w-0 flex-col rounded-2xl bg-navy-secondary/70 p-3.5 sm:rounded-3xl sm:p-7 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">Consórcio de imóvel</span>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-accent max-sm:hidden">
                Parcela reduzida
              </span>
            </div>

            <div className="mt-6 sm:mt-10">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-1 sm:gap-y-2">
                <label htmlFor={idValor} className="eyebrow">
                  Crédito contratado
                </label>
                <output
                  htmlFor={idValor}
                  className="stat-gold font-serif text-[1.6rem] leading-none sm:text-4xl md:text-5xl"
                >
                  {brl(credito)}
                </output>
              </div>
              <input
                id={idValor}
                type="range"
                min={plano.valorMin}
                max={plano.valorMax}
                step={plano.passo}
                value={credito}
                onChange={(e) => mudarCredito(Number(e.target.value))}
                onPointerUp={(e) => darCarta(Number(e.currentTarget.value))}
                className="slider-nbm mt-5 w-full sm:mt-6"
                style={{ "--fill": `${preenchimento}%` } as React.CSSProperties}
              />
              <div className="mt-2 flex justify-between gap-2 text-[0.55rem] text-ash sm:text-[0.65rem]">
                <span>{brl(plano.valorMin)}</span>
                <span>{brl(plano.valorMax)}</span>
              </div>
            </div>

            <fieldset className="mt-6 sm:mt-8">
              <legend className="eyebrow">Valores mais procurados</legend>
              <div className="mt-3 grid grid-cols-1 gap-1.5 sm:mt-4 sm:flex sm:flex-wrap sm:gap-2">
                {plano.atalhos.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={credito === v}
                    onClick={() => {
                      setCredito(v);
                      darCarta(v);
                    }}
                    className={`min-h-9 rounded-full border px-3 py-1.5 text-[0.7rem] transition-colors duration-300 sm:px-4 sm:py-2 sm:text-xs ${
                      credito === v
                        ? "border-blue-light bg-blue-light/15 text-fog"
                        : "border-fog/15 text-ash hover:border-fog/40 hover:text-fog"
                    }`}
                  >
                    {brl(v)}
                  </button>
                ))}
              </div>
            </fieldset>

            {/* no celular o destaque desce para baixo das duas colunas */}
            <AvisoBlackFriday className="mt-10 max-sm:hidden lg:mt-auto" />
          </div>

          {/* RESULTADO — baralho: pilha decorativa atrás, a carta da mesa
              (remontada a cada rodada, sobe da pilha) e, por cima, a carta
              anterior saindo para a direita. Todas na mesma célula do
              grid, então a altura nunca salta. */}
          <div className="relative grid min-w-0">
            <div
              aria-hidden
              className="hairline col-start-1 row-start-1 rounded-2xl bg-linear-to-br from-navy-elevated to-navy-secondary brightness-[0.45] [transform:translate(0.5rem,1rem)_rotate(2.5deg)] sm:rounded-3xl sm:[transform:translate(1.1rem,1.6rem)_rotate(3deg)]"
            />
            <div
              aria-hidden
              className="hairline col-start-1 row-start-1 rounded-2xl bg-linear-to-br from-navy-elevated to-navy-secondary brightness-[0.65] [transform:translate(0.25rem,0.5rem)_rotate(1.25deg)] sm:rounded-3xl sm:[transform:translate(0.55rem,0.8rem)_rotate(1.5deg)]"
            />
            <ResultadoCarta
              key={rodada}
              credito={cartaCredito}
              className={rodada > 0 ? "z-10 carta-entra" : "z-10"}
            />
            {saindo !== null && (
              <ResultadoCarta
                key={`saindo-${rodada}`}
                credito={saindo}
                inerte
                className="carta-sai pointer-events-none z-20"
                onAnimationEnd={() => setSaindo(null)}
              />
            )}
          </div>
        </div>

        {/* celular: o que não cabe em meia tela, embaixo das duas cartas */}
        <div className="mt-8 flex flex-col gap-6 sm:hidden">
          <AcoesSimulacao credito={cartaCredito} />
          <AvisoBlackFriday />
        </div>
      </Container>
    </section>
  );
}

/*
  Uma carta de resultado — formato do simulador da NBM Consórcios.
  A carta "inerte" é só a imagem da anterior saindo: fora da árvore de
  acessibilidade e sem foco nos botões.
*/
function ResultadoCarta({
  credito,
  inerte = false,
  className = "",
  onAnimationEnd,
}: {
  credito: number;
  inerte?: boolean;
  className?: string;
  onAnimationEnd?: () => void;
}) {
  const r = simular(credito);
  // rótulos e valores: compactos no celular (meia tela), cheios a partir de sm
  const dt = "text-[0.7rem] leading-snug text-silver sm:text-sm";
  const dd = "mt-1 text-sm font-semibold sm:mt-2 sm:text-xl";

  return (
    <div
      aria-live={inerte ? undefined : "polite"}
      aria-hidden={inerte || undefined}
      inert={inerte}
      onAnimationEnd={onAnimationEnd}
      className={`hairline relative col-start-1 row-start-1 flex min-w-0 flex-col rounded-2xl bg-linear-to-br from-navy-elevated to-navy-secondary p-3.5 shadow-[0_30px_80px_rgba(0,0,0,0.35)] sm:rounded-3xl sm:p-7 md:p-10 ${className}`}
    >
      <div className="hairline-b mb-4 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 pb-4 sm:mb-6 sm:pb-5">
        <span className="eyebrow">Crédito</span>
        <span className="text-sm font-semibold text-fog sm:text-lg">{brl(credito)}</span>
      </div>
      <dl className="flex flex-col">
        <div className="hairline-b pb-4 sm:pb-6">
          <dt className={dt}>Parcela antes da contemplação</dt>
          <dd className="mt-1.5 sm:mt-2">
            <span className="block text-[0.7rem] text-ash sm:text-sm">
              De: <s>{brlCentavos(r.parcelaCheia)}</s>
            </span>
            <span className="stat-gold mt-1 block font-serif text-[1.6rem] leading-none sm:text-5xl md:text-6xl">
              {brlCentavos(r.parcelaReduzida)}
            </span>
          </dd>
        </div>
        <div className="hairline-b grid grid-cols-1 gap-3 py-4 sm:grid-cols-2 sm:gap-4 sm:py-6">
          <div>
            <dt className={dt}>Parcela após a contemplação</dt>
            <dd className={`${dd} text-fog`}>{brlCentavos(r.parcelaCheia)}</dd>
          </div>
          <div>
            <dt className={dt}>Prazo</dt>
            <dd className={`${dd} text-fog`}>{r.prazo} meses</dd>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3 pt-4 sm:grid-cols-2 sm:gap-4 sm:pt-6">
          <div>
            <dt className={dt}>No financiamento</dt>
            <dd className={`${dd} text-silver/70`}>
              {brlCentavos(r.parcelaFinanciamento)}
              <span className="text-[0.65rem] font-normal text-ash sm:text-xs">/mês</span>
            </dd>
          </div>
          <div>
            <dt className={dt}>Economia no período</dt>
            <dd className={`${dd} stat-gold`}>{brl(Math.max(r.economia, 0))}</dd>
          </div>
        </div>
      </dl>

      {/* no celular botões e aviso ficam embaixo das duas colunas */}
      <AcoesSimulacao credito={credito} className="mt-10 max-sm:hidden" />
    </div>
  );
}

/* Botões de WhatsApp + aviso legal da simulação (dentro da carta a
   partir de sm; no celular, abaixo das duas colunas) */
function AcoesSimulacao({
  credito,
  className = "",
}: {
  credito: number;
  className?: string;
}) {
  const r = simular(credito);
  const mensagem = `Olá! Simulei no site um consórcio de imóvel com crédito de ${brl(credito)} em ${r.prazo} meses (parcela reduzida de ${brlCentavos(r.parcelaReduzida)}). Quero receber uma proposta.`;
  const whatsappProposta = `${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;

  return (
    <div className={className}>
      <div className="flex flex-col gap-3">
        <PillButton href={whatsappProposta}>Receber minha proposta</PillButton>
        <PillButton href={site.consorcioWhatsapp} variant="outline">
          Falar com especialista
        </PillButton>
      </div>
      <p className="mt-5 text-[0.65rem] leading-relaxed text-ash/80">
        Valores com base nas condições atuais do plano de imóvel em{" "}
        {r.prazo} meses, com parcela reduzida até a contemplação. Sujeitos
        a reajuste anual, disponibilidade de grupo e análise da
        NBM Consórcios. O financiamento é referência (tabela Price, sem
        entrada, seguros nem CET). Não é proposta nem garantia de
        contemplação.
      </p>
    </div>
  );
}

/* destaque da campanha — mesmos números do banner Black Friday
   (data/consorcio.ts → blackFriday), para a página nunca mostrar dois
   valores diferentes para a mesma oferta */
function AvisoBlackFriday({ className = "" }: { className?: string }) {
  if (!blackFriday.ativa) return null;
  return (
    <a
      href="#black-friday"
      className={`group block rounded-2xl border border-gold/40 bg-gold/5 p-5 transition-colors hover:bg-gold/10 ${className}`}
    >
      <p className="text-[0.6rem] font-semibold uppercase tracking-[0.26em] text-red-400">
        Black Friday
      </p>
      <p className="mt-2 text-sm leading-relaxed text-silver">
        <span className="font-semibold text-fog">O dobro do crédito</span> por{" "}
        <span className="stat-gold font-semibold">{brlCentavos(blackFriday.aMais)}</span>{" "}
        a mais por mês: {brl(blackFriday.creditoDobro)} por{" "}
        {brlCentavos(blackFriday.parcelaDobro)}.{" "}
        <span className="text-blue-light transition-colors group-hover:text-fog">Ver condição →</span>
      </p>
    </a>
  );
}
