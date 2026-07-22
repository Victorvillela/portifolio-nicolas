"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/*
  Microinteração magnética (briefing, CTA final): o botão desliza
  sutilmente na direção do cursor e volta com easing suave.
*/
export function MagneticButton({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const reducedMotion = useReducedMotion();

  const onMove = (e: React.PointerEvent) => {
    if (reducedMotion) return;
    const wrapper = wrapperRef.current;
    const button = buttonRef.current;
    if (!wrapper || !button) return;
    const rect = wrapper.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    button.style.transition = "translate 0.2s cubic-bezier(0.16, 1, 0.3, 1)";
    button.style.translate = `${(dx * 0.22).toFixed(1)}px ${(dy * 0.28).toFixed(1)}px`;
  };

  const onLeave = () => {
    const button = buttonRef.current;
    if (!button) return;
    button.style.transition = "translate 0.6s cubic-bezier(0.16, 1, 0.3, 1)";
    button.style.translate = "0px 0px";
  };

  return (
    <div
      ref={wrapperRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="inline-block p-6"
    >
      <Link
        ref={buttonRef}
        href={href}
        className="inline-flex items-center justify-center rounded-full bg-fog px-8 py-4 text-[0.7rem] font-medium uppercase tracking-[0.22em] text-ink-950 transition-colors duration-300 hover:bg-parchment"
      >
        {children}
      </Link>
    </div>
  );
}
