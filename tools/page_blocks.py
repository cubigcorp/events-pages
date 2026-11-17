#!/usr/bin/env python3
"""기본 양식(v2) 상세 페이지의 '데이터 자리' — events.json 값이 있을 때만 보이는 블록 (표준 라이브러리만 사용).

  ev:find   부스 위치 지도(booth_map, 누르면 크게) + 행사 공식 포털의 CUBIG 프로필(portal)
            지도는 행사가 끝나면 숨김(html.is-past, ev-nav.js). 포털 링크는 남음.
  ev:record 현장 기록 사진(photos). 평소엔 본문 아래, 행사가 끝나면 ev-nav.js 가 히어로 바로 아래로 올림.

블록은 <!-- ev:이름 --> … <!-- /ev:이름 --> 사이에만 쓰고, 값이 바뀌면 그 사이만 다시 씁니다.
값이 없으면 블록을 지웁니다. 사람이 만든 본문은 건드리지 않습니다.
make_basic_pages.py(새 페이지)와 autofix_pages.py(PR 자동 정리)가 씁니다.
"""
import html as htmllib
import re

L = {
    "find_h": ("Find us", "부스 위치"),
    "zoom": ("Open the booth map", "부스 지도 크게 보기"),
    "map_alt": ("Booth location map, {}", "{} 부스 위치 지도"),
    "portal": ("CUBIG on the event portal", "행사 포털의 CUBIG 프로필"),
    "record_h": ("From the floor", "현장 기록"),
    "photo": ("Open photo", "사진 크게 보기"),
}


def t(k, ko):
    return L[k][1 if ko else 0]


def esc(s):
    return htmllib.escape(str(s), quote=True)


def pick(e, k, ko):
    return (e.get(k + "_ko") if ko else None) or e.get(k) or ""


def render_find(e, ko):
    bm, portal = e.get("booth_map"), e.get("portal")
    if not bm and not portal:
        return ""
    name = pick(e, "card_title", ko) or pick(e, "title", ko)
    parts = []
    if bm:
        parts.append(
            f'<a class="d-find__map" data-past-hide href="{esc(bm)}" target="_blank" rel="noopener" aria-label="{t("zoom", ko)}">'
            f'<img src="{esc(bm)}" alt="{esc(t("map_alt", ko).format(name))}" loading="lazy" decoding="async">'
            f'<span class="d-find__zoom" aria-hidden="true">{t("zoom", ko)} ↗</span></a>')
    if portal:
        label = pick(e, "portal_label", ko) or t("portal", ko)
        parts.append(f'<a class="d-chip d-find__portal" data-ev-href="portal" href="{esc(portal)}" target="_blank" rel="noopener">{esc(label)} ↗</a>')
    hide = " data-past-hide" if not portal else ""  # 지도만 있으면 끝난 뒤 통째로 숨김
    return (f'<section class="d-find"{hide} aria-label="{t("find_h", ko)}">\n<div class="wrap">\n'
            f'<h2 class="d-find__h"{" data-past-hide" if portal and bm else ""}>{t("find_h", ko)}</h2>\n'
            f'<div class="d-find__in">{"".join(parts)}</div>\n</div>\n</section>')


def render_record(e, ko):
    photos = [p for p in (e.get("photos") or []) if isinstance(p, str) and p]
    if not photos:
        return ""
    figs = "".join(
        f'<a class="d-record__ph" href="{esc(p)}" target="_blank" rel="noopener" aria-label="{t("photo", ko)}">'
        f'<img src="{esc(p)}" alt="" loading="lazy" decoding="async"></a>' for p in photos)
    cr = e.get("credit") or ""
    if cr and ko:
        cr = re.sub(r"^Photos?:\s*", "사진: ", cr, flags=re.I)
    cr_html = f'\n<p class="d-record__cr">{esc(cr)}</p>' if cr else ""
    n = min(len(photos), 4)
    return (f'<section class="d-record" aria-label="{t("record_h", ko)}">\n<div class="wrap">\n'
            f'<h2 class="d-record__h">{t("record_h", ko)}</h2>\n'
            f'<div class="d-record__grid" data-n="{n}">{figs}</div>{cr_html}\n</div>\n</section>')


BLOCKS = {"find": render_find, "record": render_record}


def _wrap(name, inner):
    return f"<!-- ev:{name} -->\n{inner}\n<!-- /ev:{name} -->" if inner else ""


def _anchor(h, name):
    """블록이 없을 때 넣을 자리. find = 히어로 다음, record = 다른 행사 앞(없으면 </main> 앞)."""
    if name == "find":
        m = re.search(r'<section class="d-hero">[\s\S]*?</section>\n?', h)
        return m.end() if m else None
    m = re.search(r'<section class="more">', h) or re.search(r"</main>", h)
    return m.start() if m else None


def is_basic(h):
    """기본 양식(v2) 페이지인지(히어로 구조가 있는지). 디자인 페이지는 자리를 자동으로 만들지 않음."""
    return 'class="d-hero"' in h


def apply(h, e, ko):
    out = h
    for name, fn in BLOCKS.items():
        block = _wrap(name, fn(e, ko))
        pat = re.compile(r"<!-- ev:%s -->[\s\S]*?<!-- /ev:%s -->\n?" % (name, name))
        if pat.search(out):
            out = pat.sub((block + "\n") if block else "", out, count=1)
        elif block and is_basic(out):
            i = _anchor(out, name)
            if i is not None:
                out = out[:i] + block + "\n" + out[i:]
    return out
