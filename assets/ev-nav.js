/*
  events.cubig.ai 공통 머리글·햄버거 메뉴·상단 띠·바닥글 (초안)
  - 페이지에 <script src="/assets/ev-nav.js" defer></script> 한 줄.
  - 메뉴와 상단 띠는 /events.json 을 읽어 자동으로 채웁니다.
  - 페이지 <body data-cta="예약링크" data-cta-label="Book a meeting"> 로 머리글 버튼을 바꿀 수 있습니다.
*/
(function () {
  var KO = (document.documentElement.lang||'').slice(0,2)==='ko';
  /* GA4 버튼 측정(11-17 🏷️ 태그·측정 구조 세션 요청) — 이벤트 이름은 택소노미 events.cubig.ai 탭과 글자 그대로.
     상세 페이지는 GTM 없이 Google 태그만 있어서 이 코드가 미팅 신청·메일·제품 링크·PDF 클릭을 GA4로 보냄.
     공홈 머리글·바닥글(#site-header·.site-footer) 안 클릭은 제외(메뉴의 Syntitan 등이 제품 카드 클릭으로 섞이지 않게). */
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href]');
    if (!a || typeof gtag !== 'function' || a.closest('#site-header, .site-footer')) return;
    var h = a.getAttribute('href') || '';
    // 행사 공식 포털의 CUBIG 프로필(부스 위치 자리) = cta_click events_portal (11-17 🏷️, 위치 판정보다 먼저)
    if (a.getAttribute('data-ev-href') === 'portal') {
      gtag('event', 'cta_click', { cta_id: 'events_portal', cta_location: 'event-detail-find', link_url: a.href });
      return;
    }
    var loc = a.closest('.ev-sub') ? 'event-detail-subbar' : (a.getAttribute('data-ev-href') === 'booking' ? 'event-detail-booking' : 'event-detail-hero');
    if (/cubig\.ai\/(ko\/)?events\/meet/.test(h)) {
      gtag('event', 'cta_click', { cta_id: 'events_meet', cta_location: loc });
    } else if (/calendar\.app\.google|calendar\.google\.com\/calendar\/appointments/.test(h)) {
      gtag('event', 'cta_click', { cta_id: 'events_onsite_meet', cta_location: loc });   // 행사 기간 현장 미팅 예약(끝나면 위 events_meet 주소로 바뀜)
    } else if (/^mailto:/.test(h)) {
      gtag('event', 'cta_click', { cta_id: 'events_mail', cta_location: 'event-detail' });
    } else if (/\.pdf(\?|#|$)/i.test(h)) {
      var f = h.split(/[?#]/)[0].split('/').pop();
      gtag('event', 'file_download', { file_name: f, file_extension: 'pdf', link_url: a.href });
    } else {
      var m = h.match(/cubig\.ai\/(?:ko\/)?(syntitan|dts|llmcapsule)\b/);
      if (m) { gtag('event', 'cta_click', { cta_id: 'events_product', target: m[1], cta_location: 'event-detail' }); return; }
      // 공홈·행사 사이트의 다른 링크(기사·문의·허브·다른 행사 등) = internal_link_click (공홈과 같은 이름, 11-17 🏷️)
      var u; try { u = new URL(a.href); } catch (x) { u = null; }
      if (u && /(^|\.)cubig\.ai$/.test(u.hostname) && !(u.pathname === location.pathname && u.hash)) {
        var p = u.pathname.replace(/^\/ko(\/|$)/, '/');
        // 부스 지도 크게 보기(이미지 주소) = event_detail_map (11-17 🏷️, event_detail_event 판정보다 먼저)
        var id = /\.(webp|png|jpe?g)$/i.test(u.pathname) ? 'event_detail_map' : u.hostname === 'events.cubig.ai' ? 'event_detail_event' : (/^\/news\//.test(p) ? 'event_detail_news' : (/^\/contact/.test(p) ? 'event_detail_contact' : (/^\/events\/?$/.test(p) ? 'event_detail_hub' : 'event_detail_other')));
        gtag('event', 'internal_link_click', { link_id: id, link_url: a.href });
      }
    }
  }, true);

  // 스크롤 깊이 = scroll_depth (공홈과 같은 25·50·75·90%, 페이지마다 단계별 1번)
  var SD = [25, 50, 75, 90], sdDone = {}, sdT;
  function sdCheck() {
    var d = document.documentElement, max = d.scrollHeight - d.clientHeight; if (max <= 0 || typeof gtag !== 'function') return;
    var pct = (window.scrollY || d.scrollTop) / max * 100;
    SD.forEach(function (t) { if (pct >= t && !sdDone[t]) { sdDone[t] = 1; gtag('event', 'scroll_depth', { percent_scrolled: t }); } });
  }
  window.addEventListener('scroll', function () { clearTimeout(sdT); sdT = setTimeout(sdCheck, 200); }, { passive: true });

  var TYPES = KO ? { exhibition: '전시·행사', stage: '무대·수상', live: '라이브 방송' } : { exhibition: 'On the floor', stage: 'On stage', live: 'On air' };
  var M = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function d(s){ var p=s.split('-'); return new Date(+p[0], +p[1]-1, +p[2]); }
  function fmt(e){
    var a=d(e.start), b=e.end?d(e.end):null, y=a.getFullYear();
    if(KO){ if(!b) return y+'년 '+(a.getMonth()+1)+'월 '+a.getDate()+'일'; if(a.getMonth()===b.getMonth()) return y+'년 '+(a.getMonth()+1)+'월 '+a.getDate()+'–'+b.getDate()+'일'; return y+'년 '+(a.getMonth()+1)+'월 '+a.getDate()+'일–'+(b.getMonth()+1)+'월 '+b.getDate()+'일'; }
    if(!b) return M[a.getMonth()]+' '+a.getDate()+', '+y;
    if(a.getMonth()===b.getMonth()) return M[a.getMonth()]+' '+a.getDate()+'–'+b.getDate()+', '+y;
    return M[a.getMonth()]+' '+a.getDate()+' – '+M[b.getMonth()]+' '+b.getDate()+', '+y;
  }
  function isPast(e){ var t=new Date(); t.setHours(0,0,0,0); return d(e.end||e.start) < t; }
  /* events.json 의 page 는 '폴더/index.html' 형식 (현세님 규칙). 사이트에서는 '/폴더/' 주소로 바꿔 씀 */
  function href(e){ if(!e.page) return e.video || null; var p=e.page.replace(/^\//,'');
    if(document.querySelector('meta[name=ev-path]')) return (KO?'ko/':'')+p;
    return (KO?'/ko/':'/')+p.replace(/index\.html$/,''); }
  window.EV = { fmt: fmt, isPast: isPast, href: href, TYPES: TYPES };

  // EN | KO 전환: <body data-lang-toggle> 있는 페이지, 같은 경로의 짝 페이지(/x/ ↔ /ko/x/)로 이동
  function langToggle(){
    if(!document.body.hasAttribute('data-lang-toggle')) return '';
    var ko=(document.documentElement.lang||'').slice(0,2)==='ko', on='color:#16161a', off='color:#8b8b92';
    var path=location.pathname, enHref=path.replace(/^\/ko(\/|$)/,'/'), koHref=ko?path:'/ko'+path;
    return '<span class="ev-lang" style="font:500 13px Manrope,sans-serif;letter-spacing:.02em;margin-right:12px;color:#8b8b92">'+
      '<a href="'+enHref+'" lang="en"'+(ko?'':' aria-current="page"')+' style="text-decoration:none;'+(ko?off:on)+'">EN</a> | '+
      '<a href="'+koHref+'" lang="ko"'+(ko?' aria-current="page"':'')+' style="text-decoration:none;'+(ko?on:off)+'">KO</a></span>';
  }
  function el(h){ var t=document.createElement('div'); t.innerHTML=h.trim(); return t.firstChild; }

  /* 현장 미팅 버튼 자동 종료: 버튼에 마지막 날을 따로 안 적어도, events.json 에서 이 페이지 행사의
     end(없으면 start)를 찾아 그다음 날부터 상시 미팅 페이지(cubig.ai/events/meet/, 한국어 cubig.ai/ko/events/meet/)로 바꿉니다.
     버튼에 data-booking-until 이 있으면 그 날짜를 우선합니다. 공통 미팅 링크(crm@)는 건드리지 않습니다.
     data-booking-after="hide" 면 바꾸지 않고 숨깁니다(옆에 온라인 미팅 링크가 따로 있는 기본 양식 페이지 — 2026-11-17 현세). */
  function autoBookingEnd(ev){
    var m=document.querySelector('meta[name=ev-path]');
    var path=(m?'/'+m.content:location.pathname).replace(/^\/ko\//,'/').replace(/index\.html$/,'');
    var me=ev.filter(function(e){ return e.page && '/'+e.page.replace(/^\//,'').replace(/index\.html$/,'')===path; })[0];
    var COMMON=/oCAQAos8bo4denCr7|AcZssZ3o4cv2tXe0EboOtPoiHR8cImEPuUCo1bnxBBYTFL15V8ld8zTm4Ok6Zj4GxaQhCVQKKjO6c55J/;
    var BOOK=/calendar\.app\.google\/|calendar\.google\.com\/calendar\/appointments\//;
    var t=new Date(); t.setHours(0,0,0,0);
    var meet=KO?'https://cubig.ai/ko/events/meet/':'https://cubig.ai/events/meet/'; // 미팅 신청 페이지 = cubig.ai (2026-11-16 이동)
    document.querySelectorAll('a[href],iframe[src],iframe[data-src]').forEach(function(el){
      var u=el.getAttribute('href')||el.getAttribute('src')||el.getAttribute('data-src')||'';
      if(!BOOK.test(u)||COMMON.test(u)) return;
      var until=el.getAttribute('data-booking-until')||(me&&(me.end||me.start));
      if(!until) return;
      if(t<=d(until)) return;
      if(el.tagName==='A' && el.getAttribute('data-booking-after')!=='hide'){ el.href=el.getAttribute('data-booking-after')||meet; el.removeAttribute('target'); el.setAttribute('data-booking-ended',''); }
      else { el.hidden=true; el.style.display='none'; }
    });
    /* 끝난 행사 = '현장 기록' 모드(11-17 윤주님 피드백 3·현세): html.is-past → [data-past-hide](부스 지도 등) 숨김,
       현장 기록 사진(.d-record)을 히어로 바로 아래로 올림. 기본 양식 페이지(page_blocks.py)에만 해당 블록이 있음. */
    if(me && t>d(me.end||me.start)){
      document.documentElement.classList.add('is-past');
      var rec=document.querySelector('.d-record'), hero=document.querySelector('.d-hero');
      if(rec && hero) hero.parentNode.insertBefore(rec, hero.nextSibling);
    }
  }

  function mount(data){
    var body=document.body, ev=(data&&data.events)||[];
    autoBookingEnd(ev);
    // 카드 상태 알약(예정·진행 중·종료)은 오늘 날짜로 다시 맞춤 — 저장된 글자는 만든 날 기준이라(허브 카드와 같은 규칙)
    document.querySelectorAll('.ev-it[data-s] [data-ev-st]').forEach(function(st){ var a=st.closest('.ev-it'), t=new Date(); t.setHours(0,0,0,0);
      var k=t<d(a.getAttribute('data-s'))?'up':(t<=d(a.getAttribute('data-e')||a.getAttribute('data-s'))?'now':'past');
      st.className='ev-st is-'+k; st.textContent=(KO?{up:'예정',now:'진행 중',past:'종료'}:{up:'Upcoming',now:'Happening now',past:'Wrapped'})[k]; });
    var cta=body.getAttribute('data-cta'), ctaLabel=body.getAttribute('data-cta-label')||(KO?'온라인 미팅 신청하기':'Book a meeting');
    if(cta==='/meet/'||cta==='/ko/meet/') cta=KO?'https://cubig.ai/ko/events/meet/':'https://cubig.ai/events/meet/'; // 옛 주소를 적은 페이지도 cubig.ai 미팅 페이지로

    // 상단 띠: 가장 가까운 예정 행사 (페이지가 data-strip="off" 면 생략)
    if(body.getAttribute('data-strip')!=='off'){
      var next=ev.filter(function(e){return !isPast(e);}).sort(function(a,b){return d(a.start)-d(b.start);})[0];
      if(next){
        var link=href(next);
        body.insertBefore(el('<div class="ev-strip"><div class="wrap"><span><b>'+next.title+'</b> · '+fmt(next)+'</span>'+(link?'<a href="'+link+'">'+(KO?'자세히 보기 →':'See details →')+'</a>':'')+'</div></div>'), body.firstChild);
      }
    }

    // 머리글: cubig.ai 공홈과 같은 메뉴 + 행사 목록(햄버거)
    var C=KO?'https://cubig.ai/ko/':'https://cubig.ai/';
    var SITE=document.getElementById('site-header'); // 공홈 머리글(assets/site/cubig-site.js)이 있으면 = 아래 머리글 대신 서브배너, 바닥글은 공홈 것
    var NAV=KO?[['syntitan/','플랫폼'],['llmcapsule/','역량'],['proof/','신뢰 증거'],['blogs/','자료'],['company/','회사']]
              :[['syntitan/','Platform'],['llmcapsule/','Capabilities'],['proof/','Proof'],['blogs/','Learn'],['company/','Company']];
    var hd=el('<header class="ev-hd"><div class="wrap">'+
      '<a class="logo" href="'+C+'" aria-label="CUBIG"><img src="/assets/cubig-logo.svg" alt="CUBIG" width="129" height="22"></a>'+
      '<a class="ev-home" href="'+C+'events/">'+(KO?'행사':'Events')+'</a>'+
      '<nav class="ev-gnav" aria-label="cubig.ai">'+NAV.map(function(n){return '<a href="'+C+n[0]+'">'+n[1]+'</a>';}).join('')+'</nav>'+
      '<div class="right">'+langToggle()+'<a class="ev-contact" href="'+C+'contact/">'+(KO?'문의하기':'Contact')+'</a>'+(cta?'<a class="btn" href="'+cta+'">'+ctaLabel+'</a>':'')+
      '<button class="burger" aria-label="'+(KO?'행사 메뉴 열기':'Open events menu')+'" aria-expanded="false"><i></i></button></div></div></header>');
    var strip=document.querySelector('.ev-strip');
    if(SITE){
      // 서브배너(2026-11-17 현세 「이벤트 헤더 자체를 서브배너로」): 행사 · 이 행사 이름 · 미팅 신청 · 행사 메뉴.
      // 히어로를 지나야 공홈 머리글 아래로 내려온다(첫 화면에 머리줄 두 겹 ❌).
      hd=el('<div class="ev-sub"><div class="wrap">'+
        '<a class="ev-sub__home" href="'+C+'events/">'+(KO?'행사':'Events')+'</a><span class="ev-sub__sep" aria-hidden="true">/</span><span class="ev-sub__t"></span>'+
        '<div class="right">'+(cta?'<a class="btn" href="'+cta+'">'+ctaLabel+'</a>':'')+
        '</div></div></div>'); // 행사 메뉴 버튼 없음(11-17 현세 「없어도 되지 않을까」: 공홈 메뉴·허브로 충분)
      var h1=document.querySelector('main h1'); hd.querySelector('.ev-sub__t').textContent=h1?h1.textContent:'';
      SITE.parentNode.insertBefore(hd, SITE.nextSibling);
      var hero=document.querySelector('.d-hero')||document.querySelector('main > section');
      var subOn=function(){ var on=!hero||hero.getBoundingClientRect().bottom<=64; hd.classList.toggle('is-on',on); };
      window.addEventListener('scroll',subOn,{passive:true}); window.addEventListener('resize',subOn); subOn();
    } else body.insertBefore(hd, strip?strip.nextSibling:body.firstChild);

    // 햄버거 메뉴: 종류별로 묶고, 각 묶음 안은 최신순
    var groups='';
    Object.keys(TYPES).forEach(function(k){
      var items=ev.filter(function(e){return e.type===k && !e.placeholder;}).sort(function(a,b){return d(b.start)-d(a.start);});
      var more=items.length>5; items=items.slice(0,5);
      var rows=items.map(function(e){
        var h=href(e), tail=isPast(e)?(KO?fmt(e).replace(/^\d{4}년 /,''):fmt(e).replace(/, \d{4}$/,'')):(KO?'예정':'Upcoming');
        return h?'<a href="'+h+'"'+(e.page?'':' target="_blank" rel="noopener"')+'>'+e.title+'<small>'+tail+'</small></a>'
                :'<a aria-disabled="true" style="cursor:default;color:var(--ink-2)">'+e.title+'<small>'+tail+'</small></a>';
      }).join('');
      if(!rows) return;
      var G={exhibition:'floor',stage:'stage',live:'air'};
      if(more) rows+='<a href="'+(KO?'/ko':'')+'/all/#'+G[k]+'">'+(KO?'전체 보기 →':'See all →')+'</a>';
      groups+='<div class="grp"><h4>'+TYPES[k]+'</h4>'+rows+'</div>';
    });
    var menu=el('<div class="ev-menu" aria-hidden="true"><div class="dim"></div><nav class="panel" aria-label="Events">'+
      '<div class="top"><a class="logo" href="'+C+'"><img src="/assets/cubig-logo.svg" alt="CUBIG" width="117" height="20"></a><button class="close" aria-label="'+(KO?'메뉴 닫기':'Close menu')+'">×</button></div>'+
      (KO?'<div class="grp"><a href="https://cubig.ai/ko/events/">전체 행사<small>cubig.ai</small></a><a href="https://cubig.ai/press/">프레스 키트<small>cubig.ai</small></a></div>':'<div class="grp"><a href="https://cubig.ai/events/">All events<small>cubig.ai</small></a><a href="https://cubig.ai/press/">Press kit<small>cubig.ai</small></a></div>')+
      groups+(data.channel?'<div class="grp"><a href="'+data.channel+'" target="_blank" rel="noopener">'+(KO?'CUBIG 유튜브':'CUBIG on YouTube')+'<small>↗</small></a></div>':'')+'</nav></div>');
    var btn=hd.querySelector('.burger');
    if(btn){ body.appendChild(menu);
    function toggle(o){ menu.classList.toggle('open',o); btn.setAttribute('aria-expanded',o); menu.setAttribute('aria-hidden',!o); document.documentElement.style.overflow=o?'hidden':''; }
    btn.onclick=function(){toggle(true);};
    menu.querySelector('.close').onclick=menu.querySelector('.dim').onclick=function(){toggle(false);};
    document.addEventListener('keydown',function(e){ if(e.key==='Escape') toggle(false); }); }

    // 바닥글: cubig.ai 공홈과 같은 구성
    var COLS=KO?[["플랫폼", [["syntitan/", "Syntitan"]]], ["핵심 역량", [["llmcapsule/", "LLM Capsule"], ["dts/", "DTS"]]], ["근거 & 학습 자료", [["proof/", "근거"], ["learn/", "학습 허브"], ["blogs/", "블로그"], ["articles/", "아티클"], ["glossary/", "용어집"]]], ["회사", [["company/", "회사 소개"], ["careers/", "채용"], ["news/", "뉴스"], ["press/", "프레스"]]]]:[["Platform", [["syntitan/", "Syntitan"]]], ["Capabilities", [["llmcapsule/", "LLM Capsule"], ["dts/", "DTS"]]], ["Proof & Learn", [["proof/", "Proof"], ["learn/", "Learn Hub"], ["blogs/", "Blog"], ["articles/", "Articles"], ["glossary/", "Glossary"]]], ["Company", [["company/", "About"], ["careers/", "Careers"], ["news/", "News"], ["press/", "Press"]]]];
    var SOC=[['https://www.linkedin.com/company/cubig-corp/','LinkedIn'],['https://medium.com/cubig-tech-blog','Medium'],['https://www.youtube.com/@cubig_corp','YouTube'],['https://www.instagram.com/cubig.ai_official/','Instagram'],['https://blog.naver.com/cubig_',KO?'네이버 블로그':'Naver Blog'],['https://x.com/CUBIG_AI','X (Twitter)']];
    var cols=COLS.map(function(c){return '<div><h4>'+c[0]+'</h4>'+c[1].map(function(l){return '<a href="'+C+l[0]+'">'+l[1]+'</a>';}).join('')+'</div>';}).join('')+
      '<div><h4>'+(KO?'연결':'Connect')+'</h4><a href="'+C+'contact/">'+(KO?'문의하기':'Contact')+'</a>'+SOC.map(function(l){return '<a href="'+l[0]+'" target="_blank" rel="noopener">'+l[1]+'</a>';}).join('')+'</div>';
    var info=KO?'<p>CUBIG LTD (영국) · 회사 번호: NI735459 · 21 Arthur Street, Belfast, Antrim, United Kingdom, BT1 4GA</p><p>주식회사 큐빅 (CUBIG Corp., 대한민국) · 사업자 등록 번호: 133-81-45679 · 전자상거래 등록: 2023-서울-서초-2822 · 대한민국 경기도 성남시 분당구 정자일로 95, 네이버1784 4층</p><p>대표전화 <a href="tel:+82-2-582-1113">02-582-1113</a> · 이메일 <a href="mailto:contact@cubig.ai">contact@cubig.ai</a></p>'
              :'<p>CUBIG LTD (United Kingdom) · Company Number: NI735459 · 21 Arthur Street, Belfast, Antrim, United Kingdom, BT1 4GA</p><p>CUBIG CORP (Republic of Korea) · Business Registration: 133-81-45679 · E-Commerce Registration: 2023-Seoul-Seocho-2822 · 4F, NAVER 1784, 95, Jeongjail-ro, Bundang-gu, Seongnam-si, Gyeonggi-do, Republic of Korea</p><p>Tel <a href="tel:+82-2-582-1113">+82-2-582-1113</a> · Email <a href="mailto:contact@cubig.ai">contact@cubig.ai</a></p>';
    if(!SITE) body.appendChild(el('<footer class="ev-ft"><div class="wrap"><div class="ft-cols">'+cols+'</div><div class="ft-info">'+info+'</div>'+
      '<div class="ft-bot"><span>© '+new Date().getFullYear()+' CUBIG Corp. All Rights Reserved.</span><nav aria-label="'+(KO?'법적 고지':'Legal')+'"><a href="'+C+'cookie-policy/">'+(KO?'쿠키 정책':'Cookie Policy')+'</a><a href="'+C+'privacy-policy/">'+(KO?'개인정보 처리방침':'Privacy Policy')+'</a></nav></div></div></footer>'));

    document.dispatchEvent(new CustomEvent('ev:data',{detail:data}));
  }

  function start(){
    fetch('/events.json',{cache:'no-cache'}).then(function(r){return r.json();}).then(mount).catch(function(){ mount({events:[]}); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start); else start();
})();
