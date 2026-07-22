/*
  Logos de clientes/parceiros para o ClientLogoMarquee.
  Regra do briefing: NUNCA inventar empresas. Enquanto não houver logos reais
  autorizados, o marquee exibe marcas neutras de placeholder.
  TODO: substituir por logos reais autorizados (arquivos em /public/images/clients/).
*/

export type ClientLogo = {
  name: string;
  src?: string;
  isPlaceholder: boolean;
};

export const clients: ClientLogo[] = [
  { name: "Parceiro 01", isPlaceholder: true },
  { name: "Parceiro 02", isPlaceholder: true },
  { name: "Parceiro 03", isPlaceholder: true },
  { name: "Parceiro 04", isPlaceholder: true },
  { name: "Parceiro 05", isPlaceholder: true },
  { name: "Parceiro 06", isPlaceholder: true },
];
