# Design — direção e sistema visual

> Direção aprovada em 18/10/2026 ([ADR 001](decisions/001-direcao-memorial.md)).
> **Fonte da verdade dos valores:** `src/styles/tokens.css` (criado na fase 4). Este documento explica o *porquê* e as regras de uso; não duplique valores aqui depois que os tokens existirem.

## Conceito: Memorial
O **memorial descritivo** é o documento da engenharia brasileira que explica o que foi construído, por quê e com quais especificações. O portfólio adota essa linguagem: seções numeradas, fichas técnicas, anotações na margem e **figuras que funcionam**.

Ele deve ler como um bom documento técnico e se usar como um produto bem feito. A personalidade aparece nos detalhes (notas de margem, rodapés, numeração, o changelog), não em efeitos.

## Princípios
1. **Prova antes de promessa.** Toda afirmação aponta para algo que pode ser visto, usado ou lido.
2. **Uma ideia por tela.** Hierarquia clara; o olho sabe onde começar.
3. **Movimento explica, não enfeita.** Animação só para dar continuidade, retornar uma ação ou demonstrar um sistema (ver [INTERACTIONS.md](INTERACTIONS.md)).
4. **Rigor com calor humano.** Precisão tipográfica e tom de conversa; humor discreto nas notas de margem.
5. **Cresce sem redesign.** Todo componente funciona com 0, 1 ou 20 itens.
6. **Acessível por padrão.** Contraste, foco e teclado fazem parte do design, não de uma revisão final.

## Linguagem visual

### Grid
- 12 colunas no desktop: **texto em ~7 colunas + coluna de margem** (2–3 colunas) para notas, fichas e numeração.
- Largura de leitura: 60–75 caracteres.
- Abaixo de ~900 px, a margem colapsa: notas viram blocos em linha (toque para expandir).
- Layout por container queries quando um componente muda de forma conforme o espaço.

### Tipografia (combinação "Expressivo", escolhida em 18/10/2026)
| Papel | Uso | Família (licença OFL, auto-hospedada) |
|---|---|---|
| **Serifa de texto** | Títulos, posicionamento, leitura longa | **Fraunces** (pesos estáticos 400 e 600; a versão variável passava de 120 KB; tracking −0,025em nos títulos) |
| **Grotesca** | UI, navegação, botões, legendas | **Geist** |
| **Mono** | Numeração `00`–`05`, fichas técnicas, anotações, código | **Geist Mono** |

Avaliadas e descartadas no protótipo: Literário (Newsreader · Inter · JetBrains Mono) e Técnico (Source Serif 4 · IBM Plex Sans · IBM Plex Mono).

Regras: escala fluida com `clamp()`; no máximo 3 famílias e 5 arquivos de fonte; usar `font-variant-numeric: tabular-nums` em fichas e datas.

### Cor (acento escolhido em 18/10/2026; valores de partida em `prototype/styles.css`)
| Token | Claro ("papel") | Escuro ("cianotipia") | Uso |
|---|---|---|---|
| `--color-paper` | off-white quente, `oklch(97% 0.01 85)` | azul-tinta profundo, `oklch(22% 0.04 255)` | Fundo |
| `--color-ink` | quase preto, `oklch(22% 0.01 85)` | papel claro, `oklch(93% 0.01 240)` | Texto |
| `--color-ink-muted` | cinza quente | azul acinzentado | Texto secundário, notas |
| `--color-rule` | linha fina, baixo contraste | linha fina clara | Fios, grid, separadores |
| `--color-accent` | **laranja-sinal**, `oklch(67% 0.18 50)`; para texto, `--color-accent-ink` `oklch(52% 0.16 45)` (contraste AA) | `oklch(78% 0.15 62)` | Anotação, foco, estado ativo, interação |

Regras: o acento é **raro** (anotação, foco e interação), nunca área grande; sem gradientes decorativos, brilhos ou neon; contraste AA mínimo (texto ≥ 4,5:1, UI ≥ 3:1). Tema escuro segue `prefers-color-scheme`, com alternância manual persistida.

### Espaçamento e forma
- Escala de espaço em múltiplos de 4 px, com tokens semânticos (`--space-section`, `--space-block`, `--space-inline`).
- Fios de 1 px em vez de sombras; cantos retos ou de raio mínimo (é um documento, não um app de cards).
- Imagens e figuras com legenda numerada ("Fig. 1.2 — …").

### Assinaturas visuais
- **Numeração de seção** em mono (`00`, `01`, …) alinhada à margem.
- **Notas de margem** com marcador de acento.
- **Ficha técnica** no topo de cada memorial.
- **Figura-assinatura** no hero (ver [INTERACTIONS.md](INTERACTIONS.md)).

## Componentes base (fase 4)
| Componente | Responsabilidade |
|---|---|
| `Section` | Seção numerada com título e âncora |
| `MarginNote` | Nota de margem: popover no desktop, bloco em linha no mobile |
| `SpecSheet` | Ficha técnica (natureza, período, papel, stack, status, links) |
| `NatureBadge` | Rótulo de natureza do projeto (cliente / acadêmico / demonstrativo / open source) |
| `Figure` | Moldura de figura com legenda numerada, fallback estático e área para ilha interativa |
| `Toc` | Índice lateral com indicador da seção atual |
| `LogEntry` | Entrada do registro/changelog (data, tipo, texto, link) |
| `ProjectRow` | Item da lista de memoriais (aparece só quando houver projetos) |
| `ContactBlock` | E-mail copiável, agenda, perfis, fuso horário |
| `Link`, `Button`, `ThemeToggle`, `SkipLink`, `SiteHeader`, `SiteFooter` | Fundamentais |

Sem abstrações antecipadas: um componente só é criado quando é usado em pelo menos um lugar real.

## Voz e conteúdo
- PT-BR claro, frases curtas, primeira pessoa.
- Linguagem de negócio na abertura de cada memorial; jargão só nas seções técnicas.
- Notas de margem podem ter humor; o texto principal não depende delas.

## Anti-padrões (não fazer)
Bento de cards idênticos · gradientes e glassmorphism decorativos · ícones de tecnologia como prova de competência · barras de habilidade · cursor customizado substituindo o nativo · texto que só aparece após animação · seções vazias ou "em breve".
