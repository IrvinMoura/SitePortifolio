# Roadmap

> Status atualizado ao fim de cada fase. Uma fase só começa quando os critérios de conclusão da anterior foram atingidos e as aprovações listadas foram dadas.

**Legenda:** ✅ concluída · 🔵 em andamento · ⬜ pendente

| # | Fase | Status | Objetivo | Entregáveis | Pronto quando | Aprovar antes de avançar |
|---|---|---|---|---|---|---|
| 1 | Pesquisa e requisitos | ✅ | Base de decisão | [RESEARCH.md](RESEARCH.md), [PROJECT_BRIEF.md](PROJECT_BRIEF.md) | Direção escolhida | Direção C ✅ · lançar sem projetos ✅ |
| 2 | Direção criativa | ✅ | Validar o visual antes do código | **Protótipo estático** de home + Memorial 001 (`prototype/`, pronto) | Protótipo aprovado | Tipografia ✅ · acento ✅ · nome ✅ · teste de 5 s adiado (figura mantida) · textos finais |
| 3 | Arquitetura | 🔵 | Esqueleto do repositório | Git + repo Astro/TS, CI, deploy de preview, schemas de conteúdo | Build e deploy de preview verdes; gates no CI | Hospedagem, domínio |
| 4 | Sistema visual | ⬜ | Tokens e componentes base | `tokens.css`, tipografia, grid com margem, componentes de [DESIGN.md](DESIGN.md), página interna `/_kitchen` | Componentes com foco, tema escuro e teste visual | — |
| 5 | Home e navegação | ⬜ | Primeira versão completa | Home, header/footer, 404, `/sobre`, `/registro`, SEO base | Conteúdo real em tudo; teclado ok | Textos da home e do sobre |
| 6 | Memorial 001 (este site) | ⬜ | Primeiro estudo de caso | Template de memorial + `este-site.mdx` | Passa no checklist de memorial | Texto do memorial |
| 7 | Interações | ⬜ | Motion e figuras | I-01 a I-08 de [INTERACTIONS.md](INTERACTIONS.md) | Inventário do MVP implementado com fallbacks | Corte de qualquer interação que não passe |
| 8 | Responsividade e a11y | ⬜ | Robustez | Ajustes de 320 a 1920 px; leitor de tela | Zero violação axe; navegação completa por teclado | — |
| 9 | Testes, performance e SEO | ⬜ | Polimento | Lighthouse CI, OG images, JSON-LD, headers de segurança | Todos os gates verdes | — |
| 10 | Deploy e lançamento | ⬜ | Ir ao ar | Domínio, analytics, entrada "v1" no registro | Smoke test em produção em 3 navegadores; teste de 30 s com 3 pessoas | Go-live |
| 11 | Projetos (contínua) | ⬜ | Encher a vitrine com prova real | Um memorial por ciclo | Cada projeto passa no checklist de memorial | Escolha de cada projeto |

## MVP publicável
Fases 1 a 10, com: home completa, Memorial 001, `/sobre` + currículo, `/registro`, contato, figura-assinatura (se aprovada no teste), SEO, tema escuro e acessibilidade completa.

## Fase 11: trilha de projetos (sugestão de ordem)
Todos com natureza **demonstrativo** até haver cliente. Cada um vira um memorial, com repositório público e demo.

| Ordem | Projeto | Serviço que prova |
|---|---|---|
| 1 | **Automação planilha → sistema**: lê planilha/formulário, valida, integra com uma API e notifica | Automação, integração |
| 2 | **Painel gerencial** sobre dados abertos, com filtros, gráficos acessíveis e exportação | Sistemas, dashboards |
| 3 | **Site para um negócio fictício declarado** | Sites profissionais |
| 4 | **Assistente de busca em documentos (RAG)**, com avaliação de limitações | IA aplicada |

Meta: 2 projetos em ~3 meses após o lançamento. Trabalhos da faculdade podem entrar como *acadêmico* se puderem ser documentados.

## Pós-MVP (sem data)
`/memoriais` (com ≥ 3 itens) · versão `en` · `/lab` · `/notas` + RSS · barra de progresso scroll-driven (I-10) · dados de build no rodapé (último deploy, commit).

## Riscos principais
| Risco | Mitigação |
|---|---|
| Sem projetos, a conversão de clientes começa baixa | Priorizar os projetos 1 e 2; posicionamento claro; o Memorial 001 como prova de método |
| Direção sóbria demais | Protótipo na fase 2; assinaturas visuais; figura interativa |
| Escrita é o gargalo | Template de memorial; escrever em paralelo ao desenvolvimento |
| Escopo cresce com interações | Toda interação nova passa por [INTERACTIONS.md](INTERACTIONS.md) e orçamento de JS |
