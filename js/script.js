(function(){
  var body = document.body;
  var pages = document.querySelectorAll('.page');
  var navLinks = document.querySelectorAll('.nav-link, .nav-link-mobile');
  var rsvpShared = document.getElementById('rsvpShared');
  var mobileMenu = document.getElementById('mobileMenu');
  var menuToggle = document.getElementById('menuToggle');

  function showPage(id){
    pages.forEach(function(p){ p.hidden = p.dataset.page !== id; });
    navLinks.forEach(function(b){ b.classList.toggle('active', b.dataset.page === id); });
    if (rsvpShared) rsvpShared.style.display = (id === 'home') ? '' : 'none';
    mobileMenu.classList.remove('open');
    window.scrollTo(0, 0);
  }

  navLinks.forEach(function(b){
    b.addEventListener('click', function(){ showPage(b.dataset.page); });
  });
  document.getElementById('goHomeBtn').addEventListener('click', function(){ showPage('home'); });
  menuToggle.addEventListener('click', function(){ mobileMenu.classList.toggle('open'); });

  // language toggle
  var langBtns = document.querySelectorAll('.lang-btn');
  function setLang(l){
    body.setAttribute('data-lang', l);
    langBtns.forEach(function(b){ b.classList.toggle('active', b.dataset.lang === l); });
    try { localStorage.setItem('td_lang', l); } catch(e){}
  }
  langBtns.forEach(function(b){ b.addEventListener('click', function(){ setLang(b.dataset.lang); }); });
  var savedLang = 'en';
  try { savedLang = localStorage.getItem('td_lang') || 'en'; } catch(e){}
  var qLang = new URLSearchParams(location.search).get('lang');
  if (qLang === 'en' || qLang === 'ru') savedLang = qLang;
  setLang(savedLang);

  // init default page/nav active state
  var qPage = new URLSearchParams(location.search).get('page');
  showPage(qPage || 'home');

  // countdown
  var target = new Date('2027-06-19T18:30:00+03:00').getTime();
  function tick(){
    var now = Date.now();
    var diff = Math.max(0, target - now);
    var d = Math.floor(diff / 86400000);
    var h = Math.floor((diff % 86400000) / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    var pad = function(n){ return String(n).padStart(2,'0'); };
    var dd = document.getElementById('cd-days'), hh = document.getElementById('cd-hours'),
        mm = document.getElementById('cd-min'), ss = document.getElementById('cd-sec');
    if (dd) dd.textContent = pad(d);
    if (hh) hh.textContent = pad(h);
    if (mm) mm.textContent = pad(m);
    if (ss) ss.textContent = pad(s);
  }
  tick();
  setInterval(tick, 1000);

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      btn.closest('.faq-item').classList.toggle('open');
    });
  });

  // copy link
  var copyBtn = document.getElementById('copyLinkBtn');
  if (copyBtn) {
    copyBtn.addEventListener('click', function(){
      var url = 'https://revolut.me/tatiana08011';
      function done(){
        var en = copyBtn.querySelector('.en'), ru = copyBtn.querySelector('.ru');
        var prevEn = en.textContent, prevRu = ru.textContent;
        en.textContent = 'Copied'; ru.textContent = 'Скопировано';
        setTimeout(function(){ en.textContent = prevEn; ru.textContent = prevRu; }, 2200);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(done).catch(done);
      } else { done(); }
    });
  }

  // QR code
  function renderQR(){
    var el = document.getElementById('qrcode');
    if (!el || el.dataset.done) return;
    if (typeof window.QRCode === 'undefined') { setTimeout(renderQR, 150); return; }
    new window.QRCode(el, {
      text: 'https://revolut.me/tatiana08011',
      width: 152, height: 152,
      colorDark: '#2F343A', colorLight: '#FCFAF3',
      correctLevel: window.QRCode.CorrectLevel.M,
    });
    el.dataset.done = '1';
  }
  renderQR();
})();
