/*
  Serviços reais declarados publicamente pela NBM Consultoria (briefing).
  Não assumir regulamentação ou credenciais não informadas.
*/

export type Service = {
  number: string;
  title: string;
  description: string;
};

export const services: Service[] = [
  {
    number: "01",
    title: "Análise financeira",
    description:
      "Avaliação da saúde financeira de indivíduo ou empresa — balanços, demonstrações de resultados e fluxos de caixa.",
  },
  {
    number: "02",
    title: "Planejamento financeiro",
    description:
      "Metas de longo prazo estruturadas: aposentadoria, compra de imóvel, expansão de negócios.",
  },
  {
    number: "03",
    title: "Gestão de investimentos",
    description:
      "Aconselhamento considerando perfil de risco, objetivos e horizonte temporal.",
  },
  {
    number: "04",
    title: "Acompanhamento contínuo",
    description:
      "Monitoramento regular e ajuste das recomendações conforme as circunstâncias mudam.",
  },
];
