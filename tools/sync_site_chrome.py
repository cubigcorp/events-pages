#!/usr/bin/env python3
"""cubig.ai 공홈 머리글·바닥글을 events.cubig.ai 로 옮겨 오는 도구 (2026-11-17).

공홈(워드프레스 테마)이 그린 머리글(#site-header)·바닥글(footer.site-footer) HTML 과
그 둘에 쓰이는 CSS·JS 만 골라 아래 두 파일을 다시 만든다. 손으로 고치지 말고 이 도구를 다시 돌린다.

  assets/site/cubig-site.css  머리글·바닥글 CSS (테마 variables·base·header·footer·global-overrides 에서 고름)
  assets/site/cubig-site.js   머리글·바닥글 HTML(영·한) + 메가메뉴·모바일 메뉴·언어 전환 JS

사용:
  python3 tools/sync_site_chrome.py                       # 기본: 로컬 공홈 http://localhost:8080 + 테마 폴더
  python3 tools/sync_site_chrome.py --base https://cubig.ai --theme ~/Documents/CUBIG/home_wp_theme-hs

규칙
- 링크·이미지 주소는 https://cubig.ai 로 바꾼다(로컬 주소가 남지 않게).
- 테마의 .btn 은 행사 페이지 .btn 과 이름이 겹쳐 cs-btn 으로 바꿔 넣는다.
- 머리글·바닥글 전용이 아닌 일반 규칙(a·img·button 등)은 머리글·바닥글 안에서만 듣게 범위를 씌운다.
- 언어 전환 링크는 페이지가 열릴 때 JS 가 같은 행사의 짝 페이지(/x/ <-> /ko/x/)로 바꾼다.
"""
import argparse, json, os, re, sys, urllib.request
from bs4 import BeautifulSoup
import tinycss2

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIVE = 'https://cubig.ai'
THEME_URL = LIVE + '/wp-content/themes/cubig/assets/'
CSS_FILES = ['variables', 'base', 'header', 'footer', 'global-overrides']  # ibm-overrides → global-overrides(테마 d0a35b53, 이름만 바뀜)
SPECIFIC = re.compile(r'site-header|site-footer|nav-|footer-|cubig-langhint|\bbtn\b|btn--')
PSEUDO = re.compile(r'::?(?:hover|focus-visible|focus-within|focus|active|visited|before|after|placeholder|marker|selection|-webkit-[a-z-]+|-moz-[a-z-]+)(?:\([^)]*\))?')
SCOPE = ':where(#site-header,.site-footer)'


def fetch(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'cubig-events-sync'})
    return urllib.request.urlopen(req, timeout=30).read().decode('utf-8')


def clean_html(html, base):
    html = html.replace(base.rstrip('/'), LIVE)
    # class 안의 btn / btn--x 만 cs-btn 으로 (다른 낱말 속 btn 은 그대로)
    def fix(m):
        cls = ' '.join(re.sub(r'^btn(?=$|--)', 'cs-btn', c) for c in m.group(2).split())
        return m.group(1) + cls + m.group(3)
    html = re.sub(r'(class=")([^"]*)(")', fix, html)
    html = re.sub(r'\s+is-scrolled', '', html)
    html = re.sub(r'\n\s*\n', '\n', html)
    html = re.sub(r'>\s+<', '><', html)
    return html.strip()


def grab(base, path):
    s = BeautifulSoup(fetch(base.rstrip('/') + path), 'html.parser')
    hd, ft = s.select_one('#site-header'), s.select_one('footer.site-footer')
    if not hd or not ft:
        sys.exit('머리글·바닥글을 못 찾음: ' + path)
    gate = ''
    for sc in s.select('head script:not([src])'):
        if 'nav-ready' in (sc.string or ''):
            gate = sc.string.strip()
    return clean_html(str(hd), base), clean_html(str(ft), base), gate


def split_selectors(prelude):
    out, depth, cur = [], 0, ''
    for ch in prelude:
        if ch in '([':
            depth += 1
        elif ch in ')]':
            depth -= 1
        if ch == ',' and depth == 0:
            out.append(cur.strip()); cur = ''
        else:
            cur += ch
    if cur.strip():
        out.append(cur.strip())
    return out


