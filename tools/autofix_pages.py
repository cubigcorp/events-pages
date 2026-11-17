#!/usr/bin/env python3
"""PR 자동 정리 — 사람이 어떤 도구로 만든 HTML이든 '머리·공통 틀·측정·데이터 연결'만 맞춥니다 (2026-11-17 현세 승인).

원칙
  - 본문(<main>) 디자인·문구는 건드리지 않습니다. 기본 양식 페이지의 데이터 자리(<!-- ev:… -->)만 예외.
  - 이미 있는 값은 그대로 둡니다(없는 것만 채움). 검색용 JSON-LD·x-default만 events.json 기준으로 다시 씁니다.
  - 고칠 수 없는 것은 check_pages.py 경고·오류로 남겨 PR 댓글에 보입니다.

자동으로 고치는 것 (events.json에 그 행사 줄이 있는 페이지, 영·한)
  1) <head>: canonical · hreflang en/ko · title · description · OG/트위터 · 아이콘이 없으면 채움
  2) GA4 ⑤ 추적 코드 블록이 없으면 넣음 (마케팅팀 관리 블록 그대로)
  3) 공홈 머리글·바닥글 + 버튼 측정 스크립트 연결(cubig-site.css·ev-site.css·cubig-site.js·ev-nav.js)
  4) 검색용 행사 정보 JSON-LD + hreflang x-default (page_seo.py)
  5) 기본 양식 페이지의 부스 위치·현장 기록 자리 (page_blocks.py)
  6) events.json photo가 비면 상세 첫 대표 사진으로, thumb가 없으면 640px webp 작은 사본을 만들어 채움
  7) 검색 노출 페이지가 sitemap.xml에 없으면 추가

사용
  python3 tools/autofix_pages.py               고치고 무엇을 고쳤는지 출력
  python3 tools/autofix_pages.py --dry-run      보기만
  python3 tools/autofix_pages.py --report f.md  고친 목록을 마크다운으로 저장(PR 댓글용)
"""
import argparse
import html as htmllib
import json
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import make_basic_pages  # noqa: E402
import page_blocks  # noqa: E402
import page_seo  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://events.cubig.ai/"
GA = """<!-- ⑤ 추적 코드 (GA4, 마케팅팀 관리 — 직접 수정·삭제하지 마세요) -->
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8MRD9BZ1VJ');
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8MRD9BZ1VJ"></script>"""
ASSETS = [
    ("/assets/site/cubig-site.css", '<link rel="stylesheet" href="/assets/site/cubig-site.css">'),
    ("/assets/site/ev-site.css", '<link rel="stylesheet" href="/assets/site/ev-site.css">'),
    ("/assets/site/cubig-site.js", '<script src="/assets/site/cubig-site.js" defer></script>'),
    ("/assets/ev-nav.js", '<script src="/assets/ev-nav.js" defer></script>'),
]
ICONS = ('<link rel="icon" href="https://cubig.ai/wp-content/themes/cubig/assets/images/logo/favicon.png" media="(prefers-color-scheme: light)">\n'
         '<link rel="icon" href="https://cubig.ai/wp-content/themes/cubig/assets/images/logo/favicon-dark.png" media="(prefers-color-scheme: dark)">')
SUFFIX = ("CUBIG Events", "CUBIG 행사")


def esc(s):
    return htmllib.escape(str(s), quote=True)


def pick(e, k, ko):
    return (e.get(k + "_ko") if ko else None) or e.get(k) or ""


def head_end(h):
    i = h.find("</head>")
    return i if i >= 0 else None


def add_to_head(h, line, before_assets=False):
    """</head> 바로 앞에 한 줄 넣음. before_assets면 첫 스타일시트·스크립트 앞(메타 정보 묶음 쪽)에."""
    i = head_end(h)
    if i is None:
        return h
    if before_assets:
        m = re.search(r'<link rel="stylesheet"|<script', h[:i])
        if m:
            return h[:m.start()] + line + "\n" + h[m.start():]
    return h[:i] + line + "\n" + h[i:]


