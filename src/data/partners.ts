/*
  Parceiros institucionais exibidos no PartnersMarquee.
  Regra do briefing: menção à XP sempre em TEXTO institucional — nunca o
  logotipo oficial (compliance). Novos parceiros: basta adicionar itens
  aqui; o marquee (lista duplicada + translateX(-50%)) se ajusta sozinho.

  Logos de arquivo (public/parceiros/): exibidos em branco/prata sobre o
  navy via filter brightness-0 invert (o arquivo original tem texto
  escuro). Baixados do site oficial do parceiro em 2026-07-25.
*/

export type Partner =
  | {
      kind: "text";
      /* linha principal, exibida em caixa alta */
      highlight: string;
      /* legenda menor abaixo, em prata */
      caption?: string;
    }
  | {
      kind: "logo";
      src: string;
      alt: string;
      /* dimensões intrínsecas do arquivo (next/image) */
      width: number;
      height: number;
    };

export const partners: Partner[] = [
  {
    kind: "text",
    highlight: "Agente Autônomo de Investimentos",
    caption: "XP Investimentos",
  },
  {
    kind: "logo",
    src: "/parceiros/mont-logo.webp",
    alt: "Mont Capital",
    width: 147,
    height: 48,
  },
];
