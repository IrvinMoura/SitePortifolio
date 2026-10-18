# Fase 0 — Pesquisa, direção criativa e planejamento

> **Arquivado em 18/10/2026.** Registro histórico da Fase 0. O conteúdo vigente está em `docs/` (ver README). Não editar.

> Documento de trabalho para aprovação. Pesquisa feita em 18/10/2026.
> Depois de aprovado, ele será dividido nos documentos definitivos (ver §9). Nenhum código foi escrito.

**Legenda de evidência:** **[O]** observado diretamente (navegador, DOM, rede) · **[F]** relatado por fonte externa (link) · **[I]** inferência minha · **[R]** recomendação.

**Hipóteses adotadas (reversíveis):** idioma principal PT-BR com EN depois; atuação a partir do Brasil, atendendo PMEs locais e vagas remotas; ainda não há inventário fechado de projetos; nome no site = "Irvin" + sobrenome a definir.

---

## 1. Objetivos entendidos

1. **Converter clientes empresariais** (sites, dashboards, automação, integrações, IA aplicada) → precisam entender *o que você resolve*, ver prova e ter um caminho curto até o contato.
2. **Convencer recrutadores** → precisam ver profundidade técnica, raciocínio e código real em poucos minutos.
3. **Identidade autoral que evolui** → o sistema precisa absorver novos projetos, textos e experimentos sem redesign.

Restrição central: **honestidade**. Sem métricas, logos, depoimentos ou níveis de habilidade inventados; projetos rotulados como *Cliente real*, *Acadêmico* ou *Demonstrativo*.

Tensão de design a resolver: você está no início da carreira, então o site **não pode depender de volume** (muitos clientes, muitos posts, palestras). Ele precisa extrair o máximo de **poucos projetos bem documentados**.

## 2. Plano e critérios de pesquisa

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

## 3. Referência principal — braydoncoyer.dev

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

## 4. Pesquisa externa — portfólios

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

## 5. Síntese

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

## 6. Três direções criativas

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

---

## 7. Experiência

### 7.1 Sitemap (MVP em negrito)

| Rota | Por que existe |
|---|---|
| **`/`** | Posicionamento, prova e contato em uma rolagem. |
| **`/projetos`** | Índice completo (tabela filtrável por tipo: cliente / acadêmico / demonstrativo; por área). Fica útil a partir de ~5 projetos; antes disso pode ser só a seção da home. |
| **`/projetos/[slug]`** | Estudos de caso (o coração do site). |
| **`/sobre`** | Recrutadores e clientes querem saber quem é a pessoa; inclui formação, experiência verificável e link para o **currículo em PDF** (sem página de currículo separada, que duplicaria o conteúdo). |
| **`/contato`** | Opcional. Se a seção da home bastar, vira só âncora. Recomendo âncora no MVP. |
| `/lab` | Pós-MVP. Experimentos de interação, separados da vitrine. Entra quando houver 3 ou mais experimentos. |
| `/notas` | Pós-MVP. Artigos técnicos curtos. Só entra quando houver ritmo de escrita; blog vazio prejudica a credibilidade. |
| `/colofao` | Pós-MVP (ou seção do rodapé no MVP): como o site foi feito, stack, changelog. |
| `404`, RSS (quando houver notas), `sitemap.xml`, `robots.txt` | Infra. |
| `/en/...` | Pós-MVP. Versão em inglês para vagas internacionais. A arquitetura já nasce preparada para i18n. |

### 7.2 Template de estudo de caso ("memorial")
Cabeçalho com ficha técnica: **natureza** (Cliente real / Acadêmico / Demonstrativo / Open source), período, papel, stack, links (demo, repositório) e status (em produção, arquivado, protótipo).

1. **Contexto e problema**: em linguagem de negócio, sem jargão.
2. **Para quem** e qual necessidade.
3. **Solução proposta**: uma frase + figura principal.
4. **Funcionalidades e fluxos**: 2–4 fluxos, com figura interativa ou vídeo curto.
5. **Arquitetura e stack**: diagrama e motivos de cada escolha.
6. **Decisões técnicas**: formato ADR curto (*decisão · alternativas · por quê*).
7. **Interface**: capturas e demonstração funcional.
8. **Qualidade**: testes, segurança e acessibilidade, só o que existe de fato.
9. **Resultados ou aprendizados**: números apenas com fonte; caso contrário, aprendizados e o que faria diferente.
10. **Próximos passos** e links.

Campos obrigatórios no schema (validados no build): natureza, papel, stack, status. Métricas exigem campo `fonte`; sem fonte, o build falha. **A honestidade vira regra de código.**

