#!/usr/bin/env python3
"""행사 상세 '기본 틀'(d-hero 짧은 기록형)을 v2 로 바꾸는 도구 (2026-11-17).

v2 = cubig.ai 공홈 머리글·바닥글 + 허브(cubig.ai/events)와 같은 룩.
  - 첫 화면에 답이 다 보이게: 왼쪽 = 종류·제목·한 줄 설명·버튼, 오른쪽 = 대표 사진
  - '한눈에 보기' 표 → 히어로 아래 가로 정보 줄(날짜·장소·결과를 한 줄로 훑음)
  - 옆 칸을 없애 본문은 한 줄 읽기 폭으로, 같은 보도자료 링크가 두 번 나오지 않게
  - '다른 행사' 카드 = 허브 카드와 같은 부품·같은 문구(events.json 에서 만듦)

사용:
  python3 tools/upgrade_detail_v2.py t-challenge-2026          # 폴더 하나(영·한 둘 다)
  python3 tools/upgrade_detail_v2.py --all                      # 기본 틀 페이지 전부
이미 v2 인 페이지는 '다른 행사' 카드와 머리 링크만 다시 맞춘다(여러 번 돌려도 같음).
"""
import argparse, glob, json, os, re, sys
from bs4 import BeautifulSoup

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
HEAD_OLD = '<link rel="stylesheet" href="/assets/ev-pages.css">\n<script src="/assets/ev-nav.js" defer></script>'
HEAD_NEW = ('<link rel="stylesheet" href="/assets/ev-pages.css">\n<link rel="stylesheet" href="/assets/site/cubig-site.css">\n<link rel="stylesheet" href="/assets/site/ev-site.css">\n'
            '<link rel="stylesheet" href="/assets/ev-basic.css">\n<script src="/assets/site/cubig-site.js" defer></script>\n'
            '<script src="/assets/ev-nav.js" defer></script>')
# 허브(공홈 테마 content/pages/events.php)와 같은 표
CITY_KO = {'Online': '온라인', 'US': '미국', 'Goyang': '고양', 'Busan': '부산', 'Incheon': '인천', 'Deutsche Telekom final': '도이치텔레콤 결선',
           'Bonn': '본', 'Seoul': '서울', 'Seongnam': '성남', 'New York': '뉴욕', 'Las Vegas': '라스베이거스', 'San Francisco': '샌프란시스코',
           'Lisbon': '리스본', 'Paris': '파리', 'Barcelona': '바르셀로나', 'London': '런던', 'Singapore': '싱가포르', 'Tokyo': '도쿄', 'Osaka': '오사카'}
MON = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
T = {'more': ('See details', '자세히 보기'), 'meet': ('Book a 30-minute call', '30분 미팅 신청하기'),
     'past': ('Wrapped', '종료'), 'facts': ('At a glance', '한눈에 보기')}


def t(k, ko):
    return T[k][1 if ko else 0]


def fmt(e, ko):  # cubig_events_fmt 와 같음
    y, m, d = map(int, e['start'].split('-'))
    end = list(map(int, e['end'].split('-'))) if e.get('end') else None
    if end == [y, m, d]:
        end = None
    if ko:
        if not end: return f'{y}년 {m}월 {d}일'
        if end[1] == m: return f'{y}년 {m}월 {d}–{end[2]}일'
        return f'{y}년 {m}월 {d}일–{end[1]}월 {end[2]}일'
    M = MON[m - 1]
    if not end: return f'{M} {d}, {y}'
    if end[1] == m: return f'{M} {d}–{end[2]}, {y}'
    return f'{M} {d}–{MON[end[1] - 1]} {end[2]}, {y}'


