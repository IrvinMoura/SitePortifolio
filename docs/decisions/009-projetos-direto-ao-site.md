# 009 — Projetos levam direto ao site, sem página de memorial
**Status:** Aceito · 21/10/2026 · Substitui em parte o [ADR 006](006-lancamento-sem-projetos.md)

**Contexto:** cada projeto tinha uma página de estudo de caso (`/memoriais/<slug>`) explicando problema, solução e decisões. O Irvin não quer essa página: quem clica num projeto deve ver o projeto funcionando.

**Decisão:**
- O portão de cada projeto na home abre o site do projeto (`links.demo`), depois da travessia do portão (I-13). Projeto sem site no ar aparece sem link.
- As rotas `/memoriais` e `/memoriais/<slug>` deixam de existir, junto com o template de memorial (índice, figuras, lista de memoriais).
- A coleção de conteúdo continua se chamando `memoriais` no código e guarda só os dados do projeto (título, resumo, natureza, status, stack, links). Renomear não muda nada para quem visita.
- Continua valendo: todo projeto declara a **natureza** e métrica exige `source` (o schema impõe).

**Alternativas:** manter a página e abrir o site por um botão dentro dela (mais um clique até a prova); abrir o site em nova aba (quebra a travessia do portão e o botão Voltar).

**Consequências:**
- O Memorial 001 vira o projeto 001, que leva ao próprio site. O texto do memorial saiu do arquivo e fica no histórico do git.
- A fase 6 do roadmap ("Memorial 001") perde o objeto; o checklist de memorial vira checklist de projeto em [QUALITY_GATES.md](../QUALITY_GATES.md).
- Sai a interação I-03 (índice com seção ativa) e a I-09 (figuras de memorial).
