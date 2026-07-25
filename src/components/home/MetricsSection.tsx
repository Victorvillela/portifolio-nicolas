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
      className="bg-pale-gradient hairline-light-t py-20 md:py-28"
    >
      <Container>
        <dl className="grid grid-cols-1 gap-y-12 sm:grid-cols-3 sm:gap-x-8">
          {metrics.map((metric) => (
            <div key={metric.label} className="text-center md:text-left">
              {/* Número em dourado (linguagem de resultado financeiro,
                  a mesma da barra de métricas do hero). Variante
                  -on-light: o par de ouro do tema escuro reprova
                  contraste sobre branco — ver tokens. */}
              <dd className="stat-gold-on-light font-serif text-4xl md:text-5xl">
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
