# 📊 Dados & Catálogo — Bass Stomp

Esta pasta contém as bases de dados estruturadas em formato JSON que alimentam a loja, as páginas de produtos e os scripts de automação da **Bass Stomp**.

---

## 📁 Arquivos de Dados

### 1. `dados/pedaleiras.json`
Contém a relação de pedaleiras suportadas pela plataforma:
- Modelos: Line 6 HX Stomp, Line 6 Pod Express, Valeton GP-200 / GP-100, Hotone Ampero (II Stomp, Mini, One), Zoom (B3n, B1 Four, B3, B1on) e plataformas abertas como NAM (Neural Amp Modeler).
- Metadados: nome de exibição (`pageName`), nome de arquivo da imagem local (`fileName`) e URL de origem.

### 2. `dados/todos_produtos.json`
Catálogo integral com todos os **99 presets digitais**:
- `id`: Identificador único do produto no ecossistema.
- `name`: Nome comercial do preset ou pack (ex: *Worship Pack*, *Modern Bass Rig*, etc.).
- `price`: Preço formatado em Reais (BRL).
- `urlPart`: Slug para roteamento de URLs amigáveis na página de produto (`produto.html?slug=...`).
- `category_tag`: Tag indicativa da pedaleira ou família de equipamento.
- `media`: Relação de imagens associadas ao produto.
- `localImage`: Caminho para o asset de imagem local otimizado (`assets/images/products/...`).

---

## 🔄 Relação com o Frontend

Os dados em JSON são utilizados por:
1. **`scripts/prerender.py`:** Gera os cards e contagens estáticas pré-renderizadas de pedaleiras na página [`loja.html`](file:///Users/gabriel.fagundes/bass-stomp/loja.html).
2. **`assets/js/products-data.js`:** Versão empacotada em JavaScript client-side para buscas dinâmicas, filtros instantâneos, carregamento no carrinho e renderização da ficha técnica em [`produto.html`](file:///Users/gabriel.fagundes/bass-stomp/produto.html).
