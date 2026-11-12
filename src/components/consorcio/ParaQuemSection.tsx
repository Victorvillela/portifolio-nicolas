import { perfis, vantagens, pontosDeAtencao } from "@/data/consorcio";
import { site } from "@/data/site";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  Para quem é + comparação honesta. Duas ideias da referência alemã:
  perfis em forma de pergunta (o visitante se reconhece) e prós/contras
  lado a lado — consórcio é produto mal entendido, e mostrar os pontos de
  atenção gera mais confiança do que escondê-los.
*/
export function ParaQuemSection() {
  return (
    <section
      id="para-quem"
      className="bg-pale-gradient hairline-light-t py-24 md:py-32"
    >
      <Container>
        <SectionLabel className="eyebrow-light">Para quem é</SectionLabel>
        <h2 className="mt-8 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-navy-text md:text-5xl">
          Cada objetivo pede{" "}
          <span className="font-serif italic text-bronze">uma estratégia.</span>
        </h2>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {perfis.map((perfil) => (
            <li key={perfil.pergunta}>
              <a
                href={site.consorcioWhatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="group shadow-paper flex h-full flex-col rounded-3xl bg-bg-light p-7 transition-colors duration-300 hover:bg-navy"
              >
                <span className="font-serif text-2xl italic text-navy-text transition-colors group-hover:text-fog">
                  {perfil.pergunta}
                </span>
                <span className="mt-4 flex-1 text-sm leading-[1.7] text-navy-text-soft transition-colors group-hover:text-silver">
                  {perfil.texto}
                </span>
                <span className="mt-6 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-blue transition-colors group-hover:text-blue-light">
                  Conversar sobre isso →
                </span>
              </a>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-6 lg:grid-cols-2">
          <div className="shadow-paper rounded-3xl bg-bg-light p-8 md:p-10">
            <h3 className="text-xl font-semibold text-navy-text">Por que o consórcio faz sentido</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {vantagens.map((v) => (
                <li key={v} className="flex gap-3 text-sm leading-relaxed text-navy-text-soft">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-accent-ink" aria-hidden>
                    <circle cx="10" cy="10" r="9" className="fill-accent/15" />
                    <path d="M6 10.5 L9 13 L14 7.5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div className="shadow-paper rounded-3xl bg-bg-light p-8 md:p-10">
            <h3 className="text-xl font-semibold text-navy-text">Pontos de atenção</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {pontosDeAtencao.map((p) => (
                <li key={p} className="flex gap-3 text-sm leading-relaxed text-navy-text-soft">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-gold-ink" aria-hidden>
                    <circle cx="10" cy="10" r="9" className="fill-gold/15" />
                    <path d="M10 5.5 V11 M10 14 V14.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                  {p}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-sm leading-relaxed text-navy-text">
              É por isso que, na NBM, o consórcio entra como parte de um
              planejamento — com prazo, estratégia de lance e acompanhamento.
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
