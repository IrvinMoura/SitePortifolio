# Pesquisa — referências, fontes e conclusões

> **Status:** congelado em 18/10/2026 (Fase 0). Resultado: direção **C — Memorial** aprovada (ver [ADR 001](decisions/001-direcao-memorial.md)).
> Atualize este arquivo só com pesquisas novas, em uma seção datada no final; não reescreva as conclusões originais.

**Legenda de evidência:** **[O]** observado diretamente (navegador, DOM, rede) · **[F]** relatado por fonte externa (link) · **[I]** inferência · **[R]** recomendação.

## Plano e critérios de pesquisa

- Inspeção direta (navegador embutido, desktop 1440×900 e mobile 375×812, leitura do DOM e da rede) do site de referência e de portfólios selecionados.
- Leitura de texto de páginas via fetch quando a inspeção visual não acrescentava.
- Galerias: Awwwards, SiteInspire, A1 Gallery, Godly (hoje redireciona para Recent), Codrops.
- Viabilidade: registro npm (versões/licenças atuais) e **MDN browser-compat-data 8.1.6 (15/10/2026)** para suporte de CSS moderno.
- Critérios: os 10 da sua matriz (identidade, layout, interatividade, motion, credibilidade, projetos, conversão, responsividade, performance, aplicabilidade).

**Perguntas que a pesquisa precisava responder**
1. O que torna um portfólio de dev memorável sem sacrificar a clareza?
2. É possível servir cliente empresarial e recrutador na mesma home?
3. Que movimento demonstra competência e o que é ruído?
4. Qual a stack mínima que entrega isso com ótima performance?

**Limitações encontradas**
- Animações e scroll foram observados por capturas pontuais; timing e easing ficam parcialmente inferidos.
- `jesperlandberg.dev`: navegação bloqueada no navegador. Artigos da Codrops retornaram 403 via fetch (usei resumos de busca).
- A1 Gallery: só a home foi lida, não as fichas individuais. Material editorial da Figma (Shortcut) não foi localizado na busca; usei apenas a definição de case study da central de ajuda.
- Godly.website hoje redireciona (301) para recent.design, que é uma galeria de peças, não de portfólios.
- Cassie Evans (cassie.codes), referência clássica de animação SVG, **desativou o site** — não serve mais como referência.

---

## Referência principal — braydoncoyer.dev

| Aspecto | Achado |
|---|---|
| Stack | **[O]** Next.js; fonte única Geist Sans; h1 de 60px; ~3,7 MB e 60 requisições na home (desktop). |
| Identidade | **[O]** Logo-monograma; trilhos laterais com hachura diagonal emoldurando o conteúdo (textura-assinatura discreta); navegação em pílula centralizada; avatar com anéis concêntricos no hero. **[I]** A identidade vem de *muitos detalhes pequenos e consistentes*, não de um efeito grande. |
| Organização da home | **[O]** Hero ("Hey, I'm Braydon!") → bento "About" (foto inclinada, "Connections" com avatares orbitando, Toolbox com ícones de apps, **agendador de call embutido**) → Blog (3 cards com arte) → bento "My Site" (Changelog, Speaking, Community Wall) → newsletter em bloco escuro → footer com sitemap completo. |
| Projetos | **[O]** **A home não tem seção de projetos.** /projects mostra só 2 itens (imagem grande + parágrafo + link externo), sem estudo de caso. |
| Tom | **[O]** Texto informal ("this site is intentionally over-engineered… my playground"), "&&" nos títulos como piscadela de dev. |
| Motion | **[O]** Elementos entram com fade/blur no carregamento e no scroll; 2 regras `prefers-reduced-motion` no CSS. **[O]** No mobile, após scroll rápido, uma área ficou em branco até a revelação disparar. **[I]** Reveal por scroll cria "buracos" em leitura rápida — risco a evitar. |
| Mobile | **[O]** Menu hambúrguer; bento vira coluna única; hero continua dominante. |
| Conversão | **[O]** "Book a call" com calendário dentro do bento; newsletter. Sem formulário de orçamento. |

