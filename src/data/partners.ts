/*
  Parceiros institucionais exibidos no PartnersMarquee.

  Cada item é um "lockup": símbolo da marca + texto em dois níveis
  (linha principal em caixa alta + legenda menor). Novos parceiros: basta
  acrescentar aqui — a esteira mede o ciclo em runtime e ajusta sozinha
  quantas repetições precisa.

  MARCA DA XP: o briefing original restringia a menção à XP a texto
  institucional, sem o logotipo. O cliente autorizou o uso da marca em
  2026-07-25, então o selo oficial passou a ser exibido. Se a XP revogar
  a autorização, basta remover o `icon` deste item — o bloco volta a ser
  só texto sem quebrar o layout.
*/

export type Partner = {
  /** símbolo da marca; ausente quando o uso do logo não é autorizado */
  icon?: {
    src: string;
    width: number;
    height: number;
    /**
     * "invert": arte escura, convertida para branco por filtro.
     * "none": arte já branca (ou com vazados que o filtro destruiria).
     */
    tint: "invert" | "none";
  };
  /** linha principal, exibida em caixa alta (uma entrada por linha) */
  titleLines: string[];
  /** legenda menor abaixo da linha principal */
  caption?: string;
  /** nome acessível do bloco inteiro */
  label: string;
};

export const partners: Partner[] = [
  {
    label: "XP Investimentos",
    icon: {
      src: "/parceiros/xp-logo.svg",
      width: 30,
      height: 28,
      // selo branco com as letras vazadas: inverter destruiria o vazado
      tint: "none",
    },
    titleLines: ["Agente Autônomo", "de Investimentos"],
    caption: "XP Investimentos",
  },
  {
    label: "Mont Capital",
    icon: {
      src: "/parceiros/mont-icon.webp",
      width: 74,
      height: 47,
      tint: "invert",
    },
    titleLines: ["Mont"],
    caption: "Capital",
  },
];