def fix_head(h, e, rel_page, ko, done):
    head = h[: head_end(h) or 0]
    slug = rel_page.split("/")[0]
    url = SITE + ("ko/" if ko else "") + slug + "/"
    en, kr = SITE + slug + "/", SITE + "ko/" + slug + "/"
    title = pick(e, "title", ko)
    desc = pick(e, "summary", ko)
    if not re.search(r'rel="canonical"', head):
        h = add_to_head(h, f'<link rel="canonical" href="{url}">', True); done.append("canonical")
    if 'hreflang="en"' not in head:
        h = add_to_head(h, f'<link rel="alternate" hreflang="en" href="{en}">', True); done.append("hreflang en")
    if 'hreflang="ko"' not in head and (ROOT / "ko" / rel_page).exists():
        h = add_to_head(h, f'<link rel="alternate" hreflang="ko" href="{kr}">', True); done.append("hreflang ko")
    suffix = " | " + SUFFIX[1 if ko else 0]
    want_title = f"<title>{esc(title)}{suffix}</title>"
    tm = re.search(r"<title>([^<]*)</title>", head)
    if not tm or not htmllib.unescape(tm.group(1)).strip().endswith(suffix):
        # 제목 형식 = '<행사명> | CUBIG Events' / '| CUBIG 행사' (CLAUDE.md §8). 형식이 아니면 events.json 기준으로 다시 씀
        h = re.sub(r"<title>[^<]*</title>\n?", "", h, count=1)
        h = add_to_head(h, want_title, True)
        done.append("title(형식 맞춤)" if tm and tm.group(1).strip() else "title")
    desc = page_seo.augment_desc(e, desc, ko)  # 짧으면 날짜·미팅 문장 보강(사실은 events.json·페이지 버튼만)
    if desc and not re.search(r'<meta name="description"', head):
        h = add_to_head(h, f'<meta name="description" content="{esc(desc)}">', True); done.append("description")
    img = page_seo.hero_image(h, ROOT / ("ko" if ko else "") / rel_page)
    og = [("og:type", "article"), ("og:site_name", "CUBIG"), ("og:title", title), ("og:url", url), ("og:image", img), ("og:description", desc)]
    added = []
    for k, v in og:
        if v and f'property="{k}"' not in head:
            h = add_to_head(h, f'<meta property="{k}" content="{esc(v)}">', True); added.append(k)
    tw = [("twitter:card", "summary_large_image"), ("twitter:title", title), ("twitter:description", desc), ("twitter:image", img)]
    for k, v in tw:
        if v and f'name="{k}"' not in head:
            h = add_to_head(h, f'<meta name="{k}" content="{esc(v)}">', True); added.append(k)
    if added:
        done.append("OG·트위터(" + ", ".join(added) + ")")
    if 'rel="icon"' not in head:
        h = add_to_head(h, ICONS, True); done.append("아이콘")
    if "googletagmanager.com/gtag/js?id=G-8MRD9BZ1VJ" not in head:
        h = add_to_head(h, "\n" + GA + "\n", True); done.append("GA4 ⑤ 추적 코드")
    miss = [tag for src, tag in ASSETS if src not in h[: head_end(h) or 0]]
    for tag in miss:
        h = add_to_head(h, tag)
    if miss:
        done.append("공홈 머리글·바닥글·버튼 측정 연결(" + str(len(miss)) + "줄)")
    return h


def make_thumb(photo_rel):
    """photo(저장소 안 경로) → 같은 폴더 <이름>-thumb.webp (640px, q75). Pillow 없으면 None."""
    try:
        from PIL import Image
    except ImportError:
        return None
    src = ROOT / photo_rel.lstrip("/")
    if not src.exists():
        return None
    dst = src.with_name(src.stem + "-thumb.webp")
    if not dst.exists():
        im = Image.open(src)
        im = im.convert("RGB") if im.mode not in ("RGB", "RGBA") else im
        w, hgt = im.size
        if w > 640:
            im = im.resize((640, round(hgt * 640 / w)), Image.LANCZOS)
        im.save(dst, "WEBP", quality=75)
    return "/" + dst.relative_to(ROOT).as_posix()


def set_event_field(raw, eid, key, value):
    """events.json 글자 그대로 한 칸만 넣거나 바꿈(나머지 줄 모양 유지)."""
    start = raw.index('"id": "%s"' % eid)
    nxt = raw.find('"id": "', start + 1)
    seg_end = nxt if nxt >= 0 else len(raw)
    seg = raw[start:seg_end]
    val = json.dumps(value, ensure_ascii=False)
    m = re.search(r'"%s": "[^"]*"' % key, seg)
    if m:
        seg = seg[: m.start()] + f'"{key}": {val}' + seg[m.end():]
    else:
        seg = seg.replace('"id": "%s",' % eid, '"id": "%s",\n      "%s": %s,' % (eid, key, val), 1)
    return raw[:start] + seg + raw[seg_end:]