**Princípios a adaptar [R]:** (1) bento como *vitrine de microdemos*, cada card provando algo; (2) uma textura-assinatura sutil e consistente; (3) tom pessoal com frases específicas; (4) changelog do site como prova de evolução; (5) CTA de agenda embutido.
**O que não transferir [R]:** home sem projetos (para você, projetos são o centro); cards que dependem de audiência (Community Wall, Connections, Speaking) — ficariam vazios no seu momento.

## Pesquisa externa — portfólios

| Site | Identidade | Layout / projetos | Interação & motion | Credibilidade | Conversão | Mobile / performance | O que adaptar |
|---|---|---|---|---|---|---|---|
| [Brittany Chiang](https://brittanychiang.com/) | **[F]** Coluna esquerda fixa com nome/cargo + âncoras; Inter | **[F]** Experiência numerada com datas e tags; 4 projetos com imagem; arquivo completo em /archive | **[F]** Quase nenhuma; easter egg (TARDIS) | **[F]** Empresas reais (Apple, Klaviyo), currículo PDF | **[F]** Sem formulário; currículo + perfis | **[I]** Leve (Next/Tailwind/Vercel) | Arquivo de projetos em tabela; *skip link*; footer que declara a stack |
| [Adham Dannaway](https://www.adhamdannaway.com/) | **[F]** Hero dividido "designer / `<coder>`" | **[F]** 3 cards de trabalho com categoria | não verificável via texto | **[F]** Livro e design system próprios (produtos) | **[F]** Contato só pela nav | — | Comunicar **dupla competência** num único gesto visual |
| [Sara Soueidan](https://www.sarasoueidan.com/) | **[F]** Texto-primeiro, coluna única; banner "site em redesign" | **[F]** Artigos, não projetos | **[F]** Mínima | **[F]** Curso de acessibilidade com créditos IAAP, palestras | **[F]** Sem serviços/contato na home | **[F]** Eleventy + Netlify | Credibilidade via **ensinar**; declarar valores (ela declara conteúdo sem LLM) |
| [ITom](https://itomdev.com/) | **[O]** Mundo 3D desenhado à mão (muro de tijolos, portas = seções), áudio opcional | **[O]** Projetos atrás de "portas" | **[O]** WebGL/Three.js, preloader com % | **[F]** Awwwards, FWA, CSSDA | **[F]** Oferece *também* sites empresariais comuns | **[O]** **~11,8 MB, 250 requisições**, preloader de vários segundos. **[O]** Possui um `<article>` HTML paralelo com FAQ para SEO | Ideia de **camada HTML paralela** acessível; filosofia declarada "mecânica primeiro, efeitos depois" |
| [Dennis Snellenberg](https://dennissnellenberg.com/) | **[F]** Saudações em vários idiomas, "Freelance Designer & Developer" | **[F]** 4 trabalhos recentes (disciplina + ano) → case pages | **[I]** Conhecido por cursor/transições (não verificado agora) | **[F]** Projetos reais de marcas | **[F]** **"Let's work together"** + e-mail + telefone + hora local | — | Bloco de contato forte e direto; hora local (útil p/ remoto) |
| [Rauno Freiberg](https://rauno.me/) | **[F]** Minimalista, manifesto de princípios | **[F]** Separa *Craft* (experimentos), *Projects*, *Field Notes* | **[I]** Experimentos de interação são o portfólio | **[F]** Vercel; projeto "History of Software Design" | **[F]** E-mail com botão copiar | — | Separar **Lab** de **Projetos**; botão "copiar e-mail" |
| [Emil Kowalski](https://emilkowal.ski/) | **[F]** Design engineer; coluna única | **[F]** Projetos = bibliotecas open source (Sonner, Vaul) e cursos | **[F]** Escreve sobre *quando não animar* | **[F]** Linear, Vercel, libs muito usadas | **[F]** Newsletter + redes | — | Texto **"quando não animar"** como princípio; projeto open source como prova |
| [Josh W. Comeau](https://www.joshwcomeau.com/) | **[F]** Blog de tutoriais | **[F]** Artigos por categoria | **[I]** Conhecido por **figuras interativas dentro do texto** | **[F]** Cursos próprios | **[F]** Newsletter | — | **Figuras explorables** dentro dos estudos de caso |
| [Bruno Simon](https://bruno-simon.com/) | **[F]** Mundo 3D dirigível | **[F]** Projetos descobertos dirigindo | **[F]** Three.js (WebGL/WebGPU), Rapier, áudio | **[F]** Curso Three.js Journey; código MIT | **[F]** Contato via Discord | **[F]** Opções de qualidade/renderer; sem fallback descrito | Exemplo do **extremo**: memorável, mas inadequado para cliente empresarial com pressa |
| [Gil Huybrecht](https://gilhuybrecht.com/) | **[O]** Lista de projetos com galerias numeradas | **[O]** 20 projetos como lista de nomes + slides | não capturado (screenshot falhou) | **[O]** Marcas reais | **[O]** Newsletter, curso | — | Lista tipográfica de projetos (destaque no Awwwards e SiteInspire) |
| [Joffrey Spitzer](https://tympanus.net/codrops/2026/02/18/joffrey-spitzer-portfolio-a-minimalist-astro-gsap-build-with-reveals-flip-transitions-and-subtle-motion/) (case Codrops) | **[F]** "Minimalista com motion sutil" | — | **[F]** Astro + GSAP (reveals, Flip) + Lenis + Swup | — | — | — | Prova de que **Astro + motion sutil** é o padrão atual de portfólios premiados minimalistas |

**Galerias:** Awwwards (filtro Developer Award) e SiteInspire (Portfolio) são dominados por estúdios e designers; tags recorrentes: *Scrolling, Parallax, Horizontal Layout, Fullscreen, Microinteractions* **[F]**. A A1 Gallery filtra por tecnologia — **Astro e Next.js** estão entre as principais **[F]** — e tem 203 portfólios catalogados. **[I]** Os sites premiados raramente são de devs que vendem para PMEs; servem como referência de *craft*, não de conversão.

## Síntese

### Padrões mais promissores para você
1. **Profundidade no lugar de volume** (Chiang, Comeau): poucos projetos com estudo de caso real superam uma grade de 12 thumbnails. Encaixa no seu momento.
2. **Figuras interativas dentro do conteúdo** (Comeau, Rauno): a interação *explica* o projeto (ex.: arraste um registro pelo fluxo de automação). É competência demonstrada, não decoração.
3. **Separação Projetos × Lab** (Rauno): experimentos livres não poluem a vitrine comercial, e o Lab vira o lugar seguro para ousar.
4. **Uma assinatura pequena e consistente** (Braydon — hachura e anéis; Snellenberg — saudações): identidade por detalhe recorrente, não por um efeito pesado.
5. **Contato direto e sem atrito** (Snellenberg, Rauno, Braydon): e-mail copiável + agenda + uma frase clara de disponibilidade.

### Tendências a evitar
- **Preloader + WebGL na home** (ITom 11,8 MB; Bruno Simon): ótimo para premiações, ruim para quem precisa avaliar você em 30 s no celular.
- **Scroll-jacking e smooth scroll artificial** como padrão: o próprio Lenis desativa o efeito sob reduced motion e tem limitações em iOS, iframes e scroll-snap **[F]**.
- **Reveal de tudo no scroll**: cria áreas vazias em leitura rápida **[O, Braydon mobile]**.
- **Bento genérico** de cards iguais com ícones e gradientes — é exatamente a "cara de IA" que você quer evitar.
- **Barras de habilidade, contadores e logos de stack** como prova de competência.
- **Cursor customizado** que substitui o nativo (acessibilidade e toque).

---

## Três direções criativas

### A — "Bancada" (editorial modular, herdeira do Braydon)
1. **Conceito:** a home é uma bancada de trabalho. Cada módulo do bento é um **instrumento funcionando** — um minidashboard com dados fictícios rotulados, um log de webhook chegando, um fluxo de automação rodando.
2. **Personalidade:** organizada, curiosa, tátil. Detalhes de oficina: etiquetas, réguas, parafusos de canto.
3. **Paleta/tipo:** fundo off-white quente, tinta grafite, um acento (laranja-sinal). Grotesca (ex.: Geist/Inter Display) + mono para etiquetas.
4. **Home:** hero curto com frase de posicionamento → bento de 6–8 módulos (3 projetos, "como trabalho", stack em uso, agenda, changelog) → contato.
5. **Projetos:** cards grandes no bento levam ao estudo de caso; a capa do case reaproveita o módulo vivo.
6. **Interações:** microdemos em loop pausável, hover que "liga" o módulo, contadores reais do site (build, commits).
7. **Competência técnica:** cada módulo é um componente real.
8. **Confiança empresarial:** os módulos mostram, literalmente, coisas que o cliente compraria (dashboard, automação).
9. **Mobile:** bento → pilha; microdemos viram estáticas com "tocar para rodar".
10. **Dificuldade:** média. Manutenção média (cada módulo é um mini-app).
11. **Riscos:** **é a direção mais próxima do "template bento"**; com poucos projetos os módulos viram enchimento; vários loops simultâneos pesam e distraem.
12. **Referências:** Braydon Coyer, Adham Dannaway (dupla competência), Rauno (componentes como prova).

### B — "Fluxo" (experimental e interativo)
1. **Conceito:** o site é um **diagrama de sistema vivo**. O scroll conduz um "pacote de dados" por nós (entrada → integração → automação → IA → painel), e cada nó é um serviço seu com projetos pendurados.
2. **Personalidade:** técnica, cinética, de engenheiro de sistemas.
3. **Paleta/tipo:** fundo escuro azul-tinta (não preto puro), linhas finas claras, um acento de sinal. Mono como protagonista + sans neutra.
4. **Home:** canvas/SVG em tela cheia guiado por scroll, com painéis de texto que acompanham cada nó; fim em "seu processo aqui?" → contato.
5. **Projetos:** nós clicáveis expandem em painel; case completo em página própria.
6. **Interações:** timeline de scroll (GSAP ScrollTrigger), linhas desenhadas por SVG, nós arrastáveis, transições contínuas entre páginas.
7. **Competência técnica:** máxima vitrine de frontend e motion.
8. **Confiança empresarial:** boa metáfora do que você vende (integração/automação), mas **exige esforço do visitante** para chegar à informação.
9. **Mobile:** precisa de layout totalmente diferente (fluxo vertical simplificado) — na prática, dois sites.
10. **Dificuldade:** alta. Manutenção alta (cada projeto novo mexe na coreografia).
11. **Riscos:** acessibilidade (conteúdo dentro de canvas/SVG animado), scroll-jacking, SEO, performance mobile, prazo; o espetáculo pode ofuscar projetos ainda modestos.
12. **Referências:** ITom (camada HTML paralela), Bruno Simon (exploração), case de Joffrey Spitzer/Arnaud Rocca na Codrops (GSAP + transições).

### C — "Memorial" (surgiu da pesquisa) — **recomendada**
1. **Conceito:** inspirado no **memorial descritivo** da engenharia brasileira, o documento que explica *o que* foi construído, *por quê* e *com quais especificações*. O portfólio é um caderno técnico autoral: seções numeradas, anotações na margem, especificações e **figuras interativas** que explicam cada projeto.
2. **Personalidade:** rigorosa, calma, confiável, com o humor e a curiosidade nos detalhes (notas de margem, rodapés). Lê como um bom documento técnico e se usa como um produto.
3. **Paleta/tipo:** papel off-white levemente quente + tinta quase preta + **um único acento** (ex.: vermelho-revisão ou azul-cianotipia) usado só para anotação e interação. Modo escuro "cianotipia". Tipografia em 3 papéis: **serifada de texto** para títulos e leitura longa (personalidade editorial), **grotesca** para UI e **mono** para numeração, specs e anotações. Escala ampla, grid de 12 colunas com **coluna de margem** para notas.
4. **Home (ordem):**
   - `00` Posicionamento numa frase concreta (ex.: "Construo sistemas web, automações e integrações para empresas que ainda resolvem tudo em planilha") + disponibilidade + dois CTAs (ver projetos / conversar).
   - **Figura-assinatura** (ver §7.4): diagrama pequeno e interativo do tipo de problema que você resolve.
   - `01` Projetos em destaque (2–4), cada um com rótulo de natureza, problema em uma linha, stack e figura de capa.
   - `02` Como trabalho: processo em 4–5 passos com o que o cliente recebe em cada um.
   - `03` Capacidades demonstradas: cada competência aponta para o trecho do projeto que a prova (sem barras nem logos).
   - `04` Sobre, curto e humano: formação, foco, o que está estudando agora.
   - `05` Contato: e-mail copiável, agenda, LinkedIn/GitHub, fuso horário.
   - Rodapé: "como este site foi feito" + changelog.
5. **Projetos:** estudo de caso como memorial (template na §7.2), com figuras interativas embutidas; índice lateral numerado com indicador de leitura.
6. **Interações:** transições entre páginas com View Transitions (o card do projeto "vira" a capa do case); notas de margem que se expandem (popover); figuras manipuláveis; underline de link desenhado; indicador de seção no índice. Movimento curto (150–400 ms), sempre em resposta a uma ação ou à entrada de um elemento — nunca em loop sem controle.
7. **Competência técnica:** as figuras são componentes reais (simulação de pipeline, mini-dashboard, diff de API). Seções "decisões técnicas" e "como este site foi feito" mostram raciocínio de engenharia.
8. **Confiança empresarial:** a estrutura problema → solução → especificação → resultado **já é o formato de uma proposta comercial**. O cliente reconhece o próprio problema antes de ver qualquer tecnologia.
9. **Mobile:** a coluna de margem vira nota em linha (toque para abrir); figuras têm versão simplificada e controles por toque; índice vira barra de progresso + menu de seções.
10. **Dificuldade:** média. A complexidade fica concentrada nas figuras, que são isoladas por projeto. Manutenção baixa: novo projeto = novo arquivo MDX.
11. **Riscos:** parecer sóbrio demais (mitigação: assinatura + figuras + microtipografia caprichada); exige **escrita de qualidade** (é o maior trabalho real); a serifada precisa de escolha e licença cuidadosas.
12. **Referências:** Josh Comeau (figuras explorables), Brittany Chiang (estrutura e arquivo), Rauno (Lab separado, princípios), Emil Kowalski (motion com critério), Sara Soueidan (acessibilidade como valor), Snellenberg (bloco de contato).

### Comparação

| | A Bancada | B Fluxo | C Memorial |
|---|---|---|---|
| Clareza para cliente em 30 s | Média | Baixa | **Alta** |
| Prova técnica para recrutador | Alta | **Muito alta** | Alta |
| Memorabilidade | Média (risco "template") | **Muito alta** | Alta (conceito local e raro) |
| Funciona com poucos projetos | Fraco | Médio | **Forte** |
| Acessibilidade / SEO | Bom | Difícil | **Excelente** |
| Custo de construção | Médio | Alto | Médio |
| Custo de evoluir | Médio | Alto | **Baixo** |

### Recomendação: **C — Memorial, com uma assinatura emprestada de B**
Ela é a única que transforma sua limitação atual (poucos projetos) em vantagem (profundidade), fala a língua do cliente empresarial (proposta técnica) e continua mostrando craft de frontend nas figuras. Da direção B, aproveito **um único momento** — a figura-assinatura do hero, um fluxo pequeno e interativo — sem transformar o site inteiro em coreografia. A direção A fica como fonte de componentes (o mini-dashboard pode virar figura de um case). Antes de qualquer código, faço um protótipo estático de home e de case em C para validar se ela não fica sóbria demais.

