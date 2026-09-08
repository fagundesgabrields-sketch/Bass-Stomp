# 🛠️ Scripts & Utilitários — Bass Stomp

Esta pasta contém os utilitários e automações em Python desenvolvidos para manutenção, extração de dados e pré-renderização estática da plataforma **Bass Stomp**.

---

## 📋 Lista de Scripts

| Script | Linguagem | Finalidade |
|---|---|---|
| [`prerender.py`](file:///Users/gabriel.fagundes/bass-stomp/scripts/prerender.py) | Python 3 | Pré-renderiza a marcação HTML dos cards de pedaleiras e contagens na página `loja.html` a partir dos dados em `dados/todos_produtos.json` e `dados/pedaleiras.json`. |
| [`download_assets.py`](file:///Users/gabriel.fagundes/bass-stomp/scripts/download_assets.py) | Python 3 | Faz o download e organização local das imagens oficiais dos produtos, fotos das pedaleiras, thumbnails do YouTube e artes do Alpha Preamp. |

---

## ⚙️ Detalhamento dos Scripts

### 1. `scripts/prerender.py`

Garante que o catálogo da loja (`loja.html`) possua renderização estática server-side / build-time dos filtros de pedaleira e das contagens reais de presets.

- **Fonte de dados:**
  - `dados/pedaleiras.json` — Lista de pedaleiras suportadas (Line 6 HX Stomp, Boss GT-1B, Valeton GP-200, Ampero II Stomp, Zoom B3n, Pod Express, NAM, etc.).
  - `dados/todos_produtos.json` — Catálogo consolidado com os 99 presets.
- **Lógica de Normalização:**
  Aplica regras estritas de correspondência (`pedal_matches_product`) para evitar colisões entre modelos similares (ex: Zoom B3 vs B3n, Zoom B1on vs B1 Four, Ampero Mini vs Ampero II Stomp vs Ampero One).
- **Como executar:**
  ```bash
  python3 scripts/prerender.py
  ```

---

### 2. `scripts/download_assets.py`

Sincroniza os assets gráficos da nuvem para as pastas locais do projeto (`assets/images/pedaleiras/`, `assets/images/products/`, `assets/images/youtube/`), garantindo que a loja funcione 100% offline e sem dependência de CDNs externas sujeitas a instabilidades de rede.

- **Como executar:**
  ```bash
  python3 scripts/download_assets.py
  ```

---

## 🐍 Requisitos

- **Python 3.8+** instalado.
- Utiliza apenas bibliotecas padrão da biblioteca padrão do Python (`json`, `urllib.request`, `ssl`, `os`, `re`), dispensando a instalação de pacotes externos via `pip`.
