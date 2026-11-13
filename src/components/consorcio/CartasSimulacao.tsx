"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { plano } from "@/data/consorcio";
import { brl, brlCentavos, simular } from "@/lib/simulacao";

/*
  Baralho de simulações do hero de /consorcios.

  Cada carta tem o formato do cartão de resultado do simulador
  (crédito, parcela antes/depois da contemplação, prazo), com os
  créditos das simulações reais (data/consorcio.ts → plano.cartasHero).
  Mesmo gesto do teaser da home: a carta da frente desliza para a
  esquerda e gira, some, e volta pelo fundo do baralho enquanto a
  próxima avança. O baralho inteiro é link para o simulador.

  - só passa de carta com o ponteiro (ou o foco do teclado) em cima —
    pedido do cliente, 2026-11-13: parado, o baralho não disputa
    atenção com o texto do hero. A 1ª troca vem logo ao entrar
    (PRIMEIRA), as seguintes a cada INTERVALO enquanto o ponteiro fica;
  - em tela de toque não há hover: o baralho fica na 1ª carta e o toque
    leva ao simulador;
  - prefers-reduced-motion: fica parado na primeira carta;
  - todas as cartas ocupam a mesma célula do grid, então a altura é a da
    maior e nada salta quando a ordem muda.
*/
const PRIMEIRA = 150;
const INTERVALO = 2400;
const SAIDA = 850;

/*
  posição no baralho (0 = frente) → transform + brilho. As de trás são
  escurecidas com brightness, não com opacity: com opacity a carta que
  avança passava a troca translúcida e mostrava o texto das de trás.
*/
/* no mobile o deslocamento é menor: a carta ocupa quase a largura toda
   e o baralho não pode sair pela borda da tela */
const POSICOES = [
  "z-30 opacity-100 brightness-100 [transform:none]",
  "z-20 opacity-100 brightness-[0.7] [transform:translate(0.6rem,1rem)_rotate(3deg)] md:[transform:translate(1.25rem,1.5rem)_rotate(4deg)]",
  "z-10 opacity-100 brightness-[0.5] [transform:translate(1.1rem,2rem)_rotate(6deg)] md:[transform:translate(2.5rem,3rem)_rotate(8deg)]",
];
const SAINDO = "z-40 opacity-0 brightness-100 [transform:translateX(-115%)_rotate(-10deg)]";

export function CartasSimulacao({ className = "" }: { className?: string }) {
  const cartas = plano.cartasHero;
  const total = cartas.length;
  const [ativa, setAtiva] = useState(0);
  const [saindo, setSaindo] = useState(false);
  const [emCima, setEmCima] = useState(false);

  useEffect(() => {
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduzir.matches || !emCima) return;

    let saida: ReturnType<typeof setTimeout> | undefined;
    let ciclo: ReturnType<typeof setInterval> | undefined;

    const passar = () => {
      setSaindo(true);
      saida = setTimeout(() => {
        saida = undefined;
        setAtiva((i) => (i + 1) % total);
        setSaindo(false);
      }, SAIDA);
    };

    const primeira = setTimeout(() => {
      passar();
      ciclo = setInterval(passar, INTERVALO);
    }, PRIMEIRA);

    return () => {
      clearTimeout(primeira);
      clearInterval(ciclo);
      // ponteiro saiu no meio de uma troca: conclui a troca em vez de
      // deixar a carta da frente presa no estado "saindo" (invisível)
      if (saida) {
        clearTimeout(saida);
        setAtiva((i) => (i + 1) % total);
        setSaindo(false);
      }
    };
  }, [emCima, total]);

  return (
    <div className={`relative mx-auto w-full max-w-md ${className}`}>
      <a
        href="#simulador"
        aria-label="Abrir o simulador de consórcio"
        onMouseEnter={() => setEmCima(true)}
        onMouseLeave={() => setEmCima(false)}
        onFocus={() => setEmCima(true)}
        onBlur={() => setEmCima(false)}
        className="group grid rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-blue-light"
      >
        {cartas.map((credito, i) => {
          const pos = (i - ativa + total) % total;
          const classe = pos === 0 && saindo ? SAINDO : POSICOES[Math.min(pos, 2)];
          return (
            <Carta
              key={credito}
              credito={credito}
              frente={pos === 0}
              className={classe}
            />
          );
        })}
      </a>

      {/* indicador do baralho + convite ao toque (o hover já diz isso no desktop) */}
      <div className="mt-14 flex items-center justify-center gap-5">
        <div aria-hidden className="flex gap-1.5">
          {cartas.map((credito, i) => (
            <span
              key={credito}
              className={`h-1 rounded-full transition-all duration-500 ${
                i === ativa ? "w-6 bg-gold" : "w-1.5 bg-silver/25"
              }`}
            />
          ))}
        </div>
        <p
          aria-hidden
          className="text-[0.62rem] font-medium uppercase tracking-[0.26em] text-ash lg:hidden"
        >
          Toque para simular →
        </p>
      </div>
    </div>
  );
}

