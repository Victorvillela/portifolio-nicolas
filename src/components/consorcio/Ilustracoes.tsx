/*
  Ilustrações dos cards "O que é possível conquistar" — SVG próprio, na
  paleta da marca (navy, azuis do logo, toque dourado), em vez das
  ilustrações 3D genéricas da referência. Todas decorativas (aria-hidden).
*/

const base = "h-full w-full";

function Chao() {
  return <ellipse cx="60" cy="92" rx="46" ry="5" className="fill-blue/10" />;
}

function Imovel() {
  return (
    <svg viewBox="0 0 120 100" className={base} aria-hidden>
      <Chao />
      {/* corpo */}
      <rect x="26" y="44" width="62" height="46" rx="2" className="fill-blue-pale" />
      <rect x="26" y="44" width="62" height="46" rx="2" className="fill-none stroke-blue/40" strokeWidth="1.2" />
      {/* telhado */}
      <path d="M18 48 L57 16 L96 48 Z" className="fill-navy-elevated" />
      <path d="M57 16 L96 48 L90 48 L57 22 Z" className="fill-blue" />
      {/* chaminé */}
      <rect x="76" y="22" width="8" height="16" className="fill-navy-elevated" />
      {/* porta */}
      <rect x="50" y="64" width="14" height="26" rx="7" className="fill-blue" />
      <circle cx="60" cy="78" r="1.2" className="fill-gold" />
      {/* janelas */}
      <rect x="33" y="56" width="12" height="12" rx="1.5" className="fill-blue-light/70" />
      <rect x="70" y="56" width="12" height="12" rx="1.5" className="fill-blue-light/70" />
      <path d="M39 56 V68 M33 62 H45 M76 56 V68 M70 62 H82" className="stroke-white/80" strokeWidth="1" />
      {/* arbusto */}
      <circle cx="98" cy="84" r="7" className="fill-accent/70" />
      <circle cx="105" cy="87" r="5" className="fill-accent/50" />
      {/* chave dourada */}
      <g transform="translate(6 70) rotate(-25)">
        <circle cx="6" cy="6" r="5" className="fill-none stroke-gold" strokeWidth="2.2" />
        <path d="M11 6 H24 M20 6 V10 M24 6 V9" className="stroke-gold" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </svg>
  );
}

function Veiculo() {
  return (
    <svg viewBox="0 0 120 100" className={base} aria-hidden>
      <Chao />
      {/* carroceria */}
      <path
        d="M10 74 C10 64 16 60 26 58 L40 44 C44 40 48 38 56 38 H76 C84 38 88 40 93 46 L102 58 C110 60 112 64 112 72 V78 H10 Z"
        className="fill-navy-elevated"
      />
      <path d="M10 70 H112 V78 H10 Z" className="fill-blue" />
      {/* vidros */}
      <path d="M44 46 C47 43 50 42 56 42 H64 V58 H32 Z" className="fill-blue-light/70" />
      <path d="M68 42 H76 C81 42 84 43 88 48 L95 58 H68 Z" className="fill-blue-light/70" />
      {/* faróis */}
      <rect x="104" y="64" width="7" height="4" rx="2" className="fill-gold" />
      <rect x="11" y="64" width="6" height="4" rx="2" className="fill-gold/60" />
      {/* rodas */}
      {[34, 88].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="80" r="11" className="fill-navy" />
          <circle cx={cx} cy="80" r="5" className="fill-silver" />
        </g>
      ))}
    </svg>
  );
}

function Pesados() {
  return (
    <svg viewBox="0 0 120 100" className={base} aria-hidden>
      <Chao />
      {/* baú */}
      <rect x="6" y="34" width="70" height="42" rx="3" className="fill-blue-pale" />
      <rect x="6" y="34" width="70" height="42" rx="3" className="fill-none stroke-blue/40" strokeWidth="1.2" />
      <path d="M20 40 V70 M34 40 V70 M48 40 V70 M62 40 V70" className="stroke-blue/20" strokeWidth="1.5" />
      {/* cabine */}
      <path d="M80 46 H100 L112 62 V78 H80 Z" className="fill-navy-elevated" />
      <path d="M86 50 H98 L106 62 H86 Z" className="fill-blue-light/70" />
      <rect x="80" y="70" width="32" height="8" className="fill-blue" />
      <rect x="106" y="66" width="6" height="4" rx="2" className="fill-gold" />
      {/* rodas */}
      {[22, 58, 96].map((cx) => (
        <g key={cx}>
          <circle cx={cx} cy="82" r="9" className="fill-navy" />
          <circle cx={cx} cy="82" r="4" className="fill-silver" />
        </g>
      ))}
    </svg>
  );
}

function Servicos() {
  return (
    <svg viewBox="0 0 120 100" className={base} aria-hidden>
      <Chao />
      {/* maleta */}
      <path d="M46 34 V28 C46 25 48 23 51 23 H69 C72 23 74 25 74 28 V34" className="fill-none stroke-navy-elevated" strokeWidth="4" />
      <rect x="22" y="34" width="76" height="52" rx="6" className="fill-navy-elevated" />
      <rect x="22" y="52" width="76" height="6" className="fill-blue" />
      <rect x="54" y="48" width="12" height="14" rx="2" className="fill-gold" />
      {/* brilhos */}
      <path d="M100 18 L103 26 L111 29 L103 32 L100 40 L97 32 L89 29 L97 26 Z" className="fill-gold" />
      <path d="M16 18 L18 23 L23 25 L18 27 L16 32 L14 27 L9 25 L14 23 Z" className="fill-blue-light/70" />
    </svg>
  );
}

const mapa = {
  imovel: Imovel,
  veiculo: Veiculo,
  pesados: Pesados,
  servicos: Servicos,
} as const;

export function Ilustracao({ id }: { id: keyof typeof mapa }) {
  const Componente = mapa[id];
  return <Componente />;
}
