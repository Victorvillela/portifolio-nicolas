# PROMPT PARA CLAUDE CODE — Website Institucional Premium (Consultor de Investimentos XP)

> **Como usar este arquivo:**
> 1. Cole este prompt inteiro na primeira mensagem do Claude Code, dentro da pasta do projeto (ou pasta vazia, se for começar do zero).
> 2. Use **Sonnet** para as ETAPAS 1, 5, 6, 7 e 8 (estrutura, design system, vídeo cinematográfico, HOME institucional, cases, responsividade, performance) — são tarefas de arquitetura, layout e conteúdo, onde Sonnet é rápido e confiável.
> 3. Quando chegar nas **ETAPAS 2 a 4** (Canvas 3D, shaders, morphing de partículas, câmera cinematográfica, revelação de perfil) e no **COMPLEMENTO TÉCNICO WEBGL**, troque para **Fable** — é a parte que exige raciocínio mais profundo em matemática 3D, GLSL e otimização de performance de shader. O próprio documento tem marcadores de "⚠️ PARADA OBRIGATÓRIA" indicando exatamente onde trocar de modelo — o Claude Code vai parar e te avisar nesses pontos, então é só trocar o modelo na interface e mandar continuar.
> 4. Não precisa colar tudo de uma vez para o modelo executar tudo de uma vez — o próprio prompt já pede que o Claude Code trabalhe por etapas e valide build/lint/typecheck a cada uma. Você pode literalmente colar o prompt inteiro e deixar ele parar entre etapas, trocando de modelo quando for a vez do 3D.
> 5. **Importante:** este arquivo é só texto — as duas imagens de referência não estão anexadas a ele. Ao abrir a conversa no Claude Code, anexe novamente as duas imagens junto com este prompt (o Claude Code aceita imagens como anexo normalmente). A descrição textual das referências abaixo serve de reforço, caso o modelo não processe bem os anexos de imagem durante uma tarefa de geração de código longa.

### Descrição textual das duas imagens de referência (reforço, caso as imagens não sejam recarregadas)

**Referência A — "Business Profile":** hero em fundo claro/branco com bloco escuro sobreposto contendo: menu horizontal simples (Home / Services / Portfolio / Contact), headline serifada grande à esquerda ("Investing for the Future Prospects"), foto executiva de corpo/busto à direita em tom dramático, dois CTAs em pílula ("Work With me" / "View Venture"), faixa de logos de veículos de imprensa (Bloomberg, Forbes, WSJ) em preto e branco abaixo do hero, e uma seção de duas colunas numeradas (01 / 02) com textos institucionais curtos. Uso de dourado/champagne como cor de destaque pontual (não dominante), tipografia serifada para headline e sans-serif para corpo de texto, muito espaço negativo e composição assimétrica com curva/forma orgânica dourada no canto.

**Referência B — "Unlock Sustainable Growth":** hero em fundo quase preto totalmente escuro, header flutuante com cápsula de menu central translúcida (Home / Services / Case Studies / About / Contact) e botão "Book a Strategy Call" em pílula clara à direita, badge de prova social acima da headline ("16.000+ avaliações positivas"), headline branca grande com parte do texto em gradiente cinza (efeito de leitura/luz), subtexto curto explicativo, dois CTAs (pílula clara + outline escuro), e abaixo um vídeo/imagem central em card com bordas arredondadas mostrando um executivo sério sentado à mesa, com botão de play sobreposto. Tom geral: minimalista, alto contraste, muito preto, tipografia sans-serif bold, sensação de autoridade e seriedade corporativa.

Usar essas duas referências como guia de: paleta (preto profundo + acentos claros/dourados), hierarquia tipográfica (headline grande + subtexto curto + CTAs em pílula), estrutura de header flutuante em cápsula, e uso de fotografia executiva como elemento central de confiança — sem copiar layout ou textos literalmente.

---

## CONTEXTO DO PROJETO

Quero criar um website institucional premium, cinematográfico e altamente interativo para a **NBM Consultoria** — consultoria financeira sediada em São Paulo/SP, credenciada junto à XP Investimentos, com o consultor **Nicolas** como rosto/marca pessoal da empresa.

### Dados reais do cliente (fonte: presença pública da NBM — usar como base de conteúdo)

- **Marca:** NBM Consultoria
- **Consultor principal:** Nicolas *(TODO: confirmar nome completo e título profissional com o cliente antes de publicar)*
- **Localização:** São Paulo, SP
- **Posicionamento público:** "empresa especializada em ajudar clientes a terem atitudes financeiras da forma mais assertiva e sustentável ao longo do tempo" — realizam estudos, analisam e apontam tendências com referência em dados de ativos, orientando o cliente a organizar melhor o orçamento e alcançar resultados mais eficientes.
- **Serviços declarados publicamente:**
  - Análise Financeira — avaliação da saúde financeira de indivíduo ou empresa (balanços, demonstrações de resultados, fluxos de caixa)
  - Planejamento Financeiro — metas de longo prazo (aposentadoria, compra de imóvel, expansão de negócios)
  - Gestão de Investimentos — aconselhamento considerando perfil de risco, objetivos e horizonte temporal
  - Acompanhamento — monitoramento regular e ajuste das recomendações conforme as circunstâncias mudam
- **Credenciamento:** a NBM se apresenta publicamente como credenciada junto à XP Investimentos. *(TODO: confirmar a forma jurídica exata do credenciamento — agente autônomo / escritório credenciado / consultoria CVM — antes de escrever o texto legal do site.)*
- **Patrimônio sob gestão:** as fontes públicas da própria NBM divergem (uma menciona R$ 5 milhões+, outra R$ 50 milhões+). **NÃO publicar nenhum dos dois valores** — usar placeholder `[R$ XXM]` em `data/site.ts` com comentário `// TODO: confirmar valor real e verificável com o cliente antes de publicar`.
- **Redes sociais:** Instagram `@nbmconsultoria` · Facebook `nbmfinanceira` · WhatsApp comercial · LinkedIn (empresa NBM Consultoria)

