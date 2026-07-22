"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/animations/gsap";

/*
  TRANSIÇÃO PARA HOME (briefing): linha horizontal com "ESTRATÉGIA EM
  PRÁTICA." se expande e a composição deixa de ser experimental.
*/
export function HomeTransition() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          end: "top 25%",
          scrub: 1,
        },
      });
      tl.fromTo(
        "[data-line]",
        { scaleX: 0 },
        { scaleX: 1, ease: "power2.out", transformOrigin: "left center" },
      )
        .fromTo(
          "[data-label]",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, ease: "power2.out" },
          0.3,
        )
        // virada de tema coreografada com a MESMA timeline da linha — o
        // navy da intro se dissolve no fundo claro da home, sem corte
        .fromTo(
          section,
          { backgroundColor: "#070e14" },
          { backgroundColor: "#ffffff", ease: "power2.inOut" },
          0,
        )
        .fromTo(
          "[data-label]",
          { color: "#8c94a3" },
          { color: "#5a6678", ease: "power2.inOut" },
          0,
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-hidden className="bg-ink-950 py-24 md:py-32">
      <div className="mx-auto flex max-w-6xl items-center gap-8 px-6 md:px-10">
        <span
          data-line
          className="h-px flex-1 bg-gradient-to-r from-champagne/60 via-fog/25 to-transparent"
          style={{ transform: "scaleX(0)" }}
        />
        <span
          data-label
          className="eyebrow whitespace-nowrap"
          style={{ opacity: 0 }}
        >
          Estratégia em prática.
        </span>
      </div>
    </section>
  );
}
