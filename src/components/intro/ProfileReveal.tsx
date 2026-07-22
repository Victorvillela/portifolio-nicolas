"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/data/site";

/*
  ATO 05 — REVELAÇÃO.
  Card de vídeo cresce de pequeno para quase tela cheia com o scroll
  (mesma lógica do Ato 07/CinematicVideo) — sem máscara/projeção 3D.
  Vídeo placeholder: /public/videos/profile-reveal.mp4
  (TODO: substituir pelo vídeo real — nunca gerar pessoa fictícia).
*/
export function ProfileReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const introTextRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const youRef = useRef<HTMLDivElement>(null);
  const identityRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [videoMissing, setVideoMissing] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: reducedMotion ? true : 1,
        },
        defaults: { ease: "none" },
      });

      // Ato 04 → frase ponte
      tl.fromTo(
        introTextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.08 },
        0.0,
      )
        .to(introTextRef.current, { opacity: 0, y: -24, duration: 0.06 }, 0.12)
        // card cresce de pequeno pra quase tela cheia (mesma lógica do Ato 07)
        .fromTo(
          cardRef.current,
          { width: "22vw", borderRadius: 24 },
          { width: "92vw", borderRadius: 12, duration: 0.44 },
          0.14,
        )
        // VOCÊ.
        .fromTo(
          youRef.current,
          { opacity: 0, letterSpacing: "0.5em" },
          { opacity: 1, letterSpacing: "0.06em", duration: 0.1 },
          0.62,
        )
        .to(youRef.current, { opacity: 0, duration: 0.08 }, 0.78)
        // bloco de identidade
        .fromTo(
          identityRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
          0.88,
        );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  // parallax sutil do vídeo + glow acompanhando o cursor (5–10px, briefing)
  useEffect(() => {
    if (reducedMotion) return;
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const tick = () => {
      raf = 0;
      cx += (tx - cx) * 0.06;
      cy += (ty - cy) * 0.06;
      card.style.translate = `${(cx * 8).toFixed(2)}px ${(cy * 6).toFixed(2)}px`;
      glow.style.background = `radial-gradient(600px circle at ${((tx + 1) * 50).toFixed(1)}% ${((ty + 1) * 50).toFixed(1)}%, rgba(143,184,232,0.07), transparent 65%)`;
      if (Math.abs(tx - cx) + Math.abs(ty - cy) > 0.002) {
        raf = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Apresentação"
      className="relative bg-ink-950"
      style={{ height: "260svh" }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        {/* frase ponte (Ato 04) */}
        <div
          ref={introTextRef}
          className="absolute inset-0 z-10 flex items-center justify-center px-6 text-center opacity-0"
        >
          <p className="max-w-3xl text-2xl font-medium uppercase leading-snug tracking-tight text-fog md:text-4xl">
            Mas toda estratégia precisa de{" "}
            <span className="font-serif normal-case italic text-parchment">
              alguém por trás dela.
            </span>
          </p>
        </div>

        {/* card de vídeo — cresce com o scroll */}
        <div
          ref={cardRef}
          className="relative aspect-video max-w-[92vw] overflow-hidden"
          style={{ width: "22vw", borderRadius: 24, minWidth: "280px" }}
        >
          {videoMissing ? (
            /* placeholder até o vídeo real existir */
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
              <span className="eyebrow">Retrato em movimento</span>
              <span className="font-mono text-xs text-ash/60">
                /public/videos/profile-reveal.mp4
              </span>
            </div>
          ) : (
            <video
              src={site.profileRevealVideoSrc}
              muted
              loop
              autoPlay
              playsInline
              onError={() => setVideoMissing(true)}
              className="h-full w-full object-cover"
              style={{
                filter: "grayscale(0.55) contrast(1.12) brightness(0.82)",
              }}
            />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: "inherit",
              boxShadow: "inset 0 0 0 1px rgba(242,244,247,0.08)",
              background:
                "linear-gradient(to top, rgba(7,14,20,0.55), transparent 40%)",
            }}
          />

          {/* glow discreto acompanhando o cursor */}
          <div ref={glowRef} aria-hidden className="pointer-events-none absolute inset-0" />

          {/* VOCÊ. */}
          <div
            ref={youRef}
            className="absolute inset-0 flex items-center justify-center opacity-0"
          >
            <p className="text-luminous text-6xl font-semibold uppercase tracking-tight md:text-8xl">
              Você.
            </p>
          </div>

          {/* identidade — respeitando espaço negativo, fora do rosto */}
          <div
            ref={identityRef}
            className="absolute inset-x-0 bottom-0 z-10 flex flex-col gap-6 p-8 opacity-0 md:flex-row md:items-end md:justify-between md:p-14"
          >
            <div>
              <p className="font-serif text-2xl italic text-parchment md:text-3xl">
                Prazer, {site.name.split(" ")[0]}.
              </p>
              <p className="mt-2 text-xl font-medium text-fog md:text-3xl">
                {site.name}
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ash">
                {site.headline}
              </p>
            </div>
            <div className="eyebrow flex flex-col gap-2 text-right">
              <span>Estratégia.</span>
              <span>Tecnologia.</span>
              <span>Patrimônio.</span>
            </div>
          </div>
        </div>
      </div>

      {/* mensagem principal — bloco editorial abaixo da revelação */}
      <div className="relative z-10 mx-auto max-w-3xl px-6 pb-32 pt-10 text-center md:pb-44">
        <p className="text-2xl font-medium leading-snug text-fog md:text-4xl">
          Eu acredito que patrimônio não é construído tentando prever cada
          movimento do mercado.
        </p>
        <p className="mt-8 font-serif text-2xl italic leading-snug text-parchment md:text-4xl">
          É construído tomando decisões melhores, repetidamente, ao longo do
          tempo.
        </p>
        <p className="mt-8 text-lg leading-relaxed text-ash md:text-xl">
          Meu trabalho é transformar complexidade em direção.
        </p>
      </div>
    </section>
  );
}
