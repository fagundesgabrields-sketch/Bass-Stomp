# Identidade visual — Bass Stomp

> Como a marca Bass Stomp aparece em tudo que o MazyOS gera.
> As skills de conteúdo, páginas, carrossel e posts leem esse arquivo antes de criar qualquer visual.
> Referência interativa completa: `identidade/bass-stomp-identidade.html`.

---

## Cores

| Nome | Hex / RGBA | Uso |
|---|---|---|
| **Ink** | `#131217` | Fundo principal (dark mode padrão), texto em fundo claro, selo |
| **Bone** | `#F2EEE4` | Fundo claro alternativo, papel, textos sobre Ink |
| **Paper** | `#FBF9F4` | Fundo de cards sobre Bone, placas de hardware |
| **Stomp Orange** | `#FF5A22` | Acento principal — CTAs, botões, LED aceso, preços e destaques |
| **Orange Dim** | `#D6431A` | Hover e estados ativos do laranja |
| **Low End Blue** | `#26324F` | Secundária — categorias, links e marcações sóbrias |
| **LED Yellow** | `#F2C230` | Uso pontual — badges de "novo", "mais vendido" ou LED de alerta |
| **Line** | `rgba(19,18,23,0.14)` | Bordas sutis no claro / `rgba(242,238,228,0.15)` no escuro |

**Regra de ouro:** **Um único acento por peça** (laranja OU azul, nunca os dois competindo). Fundo escuro (Ink) é o padrão; Bone é usado quando necessária maior leveza ou leitura de textos longos.

---

## Tipografia

```css
--font-display: 'Anton', sans-serif;
--font-body: 'IBM Plex Sans', sans-serif;
--font-mono: 'IBM Plex Mono', monospace;
```

- **Títulos e destaques:** `Anton` (Google Fonts) — pesado, condensado, mesmo peso do selo da marca. Usar em headlines, números grandes e nomes de coleções.
- **Corpo e descrições:** `IBM Plex Sans` (400, 600, 700) — legibilidade técnica, descrições de produtos, artigos e botões.
- **Técnico, labels e specs:** `IBM Plex Mono` (400, 500, 600) — nome da pedaleira, parâmetros de knob (`GAIN / TONE / LEVEL`), specs e preços em pílula. *Nunca usar em blocos longos de texto.*

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