Analise as duas imagens de referência anexadas (uma delas com o padrão "Business Profile" em tons pretos e dourados com foto executiva; outra com um hero escuro estilo "Unlock Sustainable Growth", vídeo central e prova social).

**IMPORTANTE:** Não quero copiar literalmente os sites de referência. Use-as apenas como direção de arte: composição, sensação premium, tipografia, contraste, hierarquia visual e seriedade.

### O site deve transmitir
- confiança
- solidez patrimonial
- estratégia
- inteligência analítica
- exclusividade
- visão de longo prazo
- tecnologia
- seriedade institucional (mercado de capitais, XP)

### O site NÃO deve parecer
- template genérico de fintech
- banco digital
- corretora de criptomoedas
- curso de investimentos / infoproduto
- guru financeiro / "fica milionário"
- landing page SaaS genérica

Quero uma experiência próxima de uma **consultoria de investimentos boutique** e uma **gestora patrimonial moderna** — não uma página de vendas de curso.

### Regras de conteúdo obrigatórias (não negociáveis)
- Não inventar rentabilidade, ganhos ou promessas de resultado.
- Não inventar clientes, logos de empresas ou depoimentos.
- Não inventar certificações (CEA, CFP, CNPI etc.) — usar placeholders configuráveis que só aparecem se eu preencher os dados reais.
- Não inventar número de registro na XP, CVM ou qualquer credencial regulatória.
- Incluir sempre disclaimers genéricos e configuráveis sobre risco de mercado e caráter institucional do conteúdo (nunca like recomendação de investimento específica).
- O nome "XP" e a identidade visual da marca XP não devem ser usados como se o site fosse da própria XP — é o site da **NBM Consultoria**, que se apresenta publicamente como credenciada junto à XP Investimentos. Tratar isso como texto institucional de parceria/credenciamento (ex.: "consultoria credenciada junto à XP Investimentos"), com aviso legal apropriado e a forma jurídica exata confirmada com o cliente, sem usar o logotipo oficial da XP sem autorização.

---

## CONCEITO CENTRAL / NARRATIVA

A narrativa principal do site é:

**CAOS → DADOS → CLAREZA → ESTRATÉGIA → PATRIMÔNIO**

O site começa com uma experiência cinematográfica em 3D. Durante o scroll, o elemento 3D evolui e conta essa história. Depois, o site faz uma transição suave para uma HOME institucional tradicional e premium. A experiência inicial não deve parecer separada do resto do site — ela é a introdução narrativa da marca pessoal.

---

## STACK TÉCNICA

Antes de desenvolver, analisar o projeto existente (se houver) e não destruir funcionalidades existentes.

- Next.js
- TypeScript
- Tailwind CSS
- React Three Fiber
- Three.js
- @react-three/drei
- GSAP + GSAP ScrollTrigger
- Lenis (smooth scroll)
- Framer Motion (apenas microinterações e componentes UI, não para o 3D principal)

Para o 3D: shaders customizados quando necessário, instanced meshes/BufferGeometry para partículas, otimização de draw calls. **Não usar vídeo pré-renderizado para simular o 3D principal — precisa ser WebGL real, reagindo ao mouse.**

---

## DIREÇÃO VISUAL

**Background:** `#070707`, `#0A0A0A`, `#101010` — preto profundo e níveis sutis de cinza.

**Texto principal:** `#F2F2F0`
**Texto secundário:** `#8C8C88`

**Detalhes metálicos:** champagne gold muito discreto, bronze escuro, off-white. Evitar dourado exagerado, estética de cassino ou luxo artificial.

O luxo deve vir de: espaço negativo, tipografia, movimento, fotografia, composição, acabamento, animações suaves.

Adicionar: grain/noise extremamente sutil, radial gradients discretos, iluminação volumétrica simulada, bordas finas, glass effects muito controlados (evitar excesso de glassmorphism).

## TIPOGRAFIA

Editorial e institucional.

- Sans serif moderna: Geist / Inter / Manrope
- Serif editorial para frases de impacto: Instrument Serif / Cormorant Garamond / DM Serif Display

Usar textos gigantes em momentos-chave, ex.:

> "Seu patrimônio precisa de estratégia."
> *"Não de sorte."* (serif italic)

---

## HEADER

Header flutuante premium. Logo **NBM Consultoria** à esquerda (usar o logotipo real da NBM se o arquivo for fornecido em `/public/images/logo-nbm.svg`; até lá, wordmark tipográfico "NBM CONSULTORIA" em tracking largo como placeholder). Menu central em cápsula escura, seguindo a **ordem da Referência B** (Home / Services / Case Studies / Contact):

`INÍCIO · SERVIÇOS · CASES · CONTATO`

(a seção "SOBRE" continua existindo na página — ver `AboutSection` mais abaixo — só não fica como item do menu principal, pra manter o header limpo igual à referência.)

À direita: **"AGENDAR CONVERSA"**.

Backdrop blur, borda 1px extremamente sutil, background preto translúcido, animação suave ao scroll. No início da experiência 3D o header fica discreto; ao entrar na HOME institucional, assume aparência completa.

---

## ATO 01 — HERO 3D

Tela cheia (100svh), background quase preto. No centro, um objeto 3D abstrato representando um patrimônio ainda sem estrutura.

**Não usar:** moeda, cifrão, bitcoin, barras financeiras óbvias, porquinho, carteira, gráfico genérico, touro/urso de bolsa.

Criar uma escultura digital abstrata — núcleo, organismo, rede, fluxo de capital, dados — sem representar nenhum desses elementos literalmente. Formada por partículas, linhas, filamentos, pontos luminosos, estruturas geométricas, superfícies metálicas fragmentadas. Flutua lentamente.