### 7.3 Inventário de interações (MVP)
| Interação | Técnica | Sem JS / reduced motion |
|---|---|---|
| Transição card → capa do case | View Transitions cross-document (CSS) | Navegação normal (Firefox ainda não suporta, ver §8) |
| Entrada de seções | `@starting-style` / reveal só acima da dobra da seção, curto | Conteúdo visível desde o início |
| Índice com indicador de seção | IntersectionObserver | Índice estático |
| Notas de margem | `popover` + anchor positioning com fallback | Nota em linha |
| Figuras interativas | Ilha JS por figura, carregada quando visível | Imagem estática + legenda descritiva |
| Copiar e-mail | Clipboard API + feedback | Link `mailto:` |
| Tema claro/escuro | CSS custom properties + `prefers-color-scheme` | Segue o sistema |

### 7.4 Figura-assinatura (hero)
Um diagrama pequeno de um processo empresarial comum (ex.: *pedido no WhatsApp → planilha → retrabalho*) que o visitante transforma, num clique ou arraste, em *pedido → API → automação → painel*. Ele mostra, em 5 segundos, o que você vende e que sabe construir interfaces vivas. Funciona por teclado, tem estado final estático sob reduced motion e pesa poucos KB (SVG + JS mínimo). **Deve ser prototipado e testado com 2–3 pessoas antes de entrar no MVP**; se não for entendido em 5 segundos, sai.

---

## 8. Arquitetura e stack

Versões conferidas no npm em 18/10/2026; suporte de navegadores conferido no MDN BCD 8.1.6.

| Camada | Recomendação | Por quê / alternativa |
|---|---|---|
| Framework | **Astro 7.4** (saída estática) | Zero JS por padrão, ilhas só onde há figura, content collections tipadas com MDX, i18n nativo. Já é o padrão dos portfólios minimalistas premiados (case Spitzer). *Alternativa:* Next.js 16.4 se você quiser o site inteiro em React como vitrine para vagas React, ao custo de mais JS e mais complexidade sem ganho para o visitante. |
| Linguagem | **TypeScript** estrito | Schemas de conteúdo e figuras. |
| Componentes interativos | **React em ilhas**, só nas figuras | Mostra React a recrutadores sem pesar o site todo. *Alternativa:* Preact (mais leve) ou Svelte. |
| Estilo | **CSS moderno puro**: custom properties como tokens, `@layer`, container queries, `oklch` | Uma direção editorial pede controle tipográfico fino; tokens em CSS são a fonte da verdade do design system. *Alternativa:* Tailwind 4.3, se preferir velocidade; funciona bem com Astro. |
| Motion | **1. CSS nativo** (View Transitions, `@starting-style`, transições). **2. Motion 14** (`animate` a partir de ~3,2 KB, vanilla e React) para figuras. **3. GSAP 3.15** somente se a figura-assinatura exigir timeline complexa. | GSAP é gratuito, mas sob licença própria ("Standard no-charge"), não MIT. |
| Evitar no MVP | **Lenis** (scroll nativo é melhor para leitura e acessibilidade), **Three.js/R3F** (nenhuma ideia da direção C precisa de 3D), scroll-driven animations como requisito | `animation-timeline`: Chrome 115+, Safari 26+, **Firefox só preview** → somente como aprimoramento progressivo com `@supports`. |
| Suporte relevante | View Transitions cross-document: Chrome 126+, Safari 18.2+, **Firefox não** · `startViewTransition` (mesmo documento): Firefox 144+ · `@starting-style`, `popover`, anchor positioning (Firefox 147+), container queries: suportados nos três | Tudo usado como aprimoramento progressivo. |
| Conteúdo | **Arquivos MDX no repositório** | Sem CMS: você é o único editor, e versionar conteúdo é bom. Reavaliar só se outra pessoa for editar. |
| Ícones | Lucide (MIT) ou SVG próprios | Poucos ícones; arte própria reforça a identidade. |
| Fontes | Auto-hospedadas, subset, `font-display: swap`, máximo 3 famílias | Desempenho e privacidade (sem Google Fonts em runtime). |
| Hospedagem | **Cloudflare Pages** ou **Vercel/Netlify** (plano gratuito) | Site estático = CDN, sem servidor, superfície de ataque mínima. |
| Domínio | `seunome.dev` (+ `.com.br` redirecionando, se for atender cliente local) | `.dev` exige HTTPS (HSTS preload). |
| Contato | `mailto` + botão copiar + link Cal.com | **Sem backend.** Formulário só se houver demanda, via serviço de formulários com anti-spam. |
| Analytics | **Cloudflare Web Analytics** (grátis, sem cookies) ou Umami/Plausible | Sem banner de cookies e compatível com a LGPD. |
| Qualidade | `astro check` + ESLint/Prettier · **Vitest** (utilitários e figuras) · **Playwright** 1.64 (fluxos, screenshots visuais desktop e mobile) · **@axe-core/playwright** (a11y) · **Lighthouse CI** com orçamento · teste manual com teclado e leitor de tela | Tudo em CI no GitHub Actions. |
| Segurança | Cabeçalhos via `_headers` (CSP estrita, HSTS, `Referrer-Policy`, `Permissions-Policy`), dependências mínimas, Dependabot | Proporcional a um site estático. |

