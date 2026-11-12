# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, with equal weight (confirmed 2026-11-12):

- **Patrimônio / investimentos:** pessoas físicas e empresários em São Paulo que já têm patrimônio e querem decidir com mais clareza: investir, planejar a aposentadoria, organizar a sucessão, estruturar a empresa. Chegam desconfiados de "guru financeiro" e de produto pronto; procuram método e acompanhamento.
- **Consórcio:** quem quer comprar imóvel, veículo, pesados ou serviços sem pagar juros de financiamento e pode planejar no médio e longo prazo. Chegam comparando parcela e custo total com o financiamento bancário.

Both convert the same way: a conversation on WhatsApp.

## Product Purpose

Institutional site of NBM Consultoria (São Paulo/SP) plus the NBM Consórcios page (`/consorcios`). The site exists to build enough trust that the visitor opens a WhatsApp conversation: "Agendar uma conversa" on the consultoria side, "Falar com especialista" / simulation proposal on the consórcio side. Success = qualified WhatsApp conversations started.

## Positioning

"O mercado oferece produtos. Nós oferecemos um método." NBM sells a planning method and continuous follow-up, not a product. The consórcio is presented the same way: part of a patrimonial plan (prazo, estratégia de lance, acompanhamento), never as a lottery or a guaranteed-date purchase.

## Operating Context

- Every CTA ends on WhatsApp (`site.whatsapp` / `scheduleUrl` / `consorcioWhatsapp` in `src/data/site.ts`); the simulator pre-writes the simulation into the message.
- The consórcio page opens in a new tab from the home and has its own header (own nav, "Falar com especialista", link back to NBM Consultoria).
- All copy is pt-BR. Content lives in `src/data/*.ts`, not in components.

## Capabilities and Constraints

- Next.js 16 App Router, React 19, Tailwind CSS v4 (`@theme` tokens in `src/app/globals.css`), GSAP + Lenis smooth scroll, framer-motion, three.js in the intro.
- Consórcio simulator: imóvel plan, 220 meses; parcela cheia = crédito × 0,5645%; parcela reduzida até a contemplação = crédito × 0,29182% (from the client's real simulations, `src/data/consorcio.ts → plano`).
- Black Friday campaign values (R$ 100 mil → R$ 567,00; R$ 200 mil → R$ 583,64; +R$ 16,64) are toggled by `blackFriday.ativa`.
- **Open:** comparison chart rates (1% / 2% a.a. consórcio vs 8% / 22% a.a. bancos) are reference values pending confirmation; consórcio products other than imóvel have no confirmed pricing yet.

## Brand Commitments

- **NBM Consultoria** and **NBM Consórcios** are separate brands: the consórcio has its own identity and is linked to the consultoria only by a way back (header link, logo).
- **Never name other companies** (administradoras such as Ademicon, competitors, banks by name). Single exception: the **XP Investimentos** partnership may appear on the home (partners section).
- Institutional voice: speaks as the company, not as a person; direct, serious, no hype, no "fique milionário".
- Must not look like: generic fintech template, digital bank, crypto exchange, investing course/infoproduct, finance guru, generic SaaS landing (from `briefing.md`).
- Logo: `public/images/nbmlogo.png` / `nbmlogo-transparent.png`.

## Evidence on Hand

- Metrics confirmed by the client: +300 clientes atendidos, R$ 100M patrimônio sob gestão, 8 anos de experiência de mercado (`src/data/metrics.ts`).
- Address, social handles and service pillars from NBM's official profiles (`src/data/site.ts`).
- Real consórcio simulations (credit 80k / 200k / 450k, 220 meses) and the Black Friday campaign values.
- **Absent, must not be fabricated:** testimonials, case results, returns/rentabilidade, contemplation dates, certifications, the consultant's full name and title (TODO in `site.ts`).

## Product Principles

1. **Método antes de produto.** Every surface explains the plan and the follow-up, not just the offer.
2. **Só dado real.** No invented numbers, clients, rates or promises; unconfirmed data stays marked TODO or out of the page.
3. **Honestidade gera confiança.** Show the points of attention (contemplação sem data, reajustes, cancelamento) next to the advantages.
4. **Uma ação clara por página.** Everything leads to one WhatsApp conversation.
5. **A NBM fala sozinha.** No third-party brand in the copy except the XP partnership on the home.

## Accessibility & Inclusion

Compliance texts are mandatory: CVM/regulatory disclaimer on the consultoria side; on the consórcio side, "não é proposta nem garantia de contemplação" and the simulation assumptions. Respect `prefers-reduced-motion` (already handled in the marquee and magnetic button).