**Mouse interaction:** altera levemente rotação, posição de câmera, iluminação e deslocamento de partículas. Nada exagerado — sofisticado.

Texto:

> SEU PATRIMÔNIO
> PRECISA DE ESTRATÉGIA.
>
> NÃO DE SORTE.

Indicador discreto: **"ROLE PARA ESTRUTURAR"**.

---

## ATO 02 — O OBJETO SE DESMONTA

Seção de scroll controlado (300vh–500vh) com GSAP ScrollTrigger. Canvas 3D sticky/fixed. Conforme o scroll: o objeto perde a forma, partículas se desprendem, linhas estruturais aparecem, o caos começa a se organizar.

Frases sincronizadas ao progresso do scroll:

> "Informação não é estratégia."
> "Movimento não é crescimento."
> "Patrimônio exige direção."

Combinar mask reveal, clipping, blur, translate e opacity — não usar fade genérico em tudo.

---

## ATO 03 — TRANSFORMAÇÃO EM GRÁFICO

As partículas ocupam posições predeterminadas e formam uma curva de crescimento **dentro do ambiente 3D** (não um gráfico HTML). Linha tridimensional, pontos de dados, profundidade, grid extremamente discreto. Câmera muda lentamente de perspectiva inclinada para alinhada.

Textos: "Pequenas decisões." → "Grandes diferenças." → "Quando o tempo entra na equação."

Segunda linha "fantasma" extremamente sutil representando trajetória sem estratégia (irregular) vs. linha principal (estruturada). **Não usar vermelho/verde de trading** — contraste via opacidade, brilho e espessura.

---

## ATO 04 — TRANSIÇÃO PARA IDENTIDADE PESSOAL

O gráfico avança, a câmera acompanha a linha, que atravessa a tela como máscara/transição. O ambiente escurece.

> "GRÁFICOS MOSTRAM O PASSADO."
> "ESTRATÉGIA PREPARA O FUTURO."
> "MAS TODA ESTRATÉGIA PRECISA DE ALGUÉM POR TRÁS DELA."

---

## ATO 05 — REVELAÇÃO (o objeto 3D se desmancha e revela você, em vídeo)

**Mudança de conceito importante em relação a versões anteriores deste briefing:** aqui não entra uma foto estática. Entra um **vídeo em tela cheia**, revelado organicamente pelas próprias partículas do objeto 3D se desmontando — não um corte, não um fade genérico.

Sequência pretendida:

1. O `DataNode` principal do fim da curva do gráfico (ver Complemento Técnico, seção "Transição do gráfico para a foto") cresce e vira o ponto de origem da revelação.
2. As partículas que ainda restam na cena não somem — elas migram e se comprimem formando algo próximo de uma silhueta/moldura ao redor da área onde o vídeo vai aparecer (mantendo o princípio de morphing de posições já usado no resto do sistema — não é um efeito novo e solto, é o mesmo sistema de partículas assumindo mais uma posição-alvo).
3. Dentro dessa moldura, usando a mesma técnica de projeção 3D→DOM (`Vector3.project(camera)` + proxy DOM) já especificada no Complemento Técnico, nasce um **vídeo full-bleed** (não uma foto) — inicialmente pequeno/comprimido, expandindo via GSAP até ocupar a maior parte da tela (aprox. 55–65% da composição, podendo ultrapassar os limites do container, como pedido originalmente para a foto).
4. Vídeo placeholder: `/public/videos/profile-reveal.mp4` (loop curto, mudo, tratamento visual em grayscale parcial/contraste alto/sombras profundas via CSS — sem destruir a qualidade). **Não gerar uma pessoa fictícia** — este vídeo é seu, a ser gravado/fornecido depois; até lá, deixar o placeholder claramente comentado no código.
5. Assim que o vídeo estabiliza em tela, revelar o texto de identidade, em sequência curta e com peso tipográfico forte:

> "Estratégia também precisa de alguém por trás dela."
>
> **VOCÊ.**
>
> Prazer, Nicolas.

Depois, nome e headline configuráveis (arquivo de conteúdo separado, `data/site.ts`):

```
nome: "Nicolas"                        // TODO: confirmar nome completo com o cliente
marca: "NBM Consultoria"
headline: "Consultoria estratégica para quem quer tomar decisões financeiras com mais clareza, inteligência e visão de longo prazo."
```

Sobreposto ou ao lado do vídeo (respeitando espaço negativo, sem empilhar em cima do rosto):

`ESTRATÉGIA.`
`TECNOLOGIA.`
`PATRIMÔNIO.`

Parallax extremamente suave no vídeo (desloca 5–10px conforme o mouse se move) + leve glow/luz acompanhando o cursor de forma discreta — o mesmo princípio de "o ambiente percebe o usuário" já usado no objeto 3D, não "o vídeo persegue o cursor".

Mensagem principal (abaixo, em bloco de texto separado, tipografia editorial, serif italic na segunda linha):

> "Eu acredito que patrimônio não é construído tentando prever cada movimento do mercado."
> "É construído tomando decisões melhores, repetidamente, ao longo do tempo."
> "Meu trabalho é transformar complexidade em direção."

**Nota técnica:** este vídeo de revelação (`profile-reveal.mp4`) pode ser o mesmo arquivo usado depois, em versão mais longa, no Ato 07 (vídeo cinematográfico em tela cheia) — ou um arquivo diferente, mais curto, pensado só como "retrato em movimento". Deixar isso configurável em `data/site.ts` (`profileRevealVideoSrc` e `manifestoVideoSrc` podendo apontar para o mesmo arquivo ou não). Todos os textos em arquivo de conteúdo separado, fácil de editar.

---

## ATO 06 — MANIFESTO

