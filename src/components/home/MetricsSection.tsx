import { metrics } from "@/data/metrics";
import { Container } from "@/components/ui/Container";

/*
  Métricas — valores placeholder centralizados em data/metrics.ts.
  TODO: substituir por métricas reais e verificáveis antes de publicar.
*/
export function MetricsSection() {
  return (
    <section
      aria-label="Métricas"
      className="hairline-light-t bg-paper-soft py-20 md:py-28"
    >
      <Container>
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center md:text-left">
              <dd className="font-serif text-4xl text-navy-text md:text-5xl">
                {metric.value}
              </dd>
              <dt className="eyebrow eyebrow-light mt-3">{metric.label}</dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
