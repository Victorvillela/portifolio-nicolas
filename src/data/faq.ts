/*
  FAQ — perguntas frequentes.

  Conteúdo integral fornecido pelo cliente (2026-07-25) — substituiu os
  placeholders [TODO] de compliance que existiam aqui. Qualquer alteração
  futura de texto deve vir do cliente, nunca de suposição (valores
  mínimos, modelo de remuneração e políticas comerciais mudam o
  enquadramento regulatório perante a CVM/XP).
*/

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Qual o patrimônio mínimo para atendimento?",
    answer:
      "Na NBM Consultoria, acreditamos que um bom planejamento financeiro deve ser acessível para quem busca crescimento patrimonial. Avaliamos cada caso de forma individual para oferecer uma estratégia adequada ao perfil, aos objetivos e ao momento financeiro de cada cliente.",
  },
  {
    question: "Preciso trocar de corretora ou banco?",
    answer:
      "Não necessariamente. Analisamos sua estrutura atual e, sempre que possível, aproveitamos os investimentos que você já possui. Caso exista uma alternativa mais eficiente, apresentamos as opções e a decisão é sempre do cliente.",
  },
  {
    question: "A NBM vende produtos financeiros próprios?",
    answer:
      "Não. A NBM atua de forma independente, buscando as melhores soluções disponíveis no mercado para cada cliente. Nosso compromisso é recomendar estratégias alinhadas aos seus objetivos, e não direcionar investimentos por interesse comercial.",
  },
  {
    question: "Como funciona o acompanhamento depois que me torno cliente?",
    answer:
      "O relacionamento não termina após a contratação. Realizamos acompanhamento contínuo da carteira, revisões periódicas da estratégia e ajustes sempre que houver mudanças no mercado ou nos objetivos do cliente, garantindo que seu patrimônio permaneça alinhado ao seu planejamento financeiro.",
  },
];