Seção tipográfica fullscreen, background preto, textos gigantes sincronizados com scroll:

> EU NÃO PREVEJO O MERCADO.
> EU ANALISO CENÁRIOS.
> ESTRUTURO DECISÕES.
> E CONSTRUO ESTRATÉGIAS.
> PARA O LONGO PRAZO.

Typography motion: deslizar, revelar por máscaras, mudar peso, alterar tracking. Evitar animações chamativas.

---

## ATO 07 — VÍDEO

Vídeo cinematográfico começando pequeno e crescendo com o scroll (20vw → 90vw), border radius diminuindo. Texto acima: "Antes de falar sobre investimentos..." / abaixo: "Precisamos falar sobre decisões."

**Tratamento visual do card:** seguir a referência visual do vídeo da Referência B — card com cantos arredondados, preview estático/muted centralizado, botão de play circular translúcido no centro, moldura sutil, fundo quase preto ao redor. Não copiar o conteúdo da referência (a pessoa, a cena da mesa), só o tratamento de card/enquadramento/play button.

Ao atingir tamanho máximo: botão play central + controles discretos. Placeholder: `/public/videos/manifesto.mp4`. Sem autoplay com áudio. Respeitar `prefers-reduced-motion`.

**Relação com o Ato 05:** este vídeo pode ser o mesmo arquivo usado na revelação de identidade (Ato 05), em uma versão mais longa/com fala, ou um arquivo diferente — deixar isso configurável em `data/site.ts`. Se for o mesmo arquivo, este Ato 07 funciona como o "mergulho completo" (com áudio e controles) naquilo que já foi mostrado de relance, mudo, no Ato 05.

### Camada adicional — vídeo como textura sutil dentro do objeto 3D

Além da seção de vídeo cheia do Ato 07, quero uma **segunda aparição do vídeo, discreta, dentro do próprio ambiente WebGL**, antes dessa seção — não como substituto, como reforço narrativo.

Conceito:
- Usar `THREE.VideoTexture` aplicado a uma ou poucas superfícies pequenas dentro da cena 3D (por exemplo: uma das faces do `WealthCore`, ou um dos `DataNodes` estratégicos perto do fim da curva do gráfico, ATO 03–04).
- O vídeo (mesmo arquivo `/public/videos/manifesto.mp4` ou um recorte/preview dele) aparece **muito discreto**: baixa opacidade, escala pequena, bordas com falloff/glow (mesmo tratamento de alpha das partículas), quase como um "fragmento de memória" dentro da estrutura de dados — não deve competir visualmente com o objeto principal.
- Ativar essa textura apenas numa janela específica do scroll progress (ex.: entre 0.70 e 0.88, na fase CHART GROWTH / EXIT TRANSITION do Complemento Técnico), sincronizada com o mesmo `narrative.progress` — não criar uma timeline própria.
- O vídeo deve estar sempre **muted** nessa aparição dentro do 3D (sem controles, sem play button) — é puramente visual/atmosférico. Controles e áudio só existem na seção cheia do Ato 07.
- Performance: pausar/decodificar o vídeo apenas quando essa janela de scroll estiver ativa (usar `video.play()`/`video.pause()` conforme o progress entra/sai do range, não manter decodificando o tempo todo). Em mobile, desativar essa camada por padrão (usar poster/frame estático no lugar) para não sobrecarregar o shader.
- Fazer o dispose correto da `VideoTexture` e do elemento `<video>` ao desmontar o componente, seguindo a mesma disciplina de memory management do restante do sistema 3D.

Resultado esperado: ao rolar a página, o usuário vê rapidamente um vislumbre sutil do vídeo "vivendo" dentro da estrutura de dados/gráfico 3D — reforçando a ideia de que por trás dos números existe uma pessoa real — e só depois, no Ato 07, o vídeo se revela por completo como elemento de destaque em tela cheia.

---

## TRANSIÇÃO PARA HOME

Linha horizontal aparece com o texto **"ESTRATÉGIA EM PRÁTICA."**, se expande, e a composição deixa de ser experimental — entramos na HOME institucional, agora sim próxima visualmente das referências anexadas (grid consistente, containers, cards, tipografia institucional), mantendo o mesmo DNA visual.

---

## HOME INSTITUCIONAL

**Hero institucional:**

> "Clareza para decisões que atravessam o tempo."
> "Estratégia patrimonial e inteligência financeira para transformar objetivos em decisões estruturadas, com o suporte da rede XP Investimentos."

CTAs: `AGENDAR UMA CONVERSA` · `CONHECER A ESTRATÉGIA`

Reutilizar discretamente o objeto 3D inicial, agora organizado, estável, estruturado — simbolizando que o patrimônio encontrou direção.

**Credibilidade:** seção "ESTRATÉGIA CONSTRUÍDA COM CONFIANÇA." + componente `ClientLogoMarquee` (logos carregados de array/config, placeholders neutros até logos reais existirem — nunca inventar empresas). Grayscale, animação lenta, leve aumento de opacidade no hover. Se houver menção à XP, usar apenas texto institucional (ex. "Agente autônomo de investimentos vinculado à XP Investimentos CCTVM S.A.") — sem uso do logotipo oficial sem autorização.

**Métricas (placeholders, nunca inventados como reais):**
```
[ XX+ ]      CLIENTES ATENDIDOS
[ R$ XXM ]   PATRIMÔNIO SOB GESTÃO   // TODO: fontes públicas da NBM divergem (R$5M+ vs R$50M+) — confirmar valor real com o cliente antes de publicar
[ XX ]       ESTRATÉGIAS ESTRUTURADAS
[ XX ANOS ]  EXPERIÊNCIA
```
Centralizados em arquivo de dados, com comentário `// TODO: substituir por métricas reais e verificáveis`.

