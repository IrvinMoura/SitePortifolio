# Protótipo — fase 2

Protótipo estático e **descartável** da home e do Memorial 001, feito para validar a direção visual antes do código de produção. Não é a base do site final; ao fim da fase 2 ele será removido ou arquivado.

## Como rodar
```bash
node prototype/serve.mjs
```
Abra http://localhost:4322. O painel **Protótipo · opções**, no canto inferior direito, troca:
- **Tipografia:** Literário (Newsreader · Inter · JetBrains Mono), Técnico (Source Serif 4 · IBM Plex Sans · IBM Plex Mono), Expressivo (Fraunces · Geist · Geist Mono)
- **Acento:** vermelho-revisão, azul-cianotipia, laranja-sinal
- **Destacar pendências:** marca o conteúdo que ainda depende de você (sobrenome, instituição, e-mail, links)

O tema claro/escuro fica no cabeçalho. As escolhas são lembradas entre as páginas.

## O que validar
1. Combinação tipográfica e acento (claro **e** escuro).
2. Teste de 5 s da Fig. 0 com 3 pessoas (1 não técnica): "o que essa pessoa faz?"
3. Se a direção está sóbria demais ou no ponto.
4. Os textos: posicionamento, "Como trabalho", Sobre.

## Limitações conhecidas
- Fontes vêm do Google Fonts (em produção serão auto-hospedadas, no máximo 5 arquivos).
- A transição entre páginas (View Transitions) funciona em Chrome/Edge/Safari; no Firefox a navegação é normal.
- Notas de margem são estáticas (o popover previsto em INTERACTIONS I-04 fica para a implementação real).
