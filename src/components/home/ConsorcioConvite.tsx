import { plano } from "@/data/consorcio";
import { site } from "@/data/site";
import { brl, brlCentavos, simular } from "@/lib/simulacao";
import { Container } from "@/components/ui/Container";
import { PillButton } from "@/components/ui/PillButton";
import { CartaCredito } from "@/components/consorcio/CartaCredito";

/*
  Convite para a NBM Consórcios — faixa navy entre Serviços e FAQ.
  Marca separada (PRODUCT.md): não entra como "mais um serviço" da lista;
  é um convite para conhecer a outra marca, com a mesma carta de crédito
  do hero de /consorcios para o visitante reconhecê-la ao trocar de aba.

  Copy de "conquista", nunca de "rendimento": consórcio não é
  investimento e não pode soar como promessa de ganho. O valor da
  parcela sai do mesmo cálculo do simulador.
*/
export function ConsorcioConvite() {
  const credito = plano.valorPadrao;
  const { parcelaReduzida } = simular(credito);

  return (
    <section
      id="consorcios"
      aria-label="Conheça a NBM Consórcios"
      className="relative overflow-hidden bg-navy py-24 md:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 top-1/2 h-[34rem] w-[34rem] -translate-y-1/2 rounded-full bg-blue-light/15 blur-3xl"
      />
      <Container className="relative grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow flex items-center gap-4">
            <span aria-hidden className="h-px w-10 bg-champagne/50" />
            Conheça a NBM Consórcios
          </p>
          <h2 className="mt-8 text-4xl font-medium leading-[1.05] tracking-tight text-fog md:text-6xl">
            Planejar também
            <br />
            <span className="font-serif italic text-parchment">é conquistar.</span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ash">
            Imóvel, carro ou a expansão da sua empresa, sem pagar juros ao
            banco. A mesma lógica de planejamento, aplicada à sua próxima
            conquista.
          </p>

          <p className="hairline-t mt-10 max-w-md pt-6 text-sm text-silver">
            Crédito de <span className="font-semibold text-fog">{brl(credito)}</span>{" "}
            a partir de{" "}
            <span className="font-serif text-2xl">
              <span className="stat-gold">{brlCentavos(parcelaReduzida)}</span>
            </span>
            <span className="text-ash">/mês</span>
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <PillButton href={site.consorcioPage} newTab className="w-full sm:w-auto">
              Conhecer a NBM Consórcios →
            </PillButton>
            <PillButton
              href={`${site.consorcioPage}#simulador`}
              newTab
              variant="outline"
              className="w-full sm:w-auto"
            >
              Simular agora
            </PillButton>
          </div>
        </div>

        {/* A carta inteira é link para /consorcios (nova aba, como os
            botões). No mobile ela "ameaça passar" para a próxima carta do
            baralho (.carta-teaser, globals.css) — convite ao toque. */}
        <div className="lg:mr-0">
          <a
            href={site.consorcioPage}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conhecer a NBM Consórcios (abre em nova aba)"
            className="carta-teaser block rounded-3xl focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-blue-light"
          >
            <CartaCredito />
          </a>
          <p
            aria-hidden
            className="mt-10 text-center text-[0.62rem] font-medium uppercase tracking-[0.26em] text-ash lg:hidden"
          >
            Toque na carta para conhecer <span className="carta-teaser__seta inline-block">→</span>
          </p>
        </div>
      </Container>
    </section>
  );
}