**Cases:** headline "Decisões reais. Estratégias construídas para contextos reais." Cards grandes com categoria, título, desafio, contexto, estratégia, resultado — **sem inventar rentabilidade, ganhos ou promessas**. Conteúdo placeholder claramente marcado. Hover sofisticado (zoom 1.00→1.03, seta se move).

**Metodologia:** "Patrimônio não é um produto. É um sistema." — 4 pilares, agora alinhados à metodologia pública da própria NBM:

```
01 ANÁLISE          Avaliar a saúde financeira: balanços, resultados, fluxo de caixa e contexto.
02 PLANEJAMENTO     Definir e estruturar metas de longo prazo — aposentadoria, imóvel, expansão de negócio.
03 GESTÃO           Construir decisões de investimento alinhadas ao perfil de risco, objetivos e horizonte.
04 ACOMPANHAMENTO   Monitorar regularmente e ajustar as recomendações conforme as circunstâncias mudam.
```

Desktop: lista à esquerda, visual abstrato à direita reagindo à etapa ativa (pode reaproveitar elementos do sistema 3D).

**Serviços:** cards com título, descrição, número, CTA — usando os serviços reais declarados pela NBM (descrições em `data/services.ts`, editáveis):
`ANÁLISE FINANCEIRA · PLANEJAMENTO FINANCEIRO · GESTÃO DE INVESTIMENTOS · ACOMPANHAMENTO CONTÍNUO`
Evitar ícones genéricos do Lucide em excesso — priorizar tipografia e composição. Não assumir regulamentação ou credenciais além das informadas na seção de contexto.

**Tecnologia:** "TECNOLOGIA PARA ANALISAR. ESTRATÉGIA PARA DECIDIR." — dados e tecnologia apoiam análise e organização de informação; **não vender IA como previsão de mercado**. Visualização abstrata de dados (canvas ou WebGL leve).

**Sobre:** segunda apresentação pessoal, mais institucional, foto `/public/images/profile-about.webp` (foto real do Nicolas, a ser fornecida — **não gerar pessoa fictícia**), layout tipo perfil executivo: nome (Nicolas — confirmar nome completo), título profissional configurável (ex.: "Consultor de Investimentos · NBM Consultoria"), biografia configurável baseada no posicionamento público da NBM ("ajudar clientes a tomarem atitudes financeiras mais assertivas e sustentáveis ao longo do tempo"). Blocos opcionais de experiência/formação/especialidades/certificações — **se não houver dado real, o bloco fica oculto**, nunca preenchido com invenção.

**CTA final:** objeto 3D do início retorna, agora estruturado, estável, simétrico, iluminação sutil.

> "Seu patrimônio já existe."
> "Agora ele precisa de direção."

CTA: `CONSTRUIR MINHA ESTRATÉGIA` com microinteração magnética no botão.

**Footer:** minimalista — marca NBM Consultoria, menu, redes sociais reais (Instagram `@nbmconsultoria`, Facebook `nbmfinanceira`, LinkedIn da empresa, WhatsApp comercial — links em `data/site.ts`), e-mail, São Paulo/SP, avisos legais configuráveis, espaço para disclaimer financeiro genérico:

> "Informações apresentadas neste site possuem caráter institucional e educativo, não constituindo recomendação de investimento. Consultoria e distribuição de produtos de investimento sujeitas à regulamentação da CVM e demais órgãos competentes. Rentabilidade passada não representa garantia de rentabilidade futura. Revisar conforme a atividade profissional e a regulamentação aplicável ao consultor/agente autônomo."

(placeholder — ajustar com o texto jurídico correto que a XP/compliance exigir).

---

## ANIMAÇÕES E PERFORMANCE

Toda animação precisa de propósito narrativo — nada de animar só porque é possível. Easing principal: `power3.out`, `power4.inOut`, `expo.inOut`. Movimentos lentos, parallax discreto, stagger controlado. Mouse interactions sutis. Implementar `prefers-reduced-motion`. Em mobile: reduzir partículas, simplificar shaders, reduzir parallax, desativar efeitos caros quando necessário.

**Meta:** Lighthouse Performance > 85 no desktop.

Implementar: dynamic import do Canvas 3D, lazy loading, compressão de textura, WebP/AVIF, cleanup de ScrollTrigger, DPR limitado, instanced meshes, memoização de geometrias, evitar re-render do Canvas no scroll. **Não atualizar estado React a cada pixel de scroll** — usar refs e animações imperativas.

## SEO E ACESSIBILIDADE

Metadata Next.js, OpenGraph, semantic HTML, aria-labels, navegação por teclado, contraste adequado, alt text, sitemap, robots. Canvas 3D deve ter fallback visual.

---

## ARQUITETURA DE PASTAS SUGERIDA

```
src/
  app/
  components/
    layout/
    ui/
    three/
    intro/
    home/
    cases/
  lib/
    animations/
    three/
  data/
    site.ts
    clients.ts
    cases.ts
    services.ts
  hooks/
  styles/
```

Componentes principais: `CinematicIntro`, `WealthCore`, `ParticleSystem`, `GrowthChart3D`, `ScrollNarrative`, `ProfileReveal`, `ManifestoSection`, `CinematicVideo`, `InstitutionalHero`, `ClientLogoMarquee`, `MetricsSection`, `CasesGrid`, `MethodologySection`, `ServicesSection`, `TechnologySection`, `AboutSection`, `FinalWealthCore`, `PremiumHeader`, `Footer`.

---

## PROCESSO DE DESENVOLVIMENTO — SEGUIR NESTA ORDEM

Antes de escrever qualquer código:
1. Analisar o projeto atual (se já existir código no repositório).
2. Analisar as imagens de referência anexadas.
3. Listar dependências existentes.
4. Definir a arquitetura.
5. Criar um plano de implementação.
6. Identificar riscos de performance.
7. Só então começar a implementação.

