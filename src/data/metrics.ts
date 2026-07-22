/*
  Métricas exibidas na HOME institucional.
  TODO: substituir por métricas reais e verificáveis — os valores abaixo são
  placeholders visuais e NÃO devem ir ao ar como se fossem números reais.
*/

export type Metric = {
  value: string;
  label: string;
  isPlaceholder: boolean;
};

export const metrics: Metric[] = [
  { value: "XX+", label: "Clientes atendidos", isPlaceholder: true },
  { value: "R$ XXM", label: "Patrimônio analisado", isPlaceholder: true },
  { value: "XX", label: "Estratégias estruturadas", isPlaceholder: true },
  { value: "XX anos", label: "Experiência", isPlaceholder: true },
];
