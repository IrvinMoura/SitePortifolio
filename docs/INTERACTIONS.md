# Interações e motion

> Inventário e contrato de comportamento. Toda interação nova entra nesta tabela **antes** de ser implementada, com fallback definido. Os testes da fase 8 verificam esta lista.

## Regras gerais
1. **Movimento só com função:** continuidade (de onde veio / para onde vai), retorno de uma ação, ou demonstração de um sistema.
2. **Conteúdo nunca depende de animação.** Todo texto está visível sem JS e sob `prefers-reduced-motion: reduce`.
3. **Sem scroll-jacking**, sem smooth scroll artificial (biblioteca que reescreve a rolagem), sem preloader. A rolagem suave nativa (`scroll-behavior`) vale só para saltos por âncora (I-17).
4. **Curto:** a maioria das transições fica entre 120 e 320 ms; nada passa de 600 ms, exceto a tinta dos títulos (I-11, 1200 ms por palavra, só uma vez) e a travessia do portão (I-13), que é disparada pelo usuário.
5. **Animar apenas `transform`, `opacity`, `clip-path`.** Nada de animar layout, exceto o pergaminho (I-15), que anima a altura do papel e só é disparado por clique.
6. **Loops só com controle** (pausar/reproduzir) e pausados fora da viewport.
7. **Teclado e toque têm paridade com hover.** Nenhuma informação existe só no hover.
8. **Reduced motion:** remove deslocamentos e escalas; mantém mudanças de opacidade curtas (≤ 120 ms) ou troca instantânea.

## Tokens de motion (provisórios)
| Token | Valor | Uso |
|---|---|---|
| `--dur-instant` | 120 ms | Hover, foco, toggle |
| `--dur-fast` | 200 ms | Popover, nota de margem, botão copiar |
| `--dur-base` | 320 ms | Entrada de bloco, transição de página |
| `--dur-slow` | 480 ms | Etapas da figura-assinatura |
| `--ease-out` | `cubic-bezier(0.2, 0.8, 0.2, 1)` | Entradas |
| `--ease-in-out` | `cubic-bezier(0.6, 0, 0.2, 1)` | Movimentos entre estados |

## Inventário

