"use client";

import {
  createContext,
  useContext,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { serviceTabs } from "@/data/serviceTabs";

/*
  A aba escolhida no hero também comanda a ServiceDetails, que é outra
  seção da página, por isso o estado fica num provider acima das duas.
*/
const ServiceTabsContext = createContext<{
  activeIndex: number;
  setActiveIndex: (index: number) => void;
} | null>(null);

export function ServiceTabsProvider({ children }: { children: ReactNode }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <ServiceTabsContext.Provider value={{ activeIndex, setActiveIndex }}>
      {children}
    </ServiceTabsContext.Provider>
  );
}

function useServiceTabs() {
  const context = useContext(ServiceTabsContext);
  if (!context) {
    throw new Error("useServiceTabs precisa de um ServiceTabsProvider");
  }
  return context;
}

export function useActiveService() {
  return serviceTabs[useServiceTabs().activeIndex];
}

export const SERVICE_PANEL_ID = "painel-servico";

export function ServiceTabList() {
  const { activeIndex, setActiveIndex } = useServiceTabs();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // padrão de abas acessíveis: as setas trocam de aba e movem o foco
  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const next = activeIndex === 0 ? 1 : 0;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <div
      role="tablist"
      aria-label="Serviços"
      onKeyDown={onKeyDown}
      className="flex w-full gap-1 rounded-full border border-fog/30 p-1 sm:w-fit"
    >
      {serviceTabs.map((service, index) => {
        const selected = index === activeIndex;
        return (
          <button
            key={service.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            type="button"
            role="tab"
            id={`aba-${service.id}`}
            aria-selected={selected}
            aria-controls={SERVICE_PANEL_ID}
            tabIndex={selected ? 0 : -1}
            onClick={() => setActiveIndex(index)}
            className={`flex-1 rounded-full px-6 py-2.5 text-[0.7rem] font-medium uppercase tracking-[0.22em] transition-colors duration-300 sm:flex-none ${
              selected ? "bg-fog text-ink-950" : "text-fog hover:bg-fog/10"
            }`}
          >
            {service.tab}
          </button>
        );
      })}
    </div>
  );
}
