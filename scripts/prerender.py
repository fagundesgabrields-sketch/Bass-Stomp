import json
import re

with open("dados/pedaleiras.json") as f:
    pedaleiras = json.load(f)

with open("dados/todos_produtos.json") as f:
    products = json.load(f)

def normalize(s):
    return re.sub(r'[^a-z0-9]', '', (s or '').lower())

# Calculate real counts for each pedal
ped_counts = {}
for ped in pedaleiras:
    norm_ped = normalize(ped["pageName"])
    count = 0
    for p in products:
        norm_cat = normalize(p.get("category_tag", ""))
        norm_name = normalize(p.get("name", ""))
        if "gp200" in norm_ped and ("gp200" in norm_cat or "gp200" in norm_name):
            count += 1
        elif norm_ped in norm_cat or norm_cat in norm_ped or norm_ped in norm_name or norm_name in norm_ped:
            count += 1
    ped_counts[ped["pageName"]] = count

# Build pedaleiras HTML
ped_html = []
for ped in pedaleiras:
    pname = ped["pageName"]
    fname = ped["fileName"]
    cnt = ped_counts.get(pname, 0)
    badge_label = f"{cnt} pack" if cnt == 1 else (f"{cnt} packs" if cnt > 1 else "Em breve")
    ped_html.append(f"""          <div class="pedal-card" data-pedal="{pname}">
            <div class="screw tl"></div><div class="screw tr"></div>
            <div class="pedal-thumb-wrap">
              <img src="assets/images/pedaleiras/{fname}" alt="{pname}" loading="lazy" />
            </div>
            <div class="pedal-name">{pname}</div>
            <div class="pedal-count">{badge_label}</div>
          </div>""")

pedaleiras_block = "\n".join(ped_html)

# Build top products HTML (top 16 best sellers)
prod_html = []
for prod in products[:16]:
    img_url = prod.get("localImage") or "assets/images/hx-stomp-board.png"
    price = prod.get("price", 99.0)
    cmp_price = prod.get("comparePrice")
    is_promo = cmp_price is not None and cmp_price > 0 and cmp_price < price
    display_price = cmp_price if is_promo else price
    old_price = price if is_promo else None
    ribbon = prod.get("ribbon") or ("Promoção" if is_promo else "")
    cat = prod.get("category_tag", "BASS RIG")
    pid = prod.get("id")
    pname = prod.get("name")
    url_slug = prod.get("urlPart") or pid

    ribbon_html = f"""<div class="product-ribbon"><span class="led"></span>{ribbon}</div>""" if ribbon else ""
    old_price_html = f"""<span class="price-old">R$ {old_price:.2f}</span>""".replace(".", ",") if old_price else ""
    current_price_str = f"R$ {display_price:.2f}".replace(".", ",")

    prod_html.append(f"""          <div class="product-card plate" data-id="{pid}">
            <div class="screw tl"></div><div class="screw tr"></div>
            <div class="product-media">
              {ribbon_html}
              <img src="{img_url}" alt="{pname}" loading="lazy" />
              <button class="btn-quick-view" onclick="openQuickView('{pid}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"></path></svg>
                Ficha Técnica
              </button>
            </div>
            <div class="product-body">
              <div class="product-pedal-spec">
                <span>{cat}</span>
                <span class="dot">·</span>
                <span>GAIN / TONE</span>
              </div>
              <h3 class="product-title">
                <a href="produto.html?id={url_slug}">{pname}</a>
              </h3>
              <div class="product-tech-params">
                <span class="tech-tag">IR INCLUSO</span>
                <span class="tech-tag">LINE LEVEL</span>
                <span class="tech-tag">DIRECT PA</span>
              </div>
              <div class="product-footer">
                <div class="price-container">
                  {old_price_html}
                  <span class="price-current">{current_price_str}</span>
                </div>
                <button class="btn-buy-pill" onclick="addToCart('{pid}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  Comprar
                </button>
              </div>
            </div>
          </div>""")

products_block = "\n".join(prod_html)

# Pre-render loja.html
try:
    with open("loja.html") as f:
        loja_content = f.read()

    loja_content = re.sub(
        r'<div id="pedaleiras-grid" class="pedaleiras-grid">.*?</div>\s*</div>\s*</section>',
        f'<div id="pedaleiras-grid" class="pedaleiras-grid">\n{pedaleiras_block}\n        </div>\n      </div>\n    </section>',
        loja_content,
        flags=re.DOTALL
    )

    loja_content = re.sub(
        r'<div id="products-grid" class="products-grid">.*?</div>\s*</div>\s*</section>',
        f'<div id="products-grid" class="products-grid">\n{products_block}\n        </div>\n      </div>\n    </section>',
        loja_content,
        flags=re.DOTALL
    )

    with open("loja.html", "w") as f:
        f.write(loja_content)
    print("Pre-rendered loja.html successfully!")
except Exception as e:
    print("Error pre-rendering loja.html:", e)
