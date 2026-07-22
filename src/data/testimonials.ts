/*
  Depoimentos — CONTEÚDO PLACEHOLDER, claramente marcado (briefing).
  Substitui a antiga seção de Cases: a NBM não pode expor cases de
  clientes, então esta seção mostra feedbacks reais de pessoas cujas
  carteiras o Nicolas gerencia.

  REGRAS DE COMPLIANCE (não negociáveis):
  - Falar apenas de atendimento, clareza, confiança e experiência de
    serviço — NUNCA de rentabilidade, ganhos percentuais ou promessas
    de resultado ("dobrei meu dinheiro", "rendeu X%" etc. são proibidos,
    mesmo que o cliente tenha dito isso literalmente).
  - Não inventar nenhum depoimento — os 3 itens abaixo são placeholders.
  - Cada depoimento publicado precisa de autorização por escrito do
    cliente antes de ir ao ar.
  - A NBM já possui avaliações públicas no perfil comercial (Google) —
    dá para reaproveitá-las aqui, mas só com autorização dos autores.
*/

export type Testimonial = {
  quote: string;
  /* nome completo — uso interno/registro de autorização */
  name: string;
  /* nome exibido publicamente (pode ser abreviado, ex. "Felipe C.") */
  displayName: string;
  role?: string;
  avatarSrc?: string;
  isPlaceholder: boolean;
};

// PLACEHOLDER — substituir por depoimentos reais e autorizados
export const testimonials: Testimonial[] = [
  {
    quote: "[Depoimento real do cliente aqui]",
    name: "[Nome completo — TODO: confirmar autorização por escrito]",
    displayName: "Cliente A.",
    role: "Empresário",
    isPlaceholder: true,
  },
  {
    quote: "[Depoimento real do cliente aqui]",
    name: "[Nome completo — TODO: confirmar autorização por escrito]",
    displayName: "Cliente B.",
    role: "Médica",
    isPlaceholder: true,
  },
  {
    quote: "[Depoimento real do cliente aqui]",
    name: "[Nome completo — TODO: confirmar autorização por escrito]",
    displayName: "Cliente C.",
    role: "Investidor desde 2022",
    isPlaceholder: true,
  },
];
