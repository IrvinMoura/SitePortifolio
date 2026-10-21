# 008 — Direção criativa "Emaki"
**Status:** Aceito · 21/10/2026 · Substitui o [ADR 001](001-direcao-memorial.md)

**Contexto:** a versão Memorial (fases 4 e 5) ficou correta, mas sóbria demais, o risco apontado no ADR 001. Um protótipo novo (`prototype/emaki/`) testou o site como um *emaki*, o rolo narrativo japonês: a página se desenrola em cenas numeradas em kanji, os títulos são pintados a pincel e um selo vermelho assina o trabalho. O Irvin aprovou a direção e pediu que ela substituísse o portfólio antigo.

**Decisão:** adotar o Emaki em todo o site, com as opções escolhidas no protótipo:
- **Pincel:** Kaushan Script nos títulos latinos; Yuji Syuku (só os glifos usados) no japonês.
- **Texto:** Zen Kaku Gothic New (400 e 700); rótulos em IBM Plex Mono 400.
- **Papel:** noite sumi (escuro) por padrão; washi (claro) pela alternância de tema, persistida.
- **Acento:** vermelho shu. **Pincelada:** expressiva (1200 ms por palavra, 190 ms entre elas), com o borrão só no começo de cada palavra: no protótipo as letras ficavam tortas até o fim.
- **Home em cenas:** 序 abertura · 一 Projetos · 二 O que eu faço · 三 Sobre · 四 Contato.
- O conteúdo continua o mesmo de antes: memoriais com natureza declarada, registro público, contato. O vocabulário "memorial" segue nas rotas e no schema.

**Alternativas:** manter o Memorial e só aquecer a paleta (não resolvia a falta de assinatura); as outras fontes de pincel do protótipo (Knewave, encorpada demais para títulos longos; Sedgwick Ave Display, menos legível) e o acento violeta.

**Consequências:**
- Saem a figura-assinatura Fig. 0 (I-08) e a grade com notas de margem na home; o template de memorial mantém índice, notas e ficha técnica, com a pele nova.
- Entram as interações I-11 a I-14 de [INTERACTIONS.md](../INTERACTIONS.md). Elas somam um script pequeno em todas as páginas; o orçamento "0 KB próprios em página sem ilha" passa a aceitar tema, copiar, tinta e eixo do rolo.
- O pergaminho com a foto (makimono) fica de fora até existir uma foto real: não há espaço reservado vazio em produção.
- O texto do Memorial 001 que descreve a direção visual precisa ser revisto na fase 6.