def fix_event_data(e, raw, done_all):
    """photo가 비면 상세 대표 사진, thumb가 없으면 작은 사본."""
    page = ROOT / e["page"]
    if not page.exists():
        page = ROOT / "ko" / e["page"]
    if not page.exists():
        return raw
    if not e.get("photo"):
        img = page_seo.hero_image(page.read_text(encoding="utf-8"), page)
        if img.startswith(SITE):
            e["photo"] = "/" + img[len(SITE):]
            raw = set_event_field(raw, e["id"], "photo", e["photo"])
            done_all.append(f"events.json {e['id']}: photo = 상세 대표 사진 {e['photo']}")
    th = e.get("thumb") or ""
    if e.get("photo", "").startswith("/") and (not th or not (ROOT / th.lstrip("/")).exists()):
        new = make_thumb(e["photo"])
        if new:
            e["thumb"] = new
            raw = set_event_field(raw, e["id"], "thumb", new)
            done_all.append(f"events.json {e['id']}: thumb = {new} (640px 작은 사본)")
    return raw


def add_sitemap(urls, done_all):
    p = ROOT / "sitemap.xml"
    s = p.read_text(encoding="utf-8")
    new = [u for u in urls if f"<loc>{u}</loc>" not in s]
    if new:
        add = "".join(f"  <url><loc>{u}</loc></url>\n" for u in new)
        s = s.replace("</urlset>", add + "</urlset>")
        p.write_text(s, encoding="utf-8")
        done_all.append("sitemap.xml: " + ", ".join(new))


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--report")
    a = ap.parse_args()

    ev_path = ROOT / "events.json"
    raw = ev_path.read_text(encoding="utf-8")
    events = [e for e in json.loads(raw).get("events", []) if e.get("page")]
    done_all, per_page, sitemap_urls = [], {}, []

    # 대표 사진·썸네일을 먼저 채움(새로 만들 기본 페이지도 같은 사진을 쓰게)
    if not a.dry_run:
        for e in events:
            raw = fix_event_data(e, raw, done_all)
        ev_path.write_text(raw, encoding="utf-8")
    # 영·한 중 빠진 페이지는 기본 양식으로 만듦(모든 행사는 영·한 상세 페이지 — CLAUDE.md §3)
    _, made = make_basic_pages.make_missing(a.dry_run)
    if made:
        done_all.append("기본 양식 페이지 생성(빠진 언어): " + ", ".join(made))
        raw = ev_path.read_text(encoding="utf-8")
        events = [e for e in json.loads(raw).get("events", []) if e.get("page")]
    for e in events:
        for ko in (False, True):
            p = ROOT / ("ko" if ko else "") / e["page"]
            if not p.exists():
                continue
            h = p.read_text(encoding="utf-8")
            done = []
            new = fix_head(h, e, e["page"], ko, done)
            b = page_blocks.apply(new, e, ko)
            if b != new:
                done.append("부스 위치·현장 기록 자리")
            s = page_seo.apply(b, e, p, ko)
            if page_seo.LD_RE.sub("", s) != page_seo.LD_RE.sub("", b) and 'hreflang="x-default"' not in b:
                done.append("hreflang x-default")
            if page_seo.LD_RE.search(s).group(0) != (page_seo.LD_RE.search(b).group(0) if page_seo.LD_RE.search(b) else ""):
                done.append("검색용 행사 정보(JSON-LD)")
            if s != h:
                per_page[p.relative_to(ROOT).as_posix()] = done
                if not a.dry_run:
                    p.write_text(s, encoding="utf-8")
            if not re.search(r'<meta[^>]+name=["\']robots["\'][^>]+noindex', s, re.I):
                sitemap_urls.append(SITE + ("ko/" if ko else "") + e["page"].split("/")[0] + "/")

    if not a.dry_run:
        if raw != ev_path.read_text(encoding="utf-8"):
            ev_path.write_text(raw, encoding="utf-8")
        add_sitemap(sitemap_urls, done_all)

    lines = []
    for f, d in per_page.items():
        lines.append(f"- `{f}`: " + " · ".join(d))
    lines += [f"- {x}" for x in done_all]
    out = "\n".join(lines) if lines else "고칠 것 없음"
    print(out)
    if a.report:
        Path(a.report).write_text(out + "\n", encoding="utf-8")


if __name__ == "__main__":
    main()
