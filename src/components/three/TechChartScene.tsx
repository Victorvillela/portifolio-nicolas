"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { createRandom } from "@/lib/three/noise";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
  Seção Tecnologia — "monitor" com um gráfico 3D animado (substitui a
  antiga matriz de pontos estática). Interpretação da referência dentro
  da paleta da marca NBM: barras de dados abstratas (sem semântica de
  alta/baixa — cor varia só com a altura, não com "ganho/perda") e uma
  linha de tendência com glow ondulando em loop suave por cima. Nada de
  candlestick verde/vermelho nem de estética de corretora — ver conversa
  do projeto sobre as regras de marca do briefing.
*/

const BAR_COUNT = 26;
const LINE_POINTS = 48;
const SPREAD = 2.6;
const BASE_Y = -0.75;

function buildBars() {
  const random = createRandom(4242);
  const bars: { x: number; h: number; color: THREE.Color }[] = [];
  for (let i = 0; i < BAR_COUNT; i++) {
    const x = -SPREAD / 2 + (SPREAD * i) / (BAR_COUNT - 1);
    // altura pseudo-orgânica: duas frequências sobrepostas + ruído leve
    const wave =
      0.5 + 0.32 * Math.sin(i * 0.7 + 0.4) + 0.18 * Math.sin(i * 1.9 - 1.1);
    const h = THREE.MathUtils.clamp(wave, 0.16, 1) * (0.65 + 0.2 * random());
    const t = THREE.MathUtils.clamp(h / 0.85, 0, 1);
    const color = new THREE.Color("#1e3a6e").lerp(
      new THREE.Color("#8fb8e8"),
      t,
    );
    bars.push({ x, h, color });
  }
  return bars;
}

function ChartContent({ reducedMotion }: { reducedMotion: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const bars = useMemo(() => buildBars(), []);

  // construído uma vez; a mutação por frame (useFrame) acontece através
  // de uma ref, nunca direto no valor devolvido pelo useMemo (mesmo
  // padrão já usado em GrowthChart.tsx neste projeto)
  const built = useMemo(() => {
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(LINE_POINTS * 3), 3),
    );
    const glowGeometry = new THREE.BufferGeometry();
    glowGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(LINE_POINTS * 3), 3),
    );

    // linha nítida + duplicata levemente atrás em aditivo — glow barato,
    // sem precisar de post-processing/shader dedicado nesta cena pequena
    const line = new THREE.Line(
      lineGeometry,
      new THREE.LineBasicMaterial({
        color: "#f2f4f7",
        transparent: true,
        opacity: 0.95,
      }),
    );
    const glowLine = new THREE.Line(
      glowGeometry,
      new THREE.LineBasicMaterial({
        color: "#8fb8e8",
        transparent: true,
        opacity: 0.45,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    line.frustumCulled = false;
    glowLine.frustumCulled = false;
    return { line, glowLine, lineGeometry, glowGeometry };
  }, []);

  const refs = useRef<typeof built | null>(null);

  useEffect(() => {
    refs.current = built;
    return () => {
      refs.current = null;
    };
  }, [built]);

  useEffect(() => {
    return () => {
      built.lineGeometry.dispose();
      built.glowGeometry.dispose();
      (built.line.material as THREE.Material).dispose();
      (built.glowLine.material as THREE.Material).dispose();
    };
  }, [built]);

  useFrame((state) => {
    const b = refs.current;
    if (!b) return;
    const t = state.clock.elapsedTime;
    if (groupRef.current && !reducedMotion) {
      groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.12;
    }

    // linha de tendência: ondulação puramente periódica (sem "corte" ao
    // reiniciar) — sobe e ondula em loop de ~11s
    const speed = reducedMotion ? 0 : (Math.PI * 2) / 11;
    const posAttr = b.lineGeometry.attributes.position as THREE.BufferAttribute;
    const glowAttr = b.glowGeometry.attributes.position as THREE.BufferAttribute;
    for (let i = 0; i < LINE_POINTS; i++) {
      const x = -SPREAD / 2 + (SPREAD * i) / (LINE_POINTS - 1);
      const y =
        0.55 +
        Math.sin(x * 1.6 + t * speed) * 0.18 +
        Math.sin(x * 3.1 - t * speed * 1.7 + 1.3) * 0.08;
      posAttr.setXYZ(i, x, BASE_Y + y, 0.06);
      glowAttr.setXYZ(i, x, BASE_Y + y, 0.05);
    }
    posAttr.needsUpdate = true;
    glowAttr.needsUpdate = true;
  });

  return (
    <group ref={groupRef}>
      {bars.map((b, i) => (
        <mesh key={i} position={[b.x, BASE_Y + b.h / 2, 0]}>
          <boxGeometry args={[0.062, b.h, 0.062]} />
          <meshBasicMaterial color={b.color} transparent opacity={0.85} />
        </mesh>
      ))}
      <primitive object={built.line} />
      <primitive object={built.glowLine} />
    </group>
  );
}

/*
  Canvas próprio, montado só quando a seção está visível
  (IntersectionObserver) — nunca competir por ciclos de render fora de
  tela.
*/
export function TechChartScene({ className = "" }: { className?: string }) {
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

  return (
    <div ref={holderRef} aria-hidden className={className}>
      {visible && (
        <Canvas
          camera={{ fov: 38, near: 0.1, far: 10, position: [0, 0.15, 3.4] }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true, powerPreference: "default" }}
          style={{ position: "absolute", inset: 0 }}
        >
          <ChartContent reducedMotion={reducedMotion} />
        </Canvas>
      )}
    </div>
  );
}
