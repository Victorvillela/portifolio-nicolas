"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
  ATO 01 — hero estático: imagem de fundo + overlay navy + headline.
  Sem Canvas/WebGL — só a foto, um scrim escuro para legibilidade e um
  parallax bem leve (desliga com prefers-reduced-motion).
*/
export function CinematicIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLParagraphElement>(null);
  const reducedMotion = useReducedMotion();

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
          start: "top top",
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
      className="relative h-svh overflow-hidden"
    >
      <div ref={bgRef} aria-hidden className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-bg.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* scrim navy: mais forte perto do headline, esmaece nas bordas */}
      <div aria-hidden className="hero-overlay absolute inset-0" />

      {/* marca d'água ultra sutil do símbolo NBM (briefing, FUNDO DO
          HERO): presença de marca subliminar, nunca um logo estampado
          visível — escala grande, blur pesado, opacity ≤ 0.04 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <Image
          src="/images/nbmlogo.png"
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

      <div className="relative z-10 flex h-full flex-col items-center justify-center px-6 text-center">
        <h1 className="text-luminous max-w-4xl text-4xl font-medium leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
          Seu patrimônio
          <br />
          precisa de estratégia.
        </h1>
        <p className="mt-6 font-serif text-3xl italic text-parchment md:text-5xl">
          Não de sorte.
        </p>
      </div>

      <p
        ref={indicatorRef}
        className="eyebrow pointer-events-none absolute inset-x-0 bottom-10 z-10 text-center"
      >
        Role para estruturar
      </p>
    </section>
  );
}
