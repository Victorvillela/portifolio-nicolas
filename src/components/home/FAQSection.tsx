"use client";

import { useState } from "react";
import { faq } from "@/data/faq";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  FAQ (briefing): acordeão institucional, tom direto, sem jargão.
  Um item aberto por vez (mesmo padrão de interação já usado em
  MethodologySection). Respostas com placeholder [TODO: ...] não podem
  ser preenchidas com suposição — ver aviso de compliance em data/faq.ts.
*/
export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      id="faq"
      aria-label="Perguntas frequentes"
      className="hairline-light-t bg-paper py-28 md:py-40"
    >
      <Container className="max-w-3xl">
        <SectionLabel className="eyebrow-light">Perguntas frequentes</SectionLabel>
        <h2 className="mt-8 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-navy-text md:text-5xl">
          Antes de conversar,{" "}
          <span className="font-serif italic text-bronze">
            algumas respostas diretas.
          </span>
        </h2>

        <ul className="mt-16 flex flex-col">
          {faq.map((item, i) => {
            const open = openIndex === i;
            return (
              <li key={item.question} className="hairline-light-t">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left"
                >
                  <span className="text-lg font-medium text-navy-text md:text-xl">
                    {item.question}
                  </span>
                  <span
                    aria-hidden
                    className={`relative h-4 w-4 shrink-0 text-navy-text-soft transition-transform duration-500 ${open ? "rotate-45" : ""}`}
                  >
                    <span className="absolute left-1/2 top-1/2 h-px w-4 -translate-x-1/2 -translate-y-1/2 bg-current" />
                    <span className="absolute left-1/2 top-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 bg-current" />
                  </span>
                </button>
                <div
                  className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <div className="overflow-hidden">
                    <p className="max-w-xl pb-6 text-sm leading-relaxed text-navy-text-soft">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
