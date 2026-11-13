import { blackFriday } from "@/data/consorcio";
import { site } from "@/data/site";
import { brl, brlCentavos } from "@/lib/simulacao";
import { PillButton } from "@/components/ui/PillButton";

/*
  Banner Black Friday — recriado em HTML (não a arte em imagem) para
  ficar nítido em qualquer tela e falar a língua visual da NBM: fundo
  quase preto, dourado da marca nos números e um único toque de
  vermelho no selo da campanha. Liga/desliga em data/consorcio.ts.
*/
export function BlackFridayBanner() {
  if (!blackFriday.ativa) return null;
  const b = blackFriday;

  const mensagem = `Olá! Vi a condição de Black Friday no site: crédito de ${brl(b.creditoDobro)} por ${brlCentavos(b.parcelaDobro)}. Quero garantir minha vaga.`;
  const whatsapp = `${site.whatsapp}?text=${encodeURIComponent(mensagem)}`;

  return (
    <section
      id="black-friday"
      aria-label="Condição especial de Black Friday"
      className="relative bg-navy px-4 pb-24 sm:px-6 md:px-10 md:pb-32"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[1.5rem] border border-gold/30 bg-[#04070d] shadow-[0_40px_120px_rgba(0,0,0,0.55)] sm:rounded-[2rem]">
        {/* brilhos: vermelho discreto no canto, dourado sob os números */}
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 h-96 w-[28rem] rounded-full bg-gold/10 blur-3xl" />
        {/* faixa diagonal fina, assinatura de "etiqueta" */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(135deg,var(--color-gold)_0_1px,transparent_1px_22px)]" />

        {/* grid-cols-1 + min-w-0 nos filhos: sem isso a trilha "auto"
            cresce até o min-content dos valores e empurra o card para
            fora da tela no celular */}
        <div className="relative grid grid-cols-1 gap-10 p-5 sm:p-8 md:gap-12 md:p-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* TÍTULO */}
          <div className="min-w-0">
            <span className="inline-flex max-w-full items-center gap-2.5 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-red-400 sm:text-[0.62rem] sm:tracking-[0.26em]">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Condição por tempo limitado
            </span>

            <h2 className="mt-8 leading-[0.9]">
              <span className="block text-5xl font-black uppercase tracking-tight text-fog sm:text-6xl md:text-8xl">
                Black
              </span>
              <span className="stat-gold block font-serif text-5xl italic sm:text-6xl md:text-8xl">
                Friday
              </span>
            </h2>

            <p className="mt-6 max-w-sm text-base leading-snug text-silver sm:mt-8 sm:text-lg">
              <span className="font-semibold text-fog">O dobro do crédito</span>{" "}
              por apenas{" "}
              <span className="stat-gold font-semibold">{brlCentavos(b.aMais)}</span>{" "}
              a mais por mês.
            </p>
          </div>

          {/* COMPARAÇÃO */}
          {/* No celular cada cartão empilha crédito e parcela (divisória
              horizontal); a partir de sm volta ao lado a lado */}
          <div className="flex min-w-0 flex-col gap-4">
            {/* antes */}
            <div className="grid grid-cols-1 gap-4 rounded-2xl border border-fog/10 bg-fog/[0.03] px-5 py-5 sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 md:px-8">
              <div className="min-w-0">
                <p className="eyebrow">Crédito de</p>
                <p className="mt-1 text-2xl font-semibold text-silver md:text-3xl">{brl(b.creditoBase)}</p>
              </div>
              <div className="border-t border-fog/10 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
                <p className="text-xs text-ash">que você pagaria</p>
                <p className="mt-1 text-xl font-semibold text-ash line-through decoration-red-500/80 decoration-2 md:text-2xl">
                  {brlCentavos(b.parcelaBase)}
                </p>
              </div>
            </div>

            {/* depois — destaque */}
            <div className="relative grid grid-cols-1 gap-4 rounded-2xl border border-gold/50 bg-linear-to-br from-gold/10 to-transparent px-5 py-6 shadow-[0_0_60px_rgba(217,168,78,0.15)] sm:grid-cols-[1fr_auto] sm:items-center sm:gap-6 md:px-8 md:py-7">
              <div className="min-w-0">
                <p className="eyebrow text-gold/80">Você terá um crédito de</p>
                <p className="mt-1 text-3xl font-semibold text-fog md:text-4xl">{brl(b.creditoDobro)}</p>
              </div>
              <div className="border-t border-gold/30 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0 sm:text-right">
                <p className="text-xs uppercase tracking-[0.2em] text-gold/80">por apenas</p>
                <p className="stat-gold mt-1 font-serif text-4xl md:text-5xl">{brlCentavos(b.parcelaDobro)}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs leading-relaxed text-ash">
                São poucas vagas. Condição válida enquanto
                <br className="hidden sm:block" /> houver grupos disponíveis.
              </p>
              <PillButton href={whatsapp} className="w-full sm:w-auto">
                Garantir minha vaga
              </PillButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
