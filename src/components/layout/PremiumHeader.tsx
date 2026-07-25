"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { headerNav, site, ctaLabels } from "@/data/site";
import { PillButton } from "@/components/ui/PillButton";

/*
  Header flutuante em TRÊS ZONAS dentro de um container centralizado
  (max-w-7xl = 1280px, padding lateral de 32px):

      [emblema]      [Início Sobre Serviços FAQ]      [CTA]
       flex-1                 centro                  flex-1

  As zonas externas usam flex-1, então o grupo de links cai no centro
  óptico real do container em qualquer largura. A versão anterior
  quebrava os links em dois grupos com justify-self start/end e uma
  coluna central vazia — era isso que abria o vão em telas largas.

  O emblema é posicionado em absolute (fora do fluxo) para poder animar
  entre dois estados sem deslocar as demais zonas:
    - hero  → grande e centralizado, links ocultos (momento de marca)
    - resto → retraído à esquerda, os 4 links revelados no centro
  A fronteira entre os dois é a mesma que troca o tema do header
  ([data-theme-boundary], ver InstitutionalHero), então logo, links e
  fundo navy mudam todos no mesmo ponto.
*/
export function PremiumHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [activeHref, setActiveHref] = useState<string>(headerNav[0].href);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let raf = 0;
    let lastScrolled: boolean | null = null;
    let lastTheme: string | null = null;
    // posição onde o conteúdo claro começa ([data-theme-boundary], ver
    // InstitutionalHero — primeira seção clara após o hero navy) —
    // medida uma vez e no resize, nunca por frame de scroll
    let lightBoundary = Infinity;

    const measureBoundary = () => {
      const boundary = document.querySelector("[data-theme-boundary]");
      lightBoundary = boundary
        ? boundary.getBoundingClientRect().top + window.scrollY
        : Infinity;
    };

    const update = () => {
      raf = 0;
      const scrolled = window.scrollY > 24;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        el.dataset.scrolled = String(scrolled);
      }
      // troca um pouco antes da fronteira (header já flutua sobre a seção)
      const pastHero = window.scrollY + 72 >= lightBoundary;
      const theme = pastHero ? "light" : "dark";
      if (theme !== lastTheme) {
        lastTheme = theme;
        el.dataset.theme = theme;
        setExpanded(!pastHero);
      }
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measureBoundary();
      if (!raf) raf = requestAnimationFrame(update);
    };

    measureBoundary();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Remede depois que a página termina de carregar (fontes com
    // FOUT/FOIT, vídeos, imagens) — tudo isso pode deslocar a posição
    // real do boundary em relação ao valor medido no mount.
    window.addEventListener("load", onResize);
    // Fallback pra qualquer outro deslocamento de altura depois do mount
    // (ex.: ScrollTrigger recalculando pin-spacers) sem remedir por
    // frame de scroll.
    const ro = new ResizeObserver(onResize);
    ro.observe(document.body);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  /*
    Link ativo: as seções do menu são âncoras da mesma página, então o
    "estado da página atual" é a seção em tela. A faixa de detecção fica
    logo abaixo do header (-80px no topo) e ignora os 55% de baixo, para
    a troca acontecer quando a seção realmente assume a tela.
  */
  useEffect(() => {
    const sections = headerNav
      .map((item) => document.querySelector(item.href))
      .filter((el): el is Element => el !== null);
    if (!sections.length) return;

    const visible = new Set<string>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) visible.add(href);
          else visible.delete(href);
        }
        const next = headerNav.find((item) => visible.has(item.href));
        if (next) setActiveHref(next.href);
      },
      { rootMargin: "-80px 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const navLinkClass =
    "relative text-[0.66rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300";

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      data-theme="dark"
      className="group/header fixed inset-x-0 top-0 z-50 transition-colors duration-500 data-[theme=light]:bg-navy/92 data-[theme=light]:shadow-[0_8px_24px_rgba(10,26,47,0.25)] data-[theme=light]:backdrop-blur-md"
    >
      <div className="relative mx-auto flex h-16 max-w-7xl items-center px-8 md:h-20">
        {/* EMBLEMA — absolute de propósito: anima centro↔esquerda sem
            deslocar as zonas de navegação. Logo transparente, sem caixa
            (ref. Verso). No hero desce um pouco sobre o vídeo. */}
        <div
          className={`absolute z-20 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            expanded
              ? "left-1/2 top-4 h-20 w-20 -translate-x-1/2 md:h-24 md:w-24"
              : "left-8 top-1/2 h-9 w-9 -translate-y-1/2 md:h-10 md:w-10"
          }`}
        >
          {/* clicar leva ao topo (#inicio) e o próprio scroll re-expande
              o emblema — sem segundo dono do estado */}
          <Link
            href="#inicio"
            aria-label={site.brandMark}
            className="flex h-full w-full items-center justify-center transition-opacity hover:opacity-85"
          >
            <Image
              src="/images/nbmlogo-transparent.png"
              alt=""
              width={150}
              height={150}
              priority
              className="h-full w-full object-contain drop-shadow-[0_2px_10px_rgba(0,0,0,0.45)]"
            />
          </Link>
        </div>

        {/* ZONA 1 — reserva o espaço do emblema (que está em absolute) e
            equilibra a zona 3, mantendo os links no centro real */}
        <div className="flex-1" aria-hidden />

        {/* ZONA 2 — grupo ÚNICO de links, gap uniforme, centralizado.
            Some no hero (o emblema ocupa o centro) e abaixo de 1024px
            (vira menu hambúrguer). */}
        <nav
          aria-label="Navegação principal"
          className={`relative z-10 hidden items-center gap-8 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] lg:flex ${
            expanded
              ? "pointer-events-none -translate-y-1 opacity-0"
              : "translate-y-0 opacity-100"
          }`}
        >
          {headerNav.map((item) => {
            const active = activeHref === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "true" : undefined}
                className={`${navLinkClass} ${
                  active ? "text-fog" : "text-fog/70 hover:text-fog"
                } after:absolute after:-bottom-2 after:left-0 after:h-px after:bg-accent after:transition-all after:duration-300 ${
                  active ? "after:w-full" : "after:w-0"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* ZONA 3 — CTA (≥768px) + hambúrguer (<1024px) */}
        <div className="relative z-10 flex flex-1 items-center justify-end gap-4">
          <PillButton
            href={site.scheduleUrl}
            className="hidden px-5 py-2.5 md:inline-flex"
          >
            {ctaLabels.header}
          </PillButton>

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            onClick={() => setMenuOpen((v) => !v)}
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-5 bg-fog transition-transform duration-300 ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
            />
            <span
              className={`h-px w-5 bg-fog transition-transform duration-300 ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {/* Menu mobile/tablet — sempre navy, como o resto da identidade do
          header. O CTA aparece aqui abaixo de 768px, onde some da barra. */}
      <div
        className={`lg:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 -z-10 flex flex-col items-center justify-center gap-8 bg-ink-950/95 backdrop-blur-xl transition-opacity duration-500`}
      >
        {headerNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            aria-current={activeHref === item.href ? "true" : undefined}
            className={`font-serif text-3xl transition-colors ${
              activeHref === item.href
                ? "text-accent"
                : "text-fog/90 hover:text-fog"
            }`}
          >
            {item.label}
          </Link>
        ))}
        <PillButton
          href={site.scheduleUrl}
          className="mt-4 md:hidden"
          onClick={() => setMenuOpen(false)}
        >
          {ctaLabels.header}
        </PillButton>
      </div>
    </header>
  );
}
