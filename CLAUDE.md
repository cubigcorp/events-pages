# CLAUDE.md — events.cubig.ai

이 저장소는 CUBIG 행사·캠페인 랜딩페이지입니다. `main` 브랜치가 그대로 **https://events.cubig.ai** 에 공개됩니다(GitHub Pages, 정적 HTML).
작업하는 사람은 GitHub에 익숙하지 않을 수 있습니다. git 작업은 Claude가 대신하고, 결과는 쉬운 말로 알려 주세요.

## 1. 작업 흐름 (반드시 지킬 것)

1. 시작 전 `git pull`로 최신 상태를 받습니다.
2. **새 브랜치**를 만듭니다. 이름 = 페이지 폴더 이름(예: `webinar-1201`). `main`에 직접 커밋·푸시하지 않습니다(보호돼 있어 막힙니다).
3. 새 페이지는 `_template/index.html`을 `폴더이름/index.html`로 복사해서 시작합니다. 맨 위 체크리스트대로 자리표시(`FOLDER-NAME`, `EVENT TITLE` 등)를 모두 바꿉니다.
4. 로컬 미리보기로 확인합니다. 저장소 **루트**에서 실행해야 `/assets/...` 경로가 맞습니다.
   ```bash
   python3 -m http.server 8090
   ```
   → `http://localhost:8090/폴더이름/` 을 데스크톱(1440px)·모바일(375px)에서 보고, 가로 넘침·깨진 이미지·끊긴 링크가 없는지 확인합니다.
5. 커밋 → 브랜치 푸시 → Pull Request 생성(`gh pr create`). PR 본문은 `.github/pull_request_template.md` 체크리스트를 채우고, 데스크톱·모바일 스크린샷을 붙입니다.
6. PR이 승인돼 합쳐지면 1분 안팎으로 공개됩니다. 승인 전에는 공개되지 않습니다.

## 2. 구조

- 폴더 하나 = 페이지 하나. 폴더 이름이 곧 주소입니다: `webinar-1201/` → `https://events.cubig.ai/webinar-1201/`
- 폴더 이름: 영어 소문자·숫자·하이픈만.
- 이미지·PDF는 그 페이지 폴더 안에 둡니다. 이미지는 1MB 이하(.webp·.jpg), 한 파일 100MB 초과 불가. 영상은 YouTube 등에 올리고 삽입합니다(`youtube-nocookie.com` 권장).
- 이미 공개된 폴더의 이름 변경·삭제 금지(광고·메일 링크가 깨짐). 필요하면 사람에게 먼저 묻습니다.

## 3. 건드리지 말 것

- `CNAME` — 지우거나 바꾸면 events.cubig.ai 연결이 끊깁니다.
- `.nojekyll`, `.github/`, 루트 `index.html`(cubig.ai로 넘김), `404.html`, `robots.txt`, `assets/` 전체(공통 머리글·바닥글·로고)
- 각 페이지 `<head>`의 **⑤ 추적 코드**(GA4 `G-8MRD9BZ1VJ`). 지우거나 바꾸거나 다른 추적 코드(GTM·픽셀·다른 분석 도구)를 추가하지 않습니다. 필요하면 PR에 요청으로 적습니다.
- 이미 검색 제외(`noindex`)된 페이지의 그 줄 — 끝난 행사라 일부러 꺼 둔 것입니다. 다시 켜려면 사람에게 먼저 묻습니다.

## 3-1. 검색 노출 규칙

- **다가오는 행사 페이지 = 검색 노출 켬**(템플릿 기본값). `canonical`을 그 페이지 주소로 맞춥니다.
- **끝난 행사·내부용·테스트 페이지 = 끔**: `<meta name="robots" content="noindex">` 주석을 풀고 canonical은 둡니다. 행사가 끝난 페이지를 손볼 때는 사람에게 검색 제외로 바꿀지 묻습니다.
- **공홈(cubig.ai)과 겹치지 않게 쓰기**: 검색에 나오는 페이지는 행사가 주인공입니다.
  - 제목·설명·첫 제목(h1)에 행사 이름·날짜·장소를 넣습니다(예: `CUBIG at Web Summit 2026 | Booth and meetings`).
  - 제품 설명은 2~3문장으로 짧게 쓰고, 자세한 내용은 공홈 페이지로 링크합니다: Syntitan `https://cubig.ai/syntitan/` · LLM Capsule `https://cubig.ai/llmcapsule/` · DTS `https://cubig.ai/dts/`
  - 공홈 문단을 길게 그대로 복사하지 않습니다(같은 문장이 두 곳에 있으면 검색 순위가 갈립니다).
- **사이트맵**: 검색 노출을 켠 페이지는 루트 `sitemap.xml`에 주소를 추가합니다(없으면 새로 만들고 `robots.txt` 끝에 `Sitemap: https://events.cubig.ai/sitemap.xml` 한 줄 추가, 처음 만들 때 사람에게 서치콘솔 제출을 안내). 검색 제외로 바꾼 페이지는 사이트맵에서 뺍니다.

## 4. 공개 저장소 주의

이 저장소의 파일과 수정 기록은 **누구나 볼 수 있고, 지워도 기록에 남습니다.** 브랜치에 올린 초안도 바로 보입니다.
- 넣지 말 것: API 키·토큰·비밀번호, 리드 목록·참석자 명단 등 고객 데이터, 고객 실명·연락처, 내부 문서·회의 메모, 미공개 가격·계약, 원본 디자인 파일(.fig·.psd·.ai). (GA4 측정 ID·GTM ID는 공개돼도 괜찮습니다)
- 사용자가 이런 내용을 넣으려 하면 멈추고 알려 주세요.
- 이미 올라갔다면 지우기 전에 사람에게 알리라고 안내합니다(키 교체 등 따로 조치 필요).
- 신청 폼은 직접 만들지 말고 HubSpot 폼 삽입을 마케팅팀에 요청하도록 안내합니다.

## 5. 문구 기준 (CUBIG)

- 제품 이름 표기: `Syntitan`, `LLM Capsule`, `DTS` (`SynTitan`·`syntitan` ❌). <!-- bible-allow: 금지 표기 예시 --> 여러 제품을 나열할 때 순서 = Syntitan → LLM Capsule → DTS.
- 회사 설명: CUBIG은 기업 데이터를 AI 업무에 쓸 수 있게 준비하고 검증하는 회사(영문: AI-ready data operating layer for enterprise AI execution). 보안 회사·합성데이터 회사·마스킹 도구처럼 쓰지 않습니다.
- 금지: 절대 보안 표현(zero exposure, 100% safe, guaranteed compliance, 데이터가 전혀 나가지 않는다), 과장(혁신적·최고·유일·차세대), 경쟁사 실명, 자물쇠·방패 같은 보안 이미지. <!-- bible-allow: 금지 표현 목록 -->
- 숫자·고객 성과·고객 로고·인용은 출처가 확인된 것만. 근거 없는 수치는 넣지 않고 사람에게 확인합니다.
- Gartner 언급·자료는 대표님 검수와 허락 범위 안에서만 씁니다. 새로 넣으려면 PR에 표시합니다.
- 영어 외부 문구에는 엠대시(—)와 큰따옴표를 쓰지 않습니다.

## 6. 끝나면 사람에게 알려 줄 것

- 만든·바꾼 페이지 주소(공개 예정 주소), PR 링크
- 확인한 것(데스크톱·모바일·링크)과 확인 못 한 것
- 사람이 결정해야 할 것(검색 노출, Gartner·숫자 사용, 새 추적 이벤트 등)
