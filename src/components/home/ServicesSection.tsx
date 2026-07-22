import { services } from "@/data/services";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { site } from "@/data/site";

/*
  Serviços — tipografia e composição no lugar de ícones genéricos
  (briefing). Nomes configuráveis em data/services.ts.
*/
export function ServicesSection() {
  return (
    <section id="servicos" className="hairline-light-t bg-paper-soft py-28 md:py-40">
      <Container>
        <SectionLabel className="eyebrow-light">Serviços</SectionLabel>
        <h2 className="mt-8 max-w-3xl text-4xl font-medium leading-tight tracking-tight text-navy-text md:text-6xl">
          Um sistema de decisão,{" "}
          <span className="font-serif italic text-bronze">
            não uma prateleira de produtos.
          </span>
        </h2>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-card-border md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.number}
              className="group relative bg-paper-soft p-8 transition-colors duration-500 hover:bg-paper md:p-12"
            >
              <span className="font-serif text-lg text-champagne">
                {service.number}
              </span>
              <h3 className="mt-6 text-2xl font-medium uppercase tracking-wide text-navy-text">
                {service.title}
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-navy-text-soft">
                {service.description}
              </p>
              <a
                href={site.scheduleUrl}
                className="eyebrow eyebrow-light mt-8 inline-flex items-center gap-3 transition-colors duration-300 group-hover:text-navy-text"
              >
                Conversar sobre
                <span
                  aria-hidden
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                >
                  →
                </span>
              </a>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