| ID | Interação | Gatilho | Comportamento | Técnica | Teclado / toque | Reduced motion | Sem JS / sem suporte | Fase |
|---|---|---|---|---|---|---|---|---|
| I-01 | Transição entre páginas | Navegação interna (Sobre, Registro) | Cross-fade | View Transitions cross-document (`@view-transition`) | n/a | Troca instantânea | Navegação normal (Firefox ainda sem suporte) | MVP |
| I-02 | Entrada de seção | Seção entra na viewport | Fade + translate de 8 px, **uma vez** | `@starting-style` / classe via IntersectionObserver | n/a | Sem animação | Conteúdo visível | MVP |
| ~~I-03~~ | ~~Índice com seção ativa~~ (removida pelo ADR 009, junto com a página de memorial) | — | — | — | — | — | — | — |
| I-04 | Nota de margem | — (estática) | Sempre visível: coluna direita no desktop, bloco em linha no celular. O popover previsto foi descartado na fase 4: esconder a nota atrás de um clique piorava a leitura sem ganho | CSS grid | Não precisa de interação | Igual | Igual | MVP ✅ |
| I-05 | Copiar e-mail | Clique | Copia e mostra "copiado" por 2 s (`aria-live`) | Clipboard API | Botão nativo | Igual | Link `mailto:` | MVP |
| I-06 | Link com sublinhado desenhado | Hover/foco | Sublinhado cresce da esquerda. No menu do cabeçalho é vermelho (`--accent`), 2 px, e fica fixo na página atual | CSS (`background-size`) | Mesmo efeito no `:focus-visible` | Sublinhado fixo | Sublinhado fixo | MVP |
| ~~I-07~~ | ~~Alternar tema~~ (removida em 21/10/2026: o site só tem o papel noite) | — | — | — | — | — | — | — |
| ~~I-08~~ | ~~Figura-assinatura~~ (removida pelo ADR 008) | Clique/arraste/tecla no hero | Ver especificação abaixo | SVG + ilha React (`client:visible`) + Motion | Completa por teclado | Mostra estados lado a lado, sem animação | Imagem estática "antes → depois" com legenda | Estática (os dois estados lado a lado) na fase 5 ✅; alternância interativa na fase 7. Teste de 5 s adiado |
| ~~I-09~~ | ~~Figuras de memorial~~ (removida pelo ADR 009) | — | — | — | — | — | — | — |
| I-10 | Animações scroll-driven | Scroll | Apenas detalhes | `animation-timeline` dentro de `@supports` | n/a | Desligado | Sem efeito | Pós-MVP (a barra de progresso virou o I-12) |
| I-11 | **Tinta nos títulos** | Título `.brush` entra na viewport | Cada palavra é pintada da esquerda para a direita (máscara em gradiente + borrão SVG só no começo da pincelada), 1200 ms por palavra, 190 ms entre elas, **uma vez**. Espera a fonte de pincel por no máximo 1 s | Classe via IntersectionObserver; `mask-image` + `@keyframes` | n/a | Sem animação, título visível desde o início | Título visível (o estado oculto só é aplicado pelo próprio script); impressão sempre mostra | MVP ✅ |
| I-12 | Eixo do rolo (jiku) | Scroll | Barra de acento na lateral cresce com a leitura; no desktop mostra o kanji da cena atual | `transform: scaleY` atualizado em `requestAnimationFrame` | Decorativa (`aria-hidden`) | Igual (não há deslocamento de conteúdo) | Sem barra | MVP ✅ |
| I-13 | Travessia do portão | Clique em um projeto | O torii cresce e some enquanto a captura atrás dele ocupa a tela (≈ 700 ms); então o site do projeto abre (`links.demo`, ADR 009) | Web Animations API e navegação ao fim | Link nativo; Enter funciona igual; Ctrl/⌘/clique do meio abrem em nova aba sem animação | Navega direto | Link normal | MVP ✅ |
| I-14 | Etapas que desenrolam para o lado | Scroll horizontal de quem lê | Lista das etapas de um projeto em faixa horizontal com `scroll-snap` | CSS (`overflow-x`, `scroll-snap-type: x proximity`) | Faixa focável (`tabindex=0`), setas rolam | Igual | Igual | MVP ✅ |
| I-15 | Pergaminho do Sobre (makimono) | Clique no rolo | O rolo fechado desenrola a foto (1,1 s, `grid-template-rows` 0fr → 1fr); o botão vira "Enrolar" e fecha de novo. No desktop abre por cima da página, sem empurrar o texto | CSS + classe `.js` no `<html>` | Botão nativo com `aria-expanded` e `aria-controls` | Abre e fecha sem transição | Rolo aberto, sem botão | MVP ✅ |
| I-16 | Fumaça no fundo | Movimento do mouse | Onde o mouse passa saem baforadas de tinta clara (opacidade máx. ~14%) que seguem a direção do movimento, sobem, crescem e somem em 1,6–2,8 s | `<canvas>` 2D fixo atrás do conteúdo, em meia resolução; `requestAnimationFrame` só enquanto há fumaça; máx. 160 baforadas | Decorativa (`aria-hidden`); não existe em toque (`pointer: fine` e `pointerType` mouse) | Desligada | Sem fumaça | MVP ✅ |
| I-17 | Rolagem suave até a cena | Clique em link de âncora (menu do cabeçalho, "Ver projetos", voltar ao topo) | A página rola suavemente até o destino, com folga no topo | CSS nativo (`scroll-behavior: smooth`, `scroll-padding-top`) | Igual: Enter no link rola do mesmo jeito e o foco vai para o destino | Salto instantâneo | Salto instantâneo | MVP ✅ |
| I-20 | Cursor de tinta | Movimento do mouse | O cursor do sistema vira uma gota de tinta preta com contorno claro (14 px). Ao se mover, deixa um rastro curto de pinceladas vermelhas que afinam e somem em ~420 ms, de 3 a 10 px, mais grossas quanto mais rápido o movimento. Sobre links e botões a gota cresce e fica vazada; no clique, encolhe. Convive com a fumaça (I-16) | `<div>` movido por `transform` + `<canvas>` fixo por cima do conteúdo (`pointer-events: none`); `requestAnimationFrame` só enquanto há rastro | Decorativo (`aria-hidden`); só com mouse (`pointer: fine` e `pointerType` mouse), toque e teclado não mudam | Cursor normal do sistema, sem rastro | Cursor normal do sistema | MVP ✅ |
| I-19 | Menu sanduíche no celular | Clique no botão de três traços (telas < 48rem) | Os traços viram um X; o painel do menu se desenrola de cima para baixo (`clip-path`, `--dur-base`) e as opções entram uma a uma (fade + 8 px, 40 ms entre elas). Fecha ao escolher uma opção, com Esc ou com clique fora | Botão + classe `.open`; CSS (`clip-path`, `opacity`, `transform`) | Botão nativo com `aria-expanded` e `aria-controls`; Esc fecha e devolve o foco ao botão | Abre e fecha sem transição | Opções do menu em linha abaixo da logo, sem botão | MVP ✅ |
| I-18 | Voltar ao topo | Rodapé entra na viewport (fim da página) | Botão redondo no tom do papel, com contorno e seta vermelhos, sobe e cresce suavemente no canto inferior direito (fade + translate/scale, `--dur-slow`; some em `--dur-fast`) e leva ao topo com a rolagem do I-17; some ao subir | Link `#topo` + classe via IntersectionObserver | Link nativo, focável; fica visível enquanto tem foco | Aparece sem transição | Link "Voltar ao topo" no fim do rodapé | MVP ✅ |

## Especificação: figura-assinatura (I-08, removida)
> Mantida como histórico. Saiu da home com a direção Emaki ([ADR 008](decisions/008-direcao-emaki.md)).

**Objetivo:** em até 5 s, o visitante entende o que o Irvin faz: transformar processo manual em sistema.

**Estados:**
1. **Antes**: um pedido chega por mensagem → é copiado para a planilha → alguém confere à mão → retrabalho (um nó pisca em acento como "erro").
2. **Ação**: o visitante aciona "Automatizar" (botão; arrastar é só um atalho opcional).
3. **Depois**: pedido → API → validação automática → painel atualizado. Um "pacote" percorre o fluxo uma vez.
4. **Reiniciar** disponível; nenhum loop automático.

**Requisitos:** ≤ 15 KB de JS próprio (gzip) além do runtime da ilha; texto real no DOM (não em canvas); descrição acessível do fluxo (`<figcaption>` + lista ordenada oculta visualmente); estado final legível sem animação; foco visível em cada controle.

**Critério de entrada no MVP:** 3 pessoas (1 não técnica) explicam o que o Irvin faz após ver a figura por 5 s. Se falhar, simplificar ou trocar por imagem estática.
