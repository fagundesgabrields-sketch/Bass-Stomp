# Sergio Rodrigues — Bass Stomp | Diretrizes do Sistema

Sistema operacional e diretrizes do negócio **Bass Stomp**, fundado por Sergio Rodrigues. Especialistas em soluções profissionais de timbre para baixistas (catálogo de 99 presets para pedaleiras digitais e hardware de áudio analógico de precisão).

---

## 📌 Contexto do Negócio

No início de qualquer sessão ou tarefa no repositório, consulte os seguintes arquivos para alinhamento:

1. `_memoria/empresa.md` — quem é a Bass Stomp, produtos (99 presets + Alpha Preamp), canais oficiais e perfil
2. `_memoria/preferencias.md` — tom de voz (de músico para músico), vocabulário e proibições de estilo
3. `_memoria/estrategia.md` — prioridades atuais e metas

Para qualquer tarefa visual ou de interface (HTML, CSS, componentes), consultar obrigatoriamente:
- `identidade/design-guide.md` — tokens oficiais do tema **Herança SVT**, paleta Ampeg, cantos cromados e tipografia
- `assets/css/style.css` — implementação centralizada de estilos e componentes

---

## 🏛️ Estrutura do Projeto

- `assets/` — Recursos visuais, sonoros e lógicos da loja:
  - `audio/` — Masters de estúdio em `.wav` para o Tone Tester (`alpha-di-bypass.wav` vs `alpha-preamp-on.wav`)
  - `css/` — Estilos consolidados sob o design system Herança SVT (`style.css`)
  - `images/` — Imagens locais de pedaleiras, capas de produtos, fotos do Alpha e logos
  - `js/` — Lógica do carrinho, catálogo de 99 presets e Web Audio API
- `dados/` — Bases estruturadas em JSON (`todos_produtos.json`, `pedaleiras.json`)
- `identidade/` — Diretrizes visuais e especificações de marca (`design-guide.md`)
- `produtos/` — Fichas técnicas e documentações dos produtos
- `scripts/` — Automações em Python (`prerender.py`, `download_assets.py`)
- `_memoria/` — Registros contínuos de estratégia, empresa e preferências
- `index.html` — Landing page com rack do Alpha Bass Preamp e Tone Tester A/B real
- `loja.html` — Catálogo completo com 99 presets e filtros por pedaleira
- `produto.html` — Ficha dinâmica de produto individual com foto emoldurada em cantos cromados
- `contato.html` — Central de atendimento e suporte via WhatsApp
- `README.md` — Apresentação oficial e documentação do repositório

---

## 🎛️ Nossos Produtos e Entregas

1. **Catálogo de 99 Packs Digitais:**
   - Compatibilidade: Line 6 HX Stomp, Line 6 Pod Express, Valeton GP-200/GP-100, Hotone Ampero (II Stomp/Mini/One), Zoom B3n/B1 Four e NAM (Neural Amp Modeler).
   - Foco em timbres equilibrados para gravação e palco (worship, moderno, drive e sub bass).
2. **Hardware Analógico Alpha Bass Preamp:**
   - Pré-amplificador analógico Classe A combinando circuito estilo Ampeg SVT com a articulação do Aguilar Tone Hammer.
   - Recursos: DI balanceada XLR, Direct Out P10, controle de ganho orgânico e chave de médios 250Hz / 800Hz.
3. **Plataforma Web Herança SVT:**
   - Experiência fluida, moderna e sem dependências pesadas.
   - Tone Tester em `.wav` de estúdio na página inicial.
   - Sem poluição sonora em páginas de produto individuais.
   - Suporte técnico direto via WhatsApp com o Sergio.

---

## 🗣️ Tom de Voz e Regras

- **Tom:** De baixista para baixista. Direto, autêntico, experiente e sem arrogância.
- **Identidade Visual:** Exclusivamente **Herança SVT** (tolex escuro, painéis azuis Ampeg, ferragens cromadas e serigrafia vintage creme). Proibido reintroduzir paletas antigas ou laranjas.
- **PROIBIDO:**
  - Sensacionalismo de marketing ou promessas milagrosas.
  - Formalismo burocrático engravatado.
  - Sequências de emojis apelativos de dropshipping (🔥🚀💥🤑).
  - Prévia de áudio em páginas de produtos (reservado exclusivamente para a home).
  - Mais de uma foto por produto na página individual de preset.
  - Incompatibilidade de pedaleira diferente do preset selecionado.

---

## 🌐 Canais Oficiais

- **YouTube:** [@Sergio.Rodrix](https://www.youtube.com/@Sergio.Rodrix)
- **Instagram:** [@bass.stomphx](https://www.instagram.com/bass.stomphx/)
- **GitHub:** [fagundesgabrields-sketch/Bass-Stomp](https://github.com/fagundesgabrields-sketch/Bass-Stomp)
