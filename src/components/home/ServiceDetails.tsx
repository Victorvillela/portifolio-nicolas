"use client";

import { useActiveService } from "@/components/home/ServiceTabs";

/*
  Blocos do serviço escolhido nas abas do hero.
  data-theme-boundary: primeira seção clara — o PremiumHeader mede este
  ponto para ligar a barra navy quando flutua sobre conteúdo claro.
*/
export function ServiceDetails() {
  const active = useActiveService();
  return (
    <section data-theme-boundary className="bg-pale-gradient">
      <div className="mx-auto max-w-6xl px-6 py-24 md:px-10">
        <h2 className="text-3xl font-medium tracking-tight text-navy-text md:text-4xl">
          {active.sectionTitle}
        </h2>
        <ul className="mt-12 grid gap-8 md:grid-cols-3">
          {active.cards.map((card) => (
            <li key={card.title} className="border-t border-blue/30 pt-6">
              <h3 className="text-lg font-medium text-navy-text">
                {card.title}
              </h3>
              <p className="mt-3 text-base leading-relaxed text-navy-text-soft">
                {card.text}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