function Carta({
  credito,
  frente,
  className,
}: {
  credito: number;
  frente: boolean;
  className: string;
}) {
  const r = simular(credito);

  return (
    <figure
      aria-hidden={!frente}
      aria-label={frente ? `Simulação de consórcio de imóvel: crédito de ${brl(credito)}` : undefined}
      className={`hairline col-start-1 row-start-1 rounded-3xl bg-linear-to-br from-navy-elevated to-navy-secondary p-7 shadow-[0_30px_80px_rgba(0,0,0,0.45)] transition-[transform,opacity,filter] duration-[850ms] ease-[cubic-bezier(0.65,0,0.35,1)] md:p-9 ${
        frente ? "group-active:scale-[0.97]" : ""
      } ${className}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Image
            src="/images/nbmlogo-transparent.png"
            alt=""
            width={40}
            height={40}
            className="h-9 w-9 object-contain"
          />
          <span className="text-[0.62rem] font-medium uppercase tracking-[0.26em] text-silver">
            Consórcio de imóvel
          </span>
        </div>
        <span className="whitespace-nowrap rounded-full bg-accent/15 px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.2em] text-accent">
          {r.prazo} meses
        </span>
      </div>

      <p className="eyebrow mt-8">Crédito</p>
      <p className="mt-1 text-3xl font-semibold text-fog md:text-4xl">{brl(credito)}</p>

      <div className="hairline-t mt-6 pt-6">
        <p className="text-sm text-silver">Parcela antes da contemplação</p>
        <p className="mt-2 text-sm text-ash">
          De: <s>{brlCentavos(r.parcelaCheia)}</s>
        </p>
        <p className="mt-1 font-serif text-5xl md:text-6xl">
          <span className="stat-gold">{brlCentavos(r.parcelaReduzida)}</span>
        </p>
        <p className="mt-3 text-[0.62rem] font-medium uppercase tracking-[0.24em] text-blue-light">
          Veja o valor da parcela que cabe no seu orçamento →
        </p>
      </div>

      <dl className="hairline-t mt-6 grid grid-cols-2 gap-4 pt-6">
        <div>
          <dt className="text-sm text-silver">Após a contemplação</dt>
          <dd className="mt-1.5 text-lg text-fog">
            {brlCentavos(r.parcelaCheia)}
          </dd>
        </div>
        <div>
          <dt className="text-sm text-silver">Juros</dt>
          <dd className="mt-1.5 text-lg text-fog">
            R$ 0
          </dd>
        </div>
      </dl>

      <figcaption className="mt-6 text-[0.65rem] leading-relaxed text-ash">
        Exemplo com base nas condições atuais do plano. Não é proposta nem
        garantia de contemplação.
      </figcaption>
    </figure>
  );
}
