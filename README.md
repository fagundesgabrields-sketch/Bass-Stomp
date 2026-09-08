# ⚡ Bass Stomp — Pro Bass Rigs & Tone

<div align="center">

<img src="assets/images/logo.png" alt="Bass Stomp Logo" width="160" />

### Soluções Profissionais de Timbre para Baixistas
**99 Packs de Presets Digitais & Hardware Analógico de Alta Precisão**  
*Desenvolvido por Sergio Rodrigues*

[![Licença](https://img.shields.io/badge/license-MIT-3E6C9E.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-3E6C9E?style=for-the-badge&logo=w3c&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

[Visitar a Loja](#-páginas-da-plataforma) • [Hardware Alpha Preamp](#-hardware-em-destaque-alpha-bass-preamp) • [Design System](#-design-system--identidade-visual-herança-svt) • [Como Rodar](#-como-executar-o-projeto-localmente) • [Estrutura](#-estrutura-do-repositório)

---

</div>

## 📌 Sobre a Bass Stomp

A **Bass Stomp** é uma marca brasileira independente de engenharia de áudio e timbragem voltada exclusivamente para baixistas de palco, igreja (*worship*) e estúdio. 

Fundada pelo baixista e produtor **Sergio Rodrigues**, a marca nasceu para resolver a principal dor de quem toca ao vivo ou grava em home studio: **a perda de horas quebrando a cabeça na programação de pedaleiras digitais sem conseguir um timbre encorpado que assente perfeitamente na mixagem**.

> *"De músico para músico: plugue o cabo, suba o preset e o seu baixo já está pronto para o som, com peso de disco, ataque nos médios e sem embolar no PA."*

### Nossas Linhas de Entrega:
1. **Packs Digitais Profissionais (99 presets catalogados):** Presets otimizados para palcos reais e sistemas de PA/IEM em equipamentos **Line 6** (HX Stomp, Pod Express), **Valeton** (GP-200, GP-200LT, GP-100), **Hotone Ampero** (II Stomp, Mini, One), **Zoom** (B3n, B1 Four, B3, B1on), **Boss** (GT-1B) e plataformas abertas como **NAM (Neural Amp Modeler)**.
2. **Hardware Analógico Próprio:** Pedal **Alpha Bass Preamp**, projeto físico que combina a saturação e o calor harmônico das válvulas Ampeg com a transparência e corte dos prés Aguilar Tone Hammer. Mais de 70 unidades produzidas e vendidas artesanalmente no Brasil.

---

## 🚀 Funcionalidades da Plataforma Web

A plataforma web da Bass Stomp foi concebida sob o tema **Herança SVT**, inspirando-se nos painéis de rack Ampeg clássicos, tolex texturizado e hardware analógico de estúdio.

- 🎛️ **Catálogo Dinâmico e Reativo:** 99 presets integrados com filtros inteligentes por marca e modelo de pedaleira, busca em tempo real e contagem dinâmica.
- 🛒 **Carrinho de Compras Interativo:** Drawer lateral integrado com persistência no `localStorage`, contagem em tempo real e checkout direto para WhatsApp.
- 🔊 **Tone Tester de Estúdio (A/B Real):** Player de áudio em tempo real construído sobre a **Web Audio API** e arquivos masterizados de estúdio (`assets/audio/alpha-di-bypass.wav` vs `assets/audio/alpha-preamp-on.wav`). Conta com:
  - Chave comutadora **Bypass (DI Limpa)** vs **Alpha Preamp ON**.
  - **VU Meter analógico** com resposta balística real ao sinal.
  - Chave de médios cirúrgica (**250 Hz** para corpo vs **800 Hz** para corte na mix).
- 📄 **Páginas de Produto Otimizadas:** Template dinâmico (`produto.html`) que identifica o produto via URL (`?id=...` ou `?slug=...`), exibe a arte principal com cantos cromados em bracket (L), compatibilidade precisa de hardware e botão de suporte direto com o Sergio Rodrigues.
- 📱 **100% Responsivo:** Experiência consistente em telas desktop, tablets e smartphones, com menu mobile dedicado, drawer tátil e zero quebras.
- ⚡ **Zero Dependências Pesadas:** Desenvolvido puramente em HTML5 semântico, CSS3 com design tokens e JavaScript vanilla ES6+.

---

## 🧭 Páginas da Plataforma

| Página | Arquivo | Descrição |
|---|---|---|
| **Página Inicial** | [`index.html`](file:///Users/gabriel.fagundes/bass-stomp/index.html) | Hero promocional, rack interativo do Alpha Bass Preamp com teste de áudio A/B real, carrossel de pedaleiras compatíveis, vitrine de presets, vídeos do canal do Sergio Rodrigues e FAQ. |
| **Loja Completa** | [`loja.html`](file:///Users/gabriel.fagundes/bass-stomp/loja.html) | Catálogo com os 99 presets, barra de busca instantânea, seletor de pedaleiras e contadores de produto por modelo. |
| **Detalhe de Produto** | [`produto.html`](file:///Users/gabriel.fagundes/bass-stomp/produto.html) | Foto principal emoldurada com cantos cromados em bracket (L), compatibilidade associada à pedaleira correta, linha de confiança padronizada e canal de suporte técnico. |
| **Contato & Suporte** | [`contato.html`](file:///Users/gabriel.fagundes/bass-stomp/contato.html) | Central de atendimento com links diretos para o WhatsApp de suporte, formulário e tira-dúvidas. |
| **Guia de Identidade** | [`identidade/design-guide.md`](file:///Users/gabriel.fagundes/bass-stomp/identidade/design-guide.md) | Especificação completa de design system, tokens, paleta de cores, tipografia e diretrizes da marca. |

---

## 🎛️ Hardware em Destaque: Alpha Bass Preamp

O **Alpha Bass Preamp** é o pedal analógico classe A carro-chefe da Bass Stomp:

- **Conceito Sonoro:** O peso encorpado e o calor valvulado do clássico **Ampeg SVT** combinado à articulação e ataque cirúrgico do **Aguilar Tone Hammer**.
- **Controles Físicos:**
  - `GAIN`: Entrada de sinal com saturação analógica orgânica progressiva.
  - `TONE / EQ`: Graves profundos sem embolar e agudos aveludados.
  - `MID SHIFT`: Chave seletora nos pontos críticos do baixo elétrico (**250 Hz** para reforço de corpo fundamental vs **800 Hz** para morder e cortar a mix de banda).
  - `LEVEL`: Volume de saída com altíssimo headroom para excitar amplificadores ou mesas de som.
- **Conectividade:** Saída direta balanceada XLR (Direct Box ativo integrado) e saída P10 (1/4") desbalanceada.
- **Construção:** Gabinete de metal reforçado para estrada, parafusos industriais, cantos cromados de proteção e acionamento True Bypass silencioso.

---

## 🎨 Design System & Identidade Visual: Herança SVT

O design é ancorado na estética vintage e industrial dos equipamentos de baixo de alta linhagem:

### Paleta de Cores Oficial

```css
:root {
  /* Tolex e Superfícies Escuras */
  --tolex:          #19181A; /* Superfície principal com textura sutil */
  --tolex-dark:     #111012; /* Fundos profundos e contrastantes */
  --tolex-elevated: #212024; /* Cards, racks e painéis elevados */
  --tolex-border:   #2E2C33; /* Bordas e divisores estruturais */

  /* Placa de Rack Ampeg SVT */
  --panel-blue:       #3E6C9E; /* Azul clássico de painel SVT (acento principal) */
  --panel-blue-light: #5283B8; /* Variação ativa, foco e destaques interativos */
  --panel-blue-hover: #335984; /* Estado de hover em botões primários */

  /* Ferragens e Metais */
  --chrome:        #C8CBCE; /* Cantos cromados em bracket L, parafusos e aros */
  --chrome-bright: #E4E7EA; /* Brilho de metal escovado e reflexos */
  --chrome-border: rgba(200, 203, 206, 0.35);

  /* Tipografia e Serigrafia */
  --knob-cream:      #E4E2DD; /* Texto primário e marcações serigrafadas */
  --knob-cream-dim:  #9C9A94; /* Textos secundários, legendas e metadados */

  /* Sinalização e Status */
  --pilot-red:       #E53935; /* LED de ativação, modo bypass desativado e alertas */
  --pilot-red-glow:  rgba(229, 57, 53, 0.4);
}
```

### Tipografia Oficial
- **Títulos e Destaques:** `'Epilogue', sans-serif` (pesos 700 a 900) — robusta, imponente e geométrica.
- **Corpo e Textos:** `'Work Sans', sans-serif` (pesos 400 a 600) — excelente legibilidade e visual limpo para leitura técnica.
- **Specs Técnicas, Presets e Knobs:** `'Space Mono', monospace` (pesos 400 e 700) — valores de parâmetros, códigos de pedaleira e preços.

---

## 📂 Estrutura do Repositório

```text
bass-stomp/
├── assets/
│   ├── audio/                        # Masters de áudio reais de estúdio para teste A/B
│   │   ├── alpha-di-bypass.wav       # Sinal direto do baixo sem pré (Bypass)
│   │   └── alpha-preamp-on.wav       # Sinal do baixo processado pelo Alpha Bass Preamp
│   ├── css/
│   │   └── style.css                 # Folha de estilos consolidada (Tema Herança SVT)
│   ├── images/
│   │   ├── pedaleiras/               # Fotos oficiais das pedaleiras compatíveis
│   │   ├── products/                 # Capas dos 99 packs de presets
│   │   ├── youtube/                  # Thumbnails dos vídeos de demonstração
│   │   ├── alpha-preamp-hero.png     # Render do hardware Alpha Bass Preamp
│   │   └── logo.png                  # Selo oficial da Bass Stomp
│   └── js/
│       ├── main.js                   # Lógica da loja, filtros, carrinho e Tone Tester Web Audio
│       └── products-data.js          # Base de dados estruturada dos 99 presets
├── dados/                            # Dados estruturados em JSON
│   ├── pedaleiras.json               # Metadados de todas as pedaleiras
│   └── todos_produtos.json           # Catálogo integral de 99 produtos
├── identidade/
│   ├── bass-stomp-identidade.html    # Styleguide interativo
│   └── design-guide.md               # Especificação formal de design e diretrizes
├── produtos/                         # Fichas técnicas e documentações dos produtos
│   └── README.md
├── scripts/                          # Automações de dados e build em Python
│   ├── download_assets.py            # Utilitário de sincronização de imagens
│   ├── prerender.py                  # Pré-renderizador estático do catálogo da loja
│   └── README.md
├── _memoria/                         # Contexto do negócio e preferências
│   ├── empresa.md
│   ├── estrategia.md
│   └── preferencias.md
├── CLAUDE.md                         # Diretrizes operacionais para assistentes de IA
├── contato.html                      # Página de atendimento e suporte
├── index.html                        # Página inicial / Landing Page com Tone Tester
├── loja.html                         # Catálogo completo com 99 presets e filtros
├── produto.html                      # Página dinâmica de produto individual
└── README.md                         # Documentação oficial do projeto
```

---

## 🛠️ Como Executar o Projeto Localmente

Por se tratar de uma aplicação web estática de alta performance, **não é necessário compilar, transpilar ou instalar pacotes pesados**.

### Opção 1: Usando Python 3 (Recomendado)
```bash
# Clone o repositório
git clone https://github.com/fagundesgabrields-sketch/Bass-Stomp.git
cd Bass-Stomp

# Inicie o servidor local na porta 8000
python3 -m http.server 8000
```
Acesse no seu navegador: **`http://localhost:8000`**

---

### Opção 2: Usando Node.js (`npx serve`)
```bash
npx serve .
```

---

### Opção 3: Extensão Live Server (VS Code)
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione **"Open with Live Server"**.

---

## 🤖 Automações & Scripts

1. **Pré-renderização de HTML (`scripts/prerender.py`):**
   Atualiza a marcação estática dos cards de pedaleiras e contadores em `loja.html` diretamente a partir das bases JSON em `dados/`.
   ```bash
   python3 scripts/prerender.py
   ```

2. **Download de Assets (`scripts/download_assets.py`):**
   Baixa e sincroniza todas as imagens de produtos, pedaleiras e mídias para armazenamento local.
   ```bash
   python3 scripts/download_assets.py
   ```

---

## 💬 Contato & Canais Oficiais

- **Fundador & Desenvolvedor de Timbres:** Sergio Rodrigues
- **YouTube Oficial:** [@Sergio.Rodrix](https://www.youtube.com/@Sergio.Rodrix)
- **Instagram Oficial:** [@bass.stomphx](https://www.instagram.com/bass.stomphx/)
- **Repositório GitHub:** [github.com/fagundesgabrields-sketch/Bass-Stomp](https://github.com/fagundesgabrields-sketch/Bass-Stomp)
- **Suporte Técnico:** Envio imediato dos links digitais por e-mail e suporte via WhatsApp direto com o Sergio.

---

<div align="center">
  <sub>Bass Stomp © 2026. Todos os direitos reservados. Feito com precisão de timbre para quem faz o grave acontecer.</sub>
</div>
