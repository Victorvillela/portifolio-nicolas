/*
  Métricas exibidas na HOME institucional.
*/

export type Metric = {
  value: string;
  label: string;
  isPlaceholder: boolean;
};

export const metrics: Metric[] = [
  { value: "+200", label: "Clientes atendidos", isPlaceholder: false },
  { value: "R$ 70M", label: "Patrimônio sob gestão", isPlaceholder: false },
  { value: "5 anos", label: "Experiência de mercado", isPlaceholder: false },
];
