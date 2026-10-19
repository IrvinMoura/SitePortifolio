# Project Brief

> Visão, públicos, objetivos e escopo. Mudanças de escopo exigem um ADR em `docs/decisions/`.

## Visão
Portfólio profissional de Irvin Marques como **desenvolvedor independente**: sites e experiências web, sistemas e dashboards, automação de processos, integrações entre APIs e IA aplicada.

O site é ao mesmo tempo **vitrine e prova**: a forma como foi construído demonstra a competência que ele anuncia. O conceito é o **Memorial**, um caderno técnico autoral inspirado no memorial descritivo da engenharia (ver [DESIGN.md](DESIGN.md)).

## Públicos (em ordem de prioridade)

| Público | O que precisa em 30 s | O que precisa em 5 min | Ação desejada |
|---|---|---|---|
| **Cliente empresarial** (PMEs, gestores, empreendedores) | Entender que problema você resolve, em linguagem de negócio | Ver como você trabalha e uma prova concreta | Conversar (e-mail / agenda) |
| **Recrutador / tech lead** | Posicionamento e stack | Profundidade técnica, raciocínio, código | Abrir GitHub, LinkedIn, currículo; contatar |
| **Comunidade dev** | Algo interessante para explorar | Decisões técnicas, figuras, changelog | Acompanhar, compartilhar |

## Objetivos
1. Gerar conversas com potenciais clientes (freelance).
2. Demonstrar competência técnica para oportunidades profissionais.
3. Construir uma identidade própria que evolui junto com a carreira.

**Critério de sucesso do lançamento:** em até 30 s, uma pessoa de fora sabe dizer o que o Irvin faz, para quem, e como falar com ele. Validar com 3 pessoas (1 não técnica).

## Posicionamento (rascunho, refinar na fase 5)
> Construo sistemas web, automações e integrações para empresas que ainda resolvem tudo em planilha e retrabalho.

Princípio: frases concretas e verificáveis. Nada de "apaixonado por tecnologia", "soluções inovadoras" e afins.

## Situação de partida
- **Ainda não há projetos.** O site é lançado com o que é verdadeiro hoje e cresce de forma incremental ([ADR 006](decisions/006-lancamento-sem-projetos.md)).
- O primeiro estudo de caso é **o próprio site** (Memorial 001).
- Os próximos projetos serão demonstrativos, escolhidos para cobrir os serviços oferecidos (ver [ROADMAP.md](ROADMAP.md)).

## Escopo do MVP
- Home: posicionamento, figura-assinatura, Memorial 001, Como trabalho, Em construção (changelog), Sobre resumido, Contato.
- `/sobre` com currículo em PDF.
- `/memoriais/este-site`: estudo de caso do próprio portfólio (rotas em [ARCHITECTURE.md](ARCHITECTURE.md)).
- `/registro`: changelog / diário público.
- 404, SEO, OG images, sitemap, tema claro/escuro, acessibilidade completa.
- Conteúdo em **PT-BR**; arquitetura preparada para inglês.

## Fora do escopo do MVP
- Versão em inglês, `/lab`, `/notas` (artigos), RSS.
- Backend, banco de dados, autenticação, CMS, formulário próprio.
- 3D/WebGL, smooth scroll artificial, preloader.

## Regras de honestidade (inegociáveis)
1. Todo projeto tem **natureza** declarada: `cliente`, `academico`, `demonstrativo`, `proprio` (ex.: este site) ou `open-source`. Projetos e clientes fictícios precisam estar declarados como tal.
2. **Métricas só com fonte** (link, relatório, captura datada). Sem fonte, o build falha.
3. Sem depoimentos, logos ou avaliações que não existam e não tenham autorização.
4. Sem barras de habilidade, porcentagens de domínio ou contadores arbitrários.
5. Competências são demonstradas apontando para o trabalho que as prova.
6. Seções sem conteúdo real não são renderizadas: nada de placeholder nem "em breve".

## Hipóteses e pendências
| Item | Estado |
|---|---|
| Nome exibido | **Irvin Marques** (decidido) |
| Foto | Pendente. Não aparece no site até existir (sem espaço vazio em produção) |
| LinkedIn, currículo PDF | Pendentes. Só GitHub (IrvinMoura) aparece por enquanto |
| Marca / estúdio | **Phainon**: nome planejado, empresa ainda não criada; apresentar como "em estruturação" |
| E-mail | Provisório: e-mail pessoal; trocar por e-mail profissional quando houver domínio |
| Texto do Sobre | Provisório, escrito só com fatos informados (fase 5, em `src/pages/sobre.astro` e na seção 04 da home); Irvin vai substituir |
| Domínio (`nome.dev` + `.com.br`?) | Pendente (fase 3) |
| Hospedagem | **Vercel** ([ADR 007](decisions/007-hospedagem-vercel.md)) |
| Famílias tipográficas e cor de acento | **Expressivo** (Fraunces · Geist · Geist Mono) + **laranja-sinal** (decidido) |
| Figura-assinatura | Mantida como no protótipo; teste de 5 s adiado por decisão do Irvin (18/10/2026) |
