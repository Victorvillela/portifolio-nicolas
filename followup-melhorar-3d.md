# FOLLOW-UP — MELHORAR O OBJETO 3D (usar com o modelo Fable)

## Diagnóstico do estado atual

O objeto 3D do hero está funcionando tecnicamente, mas visualmente parece uma **galáxia/nuvem de estrelas genérica**. Não comunica finanças, estrutura ou patrimônio. Problemas específicos observados no screenshot atual:

1. Silhueta quase esférica e uniforme — parece nuvem de pontos de tutorial, não uma escultura autoral.
2. Todas as partículas têm o mesmo brilho e tamanho aparente — sem hierarquia, sem profundidade.
3. As conexões entre nodes estão praticamente invisíveis — a sensação de "rede/estrutura" se perdeu.
4. Não há nenhuma pista visual de contexto financeiro — nada sugere dados, mercado, trajetória ou crescimento.
5. Falta o texto gigante do hero ("SEU PATRIMÔNIO PRECISA DE ESTRATÉGIA. / NÃO DE SORTE.") — sem ele a cena fica sem âncora editorial.
6. Iluminação plana — sem key light, rim light ou contraste direcional.

## Direção da correção

**IMPORTANTE — o que NÃO fazer:** continua valendo tudo do briefing original. Nada de candlesticks verde/vermelho, moedas, cifrões, código Matrix caindo, azul neon, setas de crescimento literais, estética de terminal de trading ou de corretora de cripto. A referência continua sendo consultoria patrimonial boutique — o financeiro precisa aparecer por **estrutura e comportamento**, não por ícones literais.

O objetivo: o usuário deve olhar e sentir "isso são dados/capital sendo estruturados", sem nenhum símbolo óbvio de dinheiro.

## Mudanças específicas a implementar

### 1. Silhueta — de esfera para estrutura estratificada assimétrica

Substituir a distribuição atual (que resulta em silhueta esférica) por uma forma com **direcionalidade e camadas**:

- Alongar o objeto verticalmente ou diagonalmente (escala ~1.0 x 1.35 x 0.85, com rotação leve) — a diagonal ascendente sutil já sugere trajetória sem desenhar uma seta.
- Organizar parte das partículas (~40%) em **3 a 5 camadas/estratos horizontais internos** com densidades diferentes — como se fossem camadas de dados sedimentadas. As camadas não devem ser planas perfeitas: aplicar ondulação por noise de baixa frequência.
- Os outros ~60% permanecem como massa orgânica ao redor, mas com densidade decrescente do núcleo para fora (falloff exponencial) — hoje a densidade parece uniforme, o que causa o efeito "galáxia".
- Adicionar 2–3 "braços de fluxo": filamentos mais densos de partículas que percorrem o objeto em curvas suaves (usar CatmullRomCurve3 internas), sugerindo capital em movimento. Esses filamentos são o embrião visual do gráfico que vai nascer depois — cria coerência narrativa.

### 2. Hierarquia de partículas — 3 classes visuais

Hoje todas as partículas parecem iguais. Criar três classes via attributes (sem novos draw calls — usar o mesmo buffer com `aClass`):

