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
      className="relative bg-navy px-6 pb-24 md:px-10 md:pb-32"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-gold/30 bg-[#04070d] shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
        {/* brilhos: vermelho discreto no canto, dourado sob os números */}
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-red-600/20 blur-3xl" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 right-0 h-96 w-[28rem] rounded-full bg-gold/10 blur-3xl" />
        {/* faixa diagonal fina, assinatura de "etiqueta" */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05] [background-image:repeating-linear-gradient(135deg,var(--color-gold)_0_1px,transparent_1px_22px)]" />

        <div className="relative grid gap-12 p-8 md:p-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-16">
          {/* TÍTULO */}
          <div>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-red-500/40 bg-red-500/10 px-4 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.26em] text-red-400">
              <span aria-hidden className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-500 opacity-60 motion-reduce:hidden" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
              </span>
              Condição por tempo limitado
            </span>

            <h2 className="mt-8 leading-[0.9]">
              <span className="block text-6xl font-black uppercase tracking-tight text-fog md:text-8xl">
                Black
              </span>
              <span className="stat-gold block font-serif text-6xl italic md:text-8xl">
                Friday
              </span>
            </h2>

            <p className="mt-8 max-w-sm text-lg leading-snug text-silver">
              <span className="font-semibold text-fog">O dobro do crédito</span>{" "}
              por apenas{" "}
              <span className="stat-gold font-semibold">{brlCentavos(b.aMais)}</span>{" "}
              a mais por mês.
            </p>
          </div>

          {/* COMPARAÇÃO */}
          <div className="flex flex-col gap-4">
            {/* antes */}
            <div className="grid grid-cols-[1fr_auto] items-center gap-6 rounded-2xl border border-fog/10 bg-fog/[0.03] px-6 py-5 md:px-8">
              <div>
                <p className="eyebrow">Crédito de</p>
                <p className="mt-1 text-2xl font-semibold text-silver md:text-3xl">{brl(b.creditoBase)}</p>
              </div>
              <div className="border-l border-fog/10 pl-6 text-right">
                <p className="text-xs text-ash">que você pagaria</p>
                <p className="mt-1 text-xl font-semibold text-ash line-through decoration-red-500/80 decoration-2 md:text-2xl">
                  {brlCentavos(b.parcelaBase)}
                </p>
              </div>
            </div>

            {/* depois — destaque */}
            <div className="relative grid grid-cols-[1fr_auto] items-center gap-6 rounded-2xl border border-gold/50 bg-linear-to-br from-gold/10 to-transparent px-6 py-6 shadow-[0_0_60px_rgba(217,168,78,0.15)] md:px-8 md:py-7">
              <div>
                <p className="eyebrow text-gold/80">Você terá um crédito de</p>
                <p className="mt-1 text-3xl font-semibold text-fog md:text-4xl">{brl(b.creditoDobro)}</p>
              </div>
              <div className="border-l border-gold/30 pl-6 text-right">
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
