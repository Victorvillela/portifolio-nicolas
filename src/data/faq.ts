/*
  FAQ — perguntas frequentes (briefing).

  REGRA DE COMPLIANCE IMPORTANTE: os itens marcados com [TODO: ...] não
  podem ser preenchidos com suposições — modelo de remuneração, valores
  mínimos e políticas comerciais mudam o enquadramento regulatório da
  empresa perante a CVM/XP e só podem vir do cliente. Deixar o
  placeholder visível no código até a confirmação chegar.
*/

export type FaqItem = {
  question: string;
  answer: string;
};

export const faq: FaqItem[] = [
  {
    question: "Qual o patrimônio mínimo para atendimento?",
    answer:
      "[TODO: confirmar faixa mínima real com o cliente antes de publicar]",
  },
  {
    question: "Preciso trocar de corretora ou banco?",
    answer:
      "Não. A consultoria trabalha em cima da estrutura onde o seu patrimônio já está — o que passa a existir é uma camada de estratégia e acompanhamento sobre ele.",
  },
  {
    question: "Como funciona a cobrança pela consultoria?",
    answer:
      "[TODO: confirmar modelo de remuneração real — fee-based, comissão ou híbrido — com o cliente antes de publicar. NÃO assumir fee-based por padrão.]",
  },
  {
    question: "A NBM vende produtos financeiros próprios?",
    answer: "[TODO: confirmar resposta com o cliente antes de publicar]",
  },
  {
    question: "Como funciona o acompanhamento depois que me torno cliente?",
    answer:
      "Monitoramento regular das suas finanças, com ajuste das recomendações conforme suas circunstâncias e objetivos mudam ao longo do tempo.",
  },
];
