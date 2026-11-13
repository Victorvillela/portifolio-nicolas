import { type ReactNode } from "react";

/*
  Valor de parcela borrado nas cartas de vitrine (convite da home e
  baralho do hero de /consorcios). Pedido do cliente, 2026-11-13: fora
  do simulador só o crédito aparece; a parcela certa é a da simulação.

  O borrão é só visual: o número fica fora da árvore de acessibilidade
  (aria-hidden) e o leitor de tela ouve "valor no simulador" no lugar,
  para não anunciar uma parcela que a página diz não ser a definitiva.
*/
export function ValorBorrado({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className}`}>
      {/* borrão LEVE e proporcional à fonte (pedido do cliente: ainda
          aparece "um tiquinho" dos números — sugere o valor sem
          entregá-lo). ~2px num texto de 18px, ~4px num de 60px. */}
      <span
        aria-hidden
        className="pointer-events-none select-none [filter:blur(max(2px,0.065em))]"
      >
        {children}
      </span>
      <span className="sr-only">valor no simulador</span>
    </span>
  );
}
