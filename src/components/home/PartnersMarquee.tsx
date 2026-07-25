"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { partners } from "@/data/partners";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";

/*
  Parceiros — esteira contínua de logos sobre navy.

  Mecânica do loop: o trilho carrega a lista DUPLICADA e desliza até
  translateX(-50%), onde a 2ª cópia assume exatamente a posição da 1ª.
  O espaçamento "de saída" de cada cópia é padding-right do grupo (e não
  gap do trilho) justamente para que -50% seja exato — ver globals.css.

  Quantidade de repetições: um grupo PRECISA ser mais largo que a tela,
  senão sobra um vão visível antes da 2ª cópia entrar. Um número fixo não
  serve — num monitor ultrawide (3440px) o mesmo valor que basta num
  notebook deixa quase 900px de buraco. Por isso o ciclo é medido em
  runtime e as repetições são calculadas a partir da largura real da
  faixa; em resize, recalcula.
*/

// repetições do 1º render (SSR) — trocadas pela medição no cliente
const CICLOS_INICIAIS = 4;

export function PartnersMarquee() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const cycleRef = useRef<HTMLDivElement>(null);
  const [cycles, setCycles] = useState(CICLOS_INICIAIS);

  useEffect(() => {
    const medir = () => {
      const viewport = viewportRef.current;
      const cycle = cycleRef.current;
      if (!viewport || !cycle) return;

      const larguraCiclo = cycle.getBoundingClientRect().width;
      if (!larguraCiclo) return;
      // gap real em px (o token está em rem, não dá pra parseFloat direto)
      const gap = parseFloat(getComputedStyle(cycle).columnGap) || 0;
      const larguraFaixa = viewport.getBoundingClientRect().width;

      // +1 ciclo de folga: garante que a 2ª cópia já esteja cobrindo a
      // borda direita no instante em que a 1ª termina de sair
      const necessarios =
        Math.ceil(larguraFaixa / (larguraCiclo + gap)) + 1;
      setCycles((atual) => (necessarios > atual ? necessarios : atual));
    };

    medir();
    window.addEventListener("resize", medir);
    // as imagens mudam a largura do ciclo ao decodificar
    const ro = new ResizeObserver(medir);
    if (cycleRef.current) ro.observe(cycleRef.current);
    return () => {
      window.removeEventListener("resize", medir);
      ro.disconnect();
    };
  }, []);

  const renderCycle = (copy: number, cycle: number) => {
    const original = copy === 0 && cycle === 0;
    return (
      <div
        key={cycle}
        ref={original ? cycleRef : undefined}
        className="marquee-partners__cycle"
      >
        {partners.map((partner, i) => (
          /* divisor vertical entre blocos (1px, branco 20%), como na
             referência — a borda vive no próprio item, então entra e
             sai junto com ele na esteira */
          <div
            key={i}
            className="flex shrink-0 items-center gap-5 border-l border-white/20 pl-12 md:gap-6 md:pl-14"
          >
            {partner.icon && (
              <Image
                src={partner.icon.src}
                alt={original ? partner.label : ""}
                width={partner.icon.width}
                height={partner.icon.height}
                /* eager: numa esteira em movimento o lazy-load faria os
                   símbolos "pipocarem" ao entrar em quadro */
                loading="eager"
                /* altura fixa + object-contain normaliza o tamanho
                   óptico entre símbolos de proporções diferentes; o
                   filtro só entra na arte escura (ver tint) */
                className={`h-8 w-auto shrink-0 object-contain md:h-11 ${
                  partner.icon.tint === "invert" ? "brightness-0 invert" : ""
                }`}
              />
            )}

            <div className="text-left">
              {partner.titleLines.map((linha) => (
                <p
                  key={linha}
                  className="whitespace-nowrap text-xs font-semibold uppercase leading-snug tracking-[0.2em] text-fog md:text-sm"
                >
                  {linha}
                </p>
              ))}
              {partner.caption && (
                <p className="mt-1.5 whitespace-nowrap text-[0.7rem] tracking-[0.14em] text-silver/70 md:text-xs">
                  {partner.caption}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderGroup = (copy: number) => (
    <div className="marquee-partners__group" aria-hidden={copy > 0}>
      {Array.from({ length: cycles }, (_, cycle) => renderCycle(copy, cycle))}
    </div>
  );

  return (
    <section
      aria-label="Parceiros"
      className="hairline-t bg-ink-950 py-16 md:py-20"
    >
      <Container>
        <p className="eyebrow text-center">Parceiros</p>
      </Container>

      {/* lista duplicada na íntegra: [grupo, grupo] — o -50% do keyframe
          cai exatamente no início visual */}
      <div ref={viewportRef} className="marquee-viewport mt-12">
        <div className="marquee-partners">
          {renderGroup(0)}
          {renderGroup(1)}
        </div>
      </div>

      <Container>
        <p className="mt-12 text-center text-xs tracking-wide text-silver/60">
          {site.xpDisclosure}
        </p>
      </Container>
    </section>
  );
}
