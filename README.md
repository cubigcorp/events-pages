# events.cubig.ai

CUBIG 행사·캠페인 랜딩페이지 저장소입니다. 이 저장소의 `main` 브랜치에 올라간 파일이 그대로 **https://events.cubig.ai** 에 게시됩니다.

---

## 1. 처음이라면: GitHub 용어 5개

| 용어 | 뜻 |
|---|---|
| 저장소(Repository) | 페이지 파일을 모아 두는 공용 폴더. 지금 보고 있는 이 곳 |
| 커밋(Commit) | '저장'. 무엇을 바꿨는지 한 줄 메모와 함께 기록됨 |
| 브랜치(Branch) | 원본을 건드리지 않고 작업하는 사본. `main`이 실제 게시본 |
| 풀 리퀘스트(Pull Request, PR) | '내 사본을 게시본에 합쳐 주세요'라는 요청. 검토 후 합치면 게시됨 |
| GitHub Pages | 저장소 파일을 웹사이트로 보여 주는 기능. events.cubig.ai가 이것 |

> **`main`에 들어가면 1분 안팎으로 바로 공개됩니다.** 그래서 직접 `main`에 저장하지 않고, 브랜치에서 작업한 뒤 PR로 올립니다(아래 3번).

---

## 2. 구조: 폴더 하나 = 페이지 하나

```
events-pages/
├─ index.html            ← events.cubig.ai 첫 화면 (건드리지 않음)
├─ CNAME                 ← 주소 연결 파일 (절대 수정·삭제 금지)
├─ .nojekyll             ← 설정 파일 (수정 금지)
├─ CLAUDE.md             ← Claude가 따르는 작업 규칙 (수정은 마케팅팀 검토 후)
├─ 404.html              ← 없는 주소로 들어왔을 때 보이는 페이지
├─ robots.txt            ← 검색엔진 안내 (_template은 검색 제외)
├─ assets/              ← 공통 파일 (수정은 마케팅팀 검토 후)
│   ├─ site-chrome.js    ← 공통 머리글(CUBIG 로고)·바닥글(정책 링크)
│   └─ cubig-logo.svg
├─ _template/            ← 새 페이지 시작용 틀
│   └─ index.html
├─ webinar-1201/         ← 예시: 페이지 폴더
│   ├─ index.html        ← 페이지 본문 (파일 이름은 꼭 index.html)
│   └─ hero.png          ← 이 페이지에서 쓰는 이미지
└─ ...
```

- 폴더 이름이 곧 주소입니다. `webinar-1201/` → `https://events.cubig.ai/webinar-1201/`
- 폴더 이름 규칙: **영어 소문자·숫자·하이픈(-)만**, 띄어쓰기·한글·대문자 ❌ (예: `ai-ready-summit-2026`)
- 이미지·파일은 그 페이지 폴더 안에 같이 둡니다.
- 틀에는 공통 머리글·바닥글 한 줄(`/assets/site-chrome.js`)이 들어 있습니다. 위에는 CUBIG 로고(누르면 cubig.ai), 아래에는 개인정보처리방침·쿠키정책·문의 링크가 자동으로 붙습니다. 행사 디자인상 빼야 하면 그 줄만 지우되, **정책 링크는 페이지 어딘가에 꼭 남겨 주세요.**

---

## 3. 새 페이지 올리는 방법 (웹 화면만으로)

1. 저장소 첫 화면에서 `_template` 폴더 → `index.html` 을 열고, 오른쪽 위 **Copy raw file**(복사 아이콘)을 눌러 내용을 복사합니다.
2. 저장소 첫 화면 → **Add file → Create new file**
3. 파일 이름 칸에 `폴더이름/index.html` 을 입력합니다(슬래시를 치면 폴더가 생깁니다). 예: `webinar-1201/index.html`
4. 복사한 틀을 붙여 넣고 제목·설명·본문을 고칩니다.
5. 오른쪽 위 **Commit changes** → **Create a new branch for this commit and start a pull request** 선택 → 브랜치 이름은 폴더 이름과 같게 → **Propose changes**
6. 다음 화면에서 **Create pull request** 를 누르고, 슬랙으로 검토 요청을 알립니다.
7. 검토가 끝나 PR이 합쳐지면(Merge) 1분 안팎으로 공개됩니다.

이미지 올리기: 페이지 폴더로 들어가서 **Add file → Upload files** → 파일 끌어다 놓기 → 5번과 같이 새 브랜치 + PR.

고칠 때: 파일 열기 → 연필(Edit) → 수정 → 5번과 같이 새 브랜치 + PR.

