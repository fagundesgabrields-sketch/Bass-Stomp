# Identidade Visual — Bass Stomp: Herança SVT

> Diretrizes oficiais de design e especificações visuais da marca **Bass Stomp**.
> Consulte este documento antes de criar novas páginas, componentes de interface, peças gráficas ou materiais promocionais.

---

## 🎨 Paleta de Cores Oficial

A paleta é inspirada nos clássicos amplificadores valvulados e racks de estúdio **Ampeg SVT**, combinando superfícies em tolex escuro texturizado, painéis de metal anodizado azul, cantos cromados e serigrafia vintage em creme.

| Token | Hex / RGBA | Aplicação |
|---|---|---|
| `--tolex` | `#19181A` | Superfície base dos chassis, seções principais e plano de fundo |
| `--tolex-dark` | `#111012` | Fundos profundos, cabeçalho, caixas rebaixadas e footer |
| `--tolex-elevated` | `#212024` | Cards de produtos, painéis flutuantes e rack do Alpha Preamp |
| `--tolex-border` | `#2E2C33` | Linhas divisórias, separadores e bordas discretas |
| `--panel-blue` | `#3E6C9E` | **Acento Primário (Azul SVT)**: Botões principais, bordas de destaque, badges ativas |
| `--panel-blue-light` | `#5283B8` | Estado hover/ativo, brilho de LEDs e seletores de pedaleiras |
| `--panel-blue-hover` | `#335984` | Hover e clique em botões de ação principal |
| `--chrome` | `#C8CBCE` | **Ferragens Cromadas**: Cantos em bracket (L), parafusos de chassi e aros |
| `--chrome-bright` | `#E4E7EA` | Destaques metálicos, brilho especular e reflexos |
| `--chrome-border` | `rgba(200, 203, 206, 0.35)` | Bordas translúcidas de acabamento industrial |
| `--knob-cream` | `#E4E2DD` | **Tipografia Primária**: Títulos, serigrafia e marcações de painel |
| `--knob-cream-dim` | `#9C9A94` | Textos de apoio, metadados e legendas secundárias |
| `--pilot-red` | `#E53935` | **Lâmpada Piloto / LED**: Luz de status ativo, alertas e destaque sonoro |
| `--pilot-red-glow` | `rgba(229, 57, 53, 0.4)` | Halo luminoso do LED de status e footswitch |

---

## 🔤 Tipografia Oficial

```css
--font-display: 'Epilogue', sans-serif;
--font-body:    'Work Sans', sans-serif;
--font-mono:    'Space Mono', monospace;
```

- **Títulos e Headlines:** `'Epilogue', sans-serif` (pesos 700 a 900)
  - Robusta, com impacto estrutural e presença industrial.
  - Usada em títulos de seções, nomes dos produtos principais e números de destaque.
- **Corpo e Descrições:** `'Work Sans', sans-serif` (pesos 400 a 600)
  - Alta legibilidade em fundos escuros, desenho neutro e leitura confortável.
  - Usada em parágrafos, FAQs, descrições técnicas e fluxos de checkout.
- **Parâmetros Técnicos e Labels:** `'Space Mono', monospace` (pesos 400 e 700)
  - Caráter de terminal e painel de controle.
  - Usada em especificações de knobs (`GAIN`, `TONE`, `LEVEL`), compatibilidade de pedaleiras, linha de confiança e preços.

---

## 🎛️ Elementos e Componentes de Hardware

### 1. Cantos Cromados em Bracket (L)
- **Visual:** Cantoneiras metálicas de proteção em formato "L" de 2px de espessura nos 4 vértices do elemento, sem contornar a borda inteira.
- **Aplicação obrigatória:**
  - Imagem principal do produto na página [`produto.html`](file:///Users/gabriel.fagundes/bass-stomp/produto.html).
  - Rack do simulador Alpha Bass Preamp.
  - Cards de contato e suporte técnico.

### 2. Painel de Rack Ampeg SVT
- Cabeçalhos de racks e faixas de destaque com acabamento azul anodizado (`#3E6C9E`), textura sutil e tipografia serigrafada em creme (`#E4E2DD`).

### 3. Tone Tester Interativo
- **Localização exclusiva:** Página inicial ([`index.html`](file:///Users/gabriel.fagundes/bass-stomp/index.html)), no rack dedicado ao Alpha Bass Preamp.
- **Estrutura:** Áudio real A/B em `.wav` de estúdio com comutador Bypass vs Preamp Ativo, VU meter balístico analógico e seletor 250Hz / 800Hz.
- **Regra:** Não incluir player de prévia sonora nas páginas individuais de produto para manter foco total na ficha técnica e conversão.

### 4. Linha de Confiança & Suporte
- **Linha de Confiança:** Itens separados por ponto azul com a cor `--panel-blue` (`#3E6C9E`) e tipografia em `Space Mono`.
- **Botão de Suporte:** Botão "Tirar Dúvida Técnica com o Sergio" com borda evidente em `--panel-blue` para diferenciação do bloco de confiança.

---

## 🚫 O que NUNCA fazer

1. **Nunca usar tons laranjas:** O projeto foi unificado exclusivamente na identidade **Herança SVT**. Cores laranjas antigas foram descontinuadas.
2. **Nunca usar degradês coloridos de estilo SaaS/Tech:** O visual deve ser de equipamento de áudio analógico e ferragens reais.
3. **Nunca duplicar fotos na página de produto:** A página de produto individual deve exibir apenas a foto principal em destaque com os cantos cromados em bracket.
4. **Nunca colocar prévias de áudio avulsas na página de produto:** O Tone Tester é exclusividade do rack da home.
5. **Nunca exibir compatibilidade de pedaleira desconexa:** O badge e os requisitos técnicos devem corresponder rigorosamente ao modelo do produto exibido.
6. **Nunca usar tipografias delicadas, cursivas ou decorativas fora do padrão.**

---

<div align="center">
  <sub>Bass Stomp — Manual de Identidade Visual Herança SVT.</sub>
</div>
