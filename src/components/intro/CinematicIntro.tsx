"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { ctaLabels, site } from "@/data/site";
import { metrics } from "@/data/metrics";
import { PillButton } from "@/components/ui/PillButton";

/*
  ATO 01 — hero: vídeo de fundo (mudo) + overlay navy + headline.
  Sem Canvas/WebGL — o vídeo, um scrim escuro para legibilidade e um
  parallax bem leve (desliga com prefers-reduced-motion). hero-bg.png
  cobre o poster/fallback caso o vídeo falhe (ver videoMissing).

  LOOP SEM CORTE — por que dois <video> em vez de `loop`:
  o atributo loop nativo salta do último frame para o primeiro num único
  tick, e o player pisca (frame preto) enquanto redecodifica o início.
  Aqui dois elementos idênticos se revezam: quando o ativo entra nos
  últimos LEAD_SECONDS, o standby começa do zero e os dois trocam de
  opacidade em CROSSFADE_SECONDS. O corte cai no meio de um crossfade,
  onde não há como percebê-lo.
*/

// quanto antes do fim o standby entra (o arquivo tem ~6s)
const LEAD_SECONDS = 1.5;
// duração do crossfade — precisa ser < LEAD_SECONDS para terminar antes
// de o ativo acabar
const CROSSFADE_SECONDS = 1.2;
// leve slow-motion: dá leitura cinematográfica sem parecer travado
const PLAYBACK_RATE = 0.9;
// HAVE_FUTURE_DATA — standby tem frames decodificados suficientes para
// entrar sem engasgar
const READY_ENOUGH = 3;
// derivado de CROSSFADE_SECONDS para o CSS e o setTimeout do swap nunca
// divergirem
const CROSSFADE_TRANSITION = `opacity ${CROSSFADE_SECONDS}s ease-in-out`;

