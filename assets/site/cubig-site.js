/* cubig.ai 공홈 머리글·바닥글 (events.cubig.ai) — tools/sync_site_chrome.py 가 만든 파일. 손으로 고치지 말고 도구를 다시 돌리세요.
   페이지 <head> 에 <link rel="stylesheet" href="/assets/site/cubig-site.css"> + <script src="/assets/site/cubig-site.js" defer></script>. */
(function(){var r=document.documentElement,e=['pointermove','pointerdown','keydown','touchstart','wheel','focusin'];
    function f(){r.classList.add('nav-ready');e.forEach(function(v){window.removeEventListener(v,f,true);});}
    e.forEach(function(v){window.addEventListener(v,f,{capture:true,passive:true});});})();
(function () {
  var CHROME = {"en": {"hd": "<header class=\"site-header\" id=\"site-header\"><nav aria-label=\"Main\" class=\"site-header__nav\" id=\"site-nav\"><!-- Menu Wrapper --><div class=\"site-header__menu-wrapper\"><!-- nav-group --><div class=\"site-header__nav-group\"><!-- nav-top: the visible top bar --><div class=\"site-header__nav-top\"><!-- nav-menu: max-width 1168px row --><div class=\"site-header__nav-menu\"><!-- Left block: logo --><div class=\"site-header__left-block\"><a aria-label=\"CUBIG LOGO\" class=\"site-header__logo\" data-link-id=\"nav_logo\" href=\"https://cubig.ai/\"><img alt=\"CUBIG\" class=\"site-header__logo-img\" height=\"28\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/cubig.svg?v=21b075f454\" width=\"153\"/></a></div><!-- Center block: nav links (design-play global nav) --><div class=\"site-header__center-block\"><div aria-label=\"Primary Navigation\" class=\"nav-links\" id=\"primary-nav\" role=\"navigation\"><div class=\"nav-links__items\"><!-- Platform → dropdown (Syntitan) --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"platform\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_syntitan\" href=\"https://cubig.ai/syntitan/\"><span>Platform</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Capabilities → dropdown (DTS, LLM Capsule) --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"capabilities\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_llmcapsule\" href=\"https://cubig.ai/llmcapsule/\"><span>Capabilities</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Proof → mega dropdown (Gartner 인정 feature, 2026-07-13) --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"proof\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_proof\" href=\"https://cubig.ai/proof/\"><span>Proof</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Learn → dropdown --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"learn\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_blogs\" href=\"https://cubig.ai/blogs/\"><span>Learn</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Company → mega dropdown --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"company\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_company\" href=\"https://cubig.ai/company/\"><span>Company</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div></div></div></div><!-- Right block: language + buttons --><div class=\"site-header__right-block\"><!-- Language selector --><details aria-label=\"English\" class=\"nav-lang\"><summary class=\"nav-lang__summary\"><svg class=\"nav-lang__globe\" fill=\"rgb(0,0,0)\" height=\"24\" viewbox=\"0 0 256 256\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.63,96H175.8c-1.41-28.46-10.27-55.47-25.12-77A88.2,88.2,0,0,1,215.63,120ZM128,215.89c-18.73-20.27-30.09-49-31.77-79.89h63.54C158.09,166.87,146.73,195.62,128,215.89ZM96.23,120c1.68-30.87,13-59.62,31.77-79.89,18.73,20.27,30.09,49,31.77,79.89Zm9.09-77C90.47,64.53,81.61,91.54,80.2,120H40.37A88.2,88.2,0,0,1,105.32,43ZM40.37,136H80.2c1.41,28.46,10.27,55.47,25.12,77A88.2,88.2,0,0,1,40.37,136Zm110.31,77c14.85-21.56,23.71-48.57,25.12-77h39.83A88.2,88.2,0,0,1,150.68,213Z\"></path></svg><span class=\"nav-lang__current\">English</span><svg class=\"nav-lang__caret\" height=\"12\" viewbox=\"0 0 12 12\" width=\"12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 2 4.5 L 6 8.5 L 10 4.5\" fill=\"none\" stroke=\"rgb(153, 153, 153)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path></svg></summary><div class=\"nav-lang__menu\" role=\"menu\"><a class=\"nav-lang__option is-current\" data-cubig-lang=\"en\" href=\"https://cubig.ai/events/\" hreflang=\"en\" role=\"menuitem\">\n                                        English                                    </a><a class=\"nav-lang__option\" data-cubig-lang=\"ko\" href=\"https://cubig.ai/ko/events/\" hreflang=\"ko\" role=\"menuitem\">\n                                        한국어                                    </a></div></details><!-- Contact button --><a class=\"cs-btn cs-btn--contact\" data-link-id=\"nav_top_contact\" href=\"https://cubig.ai/contact/\">Contact</a><!-- Try it on your data button (primary CTA → Syntitan product) --><a class=\"cs-btn cs-btn--dark\" data-cta-id=\"syntitan_try_own_data\" data-cta-location=\"header\" data-entry-reason=\"none\" data-product=\"syntitan\" href=\"https://syntitan.ai/home?intent=own_data\" rel=\"noopener\" target=\"_blank\">Try it on your data</a></div></div></div><!-- nav-mega: contained dropdown cards (design-play) --><!-- Platform --><div class=\"nav-mega\" data-mega-panel=\"platform\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_syntitan\" href=\"https://cubig.ai/syntitan/\"><span class=\"nav-mega__title\"><img alt=\"\" aria-hidden=\"true\" class=\"nav-mega__logo nav-mega__logo--syntitan\" decoding=\"async\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/syntitan-logo.svg?v=9951822b3b\"/><span class=\"nav-mega__ttext\">Syntitan</span></span><span class=\"nav-mega__desc\">AI-ready data platform</span></a></div></div><a class=\"nav-mega__feature\" data-link-id=\"nav_mega_feature_syntitan\" href=\"https://cubig.ai/syntitan/\"><div class=\"nav-mega__feature-media nav-mega__feature-media--syntitan\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">Platform</span><p class=\"nav-mega__feature-title\">Syntitan</p><p class=\"nav-mega__feature-note\">The AI-ready data platform that prepares and checks data for the AI work you chose.</p><span class=\"nav-mega__feature-cta\">Explore →</span></div></a></div></div><!-- Capabilities --><div class=\"nav-mega\" data-mega-panel=\"capabilities\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_llmcapsule\" href=\"https://cubig.ai/llmcapsule/\"><span class=\"nav-mega__title\"><img alt=\"\" aria-hidden=\"true\" class=\"nav-mega__logo nav-mega__logo--capsule\" decoding=\"async\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/llmcapsule-logo-bk.svg?v=3689236a9b\"/><span class=\"nav-mega__ttext\">LLM Capsule</span></span><span class=\"nav-mega__desc\">Context-preserving data layer for AI</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_dts\" href=\"https://cubig.ai/dts/\"><span class=\"nav-mega__title\"><img alt=\"\" aria-hidden=\"true\" class=\"nav-mega__logo nav-mega__logo--dts\" decoding=\"async\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/dts/hero-logo-dark.svg?v=f2ebecacea\"/><span class=\"nav-mega__ttext\">DTS</span></span><span class=\"nav-mega__desc\">Data Enablement for AI</span></a></div></div><a class=\"nav-mega__feature\" data-link-id=\"nav_mega_feature_news_cubigs_llm_capsule_wins_runner_up_at_t_challenge_2026_the_\" href=\"https://cubig.ai/news/cubigs-llm-capsule-wins-runner-up-at-t-challenge-2026-the-deutsche-telekom-x-t-mobile-us-global-innovation-program/\"><div class=\"nav-mega__feature-media nav-mega__feature-media--capsule\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">LLM Capsule</span><p class=\"nav-mega__feature-title\">Runner-up at T-Challenge 2026</p><p class=\"nav-mega__feature-note\">LLM Capsule named runner-up in the Deutsche Telekom &amp; T-Mobile US global innovation program.</p><span class=\"nav-mega__feature-cta\">Read the news →</span></div></a></div></div><!-- Proof (Gartner 인정 feature, 2026-07-13) --><div class=\"nav-mega\" data-mega-panel=\"proof\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_proof\" href=\"https://cubig.ai/proof/\"><span class=\"nav-mega__title\">Proof</span><span class=\"nav-mega__desc\">See the real results and evidence</span></a></div></div><a class=\"nav-mega__feature\" data-link-id=\"nav_mega_feature_news_cubig_gartner_recognition_ai_ready_data\" href=\"https://cubig.ai/news/cubig-gartner-recognition-ai-ready-data/\"><div class=\"nav-mega__feature-media nav-mega__feature-media--gartner\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">Gartner 2026</span><p class=\"nav-mega__feature-title\">Named in three 2026 Gartner® agentic AI reports</p><p class=\"nav-mega__feature-note\">CUBIG's AI-Ready Data Operating Layer cited as a Tech Innovator in Gartner's 2026 report on Agentic AI solution accelerators.</p><span class=\"nav-mega__feature-cta\">Read the news →</span></div></a></div></div><!-- Learn --><div class=\"nav-mega\" data-mega-panel=\"learn\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_learn\" href=\"https://cubig.ai/learn/\"><span class=\"nav-mega__title\">Learn Hub</span><span class=\"nav-mega__desc\">Start here</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_blogs\" href=\"https://cubig.ai/blogs/\"><span class=\"nav-mega__title\">Blog</span><span class=\"nav-mega__desc\">In-depth perspectives</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_articles\" href=\"https://cubig.ai/articles/\"><span class=\"nav-mega__title\">Articles</span><span class=\"nav-mega__desc\">Practical guides and insights</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_glossary\" href=\"https://cubig.ai/glossary/\"><span class=\"nav-mega__title\">Glossary</span><span class=\"nav-mega__desc\">Key terms in AI-Ready data</span></a></div></div><div class=\"nav-mega__feature\"><div class=\"nav-mega__feature-media\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">Learn</span><p class=\"nav-mega__feature-title\">AI Insights</p><p class=\"nav-mega__feature-note\">CUBIG perspectives and practical insights on AI, AI-Ready data, and enterprise transformation.</p></div></div></div></div><!-- Company --><div class=\"nav-mega\" data-mega-panel=\"company\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_company\" href=\"https://cubig.ai/company/\"><span class=\"nav-mega__title\">About</span><span class=\"nav-mega__desc\">Our mission and team</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_news\" href=\"https://cubig.ai/news/\"><span class=\"nav-mega__title\">News</span><span class=\"nav-mega__desc\">Announcements from CUBIG</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_press\" href=\"https://cubig.ai/press/\"><span class=\"nav-mega__title\">Press</span><span class=\"nav-mega__desc\">Coverage, press kit and media contact</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_events\" href=\"https://cubig.ai/events/\"><span class=\"nav-mega__title\">Events</span><span class=\"nav-mega__desc\">Where to meet the CUBIG team</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_careers\" href=\"https://cubig.ai/careers/\"><span class=\"nav-mega__title\">Careers<svg aria-hidden=\"true\" class=\"nav-ext-arrow\" fill=\"none\" focusable=\"false\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M17 7l-10 10\"></path><path d=\"M8 7l9 0l0 9\"></path></svg></span><span class=\"nav-mega__desc\">Open roles and how we work</span></a></div></div><div class=\"nav-mega__feature\"><div class=\"nav-mega__feature-media nav-mega__feature-media--ceo\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">CEO</span><p class=\"nav-mega__feature-title\">Ho Bae</p><p class=\"nav-mega__feature-note\">Building the missing layer for enterprise AI. CUBIG builds the AI-Ready Data Operating Layer that turns sensitive, fragmented, and unusable data into AI-Ready, operable data.</p></div></div></div></div><!-- BG Blur overlay (kept for header :has() rules; hidden by global-overrides) --><div class=\"nav-mega__bg-blur\" id=\"nav-mega-blur\"></div></div></div><script>\n        /* Pre-anchor each mega panel's left during parse — before main.js (footer)\n           binds. Without this, a hover handled by the CSS :has() fallback shows the\n           panel at its CSS default (left:0, far left) for a frame, then main.js\n           snaps it under the trigger. main.js re-anchors on resize / fonts.ready. */\n        (function () {\n            var ng = document.querySelector('.site-header__nav-group');\n            /* 11-02 속도: 900px 이하는 메가 메뉴가 숨겨져 있어 위치 계산이 필요 없음(휴대폰 첫 로딩 강제 레이아웃 ❌, 넓히면 main.js가 다시 맞춤) */\n            if (!ng || (window.matchMedia && window.matchMedia('(max-width: 900px)').matches)) return;\n            var ngLeft = ng.getBoundingClientRect().left;\n            document.querySelectorAll('.nav-links__dropdown--mega[data-mega-target]').forEach(function (t) {\n                var p = document.querySelector('.nav-mega[data-mega-panel=\"' + t.getAttribute('data-mega-target') + '\"]');\n                if (p) p.style.left = (t.getBoundingClientRect().left - ngLeft) + 'px';\n            });\n        })();\n        </script><button aria-controls=\"mobile-drawer\" aria-expanded=\"false\" aria-label=\"Toggle menu\" class=\"nav-toggle\"><span class=\"nav-toggle__bar\"></span><span class=\"nav-toggle__bar\"></span><span class=\"nav-toggle__bar\"></span></button><!-- Mobile drawer: full-screen grouped menu (데스크탑 GNB IA와 동일하게 구성) --><div aria-hidden=\"true\" class=\"nav-mobile\" id=\"mobile-drawer\"><div class=\"nav-mobile__bar\"><a aria-label=\"CUBIG LOGO\" class=\"nav-mobile__logo\" data-link-id=\"nav_m_home\" href=\"https://cubig.ai/\"><img alt=\"CUBIG\" loading=\"lazy\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/cubig.svg?v=21b075f454\"/></a><div class=\"nav-mobile__bar-right\"><div aria-label=\"Language\" class=\"nav-lang-inline\" role=\"group\"><svg aria-hidden=\"true\" class=\"nav-lang-inline__globe\" fill=\"currentColor\" focusable=\"false\" height=\"18\" viewbox=\"0 0 256 256\" width=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.63,96H175.8c-1.41-28.46-10.27-55.47-25.12-77A88.2,88.2,0,0,1,215.63,120ZM128,215.89c-18.73-20.27-30.09-49-31.77-79.89h63.54C158.09,166.87,146.73,195.62,128,215.89ZM96.23,120c1.68-30.87,13-59.62,31.77-79.89,18.73,20.27,30.09,49,31.77,79.89Zm9.09-77C90.47,64.53,81.61,91.54,80.2,120H40.37A88.2,88.2,0,0,1,105.32,43ZM40.37,136H80.2c1.41,28.46,10.27,55.47,25.12,77A88.2,88.2,0,0,1,40.37,136Zm110.31,77c14.85-21.56,23.71-48.57,25.12-77h39.83A88.2,88.2,0,0,1,150.68,213Z\"></path></svg><a aria-current=\"true\" class=\"nav-lang-inline__opt is-current\" data-cubig-lang=\"en\" href=\"https://cubig.ai/events/\" hreflang=\"en\">EN</a><a class=\"nav-lang-inline__opt\" data-cubig-lang=\"ko\" href=\"https://cubig.ai/ko/events/\" hreflang=\"ko\">KO</a></div><button aria-label=\"Close menu\" class=\"nav-mobile__close\" type=\"button\"><svg fill=\"none\" height=\"24\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\"><line x1=\"18\" x2=\"6\" y1=\"6\" y2=\"18\"></line><line x1=\"6\" x2=\"18\" y1=\"6\" y2=\"18\"></line></svg></button></div></div><div class=\"nav-mobile__inner\"><!-- CTA 버튼 (최상단, 2열) --><div class=\"nav-mobile__actions nav-mobile__actions--top\"><a class=\"nav-mobile__btn nav-mobile__btn--outline\" data-link-id=\"nav_m_contact\" href=\"https://cubig.ai/contact/\">Contact</a><a class=\"nav-mobile__btn nav-mobile__btn--dark\" data-cta-id=\"syntitan_try_own_data\" data-cta-location=\"header-mobile\" data-entry-reason=\"none\" data-product=\"syntitan\" href=\"https://syntitan.ai/home?intent=own_data\" rel=\"noopener\" target=\"_blank\">Try it on your data</a></div><!-- 플랫폼 --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">Platform</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_syntitan\" href=\"https://cubig.ai/syntitan/\">Syntitan</a></div><!-- 제품 (Capabilities) --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">Capabilities</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_llmcapsule\" href=\"https://cubig.ai/llmcapsule/\">LLM Capsule</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_dts\" href=\"https://cubig.ai/dts/\">DTS</a></div><!-- 신뢰 증거 (Proof) --><div class=\"nav-mobile__group\"><a class=\"nav-mobile__link nav-mobile__link--solo\" data-link-id=\"nav_m_proof\" href=\"https://cubig.ai/proof/\">Proof</a></div><!-- 자료 (Learn) --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">Learn</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_learn\" href=\"https://cubig.ai/learn/\">Learn Hub</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_blogs\" href=\"https://cubig.ai/blogs/\">Blog</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_articles\" href=\"https://cubig.ai/articles/\">Articles</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_glossary\" href=\"https://cubig.ai/glossary/\">Glossary</a></div><!-- 회사 (Company) --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">Company</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_company\" href=\"https://cubig.ai/company/\">About</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_news\" href=\"https://cubig.ai/news/\">News</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_press\" href=\"https://cubig.ai/press/\">Press</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_events\" href=\"https://cubig.ai/events/\">Events</a><a class=\"nav-mobile__link nav-mobile__link--ext\" data-link-id=\"nav_m_careers\" href=\"https://cubig.ai/careers/\">Careers<svg aria-hidden=\"true\" class=\"nav-ext-arrow\" fill=\"none\" focusable=\"false\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M17 7l-10 10\"></path><path d=\"M8 7l9 0l0 9\"></path></svg></a></div></div></div></nav></header>", "ft": "<footer class=\"site-footer\"><!-- Main footer (light) --><div class=\"footer-main section--white\"><div class=\"container footer-main__inner\"><div class=\"footer-main__brand\"><img alt=\"CUBIG\" class=\"footer-main__logo\" decoding=\"async\" height=\"17\" loading=\"lazy\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/cubig.svg?v=21b075f454\" width=\"100\"/></div><div class=\"footer-main__columns\"><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">Platform</h3><ul><li><a data-link-id=\"footer_syntitan\" href=\"https://cubig.ai/syntitan/\">Syntitan</a></li></ul></div><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">Capabilities</h3><ul><li><a data-link-id=\"footer_llmcapsule\" href=\"https://cubig.ai/llmcapsule/\">LLM Capsule</a></li><li><a data-link-id=\"footer_dts\" href=\"https://cubig.ai/dts/\">DTS</a></li></ul></div><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">Proof &amp; Learn</h3><ul><li><a data-link-id=\"footer_proof\" href=\"https://cubig.ai/proof/\">Proof</a></li><li><a data-link-id=\"footer_learn\" href=\"https://cubig.ai/learn/\">Learn Hub</a></li><li><a data-link-id=\"footer_blogs\" href=\"https://cubig.ai/blogs/\">Blog</a></li><li><a data-link-id=\"footer_articles\" href=\"https://cubig.ai/articles/\">Articles</a></li><li><a data-link-id=\"footer_glossary\" href=\"https://cubig.ai/glossary/\">Glossary</a></li></ul></div><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">Company</h3><ul><li><a data-link-id=\"footer_company\" href=\"https://cubig.ai/company/\">About</a></li><li><a data-link-id=\"footer_careers\" href=\"https://cubig.ai/careers/\">Careers</a></li><li><a data-link-id=\"footer_news\" href=\"https://cubig.ai/news/\">News</a></li><li><a data-link-id=\"footer_press\" href=\"https://cubig.ai/press/\">Press</a></li><li><a data-link-id=\"footer_events\" href=\"https://cubig.ai/events/\">Events</a></li></ul></div><div class=\"footer-main__col footer-main__col--connect\"><h3 class=\"footer-main__heading\">Connect</h3><ul><li><a data-link-id=\"footer_contact\" href=\"https://cubig.ai/contact/\">Contact</a></li><li><a href=\"https://www.linkedin.com/company/cubig-corp/\" rel=\"noopener noreferrer\" target=\"_blank\">LinkedIn</a></li><li><a href=\"https://medium.com/cubig-tech-blog\" rel=\"noopener noreferrer\" target=\"_blank\">Medium</a></li><li><a href=\"https://www.youtube.com/@cubig_corp\" rel=\"noopener noreferrer\" target=\"_blank\">YouTube</a></li><li><a href=\"https://www.instagram.com/cubig.ai_official/\" rel=\"noopener noreferrer\" target=\"_blank\">Instagram</a></li><li><a href=\"https://blog.naver.com/cubig_\" rel=\"noopener noreferrer\" target=\"_blank\">Naver Blog</a></li><li><a href=\"https://x.com/CUBIG_AI\" rel=\"noopener noreferrer\" target=\"_blank\">X (Twitter)</a></li></ul></div></div></div><!-- Addresses row (below main columns) --><div class=\"container footer-main__addresses\"><p class=\"footer-main__entity\"><strong>CUBIG LTD (United Kingdom)</strong><br/>\n                    Company Number: NI735459<br/>\n                    21 Arthur Street, Belfast, Antrim, United Kingdom, BT1 4GA\n                </p><p class=\"footer-main__entity\"><strong>CUBIG CORP (Republic of Korea)</strong><br/>\n                    Business Registration: 133-81-45679<br/>\n                    E-Commerce Registration: 2023-Seoul-Seocho-2822<br/>\n                    4F, NAVER 1784, 95, Jeongjail-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea<br/>\n                    Tel <a href=\"tel:+82-2-582-1113\">+82-2-582-1113</a> · Email <a href=\"/cdn-cgi/l/email-protection#f2919d9c86939186b29187909b95dc939b\"><span class=\"__cf_email__\" data-cfemail=\"d9bab6b7adb8baad99baacbbb0bef7b8b0\">[email protected]</span></a></p></div></div><!-- Bottom row --><div class=\"footer-bottom section--white\"><div class=\"container footer-bottom__inner\"><span class=\"footer-bottom__copy\">©️ 2026 CUBIG Corp. All Rights Reserved.</span><div class=\"footer-bottom__links\"><a data-link-id=\"footer_cookie_policy\" href=\"https://cubig.ai/cookie-policy/\">Cookie Policy</a><a data-link-id=\"footer_privacy_policy\" href=\"https://cubig.ai/privacy-policy/\">Privacy Policy</a><button class=\"footer-bottom__choice\" data-consent-open=\"\" type=\"button\">Cookie settings</button><button class=\"footer-bottom__choice footer-bottom__choice--us\" data-consent-open=\"\" hidden=\"\" type=\"button\">Do Not Sell or Share My Personal Information</button></div></div><div class=\"container footer-bottom__gartner\">Gartner does not endorse any vendor, product or service depicted in its research publications. GARTNER is a registered trademark of Gartner, Inc. and/or its affiliates.</div></div></footer>"}, "ko": {"hd": "<header class=\"site-header\" id=\"site-header\"><nav aria-label=\"주 메뉴\" class=\"site-header__nav\" id=\"site-nav\"><!-- Menu Wrapper --><div class=\"site-header__menu-wrapper\"><!-- nav-group --><div class=\"site-header__nav-group\"><!-- nav-top: the visible top bar --><div class=\"site-header__nav-top\"><!-- nav-menu: max-width 1168px row --><div class=\"site-header__nav-menu\"><!-- Left block: logo --><div class=\"site-header__left-block\"><a aria-label=\"CUBIG LOGO\" class=\"site-header__logo\" data-link-id=\"nav_logo\" href=\"https://cubig.ai/ko/\"><img alt=\"CUBIG\" class=\"site-header__logo-img\" height=\"28\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/cubig.svg?v=21b075f454\" width=\"153\"/></a></div><!-- Center block: nav links (design-play global nav) --><div class=\"site-header__center-block\"><div aria-label=\"Primary Navigation\" class=\"nav-links\" id=\"primary-nav\" role=\"navigation\"><div class=\"nav-links__items\"><!-- Platform → dropdown (Syntitan) --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"platform\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_syntitan\" href=\"https://cubig.ai/ko/syntitan/\"><span>플랫폼</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Capabilities → dropdown (DTS, LLM Capsule) --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"capabilities\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_llmcapsule\" href=\"https://cubig.ai/ko/llmcapsule/\"><span>역량</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Proof → mega dropdown (Gartner 인정 feature, 2026-07-13) --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"proof\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_proof\" href=\"https://cubig.ai/ko/proof/\"><span>신뢰 증거</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Learn → dropdown --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"learn\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_blogs\" href=\"https://cubig.ai/ko/blogs/\"><span>자료</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div><!-- Company → mega dropdown --><div class=\"nav-links__item nav-links__dropdown nav-links__dropdown--mega\" data-mega-target=\"company\"><a class=\"nav-links__trigger\" data-link-id=\"nav_top_company\" href=\"https://cubig.ai/ko/company/\"><span>회사</span><span class=\"nav-links__chevron\"><svg fill=\"none\" height=\"24\" stroke=\"rgb(23, 23, 25)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><polyline points=\"6 9 12 15 18 9\"></polyline></svg></span></a></div></div></div></div><!-- Right block: language + buttons --><div class=\"site-header__right-block\"><!-- Language selector --><details aria-label=\"한국어\" class=\"nav-lang\"><summary class=\"nav-lang__summary\"><svg class=\"nav-lang__globe\" fill=\"rgb(0,0,0)\" height=\"24\" viewbox=\"0 0 256 256\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.63,96H175.8c-1.41-28.46-10.27-55.47-25.12-77A88.2,88.2,0,0,1,215.63,120ZM128,215.89c-18.73-20.27-30.09-49-31.77-79.89h63.54C158.09,166.87,146.73,195.62,128,215.89ZM96.23,120c1.68-30.87,13-59.62,31.77-79.89,18.73,20.27,30.09,49,31.77,79.89Zm9.09-77C90.47,64.53,81.61,91.54,80.2,120H40.37A88.2,88.2,0,0,1,105.32,43ZM40.37,136H80.2c1.41,28.46,10.27,55.47,25.12,77A88.2,88.2,0,0,1,40.37,136Zm110.31,77c14.85-21.56,23.71-48.57,25.12-77h39.83A88.2,88.2,0,0,1,150.68,213Z\"></path></svg><span class=\"nav-lang__current\">한국어</span><svg class=\"nav-lang__caret\" height=\"12\" viewbox=\"0 0 12 12\" width=\"12\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M 2 4.5 L 6 8.5 L 10 4.5\" fill=\"none\" stroke=\"rgb(153, 153, 153)\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"1.5\"></path></svg></summary><div class=\"nav-lang__menu\" role=\"menu\"><a class=\"nav-lang__option\" data-cubig-lang=\"en\" href=\"https://cubig.ai/events/\" hreflang=\"en\" role=\"menuitem\">\n                                        English                                    </a><a class=\"nav-lang__option is-current\" data-cubig-lang=\"ko\" href=\"https://cubig.ai/ko/events/\" hreflang=\"ko\" role=\"menuitem\">\n                                        한국어                                    </a></div></details><!-- Contact button --><a class=\"cs-btn cs-btn--contact\" data-link-id=\"nav_top_contact\" href=\"https://cubig.ai/ko/contact/\">문의하기</a><!-- Try it on your data button (primary CTA → Syntitan product) --><a class=\"cs-btn cs-btn--dark\" data-cta-id=\"syntitan_try_own_data\" data-cta-location=\"header\" data-entry-reason=\"none\" data-product=\"syntitan\" href=\"https://syntitan.ai/home?intent=own_data\" rel=\"noopener\" target=\"_blank\">내 데이터로 직접 해보기</a></div></div></div><!-- nav-mega: contained dropdown cards (design-play) --><!-- Platform --><div class=\"nav-mega\" data-mega-panel=\"platform\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_syntitan\" href=\"https://cubig.ai/ko/syntitan/\"><span class=\"nav-mega__title\"><img alt=\"\" aria-hidden=\"true\" class=\"nav-mega__logo nav-mega__logo--syntitan\" decoding=\"async\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/syntitan-logo.svg?v=9951822b3b\"/><span class=\"nav-mega__ttext\">Syntitan</span></span><span class=\"nav-mega__desc\">AI-ready data platform</span></a></div></div><a class=\"nav-mega__feature\" data-link-id=\"nav_mega_feature_syntitan\" href=\"https://cubig.ai/ko/syntitan/\"><div class=\"nav-mega__feature-media nav-mega__feature-media--syntitan\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">플랫폼</span><p class=\"nav-mega__feature-title\">Syntitan</p><p class=\"nav-mega__feature-note\">AI 업무에 맞게 데이터를 준비·검증하는 AI-ready data platform.</p><span class=\"nav-mega__feature-cta\">자세히 보기 →</span></div></a></div></div><!-- Capabilities --><div class=\"nav-mega\" data-mega-panel=\"capabilities\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_llmcapsule\" href=\"https://cubig.ai/ko/llmcapsule/\"><span class=\"nav-mega__title\"><img alt=\"\" aria-hidden=\"true\" class=\"nav-mega__logo nav-mega__logo--capsule\" decoding=\"async\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/llmcapsule-logo-bk.svg?v=3689236a9b\"/><span class=\"nav-mega__ttext\">LLM Capsule</span></span><span class=\"nav-mega__desc\">AI를 위한 컨텍스트 보존 데이터 레이어</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_dts\" href=\"https://cubig.ai/ko/dts/\"><span class=\"nav-mega__title\"><img alt=\"\" aria-hidden=\"true\" class=\"nav-mega__logo nav-mega__logo--dts\" decoding=\"async\" loading=\"eager\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/dts/hero-logo-dark.svg?v=f2ebecacea\"/><span class=\"nav-mega__ttext\">DTS</span></span><span class=\"nav-mega__desc\">Data Enablement for AI</span></a></div></div><a class=\"nav-mega__feature\" data-link-id=\"nav_mega_feature_news_ai_ready_data_cubig_t_challenge_2026\" href=\"https://cubig.ai/ko/news/ai-ready-data-cubig-t-challenge-2026/\"><div class=\"nav-mega__feature-media nav-mega__feature-media--capsule\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">LLM Capsule</span><p class=\"nav-mega__feature-title\">T-Challenge 2026 준우승</p><p class=\"nav-mega__feature-note\">LLM Capsule이 Deutsche Telekom·T-Mobile US 글로벌 혁신 프로그램에서 준우승.</p><span class=\"nav-mega__feature-cta\">뉴스 보기 →</span></div></a></div></div><!-- Proof (Gartner 인정 feature, 2026-07-13) --><div class=\"nav-mega\" data-mega-panel=\"proof\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_proof\" href=\"https://cubig.ai/ko/proof/\"><span class=\"nav-mega__title\">신뢰 증거</span><span class=\"nav-mega__desc\">실제 결과와 증거를 확인</span></a></div></div><a class=\"nav-mega__feature\" data-link-id=\"nav_mega_feature_news_cubig_gartner_recognition_ai_ready_data\" href=\"https://cubig.ai/news/cubig-gartner-recognition-ai-ready-data/\"><div class=\"nav-mega__feature-media nav-mega__feature-media--gartner\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">Gartner 2026</span><p class=\"nav-mega__feature-title\">2026 Gartner® 에이전틱 AI 리포트 3건</p><p class=\"nav-mega__feature-note\">CUBIG의 AI-Ready Data Operating Layer가 2026 Gartner Agentic AI 솔루션 액셀러레이터 리포트에 Tech Innovator로 언급됐습니다.</p><span class=\"nav-mega__feature-cta\">뉴스 보기 →</span></div></a></div></div><!-- Learn --><div class=\"nav-mega\" data-mega-panel=\"learn\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_learn\" href=\"https://cubig.ai/ko/learn/\"><span class=\"nav-mega__title\">학습 허브</span><span class=\"nav-mega__desc\">여기서 시작하세요</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_blogs\" href=\"https://cubig.ai/ko/blogs/\"><span class=\"nav-mega__title\">블로그</span><span class=\"nav-mega__desc\">심층 관점과 분석</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_articles\" href=\"https://cubig.ai/ko/articles/\"><span class=\"nav-mega__title\">아티클</span><span class=\"nav-mega__desc\">실무 가이드와 인사이트</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_glossary\" href=\"https://cubig.ai/ko/glossary/\"><span class=\"nav-mega__title\">용어집</span><span class=\"nav-mega__desc\">AI-Ready 데이터 핵심 용어</span></a></div></div><div class=\"nav-mega__feature\"><div class=\"nav-mega__feature-media\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">자료</span><p class=\"nav-mega__feature-title\">AI Insights</p><p class=\"nav-mega__feature-note\">AI와 AI-Ready 데이터, 기업 전환에 대한 CUBIG 전문가의 관점과 실무 인사이트.</p></div></div></div></div><!-- Company --><div class=\"nav-mega\" data-mega-panel=\"company\"><div class=\"nav-mega__inner has-feature\"><div class=\"nav-mega__link-wrapper\"><div class=\"nav-mega__links\"><a class=\"nav-mega__link\" data-link-id=\"nav_mega_company\" href=\"https://cubig.ai/ko/company/\"><span class=\"nav-mega__title\">회사 소개</span><span class=\"nav-mega__desc\">CUBIG의 미션과 팀</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_news\" href=\"https://cubig.ai/ko/news/\"><span class=\"nav-mega__title\">뉴스</span><span class=\"nav-mega__desc\">CUBIG이 직접 알리는 소식</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_press\" href=\"https://cubig.ai/ko/press/\"><span class=\"nav-mega__title\">프레스</span><span class=\"nav-mega__desc\">언론 보도·프레스킷·언론 문의</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_events\" href=\"https://cubig.ai/ko/events/\"><span class=\"nav-mega__title\">행사</span><span class=\"nav-mega__desc\">참여 행사와 미팅 신청</span></a><a class=\"nav-mega__link\" data-link-id=\"nav_mega_careers\" href=\"https://cubig.ai/ko/careers/\"><span class=\"nav-mega__title\">채용<svg aria-hidden=\"true\" class=\"nav-ext-arrow\" fill=\"none\" focusable=\"false\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M17 7l-10 10\"></path><path d=\"M8 7l9 0l0 9\"></path></svg></span><span class=\"nav-mega__desc\">함께할 동료를 찾습니다</span></a></div></div><div class=\"nav-mega__feature\"><div class=\"nav-mega__feature-media nav-mega__feature-media--ceo\"></div><div class=\"nav-mega__feature-body\"><span class=\"nav-mega__feature-tag\">대표</span><p class=\"nav-mega__feature-title\">배호</p><p class=\"nav-mega__feature-note\">엔터프라이즈 AI에 비어 있던 계층을 채웁니다. CUBIG은 민감하고 흩어져 쓸 수 없던 데이터를 AI가 운영에 쓸 수 있는 데이터로 바꾸는 AI-Ready Data Operating Layer를 만듭니다.</p></div></div></div></div><!-- BG Blur overlay (kept for header :has() rules; hidden by global-overrides) --><div class=\"nav-mega__bg-blur\" id=\"nav-mega-blur\"></div></div></div><script>\n        /* Pre-anchor each mega panel's left during parse — before main.js (footer)\n           binds. Without this, a hover handled by the CSS :has() fallback shows the\n           panel at its CSS default (left:0, far left) for a frame, then main.js\n           snaps it under the trigger. main.js re-anchors on resize / fonts.ready. */\n        (function () {\n            var ng = document.querySelector('.site-header__nav-group');\n            /* 11-02 속도: 900px 이하는 메가 메뉴가 숨겨져 있어 위치 계산이 필요 없음(휴대폰 첫 로딩 강제 레이아웃 ❌, 넓히면 main.js가 다시 맞춤) */\n            if (!ng || (window.matchMedia && window.matchMedia('(max-width: 900px)').matches)) return;\n            var ngLeft = ng.getBoundingClientRect().left;\n            document.querySelectorAll('.nav-links__dropdown--mega[data-mega-target]').forEach(function (t) {\n                var p = document.querySelector('.nav-mega[data-mega-panel=\"' + t.getAttribute('data-mega-target') + '\"]');\n                if (p) p.style.left = (t.getBoundingClientRect().left - ngLeft) + 'px';\n            });\n        })();\n        </script><button aria-controls=\"mobile-drawer\" aria-expanded=\"false\" aria-label=\"Toggle menu\" class=\"nav-toggle\"><span class=\"nav-toggle__bar\"></span><span class=\"nav-toggle__bar\"></span><span class=\"nav-toggle__bar\"></span></button><!-- Mobile drawer: full-screen grouped menu (데스크탑 GNB IA와 동일하게 구성) --><div aria-hidden=\"true\" class=\"nav-mobile\" id=\"mobile-drawer\"><div class=\"nav-mobile__bar\"><a aria-label=\"CUBIG LOGO\" class=\"nav-mobile__logo\" data-link-id=\"nav_m_home\" href=\"https://cubig.ai/ko/\"><img alt=\"CUBIG\" loading=\"lazy\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/cubig.svg?v=21b075f454\"/></a><div class=\"nav-mobile__bar-right\"><div aria-label=\"언어 선택\" class=\"nav-lang-inline\" role=\"group\"><svg aria-hidden=\"true\" class=\"nav-lang-inline__globe\" fill=\"currentColor\" focusable=\"false\" height=\"18\" viewbox=\"0 0 256 256\" width=\"18\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm87.63,96H175.8c-1.41-28.46-10.27-55.47-25.12-77A88.2,88.2,0,0,1,215.63,120ZM128,215.89c-18.73-20.27-30.09-49-31.77-79.89h63.54C158.09,166.87,146.73,195.62,128,215.89ZM96.23,120c1.68-30.87,13-59.62,31.77-79.89,18.73,20.27,30.09,49,31.77,79.89Zm9.09-77C90.47,64.53,81.61,91.54,80.2,120H40.37A88.2,88.2,0,0,1,105.32,43ZM40.37,136H80.2c1.41,28.46,10.27,55.47,25.12,77A88.2,88.2,0,0,1,40.37,136Zm110.31,77c14.85-21.56,23.71-48.57,25.12-77h39.83A88.2,88.2,0,0,1,150.68,213Z\"></path></svg><a class=\"nav-lang-inline__opt\" data-cubig-lang=\"en\" href=\"https://cubig.ai/events/\" hreflang=\"en\">EN</a><a aria-current=\"true\" class=\"nav-lang-inline__opt is-current\" data-cubig-lang=\"ko\" href=\"https://cubig.ai/ko/events/\" hreflang=\"ko\">KO</a></div><button aria-label=\"Close menu\" class=\"nav-mobile__close\" type=\"button\"><svg fill=\"none\" height=\"24\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\" width=\"24\"><line x1=\"18\" x2=\"6\" y1=\"6\" y2=\"18\"></line><line x1=\"6\" x2=\"18\" y1=\"6\" y2=\"18\"></line></svg></button></div></div><div class=\"nav-mobile__inner\"><!-- CTA 버튼 (최상단, 2열) --><div class=\"nav-mobile__actions nav-mobile__actions--top\"><a class=\"nav-mobile__btn nav-mobile__btn--outline\" data-link-id=\"nav_m_contact\" href=\"https://cubig.ai/ko/contact/\">문의하기</a><a class=\"nav-mobile__btn nav-mobile__btn--dark\" data-cta-id=\"syntitan_try_own_data\" data-cta-location=\"header-mobile\" data-entry-reason=\"none\" data-product=\"syntitan\" href=\"https://syntitan.ai/home?intent=own_data\" rel=\"noopener\" target=\"_blank\">내 데이터로 직접 해보기</a></div><!-- 플랫폼 --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">플랫폼</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_syntitan\" href=\"https://cubig.ai/ko/syntitan/\">Syntitan</a></div><!-- 제품 (Capabilities) --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">역량</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_llmcapsule\" href=\"https://cubig.ai/ko/llmcapsule/\">LLM Capsule</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_dts\" href=\"https://cubig.ai/ko/dts/\">DTS</a></div><!-- 신뢰 증거 (Proof) --><div class=\"nav-mobile__group\"><a class=\"nav-mobile__link nav-mobile__link--solo\" data-link-id=\"nav_m_proof\" href=\"https://cubig.ai/ko/proof/\">신뢰 증거</a></div><!-- 자료 (Learn) --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">자료</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_learn\" href=\"https://cubig.ai/ko/learn/\">학습 허브</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_blogs\" href=\"https://cubig.ai/ko/blogs/\">블로그</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_articles\" href=\"https://cubig.ai/ko/articles/\">아티클</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_glossary\" href=\"https://cubig.ai/ko/glossary/\">용어집</a></div><!-- 회사 (Company) --><div class=\"nav-mobile__group\"><span class=\"nav-mobile__group-label\">회사</span><a class=\"nav-mobile__link\" data-link-id=\"nav_m_company\" href=\"https://cubig.ai/ko/company/\">회사 소개</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_news\" href=\"https://cubig.ai/ko/news/\">뉴스</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_press\" href=\"https://cubig.ai/ko/press/\">프레스</a><a class=\"nav-mobile__link\" data-link-id=\"nav_m_events\" href=\"https://cubig.ai/ko/events/\">행사</a><a class=\"nav-mobile__link nav-mobile__link--ext\" data-link-id=\"nav_m_careers\" href=\"https://cubig.ai/ko/careers/\">채용<svg aria-hidden=\"true\" class=\"nav-ext-arrow\" fill=\"none\" focusable=\"false\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M17 7l-10 10\"></path><path d=\"M8 7l9 0l0 9\"></path></svg></a></div></div></div></nav></header>", "ft": "<footer class=\"site-footer\"><!-- Main footer (light) --><div class=\"footer-main section--white\"><div class=\"container footer-main__inner\"><div class=\"footer-main__brand\"><img alt=\"CUBIG\" class=\"footer-main__logo\" decoding=\"async\" height=\"17\" loading=\"lazy\" src=\"https://cubig.ai/wp-content/themes/cubig/assets/images/logo/cubig.svg?v=21b075f454\" width=\"100\"/></div><div class=\"footer-main__columns\"><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">플랫폼</h3><ul><li><a data-link-id=\"footer_syntitan\" href=\"https://cubig.ai/ko/syntitan/\">Syntitan</a></li></ul></div><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">핵심 역량</h3><ul><li><a data-link-id=\"footer_llmcapsule\" href=\"https://cubig.ai/ko/llmcapsule/\">LLM Capsule</a></li><li><a data-link-id=\"footer_dts\" href=\"https://cubig.ai/ko/dts/\">DTS</a></li></ul></div><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">근거 &amp; 학습 자료</h3><ul><li><a data-link-id=\"footer_proof\" href=\"https://cubig.ai/ko/proof/\">근거</a></li><li><a data-link-id=\"footer_learn\" href=\"https://cubig.ai/ko/learn/\">학습 허브</a></li><li><a data-link-id=\"footer_blogs\" href=\"https://cubig.ai/ko/blogs/\">블로그</a></li><li><a data-link-id=\"footer_articles\" href=\"https://cubig.ai/ko/articles/\">아티클</a></li><li><a data-link-id=\"footer_glossary\" href=\"https://cubig.ai/ko/glossary/\">용어집</a></li></ul></div><div class=\"footer-main__col\"><h3 class=\"footer-main__heading\">회사</h3><ul><li><a data-link-id=\"footer_company\" href=\"https://cubig.ai/ko/company/\">회사 소개</a></li><li><a data-link-id=\"footer_careers\" href=\"https://cubig.ai/ko/careers/\">채용</a></li><li><a data-link-id=\"footer_news\" href=\"https://cubig.ai/ko/news/\">뉴스</a></li><li><a data-link-id=\"footer_press\" href=\"https://cubig.ai/ko/press/\">프레스</a></li><li><a data-link-id=\"footer_events\" href=\"https://cubig.ai/ko/events/\">행사</a></li></ul></div><div class=\"footer-main__col footer-main__col--connect\"><h3 class=\"footer-main__heading\">연결</h3><ul><li><a data-link-id=\"footer_contact\" href=\"https://cubig.ai/ko/contact/\">문의하기</a></li><li><a href=\"https://www.linkedin.com/company/cubig-corp/\" rel=\"noopener noreferrer\" target=\"_blank\">LinkedIn</a></li><li><a href=\"https://medium.com/cubig-tech-blog\" rel=\"noopener noreferrer\" target=\"_blank\">Medium</a></li><li><a href=\"https://www.youtube.com/@cubig_corp\" rel=\"noopener noreferrer\" target=\"_blank\">YouTube</a></li><li><a href=\"https://www.instagram.com/cubig.ai_official/\" rel=\"noopener noreferrer\" target=\"_blank\">Instagram</a></li><li><a href=\"https://blog.naver.com/cubig_\" rel=\"noopener noreferrer\" target=\"_blank\">네이버 블로그</a></li><li><a href=\"https://x.com/CUBIG_AI\" rel=\"noopener noreferrer\" target=\"_blank\">X (Twitter)</a></li></ul></div></div></div><!-- Addresses row (below main columns) --><div class=\"container footer-main__addresses\"><p class=\"footer-main__entity\"><strong>CUBIG LTD (영국)</strong><br/>\n                    회사 번호: NI735459<br/>\n                    21 Arthur Street, Belfast, Antrim, United Kingdom, BT1 4GA\n                </p><p class=\"footer-main__entity\"><strong>주식회사 큐빅 (CUBIG Corp., 대한민국)</strong><br/>\n                    사업자 등록 번호: 133-81-45679<br/>\n                    전자상거래 등록: 2023-서울-서초-2822<br/>\n                    대한민국 경기도 성남시 분당구 정자일로 95, 네이버1784 4층<br/>\n                    대표전화 <a href=\"tel:+82-2-582-1113\">02-582-1113</a> · 이메일 <a href=\"/cdn-cgi/l/email-protection#55363a3b21343621153620373c327b343c\"><span class=\"__cf_email__\" data-cfemail=\"31525e5f455052457152445358561f5058\">[email protected]</span></a></p></div></div><!-- Bottom row --><div class=\"footer-bottom section--white\"><div class=\"container footer-bottom__inner\"><span class=\"footer-bottom__copy\">©️ 2026 CUBIG Corp. All Rights Reserved.</span><div class=\"footer-bottom__links\"><a data-link-id=\"footer_cookie_policy\" href=\"https://cubig.ai/ko/cookie-policy/\">쿠키 정책</a><a data-link-id=\"footer_privacy_policy\" href=\"https://cubig.ai/ko/privacy-policy/\">개인정보 처리방침</a><button class=\"footer-bottom__choice\" data-consent-open=\"\" type=\"button\">쿠키 설정</button><button class=\"footer-bottom__choice footer-bottom__choice--us\" data-consent-open=\"\" hidden=\"\" type=\"button\">Do Not Sell or Share My Personal Information</button></div></div><div class=\"container footer-bottom__gartner\">Gartner는 자사 리서치 발행물에 표시된 어떤 벤더·제품·서비스도 보증하지 않습니다. GARTNER는 Gartner, Inc. 및/또는 그 계열사의 등록상표입니다.</div></div></footer>"}};
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
    // Mobile nav toggle (opens full-screen grouped drawer)
    const toggle = document.querySelector('.nav-toggle');
    const drawer = document.getElementById('mobile-drawer');
    if (toggle && drawer) {
        // iOS는 body{overflow:hidden}으로 문서 스크롤이 안 잠긴다. 드로어 끝까지 스크롤하면
        // 제스처가 문서로 넘어가 뒤 페이지가 밀리고, position:fixed인 헤더가 재배치되며
        // 드로어와 겹쳐 보인다(2026-07-29 아이폰 크롬 제보). .nav-mobile의
        // overscroll-behavior:contain은 데스크톱 휠에선 막지만(실측) iOS 터치는 못 막는다.
        // → 터치 기기에서만 body를 position:fixed로 고정하고 닫을 때 스크롤 위치를 되돌린다.
        // 데스크톱(Lenis 동작)은 기존 overflow:hidden 경로가 실제로 잘 막히므로 손대지 않는다
        // (Lenis와 position:fixed를 섞으면 닫을 때 튄다). 조건은 smooth-scroll.js의 Lenis
        // 비활성 조건과 같은 식이라 둘이 항상 배타적으로 걸린다.
        const needsFixedLock = window.matchMedia
            && (window.matchMedia('(pointer: coarse)').matches || window.matchMedia('(hover: none)').matches);
        let lockedScrollY = 0;
        // 2026-11-06 점검 03-03: 서랍이 열린 동안 키보드 포커스가 뒤(가려진 본문)로 새지 않게 —
        // 서랍 = 대화 상자 역할, 열 때 첫 링크로·닫을 때 메뉴 버튼으로 포커스, 본문·푸터 inert, 서랍 안에서 Tab 순환.
        drawer.setAttribute('role', 'dialog');
        drawer.setAttribute('aria-modal', 'true');
        if (!drawer.hasAttribute('aria-label')) drawer.setAttribute('aria-label', document.documentElement.lang && document.documentElement.lang.indexOf('ko') === 0 ? '메뉴' : 'Menu');
        const drawerFocusables = () => [...drawer.querySelectorAll('a[href], button:not([disabled])')].filter((el) => el.offsetParent !== null || el.getClientRects().length);
        const setInert = (on) => {
            document.querySelectorAll('#main-content, body > footer, .site-footer').forEach((el) => {
                if (on) el.setAttribute('inert', ''); else el.removeAttribute('inert');
            });
        };
        drawer.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const items = drawerFocusables();
            if (!items.length) return;
            const first = items[0], last = items[items.length - 1];
            if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
            else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        });

        const setOpen = (open) => {
            const wasOpen = toggle.getAttribute('aria-expanded') === 'true';
            toggle.setAttribute('aria-expanded', String(open));
            drawer.setAttribute('aria-hidden', String(!open));
            drawer.classList.toggle('is-open', open);
            setInert(open);
            if (open && !wasOpen) {
                // 서랍이 보이게 된 다음 프레임에 첫 링크로(표시 전환 직후엔 포커스가 안 먹는 브라우저가 있음)
                requestAnimationFrame(() => { const items = drawerFocusables(); const tgt = drawer.querySelector('.nav-mobile__inner a[href]') || items[0]; if (tgt) tgt.focus({ preventScroll: true }); });
            } else if (!open && wasOpen && drawer.contains(document.activeElement)) {
                toggle.focus({ preventScroll: true });
            }
            document.body.classList.toggle('nav-open', open);
            // ⚠️ 이 사이트의 스크롤 주체는 body가 아니라 html이다(실측: body는
            // scrollHeight==clientHeight, html은 16218 vs 560). body만 overflow:hidden으로
            // 잠그면 문서가 계속 스크롤 가능해 **스크롤바가 두 개** 남는다(2026-07-29 현세 제보).
            document.documentElement.classList.toggle('nav-open', open);

            if (!needsFixedLock) return;
            if (open) {
                lockedScrollY = window.scrollY || document.documentElement.scrollTop || 0;
                document.body.classList.add('is-scroll-locked');
                document.body.style.top = '-' + lockedScrollY + 'px';
            } else {
                document.body.classList.remove('is-scroll-locked');
                document.body.style.top = '';
                // 고정을 풀면 문서가 맨 위로 튀므로 원래 위치로 즉시 복귀
                window.scrollTo(0, lockedScrollY);
            }
        };
        toggle.addEventListener('click', () => {
            const expanded = toggle.getAttribute('aria-expanded') === 'true';
            setOpen(!expanded);
        });
        // Explicit close (X) button inside drawer
        const closeBtn = drawer.querySelector('.nav-mobile__close');
        if (closeBtn) closeBtn.addEventListener('click', () => setOpen(false));
        // Close drawer when any link inside is tapped
        drawer.querySelectorAll('a').forEach((a) => {
            a.addEventListener('click', () => setOpen(false));
        });
        // Close on Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
                setOpen(false);
            }
        });
    }

    // === Mega Menus (Product, Company, Resources) ===
    // Interaction model:
    //   - hover opens the menu (and switches between menus on hover)
    //   - click on a trigger PINS the menu (stays open even after mouseleave)
    //   - clicking the same pinned trigger again toggles it closed
    //   - clicking a different pinned trigger switches the pin
    //   - click outside / blur overlay / Escape unpins and closes
    const siteNav = document.getElementById('site-nav');
    const megaTriggers = document.querySelectorAll('.nav-links__dropdown--mega[data-mega-target]');
    const megaPanels = document.querySelectorAll('.nav-mega[data-mega-panel]');
    const megaBlur = document.getElementById('nav-mega-blur');
    const navGroup = document.querySelector('.site-header__nav-group');
    let activeMega = null;
    let pinnedMega = null;
    let closeTimer = null;

    // Anchor a floating mega panel under its trigger, left-aligned (design-play).
    // Uses navGroup as the position reference so it works even while the panel is
    // hidden (display:none → panel.offsetParent is null). Computing left up front —
    // not only on open — keeps the panel from flashing at the CSS fallback (left:0)
    // before JS runs, and lets us re-anchor on resize / late font load.
    function positionPanel(trigger, panel) {
        if (!trigger || !panel) return;
        const tRect = trigger.getBoundingClientRect();
        const parent = panel.offsetParent || navGroup || document.body;
        const pRect = parent.getBoundingClientRect();
        panel.style.left = (tRect.left - pRect.left) + 'px';
    }
    function positionAllPanels() {
        megaTriggers.forEach((trigger) => {
            const name = trigger.dataset.megaTarget;
            const panel = document.querySelector(`.nav-mega[data-mega-panel="${name}"]`);
            positionPanel(trigger, panel);
        });
    }

    function openMega(name) {
        clearTimeout(closeTimer);
        megaPanels.forEach(p => p.classList.remove('is-open'));
        megaTriggers.forEach(t => t.classList.remove('is-open'));

        const panel = document.querySelector(`.nav-mega[data-mega-panel="${name}"]`);
        const trigger = document.querySelector(`.nav-links__dropdown--mega[data-mega-target="${name}"]`);
        // Flip siteNav.mega-open first so the full-width white backdrop paints
        // instantly, even before the panel's internal images/cards render.
        if (siteNav) siteNav.classList.add('mega-open');
        if (panel) {
            panel.classList.add('is-open');
            // Reset active selection to the first link + first card group
            // so the default preview is shown on every open (not whatever
            // was hovered last time).
            const links = panel.querySelectorAll('.nav-mega__link[data-mega-card]');
            const cards = panel.querySelectorAll('.nav-mega__card-group[data-mega-id]');
            links.forEach(l => l.classList.remove('is-active'));
            cards.forEach(c => c.classList.remove('is-active'));
            if (links[0]) {
                links[0].classList.add('is-active');
                const firstTarget = links[0].dataset.megaCard;
                const firstCard = panel.querySelector(`.nav-mega__card-group[data-mega-id="${firstTarget}"]`);
                if (firstCard) firstCard.classList.add('is-active');
            }
        }
        if (trigger) trigger.classList.add('is-open');
        megaTriggers.forEach((t) => { const l = t.querySelector('.nav-links__trigger'); if (l) l.setAttribute('aria-expanded', String(t === trigger)); });
        // Anchor the floating mega card under its trigger, left-aligned (design-play)
        positionPanel(trigger, panel);
        activeMega = name;
    }

    function closeAllMega() {
        clearTimeout(closeTimer);
        megaPanels.forEach(p => p.classList.remove('is-open'));
        megaTriggers.forEach(t => t.classList.remove('is-open'));
        megaTriggers.forEach((t) => { const l = t.querySelector('.nav-links__trigger'); if (l) l.setAttribute('aria-expanded', 'false'); });
        if (siteNav) siteNav.classList.remove('mega-open');
        activeMega = null;
        pinnedMega = null;
    }

    function hoverClose() {
        // Do not auto-close while a menu is pinned by click.
        if (pinnedMega) return;
        // Longer grace so the mouse can travel from the trigger into the
        // panel across the empty strip without the panel closing mid-move.
        closeTimer = setTimeout(() => {
            const hoveringTrigger = document.querySelector('.nav-links__dropdown--mega:hover');
            const hoveringPanel = document.querySelector('.nav-mega:hover');
            if (!hoveringTrigger && !hoveringPanel) {
                closeAllMega();
            }
        }, 200);
    }

    megaTriggers.forEach(trigger => {
        const targetName = trigger.dataset.megaTarget;

        // Hover: open on enter, soft-close on leave (suppressed while pinned).
        trigger.addEventListener('mouseenter', () => {
            if (pinnedMega && pinnedMega !== targetName) {
                // Switching menus while another is pinned: repin the new one.
                pinnedMega = targetName;
            }
            openMega(targetName);
        });
        trigger.addEventListener('mouseleave', hoverClose);

        // Click the visible label area (anchor) to pin / unpin.
        const clickArea = trigger.querySelector('.nav-links__trigger') || trigger;
        clickArea.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (pinnedMega === targetName) {
                closeAllMega();
            } else {
                pinnedMega = targetName;
                openMega(targetName);
            }
        });
    });

    megaPanels.forEach(panel => {
        panel.addEventListener('mouseenter', () => { clearTimeout(closeTimer); });
        panel.addEventListener('mouseleave', hoverClose);
    });

    // 2026-11-06 점검 03-02: 키보드로도 메가메뉴가 열리게(캡슐 헤더와 같은 방식).
    //   트리거에 키보드 포커스 → 그 메뉴 열기 · 열린 상태에서 Tab → 메뉴 안 첫 링크 · 메뉴 마지막 링크에서 Tab → 다음 트리거
    //   · 첫 링크에서 Shift+Tab → 트리거 · 포커스가 메뉴 밖으로 나가면 닫기(Esc 닫기는 아래 그대로).
    //   패널은 DOM상 오른쪽 버튼들 뒤에 있어 기본 Tab 순서로는 들어갈 수 없었다.
    const megaTriggerList = [...megaTriggers];
    const panelItems = (panel) => [...panel.querySelectorAll('a[href], button:not([disabled])')].filter((el) => el.getClientRects().length);
    const isKeyFocus = (el) => { try { return el.matches(':focus-visible'); } catch (err) { return true; } };
    megaTriggerList.forEach((trigger, idx) => {
        const name = trigger.dataset.megaTarget;
        const link = trigger.querySelector('.nav-links__trigger');
        const panel = document.querySelector(`.nav-mega[data-mega-panel="${name}"]`);
        if (!link || !panel) return;
        link.setAttribute('aria-haspopup', 'true');
        link.setAttribute('aria-expanded', 'false');
        link.addEventListener('focus', () => { if (isKeyFocus(link)) openMega(name); });
        link.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || e.shiftKey || !panel.classList.contains('is-open')) return;
            const items = panelItems(panel);
            if (items.length) { e.preventDefault(); items[0].focus(); }
        });
        panel.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const items = panelItems(panel);
            if (!items.length) return;
            if (!e.shiftKey && document.activeElement === items[items.length - 1]) {
                const nextT = megaTriggerList[idx + 1];
                const next = nextT ? nextT.querySelector('.nav-links__trigger') : document.querySelector('.site-header__right-block summary, .site-header__right-block a[href]');
                if (next) { e.preventDefault(); closeAllMega(); next.focus(); }
            } else if (e.shiftKey && document.activeElement === items[0]) {
                e.preventDefault(); link.focus();
            }
        });
    });
    document.addEventListener('focusin', (e) => {
        if (!activeMega || pinnedMega) return;
        if (!e.target.closest || !e.target.closest('.nav-links__dropdown--mega, .nav-mega')) closeAllMega();
    });

    // Pre-anchor every panel now (not just on first open) so an early hover —
    // before this script finishes / before web fonts settle nav widths — never
    // shows the panel at the CSS fallback (left:0). Re-anchor on resize and once
    // late-loading fonts have reflowed the nav.
    positionAllPanels();
    window.addEventListener('resize', positionAllPanels, { passive: true });
    if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(positionAllPanels);
    }

    // Click outside closes (and unpins).
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-links__dropdown--mega') && !e.target.closest('.nav-mega')) {
            closeAllMega();
        }
    });

    if (megaBlur) {
        megaBlur.addEventListener('click', closeAllMega);
    }

    // Escape closes.
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && activeMega) closeAllMega();
    });

    // === Header scroll state (transparent at top, blurred on scroll) ===
    const siteHeader = document.querySelector('.site-header');
    if (siteHeader) {
        const updateScrollState = () => {
            siteHeader.classList.toggle('is-scrolled', window.scrollY > 16);
        };
        updateScrollState();
        window.addEventListener('scroll', updateScrollState, { passive: true });
    }


    // === Language switcher ===
    // Markup is a native <details> containing <a> links with absolute URLs
    // for each language variant (resolved server-side — Polylang URLs when
    // available, naive /ko/ prefix swap otherwise). The anchors work with
    // no JS; this block only auto-closes the popover on outside click /
    // Escape for better UX.
    const langDetails = document.querySelector('details.nav-lang');
    if (langDetails) {
        document.addEventListener('click', (e) => {
            if (!langDetails.contains(e.target)) langDetails.removeAttribute('open');
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') langDetails.removeAttribute('open');
        });
    }


  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount); else mount();
})();