Implementar por etapas, executando **lint, typecheck e build após cada uma**, corrigindo erros antes de avançar:

- **ETAPA 1** — estrutura, design system e tipografia. *(modelo: Sonnet)*

> ⚠️ **PARADA OBRIGATÓRIA ANTES DA ETAPA 2.** Ao terminar a Etapa 1 (com lint/typecheck/build passando), pare e escreva claramente: *"Etapa 1 concluída. A partir daqui entramos no Canvas 3D — troque para o modelo Fable antes de continuar."* Não prossiga para a Etapa 2 na mesma resposta.

- **ETAPA 2** — Canvas e objeto 3D. *(modelo: Fable)*
- **ETAPA 3** — scroll narrative e transformação do objeto em gráfico. *(modelo: Fable)*
- **ETAPA 4** — profile reveal e manifesto. *(modelo: Fable para a transição 3D→DOM; a parte de texto/manifesto puro pode ficar para depois, com Sonnet)*

> ⚠️ **PARADA OBRIGATÓRIA ANTES DA ETAPA 5.** Ao terminar a Etapa 4, pare e escreva: *"Etapas 2–4 concluídas (Canvas 3D, morph e revelação). A parte pesada de shader/3D terminou aqui — pode voltar para o modelo Sonnet a partir da Etapa 5."* Não prossiga na mesma resposta.

- **ETAPA 5** — vídeo cinematográfico. *(modelo: Sonnet)*
- **ETAPA 6** — HOME institucional. *(modelo: Sonnet)*
- **ETAPA 7** — cases, clientes e metodologia. *(modelo: Sonnet)*
- **ETAPA 8** — responsividade e performance. *(modelo: Sonnet — mas se aparecer gargalo de performance especificamente no shader/partículas em mobile, avisar: "isso é ajuste de shader, melhor revisar com o modelo Fable")*

**Regras absolutas:**
- Não simplificar a experiência 3D para uma animação CSS.
- Não substituir o gráfico 3D por uma imagem.
- Não usar conteúdo financeiro fictício como se fosse real.
- Não inventar clientes, certificações ou resultados.

O resultado final deve parecer um website criado por uma agência digital premium especializada em experiências WebGL e marcas de consultoria de investimentos.

---

# COMPLEMENTO TÉCNICO OBRIGATÓRIO — EXPERIÊNCIA 3D / WEBGL

> ⚠️ **Confirme que o modelo atual é o Fable antes de continuar a partir daqui.** Todo o conteúdo abaixo (shaders, morphing de partículas, câmera cinematográfica) é a parte tecnicamente mais exigente do projeto. Se o modelo em uso ainda for o Sonnet, pare e peça para o usuário trocar para Fable antes de gerar qualquer código desta seção.

Trate a experiência 3D como o **principal elemento autoral** do projeto. Não simplificar. Não substituir por vídeo, sequência de imagens, Lottie, animação CSS, SVG animado, gráfico HTML ou canvas 2D.

A experiência principal usa WebGL real via Three.js + React Three Fiber + @react-three/drei. Scroll narrative controlado por GSAP + ScrollTrigger. Lenis para smooth scroll.

## Princípio visual do 3D

O elemento central representa o estado de um patrimônio, com três estados narrativos que são **o mesmo objeto se transformando** (nunca três objetos com fade entre eles):

- **STATE 01 — CHAOS:** patrimônio sem estrutura.
- **STATE 02 — ORGANIZATION:** dados e decisões sendo organizados.
- **STATE 03 — STRATEGY:** estrutura transformada em trajetória clara.

## Regra fundamental — morphing de posições

Cada partícula possui `originPosition`, `organizedPosition`, `chartPosition`. Conceitualmente:

```
currentPosition = mix(originPosition, targetPosition, progress)
```

Interpolar na GPU sempre que possível. **Não** atualizar milhares de partículas via `setState` do React dentro do scroll handler. Priorizar `BufferGeometry`, `BufferAttribute`, `ShaderMaterial` customizado, uniforms, GLSL. O progresso da narrativa vai ao shader via uniforms (`uProgress`, `uChaos`, `uOrganization`, `uChart`, `uMouse`, `uTime`).

## Arquitetura do sistema 3D

```
components/three/
  WealthExperience.tsx
  WealthScene.tsx
  WealthCore.tsx
  WealthParticles.tsx
  WealthConnections.tsx
  GrowthChart.tsx
  DataNodes.tsx
  WealthLighting.tsx
  WealthPostProcessing.tsx

lib/three/
  generateChaosPositions.ts
  generateOrganizedPositions.ts
  generateChartPositions.ts
  easing.ts
  noise.ts

shaders/
  wealthParticles.vert.glsl
  wealthParticles.frag.glsl
  wealthConnections.vert.glsl
  wealthConnections.frag.glsl

hooks/
  useWealthScrollProgress.ts
  usePointerInfluence.ts
  useReducedMotion.ts
```

Se a arquitetura atual do projeto for diferente, adaptar sem duplicar responsabilidades.

## STATE 01 — Chaos

Forma orgânica e assimétrica, gerada proceduralmente — **nunca** `SphereGeometry` + `PointsMaterial` padrão (parece tutorial básico). Combinar funções matemáticas por partícula:

```
radius = baseRadius
  + sin(theta * frequencyA) * amplitudeA
  + cos(phi * frequencyB) * amplitudeB
  + noise(position * noiseScale)
```

A silhueta deve ser interessante mesmo parada — evitar simetria perfeita. Contagem de partículas por dispositivo:

- Desktop: 8.000–20.000
- Tablet: 5.000–10.000
- Mobile: 2.000–5.000

Definir dinamicamente considerando devicePixelRatio e hardwareConcurrency (não só `window.innerWidth`).

## Partículas

Attributes: `aRandom`, `aScale`, `aPhase`, `aIntensity`. Variar no vertex shader tamanho, oscilação, profundidade e resposta ao mouse. Movimento orgânico via noise temporal:

