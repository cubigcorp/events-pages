#!/usr/bin/env python3
"""디자인된 상세 페이지가 없는 행사에 '기본 양식(v2)' 페이지를 영·한 둘 다 만들어 주는 도구 (2026-11-17).

현세 규칙(11-17): 모든 행사는 영어·한국어 상세 페이지가 다 있어야 한다(영어로 들어와도 국문 전용 행사가 보이게).
디자인된 페이지(사람이 만든 페이지)가 없으면 events.json 의 글만으로 기본 양식 페이지를 만든다.
  - 이미 있는 파일은 절대 덮어쓰지 않는다(사람이 만든 페이지·디자인 페이지 보호).
  - 만든 페이지에는 <meta name="ev-generated" content="make_basic_pages"> 표시가 붙는다.
    나중에 디자인 페이지로 바꿀 때는 그 파일을 그냥 덮어쓰면 된다.
  - events.json 의 page 칸이 비어 있으면 '<id>/index.html' 로 채운다.
  - 검색용 행사 정보(JSON-LD)·hreflang x-default 도 같이 넣는다(page_seo.py).
  - 글은 events.json 에 있는 것만 쓴다(지어내지 않음): title(_ko)·summary(_ko)·badge(_ko)·date·장소·src·booking.

사용:
  python3 tools/make_basic_pages.py            # 빠진 페이지만 만듦
  python3 tools/make_basic_pages.py --dry-run  # 무엇을 만들지 보기만
"""
import argparse, html, json, os, re, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from upgrade_detail_v2 import card, fmt, CITY_KO  # 허브와 같은 카드·날짜·지명 규칙
import page_seo  # 검색용 JSON-LD·x-default (page_seo.py)
import page_blocks  # 부스 위치·현장 기록 자리 (page_blocks.py)
from pathlib import Path

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = 'https://events.cubig.ai/'
TYPE = {'exhibition': ('On the floor', '전시·행사', ''), 'stage': ('On stage', '무대·수상', ''), 'live': ('On air', '라이브 방송', '#now')}
KIND = {'exhibition': ('Exhibition', '전시'), 'pitch': ('Pitch', '피칭'), 'award': ('Award', '수상'), 'partner': ('Partner', '파트너·후원'), 'live': ('Live', '라이브 방송')}
MORE_H = {'exhibition': ('More from the floor', '다른 전시·행사'), 'stage': ('More from the stage', '다른 무대·수상'), 'live': ('More creator collaborations', '다른 라이브 방송')}
L = {  # 화면 글자(영, 한)
    'events': ('Events', '행사'), 'crumb': ('Breadcrumb', '이동 경로'), 'facts': ('At a glance', '한눈에 보기'),
    'event': ('Event', '행사'), 'date': ('Date', '일시'), 'place': ('Place', '장소'), 'role': ('CUBIG', 'CUBIG 참여'),
    'news': ('Read the news', '보도자료 보기'), 'watch': ('Watch the video', '영상 보기'), 'site': ('Event website', '행사 사이트'),
    'book': ('Book a meeting', '현장 미팅 잡기'), 'meet': ('Book a 30-minute call', '30분 미팅 신청하기'), 'all': ('See all', '전체 보기'),
    'suffix': ('CUBIG Events', 'CUBIG 행사'), 'main': ('What CUBIG brought', 'CUBIG이 보여준 것'),
}
GA = """<!-- ⑤ 추적 코드 (GA4, 마케팅팀 관리 — 직접 수정·삭제하지 마세요) -->
<script>
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-8MRD9BZ1VJ');
</script>
<script async src="https://www.googletagmanager.com/gtag/js?id=G-8MRD9BZ1VJ"></script>"""


def t(k, ko):
    return L[k][1 if ko else 0]


def esc(s):
    return html.escape(str(s or ''), quote=True)


def pick(e, k, ko):
    return (ko and e.get(k + '_ko')) or e.get(k) or ''


def month(e, ko):
    y, m, _ = map(int, e['start'].split('-'))
    return f'{y}년 {m}월' if ko else ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][m - 1] + f' {y}'


def where(e, ko):
    w = e.get('city') or e.get('place') or ''
    if ko:
        w = (e.get('map') or {}).get('label_ko') or e.get('map_where_ko') or CITY_KO.get(w, w)
    return w


def src_label(u, ko):
    if re.search(r'cubig\.ai/(ko/)?news/', u):
        return t('news', ko)
    if re.search(r'youtu\.?be', u):
        return t('watch', ko)
    return t('site', ko)


