"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { headerNavLeft, headerNavRight, site, ctaLabels } from "@/data/site";
import { PillButton } from "@/components/ui/PillButton";

/*
  Header flutuante enxuto (referências: donmolinico.es — emblema vertical
  "furando" a faixa do header e descendo sobre o hero, sem borda/scrim
  separando header de conteúdo; vrwealth.com.br — menu curto, Método/
  Sobre/FAQ + CTA). Três colunas: grupo esquerdo (Início · Sobre), badge
  central (arquivo real do cliente, íntegro, nunca recortado — só o
  tamanho é ajustado via CSS), grupo direito (Serviços · FAQ) + CTA.
  Itens de menu soltos direto sobre o fundo da página (sem barra
  fechada). Só a compactação de padding ao rolar é controlada por rAF
  via ref, sem setState por pixel de scroll.
*/
export function PremiumHeader() {
  const headerRef = useRef<HTMLElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  // badge grande/vertical (true, estado inicial) ↔ badge retraído no
  // canto esquerdo + menu revelado (false). Controla o clique nas linhas
  // do emblema; ver efeito abaixo pro retraimento automático no scroll.
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;

    let raf = 0;
    let lastScrolled: boolean | null = null;
    let lastTheme: string | null = null;
    // posição onde a HOME clara começa (#home, ver InstitutionalHero) —
    // medida uma vez e no resize, nunca por frame de scroll
    let lightBoundary = Infinity;

    const measureBoundary = () => {
      const home = document.getElementById("home");
      lightBoundary = home
        ? home.getBoundingClientRect().top + window.scrollY
        : Infinity;
    };

    const update = () => {
      raf = 0;
      const scrolled = window.scrollY > 24;
      if (scrolled !== lastScrolled) {
        lastScrolled = scrolled;
        el.dataset.scrolled = String(scrolled);
        // Retraimento automático do badge ao iniciar o scroll (padrão
        // pedido no briefing, item 5). Pra deixar o retraimento só por
        // clique manual, remova este `if` — o resto do fluxo (clique nas
        // linhas / clique no logo retraído) continua funcionando igual.
        if (scrolled) setExpanded(false);
      }
      // troca um pouco antes da fronteira (header já flutua sobre a seção)
      const theme = window.scrollY + 72 >= lightBoundary ? "light" : "dark";
      if (theme !== lastTheme) {
        lastTheme = theme;
        el.dataset.theme = theme;
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
    // real de #home em relação ao valor medido no mount, deixando o
    // header preso em data-theme="dark" mesmo já sobre a home clara.
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

  const mobileNav = [...headerNavLeft, ...headerNavRight];
  const navLinkClass =
    "text-[0.66rem] font-medium uppercase tracking-[0.24em] text-fog/80 transition-colors duration-300 hover:text-fog group-data-[theme=light]/header:text-navy-text-soft group-data-[theme=light]/header:hover:text-navy-text";

  return (
    <header
      ref={headerRef}
      data-scrolled="false"
      data-theme="dark"
      className="group/header fixed inset-x-0 top-0 z-50 transition-all duration-500"
    >
      <div className="relative mx-auto grid max-w-7xl grid-cols-[1fr_auto_1fr] items-center gap-4 px-6 py-4 transition-all duration-500 md:px-10 group-data-[scrolled=true]/header:py-3">
        {/* badge do emblema — fora do fluxo do grid de propósito (não
            afeta a altura da faixa). Estado inicial: grande/vertical,
            topo alinhado ao centro da faixa, corpo descendo sobre o hero
            (ref. Don Molinico); retrai sozinho pro canto esquerdo
            (~36-40px, tamanho normal de logo) assim que o scroll começa —
            sem ícone/botão de toggle manual, só o gatilho de scroll (ver
            `update()` acima) e o clique no logo já retraído, que reabre.
            Fundo navy real do próprio badge (badge-navy, amostrado do
            nbmlogo.png) — sempre contrasta, em qualquer tema. Arquivo do
            logo íntegro, nunca recortado/recolorido — só o container e o
            tamanho de exibição da imagem mudam via CSS. */}
        <div
          className={`badge-navy absolute z-20 flex items-center justify-center overflow-hidden rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.2),0_14px_28px_rgba(0,0,0,0.22)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            expanded
              ? "left-1/2 top-7 h-[104px] w-14 -translate-x-1/2"
              : "left-0 top-1/2 h-9 w-9 -translate-y-1/2 md:h-10 md:w-10"
          }`}
        >
          <Link
            href="#inicio"
            aria-label={site.brandMark}
            onClick={() => setExpanded(true)}
            className="flex h-full w-full items-center justify-center transition-opacity hover:opacity-85"
          >
            <Image
              src="/images/nbmlogo.png"
              alt=""
              width={150}
              height={150}
              priority
              className={`object-contain transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                expanded ? "h-12 w-12" : "h-full w-full p-1"
              }`}
            />
          </Link>
        </div>

        {/* grupo esquerdo — discreto/ausente com o badge grande, revelado
            quando o badge retrai (briefing) */}
        <nav
          aria-label="Navegação principal"
          className={`relative z-10 col-start-1 hidden items-center gap-6 justify-self-start transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:ml-16 md:flex ${
            expanded ? "pointer-events-none -translate-y-1 opacity-0" : "translate-y-0 opacity-100"
          }`}
        >
          {headerNavLeft.map((item) => (
            <Link key={item.href} href={item.href} className={navLinkClass}>
              {item.label}
            </Link>
          ))}
        </nav>

        {/* grupo direito: links secundários acompanham o reveal/hide do
            badge, mas a CTA fica sempre visível (não some com o badge
            grande — feedback do dono, ela precisa estar sempre acessível) */}
        <div className="relative z-10 col-start-3 hidden items-center justify-self-end gap-10 md:flex">
          <nav
            aria-label="Navegação secundária"
            className={`flex items-center gap-6 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              expanded ? "pointer-events-none -translate-y-1 opacity-0" : "translate-y-0 opacity-100"
            }`}
          >
            {headerNavRight.map((item) => (
              <Link key={item.href} href={item.href} className={navLinkClass}>
                {item.label}
              </Link>
            ))}
          </nav>
          <PillButton
            href={site.scheduleUrl}
            className="px-5 py-2.5 group-data-[theme=light]/header:bg-bronze group-data-[theme=light]/header:text-paper group-data-[theme=light]/header:hover:bg-navy-text"
          >
            {ctaLabels.header}
          </PillButton>
        </div>

        {/* Mobile */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          onClick={() => setMenuOpen((v) => !v)}
          className="relative z-10 col-start-3 flex h-10 w-10 flex-col items-center justify-center justify-self-end gap-1.5 md:hidden"
        >
          <span
            className={`h-px w-5 bg-fog transition-transform duration-300 group-data-[theme=light]/header:bg-navy-text ${menuOpen ? "translate-y-[3.5px] rotate-45" : ""}`}
          />
          <span
            className={`h-px w-5 bg-fog transition-transform duration-300 group-data-[theme=light]/header:bg-navy-text ${menuOpen ? "-translate-y-[3.5px] -rotate-45" : ""}`}
          />
        </button>
      </div>

      {/* Menu mobile — segue o mesmo tema do header no momento da abertura */}
      <div
        className={`md:hidden ${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-0 -z-10 flex flex-col items-center justify-center gap-8 bg-ink-950/95 backdrop-blur-xl transition-opacity duration-500 group-data-[theme=light]/header:bg-paper/95`}
      >
        {mobileNav.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMenuOpen(false)}
            className="font-serif text-3xl text-fog/90 transition-colors hover:text-fog group-data-[theme=light]/header:text-navy-text/90 group-data-[theme=light]/header:hover:text-navy-text"
          >
            {item.label}
          </Link>
        ))}
        <PillButton
          href={site.scheduleUrl}
          className="mt-4 group-data-[theme=light]/header:border-navy-text/20 group-data-[theme=light]/header:text-navy-text group-data-[theme=light]/header:hover:border-navy-text/50 group-data-[theme=light]/header:hover:bg-navy-text/5"
          variant="outline"
        >
          {ctaLabels.header}
        </PillButton>
      </div>
    </header>
  );
}
