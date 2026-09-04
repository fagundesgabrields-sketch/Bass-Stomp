# Identidade visual — Bass Stomp

> Como a marca Bass Stomp aparece em tudo que o MazyOS gera.
> As skills de conteúdo, páginas, carrossel e posts leem esse arquivo antes de criar qualquer visual.
> Referência interativa completa: `identidade/bass-stomp-identidade.html`.

---

## Cores

| Nome | Hex / RGBA | Uso |
|---|---|---|
| **Neutral** | `#1C1A18` | Fundo dark (top bar, tone lab, rodapé), texto primário no modo claro, selo |
| **Sand / Canvas** | `#F4F0EB` | Fundo principal da loja e páginas de produto |
| **Surface / Paper** | `#FAF8F5` | Fundo de cards, caixas de input e painéis destacados |
| **Primary (Stomp Orange)** | `#E25822` | Acento primário — CTAs principais, foco, bordas ativas e LEDs |
| **Secondary (Teal)** | `#2E6F89` | Acento secundário — botões de apoio, tags complementares, links |
| **Tertiary (Brick Red)** | `#C83827` | Acento terciário — badges de desconto, promoções e avisos |
| **Line / Border** | `rgba(28,26,24,0.12)` | Bordas sutis no claro (`#E6E0D8`) / `rgba(250,248,245,0.12)` no escuro |

**Regra de ouro:** Alta legibilidade, calor analógico e contraste limpo. O tom de areia aquecido (`#F4F0EB`) ancora o visual editorial, equilibrado pelo escuro absoluto (`#1C1A18`) nas seções imersivas.

---

## Tipografia

```css
--font-display: 'Epilogue', sans-serif;
--font-body: 'Work Sans', sans-serif;
--font-mono: 'Space Mono', monospace;
```

- **Títulos e destaques:** `Epilogue` (Google Fonts, pesos 700 a 900) — imponente, geométrico, com presença forte para headlines e números de impacto.
- **Corpo e descrições:** `Work Sans` (400, 500, 600) — clareza editorial, excelente renderização em telas para leitura técnica, textos de produtos e FAQs.
- **Labels, specs e monospaçado:** `Space Mono` (400, 700) — códigos de pedaleiras, especificações de áudio, tags e preços em pílula.

---

## Estilo geral e estética

- **Universo de hardware de áudio e pedalboard:** Placas de metal, parafusos nos cantos das caixas, knobs rotativos, texturas táteis.
- **Direto, autêntico e profissional:** O design deve transmitir a sensação de plugar um cabo blindado num amplificador clássico valvulado — limpo, com peso e confiável.

---

## Elementos-chave

- **Selo (Logo Original):** Círculo monocromático ondulado. Usado isolado como avatar, carimbo ou marca d'água discreta.
- **Lockup Horizontal:** Selo mini + "BASS STOMP" em `Anton`, exclusivamente para cabeçalhos estreitos e assinaturas.
- **Trama de Pontos (Halftone):** Textura sutil de fundo (`radial-gradient` de ~1.5px com espaçamento ~9px e baixa opacidade) remetendo a acabamento gráfico analógico e adesivo.
- **Forma de Onda (Stomp Wave):** Linha poligonal irregular em Stomp Orange representando sinal e amplitude sonora.
- **Footswitch com Anel LED:** Círculo com anel laranja e centro aceso, indicando produto novo ou ativado.
- **Ficha Técnica de Produto:** Nome do pack em destaque (`IBM Plex Sans Bold`) + linha técnica mono (`HX STOMP · GAIN / TONE / LEVEL`) + preço em pill laranja (`IBM Plex Mono`).

---

## O que NUNCA fazer

- **Nunca usar degradês coloridos genéricos** (estilo tech/saas roxo ou neon).
- **Nunca competir o Stomp Orange e o Low End Blue** como destaques simultâneos na mesma peça.
- **Nunca recolorir o selo** com arco-íris ou gradientes — o selo é rigorosamente monocromático (apenas Ink ou apenas Bone).
- **Nunca esticar, inclinar ou aplicar o selo sobre fundos fotográficos poluídos** sem respiro sólido.
- **Nunca usar tipografias cursivas delicadas** ou fontes decorativas genéricas.

---

## Logo

- **Arquivo:** `identidade/logo.png` ou `identidade/logo.svg`
- **Versão para fundo escuro:** Monocromático em Bone (`#F2EEE4`) ou branco
- **Versão para fundo claro:** Monocromático em Ink (`#131217`)
- **Tamanho sugerido:** 120px a 200px nos layouts HTML e posts
- **Aplicação:** Selo circular ondulado "BASS STOMP"

---

## Observações adicionais

O guia interativo com todos os componentes visuais, knobs, paleta clicável e exemplos de cards e tags de produto está renderizado em `identidade/bass-stomp-identidade.html`.
