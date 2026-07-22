import Link from "next/link";
import { type ReactNode } from "react";

type Variant = "light" | "outline" | "ghost" | "navy" | "outline-navy";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300";

const variants: Record<Variant, string> = {
  // -- tema escuro (intro cinematográfica) --
  light: "bg-fog text-ink-950 hover:bg-parchment",
  outline:
    "border border-fog/20 text-fog hover:border-fog/50 hover:bg-fog/5",
  ghost: "text-ash hover:text-fog",
  // -- tema claro (HOME institucional) --
  navy: "bg-bronze text-paper hover:bg-navy-text",
  "outline-navy":
    "border border-navy-text/20 text-navy-text hover:border-navy-text/50 hover:bg-navy-text/5",
};

export function PillButton({
  href,
  children,
  variant = "light",
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <Link
      href={href}
      aria-label={ariaLabel}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
