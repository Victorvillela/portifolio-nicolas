"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";

/*
  Ritmo editorial entre o hero e o Ato 05 — frases de impacto simples em
  DOM, reveladas com o scroll (mesmo padrão não-pinned do HomeTransition).
  Substitui a antiga narrativa de 9 fases sincronizada ao Canvas 3D.
*/

const STATEMENTS = ["Informação não é estratégia.", "Patrimônio exige direção."];

export function ImpactStatements() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-impact-line]");
      lines.forEach((line) => {
        gsap.fromTo(
          line,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
            scrollTrigger: {
              trigger: line,
              start: "top 75%",
              end: "top 35%",
              scrub: 1,
            },
          },
        );
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Contexto"
      className="bg-ink-950 flex flex-col items-center justify-center gap-24 px-6 py-40 text-center md:gap-32 md:py-56"
    >
      {STATEMENTS.map((text) => (
        <p
          key={text}
          data-impact-line
          className="text-luminous max-w-3xl text-3xl font-medium uppercase leading-[1.12] tracking-tight opacity-0 md:text-5xl"
        >
          {text}
        </p>
      ))}
    </section>
  );
}
