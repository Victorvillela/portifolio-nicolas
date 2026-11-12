import { taxas, fonteComparativo } from "@/data/consorcio";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";

const ESCALA_MAX = 25;
const marcas = [25, 20, 15, 10, 5, 0];

/*
  Comparativo taxa de administração (consórcio) x juros (bancos), ao ano.
  Gráfico em HTML/CSS puro — sem lib de chart — com os valores de
  data/consorcio.ts. Consórcio em azul da marca; bancos em cinza neutro,
  para o olho ler "o nosso é a barra pequena".
*/
export function ComparativoSection() {
  const grupos = Object.values(taxas);

  return (
    <section
      id="comparativo"
      aria-label="Comparativo consórcio x financiamento"
      className="bg-pale-gradient hairline-light-t py-24 md:py-32"
    >
      <Container className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        {/* GRÁFICO */}
        <figure className="shadow-paper rounded-3xl bg-bg-light p-6 md:p-10">
          <figcaption className="text-sm font-medium leading-snug text-navy-text md:text-base">
            Taxa de administração do consórcio{" "}
            <span className="text-navy-text-soft">x</span> juros do
            financiamento bancário <span className="text-navy-text-soft">(ao ano)</span>
          </figcaption>

          <div className="mt-10 flex gap-3">
            {/* eixo Y */}
            <div aria-hidden className="flex h-64 flex-col justify-between text-right text-[0.65rem] text-navy-text-soft">
              {marcas.map((m) => (
                <span key={m} className="-my-1.5 leading-3">
                  {m}%
                </span>
              ))}
            </div>

            <div className="relative h-64 flex-1">
              {/* linhas de grade */}
              <div aria-hidden className="absolute inset-0 flex flex-col justify-between">
                {marcas.map((m) => (
                  <span
                    key={m}
                    className={`block h-px w-full ${m === 0 ? "bg-navy-text/40" : "border-t border-dashed border-border-light"}`}
                  />
                ))}
              </div>

              {/* barras */}
              <div className="relative flex h-full items-end justify-around">
                {grupos.map((g) => (
                  <div key={g.rotulo} className="flex h-full items-end gap-3 md:gap-5">
                    {[
                      { valor: g.consorcioAA, quem: "NBM Consórcios", cor: "bg-linear-to-t from-navy-elevated to-blue-light", texto: "text-blue" },
                      { valor: g.bancoAA, quem: "Bancos", cor: "bg-border-light", texto: "text-navy-text-soft" },
                    ].map((barra) => (
                      <div key={barra.quem} className="flex h-full w-10 flex-col items-center justify-end md:w-16">
                        <span className={`mb-2 whitespace-nowrap text-[0.7rem] font-semibold ${barra.texto}`}>
                          {barra.valor}% a.a.
                        </span>
                        <span
                          role="img"
                          aria-label={`${g.rotulo}, ${barra.quem}: ${barra.valor}% ao ano`}
                          className={`block w-full rounded-t-xl ${barra.cor}`}
                          style={{ height: `${Math.max((barra.valor / ESCALA_MAX) * 100, 2)}%` }}
                        />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* rótulos do eixo X */}
          <div aria-hidden className="ml-9 mt-3 flex justify-around text-sm text-navy-text">
            {grupos.map((g) => (
              <span key={g.rotulo}>{g.rotulo}</span>
            ))}
          </div>

          {/* legenda */}
          <div className="mt-6 flex justify-center gap-6 text-xs text-navy-text-soft">
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-blue-light" />
              NBM Consórcios
            </span>
            <span className="flex items-center gap-2">
              <span aria-hidden className="h-2.5 w-2.5 rounded-sm bg-border-light ring-1 ring-navy-text/10" />
              Bancos
            </span>
          </div>
        </figure>

        {/* TEXTO */}
        <div>
          <p className="eyebrow eyebrow-light">Compare</p>
          <h2 className="mt-6 text-4xl font-medium leading-tight tracking-tight text-navy-text md:text-5xl">
            Pare de pagar juros{" "}
            <span className="font-serif italic text-bronze">para o banco.</span>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-navy-text-soft">
            No financiamento, boa parte do que você paga são juros. No
            consórcio, o custo é a taxa de administração, diluída ao longo do
            plano. A diferença, no fim, vira patrimônio — e não lucro do banco.
          </p>
          <p className="mt-6 text-xs leading-relaxed text-navy-text-soft/80">
            Fonte: {fonteComparativo}
          </p>
          <PillButton href="#simulador" variant="navy" className="mt-10">
            Simule agora
          </PillButton>
        </div>
      </Container>
    </section>
  );
}
