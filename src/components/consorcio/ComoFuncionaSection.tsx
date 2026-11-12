import { passos } from "@/data/consorcio";
import { Container } from "@/components/ui/Container";
import { SectionLabel } from "@/components/ui/SectionLabel";

/*
  Como funciona — linha do tempo em 4 passos. No desktop os marcadores
  ficam ligados por um fio horizontal; no mobile, por um fio vertical.
*/
export function ComoFuncionaSection() {
  return (
    <section
      id="como-funciona"
      className="bg-bg-light-soft py-24 md:py-32"
    >
      <Container>
        <SectionLabel className="eyebrow-light">Como funciona</SectionLabel>
        <h2 className="mt-8 max-w-2xl text-4xl font-medium leading-tight tracking-tight text-navy-text md:text-5xl">
          Você planeja.{" "}
          <span className="font-serif italic text-bronze">A NBM acompanha.</span>
        </h2>

        <ol className="relative mt-16 grid gap-10 md:grid-cols-4 md:gap-8">
          {/* fio da linha do tempo */}
          <span aria-hidden className="absolute left-5 top-5 bottom-5 w-px bg-blue/20 md:left-5 md:right-[calc(25%-1.25rem)] md:top-5 md:bottom-auto md:h-px md:w-auto" />
          {passos.map((passo, i) => (
            <li key={passo.titulo} className="relative pl-16 md:pl-0">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full bg-cta-navy font-serif text-lg text-white ring-8 ring-bg-light-soft md:relative">
                {i + 1}
              </span>
              <h3 className="text-lg font-semibold text-navy-text md:mt-8">{passo.titulo}</h3>
              <p className="mt-3 text-sm leading-[1.7] text-navy-text-soft">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
