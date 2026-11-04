import { ctaLabels, site } from "@/data/site";

/*
  Abas de serviço da home: cada uma troca a mensagem do hero e os blocos
  da seção logo abaixo. Investimentos reaproveita os textos de site.ts.
  TODO: validar os textos de Consórcios com o cliente/compliance.
*/
export const serviceTabs = [
  {
    id: "investimentos",
    tab: "Investimentos",
    title: site.heroTitle,
    badges: site.heroBadges,
    cta: { label: ctaLabels.header, href: site.scheduleUrl },
    sectionTitle: "Como cuidamos do seu patrimônio",
    cards: [
      {
        title: "Leitura completa",
        text: "Objetivos, horizonte de tempo, tolerância a risco e momento de vida analisados em conjunto.",
      },
      {
        title: "Recomendação sob medida",
        text: "A recomendação nasce do seu contexto, e não de um produto pronto.",
      },
      {
        title: "Acompanhamento contínuo",
        text: "O patrimônio segue alinhado ao seu propósito ao longo do tempo.",
      },
    ],
  },
  {
    id: "consorcios",
    tab: "Consórcios",
    title: {
      line1: "Seu próximo bem",
      line2: "precisa de planejamento.",
      line3: "Não de pressa.",
    },
    badges: ["Aquisição Planejada", "Sorteio ou Lance", "Sem Juros"],
    cta: { label: "Quero conhecer o consórcio", href: site.consorcioUrl },
    sectionTitle: "Como funciona o consórcio",
    cards: [
      {
        title: "Planejamento da aquisição",
        text: "Valor da carta de crédito, prazo e parcela definidos de acordo com o seu orçamento.",
      },
      {
        title: "Sorteio ou lance",
        text: "A contemplação acontece por sorteio ou por lance, sem data garantida.",
      },
      {
        title: "Sem juros, com taxas",
        text: "Não há juros, mas há taxa de administração e demais encargos previstos em contrato.",
      },
    ],
  },
];