def matches(sel, soup_roots):
    test = PSEUDO.sub('', sel).strip()
    test = re.sub(r'^(html|body|:root)\b[^ >+~]*\s*[>+~]?\s*', '', test) or test
    if not test or test in ('*',):
        return None
    try:
        for r in soup_roots:
            if r.select_one(test):
                return 'desc'
            if r.parent and r in r.parent.select(test):
                return 'root'
    except Exception:
        return None
    return None


def rename_btn(sel):
    return re.sub(r'\.btn(?=[\s.:,>+~\[)]|--|$)', '.cs-btn', sel)


def pick_rule(prelude, soup_roots):
    keep = []
    for sel in split_selectors(prelude):
        if re.match(r'^(:root|html|body)$', sel):
            continue
        if SPECIFIC.search(sel):
            if re.search(r'\.btn(?=[\s.:,>+~\[)]|--|$)', sel) and not re.search(r'site-header|site-footer|nav-', sel):
                keep.append(SCOPE + ' ' + rename_btn(sel))
                continue
            keep.append(rename_btn(sel))
            continue
        m = matches(sel, soup_roots)
        if m == 'desc':
            keep.append(SCOPE + ' ' + sel)
        elif m == 'root':
            keep.append(sel + SCOPE)
    return keep


def resolve_urls(css, file_dir):
    def fix(m):
        u = m.group(1).strip('\'" ')
        if u.startswith(('data:', 'http', '#')):
            return 'url("%s")' % u
        parts = (file_dir + '/' + u).split('/')
        out = []
        for p in parts:
            if p == '..':
                out and out.pop()
            elif p not in ('', '.'):
                out.append(p)
        return 'url("%s%s")' % (THEME_URL, '/'.join(out))
    return re.sub(r'url\(([^)]*)\)', fix, css)


def walk(rules, soup_roots, vars_out, keyframes, used_anims, top=True):
    out = []
    for r in rules:
        if r.type == 'qualified-rule':
            prelude = tinycss2.serialize(r.prelude).strip()
            body = tinycss2.serialize(r.content).strip()
            if re.fullmatch(r':root|html|:root,\s*html', prelude):
                if not top:  # @media 안의 :root 변수는 그 @media 안에 그대로 둔다(밖으로 합치면 화면 크기별 값이 덮어씀)
                    vs = [d for d in tinycss2.parse_blocks_contents(r.content, skip_whitespace=True, skip_comments=True) if d.type == 'declaration' and d.name.startswith('--')]
                    if vs:
                        out.append(':root {' + ' '.join('%s: %s;' % (d.name, tinycss2.serialize(d.value).strip()) for d in vs) + '}')
                    continue
                for decl in tinycss2.parse_blocks_contents(r.content, skip_whitespace=True, skip_comments=True):
                    if decl.type == 'declaration' and decl.name.startswith('--'):
                        vars_out[decl.name] = tinycss2.serialize(decl.value).strip() + (' !important' if decl.important else '')
                continue
            sels = pick_rule(prelude, soup_roots)
            if sels:
                out.append(',\n'.join(sels) + ' {' + body + '}')
                for a in re.findall(r'animation(?:-name)?\s*:\s*([^;]+)', body):
                    used_anims.update(re.findall(r'[A-Za-z_][\w-]*', a))
        elif r.type == 'at-rule':
            kw = r.lower_at_keyword
            prelude = tinycss2.serialize(r.prelude).strip()
            if kw in ('media', 'supports', 'container') and r.content is not None:
                inner = walk(tinycss2.parse_rule_list(r.content, skip_whitespace=True, skip_comments=True), soup_roots, vars_out, keyframes, used_anims, top=False)
                if inner:
                    out.append('@%s %s {\n%s\n}' % (kw, prelude, '\n'.join(inner)))
            elif kw in ('keyframes', '-webkit-keyframes'):
                keyframes[prelude] = '@%s %s {%s}' % (kw, prelude, tinycss2.serialize(r.content))
    return out


