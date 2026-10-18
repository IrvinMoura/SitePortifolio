# Interações e motion

> Inventário e contrato de comportamento. Toda interação nova entra nesta tabela **antes** de ser implementada, com fallback definido. Os testes da fase 8 verificam esta lista.

## Regras gerais
1. **Movimento só com função:** continuidade (de onde veio / para onde vai), retorno de uma ação, ou demonstração de um sistema.
2. **Conteúdo nunca depende de animação.** Todo texto está visível sem JS e sob `prefers-reduced-motion: reduce`.
3. **Sem scroll-jacking**, sem smooth scroll artificial, sem preloader.
4. **Curto:** a maioria das transições fica entre 120 e 320 ms; nada passa de 600 ms, exceto a figura-assinatura, que é controlada pelo usuário.
5. **Animar apenas `transform`, `opacity`, `clip-path`.** Nada de animar layout.
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
| I-01 | Transição entre páginas | Navegação interna | Cross-fade; o título do memorial na lista "vira" o título da página | View Transitions cross-document (`@view-transition`) | n/a | Troca instantânea | Navegação normal (Firefox ainda sem suporte) | MVP |
| I-02 | Entrada de seção | Seção entra na viewport | Fade + translate de 8 px, **uma vez** | `@starting-style` / classe via IntersectionObserver | n/a | Sem animação | Conteúdo visível | MVP |
| I-03 | Índice com seção ativa | Scroll | Marcador de acento move para a seção atual | IntersectionObserver | Itens são links focáveis | Marcador muda sem deslizar | Índice estático | MVP |
| I-04 | Nota de margem | Clique/toque no marcador | Abre nota ancorada ao marcador | `popover` + anchor positioning, com fallback de posicionamento | Enter/Espaço abre, Esc fecha, foco retorna | Sem translate | Nota em linha, sempre visível | MVP |
| I-05 | Copiar e-mail | Clique | Copia e mostra "copiado" por 2 s (`aria-live`) | Clipboard API | Botão nativo | Igual | Link `mailto:` | MVP |
| I-06 | Link com sublinhado desenhado | Hover/foco | Sublinhado cresce da esquerda | CSS (`background-size`) | Mesmo efeito no `:focus-visible` | Sublinhado fixo | Sublinhado fixo | MVP |
| I-07 | Alternar tema | Clique | Troca papel ↔ cianotipia | CSS custom properties; `startViewTransition` se disponível | Botão nativo com `aria-pressed` | Troca instantânea | Segue o sistema | MVP |
| I-08 | **Figura-assinatura** | Clique/arraste/tecla no hero | Ver especificação abaixo | SVG + ilha React (`client:visible`) + Motion | Completa por teclado | Mostra estados lado a lado, sem animação | Imagem estática "antes → depois" com legenda | MVP (teste de 5 s adiado; figura mantida) |
| I-09 | Figuras de memorial | Interação do usuário | Específico de cada figura | Ilha por figura, carregada quando visível | Obrigatório | Obrigatório | Imagem + legenda descritiva | Por projeto |
| I-10 | Animações scroll-driven | Scroll | Apenas detalhes (ex.: barra de progresso de leitura) | `animation-timeline` dentro de `@supports` | n/a | Desligado | Sem barra | Pós-MVP |

## Especificação: figura-assinatura (I-08)
**Objetivo:** em até 5 s, o visitante entende o que o Irvin faz: transformar processo manual em sistema.

**Estados:**
1. **Antes**: um pedido chega por mensagem → é copiado para a planilha → alguém confere à mão → retrabalho (um nó pisca em acento como "erro").
2. **Ação**: o visitante aciona "Automatizar" (botão; arrastar é só um atalho opcional).
3. **Depois**: pedido → API → validação automática → painel atualizado. Um "pacote" percorre o fluxo uma vez.
4. **Reiniciar** disponível; nenhum loop automático.

**Requisitos:** ≤ 15 KB de JS próprio (gzip) além do runtime da ilha; texto real no DOM (não em canvas); descrição acessível do fluxo (`<figcaption>` + lista ordenada oculta visualmente); estado final legível sem animação; foco visível em cada controle.

**Critério de entrada no MVP:** 3 pessoas (1 não técnica) explicam o que o Irvin faz após ver a figura por 5 s. Se falhar, simplificar ou trocar por imagem estática.
