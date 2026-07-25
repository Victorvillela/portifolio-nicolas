"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
  Instância ativa do Lenis, exposta para quem precisa PAUSAR a rolagem —
  hoje o menu mobile do header, que trava o fundo enquanto está aberto.
  `body { overflow: hidden }` sozinho não basta: o Lenis escuta wheel e
  touch na window e reposiciona a página por conta própria, então a trava
  precisa ser pedida a ele também.

  É null quando o usuário pede menos movimento (aí não existe Lenis) — por
  isso quem consome trata a ausência, em vez de assumir a instância.
*/
const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

/*
  Lenis dirigido pelo ticker do GSAP — fonte única de RAF, mantendo
  ScrollTrigger e smooth scroll perfeitamente sincronizados (briefing).
*/
export function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const [lenisAtivo, setLenisAtivo] = useState<Lenis | null>(null);

  useEffect(() => {
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      anchors: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    setLenisAtivo(lenis);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenisAtivo(null);
    };
  }, [reducedMotion]);

  return (
    <LenisContext.Provider value={lenisAtivo}>{children}</LenisContext.Provider>
  );
}
