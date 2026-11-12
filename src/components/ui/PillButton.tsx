import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "light" | "outline" | "ghost" | "navy" | "outline-navy";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300";

/*
  CTA primária (mesma nas duas polaridades): azul-marinho da marca
  (--color-cta-navy) com texto branco — trocado do verde original a
  pedido do cliente, para casar com o azul do logo.
*/
const variants: Record<Variant, string> = {
  // -- CTA primária, tema escuro (header, hero de vídeo) --
  light: "bg-cta-navy text-white hover:bg-cta-navy-hover",
  // -- CTA primária, tema claro (seção institucional) --
  navy: "bg-cta-navy text-white hover:bg-cta-navy-hover",
  // -- secundárias, tema escuro (borda prata 1px, fundo transparente) --
  outline:
    "border border-fog/50 text-fog hover:border-fog/80 hover:bg-fog/5",
  ghost: "text-ash hover:text-fog",
  // -- secundária, tema claro: azul da marca, hover azul claro --
  "outline-navy":
    "border border-blue/30 text-blue hover:border-blue-light hover:bg-blue-light/5 hover:text-blue-light",
};

export function PillButton({
  href,
  children,
  variant = "light",
  className = "",
  ariaLabel,
  onClick,
  newTab = false,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
  /* usado, p.ex., para fechar o menu mobile ao navegar */
  onClick?: () => void;
  /* força nova aba também em link interno (ex.: página de consórcios) */
  newTab?: boolean;
}) {
  const isExternal = /^https?:\/\//.test(href);
  const blank = isExternal || newTab;
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      onClick={onClick}
      target={blank ? "_blank" : undefined}
      rel={blank ? "noopener noreferrer" : undefined}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
