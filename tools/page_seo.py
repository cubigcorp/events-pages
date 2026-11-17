#!/usr/bin/env python3
"""행사 상세 페이지 검색용 정보 넣기 (표준 라이브러리만 사용).

페이지마다 <head> 안에 두 가지를 넣거나 최신으로 바꿉니다. 다른 줄은 건드리지 않습니다.
  1) schema.org Event + BreadcrumbList JSON-LD (<script type="application/ld+json" id="ev-jsonld">)
     값은 events.json + 그 페이지의 canonical·meta description·첫 대표 사진에서 가져옵니다.
     공홈 허브 /events JSON-LD(CollectionPage > ItemList > Event)와 같은 값·형식입니다.
  2) hreflang x-default(영문판) 한 줄

사용법:
  python3 tools/page_seo.py            events.json에 있는 행사 페이지 전부(영·한)
  python3 tools/page_seo.py <폴더이름>  그 행사만
  python3 tools/page_seo.py --check     바꾸지 않고 다른 곳만 출력(check_pages.py가 씀)

events.json·페이지 설명·대표 사진을 바꾼 뒤에 다시 돌리면 됩니다. make_basic_pages.py는 새 페이지를 만들 때 자동으로 돌립니다.
"""
import html as htmllib
import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://events.cubig.ai/"
ORG = {"@type": "Organization", "@id": "https://cubig.ai/#organization", "name": "CUBIG", "url": "https://cubig.ai/"}
LD_RE = re.compile(r'\n?<script type="application/ld\+json" id="ev-jsonld">[\s\S]*?</script>')
SCHEMA = "https://schema.org/"


def load_events():
    data = json.loads((ROOT / "events.json").read_text(encoding="utf-8"))
    return [e for e in data.get("events", []) if e.get("page")]


def meta(h, attr, name):
    m = re.search(r'<meta %s="%s" content="([^"]*)"' % (attr, re.escape(name)), h)
    return htmllib.unescape(m.group(1)) if m else ""


def link_href(h, rel_hreflang):
    m = re.search(r'<link rel="%s" href="([^"]*)"' % rel_hreflang, h)
    return m.group(1) if m else ""


def hero_image(h, page_path):
    """<main> 안 첫 사진(svg 제외) → 절대주소. 없으면 og:image."""
    body = re.sub(r"<!--[\s\S]*?-->", "", h)
    m = re.search(r"<main[\s\S]*", body)
    for src in re.findall(r'<img\b[^>]*?\bsrc="([^"]+)"', m.group(0) if m else ""):
        if src.split("?")[0].lower().endswith(".svg"):
            continue
        if src.startswith("http"):
            return src
        if src.startswith("/"):
            return SITE + src.lstrip("/")
        return SITE + (page_path.parent / src).resolve().relative_to(ROOT).as_posix()
    return meta(h, "property", "og:image")


def venue(e):
    """place 칸에서 도시를 뺀 실제 장소 이름(예 'Las Vegas, The Venetian Expo' → 'The Venetian Expo'). 없으면 도시."""
    city = e.get("city") or ""
    parts = [p.strip() for p in (e.get("place") or "").split(",") if p.strip()]
    rest = [p for p in parts if p != city]
    return ", ".join(rest) if rest and len(parts) > 1 else (city or (parts[0] if parts else ""))


def location(e):
    if e.get("type") == "live":
        url = e.get("video") or e.get("src") or ""
        return {"@type": "VirtualLocation", "url": url} if url else None
    city, cc = e.get("city") or "", e.get("cc") or ""
    addr = {"@type": "PostalAddress"}
    if city and not (not cc and len(city) <= 3):  # 'US'처럼 나라만 적힌 경우는 도시로 쓰지 않음
        addr["addressLocality"] = city
    if cc or (city and len(city) <= 3):
        addr["addressCountry"] = cc or city
    return {"@type": "Place", "name": venue(e) or city, "address": addr}


def build(e, h, page_path, ko):
    url = link_href(h, "canonical")
    name = (e.get("title_ko") if ko else None) or e.get("title")
    hub = "https://cubig.ai/" + ("ko/" if ko else "") + "events/"
    live = e.get("type") == "live"
    ev = {
        "@type": "Event",
        "@id": url + "#event",
        "name": name,
        "startDate": e.get("start"),
        "endDate": e.get("end") or e.get("start"),
        "eventAttendanceMode": SCHEMA + ("OnlineEventAttendanceMode" if live else "OfflineEventAttendanceMode"),
        "eventStatus": SCHEMA + "EventScheduled",
    }
    loc = location(e)
    if loc:
        ev["location"] = loc
    img = hero_image(h, page_path)
    if img:
        ev["image"] = img
    ev.update({
        "description": meta(h, "name", "description"),
        "url": url,
        "inLanguage": "ko" if ko else "en",
        "performer": ORG,
    })
    if e.get("organizer"):  # 행사 주최자(확인된 것만 events.json에 적음)
        org = {"@type": "Organization", "name": e["organizer"]}
        if e.get("organizer_url"):
            org["url"] = e["organizer_url"]
        ev["organizer"] = org
    crumbs = {
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "CUBIG 행사" if ko else "CUBIG Events", "item": hub},
            {"@type": "ListItem", "position": 2, "name": name, "item": url},
        ],
    }
    return {"@context": "https://schema.org", "@graph": [ev, crumbs]}


def render(ld):
    s = json.dumps(ld, ensure_ascii=False, indent=1)
    return '<script type="application/ld+json" id="ev-jsonld">\n' + s.replace("</", "<\\/") + "\n</script>"


def apply(h, e, page_path, ko):
    """고친 HTML을 돌려줌. JSON-LD는 </head> 바로 앞, x-default는 hreflang ko 줄 다음."""
    out = LD_RE.sub("", h)
    out = out.replace("</head>", render(build(e, out, page_path, ko)) + "\n</head>", 1)
    if 'hreflang="x-default"' not in out:
        en = link_href(out, 'alternate" hreflang="en')
        out = re.sub(r'(<link rel="alternate" hreflang="ko" href="[^"]*">)',
                     lambda m: m.group(1) + f'\n<link rel="alternate" hreflang="x-default" href="{en}">', out, count=1)
    return out


def pages(events, only=None):
    for e in events:
        if only and e["id"] not in only and e["page"].split("/")[0] not in only:
            continue
        for ko in (False, True):
            p = ROOT / ("ko" if ko else "") / e["page"]
            if p.exists():
                yield e, p, ko


def main():
    args = [a for a in sys.argv[1:] if not a.startswith("--")]
    check = "--check" in sys.argv
    changed = []
    for e, p, ko in pages(load_events(), set(args) or None):
        h = p.read_text(encoding="utf-8")
        new = apply(h, e, p, ko)
        if new != h:
            changed.append(p.relative_to(ROOT).as_posix())
            if not check:
                p.write_text(new, encoding="utf-8")
    print(("최신이 아닌 페이지: " if check else "고친 페이지: ") + (str(len(changed)) if changed else "없음"))
    for c in changed:
        print("  " + c)
    return 1 if (check and changed) else 0


if __name__ == "__main__":
    sys.exit(main())
