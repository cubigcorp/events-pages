/*
  CUBIG 행사·수상 역사 (2024.4 ~). 행사 하나 = 한 줄.
  kind: exhibition(전시) · pitch(피치·데모데이·발표) · award(수상·선정) · partner(기술 파트너·후원·심사 — 발표·수상이 아닌 무대 참여, 11-24) · live(크리에이터 방송) · next(예정)
  출처: 슬랙 #4-exhibition, 컨플 '(검토중) 수상 내역', cubig.ai/news (2026-11-14 정리)
  photo: 우리 슬랙 사진(photos/) 또는 cubig.ai 공식 이미지(press/)만. 날짜가 기사 게시일이면 note에 적음.
*/
/* 행사 목록 정본은 /events.json 하나입니다. 여기서는 그 파일을 읽어 연혁 모양으로 바꿉니다. */
var HISTORY = (function(){
  var ev;
  if(window.EVDATA){ ev=EVDATA.events; }
  else { var x=new XMLHttpRequest(), url=(document.querySelector('meta[name=ev-path]')?'':'/')+'events.json';
    try{ x.open('GET',url,false); x.send(); ev=JSON.parse(x.responseText).events; }catch(err){ return []; } }
  var t=new Date(); t.setHours(0,0,0,0);
  function day(s){ var p=s.split('-'); return new Date(+p[0],+p[1]-1,+p[2]); }
  var MN=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  /* date 칸이 비어 있으면 start·end 로 'Nov 9–12, 2026' 형식을 만듦 */
  function fmtEn(e){ var a=day(e.start), b=e.end?day(e.end):null, y=a.getFullYear();
    if(!b||+a===+b) return MN[a.getMonth()]+' '+a.getDate()+', '+y;
    if(a.getMonth()===b.getMonth()) return MN[a.getMonth()]+' '+a.getDate()+'–'+b.getDate()+', '+y;
    return MN[a.getMonth()]+' '+a.getDate()+'–'+MN[b.getMonth()]+' '+b.getDate()+', '+y; }
  return ev.filter(function(e){return e.kind||e.type;}).map(function(e){
    var up=day(e.end||e.start)>=t;   /* 아직 안 끝난 행사는 날짜로 자동 '예정' */
    var h={d:e.start, date:e.date||fmtEn(e), name:e.label||e.title, name_ko:e.label_ko||e.title_ko, city:e.city||e.place, kind:up?'next':(e.kind||e.type), type:e.type};
    ['cc','intl','ko','photo','credit','src','note','stamp','stamp_city'].forEach(function(k){ if(e[k]!==undefined) h[k]=e[k]; });
    if(e.page){ var pg=e.page.replace(/^\//,''); h.link=document.querySelector('meta[name=ev-path]')?pg:'/'+pg.replace(/index\.html$/,''); }
    return h;
  }).sort(function(a,b){ return a.d<b.d?1:-1; });
})();
/* ko:true 항목은 한국어 사이트에만 노출 */
var HISTORY_ALL = HISTORY;
if ((document.documentElement.lang||'en').slice(0,2)!=='ko') HISTORY = HISTORY.filter(function(e){return !e.ko;});
var IS_KO=(document.documentElement.lang||'en').slice(0,2)==='ko';
/* 한국어 사이트: name_ko가 있으면 이름 교체, 날짜는 'YYYY년 M월'로 */
var NAME_KO = {}; /* 한국어 이름은 events.json 의 label_ko 에 있습니다 */
var CITY_KO = {'Seoul':'서울','Seongnam':'성남','Las Vegas':'라스베이거스','Lisbon':'리스본','New York':'뉴욕','Paris':'파리','Osaka':'오사카','Tokyo':'도쿄','Osaka · Tokyo':'오사카 · 도쿄','Barcelona':'바르셀로나','Helsinki':'헬싱키','Singapore':'싱가포르','Silicon Valley':'실리콘밸리','Belfast':'벨파스트','Busan':'부산','Online':'온라인','US':'미국','Deutsche Telekom final':'Deutsche Telekom 결선'}; /* 국문 페이지에는 영어 지명을 쓰지 않음 (현세님 피드백 11/17). 새 도시는 여기에 추가 */
var MON_EN = {Jan:1,Feb:2,Mar:3,Apr:4,May:5,Jun:6,Jul:7,Aug:8,Sep:9,Oct:10,Nov:11,Dec:12};
/* 'Nov 9–12, 2026' → '2026년 11월 9–12일', 'Sep 30–Oct 2, 2025' → '2025년 9월 30일–10월 2일', 'Jun 2026' → '2026년 6월' */
function dateKo(t){
  var m;
  if ((m = t.match(/^(\w{3}) (\d+)–(\w{3}) (\d+), (\d{4})$/))) return m[5]+'년 '+MON_EN[m[1]]+'월 '+m[2]+'일–'+MON_EN[m[3]]+'월 '+m[4]+'일';
  if ((m = t.match(/^(\w{3}) (\d+)(?:–(\d+))?, (\d{4})$/))) return m[4]+'년 '+MON_EN[m[1]]+'월 '+m[2]+(m[3]?'–'+m[3]:'')+'일';
  if ((m = t.match(/^(\w{3}) (\d{4})$/))) return m[2]+'년 '+MON_EN[m[1]]+'월';
  return t;
}
if (IS_KO) HISTORY = HISTORY.map(function(e){var c={}; for(var k in e) c[k]=e[k]; c.name_en=e.name; c.city_en=e.city; c.name=e.name_ko||NAME_KO[e.name]||e.name; c.city=CITY_KO[e.city]||e.city; c.date=dateKo(e.date); return c;});


var KIND = IS_KO ? {exhibition:'전시', pitch:'피칭·발표', award:'수상', partner:'파트너·후원', live:'방송', next:'예정'} : {exhibition:'Exhibition', pitch:'Pitch & talk', award:'Award', partner:'Partner', live:'On air', next:'Next'};

/* 표 그리기: 연도별 묶음 + 종류 필터 */
(function(){
  var box=document.getElementById('history'), fbox=document.getElementById('histFilter'); if(!box) return;
  var cur='all';
  function counts(k){return HISTORY.filter(function(h){return k==='all'||h.kind===k;}).length;}
  function filters(){
    fbox.innerHTML=['all','exhibition','pitch','award','partner','live'].map(function(k){
      return '<button class="pill" data-k="'+k+'" aria-pressed="'+(cur===k)+'">'+(k==='all'?(IS_KO?'전체':'All'):KIND[k])+' <em>'+counts(k)+'</em></button>';}).join('');
  }
  /* 달력판: 연도마다 12칸(월), 칸 안에 행사 칩. 칩에 마우스를 올리면 사진·정보 미리보기 */
  var MON=IS_KO?['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월']:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  function chip(h){
    var href=(h.link&&IS_KO?'/ko'+h.link:h.link)||h.src, tag=href?'a':'div', ext=h.src&&!h.link;
    var short=h.name.split(' · ')[0];
    var pv='<span class="cv">'+(h.photo?'<span class="cv-im" style="background-image:url('+h.photo+')"></span>':'')+
      '<span class="cv-bd"><em class="k-'+h.kind+'">'+KIND[h.kind]+'</em><b>'+h.name+'</b><span>'+h.date+(h.city?' · '+h.city:'')+'</span>'+(h.credit?'<small class="cv-cr">'+h.credit+'</small>':'')+
      (href?'<u>'+(h.link?(IS_KO?'자세히 보기 ›':'Event page ›'):(IS_KO?'보도자료 보기 ↗':'Press release ↗'))+'</u>':'')+'</span></span>';
    return '<'+tag+' class="chip k-'+h.kind+'"'+(href?' href="'+href+'"'+(ext?' target="_blank" rel="noopener"':''):' tabindex="0"')+'>'+
      (h.photo?'<i style="background-image:url('+h.photo+')"></i>':'<i class="noimg"></i>')+'<span class="cn">'+short+'</span>'+pv+'</'+tag+'>';
  }
  function draw(){
    filters();
    var list=HISTORY.filter(function(x){return cur==='all'||x.kind===cur;});
    var years={}; list.forEach(function(x){var y=x.d.slice(0,4); (years[y]=years[y]||[]).push(x);});
    var now=new Date(), ny=now.getFullYear(), nm=now.getMonth();
    box.innerHTML=Object.keys(years).sort().reverse().map(function(y){
      var cols=MON.map(function(m,mi){
        var items=years[y].filter(function(x){return +x.d.slice(5,7)-1===mi;}).sort(function(p,q){return p.d<q.d?-1:1;});
        var isNow=(+y===ny&&mi===nm);
        return '<div class="mo'+(items.length?'':' empty')+(isNow?' now':'')+'" title="'+(IS_KO?y+'년 '+m:m+' '+y)+'"><div class="mh">'+(items.length||isNow||IS_KO?m:m.charAt(0))+(isNow?'<span>'+(IS_KO?'이번 달':'Now')+'</span>':'')+'</div>'+items.map(chip).join('')+'</div>';
      }).join('');
      var tmpl=MON.map(function(m,mi){ var has=years[y].some(function(x){return +x.d.slice(5,7)-1===mi;}); return (has||(+y===ny&&mi===nm))?'minmax(0,1fr)':'34px'; }).join(' ');
      return '<div class="cal"><div class="cal-y">'+y+'<small>'+years[y].length+(IS_KO?'건':' events')+'</small></div><div class="cal-g" style="grid-template-columns:'+tmpl+'">'+cols+'</div></div>';
    }).join('');
  }
  fbox.onclick=function(e){var b=e.target.closest('.pill'); if(b){cur=b.dataset.k; draw();}};
  draw();
})();
