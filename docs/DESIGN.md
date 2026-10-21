# Design — direção e sistema visual

> Direção aprovada em 21/10/2026 ([ADR 008](decisions/008-direcao-emaki.md)), substituindo a direção Memorial ([ADR 001](decisions/001-direcao-memorial.md)).
> **Fonte da verdade dos valores:** `src/styles/tokens.css`. Este documento explica o *porquê* e as regras de uso; não duplique valores aqui.

## Conceito: Emaki
O *emaki* é o rolo narrativo japonês: a história se desenrola em cenas, lida em sequência. O site adota essa linguagem: a home é um rolo com **cenas numeradas em kanji** (序 abertura, 一 a 四), títulos **pintados a pincel**, tinta sumi sobre papel e um **selo vermelho** que assina o trabalho.

O conteúdo continua sendo prova: cada projeto tem um memorial com natureza declarada, ficha técnica e decisões. O vocabulário "memorial" segue nas rotas e no schema.

## Princípios
1. **Prova antes de promessa.** Toda afirmação aponta para algo que pode ser visto, usado ou lido.
2. **Uma cena por vez.** Cada seção é uma cena com número, título e uma ideia.
3. **A tinta acompanha a leitura.** O pincel pinta o título quando a cena aparece; nada além disso se move sozinho (ver [INTERACTIONS.md](INTERACTIONS.md)).
4. **O japonês é ornamento.** Kanji e katakana nunca carregam informação que não esteja também em português; ficam com `aria-hidden` ou com `lang="ja"` e rótulo.
5. **Cresce sem redesign.** Todo componente funciona com 0, 1 ou 20 itens.
6. **Acessível por padrão.** Contraste, foco e teclado fazem parte do design.

## Linguagem visual

### Tipografia
| Papel | Uso | Família (OFL, auto-hospedada) |
|---|---|---|
| **Pincel** (`--font-brush`) | Títulos e nomes de projeto | **Kaushan Script** |
| **Pincel japonês** (`--font-jp`) | Números de cena, katakana do nome, eixo do rolo | **Yuji Syuku**, só com os glifos usados (lista em `astro.config.ts`) |
| **Texto** (`--font-sans`) | Leitura, UI, botões | **Zen Kaku Gothic New** 400 e 700 |
| **Mono** (`--font-mono`) | Rótulos (kicker), fichas, datas, código | **IBM Plex Mono** 400 |

Avaliadas no protótipo e descartadas: Knewave e Sedgwick Ave Display. Regras: no máximo 5 arquivos de fonte (orçamento em [QUALITY_GATES.md](QUALITY_GATES.md)); kanji novo precisa entrar na lista de glifos, ou cai na fonte do sistema; `tabular-nums` em fichas e datas.

### Cor
| Token | Noite sumi (padrão) | Washi (claro) | Uso |
|---|---|---|---|
| `--paper` / `--paper-2` | quase preto azulado | papel creme | Fundo / superfícies |
| `--ink` / `--ink-muted` | papel claro | tinta quase preta | Texto / texto secundário |
| `--rule` | fio escuro | fio bege | Separadores |
| `--accent` / `--accent-ink` | **vermelho shu** | shu mais fechado | Selo, botão principal, números de cena, foco |

Regras: o vermelho é o selo, não o fundo: aparece no selo, no botão principal, no portão dos projetos e nos números. Contraste AA (texto ≥ 4,5:1, UI ≥ 3:1). O tema padrão é noite; washi pela alternância, persistida.

### Textura e forma
- Grão de papel em toda a página (SVG `feTurbulence` em `body::before`, sem imagem externa).
- Fios de 1 px; cantos retos. Os rolos (kakejiku) têm barras de madeira em cima e embaixo.

### Assinaturas visuais
- **Selo "IM"** no cabeçalho, levemente girado.
- **Números de cena** em kanji, grandes, em acento.
- **Nome em katakana** na vertical (アーヴィン・マルケス) na abertura.
- **Projetos atrás de um portão torii** com a captura de tela na abertura do portão.
- **Eixo do rolo (jiku)**: barra de progresso na lateral, com o kanji da cena atual.

## Componentes
Visíveis juntos, nos dois papéis, em `/interno/componentes` (só em `npm run dev` e no build de teste).

| Componente | Arquivo | Responsabilidade |
|---|---|---|
| `SceneHead` | `home/SceneHead.astro` | Cabeça de cena: kanji, rótulo e título pintado |
| `ProjectGates` | `home/ProjectGates.astro` | Projetos atrás do portão torii; não renderiza nada se vazio |
| `ToriiGate` | `home/ToriiGate.astro` | Desenho do portão (largo e alto) com o número do projeto |
| `InkScript` | `base/InkScript.astro` | Tinta dos títulos `.brush`, eixo do rolo e travessia do portão |
| `Section` | `memorial/Section.astro` | Seção numerada (páginas internas): rótulo, título e conteúdo |
| `MarginNote` | `memorial/MarginNote.astro` | Nota na coluna direita (desktop) ou bloco em linha (celular) |
| `SpecSheet` | `memorial/SpecSheet.astro` | Ficha técnica em pares rótulo/valor |
| `NatureBadge` | `memorial/NatureBadge.astro` | Rótulo da natureza do projeto |
| `Figure` | `memorial/Figure.astro` | Figura com legenda numerada |
| `Toc` | `memorial/Toc.astro` | Índice do memorial com a seção atual destacada |
| `MemorialList` | `memorial/MemorialList.astro` | Lista de memoriais (página `/memoriais`) |
| `LogList` | `memorial/LogList.astro` | Registro público, do mais recente ao mais antigo |
| `ContactBlock` | `base/ContactBlock.astro` | E-mail copiável e perfis; só canais que existem |
| `Button` | `base/Button.astro` | Link ou botão, primário (shu) ou secundário, seta opcional |
| `ThemeToggle` + `ThemeInit` | `base/` | Noite ↔ washi persistido, sem flash na carga |
| `SkipLink`, `SiteHeader`, `SiteFooter` | `base/` | Estrutura de todas as páginas |

Estilos globais em camadas (`src/styles/`): `base.css` (camadas, reset, base, grão), `tokens.css`, `layout.css` (`.wrap`, `.sheet`, `.mem`, `.scene`) e `typography.css` (`.display`, `.heading`, `.subheading`, `.lede`, `.prose`, `.kicker`, `.link`, `.brush`). Estilos de componente ficam com escopo no próprio `.astro`.

## Voz e conteúdo
- PT-BR claro, frases curtas, primeira pessoa.
- Linguagem de negócio na abertura de cada memorial; jargão só nas seções técnicas.

## Anti-padrões (não fazer)
Japonês que carrega informação sem tradução · fontes de pincel em texto corrido · vermelho em áreas grandes · bento de cards idênticos · gradientes e glassmorphism decorativos · ícones de tecnologia como prova · texto que só aparece após animação · seções vazias ou "em breve".