---

## 3-1. Claude로 작업할 때 (추천)

**Claude Code(데스크톱 앱·터미널)**
1. 이 저장소를 내 컴퓨터에 받아 그 폴더를 Claude Code로 엽니다. 처음 한 번만: Claude에게 `cubigcorp/events-pages 저장소를 받아서 열어 줘`라고 하면 됩니다.
2. 하고 싶은 일을 그대로 말합니다. 예: `_template으로 12월 웨비나 신청 페이지 만들어 줘. 폴더 이름은 webinar-1201`
3. Claude는 저장소의 `CLAUDE.md` 규칙을 자동으로 읽고, 새 브랜치에서 작업한 뒤 Pull Request까지 올립니다.
4. Claude가 알려 준 PR 링크를 슬랙으로 공유해 검토를 요청합니다. 승인되면 공개됩니다.

**claude.ai(웹 채팅)**
- 웹 채팅은 저장소에 직접 올리지 못합니다. `_template/index.html` 내용을 붙여 넣고 페이지를 만들어 달라고 한 뒤, 받은 HTML을 위 3번 방법(웹 화면)으로 올려 주세요.
- 이때도 ⑤ 추적 코드와 ① 검색 노출 줄(canonical)은 그대로 두라고 Claude에게 말해 주세요.

**Claude에게 시키면 안 되는 것**
- `main`에 바로 올리기, `CNAME`·`assets/`·추적 코드 수정, 이미 공개된 폴더 이름 바꾸기·지우기
- 키·고객 정보·내부 문서를 페이지나 저장소에 넣기

---

## 4. 주의사항

**공개 저장소입니다**
- 이 저장소의 모든 파일과 수정 기록은 누구나 볼 수 있습니다.
- **올리는(push) 순간 공개됩니다.** 브랜치에 올린 초안도 저장소에서 바로 보이고, **나중에 지워도 수정 기록에 남습니다.** 발표 전인 행사·캠페인 초안은 공개해도 되는 시점에 올려 주세요.
- 넣지 말 것
  - API 비밀 키, 폼 서비스의 비공개 토큰, 비밀번호 (GA4 측정 ID·GTM 컨테이너 ID는 공개돼도 괜찮습니다)
  - 리드 목록·참석자 명단 같은 고객 데이터, 고객 실명·연락처
  - 내부 문서·회의 메모, 미공개 가격·계약 내용
  - 원본 디자인 파일(.fig·.psd·.ai)
- 실수로 위 내용을 올렸다면 지우지 말고 먼저 마케팅팀에 알려 주세요. 지워도 기록에 남아 있어서 키 교체 같은 조치가 따로 필요합니다.

**건드리지 말 것**
- `CNAME`(지우면 events.cubig.ai 연결이 끊김), `.nojekyll`, 루트 `index.html`
- 이미 공개된 페이지의 폴더 이름 변경·삭제: 광고·메일에 걸린 링크가 깨집니다. 내릴 때는 먼저 알려 주세요.

**파일**
- 한 파일 100MB 초과 업로드 불가. 영상은 YouTube 등에 올리고 페이지에 넣어 주세요.
- 이미지는 가능하면 1MB 이하(.webp·.jpg 권장)로 줄여 주세요. 페이지가 느려집니다.

**검색 노출**
- **다가오는 행사 페이지는 검색에 나옵니다**(틀 기본값). 'CUBIG Web Summit'처럼 행사 이름으로 찾는 사람이 우리 페이지를 찾을 수 있습니다.
- 그래서 제목·설명·첫 제목에 **행사 이름·날짜·장소**를 넣고, 제품 설명은 짧게 쓴 뒤 공홈(cubig.ai) 페이지로 링크해 주세요. 공홈 문구를 길게 그대로 옮기면 공홈과 같은 검색어에서 순위가 갈립니다.
- 행사가 끝난 뒤에도 검색에 남길지는 마케팅팀이 정합니다. 끄려면 틀의 ① noindex 줄 주석을 풀면 되고, 링크로는 계속 열립니다.
- 검색에 나오는 페이지는 `sitemap.xml`에 주소가 들어 있어야 합니다(Claude가 같이 처리).

**문구·디자인**
- 회사 메시지 기준(CUBIG Bible)에 맞는지 검토 후 공개합니다. 제품 이름 표기: `Syntitan`, `LLM Capsule`, `DTS`

