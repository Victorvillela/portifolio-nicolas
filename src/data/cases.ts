/*
  Cases — CONTEÚDO PLACEHOLDER, claramente marcado (briefing).
  Regras: sem rentabilidade, sem ganhos, sem promessas, sem clientes inventados.
  TODO: substituir por cases reais e anonimizados, validados com compliance.
*/

export type CaseStudy = {
  category: string;
  title: string;
  challenge: string;
  context: string;
  strategy: string;
  outcome: string;
  isPlaceholder: boolean;
};

export const cases: CaseStudy[] = [
  {
    category: "Estruturação patrimonial",
    title: "Do acúmulo disperso à direção única",
    challenge:
      "[PLACEHOLDER] Patrimônio distribuído em produtos desconexos, sem tese central.",
    context:
      "[PLACEHOLDER] Contexto profissional e familiar exigindo liquidez em janelas específicas.",
    strategy:
      "[PLACEHOLDER] Diagnóstico completo, definição de política de investimentos e realocação gradual por etapas.",
    outcome:
      "[PLACEHOLDER] Estrutura consolidada com papéis definidos para cada classe de ativo — sem menção a rentabilidade.",
    isPlaceholder: true,
  },
  {
    category: "Planejamento de longo prazo",
    title: "Horizonte de década, decisões de hoje",
    challenge:
      "[PLACEHOLDER] Objetivo de independência financeira sem plano estruturado de aportes.",
    context:
      "[PLACEHOLDER] Renda concentrada em atividade principal, pouco tempo para acompanhar mercado.",
    strategy:
      "[PLACEHOLDER] Plano de acumulação com rebalanceamento periódico e revisões semestrais.",
    outcome:
      "[PLACEHOLDER] Rotina de decisão previsível e alinhada ao horizonte — sem promessa de resultado.",
    isPlaceholder: true,
  },
  {
    category: "Reorganização de risco",
    title: "Risco dimensionado ao contexto",
    challenge:
      "[PLACEHOLDER] Exposição a risco incompatível com o momento de vida e objetivos.",
    context:
      "[PLACEHOLDER] Mudança de fase profissional exigindo revisão completa do perfil.",
    strategy:
      "[PLACEHOLDER] Reavaliação de perfil, redistribuição por classes e proteção de liquidez essencial.",
    outcome:
      "[PLACEHOLDER] Carteira coerente com o contexto real do investidor — comparação puramente qualitativa.",
    isPlaceholder: true,
  },
];