```
position += normal * noise(position + time) * strength
```

Intensidade extremamente baixa — o objeto deve parecer vivo, não instável.

## Material

ShaderMaterial customizado (não `PointsMaterial` padrão), com centro definido, bordas suaves, glow controlado, alpha falloff via distância ao centro do point sprite (`gl_PointCoord`) e smoothstep para alpha. Paleta: off-white, warm gray, champagne sutil (`#F2F2F0`, `#B8B3A7`, `#8F8065`). Sem rainbow gradients, azul neon ou roxo cyberpunk.

## Wealth Core

Núcleo estrutural adicional (não esfera sólida simples) — IcosahedronGeometry deformado, custom geometry, wireframe fragmentado ou layered geometry. Baixa opacidade, movimento mais lento que as partículas (sensação de camadas).

## Conexões

Linhas estruturais entre um subconjunto estratégico de partículas (50–150 DataNodes) — **não** calcular distância entre todas as partículas por frame (O(n²)). Usar spatial hashing, grid partitioning ou pré-cálculo. Opacidade extremamente baixa. Conexões incompletas no CHAOS, aumentam na ORGANIZATION, diminuem cedendo espaço ao gráfico na STRATEGY.

## Mouse interaction

Normalizar mouse entre -1 e 1, com damping (`currentMouse = lerp(currentMouse, targetMouse, damping)`, nunca aplicar a posição diretamente). Influencia: rotação de câmera (2–4°), rotação do objeto (1–3°), deslocamento de partículas (sutil) e posição de luz (lenta). Sensação: "o ambiente percebe o usuário", não "o objeto persegue o cursor".

## Câmera

`PerspectiveCamera`, FOV 35–50, **sem OrbitControls** — câmera cinematográfica controlada pela narrativa (scroll > cinematic path > mouse offset). Keyframes conceituais de 0.00 a 1.00 do progress (frontal → aproximação → lateral → diagonal → acompanha transformação → próxima do gráfico → alinha gráfico → prepara transição para foto). Sem cortes — tudo interpolado, `CatmullRomCurve3` quando fizer sentido.

## Scroll progress — fonte única de verdade

Uma única timeline GSAP principal alimentando um objeto proxy (`narrative.progress` de 0 a 1), nunca dezenas de ScrollTriggers competindo. No render loop: `uniforms.uProgress.value = narrative.progress`.

```js
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: section,
    start: "top top",
    end: "+=500%",
    scrub: 1,
    pin: true
  }
});
const narrative = { progress: 0 };
timeline.to(narrative, { progress: 1 });
```

## Fases da timeline

```
0.00–0.15  INTRO / CHAOS
0.15–0.30  DESTABILIZATION
0.30–0.50  ORGANIZATION
0.50–0.70  CHART MORPH
0.70–0.88  CHART GROWTH
0.88–1.00  EXIT TRANSITION
```

Usar funções de remap com smoothstep/easing — não interpolar tudo linearmente.

### Destabilization (0.15–0.30)
Partículas externas se desprendem primeiro (`aEdgeFactor`), centro permanece estável, leve expansão (5–15%). Nunca uma explosão cinematográfica genérica.

### Organization (0.30–0.50)
Partículas migram para `organizedPosition`, formando fluxos/camadas/clusters (grupos: trajetória principal, estrutura de suporte, background data, future chart points). Noise e velocidade diminuem, conexões aparecem.

### Chart position generation
Função `generateChartPositions()` gera uma curva 3D via `CatmullRomCurve3` com pontos de controle (não uma reta simples). Para cada partícula: escolher `t`, obter ponto e tangente na curva, calcular vetor perpendicular, adicionar offset radial pequeno — resultado é um "ribbon" de partículas ao redor da curva (não uma `TubeGeometry` sólida).

### Morph para o gráfico

No vertex shader:

```glsl
vec3 posA = mix(aOriginPosition, aOrganizedPosition, organizationProgress);
vec3 finalPosition = mix(posA, aChartPosition, chartProgress);
```

Com stagger por partícula via `aPhase`:

```glsl
localProgress = smoothstep(aPhase, aPhase + transitionWindow, chartProgress);
```

Transformação deve percorrer o objeto (de baixo pra cima ou esquerda pra direita) — sensação de fluxo, não mudança simultânea.

### Chart reveal (0.50–0.70)
Uniform `uChartReveal` comparado com `aCurveProgress` por partícula, revelando a curva progressivamente (10%→30%→60%→100%) via alpha, scale e position influence.

## Growth chart

Linha fina acompanhando a curva (Line2 ou shader custom). DataNodes (7–12) com ponto, ring sutil, glow, profundidade, revelados durante o scroll. **Sem valores financeiros fictícios** (nada de "R$ 1M", "+250%", "ROI" sem dado real) — o gráfico é conceitual.

## Trajetória secundária
Segunda curva representando decisões sem estrutura: menor opacidade, linha mais fina, maior irregularidade. Sem vermelho, sem rótulos como "ruim" ou "perda" — comparação puramente conceitual (consistência vs. fragmentação).

## Grid
Grid customizado extremamente discreto (opacity < 0.08), com fade radial/depth nas extremidades, sem números nos eixos, sem estética de terminal Bloomberg.

## Iluminação
Ambient extremamente baixa, key light superior/lateral, rim light atrás do objeto, fill light discreta. Luzes reagindo levemente ao mouse. Sem cores saturadas. Contraste maior no CHAOS, mais detalhe na ORGANIZATION, iluminação mais limpa na STRATEGY — mudança gradual.

## Post-processing
Se usar `@react-three/postprocessing`: Bloom apenas em pontos de alta intensidade (não a cena toda), Vignette com controle. Evitar ChromaticAberration exagerado, Glitch, noise animado forte, RGB shift. Preferir noise/grain via overlay CSS global.

