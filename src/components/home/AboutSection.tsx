import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  Sobre — institucional, sobre a EMPRESA (antes era um perfil executivo
  com retrato + trajetória pessoal). Sem foto: coluna única, o texto
  carrega a seção sozinho.

  Conteúdo em data/site.ts, redigido a partir do que a própria NBM
  publica no Instagram oficial. As frentes de atuação são as declaradas
  na bio do perfil — não inventar novas aqui.
*/
export function AboutSection() {
  const { about, certifications } = site;

  return (
    <section id="sobre" className="hairline-light-t bg-paper-soft py-28 md:py-40">
      <Container className="max-w-3xl">
        <SectionLabel className="eyebrow-light">Sobre</SectionLabel>

        <h2 className="mt-8 text-3xl font-medium leading-tight tracking-tight text-navy-text md:text-5xl">
          {about.headline}
          <br />
          <span className="font-serif italic text-bronze">
            {about.headlineAccent}
          </span>
        </h2>

        <p className="mt-10 text-base leading-relaxed text-navy-text-soft">
          {about.bio}
        </p>
        <p className="mt-6 text-base leading-relaxed text-navy-text-soft">
          {about.bioSecondary}
        </p>

        {/* frentes de atuação — marcador azul, sem virar lista de produtos */}
        <ul className="mt-12 grid gap-x-10 gap-y-4 sm:grid-cols-2">
          {about.pillars.map((pillar) => (
            <li
              key={pillar}
              className="flex items-center gap-3 border-t border-card-border pt-4 text-sm text-navy-text"
            >
              <span aria-hidden className="h-1.5 w-1.5 shrink-0 rounded-full bg-blue" />
              {pillar}
            </li>
          ))}
        </ul>

        <p className="mt-12 text-xs leading-relaxed text-navy-text-soft/80">
          {site.xpDisclosure}
        </p>

        {certifications.length > 0 && (
          <div className="mt-10">
            <p className="eyebrow eyebrow-light">Certificações</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert.label}
                  className="hairline-light rounded-full px-4 py-1.5 text-xs tracking-wide text-navy-text-soft"
                >
                  {cert.label}
                  {cert.institution ? ` · ${cert.institution}` : ""}
                </span>
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}