**Estático: vantagens e limites.** Vantagens: rápido, barato (grátis), seguro, SEO perfeito, nada para manter no servidor. Limites: nada dinâmico em tempo real (sem formulário próprio, sem contadores ao vivo). Dados como "último commit" podem ser buscados **no build**, e um rebuild agendado resolve o resto.

**Orçamentos (gates):** home ≤ 150 KB de JS comprimido (meta: < 50 KB); LCP < 2,0 s em 4G simulado; CLS < 0,05; Lighthouse ≥ 95 nas quatro categorias; zero violação axe nível A/AA.

---

## 9. Documentação proposta

| Arquivo | Responsabilidade | Decisão |
|---|---|---|
| `AGENTS.md` (+ `CLAUDE.md` apontando para ele) | Regras para agentes: comandos, convenções, honestidade de conteúdo, gates obrigatórios | Manter |
| `README.md` | Como rodar, build e deploy | Manter (curto) |
| `docs/PROJECT_BRIEF.md` | Visão, públicos, objetivos, escopo, não-objetivos, regras de honestidade | Manter |
| `docs/RESEARCH.md` | Seções 2–5 deste documento | Manter (congelado após aprovação) |
| `docs/DESIGN.md` | Direção aprovada + princípios + racional do design system | **Funde** DESIGN_DIRECTION e DESIGN_SYSTEM. Os valores dos tokens moram no código (`tokens.css`); o documento explica o porquê, sem duplicar valores. |
| `docs/INTERACTIONS.md` | Inventário: gatilho, duração, easing, comportamento em reduced motion, teclado e toque | Manter (vira contrato de teste) |
| `docs/ARCHITECTURE.md` | Stack, estrutura de pastas, modelo de conteúdo, **sitemap/IA** | **Funde** TECHNICAL_ARCHITECTURE e SITE_STRUCTURE (o sitemap é definido pelas collections) |
| `docs/ROADMAP.md` | Fases, status, MVP × depois | Manter |
| `docs/QUALITY_GATES.md` | Checklist de pronto + orçamentos | Manter (usado em cada PR) |
| `docs/decisions/NNN-*.md` | ADRs curtos (uma decisão por arquivo) | **Adicionar** — registra o porquê das escolhas e evita rediscussão |

Resultado: 8 documentos + ADRs, em vez de 10 documentos com sobreposição.

---

## 10. Roadmap

| # | Fase | Objetivo | Entregáveis | Depende de | Pronto quando | Riscos | Testes | Aprovar antes de avançar |
|---|---|---|---|---|---|---|---|---|
| 1 | Pesquisa e requisitos | Base de decisão | Este documento; inventário dos seus projetos | — | Direção escolhida; ≥ 2 projetos candidatos com material | Falta de projetos reais | — | Direção; lista de projetos |
| 2 | Direção criativa | Validar visual antes do código | Moodboard; **protótipo estático** (Figma ou HTML descartável) de home + 1 case; teste de 5 s da figura-assinatura | 1 | Você aprova o protótipo; teste de 5 s passa | Ficar sóbrio demais | Teste com 2–3 pessoas | Tipografia, paleta, assinatura |
| 3 | Arquitetura | Esqueleto do repositório | Repo Astro + TS, CI, deploy de preview, docs, schemas de conteúdo | 2 | Build e deploy de preview verdes; gates no CI | Overengineering | CI vazio passando | Hospedagem, domínio |
| 4 | Sistema visual | Tokens e componentes base | `tokens.css`, tipografia, grid com margem, link, botão, nota, figura, ficha técnica; página `/_kitchen` interna | 3 | Componentes com estados de foco e tema escuro | Inconsistência | Visual (Playwright), axe | — |
| 5 | Home e navegação | Primeira versão publicável | Home completa, nav, rodapé, 404, SEO base | 4 | Conteúdo real (sem lorem) | Texto fraco | E2E, teclado | Textos da home |
| 6 | Projetos | Estudos de caso | Template + 2–3 cases reais; `/projetos` | 4 | Cada case passa no checklist de honestidade | Escrita demora | Validação de schema | Cada case |
| 7 | Interações | Motion e figuras | View transitions, figura-assinatura, figuras dos cases | 5, 6 | Inventário 100% implementado com fallbacks | Peso de JS, distração | Reduced motion, orçamento | Corte de qualquer interação que não passe |
| 8 | Responsividade e a11y | Robustez | Ajustes de 320 px a 1920 px, toque, leitor de tela | 7 | Zero violação axe; navegação completa por teclado | Figuras no mobile | NVDA/VoiceOver manual, matriz de dispositivos | — |
| 9 | Testes, perf e SEO | Polimento | Lighthouse CI, OG images por página, JSON-LD (`Person`), sitemap, headers de segurança | 8 | Todos os gates verdes | Fontes pesadas | LHCI, securityheaders | — |
| 10 | Deploy final | Lançamento | Domínio, analytics, changelog v1 | 9 | Site no ar e revisado em 3 navegadores reais | DNS/HSTS | Smoke test em produção | Go-live |