## Sincronização texto + WebGL
Textos ficam no DOM (não dentro do Canvas), em camada sobreposta com `pointer-events: none` quando apropriado, sincronizados ao mesmo `narrative progress` — nunca timelines desconectadas.

## Fases de texto (progress → texto)

```
0.00–0.12  "SEU PATRIMÔNIO PRECISA DE ESTRATÉGIA." / "NÃO DE SORTE."
0.18–0.27  "INFORMAÇÃO NÃO É ESTRATÉGIA."
0.32–0.42  "MOVIMENTO NÃO É CRESCIMENTO."
0.45–0.55  "PATRIMÔNIO EXIGE DIREÇÃO."
0.60–0.70  "PEQUENAS DECISÕES."
0.70–0.80  "GRANDES DIFERENÇAS."
0.80–0.88  "QUANDO O TEMPO ENTRA NA EQUAÇÃO."
0.90–0.96  "GRÁFICOS MOSTRAM O PASSADO."
0.96–1.00  "ESTRATÉGIA PREPARA O FUTURO."
```

Ajustar ranges se necessário para ritmo e legibilidade.

## Transição do gráfico para a foto

Não usar fade-to-black genérico. No fim da curva existe um DataNode principal — a câmera se aproxima, o node cresce e o glow se expande, a linha atravessa a tela horizontalmente como elemento de transição.

Estratégia recomendada: projetar a posição 3D do node em coordenadas de tela (`Vector3.project(camera)`), posicionar um proxy DOM exatamente sobre o node, e ao iniciar a transição esse elemento DOM assume visualmente o node e expande via GSAP — transição WebGL → DOM sem corte perceptível. A origem da máscara de revelação da foto deve corresponder à posição do DataNode (não um circle-reveal genérico desconectado).

## Retorno do objeto na HOME

O objeto retorna no `InstitutionalHero` e no CTA final, mas evitando renderizar múltiplos Canvas WebGL pesados simultaneamente — avaliar GlobalCanvas architecture ou desmontar a intro e montar versões simplificadas depois. Na HOME: STATE 03, pouco noise, movimento muito lento. No CTA final: estrutura quase simétrica, conexões claras, simbolizando direção.

## Responsividade

- **Desktop:** experiência completa.
- **Tablet:** menos partículas, post-processing reduzido, connections simplificadas.
- **Mobile:** não remover a narrativa, mas otimizar — 2.000–4.000 partículas, `DPR = Math.min(devicePixelRatio, 1.5)`, bloom desativado em devices fracos, mouse interaction reduzida (touch position só se necessário), sem scroll horizontal acidental, suporte a `100svh` (evitar bug da barra do Safari mobile).

## prefers-reduced-motion

Sem câmera cinematográfica intensa — estados simplificados (CHAOS → ORGANIZED → CHART) com transições suaves mais curtas. Textos sempre acessíveis.

## Memory management

Dispose de geometries, materials, textures, render targets. Remover ScrollTriggers ao desmontar. Cancelar RAF customizado. Não criar novos BufferAttributes a cada frame nem `Vector3` dentro de loops críticos do `useFrame` — reutilizar objetos temporários.

## Debug mode

Flag `NEXT_PUBLIC_3D_DEBUG=true` habilitando painel com FPS, particle count, DPR, scroll progress, fase narrativa atual, e controles (opcionalmente via Leva, só em dev) para particle size, noise strength, morph progress, chart reveal, mouse influence, bloom intensity. **Nunca** incluir o painel no build de produção.

## Critérios de aceite

- [ ] Objeto inicial com silhueta autoral (não parece esfera de tutorial)
- [ ] Mouse interaction sutil
- [ ] Scroll controla a narrativa de forma fluida
- [ ] É claramente o mesmo objeto durante toda a transformação
- [ ] Partículas realmente migram para as posições do gráfico
- [ ] Gráfico existe dentro do ambiente WebGL (não é imagem/HTML)
- [ ] Gráfico não usa dados financeiros fictícios
- [ ] Câmera se move sem cortes
- [ ] Textos sincronizados com a transformação
- [ ] Gráfico conecta visualmente com a seção da foto
- [ ] Mobile tem experiência otimizada
- [ ] `prefers-reduced-motion` funciona
- [ ] Sem memory leaks evidentes
- [ ] Sem `setState` React contínuo no scroll
- [ ] Build, TypeScript e lint passam sem erros

## Ordem de implementação do 3D

1. Canvas + camera rig + sistema de partículas → validar performance
2. `originPosition`, `organizedPosition`, `chartPosition` + debug manual para alternar entre CHAOS/ORGANIZED/CHART (sem scroll ainda) — provar que o morph funciona
3. Shader de morph → validar transformação completa
4. `GrowthChart` (curve, DataNodes, secondary trajectory)
5. Integrar ScrollTrigger + narrative progress
6. Integrar camera path
7. Sincronizar textos DOM
8. Transição WebGL → Profile DOM
9. Otimizar mobile
10. Performance profiling e acabamento

Executar build, typecheck e lint após cada fase — não avançar escondendo erros.

## Instrução final — antes de implementar o 3D, explicar:

1. Como será gerada a geometria procedural do estado CHAOS.
2. Como `originPosition`, `organizedPosition` e `chartPosition` serão armazenadas.
3. Como o shader realizará o morph.
4. Como o ScrollTrigger atualizará os uniforms sem causar re-renders no React.
5. Como `generateChartPositions` distribuirá partículas ao redor da `CatmullRomCurve3`.
6. Como será feita a transição visual WebGL → DOM → fotografia.
7. Qual estratégia será usada para mobile.

Depois, apresentar o plano de arquivos. Só então começar a implementação. Não reduzir o escopo visual sem explicar tecnicamente o motivo.
