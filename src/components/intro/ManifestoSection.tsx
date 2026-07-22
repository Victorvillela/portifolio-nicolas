"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
  ATO 06 — MANIFESTO.
  Tipografia gigante sincronizada com o scroll; revelação por máscara,
  peso e tracking — movimento contido, sem animação chamativa.
*/

const LINES: { text: string; serif?: boolean }[] = [
  { text: "Eu não prevejo o mercado." },
  { text: "Eu analiso cenários." },
  { text: "Estruturo decisões." },
  { text: "E construo estratégias." },
  { text: "Para o longo prazo.", serif: true },
];

export function ManifestoSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const lines = gsap.utils.toArray<HTMLElement>("[data-manifesto-line]");
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          scrub: reducedMotion ? true : 1,
        },
        defaults: { ease: "power2.out" },
      });

      lines.forEach((line, i) => {
        const at = 0.06 + i * 0.17;
        tl.fromTo(
          line,
          { opacity: 0.08, clipPath: "inset(0 88% 0 0)", x: -14 },
          { opacity: 1, clipPath: "inset(0 0% 0 0)", x: 0, duration: 0.14 },
          at,
        );
      });
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      aria-label="Manifesto"
      className="relative bg-ink-950"
      style={{ height: "300svh" }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-start justify-center gap-3 overflow-hidden px-6 md:gap-5 md:px-16 lg:px-24">
        {LINES.map((line) => (
          <p
            key={line.text}
            data-manifesto-line
            className={
              line.serif
                ? "font-serif text-4xl italic leading-tight text-parchment md:text-6xl lg:text-7xl"
                : "text-luminous text-4xl font-semibold uppercase leading-tight tracking-tight md:text-6xl lg:text-7xl"
            }
            style={{ opacity: 0.08 }}
          >
            {line.text}
          </p>
        ))}
      </div>
    </section>
  );
}
