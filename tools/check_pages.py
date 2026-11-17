#!/usr/bin/env python3
"""events.cubig.ai 페이지 검사 (로컬·GitHub 자동 검사 공용, 표준 라이브러리만 사용).

사용법:
  python3 tools/check_pages.py                  저장소 전체 검사
  python3 tools/check_pages.py --base origin/main   + 바뀐 파일 기준 경고(공통 파일 변경 등)

오류(✖)가 하나라도 있으면 종료 코드 1. 경고(⚠)는 통과.
규칙 근거: CLAUDE.md §7(추적 코드)·§8(검색)·§9(UTM)·§10(공개 저장소)·§11(문구).
"""
import argparse
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SITE = "https://events.cubig.ai/"
GA_ID = "G-8MRD9BZ1VJ"
GA_LOADER = "googletagmanager.com/gtag/js?id=" + GA_ID
GA_CONFIG = re.compile(r"gtag\(\s*['\"]config['\"]\s*,\s*['\"]" + GA_ID + r"['\"]")
OTHER_TRACKING = [
    (re.compile(r"\bGTM-[A-Z0-9]{4,}\b"), "GTM 컨테이너"),
    (re.compile(r"\bfbq\(|connect\.facebook\.net"), "메타 픽셀"),
    (re.compile(r"\bG-(?!8MRD9BZ1VJ\b)[A-Z0-9]{8,}\b"), "다른 GA4 측정 ID"),
    (re.compile(r"snap\.licdn\.com|_linkedin_partner_id"), "LinkedIn 인사이트 태그"),
]
PLACEHOLDERS = ["FOLDER-NAME", "EVENT TITLE", "ONE OR TWO SENTENCES", 'data-booking-until="YYYY-MM-DD"']
# 상시 30분 미팅(crm@cubig.ai 공용 계정) — 마지막 날 없이 써도 됨
COMMON_BOOKING = ("oCAQAos8bo4denCr7", "AcZssZ3o4cv2tXe0EboOtPoiHR8cImEPuUCo1bnxBBYTFL15V8ld8zTm4Ok6Zj4GxaQhCVQKKjO6c55J")
BOOKING_URL = re.compile(r"https://(?:calendar\.app\.google|calendar\.google\.com/calendar/appointments)/", re.I)
# 제품 이름 잘못된 표기 (대소문자만 다른 경우)
WRONG_NAME = re.compile(r"\b(?:Syn" + r"Titan|SYN" + r"TITAN|Syn Titan)\b")  # 화면 글자만 검사(주소·파일 이름의 소문자는 정상)
INTERNAL_HOSTS = ("cubig.ai", "syntitan.ai", "llmcapsule.ai")
SECRET_PATTERNS = [
    (re.compile(r"\bAKIA[0-9A-Z]{16}\b"), "AWS 키처럼 보이는 값"),
    (re.compile(r"\bsk-[A-Za-z0-9_-]{20,}\b"), "API 키처럼 보이는 값"),
    (re.compile(r"\bpat-(?:na|eu)1-[0-9a-f-]{20,}\b"), "HubSpot 비공개 토큰처럼 보이는 값"),
    (re.compile(r"hapikey=", re.I), "HubSpot API 키"),
    (re.compile(r"\bghp_[A-Za-z0-9]{30,}\b"), "GitHub 토큰처럼 보이는 값"),
    (re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"), "비밀 키"),
]
IMG_EXT = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"}
IMG_WARN = 1 * 1024 * 1024
HTML_WARN = 2 * 1024 * 1024
SKIP_DIRS = {".git", ".github", "tools", "node_modules", ".claude"}
# 모든 페이지에 영향을 주는 파일·폴더 (바뀌면 경고)
SHARED = ("assets/", "events.json", "CNAME", ".nojekyll", ".github/",
          "tools/", "robots.txt", "index.html", "404.html", "CLAUDE.md")
NEVER = ("CNAME", ".nojekyll")
EVENT_REQUIRED = ["id", "type", "title", "start"]
EVENT_TYPES = ("exhibition", "stage", "live")  # 새 양식을 만들면 여기에도 추가(CLAUDE.md §5)
EVENT_TYPES_HINT = "README·CLAUDE.md §2 양식 표"
DATE = re.compile(r"^\d{4}-\d{2}-\d{2}$")

errors, warns = [], []
_EVENT_PAGES = None


def page_key(r):
    """'ko/x/index.html' → 'x/index.html' (events.json page 칸과 비교용)"""
    return re.sub(r"^ko/", "", r)


def event_pages():
    global _EVENT_PAGES
    if _EVENT_PAGES is None:
        try:
            data = json.loads((ROOT / "events.json").read_text(encoding="utf-8"))
            ev = data.get("events", []) if isinstance(data, dict) else data
            _EVENT_PAGES = {str(e.get("page") or "").lstrip("/") for e in ev if e.get("end") or e.get("start")}
        except Exception:  # noqa: BLE001
            _EVENT_PAGES = set()
    return _EVENT_PAGES
GH = os.environ.get("GITHUB_ACTIONS") == "true"


def err(path, msg):
    errors.append((str(path), msg))


def warn(path, msg):
    warns.append((str(path), msg))


def rel(p):
    return p.relative_to(ROOT).as_posix()


def page_url(relpath):
    if relpath == "index.html":
        return SITE
    return SITE + relpath[: -len("index.html")]


def strip_comments(html):
    return re.sub(r"<!--[\s\S]*?-->", "", html)


def head_of(html):
    m = re.search(r"<head[\s>][\s\S]*?</head>", html, re.I)
    return m.group(0) if m else html[:20000]


def load_sitemap():
    p = ROOT / "sitemap.xml"
    if not p.exists():
        return None
    return set(re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", p.read_text(encoding="utf-8")))


def check_html(p, sitemap):
    r = rel(p)
    raw = p.read_text(encoding="utf-8", errors="replace")
    html = strip_comments(raw)
    head = head_of(html)
    is_root_redirect = r == "index.html"
    is_template = r.startswith("_template/")
    noindex = bool(re.search(r"<meta[^>]+name=[\"']robots[\"'][^>]+noindex", head, re.I))

    if p.stat().st_size > HTML_WARN:
        warn(r, f"HTML 파일이 {p.stat().st_size // 1024 // 1024}MB입니다. 이미지를 파일로 빼면 더 빨라집니다.")

    # ⑤ 추적 코드
    if not is_root_redirect:
        if GA_LOADER not in head:
            err(r, f"⑤ 추적 코드: GA4 불러오는 줄(<script async src=\"https://www.{GA_LOADER}\">)이 없습니다. 템플릿 ⑤ 블록을 그대로 넣어 주세요.")
        if not GA_CONFIG.search(head):
            err(r, f"⑤ 추적 코드: gtag('config', '{GA_ID}') 줄이 없습니다. 템플릿 ⑤ 블록을 그대로 넣어 주세요.")
    for pat, name in OTHER_TRACKING:
        if pat.search(html):
            err(r, f"{name}이(가) 들어 있습니다. 추적 코드는 ⑤ GA4만 씁니다(추가가 필요하면 PR에 요청).")

    # 자리표시
    if not is_template:
        for ph in PLACEHOLDERS:
            if ph in html:
                err(r, f"자리표시 '{ph}'가 남아 있습니다.")

    # 검색 설정
    if not is_template and not is_root_redirect and r != "404.html":
        url = page_url(r)
        canon = re.search(r"<link[^>]+rel=[\"']canonical[\"'][^>]+href=[\"']([^\"']+)", head, re.I) \
            or re.search(r"<link[^>]+href=[\"']([^\"']+)[\"'][^>]+rel=[\"']canonical", head, re.I)
        if not re.search(r"<title>[^<]{3,}</title>", head, re.I):
            err(r, "<title>이 없습니다.")
        desc = re.search(r"<meta(?=[^>]*name=[\"']description[\"'])[^>]*content=[\"']([^\"']*)", head, re.I)
        if not desc or len(desc.group(1).strip()) < 20:
            err(r, "검색 설명(meta description)이 없거나 너무 짧습니다.")
        if not noindex:
            if not canon:
                err(r, f"검색 노출 페이지인데 canonical이 없습니다. ({url})")
            elif canon.group(1) != url:
                err(r, f"canonical 주소가 이 페이지 주소와 다릅니다: {canon.group(1)} → {url}")
            if sitemap is not None and url not in sitemap:
                err(r, f"검색 노출 페이지인데 sitemap.xml에 없습니다: {url}")
            if not re.search(r"<h1[\s>]", html, re.I):
                warn(r, "첫 제목(h1)이 없습니다. 행사 이름을 h1에 넣어 주세요.")
        elif sitemap is not None and url in sitemap:
            err(r, f"검색 제외(noindex) 페이지가 sitemap.xml에 있습니다: {url}")
        for m in re.finditer(r"<link[^>]+rel=[\"']icon[\"'][^>]+href=[\"']([^\"']+)", head, re.I):
            href = m.group(1)
            if not href.startswith(("http://", "https://", "/", "data:")):
                warn(r, f"아이콘 경로 '{href}'가 상대 경로입니다. https:// 전체 주소로 쓰면 어디서나 깨지지 않습니다.")

    # 페이지 안 내부 링크의 UTM
    for m in re.finditer(r"href=[\"']([^\"']+)", html, re.I):
        href = m.group(1)
        if "utm_" in href:
            host = re.sub(r"^https?://", "", href).split("/")[0].split("?")[0]
            if host.endswith(INTERNAL_HOSTS) or not href.startswith("http"):
                err(r, f"페이지 안 링크에 UTM이 붙어 있습니다(원래 유입 경로가 덮임): {href[:120]}")

    # 미팅 예약 링크 (CLAUDE.md §9-1)
    has_until = False
    for m in re.finditer(r"<(a|iframe)\b[^>]*>", html, re.I):
        tag = m.group(0)
        until = re.search(r"data-booking-until=[\"']([^\"']*)", tag)
        if until:
            has_until = True
            if not DATE.match(until.group(1)) and not is_template:
                err(r, f"data-booking-until 날짜는 YYYY-MM-DD 형식이어야 합니다: {until.group(1)}")
        if BOOKING_URL.search(tag) and not any(c in tag for c in COMMON_BOOKING):
            has_until = True
            if not until and page_key(r) not in event_pages():
                warn(r, "행사 예약 링크가 있는데 events.json에 이 페이지(page) 줄이 없습니다. 행사가 끝나도 예약 버튼이 미팅 신청 페이지로 안 바뀝니다(CLAUDE.md §9-1).")
    if has_until and "/assets/ev-nav.js" not in head:
        err(r, "행사 예약 링크를 쓰는데 <head>에 /assets/ev-nav.js 가 없습니다. 행사가 끝나도 예약 버튼이 안 바뀝니다. 틀 페이지 줄을 그대로 넣어 주세요.")

    # 문구
    text = re.sub(r"<(script|style)[\s\S]*?</\1>|<[^>]+>", " ", html)
    if WRONG_NAME.search(text):
        err(r, "제품 이름 표기: Syntitan 으로 써 주세요.")

    # 비밀 값
    for pat, name in SECRET_PATTERNS:
        if pat.search(raw):
            err(r, f"{name}이(가) 있습니다. 공개 저장소라 지워도 기록에 남습니다. 올리기 전에 마케팅팀에 알려 주세요.")


def check_events_json():
    p = ROOT / "events.json"
    if not p.exists():
        return
    try:
        data = json.loads(p.read_text(encoding="utf-8"))
    except json.JSONDecodeError as e:
        err("events.json", f"JSON 형식 오류: {e}")
        return
    evs = data.get("events") if isinstance(data, dict) else None
    if not isinstance(evs, list):
        err("events.json", "최상위에 events 목록([])이 있어야 합니다.")
        return
    seen = set()
    for i, e in enumerate(evs):
        where = f"events.json #{i + 1} ({e.get('id', '?') if isinstance(e, dict) else '?'})"
        if not isinstance(e, dict):
            err(where, "항목이 {...} 형식이 아닙니다.")
            continue
        for k in EVENT_REQUIRED:
            if not e.get(k):
                err(where, f"필수 칸 '{k}'가 비어 있습니다.")
        if e.get("id") in seen:
            err(where, f"id '{e.get('id')}'가 중복됩니다.")
        seen.add(e.get("id"))
        for k in ("start", "end"):
            if e.get(k) and not DATE.match(str(e[k])):
                err(where, f"'{k}' 날짜는 YYYY-MM-DD 형식이어야 합니다: {e[k]}")
        if e.get("start") and e.get("end") and DATE.match(e["start"]) and DATE.match(str(e["end"])) and e["end"] < e["start"]:
            err(where, "end가 start보다 앞입니다.")
        page = e.get("page")
        if page:
            if not (ROOT / page).exists():
                err(where, f"page 경로에 파일이 없습니다: {page}")
        if page and (ROOT / page).exists():
            check_card_photo(where, e, ROOT / page)
        if e.get("type") and e["type"] not in EVENT_TYPES:
            warn(where, f"type '{e['type']}'는 처음 보는 양식입니다({EVENT_TYPES_HINT}). 새 양식이면 CLAUDE.md §5 절차를 따라 주세요.")


def _img_stem(src, page_dir):
    """이미지 주소 → 저장소 기준 경로(확장자·?v= 뺀 것). 상대 경로는 페이지 폴더 기준."""
    s = src.split("?")[0].split("#")[0]
    s = s.replace(SITE, "/", 1)
    s = s.lstrip("/") if s.startswith("/") else (page_dir / s).relative_to(ROOT).as_posix()
    return re.sub(r"\.(jpe?g|png|webp|avif)$", "", s, flags=re.I)


def check_card_photo(where, e, page_path):
    """thumb·photo = 상세 페이지 첫 화면 대표 사진과 같은 사진인지 (CLAUDE.md events.json 칸 표)."""
    html = strip_comments(page_path.read_text(encoding="utf-8"))
    m = re.search(r"<main[\s\S]*", html)
    imgs = [s for s in re.findall(r"<img\b[^>]*?\bsrc=\"([^\"]+)\"", m.group(0) if m else html)
            if not s.split("?")[0].lower().endswith(".svg")]
    if not imgs:
        return
    page_dir = page_path.parent
    hero = _img_stem(imgs[0], page_dir)
    if e.get("photo") and _img_stem(e["photo"], page_dir) != hero:
        warn(where, f"photo가 상세 페이지 대표 사진({imgs[0]})과 다릅니다. 허브 카드와 상세 첫 화면이 같은 사진이어야 합니다.")
    if e.get("thumb") and _img_stem(e["thumb"], page_dir) not in (hero, hero + "-thumb"):
        warn(where, f"thumb가 상세 페이지 대표 사진({imgs[0]})의 작은 사본이 아닙니다. 같은 폴더에 '<이름>-thumb.webp'로 만들어 주세요.")


def check_files():
    for p in ROOT.rglob("*"):
        if any(part in SKIP_DIRS for part in p.relative_to(ROOT).parts) or not p.is_file():
            continue
        if p.suffix.lower() in IMG_EXT and p.stat().st_size > IMG_WARN:
            warn(rel(p), f"이미지가 {p.stat().st_size / 1024 / 1024:.1f}MB입니다. 1MB 이하(.webp·.jpg)로 줄여 주세요.")
        if p.suffix.lower() in {".fig", ".psd", ".ai", ".sketch", ".xd"}:
            err(rel(p), "원본 디자인 파일은 공개 저장소에 올리지 않습니다.")
        if p.name in {".env"} or p.suffix.lower() in {".pem", ".key"}:
            err(rel(p), "키·환경 설정 파일은 공개 저장소에 올리지 않습니다.")


def check_changed(base):
    def git(*args):
        return subprocess.run(["git", *args], cwd=ROOT, capture_output=True, text=True, check=True).stdout
    try:
        status = git("diff", "--name-status", "-M", f"{base}...HEAD").splitlines()
    except Exception as e:  # noqa: BLE001
        warn("git", f"바뀐 파일 목록을 못 읽었습니다({base}): {e}")
        return
    shared_dirs = tuple(s for s in SHARED if s.endswith("/"))
    for line in status:
        parts = line.split("\t")
        code, paths = parts[0], parts[1:]
        old, new = paths[0], paths[-1]
        if code[0] in "DR" and old.endswith("index.html") and not old.startswith("_template/"):
            err(old, "공개된 페이지가 지워지거나 이름이 바뀌었습니다. 광고·메일 링크가 깨집니다. 먼저 마케팅팀에 확인해 주세요.")
        for f in {old, new}:
            if code[0] == "A" and f.startswith("assets/media/"):
                continue  # 새 이미지 추가는 기존 페이지에 영향 없음
            if f in NEVER:
                err(f, "이 파일은 바꾸면 사이트 연결·설정이 깨집니다. 마케팅팀 확인 없이 바꾸지 않습니다.")
            elif f in SHARED or f.startswith(shared_dirs):
                warn(f, "공통 파일이 바뀌었습니다. 모든 페이지에 반영되니 기존 페이지 화면도 확인하고 PR에 '공통 파일 변경'이라고 적어 주세요.")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--base", help="비교 기준 브랜치(예: origin/main). 주면 바뀐 파일 기준 경고도 냄")
    a = ap.parse_args()

    sitemap = load_sitemap()
    for p in sorted(ROOT.rglob("*.html")):
        if any(part in SKIP_DIRS for part in p.relative_to(ROOT).parts):
            continue
        check_html(p, sitemap)
    if sitemap:
        for url in sorted(sitemap):
            path = url.replace(SITE, "", 1)
            f = ROOT / path / "index.html" if (not path or path.endswith("/")) else ROOT / path
            if not f.exists():
                err("sitemap.xml", f"사이트맵에 있는 주소의 파일이 없습니다: {url}")
    check_events_json()
    check_files()
    if a.base:
        check_changed(a.base)

    lines = []
    for path, msg in errors:
        lines.append(f"✖ {path}: {msg}")
        if GH:
            print(f"::error file={path}::{msg}")
    for path, msg in warns:
        lines.append(f"⚠ {path}: {msg}")
        if GH:
            print(f"::warning file={path}::{msg}")
    summary = f"오류 {len(errors)}건 · 경고 {len(warns)}건"
    print("\n".join(lines) if lines else "문제 없음")
    print(("❌ " if errors else "✅ ") + summary)
    if GH and os.environ.get("GITHUB_STEP_SUMMARY"):
        with open(os.environ["GITHUB_STEP_SUMMARY"], "a", encoding="utf-8") as fh:
            fh.write(f"## 페이지 검사: {summary}\n\n")
            if lines:
                fh.write("\n".join(f"- {l}" for l in lines) + "\n")
            if errors:
                fh.write("\n오류를 고친 뒤 다시 올리면 자동으로 다시 검사합니다. 규칙은 CLAUDE.md·README 참고.\n")
    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
