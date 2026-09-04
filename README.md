# ⚡ Bass Stomp — Pro Bass Rigs & Tone

<div align="center">

<img src="assets/images/logo.png" alt="Bass Stomp Logo" width="160" />

### Soluções Profissionais de Timbre para Baixistas
**Packs de Presets Digitais & Hardware Analógico de Alta Precisão**  
*Desenvolvido por Sergio Rodrigues*

[![Licença](https://img.shields.io/badge/license-MIT-FF5A22.svg?style=for-the-badge)](LICENSE)
[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio%20API-4A90E2?style=for-the-badge&logo=w3c&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)
[![Python](https://img.shields.io/badge/Python-3.10+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)

[Visitar a Loja](#-páginas-da-plataforma) • [Hardware Alpha Preamp](#-hardware-em-destaque-alpha-bass-preamp) • [Design System](#-design-system--identidade-visual) • [Como Rodar](#-como-executar-o-projeto-localmente) • [Estrutura](#-estrutura-do-repositório)

---

</div>

## 📌 Sobre a Bass Stomp

A **Bass Stomp** é uma marca brasileira independente de engenharia de áudio e timbragem voltada exclusivamente para baixistas de palco, igreja (*worship*) e estúdio. 

Fundada pelo baixista e produtor **Sergio Rodrigues**, a marca nasceu para resolver a principal dor de quem toca ao vivo ou grava em home studio: **a perda de horas quebrando a cabeça na programação de pedaleiras digitais sem conseguir um timbre encorpado que assente perfeitamente na mixagem**.

> *"De músico para músico: plugue o cabo, suba o preset e o seu baixo já está pronto para o som, com peso de disco, ataque nos médios e sem embolar no PA."*

### Nossas Linhas de Entrega:
1. **Packs Digitais Profissionais (60+ opções):** Presets otimizados para palcos reais e sistemas de PA/IEM em equipamentos **Line 6 HX Stomp**, **Boss** (GT-1B, GX-1B), **Hotone Ampero** (II Stomp, Mini, One), **Valeton** (GP-100, GP-200, GP-200LT) e **Zoom** (B1 Four, B3n).
2. **Hardware Analógico Próprio:** Pedal **Alpha Bass Preamp**, projeto físico que combina a pegada encorpada das válvulas Ampeg com a definição dos prés Aguilar Tone Hammer. Mais de 70 unidades produzidas e vendidas artesanalmente no Brasil.

---

## 🚀 Funcionalidades da Plataforma Web

A loja da Bass Stomp foi concebida como uma aplicação web moderna, ultra rápida, sem dependências pesadas e inspirada no visual tátil de pedais analógicos e pedalboards.

- 🎛️ **Catálogo Dinâmico e Reativo:** Mais de 60 presets catalogados com filtros instantâneos por marca/modelo de pedaleira, busca em tempo real com debounce e ordenação flexível.
- 🛒 **Carrinho de Compras Interativo:** Drawer lateral integrado com persistência de itens no `localStorage`, cálculo de totais em tempo real e checkout facilitado direto para o WhatsApp.
- 🔊 **Simulador de Timbre / Tone Tester:** Demonstração interativa construída com a **Web Audio API** nativa do navegador, permitindo testar frequências e cortes de médios (250Hz vs 800Hz) em tempo real com modo *Bypass*.
- 📄 **Páginas de Produto Dinâmicas:** Template único (`produto.html`) que lê a base de dados via parâmetros de URL (`?id=...` ou `?slug=...`) e renderiza galeria de imagens, ficha técnica, cadeia de blocos de efeitos e recomendações de presets similares.
- 📱 **100% Responsivo e Otimizado:** Experiência consistente em desktops, tablets e smartphones, com menu mobile dedicado, drawer tátil e suporte a gestos.
- ⚡ **Zero Bloatware:** Sem frameworks pesados; apenas HTML5 semântico, CSS3 com variáveis nativas e JavaScript ES6+.

---

## 🧭 Páginas da Plataforma

| Página | Arquivo | Descrição |
|---|---|---|
| **Página Inicial** | [`index.html`](file:///Users/gabriel.fagundes/bass-stomp/index.html) | Landing page completa com Hero promocional, vitrine do pedal Alpha Bass Preamp, carrossel de pedaleiras compatíveis, packs mais vendidos, simulador de timbre, vídeos demonstrativos do YouTube e FAQ. |
| **Loja Completa** | [`loja.html`](file:///Users/gabriel.fagundes/bass-stomp/loja.html) | Catálogo integral com barra de busca inteligente, seletor de pedaleiras, contagem em tempo real de produtos, badges de novidades e promoções. |
| **Detalhe de Produto** | [`produto.html`](file:///Users/gabriel.fagundes/bass-stomp/produto.html) | Ficha técnica detalhada do preset, galeria de mídia em alta resolução, cadeia de efeitos simulada, requisitos da pedaleira e checkout imediato. |
| **Contato & Suporte** | [`contato.html`](file:///Users/gabriel.fagundes/bass-stomp/contato.html) | Central de atendimento direto no WhatsApp, formulário de suporte, informações de entrega digital e políticas de garantia. |
| **Guia de Identidade** | [`identidade/bass-stomp-identidade.html`](file:///Users/gabriel.fagundes/bass-stomp/identidade/bass-stomp-identidade.html) | Styleguide interativo da marca: paleta de cores clicável, tipografia, parafusos industriais, footswitches e knobs analógicos. |

---

## 🎛️ Hardware em Destaque: Alpha Bass Preamp

O **Alpha Bass Preamp** é o pedal analógico carro-chefe da Bass Stomp:

- **Conceito Sonoro:** O calor harmônico e o punch dos clássicos circuitos valvulados **Ampeg** aliado à transparência e ataque orgânico do **Aguilar Tone Hammer**.
- **Controles Físicos:**
  - `GAIN`: Controle de entrada dinâmico com saturação suave progressiva.
  - `TONE / EQ`: Graves encorpados e agudos estalados sem aspereza digital.
  - `MID SHIFT`: Chave seletora de médios nos pontos cirúrgicos do contrabaixo (**250 Hz** para corpo encorpado vs **800 Hz** para corte e presença na banda).
  - `LEVEL`: Volume de saída com alto headroom.
- **Conectividade:** Saída direta balanceada XLR (Direct Box ativo embutido com Ground Lift) e saída desbalanceada P10 (1/4") para retorno ou amplificador de palco.
- **Construção:** Caixa de metal reforçada para turnê com parafusos industriais e chave *True Bypass* com LED de alto brilho.

---

## 🎨 Design System & Identidade Visual

O design segue a estética de **placas de hardware de áudio analógico e pedalboards profissionais**, definida no guia [`identidade/design-guide.md`](file:///Users/gabriel.fagundes/bass-stomp/identidade/design-guide.md).

### Paleta de Cores

```css
:root {
  --color-ink:        #131217; /* Fundo principal dark mode padrão */
  --color-bone:       #F2EEE4; /* Fundo claro alternativo / papel vintage */
  --color-paper:      #FBF9F4; /* Fundo de cards sobre Bone */
  --color-orange:     #FF5A22; /* Stomp Orange: acento principal e botões */
  --color-orange-dim: #D6431A; /* Hover do laranja */
  --color-blue:       #26324F; /* Low End Blue: tags e marcações sóbrias */
  --color-yellow:     #F2C230; /* LED Yellow: badges de novidades/alertas */
  --color-line:       rgba(242, 238, 228, 0.15); /* Bordas sutis */
}
```

### Tipografia
- **Títulos e Destaques:** `'Anton', sans-serif` — condensada, imponente e com a mesma força do selo original da marca.
- **Corpo e Textos:** `'IBM Plex Sans', sans-serif` — alta legibilidade para descrições técnicas e blocos informativos.
- **Parâmetros e Specs Técnicas:** `'IBM Plex Mono', monospace` — utilizado em valores de knobs (`GAIN / TONE / LEVEL`), modelos de pedaleira e preços.

---

## 📂 Estrutura do Repositório

```text
bass-stomp/
├── assets/
│   ├── css/
│   │   └── style.css                 # Folha de estilo completa e responsiva
│   ├── images/
│   │   ├── pedaleiras/               # Fotos isoladas das pedaleiras compatíveis
│   │   ├── products/                 # Capas e artes dos packs de presets
│   │   ├── youtube/                  # Thumbnails dos vídeos de demonstração
│   │   ├── alpha-preamp-hero.png     # Render em alta resolução do pedal Alpha
│   │   └── logo.png                  # Selo oficial da Bass Stomp
│   └── js/
│       ├── main.js                   # Lógica da loja, filtros, carrinho e Web Audio
│       └── products-data.js          # Base de dados estruturada de todos os 60+ produtos
├── dados/                            # Dados brutos e schemas de produtos e pedaleiras
│   ├── pedaleiras.json
│   └── todos_produtos.json
├── identidade/
│   ├── bass-stomp-identidade.html    # Styleguide e catálogo de componentes visuais
│   └── design-guide.md               # Especificação formal de design e regras de marca
├── produtos/                         # Fichas técnicas e documentação das pedaleiras
│   └── README.md
├── scripts/
│   ├── download_assets.py            # Automação em Python para sincronização de assets
│   ├── prerender.py                  # Script de pré-renderização estática de HTML
│   └── README.md
├── _memoria/                         # Contexto de negócio, estratégia e tom de voz
│   ├── empresa.md
│   ├── estrategia.md
│   └── preferencias.md
├── .claude/                          # Skills e automações operacionais
├── CLAUDE.md                         # Instruções de orquestração do assistente
├── contato.html                      # Página de atendimento e suporte
├── index.html                        # Página inicial / Landing Page
├── loja.html                         # Catálogo geral de produtos e filtros
├── produto.html                      # Página de produto individual dinâmica
└── README.md                         # Documentação oficial do projeto
```

---

## 🛠️ Como Executar o Projeto Localmente

Como o projeto é construído com tecnologias web estáticas padrão, **não é necessário compilar ou instalar pacotes pesados de frontend**.

### Opção 1: Usando Python (Recomendado)
Se você já possui o Python 3 instalado:

```bash
# Clone o repositório
git clone https://github.com/fagundesgabrields-sketch/Bass-Stomp.git
cd Bass-Stomp

# Inicie o servidor local na porta 8000
python3 -m http.server 8000
```
Acesse no seu navegador: **`http://localhost:8000`**

---

### Opção 2: Usando Node.js / npx
Se preferir o ecossistema Node:

```bash
# Executa um servidor estático leve sem necessidade de instalação prévia
npx serve .
```

---

### Opção 3: Extensão Live Server (VS Code)
1. Abra a pasta do projeto no VS Code.
2. Clique com o botão direito no arquivo `index.html`.
3. Selecione **"Open with Live Server"**.

---

## 🤖 Automações & Scripts

O diretório `scripts/` disponibiliza utilitários em Python para manutenção e automação da plataforma:

1. **Download de Assets (`scripts/download_assets.py`):**
   Baixa e cataloga imagens de produtos, pedaleiras e vídeos do repositório em nuvem para o armazenamento local do projeto.
   ```bash
   python3 scripts/download_assets.py
   ```

2. **Pré-renderização de HTML (`scripts/prerender.py`):**
   Lê a base de dados JSON (`dados/todos_produtos.json` e `dados/pedaleiras.json`) e gera a marcação HTML estática dos cards de pedaleira e produtos mais vendidos direto no `index.html`, garantindo indexação perfeita de SEO antes mesmo do JavaScript carregar.
   ```bash
   python3 scripts/prerender.py
   ```

---

## 💬 Contato & Canais Oficiais

- **Fundador & Desenvolvedor de Timbres:** Sergio Rodrigues
- **Instagram Oficial:** [@bass.stomphx](https://www.instagram.com/bass.stomphx/)
- **Repositório GitHub:** [github.com/fagundesgabrields-sketch/Bass-Stomp](https://github.com/fagundesgabrields-sketch/Bass-Stomp)
- **Suporte Técnico:** Envio imediato dos links digitais via e-mail e canal de suporte via WhatsApp.

---

<div align="center">
  <sub>Bass Stomp © 2026. Todos os direitos reservados. Feito com precisão de timbre para quem faz o grave acontecer.</sub>
</div>
