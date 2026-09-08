import json
import re

with open("dados/pedaleiras.json") as f:
    pedaleiras = json.load(f)

with open("dados/todos_produtos.json") as f:
    products = json.load(f)

def normalize(s):
    return re.sub(r'[^a-z0-9]', '', (s or '').lower())

def pedal_matches_product(pedal_name, p):
    norm_ped = normalize(pedal_name)
    norm_cat = normalize(p.get("category_tag", ""))
    norm_name = normalize(p.get("name", ""))

    if "nam" in norm_ped:
        return "nam" in norm_cat or "nam" in norm_name
    if "nam" in norm_cat and "nam" not in norm_ped:
        return False

    if "podexpress" in norm_ped:
        return "podexpress" in norm_cat or "podexpress" in norm_name

    if "hx" in norm_ped and ("hx" in norm_cat or "hx" in norm_name):
        return True

    if "gp200" in norm_ped and ("gp200" in norm_cat or "gp200" in norm_name):
        return True

    if norm_ped in ("zoomb3", "b3") and ("b3n" in norm_cat or "b3n" in norm_name):
        return False
    if "b3n" in norm_ped and not ("b3n" in norm_cat or "b3n" in norm_name):
        return False

    if "b1four" in norm_ped and ("b1on" in norm_cat or "b1on" in norm_name):
        return False
    if "b1on" in norm_ped and ("b1four" in norm_cat or "b1four" in norm_name):
        return False

    if "amperomini" in norm_ped and not ("amperomini" in norm_cat or "amperomini" in norm_name):
        return False
    if ("ampero2" in norm_ped or "amperoii" in norm_ped) and not any(x in (norm_cat + norm_name) for x in ("ampero2", "amperoii")):
        return False
    if "amperoone" in norm_ped and not ("amperoone" in norm_cat or "amperoone" in norm_name):
        return False

    return norm_ped in norm_cat or norm_cat in norm_ped or norm_ped in norm_name or norm_name in norm_ped

# Calculate real counts for each pedal
ped_counts = {}
for ped in pedaleiras:
    count = sum(1 for p in products if pedal_matches_product(ped["pageName"], p))
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

    prod_html.append(f"""          <div class="product-card plate" data-id="{pid}" onclick="if(!event.target.closest('.btn-buy-pill')) window.location.href='produto.html?id={url_slug}'">
            <div class="screw tl"></div><div class="screw tr"></div>
            <div class="product-media">
              {ribbon_html}
              <a href="produto.html?id={url_slug}" class="product-media-link" aria-label="{pname}">
                <img src="{img_url}" alt="{pname}" loading="lazy" />
              </a>
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
                <button class="btn-buy-pill" onclick="event.stopPropagation(); addToCart('{pid}')">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                  Comprar
                </button>
              </div>
            </div>
          </div>""")

products_block = "\n".join(prod_html)

# Pre-render loja.html
for target_path in ["loja.html"]:
    try:
        with open(target_path) as f:
            content = f.read()

        content = re.sub(
            r'<div id="pedaleiras-grid" class="pedaleiras-grid">.*?</div>\s*</div>\s*</section>',
            f'<div id="pedaleiras-grid" class="pedaleiras-grid">\n{pedaleiras_block}\n        </div>\n      </div>\n    </section>',
            content,
            flags=re.DOTALL
        )

        content = re.sub(
            r'<div id="products-grid" class="products-grid">.*?</div>\s*</div>\s*</section>',
            f'<div id="products-grid" class="products-grid">\n{products_block}\n        </div>\n      </div>\n    </section>',
            content,
            flags=re.DOTALL
        )

        with open(target_path, "w") as f:
            f.write(content)
        print(f"Pre-rendered {target_path} successfully!")
    except Exception as e:
        print(f"Error pre-rendering {target_path}:", e)