def build(e, ko, events):
    slug = e['page'].replace('index.html', '').strip('/')
    url = BASE + ('ko/' if ko else '') + slug + '/'
    title = pick(e, 'title', ko)
    summary = pick(e, 'summary', ko)
    badge = pick(e, 'badge', ko)
    typ = e['type']
    kind = KIND.get(e.get('kind') or typ, KIND['exhibition'])[1 if ko else 0]
    hub = 'https://cubig.ai/' + ('ko/' if ko else '') + 'events/'
    meet = hub + 'meet/'
    tlabel = TYPE[typ][1 if ko else 0]
    photo = e.get('photo') or ''
    # 버튼: 다가오는 행사에 예약 링크가 있으면 예약이 먼저(끝나면 ev-nav.js 가 미팅 페이지로 바꿈), 그다음 src
    acts = []
    if e.get('booking'):
        acts.append(f'<a class="d-btn" href="{esc(e["booking"])}" target="_blank" rel="noopener" data-booking-after="hide">{esc(pick(e, "booking_label", ko) or t("book", ko))}</a>')
    if e.get('src') and not re.search(r'cubig\.ai/(ko/)?news/', e['src']):  # 보도자료 링크는 '관련 기사' 칸에만 둔다(2026-11-25 GTM)
        cls = 'd-btn d-btn--line' if acts else 'd-btn'
        acts.append(f'<a class="{cls}" href="{esc(e["src"])}" target="_blank" rel="noopener">{src_label(e["src"], ko)} ↗</a>')
    acts.append(f'<a class="d-go" href="{meet}">{t("meet", ko)} <i aria-hidden="true">→</i></a>')
    ph_href = e.get('src') or ''
    img = f'<img src="{esc(photo)}" alt="" width="1280" height="720" fetchpriority="high">' if photo else ''
    ph = (f'<a class="d-hero__ph{" is-video" if re.search(r"youtu", ph_href) else ""}" href="{esc(ph_href)}" target="_blank" rel="noopener" aria-label="{src_label(ph_href, ko)}">{img}</a>'
          if photo and ph_href else (f'<div class="d-hero__ph">{img}</div>' if photo else ''))
    if photo and e.get('credit'):
        cr = re.sub(r'^Photos?:\s*', '사진: ', e['credit'], flags=re.I) if ko else e['credit']
        ph = ph.replace('</a>', f'<small class="ev-it__cr">{esc(cr)}</small></a>').replace('</div>', f'<small class="ev-it__cr">{esc(cr)}</small></div>', 1)
    facts = [(t('event', ko), pick(e, 'card_title', ko) or title), (t('date', ko), fmt(e, ko))]
    w = pick(e, 'map_where', ko) or where(e, ko)
    if w:
        facts.append((t('place', ko), w))
    if badge:
        facts.append((t('role', ko), badge))
    facts_html = ''.join(f'<div><dt>{esc(a)}</dt><dd>{esc(b)}</dd></div>' for a, b in facts)
    body = [f'<p>{esc(summary)}</p>'] if summary else []
    # 다른 행사: 같은 묶음에서 페이지 있는 행사 중 날짜가 가까운 둘
    pool = [x for x in events if x['id'] != e['id'] and x['type'] == typ and x.get('page')]
    pool.sort(key=lambda x: abs(int(x['start'].replace('-', '')) - int(e['start'].replace('-', ''))))
    cards = '\n'.join(card(x, ko) for x in pool[:2])
    with_line = ' · '.join(v for v in [w, badge] if v)
    desc = page_seo.augment_desc(e, summary or title, ko)  # 짧으면 날짜·미팅 문장 보강
    og = (BASE.rstrip('/') + photo) if photo.startswith('/') else photo
    lang = 'ko' if ko else 'en'
    cta = f' data-cta="{meet}"'
    return f"""<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="ev-generated" content="make_basic_pages">
<link rel="canonical" href="{url}">
<link rel="alternate" hreflang="en" href="{BASE}{slug}/">
<link rel="alternate" hreflang="ko" href="{BASE}ko/{slug}/">
<title>{esc(title)} | {t('suffix', ko)}</title>
<meta name="description" content="{esc(desc)}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="CUBIG">
<meta property="og:title" content="{esc(title)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="{esc(og)}">
<meta property="og:description" content="{esc(desc)}">
<meta name="twitter:title" content="{esc(title)}">
<meta name="twitter:description" content="{esc(desc)}">
<meta name="twitter:image" content="{esc(og)}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="https://cubig.ai/wp-content/themes/cubig/assets/images/logo/favicon.png" media="(prefers-color-scheme: light)">
<link rel="icon" href="https://cubig.ai/wp-content/themes/cubig/assets/images/logo/favicon-dark.png" media="(prefers-color-scheme: dark)">

{GA}

<link rel="stylesheet" href="/assets/ev.css">
<link rel="stylesheet" href="/assets/ev-pages.css">
<link rel="stylesheet" href="/assets/site/cubig-site.css">
<link rel="stylesheet" href="/assets/site/ev-site.css">
<link rel="stylesheet" href="/assets/ev-basic.css">
<script src="/assets/site/cubig-site.js" defer></script>
<script src="/assets/ev-nav.js" defer></script>
</head>
<body data-strip="off" data-lang-toggle{cta}>
<main>
<section class="d-hero">
<div class="wrap">
<div class="d-hero__in{'' if ph else ' is-solo'}">
<div class="d-hero__txt">
<nav aria-label="{t('crumb', ko)}" class="crumb"><a href="{hub}">{t('events', ko)}</a><span>›</span><a href="{hub}{TYPE[typ][2]}">{tlabel}</a><span>›</span><span>{esc(pick(e, 'card_title', ko) or title)}</span></nav>
<div class="tg">{kind} · {month(e, ko)}</div>
<h1>{esc(title)}</h1>
{f'<div class="with">{esc(with_line)}</div>' if with_line else ''}
<div class="d-acts">{''.join(acts)}</div>
</div>
{ph}
</div>
<dl aria-label="{t('facts', ko)}" class="d-facts">{facts_html}</dl>
</div>
</section>
<div class="wrap">
<div class="d-body d-body--one">
<article class="d-main">
{chr(10).join(body)}
</article>
</div>
</div>
""" + (f"""<section class="more">
<div class="wrap">
<div class="p-head"><div><h2>{MORE_H[typ][1 if ko else 0]}</h2></div><a class="link" href="{hub}">{t('all', ko)}</a></div>
<div class="ev-grid">
{cards}
</div>
</div>
</section>
""" if cards else '') + """</main>
</body>
</html>
"""