- **Classe A — dust (~70%):** partículas pequenas, opacidade 0.15–0.35, brilho baixo. São o "fundo" do objeto.
- **Classe B — data points (~25%):** partículas médias, opacidade 0.5–0.7, leve variação de cor para o azul gelo do logo NBM (#8FB8E8). São os "dados".
- **Classe C — nodes estruturais (50–120 partículas):** maiores, com glow real (contribuem para o bloom), cor mais quente, pulso lento de intensidade (noise temporal, período de 4–8s). São os pontos de decisão/estrutura.

Isso resolve o problema do brilho uniforme e cria leitura em camadas.

### 3. Conexões — tornar a rede visível

- Aumentar a opacidade das linhas entre nodes de quase-zero para **0.12–0.22** nos segmentos principais.
- As conexões devem existir apenas entre nodes da Classe C (pré-calculadas, nunca por frame).
- Adicionar um "pulso de dados" percorrendo algumas linhas: um gradiente de brilho que viaja lentamente ao longo do segmento (via uniform de tempo no shader da linha, deslocando um highlight de ~10% do comprimento). Extremamente lento (um pulso a cada 3–6s por linha, dessincronizado via `aPhase`). Isso é o que transmite "fluxo de capital/informação" sem nenhum símbolo literal.
- Durante o estado CHAOS, apenas ~40% das conexões visíveis; o resto aparece na fase ORGANIZATION (comportamento já previsto no briefing — verificar se está implementado).

### 4. Grid de contexto — âncora "de mercado" discreta

Adicionar, **atrás e abaixo** do objeto, um plano de grid extremamente sutil (opacity ≤ 0.06, fade radial nas bordas, sem números) levemente inclinado em perspectiva. Já estava previsto no briefing para a fase do gráfico — antecipar uma versão ainda mais fraca dele (30% da opacidade final) já no hero. É o grid que faz o cérebro ler "ambiente de dados/mercado" em vez de "espaço sideral". Esse é provavelmente o ajuste de maior impacto para matar a leitura de "galáxia".

### 5. Iluminação e profundidade

- Key light lateral-superior (branco frio) + rim light atrás do objeto (azul gelo dessaturado #8FB8E8, na família do logo NBM) — o rim é o que desenha a silhueta contra o fundo.

> **Nota de paleta (atualização):** toda a cena agora segue as cores do logotipo da NBM Consultoria — fundo em azul marinho quase preto (#070C14 / #0A1220), partículas em branco frio/azul gelo (#F2F4F7, #C7DCF5, #8FB8E8), navy médio (#1E3A6E) para elementos de profundidade. Substituir qualquer resquício da paleta champagne/dourada anterior. Continua proibido azul neon/ciano elétrico saturado — os azuis são dessaturados e institucionais.
- Fog/depth fade: partículas mais distantes da câmera perdem opacidade e saturação (via distância no shader). Hoje tudo parece no mesmo plano.
- Vignette sutil no post-processing para concentrar o olhar no centro.
- Bloom **apenas** nos nodes Classe C e nos pulsos das conexões — nunca na nuvem inteira.

### 6. Texto do hero

Confirmar/implementar o texto editorial sobre o canvas, conforme o briefing:

> SEU PATRIMÔNIO
> PRECISA DE ESTRATÉGIA.
>
> *NÃO DE SORTE.* (serif italic)

Tipografia gigante, camada DOM sobre o canvas, com o objeto 3D passando visualmente entre partes das letras se possível (z-index/máscara). Indicador "ROLE PARA ESTRUTURAR" já existe — manter.

### 7. Movimento

- Rotação global lentíssima do objeto (uma volta a cada ~120s) em eixo levemente inclinado.
- Os filamentos/braços de fluxo têm um drift próprio, ainda mais lento, na direção ascendente da diagonal — reforça a sensação de fluxo sem parecer animação chamativa.
- Manter a resposta ao mouse já implementada (damping, sutileza).

## Critérios de aceite desta rodada

- [ ] A silhueta não é mais esférica/uniforme — tem direcionalidade diagonal e camadas perceptíveis
- [ ] Existem 3 classes visuais de partícula claramente distinguíveis
- [ ] As conexões entre nodes são visíveis e têm pulsos de fluxo lentos
- [ ] O grid de contexto sutil existe atrás/abaixo do objeto
- [ ] Rim light desenha a silhueta contra o fundo
- [ ] Partículas distantes desvanecem (depth fade)
- [ ] O texto gigante do hero está presente sobre o canvas
- [ ] Nenhum símbolo financeiro literal foi adicionado (sem candlestick, moeda, seta, cifrão, verde/vermelho)
- [ ] Performance mantida (verificar FPS no debug panel antes/depois; sem novos draw calls significativos — classes via attribute, não via meshes separados)
- [ ] Build, typecheck e lint passando

Implementar de forma incremental (silhueta → classes → conexões → grid → luz → texto), validando visualmente a cada passo. Não refazer o sistema do zero — evoluir os buffers e shaders existentes.