def build_css(theme, soup_roots):
    vars_out, keyframes, used = {}, {}, set()
    chunks = []
    for name in CSS_FILES:
        path = os.path.join(theme, 'assets/css', name + '.css')
        rules = tinycss2.parse_stylesheet(open(path, encoding='utf-8').read(), skip_whitespace=True, skip_comments=True)
        got = walk(rules, soup_roots, vars_out, keyframes, used)
        if got:
            chunks.append('/* ── from theme %s.css ── */\n' % name + '\n'.join(got))
    kf = [v for k, v in keyframes.items() if k in used]
    root = ':root {\n' + '\n'.join('  %s: %s;' % kv for kv in vars_out.items()) + '\n}'
    css = '\n\n'.join([root] + chunks + kf)
    return resolve_urls(css, 'assets/css').replace('wp-content/themes/cubig/assets/assets/', 'wp-content/themes/cubig/assets/')


def build_js(theme, en, ko, gate):
    src = open(os.path.join(theme, 'assets/js/main.js'), encoding='utf-8').read()
    a = src.index('    // Mobile nav toggle')
    b = src.index('    // 2026-11-05 정리')
    c = src.index('    // === Language switcher ===')
    d = src.index('    // === Back to top ===')
    body = src[a:b] + '\n' + src[c:d]
    return TEMPLATE_JS % {
        'gate': gate,
        'data': json.dumps({'en': {'hd': en[0], 'ft': en[1]}, 'ko': {'hd': ko[0], 'ft': ko[1]}}, ensure_ascii=False),
        'body': body,
    }


TEMPLATE_JS = r'''/* cubig.ai 공홈 머리글·바닥글 (events.cubig.ai) — tools/sync_site_chrome.py 가 만든 파일. 손으로 고치지 말고 도구를 다시 돌리세요.
   페이지 <head> 에 <link rel="stylesheet" href="/assets/site/cubig-site.css"> + <script src="/assets/site/cubig-site.js" defer></script>. */
%(gate)s
(function () {
  var CHROME = %(data)s;
  var KO = (document.documentElement.lang || '').slice(0, 2) === 'ko';
  function el(h) { var t = document.createElement('div'); t.innerHTML = h; return t.firstElementChild; }
  function langLinks(root) {
    var path = location.pathname, en = path.replace(/^\/ko(\/|$)/, '/'), ko = KO ? path : '/ko' + path;
    root.querySelectorAll('[data-cubig-lang]').forEach(function (a) {
      var l = a.getAttribute('data-cubig-lang'); a.href = l === 'ko' ? ko : en;
      var on = (l === 'ko') === KO; a.classList.toggle('is-current', on);
      if (a.classList.contains('nav-lang-inline__opt')) { if (on) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); }
    });
  }
  function mount() {
    if (document.getElementById('site-header')) return;
    var c = CHROME[KO ? 'ko' : 'en'];
    var hd = el(c.hd), ft = el(c.ft);
    langLinks(hd);
    document.body.insertBefore(hd, document.body.firstChild);
    document.body.appendChild(ft);
    document.documentElement.classList.add('has-site-chrome');
    init();
  }
  function init() {
%(body)s
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
'''


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--base', default='http://localhost:8080')
    ap.add_argument('--theme', default=os.path.expanduser('~/Documents/CUBIG/home_wp_theme-hs'))
    a = ap.parse_args()
    en, ko = grab(a.base, '/events/'), grab(a.base, '/ko/events/')
    roots = [BeautifulSoup(x, 'html.parser') for x in (en[0], en[1])]
    roots = [r.find() for r in roots]
    css = build_css(a.theme, roots)
    js = build_js(a.theme, en, ko, en[2])
    os.makedirs(os.path.join(ROOT, 'assets/site'), exist_ok=True)
    head = '/* cubig.ai 공홈 머리글·바닥글 CSS — tools/sync_site_chrome.py 가 만든 파일. 손으로 고치지 말고 도구를 다시 돌리세요. */\n'
    open(os.path.join(ROOT, 'assets/site/cubig-site.css'), 'w', encoding='utf-8').write(head + css + '\n')
    open(os.path.join(ROOT, 'assets/site/cubig-site.js'), 'w', encoding='utf-8').write(js)
    left = [x for x in (css + js).split() if 'localhost' in x]
    print('css %d KB, js %d KB, localhost 남음 %d' % (len(css) // 1024, len(js) // 1024, len(left)))


if __name__ == '__main__':
    main()