**추적(GA4)**
- 틀(`_template`)의 ⑤ 자리에 GA4 추적 코드가 이미 들어 있습니다. 그대로 두면 방문·유입 경로·외부 링크 클릭·PDF 다운로드가 자동으로 잡힙니다. 지우거나 다른 추적 코드를 추가하지 마세요.
- 버튼 클릭처럼 따로 세고 싶은 행동이 있으면 마케팅팀에 요청해 주세요.

---

## 5. UTM 규칙 (회사 UTM 운영 가이드 기준)

**한 줄 판단: 이 링크를 누르기 전에 사람이 CUBIG 사이트 밖에 있나요?** 예 → UTM 붙임 / 아니오 → UTM 붙이지 않음.

| 링크 | UTM | 예시 |
|---|---|---|
| 메일·SNS·QR·광고 → 이벤트 페이지 | **붙임** | 아래 예시 |
| 이벤트 페이지 → Syntitan·LLM Capsule·cubig.ai | **붙이지 않음** | `https://syntitan.ai/` 그대로 |
| 이벤트 페이지 → 다른 이벤트 페이지 | **붙이지 않음** | |

- 이벤트 페이지(events.cubig.ai)도 CUBIG 사이트입니다. 페이지 안의 제품 버튼에 UTM을 붙이면, 방문자가 원래 들어온 경로(메일·QR·SNS)가 덮여서 지워집니다. 제품으로 넘어간 건 GA4가 자동으로 이어서 셉니다.

**붙이는 값 (모두 영문 소문자, 단어 사이는 하이픈)**

| 파라미터 | 무엇 | 값 |
|---|---|---|
| `utm_source` | 어디서 | `linkedin` · `x` · `youtube` · `outbound`(아웃바운드 메일) · 행사 주최·장소 이름(QR) |
| `utm_medium` | 어떤 방식 | `social` · `video` · `email` · `offline`(행사 QR·인쇄물) · `referral` |
| `utm_campaign` | 어떤 행사 | 행사 폴더 이름과 같게(예: `websummit-2026`) |
| `utm_content` | 같은 행사 안의 구분(선택) | `qr-booth` · `invite-mail-1` · `ceo-post` |

예시
```
메일 초대장:   https://events.cubig.ai/webinar-1201/?utm_source=outbound&utm_medium=email&utm_campaign=webinar-1201&utm_content=invite-mail-1
부스 QR:       https://events.cubig.ai/websummit-2026/?utm_source=websummit&utm_medium=offline&utm_campaign=websummit-2026&utm_content=qr-booth
LinkedIn 게시: https://events.cubig.ai/webinar-1201/?utm_source=linkedin&utm_medium=social&utm_campaign=webinar-1201&utm_content=ceo-post
```

- `utm_term`은 쓰지 않습니다(검색광고 전용).
- 사람 이름·주차로 campaign을 만들지 않습니다.
- QR은 인쇄 전에 휴대폰으로 찍어서 주소창에 UTM이 그대로 남는지 확인합니다.

---

## 6. 신청 폼 넣기 (HubSpot)

폼은 직접 만들지 말고 **HubSpot 폼을 삽입**합니다. 제출 내용이 바로 HubSpot 연락처로 들어가기 때문입니다.

1. HubSpot → **Marketing → Forms**에서 폼을 만들거나 기존 폼을 고릅니다. 폼 이름은 행사 폴더 이름을 넣어 구분합니다(예: `[Event] webinar-1201 registration`).
2. 개인정보 동의 문구를 켜 둡니다(폼 설정의 데이터 개인정보 보호·동의 옵션). 유럽 방문자도 들어오는 페이지입니다.
3. 제출 뒤 동작을 정합니다: 감사 문구 표시 또는 감사 페이지로 이동.
4. 폼을 게시(Publish)한 뒤 **Share → Embed code**를 눌러 나오는 코드를 **그대로 복사**합니다. 코드를 직접 고치거나 새로 쓰지 않습니다.
5. 페이지 본문의 폼이 들어갈 자리(틀의 ⑦ 주석 위치)에 붙여 넣고, 로컬 미리보기에서 폼이 보이는지·제출이 되는지 확인합니다. 테스트 제출은 HubSpot에서 지워 주세요.
6. PR에 '신청 폼 있음 + 폼 이름'을 적어 주세요. 마케팅팀이 GA4에서 신청 완료를 셀 수 있게 설정합니다.

- 폼 삽입 코드 안의 계정 번호(portal ID)·폼 ID는 공개돼도 괜찮습니다. HubSpot 로그인 정보·API 키는 절대 넣지 않습니다.

---

## 7. 문의

권한·게시·추적 관련 문의는 마케팅팀 슬랙으로 남겨 주세요.
