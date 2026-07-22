"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
  "Chuva de dados" atrás/ao lado do monitor 3D — mesma ideia estrutural
  do efeito Matrix (colunas de caracteres caindo, cauda esmaecendo), mas
  em azul gelo/navy dessaturado (paleta NBM), nunca verde. Canvas 2D
  simples — não precisa ser 3D (briefing desta seção). Pausa via
  IntersectionObserver e respeita prefers-reduced-motion.
*/

const CHARS = "01";
const FONT_SIZE = 14;
const COLUMN_COLORS = ["#8fb8e8", "#5a6678", "#c7dcf5"];

export function DataRainOverlay({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const holderRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = holderRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "10%" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || reducedMotion) return;
    const canvas = canvasRef.current;
    const holder = holderRef.current;
    if (!canvas || !holder) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let columns = 0;
    let drops: number[] = [];
    let colColor: string[] = [];

    const setup = () => {
      const rect = holder.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.round(rect.width * dpr);
      height = Math.round(rect.height * dpr);
      canvas.width = width;
      canvas.height = height;
      columns = Math.max(4, Math.floor((rect.width * dpr) / FONT_SIZE));
      drops = Array.from({ length: columns }, () => Math.random() * -height);
      colColor = Array.from(
        { length: columns },
        () => COLUMN_COLORS[Math.floor(Math.random() * COLUMN_COLORS.length)],
      );
      ctx.font = `${FONT_SIZE}px var(--font-geist), monospace`;
    };

    setup();
    const onResize = () => setup();
    window.addEventListener("resize", onResize);

    let last = performance.now();
    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      const delta = now - last;
      if (delta < 55) return; // ~18fps — efeito discreto não precisa de 60fps
      last = now;

      // fade sutil do frame anterior (deixa rastro na cor de fundo do card)
      ctx.fillStyle = "rgba(7, 12, 20, 0.18)";
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)];
        const x = i * FONT_SIZE;
        const y = drops[i];
        ctx.fillStyle = colColor[i];
        ctx.globalAlpha = 0.5;
        ctx.fillText(char, x, y);

        if (y > height && Math.random() > 0.975) {
          drops[i] = Math.random() * -100;
        } else {
          drops[i] += FONT_SIZE * 0.85;
        }
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [visible, reducedMotion]);

  return (
    <div ref={holderRef} aria-hidden className={className}>
      <canvas
        ref={canvasRef}
        style={{ width: "100%", height: "100%", display: "block" }}
      />
    </div>
  );
}
