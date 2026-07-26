"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { headerNav, site, ctaLabels } from "@/data/site";
import { PillButton } from "@/components/ui/PillButton";
import { useLenis } from "@/components/providers/SmoothScrollProvider";

/* id do drawer — liga o botão hambúrguer ao painel via aria-controls */
const ID_MENU_MOBILE = "menu-mobile";

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
  const lenis = useLenis();

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

  /*
    Menu aberto trava o fundo. Duas travas porque há dois donos possíveis
    da rolagem: o Lenis (quando existe) e o scroll nativo do documento —
    com movimento reduzido o Lenis nem é instanciado, e aí só o
    overflow do body responde. O valor anterior de overflow é restaurado
    no cleanup em vez de assumir "visible", para não sobrescrever nada
    que outra parte da página tenha definido.
  */
  useEffect(() => {
    if (!menuOpen) return;

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      document.body.style.overflow = overflowAnterior;
      lenis?.start();
    };
  }, [menuOpen, lenis]);

  /*
    Saídas do menu que não são o clique num link: Escape (esperado em
    qualquer painel modal) e a tela cruzar para ≥1024px, onde o drawer é
    lg:hidden — sem isso o painel desapareceria no resize e deixaria a
    rolagem travada para trás, sem nenhum controle visível para destravar.
  */
  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onBreakpoint = () => {
      if (desktop.matches) setMenuOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [menuOpen]);

  const navLinkClass =
    "relative text-[0.66rem] font-medium uppercase tracking-[0.24em] transition-colors duration-300";

  return (
    <>
      <header
        ref={headerRef}
        data-scrolled="false"
        data-theme="dark"
        /* data-menu: enquanto o drawer está aberto a barra fica sem fundo
           próprio (ver globals.css), para o fundo sólido do painel valer
           também atrás da logo e do X — sem emenda de cor no topo */
        data-menu={menuOpen ? "open" : "closed"}
        className="group/header fixed inset-x-0 top-0 z-50 transition-colors duration-500 data-[theme=light]:bg-navy/92 data-[theme=light]:shadow-[0_8px_24px_rgba(10,26,47,0.25)] data-[theme=light]:backdrop-blur-md"
      >
        <div className="relative mx-auto flex h-16 max-w-7xl items-center px-8 md:h-20">
          {/* EMBLEMA — absolute de propósito: anima centro↔esquerda sem
              deslocar as zonas de navegação. Logo transparente, sem caixa
              (ref. Verso). No hero desce um pouco sobre o vídeo.

              Abaixo de 1024px o emblema NÃO expande: fica sempre ancorado
              à esquerda (alinhado ao px-8 do container, espelhando o
              hambúrguer à direita) — é também a logo no canto superior
              esquerdo do menu aberto, já que a barra fica por cima do
              painel. O momento de marca centralizado depende de largura
              sobrando ao lado dele; numa tela estreita ele só disputava o
              mesmo espaço do resto da barra. */}
          <div
            className={`absolute left-8 top-1/2 z-20 h-11 w-11 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              expanded
                ? "lg:left-1/2 lg:top-4 lg:h-24 lg:w-24 lg:-translate-x-1/2 lg:translate-y-0"
                : "lg:left-8 lg:top-1/2 lg:h-10 lg:w-10 lg:translate-x-0 lg:-translate-y-1/2"
            }`}
          >
            {/* clicar leva ao topo (#inicio) e o próprio scroll re-expande
                o emblema — sem segundo dono do estado */}
            <Link
              href="#inicio"
              aria-label={site.brandMark}
              onClick={() => setMenuOpen(false)}
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
              equilibra a zona 3, mantendo os links no centro real.
              Abaixo de 1024px o CTA compacto vive na zona 3 e pode crescer
              para dentro desta zona (flex-1 tem basis 0 e encolhe até
              zero): o min-w reserva os 44px do emblema + folga, então o
              botão nunca chega a encostar na logo, mesmo em 320px. */}
          <div className="flex-1 max-lg:min-w-16" aria-hidden />

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

          {/* ZONA 3 — CTA + hambúrguer (<1024px). O hambúrguer é o mesmo
              controle que fecha (vira X) e fica no canto superior direito,
              ancorado pelo justify-end; o CTA fica logo à esquerda dele,
              entre a logo e o menu.

              Abaixo de 1024px o CTA aparece numa versão compacta (fonte,
              padding e tracking menores): no espaço que sobra entre o
              emblema e o hambúrguer, o botão de desktop não caberia sem
              disputar os dois. Enquanto o drawer está aberto ele some —
              o painel já traz o mesmo CTA no fim da lista, e dois pills
              verdes ao mesmo tempo na tela não fazem sentido. */}
          <div className="relative z-10 flex flex-1 items-center justify-end gap-4 max-lg:gap-3">
            <PillButton
              href={site.scheduleUrl}
              className="px-5 py-2.5 max-lg:whitespace-nowrap max-lg:px-3 max-lg:py-1.5 max-lg:text-[0.6rem] max-lg:tracking-[0.14em] max-lg:group-data-[menu=open]/header:hidden lg:inline-flex"
            >
              {ctaLabels.header}
            </PillButton>

            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls={ID_MENU_MOBILE}
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
      </header>

      {/*
        DRAWER MOBILE — irmão do <header>, não filho, de propósito: a barra
        ganha backdrop-blur no tema claro, e um elemento com
        backdrop-filter passa a ser o containing block dos descendentes
        position:fixed. Aninhado no header, o inset-0 daqui se resolvia
        contra a barra (64px de altura) em vez da viewport, então depois de
        rolar a página o menu virava uma tira no topo. Como irmão, inset-0
        é sempre a viewport inteira, em qualquer ponto do scroll.

        z-40 (abaixo do header, z-50) para a logo à esquerda e o X à
        direita seguirem visíveis e clicáveis por cima do painel.

        Fundo SÓLIDO: antes era bg-ink-950/95 + blur, e os 5% de
        transparência deixavam hero e FAQ aparecerem atrás do menu.

        pt-16/md:pt-20 = altura da barra: o justify-center centra no espaço
        que sobra abaixo dela, senão o primeiro link cai atrás da logo.

        A visibilidade entra na transição junto com a opacidade para o
        painel fechado sair da ordem de tabulação e do leitor de tela
        (visibility:hidden), sem perder o fade de saída.
      */}
      <div
        id={ID_MENU_MOBILE}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navegação"
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink-950 pt-16 text-center transition-[opacity,visibility] duration-500 md:pt-20 lg:hidden ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
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
          className="mt-4"
          onClick={() => setMenuOpen(false)}
        >
          {ctaLabels.header}
        </PillButton>
      </div>
    </>
  );
}