def add_sitemap(urls):
    """새 주소를 sitemap.xml 끝에 더함(이미 있으면 그대로, 기존 순서 유지)."""
    p = os.path.join(ROOT, 'sitemap.xml')
    sm = open(p, encoding='utf-8').read()
    add = ''.join(f'  <url><loc>{u}</loc></url>\n' for u in urls if f'<loc>{u}</loc>' not in sm)
    if add:
        open(p, 'w', encoding='utf-8').write(sm.replace('</urlset>', add + '</urlset>', 1))


def make_missing(dry_run=False):
    """빠진 영·한 상세 페이지를 만들고 (page 칸 채운 행사 id 목록, 만든 파일 목록)을 돌려줌. autofix_pages.py도 씀."""
    path = os.path.join(ROOT, 'events.json')
    raw = open(path, encoding='utf-8').read()
    data = json.loads(raw)
    events = data['events']
    made, filled = [], []
    for e in events:
        if not e.get('page'):
            e['page'] = f'{e["id"]}/index.html'
            filled.append(e['id'])
    for e in events:
        for ko in (False, True):
            f = os.path.join(ROOT, 'ko' if ko else '', e['page'])
            if os.path.exists(f):
                continue
            made.append(os.path.relpath(f, ROOT).replace(os.sep, '/'))  # 윈도우 역슬래시 → 사이트맵 주소 깨짐 방지(2026-11-25)
            if not dry_run:
                os.makedirs(os.path.dirname(f), exist_ok=True)
                open(f, 'w', encoding='utf-8').write(page_seo.apply(page_blocks.apply(build(e, ko, events), e, ko), e, Path(f), ko))
    if filled and not dry_run:
        # page 칸만 글자 그대로 바꿈(나머지 줄 모양 유지)
        for i in filled:
            raw = re.sub(r'("id": "%s",.*?"page": )null' % re.escape(i), r'\1"%s/index.html"' % i, raw, count=1, flags=re.S)
        open(path, 'w', encoding='utf-8').write(raw)
    if made and not dry_run:
        add_sitemap([BASE + os.path.dirname(m).rstrip('/') + '/' for m in made])
    return filled, made


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    a = ap.parse_args()
    filled, made = make_missing(a.dry_run)
    print('page 칸 채움:', filled or '없음')
    print('새로 만든 페이지:' if not a.dry_run else '만들 페이지:', made or '없음')


if __name__ == '__main__':
    main()