**MVP publicável:** fases 1–6 + transições e figura-assinatura (subconjunto da 7) + 8–10. Home, 2–3 cases, Sobre com currículo, contato, SEO, tema escuro, acessibilidade completa.
**Depois do MVP:** `/lab`, `/notas` + RSS, versão em inglês, `/colofao` com changelog, mais figuras interativas, OG images dinâmicas, dados de build ao vivo (último deploy, commits).

---

## 11. Decisões que preciso de você

1. **Direção:** C (Memorial, recomendada), A, B, ou outra combinação?
2. **Projetos:** quais projetos reais existem hoje, de qual natureza, e com qual material (repositório, demo, capturas)? As pastas `BackEnd`, `FrontEnd`, `MachineLearning` e `DeepLearning` em `Portifolio/` estão vazias. Esse inventário é o maior fator de risco.
3. **Idioma:** PT-BR primeiro e EN depois (minha hipótese), ou bilíngue desde o lançamento?
4. **Framework:** Astro com ilhas React (recomendado) ou Next.js inteiro?
5. **Presença pessoal:** usar sua foto e nome completo? Domínio desejado?

---

## 12. Adendo (18/10/2026): lançar sem projetos

**Decisões registradas:** direção C (Memorial) aprovada, com a figura-assinatura. Ainda não há projetos; eles entram com o tempo.

**Impacto:** a direção continua válida. O formato memorial depende de *documentar bem*, e não de *ter muitos projetos*. O que muda é a ordem: o site nasce com o que é **verdadeiro hoje** e a vitrine cresce de forma incremental, sem nenhum espaço vazio ou "em breve".

### Home do lançamento ("Memorial nº 0")
| Seção | Conteúdo real disponível no dia 1 |
|---|---|
| `00` Posicionamento | Frase concreta + "disponível para primeiros projetos" (honesto e atrativo para PMEs) |
| Figura-assinatura | É, por si só, a primeira demonstração funcional |
| `01` **Memorial 001 — este site** | O próprio portfólio como primeiro estudo de caso real: problema, decisões, arquitetura, acessibilidade, performance medida (Lighthouse **com fonte**) |
| `02` Como trabalho | Processo e o que o cliente recebe em cada etapa |
| `03` Em construção | Diário/changelog público dos próximos projetos (*building in public*); datado e verificável |
| `04` Sobre | Formação, foco, o que está estudando |
| `05` Contato | E-mail, agenda, LinkedIn/GitHub |

**Regra de código:** a seção "Projetos" e a rota `/projetos` só aparecem quando a collection tiver ≥ 1 item publicado (≥ 3 para a página de índice). Nada de placeholder.

### Trilha de projetos pós-lançamento (sugestão, todos rotulados *Demonstrativo* até haver cliente)
Escolhidos para cobrir os serviços que você quer vender, e cada um vira um memorial:
1. **Painel gerencial** — dashboard sobre dados públicos (ex.: dados abertos de um município) com filtros, gráficos acessíveis e exportação.
2. **Automação planilha → sistema** — fluxo que lê uma planilha/formulário, valida, integra a uma API e notifica. Mostra automação e integração.
3. **IA aplicada** — assistente de busca sobre documentos (RAG) com avaliação honesta de limitações.
4. **Site profissional para um negócio fictício declarado** — prova direta de "faço sites para empresas".

Trabalhos de faculdade podem entrar como *Acadêmico* se tiverem código e você conseguir documentá-los. Vale revisitar.

### Ajuste no roadmap
- A fase 6 passa a ser: **template de case + Memorial 001 (este site)**.
- **Fase 11 (contínua):** um projeto demonstrativo a cada ciclo, publicado como memorial. Meta sugerida: 2 projetos em ~3 meses após o lançamento.
- O changelog/"Em construção" entra no MVP (antes era pós-MVP).

### Risco
Sem projetos, a conversão de clientes nos primeiros meses é limitada; o site serve primeiro a recrutadores e à construção de presença. **Mitigação:** priorizar os demonstrativos 1 e 2, que são os mais próximos do que PMEs compram.
