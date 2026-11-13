/*
  CUBIG 공통 머리글·바닥글 (events.cubig.ai)
  - 페이지 <head> 에 <script src="/assets/site-chrome.js" defer></script> 한 줄이면 위아래에 자동으로 붙습니다.
  - 빼고 싶은 페이지는 그 줄만 지우면 됩니다.
  - 이 파일을 고치면 모든 페이지에 반영됩니다. 수정은 마케팅팀 검토 후에만.
*/
(function () {
  var css = [
    '.cubig-hd{height:64px;padding:0 24px;border-bottom:1px solid #eee;background:#fff}',
    '.cubig-hd-in{max-width:960px;height:100%;margin:0 auto;display:flex;align-items:center}',
    '.cubig-hd a{display:inline-flex;align-items:center}',
    '.cubig-hd img{height:24px;width:auto;display:block}',
    '.cubig-ft{padding:32px 24px;border-top:1px solid #eee;background:#fff;color:#666;font-size:13px;line-height:1.6}',
    '.cubig-ft-in{max-width:960px;margin:0 auto;display:flex;flex-wrap:wrap;gap:8px 24px;justify-content:space-between;align-items:center}',
    '.cubig-ft nav{display:flex;flex-wrap:wrap;gap:8px 16px}',
    '.cubig-ft a{color:#666;text-decoration:none}',
    '.cubig-ft a:hover{text-decoration:underline}'
  ].join('');

  function mount() {
    if (document.querySelector('.cubig-hd')) return;
    var style = document.createElement('style');
    style.textContent = css;
    document.head.appendChild(style);

    var hd = document.createElement('header');
    hd.className = 'cubig-hd';
    hd.innerHTML = '<div class="cubig-hd-in"><a href="https://cubig.ai/" aria-label="CUBIG home">' +
      '<img src="/assets/cubig-logo.svg" alt="CUBIG" width="141" height="24"></a></div>';
    document.body.insertBefore(hd, document.body.firstChild);

    var ft = document.createElement('footer');
    ft.className = 'cubig-ft';
    ft.innerHTML = '<div class="cubig-ft-in">' +
      '<span>&copy; ' + new Date().getFullYear() + ' CUBIG Corp. All Rights Reserved.</span>' +
      '<nav aria-label="Legal">' +
      '<a href="https://cubig.ai/privacy-policy/">Privacy Policy</a>' +
      '<a href="https://cubig.ai/cookie-policy/">Cookie Policy</a>' +
      '<a href="https://cubig.ai/contact/">Contact</a>' +
      '</nav></div>';
    document.body.appendChild(ft);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
