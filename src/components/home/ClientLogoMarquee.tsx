import { clients } from "@/data/clients";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";

/*
  Credibilidade (briefing): marquee em grayscale, animação lenta.
  Placeholders neutros até existirem logos reais autorizados — nunca
  inventar empresas. Menção à XP apenas em texto institucional.
*/
export function ClientLogoMarquee() {
  const loop = [...clients, ...clients];

  return (
    <section
      aria-label="Credibilidade"
      className="hairline-light-t bg-paper-soft py-20 md:py-28"
    >
      <Container>
        <p className="eyebrow eyebrow-light text-center">
          Estratégia construída com confiança.
        </p>
      </Container>

      <div
        className="group relative mt-12 overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
        }}
      >
        <div className="marquee-track flex w-max items-center gap-20 pr-20">
          {loop.map((client, i) => (
            <span
              key={`${client.name}-${i}`}
              aria-hidden={i >= clients.length}
              className="whitespace-nowrap text-sm font-medium uppercase tracking-[0.3em] text-navy-text-soft/45 grayscale transition-opacity duration-500 hover:text-navy-text-soft/85"
            >
              {client.name}
            </span>
          ))}
        </div>
      </div>

      <Container>
        <p className="mt-12 text-center text-xs tracking-wide text-navy-text-soft/70">
          {site.xpDisclosure}
        </p>
      </Container>
    </section>
  );
}
