import { plano, taxas } from "@/data/consorcio";

/*
  Simulação do consórcio de imóvel com base nas condições reais do plano
  (ver data/consorcio.ts → plano). O financiamento entra só como
  referência: tabela Price com os juros médios ao ano do comparativo,
  no mesmo prazo, sem entrada, CET, seguros nem tarifas.
*/
export function simular(credito: number) {
  const { prazo, coefParcelaCheia, coefParcelaReduzida } = plano;

  const parcelaCheia = credito * coefParcelaCheia;
  const parcelaReduzida = credito * coefParcelaReduzida;
  const totalConsorcio = parcelaCheia * prazo;

  const i = Math.pow(1 + taxas.imovel.bancoAA / 100, 1 / 12) - 1;
  const parcelaFinanciamento = (credito * i) / (1 - Math.pow(1 + i, -prazo));
  const totalFinanciamento = parcelaFinanciamento * prazo;

  return {
    prazo,
    parcelaCheia,
    parcelaReduzida,
    totalConsorcio,
    parcelaFinanciamento,
    totalFinanciamento,
    economia: totalFinanciamento - totalConsorcio,
  };
}

const formatoBRL = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  maximumFractionDigits: 0,
});

const formatoBRLCentavos = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

export const brl = (valor: number) => formatoBRL.format(Math.round(valor));
export const brlCentavos = (valor: number) => formatoBRLCentavos.format(valor);