def card(e, ko):  # 허브 page-events.php $card 와 같은 문구
    name = (ko and e.get('card_title_ko')) or e.get('card_title') or (ko and e.get('ko') and e.get('title_ko')) or e['title']
    typ = e['type']
    where = e['with'] if (typ == 'live' and e.get('with')) else (e.get('city') or e.get('place') or '')
    if ko and typ != 'live':
        where = (e.get('map') or {}).get('label_ko') or CITY_KO.get(where, where)
    badge = (ko and e.get('badge_ko')) or e.get('badge') or ''
    meta = fmt(e, ko) + (' · ' + where if where else '') + (' · ' + badge if badge else '')
    img = e.get('thumb') or e.get('photo') or ''
    href = ('/ko/' if ko else '/') + re.sub(r'index\.html$', '', e['page'].lstrip('/'))
    cr = e.get('credit') or ''
    if ko and cr:
        cr = re.sub(r'^Photos?:\s*', '사진: ', cr, flags=re.I)
    return (f'<a class="ev-it" href="{href}" data-s="{e["start"]}" data-e="{e.get("end") or e["start"]}">'
            f'<div class="ev-it__im"><img src="{img}" alt="" loading="lazy" decoding="async" width="640" height="360">'
            + (f'<small class="ev-it__cr">{cr}</small>' if cr else '') +
            f'</div><div class="ev-it__b"><em class="ev-st is-past" data-ev-st>{t("past", ko)}</em>'
            f'<h3 class="ev-it__n">{name}</h3><small class="ev-it__m">{meta}</small>'
            f'<strong class="ev-it__go">{t("more", ko)} <i aria-hidden="true">→</i></strong></div></a>')


def bg_url(div):
    m = re.search(r'url\(([^)]+)\)', (div or {}).get('style', '') if div else '')
    return m.group(1).strip('\'"') if m else ''


ALT_H = ('Also on', '다른 곳에서 보기')


def group_alt(s, ko):
    """버튼 줄 규칙(11-17 현세 「버튼 많을 때」): 첫 줄 = 대표 버튼 하나 + 온라인 미팅 링크.
    다른 링크가 2개 이상이면 둘째 줄 '다른 곳에서 보기' 작은 버튼(.d-chip)으로 모은다. 여러 번 돌려도 같음."""
    acts = s.select_one('.d-acts')
    if not acts or s.select_one('.d-alt'):
        return
    lines = acts.select('a.d-btn--line')
    if len(lines) < 2:
        return
    chips = []
    for a in lines:
        a.extract()
        a['class'] = ['d-chip']
        chips.append(str(a))
    alt = BeautifulSoup(f'<div class="d-alt"><span class="d-alt__h">{ALT_H[1 if ko else 0]}</span>{"".join(chips)}</div>', 'html.parser')
    acts.insert_after(alt)