export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoARef = useRef<HTMLVideoElement>(null);
  const videoBRef = useRef<HTMLVideoElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const [videoMissing, setVideoMissing] = useState(false);

  /*
    Revezamento A/B. Toda a manipulação é feita direto no DOM via refs:
    um setState por timeupdate re-renderizaria a seção ~4x/s à toa.
  */
  useEffect(() => {
    const a = videoARef.current;
    const b = videoBRef.current;
    if (!a || !b || videoMissing) return;

    let active = a;
    let standby = b;
    let swapping = false;
    let swapTimer: ReturnType<typeof setTimeout> | undefined;
    let cancelled = false;

    for (const v of [a, b]) v.playbackRate = PLAYBACK_RATE;

    // play() rejeita se a aba estiver em background ou a política de
    // autoplay barrar — silencioso de propósito, o fallback cobre
    const safePlay = (v: HTMLVideoElement) => {
      const p = v.play();
      if (p) p.catch(() => {});
    };

    const beginSwap = () => {
      swapping = true;
      const outgoing = active;
      const incoming = standby;

      incoming.currentTime = 0;
      safePlay(incoming);

      // dispara a transição CSS de opacidade nos dois sentidos
      incoming.style.opacity = "1";
      outgoing.style.opacity = "0";

      // papéis já invertem aqui: o timeupdate do novo ativo é quem
      // comanda o próximo ciclo
      active = incoming;
      standby = outgoing;

      swapTimer = setTimeout(() => {
        if (cancelled) return;
        // outgoing já está invisível — parar e rebobinar deixa o
        // elemento pronto (frame 0 decodificado) para o próximo turno
        outgoing.pause();
        outgoing.currentTime = 0;
        swapping = false;
      }, CROSSFADE_SECONDS * 1000);
    };

    const handleTimeUpdate = () => {
      if (swapping || cancelled) return;
      const v = active;
      if (!v.duration || Number.isNaN(v.duration)) return;
      if (v.duration - v.currentTime > LEAD_SECONDS) return;

      // conexão lenta: se o standby ainda não decodificou, adiar. O
      // próximo timeupdate tenta de novo; se o tempo acabar antes, o
      // handler de "ended" segura o loop. Nunca mostrar tela preta.
      if (standby.readyState < READY_ENOUGH) return;

      beginSwap();
    };

    // rede de segurança: sem `loop` nativo, um standby que nunca ficou
    // pronto deixaria o ativo congelado no último frame. Um corte seco
    // aqui é pior que o crossfade, mas melhor que o vídeo parar.
    const handleEnded = () => {
      if (cancelled || swapping) return;
      active.currentTime = 0;
      safePlay(active);
    };

    a.addEventListener("timeupdate", handleTimeUpdate);
    b.addEventListener("timeupdate", handleTimeUpdate);
    a.addEventListener("ended", handleEnded);
    b.addEventListener("ended", handleEnded);

    safePlay(a);

    return () => {
      cancelled = true;
      if (swapTimer) clearTimeout(swapTimer);
      a.removeEventListener("timeupdate", handleTimeUpdate);
      b.removeEventListener("timeupdate", handleTimeUpdate);
      a.removeEventListener("ended", handleEnded);
      b.removeEventListener("ended", handleEnded);
    };
  }, [videoMissing]);

  useEffect(() => {
    const section = sectionRef.current;
    const indicator = indicatorRef.current;
    if (!section || !indicator) return;

    const ctx = gsap.context(() => {
      gsap.to(indicator, {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          /* "bottom bottom" = o instante em que a base da seção (onde a
             barra de métricas se apoia) alcança a base da tela. Quando o
             hero tem exatamente 100svh isso é o mesmo ponto que
             "top top" — desktop segue idêntico. No mobile, onde a seção
             pode passar de uma tela, é o que impede a barra de já entrar
             desbotada: ela só começa a esmaecer depois de aparecer
             inteira. */
          start: "bottom bottom",
          end: "+=320",
          scrub: true,
        },
      });

      if (!reducedMotion && bgRef.current) {
        gsap.fromTo(
          bgRef.current,
          { yPercent: -4 },
          {
            yPercent: 4,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      }
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="inicio"
      aria-label="Introdução"
      /* ≥768px: altura travada em 1 viewport, como sempre foi.
         <768px: min-h — o conteúdo do hero (título em clamp, dois botões
         empilhados, três badges quebrando em várias linhas e a barra de
         métricas em coluna) passa de 100svh numa tela estreita, e com
         altura fixa o overflow-hidden cortava a base ("Clientes
         atendidos" e as métricas seguintes). O overflow-hidden continua
         aqui de propósito: quem ele precisa cortar é o fundo em
         scale-110 do parallax, não o conteúdo. */
      className="relative min-h-svh overflow-hidden md:h-svh"
    >
      <div
        ref={bgRef}
        aria-hidden
        className="absolute inset-0 scale-110 bg-cover bg-center"
        // hero-bg.png (mesmo frame do poster) fica atrás do <video>: no
        // instante em que o loop reinicia, o navegador pode levar 1-2
        // frames para decodificar a nova imagem, e a opacity do vídeo
        // volta a 1 assim que currentTime zera — sem esse fundo, esse
        // gap piscava preto.
        style={
          videoMissing
            ? undefined
            : { backgroundImage: "url(/images/hero-bg.png)" }
        }
      >
        {videoMissing ? (
          <Image
            src="/images/hero-bg.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : (
          /*
            A e B ocupam exatamente a mesma caixa. B nasce com opacity 0
            e parado no frame 0; o efeito acima é quem os alterna. Sem
            `loop` — o revezamento substitui o loop nativo.
            A duração da transição vem de CROSSFADE_SECONDS, então os
            dois valores nunca saem de sincronia.
          */
          <>
            <video
              ref={videoARef}
              autoPlay
              muted
              playsInline
              preload="auto"
              poster="/images/hero-bg.png"
              onError={() => setVideoMissing(true)}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 1, transition: CROSSFADE_TRANSITION }}
            >
              <source src={site.heroVideoSrc} type="video/mp4" />
            </video>
            <video
              ref={videoBRef}
              muted
              playsInline
              preload="auto"
              poster="/images/hero-bg.png"
              onError={() => setVideoMissing(true)}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ opacity: 0, transition: CROSSFADE_TRANSITION }}
            >
              <source src={site.heroVideoSrc} type="video/mp4" />
            </video>
          </>
        )}
      </div>

      {/* scrim navy: mais forte perto do headline, esmaece nas bordas */}
      <div aria-hidden className="hero-overlay absolute inset-0" />

      {/* degradê da base: vídeo → navy sólido (o hero nunca clareia;
          a barra de métricas se apoia na parte 100% navy — ver
          .hero-fade-bottom) */}
      <div
        aria-hidden
        className="hero-fade-bottom pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[38vh] max-md:h-[55vh]"
      />

      {/* marca d'água ultra sutil do símbolo NBM (briefing, FUNDO DO
          HERO): presença de marca subliminar, nunca um logo estampado
          visível — escala grande, blur pesado, opacity ≤ 0.04 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/nbmlogo-transparent.png"
          alt=""
          width={150}
          height={150}
          className="select-none"
          style={{
            width: "min(90vw, 1100px)",
            height: "min(90vw, 1100px)",
            opacity: 0.04,
            filter: "blur(80px)",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Composição estilo Verso: conteúdo alinhado à esquerda, respiro
          generoso — título (valor em dourado), botões, badges, e a barra
          de métricas apoiada na área já 100% navy do degradê. */}
      {/* max-md:min-h-svh acompanha a seção: com a altura livre no mobile,
          o h-full (percentual sobre altura auto) não vale mais nada, e é
          o min-h daqui que garante o hero ocupando pelo menos uma tela
          cheia — e o espaço livre que o my-auto abaixo distribui. */}
      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col px-6 pt-28 max-md:min-h-svh md:px-10">
        <div className="my-auto max-w-3xl">
          {/* três níveis: bold branco > bold prata > serifada itálica
              menor (~38% do título). clamp() mantém a hierarquia no
              mobile sem quebrar o alinhamento à esquerda. */}
          <h1
            className="font-bold leading-[1.08] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
          >
            <span className="block text-fog">{site.heroTitle.line1}</span>
            <span className="block text-silver">{site.heroTitle.line2}</span>
          </h1>
          <p
            className="mt-7 font-serif italic text-silver/85"
            style={{ fontSize: "clamp(1.1rem, 2.3vw, 1.7rem)" }}
          >
            {site.heroTitle.line3}
          </p>

          {/* outline (borda prata) + CTA verde preenchido, lado a lado;
              empilham em full-width no mobile */}
          <div className="mt-12 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PillButton
              href={site.scheduleUrl}
              variant="outline"
              className="w-full sm:w-auto"
            >
              {ctaLabels.heroOutline}
            </PillButton>
            <PillButton href={site.scheduleUrl} className="w-full sm:w-auto">
              {ctaLabels.heroPrimary}
            </PillButton>
          </div>

          {/* badges de destaque — discretos, marcador verde da marca */}
          <ul className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
            {site.heroBadges.map((badge) => (
              <li
                key={badge}
                className="flex items-center gap-2.5 text-[0.7rem] uppercase tracking-[0.18em] text-silver/90"
              >
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-accent"
                />
                {badge}
              </li>
            ))}
          </ul>
        </div>

        {/* Barra de métricas (ref. Verso): números dourados + label prata
            em caixa alta, filetes verticais entre blocos, sem card — os
            números flutuam direto sobre o navy sólido do degradê.
            Mesmos dados reais de data/metrics.ts usados na MetricsSection
            (regra do briefing: nada de números inventados). Esmaece ao
            rolar (tween do indicatorRef). */}
        {/* mobile: mt-10 separa o "+200" da lista de badges logo acima
            (sem folga livre para o my-auto distribuir, os dois blocos
            encostavam) e pb-16 devolve respiro na base da tela. */}
        <div
          ref={indicatorRef}
          className="pointer-events-none pb-12 max-md:mt-10 max-md:pb-16"
        >
          <dl className="flex flex-col gap-6 sm:flex-row sm:gap-0 sm:divide-x sm:divide-white/15">
            {metrics.map((metric, i) => (
              <div
                key={metric.label}
                className={`text-left sm:px-12 md:px-16 ${i === 0 ? "sm:pl-0 md:pl-0" : ""}`}
              >
                <dd className="stat-gold font-serif text-3xl md:text-4xl">
                  {metric.value}
                </dd>
                <dt className="mt-2 text-[0.62rem] uppercase tracking-[0.26em] text-silver/90">
                  {metric.label}
                </dt>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
