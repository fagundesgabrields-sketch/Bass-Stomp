import urllib.request
import ssl
import json
import os

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

os.makedirs("assets/images/pedaleiras", exist_ok=True)
os.makedirs("assets/images/products", exist_ok=True)
os.makedirs("assets/images/youtube", exist_ok=True)

# 1. Base images
base_downloads = [
    ("assets/images/logo.png", "https://static.wixstatic.com/media/ca2ebc_fd1354c8ccd24606bfbe40be9b2f7e12~mv2.png/v1/fill/w_400,h_400,q_90/logo.png"),
    ("assets/images/sergio-rodrigues.jpg", "https://static.wixstatic.com/media/ca2ebc_0aee3a014e394c9bb5f49d91b91cb83d~mv2.jpg/v1/fill/w_800,h_800,q_85/sergio.jpg"),
    ("assets/images/alpha-preamp-hero.png", "https://static.wixstatic.com/media/ca2ebc_2719dc6f42c94a89ac1d583e80485f9f~mv2.png/v1/fill/w_900,h_500,q_85/alpha_hero.png"),
    ("assets/images/alpha-preamp.jpg", "https://static.wixstatic.com/media/ca2ebc_2f9ef6bc96c244ef9cbc6f336f5b95f2~mv2.jpg/v1/fill/w_800,h_800,q_85/alpha_pedal.jpg"),
    ("assets/images/hx-stomp-board.png", "https://static.wixstatic.com/media/ca2ebc_c556ecb3e1e849bb83e2ca0abee112a7~mv2.png/v1/fill/w_900,h_500,q_85/hx_board.png"),
]

for dest, url in base_downloads:
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with open(dest, "wb") as f:
            f.write(urllib.request.urlopen(req, context=ctx).read())
        print(f"Downloaded {dest}")
    except Exception as e:
        print(f"Failed {dest}: {e}")

# 2. Pedaleiras
with open("dados/pedaleiras.json") as f:
    pedaleiras = json.load(f)

for ped in pedaleiras:
    fname = ped["fileName"]
    dest = f"assets/images/pedaleiras/{fname}"
    try:
        req = urllib.request.Request(ped["fullUrl"], headers={"User-Agent": "Mozilla/5.0"})
        with open(dest, "wb") as f:
            f.write(urllib.request.urlopen(req, context=ctx).read())
        print(f"Downloaded {dest}")
    except Exception as e:
        print(f"Failed {dest}: {e}")

# 3. Products
with open("dados/todos_produtos.json") as f:
    products = json.load(f)

count = 0
for p in products:
    media_list = p.get("media", [])
    if media_list and len(media_list) > 0:
        first = media_list[0]
        url = first.get("fullUrl")
        slug = p.get("urlPart") or p.get("id")
        ext = ".png" if "png" in url.lower() else ".jpg"
        dest = f"assets/images/products/{slug}{ext}"
        p["localImage"] = dest
        if not os.path.exists(dest):
            try:
                req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
                with open(dest, "wb") as f:
                    f.write(urllib.request.urlopen(req, context=ctx).read())
                count += 1
            except Exception as e:
                pass

with open("dados/todos_produtos.json", "w") as f:
    json.dump(products, f, indent=2, ensure_ascii=False)
print(f"Downloaded {count} product images and updated dados/todos_produtos.json!")

# 4. YouTube thumbnails
yt_ids = [
    ("H7FP_Y70MmI", "Pedal de Drive para contrabaixo"),
    ("iDBqOVcPe5I", "Se tivessem me falado isso no início..."),
    ("Dabys9bbAVw", "Nova Boss GX-1B | Presets Worship"),
    ("ozHoVf_xX8I", "Alpha Preamp vs Aguilar Tone Hammer"),
    ("msdXbvlFR44", "Alpha Preamp | Review"),
    ("854BqpoY3uk", "Bastidores do Teste | Alpha Preamp"),
    ("gQJq3nuBn2E", "Demonstração Alpha Bass Stomp"),
    ("csNFv8Us23U", "Alpha Pré Amp | Demonstração em vídeo")
]

yt_meta = []
for yid, title in yt_ids:
    url = f"https://i.ytimg.com/vi/{yid}/hqdefault.jpg"
    dest = f"assets/images/youtube/{yid}.jpg"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with open(dest, "wb") as f:
            f.write(urllib.request.urlopen(req, context=ctx).read())
        print(f"Downloaded {dest}")
    except Exception as e:
        print(f"Failed {dest}: {e}")
    yt_meta.append({
        "id": yid,
        "title": title,
        "thumbnail": dest,
        "url": f"https://www.youtube.com/watch?v={yid}"
    })

with open("dados/youtube_videos.json", "w") as f:
    json.dump(yt_meta, f, indent=2, ensure_ascii=False)
print("Saved dados/youtube_videos.json successfully!")
