/*
  Conteúdo da página /consorcios (NBM Consórcios) — tudo editável aqui,
  sem tocar em componentes.

  ATENÇÃO (mesma regra do resto do site: nada de dado inventado):
  as taxas abaixo são VALORES DE REFERÊNCIA de mercado, usados no
  comparativo e no simulador. TODO: confirmar com a NBM Consórcios
  parceira a taxa de administração real de cada grupo e atualizar os
  juros médios dos bancos pela tabela do Banco Central antes de publicar.
*/

export type TipoConsorcio = "imovel" | "veiculo";

/* Cards "O que é possível conquistar" */
export const conquistas = [
  {
    id: "imovel",
    titulo: "Imóveis",
    texto:
      "Casa, apartamento, terreno ou sala comercial — parcelas planejadas e segurança para comprar, construir ou reformar.",
  },
  {
    id: "veiculo",
    titulo: "Veículos",
    texto:
      "Planeje o carro novo ou seminovo sem juros, com parcelas mensais que cabem no seu orçamento.",
  },
  {
    id: "pesados",
    titulo: "Pesados e agro",
    texto:
      "Caminhões, máquinas e implementos para renovar a frota ou ampliar a operação da sua empresa.",
  },
  {
    id: "servicos",
    titulo: "Serviços",
    texto:
      "Reforma, educação, viagens e outros projetos pessoais pagos de forma organizada, sem crédito caro.",
  },
] as const;

/*
  Comparativo (gráfico) — taxas ao ANO.
  consorcio = taxa de administração diluída por ano de plano.
  banco     = juros médios do financiamento bancário.
  TODO: validar valores (ver aviso no topo do arquivo).
*/
export const taxas: Record<
  TipoConsorcio,
  { rotulo: string; consorcioAA: number; bancoAA: number }
> = {
  imovel: { rotulo: "Imobiliário", consorcioAA: 1, bancoAA: 8 },
  veiculo: { rotulo: "Veículo", consorcioAA: 2, bancoAA: 22 },
};

/*
  Plano usado no SIMULADOR e no cartão do hero — coeficientes tirados
  das simulações reais da NBM Consórcios enviadas pelo cliente
  (2026-11-11), todas em 220 meses:

    parcela cheia   = crédito × 0,5645%
      R$ 80.000  → R$ 451,60   |  R$ 450.000 → R$ 2.540,25
    parcela reduzida (até a contemplação) = crédito × 0,29182%
      R$ 200.000 → R$ 583,64   |  R$ 450.000 → R$ 1.313,10

  Após a contemplação a parcela volta ao valor cheio (R$ 2.540,45 no
  print de R$ 450 mil). Atualizar aqui se a NBM Consórcios mudar as
  condições.
*/
export const plano = {
  prazo: 220,
  coefParcelaCheia: 0.005645,
  coefParcelaReduzida: 0.0029182,
  valorMin: 80_000,
  valorMax: 1_000_000,
  passo: 5_000,
  valorPadrao: 200_000,
  // atalhos = valores das simulações de referência
  atalhos: [80_000, 100_000, 200_000, 450_000],
};

export const fonteComparativo =
  "Comparativo com base nas taxas médias de juros praticadas pelos bancos, divulgadas pelo Banco Central do Brasil. Valores aproximados, apenas para referência.";

/* Como funciona — 4 passos */
export const passos = [
  {
    titulo: "Defina seu objetivo",
    texto:
      "Escolha o valor da carta de crédito e o prazo que cabem no seu planejamento. A gente ajuda a encaixar isso na sua estratégia patrimonial.",
  },
  {
    titulo: "Contribua mensalmente",
    texto:
      "Você paga parcelas sem juros, apenas com a taxa de administração diluída ao longo do plano. Sem entrada obrigatória.",
  },
  {
    titulo: "Participe das assembleias",
    texto:
      "Todo mês há contemplações por sorteio e por lance. Com estratégia de lance, dá para antecipar a conquista.",
  },
  {
    titulo: "Conquiste com a carta",
    texto:
      "Contemplado, você usa a carta de crédito à vista para comprar o bem — e negocia como quem paga em dinheiro.",
  },
];

