"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { site } from "@/data/site";

/*
  ATO 07 — VÍDEO CINEMATOGRÁFICO.
  Card cresce 20vw → 90vw com o scroll (tratamento da Referência B:
  cantos arredondados, play circular translúcido, moldura sutil).
  Sem autoplay com áudio; controles só depois do play do usuário.
  Placeholder: /public/videos/manifesto.mp4 (TODO: vídeo real).
*/
export function CinematicVideo() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoMissing, setVideoMissing] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!section || !card) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        card,
        { width: "20vw", borderRadius: 24 },
        {
          width: "90vw",
          borderRadius: 12,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "bottom bottom",
            scrub: reducedMotion ? true : 0.8,
          },
        },
      );
    }, section);

    return () => ctx.revert();
  }, [reducedMotion]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.muted = false;
      void video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      aria-label="Vídeo"
      className="relative bg-ink-950"
      style={{ height: "260svh" }}
    >
      <div className="sticky top-0 flex h-svh flex-col items-center justify-center overflow-hidden">
        <p className="eyebrow mb-8">Antes de falar sobre investimentos...</p>

        <div
          ref={cardRef}
          className="relative aspect-video max-w-[90vw] overflow-hidden"
          style={{ width: "20vw", borderRadius: 24, minWidth: "280px" }}
        >
          {videoMissing ? (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-ink-800 via-ink-900 to-ink-950">
              <span className="eyebrow">Vídeo institucional</span>
              <span className="font-mono text-xs text-ash/60">
                /public/videos/manifesto.mp4
              </span>
            </div>
          ) : (
            <video
              ref={videoRef}
              src={site.manifestoVideoSrc}
              muted
              loop
              playsInline
              controls={playing}
              onError={() => setVideoMissing(true)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              className="h-full w-full object-cover"
              style={{
                filter: playing
                  ? "none"
                  : "grayscale(0.4) contrast(1.08) brightness(0.85)",
              }}
            />
          )}

          {/* moldura sutil */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              borderRadius: "inherit",
              boxShadow: "inset 0 0 0 1px rgba(242,244,247,0.1)",
            }}
          />

          {/* play circular translúcido (Referência B) */}
          {!playing && !videoMissing && (
            <button
              type="button"
              onClick={togglePlay}
              aria-label="Reproduzir vídeo"
              className="group absolute inset-0 flex items-center justify-center"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-fog/20 bg-ink-950/50 backdrop-blur-md transition-transform duration-300 group-hover:scale-110 md:h-20 md:w-20">
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="ml-1 h-6 w-6 fill-fog"
                >
                  <path d="M8 5.5v13l11-6.5z" />
                </svg>
              </span>
            </button>
          )}
        </div>

        <p className="mt-8 font-serif text-xl italic text-parchment md:text-2xl">
          Precisamos falar sobre decisões.
        </p>
      </div>
    </section>
  );
}
