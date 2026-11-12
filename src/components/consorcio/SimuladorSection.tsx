"use client";

import { useId, useMemo, useState } from "react";
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
export function SimuladorSection() {
  const [credito, setCredito] = useState(plano.valorPadrao);
  const idValor = useId();
  const r = useMemo(() => simular(credito), [credito]);

  const mensagem = `Olá! Simulei no site um consórcio de imóvel com crédito de ${brl(credito)} em ${r.prazo} meses (parcela reduzida de ${brlCentavos(r.parcelaReduzida)}). Quero receber uma proposta.`;
  const whatsappProposta = `${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;

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

        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* ENTRADAS */}
          <div className="hairline flex flex-col rounded-3xl bg-navy-secondary/70 p-7 md:p-10">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow">Consórcio de imóvel</span>
              <span className="rounded-full bg-accent/15 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-accent">
                Parcela reduzida
              </span>
            </div>

            <div className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-x-4 gap-y-2">
                <label htmlFor={idValor} className="eyebrow">
                  Crédito contratado
                </label>
                <output htmlFor={idValor} className="stat-gold font-serif text-4xl md:text-5xl">
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
                onChange={(e) => setCredito(Number(e.target.value))}
                className="slider-nbm mt-6 w-full"
                style={{ "--fill": `${preenchimento}%` } as React.CSSProperties}
              />
              <div className="mt-2 flex justify-between text-[0.65rem] text-ash">
                <span>{brl(plano.valorMin)}</span>
                <span>{brl(plano.valorMax)}</span>
              </div>
            </div>

            <fieldset className="mt-8">
              <legend className="eyebrow">Valores mais procurados</legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {plano.atalhos.map((v) => (
                  <button
                    key={v}
                    type="button"
                    aria-pressed={credito === v}
                    onClick={() => setCredito(v)}
                    className={`rounded-full border px-4 py-2 text-xs transition-colors duration-300 ${
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

            {/* destaque da campanha — mesmos números do banner Black Friday
                (data/consorcio.ts → blackFriday), para a página nunca
                mostrar dois valores diferentes para a mesma oferta */}
            {blackFriday.ativa && (
              <a
                href="#black-friday"
                className="group mt-10 block rounded-2xl border border-gold/40 bg-gold/5 p-5 transition-colors hover:bg-gold/10 lg:mt-auto"
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
            )}
          </div>

          {/* RESULTADO — formato do simulador da NBM Consórcios */}
          <div
            aria-live="polite"
            className="hairline flex flex-col rounded-3xl bg-linear-to-br from-navy-elevated to-navy-secondary p-7 md:p-10"
          >
            <dl className="flex flex-col">
              <div className="hairline-b pb-6">
                <dt className="text-sm text-silver">Parcela antes da contemplação</dt>
                <dd className="mt-2">
                  <span className="block text-sm text-ash">
                    De: <s>{brlCentavos(r.parcelaCheia)}</s>
                  </span>
                  <span className="stat-gold mt-1 block font-serif text-5xl md:text-6xl">
                    {brlCentavos(r.parcelaReduzida)}
                  </span>
                </dd>
              </div>
              <div className="hairline-b grid grid-cols-2 gap-4 py-6">
                <div>
                  <dt className="text-sm text-silver">Parcela após a contemplação</dt>
                  <dd className="mt-2 text-xl font-semibold text-fog">
                    {brlCentavos(r.parcelaCheia)}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-silver">Prazo</dt>
                  <dd className="mt-2 text-xl font-semibold text-fog">{r.prazo} meses</dd>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-6">
                <div>
                  <dt className="text-sm text-silver">No financiamento</dt>
                  <dd className="mt-2 text-xl font-semibold text-silver/70">
                    {brlCentavos(r.parcelaFinanciamento)}
                    <span className="text-xs font-normal text-ash">/mês</span>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm text-silver">Economia no período</dt>
                  <dd className="stat-gold mt-2 text-xl font-semibold">
                    {brl(Math.max(r.economia, 0))}
                  </dd>
                </div>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-3">
              <PillButton href={whatsappProposta}>
                Receber minha proposta
              </PillButton>
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
        </div>
      </Container>
    </section>
  );
}