/* Para quem é — perfis (ideia de "persona tiles") */
export const perfis = [
  {
    pergunta: "Quer sair do aluguel?",
    texto: "Troque o aluguel por parcelas que constroem patrimônio próprio.",
  },
  {
    pergunta: "Vai trocar de carro?",
    texto: "Planeje a troca sem pagar juros do financiamento ao banco.",
  },
  {
    pergunta: "Investe em imóveis?",
    texto: "Use cartas de crédito como alavancagem planejada do patrimônio.",
  },
  {
    pergunta: "Tem uma empresa?",
    texto: "Renove frota, máquinas e estrutura sem comprometer o caixa.",
  },
];

/* Comparação honesta — quando faz sentido x pontos de atenção */
export const vantagens = [
  "Sem juros: você paga apenas a taxa de administração.",
  "Sem entrada obrigatória e com parcelas menores que as do financiamento.",
  "Carta de crédito com poder de compra à vista.",
  "Pode usar o FGTS em consórcio de imóvel, conforme as regras vigentes.",
  "Regulado e fiscalizado pelo Banco Central do Brasil.",
];

export const pontosDeAtencao = [
  "A contemplação não tem data marcada: depende de sorteio ou lance.",
  "Faz mais sentido para quem pode planejar, não para urgência.",
  "A carta é reajustada por índice ao longo do plano, assim como as parcelas.",
  "Cancelar antes do fim tem regras próprias de devolução.",
];

/* FAQ da página — respostas gerais sobre o produto */
export const faqConsorcio = [
  {
    question: "O que é consórcio?",
    answer:
      "É uma modalidade de compra planejada em grupo: os participantes pagam parcelas mensais e, todo mês, parte deles é contemplada com uma carta de crédito para comprar o bem ou serviço. É regulada pela Lei 11.795/2008 e fiscalizada pelo Banco Central.",
  },
  {
    question: "Há cobrança de juros nas parcelas?",
    answer:
      "Não. No consórcio não há juros. O custo é a taxa de administração, diluída ao longo do plano, além do fundo de reserva e de seguro, quando previstos no contrato.",
  },
  {
    question: "O que é contemplação?",
    answer:
      "É o momento em que a sua cota é sorteada ou tem o lance vencedor na assembleia. A partir daí, a carta de crédito fica disponível para a compra do bem.",
  },
  {
    question: "O que é lance?",
    answer:
      "É a oferta de antecipar parcelas para aumentar a chance de contemplação. Os lances maiores na assembleia são contemplados. Uma boa estratégia de lance é uma das formas de acelerar a conquista.",
  },
  {
    question: "Em quanto tempo serei contemplado?",
    answer:
      "Não existe data garantida — pode acontecer no primeiro mês ou ao longo do plano. Desconfie de quem promete contemplação com data certa. O que podemos fazer é montar uma estratégia de lance compatível com o seu prazo.",
  },
  {
    question: "Posso usar o FGTS?",
    answer:
      "Em consórcio de imóveis, sim, para dar lance, amortizar ou quitar parcelas, desde que sejam cumpridas as regras do FGTS para aquisição de imóvel.",
  },
  {
    question: "O que acontece se eu cancelar?",
    answer:
      "Você deixa de pagar e passa a concorrer à devolução dos valores pagos (descontadas as taxas previstas em contrato) nos sorteios de cotas canceladas ou ao fim do grupo, conforme o regulamento.",
  },
];

/*
  Campanha Black Friday — valores do material da campanha enviado
  pelo cliente (2026-11-11). Para encerrar a campanha: ativa = false.
*/
export const blackFriday = {
  ativa: true,
  creditoBase: 100_000,
  parcelaBase: 567,
  creditoDobro: 200_000,
  parcelaDobro: 583.64,
  // diferença mensal para ter o dobro do crédito
  aMais: 16.64,
};
