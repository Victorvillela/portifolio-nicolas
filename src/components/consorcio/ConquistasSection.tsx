import { conquistas } from "@/data/consorcio";
import { Container } from "@/components/ui/Container";
import { Ilustracao } from "./Ilustracoes";

/*
  "O que é possível conquistar" — primeira seção clara da página.
  data-theme-boundary: é aqui que o PremiumHeader troca para o tema
  claro e recolhe o emblema (mesmo contrato do InstitutionalHero).
*/
export function ConquistasSection() {
  return (
    <section
      id="conquistas"
      data-theme-boundary
      className="bg-bg-light-soft py-24 md:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-light">Carta de crédito</p>
          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tight text-navy-text md:text-5xl">
            O que é possível conquistar{" "}
            <span className="font-serif italic text-bronze">com o consórcio</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy-text-soft">
            Com a carta de crédito, você escolhe o bem ou serviço que faz mais
            sentido para o seu momento de vida — e compra com poder de
            negociação à vista.
          </p>
        </div>

        <ul className="mt-16 grid gap-6 md:grid-cols-2">
          {conquistas.map((item) => (
            <li
              key={item.id}
              className="group shadow-paper hairline-light relative flex items-center gap-6 overflow-hidden rounded-3xl bg-bg-light p-8 transition-transform duration-500 ease-out-expo hover:-translate-y-1 md:p-10"
            >
              <div className="flex-1">
                <h3 className="text-2xl font-semibold tracking-tight text-navy-text md:text-3xl">
                  {item.titulo}
                </h3>
                <p className="mt-4 max-w-xs text-sm leading-[1.7] text-navy-text-soft">
                  {item.texto}
                </p>
              </div>
              <div className="relative h-28 w-32 shrink-0 md:h-32 md:w-40">
                <span
                  aria-hidden
                  className="absolute inset-2 rounded-full bg-pale-gradient transition-transform duration-500 ease-out-expo group-hover:scale-110"
                />
                <div className="relative h-full w-full transition-transform duration-500 ease-out-expo group-hover:-translate-y-1">
                  <Ilustracao id={item.id} />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