def upgrade(path, events, ko):
    raw = open(path, encoding='utf-8').read()
    if HEAD_OLD in raw:
        raw = raw.replace(HEAD_OLD, HEAD_NEW)
    # <main> 안만 고친다(머리·추적 코드 등 나머지 글자는 한 글자도 안 건드림)
    mm = re.search(r'<main>.*?</main>', raw, flags=re.S)
    if not mm:
        return False
    bm = re.search(r'<body([^>]*)>', raw)
    battr = dict(re.findall(r'([\w-]+)="([^"]*)"', bm.group(1))) if bm else {}
    s = BeautifulSoup(mm.group(0), 'html.parser')
    hero = s.select_one('section.d-hero')
    if not hero:
        return False
    body_cta = battr.get('data-cta')

    if not s.select_one('.d-hero__in'):
        old_wrap = hero.select_one('.wrap')
        side = s.select_one('.d-side')
        watch = side.select_one('.watch-mini') if side else None
        photo = bg_url(watch.select_one('.th')) if watch else ''
        prim_href = watch.get('href') if watch and watch.name == 'a' else ''
        prim_label = watch.select_one('b').get_text(strip=True) if prim_href and watch.select_one('b') else ''
        facts_box = next((b for b in side.select('.box') if b.select_one('dl')), None) if side else None
        links = [a for a in side.select('.links-list a')] if side else []

        acts = []
        if prim_href:
            acts.append(f'<a class="d-btn" href="{prim_href}" target="_blank" rel="noopener">{prim_label}</a>')
        seen = {prim_href}
        for a in links:
            h = a.get('href')
            if h in seen:
                continue
            seen.add(h)
            label = ''.join(x for x in a.strings if x.strip() not in ('↗',)).strip()
            acts.append(f'<a class="d-btn d-btn--line" href="{h}" target="_blank" rel="noopener">{label} ↗</a>')
        if body_cta:
            label = battr.get('data-cta-label') or t('meet', ko)
            acts.append(f'<a class="d-go" href="{body_cta}">{label} <i aria-hidden="true">→</i></a>')

        txt = '\n'.join(str(c) for c in old_wrap.find_all(recursive=False))
        is_vid = bool(re.search(r'youtu\.?be', prim_href or ''))
        img = f'<img src="{photo}" alt="" width="1280" height="720" fetchpriority="high">' if photo else ''
        if photo and prim_href:
            ph = f'<a class="d-hero__ph{" is-video" if is_vid else ""}" href="{prim_href}" target="_blank" rel="noopener" aria-label="{prim_label.rstrip(' ↗')}">{img}</a>'
        elif photo:
            ph = f'<div class="d-hero__ph">{img}</div>'
        else:
            ph = ''
        facts = ''
        if facts_box:
            dts = facts_box.select('dt')
            items = ''.join(f'<div><dt>{dt.decode_contents()}</dt><dd>{dt.find_next_sibling("dd").decode_contents()}</dd></div>' for dt in dts)
            lab = facts_box.select_one('h4').get_text(strip=True) if facts_box.select_one('h4') else t('facts', ko)
            facts = f'<dl class="d-facts" aria-label="{lab}">{items}</dl>'
        new_hero = (f'<div class="wrap">\n<div class="d-hero__in{"" if ph else " is-solo"}">\n<div class="d-hero__txt">\n{txt}\n'
                    + (f'<div class="d-acts">{"".join(acts)}</div>\n' if acts else '') + f'</div>\n{ph}\n</div>\n{facts}\n</div>\n')
        old_wrap.replace_with(BeautifulSoup(new_hero, 'html.parser'))
        if side:
            side.decompose()
        db = s.select_one('.d-body')
        if db:
            db['class'] = ['d-body', 'd-body--one']

    group_alt(s, ko)

    # 다른 행사 카드: 지금 걸린 링크 순서 그대로, 허브 카드로
    grid = s.select_one('.more .grid, .more .ev-grid')
    if grid:
        by_path = {re.sub(r'index\.html$', '', e['page'].lstrip('/')): e for e in events if e.get('page')}
        cards = []
        for a in grid.select('a[href]'):
            key = re.sub(r'^/(ko/)?', '', a['href'])
            e = by_path.get(key)
            if e:
                cards.append(card(e, ko))
            else:
                print('  ! events.json 에 없는 링크:', a['href'], file=sys.stderr)
        if cards:
            grid.replace_with(BeautifulSoup(f'<div class="ev-grid">\n{chr(10).join(cards)}\n</div>', 'html.parser'))

    out = raw[:mm.start()] + str(s.select_one('main')) + raw[mm.end():]
    open(path, 'w', encoding='utf-8').write(out)
    return True


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('slug', nargs='*')
    ap.add_argument('--all', action='store_true')
    a = ap.parse_args()
    events = json.load(open(os.path.join(ROOT, 'events.json'), encoding='utf-8'))['events']
    if a.all:
        slugs = sorted({os.path.basename(os.path.dirname(p)) for p in glob.glob(os.path.join(ROOT, '*/index.html'))})
    else:
        slugs = a.slug
    n = 0
    for slug in slugs:
        for ko in (False, True):
            p = os.path.join(ROOT, 'ko' if ko else '', slug, 'index.html')
            if os.path.exists(p) and 'class="d-hero"' in open(p, encoding='utf-8').read():
                n += upgrade(p, events, ko)
    print('v2 로 맞춘 페이지', n)


if __name__ == '__main__':
    main()
