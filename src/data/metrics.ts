/*
  Métricas exibidas na HOME institucional.
*/

export type Metric = {
  value: string;
  label: string;
  isPlaceholder: boolean;
};

export const metrics: Metric[] = [
  { value: "+300", label: "Clientes atendidos", isPlaceholder: false },
  { value: "R$ 100M", label: "Patrimônio sob gestão", isPlaceholder: false },
  { value: "8 anos", label: "Experiência de mercado", isPlaceholder: false },
];
