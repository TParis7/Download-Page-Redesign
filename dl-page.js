/* ============================================================
   dl-page.js  v2.8.0
   Download Page — Pulse of Perseverance (P3)
   Repo: tparis7/Download-Page-Redesign
   ============================================================
   Renders the full /download page inside Webflow.
   Pixel-perfect match to GitHub prototype.
   ============================================================ */

(function () {
  'use strict';

  /* --- Execution guard: prevent duplicate rendering --- */
  if (document.querySelector('.dl-page')) return;

  /* ----------------------------------------------------------
     0. CONSTANTS / ASSET MAP
  ---------------------------------------------------------- */
  const WF = 'https://cdn.prod.website-files.com/69b02f65f0068e9fb16f09f7/';
  const GH = 'https://tparis7.github.io/Download-Page-Redesign/';

  const IMG = {
    logoW:    WF + '69b02f65f0068e9fb16f0df1_P3%20Logo.svg',
    qr:       WF + '69b02f65f0068e9fb16f0ddd_8e3543_be5994c0c9a84d0e9a649cbb4259a7b4~mv2.avif',
    ios:      WF + '69b02f65f0068e9fb16f0ddf_ios%20badge.svg',
    android:  WF + '69b02f65f0068e9fb16f0de0_android%20badge.svg',
    iphone:   WF + '69b04a4965cafd702dffba43_iphone-mockup-v2.png',
    feat1:    GH + 'New%20Mentor.jpeg',
    feat2:    GH + 'Milestone%20Pathways%20Mobile.png',
    feat3:    GH + 'IMG_1421.jpg',
    feat4:    GH + '224A1273_Original.jpg',
    feat5:    WF + '69b02f65f0068e9fb16f0e44_VersusWoman.png',
    feat6:    GH + 'Video%20collage.jpeg',
    video:    GH + 'p3-hero-bg.mp4',
  };

  const LINKS = {
    ios:      'https://apps.apple.com/us/app/p3-pulse-of-perseverance/id6478132244',
    android:  'https://play.google.com/store/apps/details?id=com.P3.prod',
    home:     'https://www.pulseofp3.org/',
    students: 'https://www.pulseofp3.org/for-students',
    partner:  'https://www.pulseofp3.org/partner',
    mentors:  'https://www.pulseofp3.org/for-mentors',
    about:    'https://www.pulseofp3.org/about/about',
    scholars: 'https://www.pulseofp3.org/scholarships',
    donate:   'https://www.pulseofp3.org/donate',
    ig:       'https://instagram.com/pulseofp3',
    li:       'https://linkedin.com/company/pulseofp3',
    yt:       'https://youtube.com/@pulseofp3',
    terms:    'https://www.pulseofp3.org/app-terms-conditions',
    team:     'https://www.pulseofp3.org/team',
    annual:   'https://www.pulseofp3.org/annual-report',
    press:    'https://www.pulseofp3.org/about/in-the-press',
  };

  /* ----------------------------------------------------------
     1. HELPERS
  ---------------------------------------------------------- */
  function el(tag, attrs, ...kids) {
    var e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function(k) {
      if (k === 'className') e.className = attrs[k];
      else if (k === 'innerHTML') e.innerHTML = attrs[k];
      else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(e.style, attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    kids.forEach(function(c) { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }

  function img(src, alt, cls) {
    var i = document.createElement('img');
    i.src = src; i.alt = alt || ''; i.loading = 'lazy';
    if (cls) i.className = cls;
    return i;
  }

  function lnk(href, cls, ...kids) {
    var a = el('a', { href: href, className: cls || '' });
    kids.forEach(function(c) { a.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return a;
  }

  /* ----------------------------------------------------------
     2. INJECT FONTS
  ---------------------------------------------------------- */
  function loadFonts() {
    var f1 = document.createElement('link');
    f1.rel = 'preconnect'; f1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(f1);
    var f2 = document.createElement('link');
    f2.rel = 'preconnect'; f2.href = 'https://fonts.gstatic.com'; f2.crossOrigin = '';
    document.head.appendChild(f2);
    var f3 = document.createElement('link');
    f3.rel = 'stylesheet';
    f3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap';
    document.head.appendChild(f3);
  }

  /* ----------------------------------------------------------
     3. INJECT CSS — pixel-perfect match to prototype
  ---------------------------------------------------------- */
  function injectCSS() {
    var css = [
'/* ===== CSS VARIABLES ===== */',
':root{--crimson:#D93A3A;--crimson-dark:#B82E2E;--maroon:#4A1020;--maroon-deep:#2e0614;--warm-gray:#FAF7F4;--warm-gray-2:#F0EBE5;--dark:#111;--light-text:#666;--radius:14px;--radius-lg:20px;--radius-xl:28px;--shadow-card:0 8px 32px rgba(0,0,0,0.06);--transition:0.35s cubic-bezier(0.25,0.46,0.45,0.94)}',

'/* ===== RESET / BASE ===== */',
'.dl-page *,.dl-page *::before,.dl-page *::after{box-sizing:border-box;margin:0;padding:0}',
'.dl-page{font-family:"Inter",sans-serif;color:#1a1a1a;overflow-x:hidden;-webkit-font-smoothing:antialiased}',
'.dl-page img{max-width:100%;display:block}',
'.dl-page a{text-decoration:none;color:inherit}',
'.dl-page strong{color:inherit!important}',
'.dl-page section{position:relative}',

'/* ===== NAV ===== */',
'.dl-nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:16px 40px;display:flex;align-items:center;justify-content:space-between;transition:background .3s,box-shadow .3s}',
'.dl-nav.scrolled{background:rgba(10,10,10,.95);box-shadow:0 1px 12px rgba(0,0,0,.25)}',
'.dl-nav-logo{height:36px;max-height:36px}',
'.dl-nav-links{display:flex;align-items:center;gap:32px}',
'.dl-nav-links a{color:rgba(255,255,255,.85);font-size:14px;font-weight:500;transition:color .2s}',
'.dl-nav-links a:hover{color:#fff}',
'.dl-nav-links .pp-home-desktop-hide{display:none}',
'.dl-nav-links .nav-cta{background:var(--crimson);color:#fff;padding:10px 24px;border-radius:50px;font-weight:600;font-size:14px;transition:background .2s}',
'.dl-nav-links .nav-cta:hover{background:var(--crimson-dark)}',
'.dl-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;z-index:1001}',
'.dl-hamburger span{width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .3s,opacity .3s}',
'.dl-hamburger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}',
'.dl-hamburger.open span:nth-child(2){opacity:0}',
'.dl-hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}',

'/* Mobile overlay */',
'.dl-mobile-menu{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(26,26,26,.98);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;opacity:0;pointer-events:none;transition:opacity .3s}',
'.dl-mobile-menu.open{opacity:1;pointer-events:auto}',
'.dl-mobile-menu a{color:#fff;font-family:"Space Grotesk",sans-serif;font-size:22px;font-weight:600}',
'.dl-mobile-menu .mob-cta{background:var(--crimson);color:#fff;padding:12px 28px;border-radius:100px;font-family:"Inter",sans-serif;font-weight:600;font-size:16px;margin-top:12px}',

'/* ===== HERO ===== */',
'.dl-hero{position:relative;background:linear-gradient(135deg,#1a0510 0%,#4a1020 35%,#2a0a14 60%,#140510 100%);min-height:100vh;overflow:hidden}',
'.dl-hero-video-bg{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:0}',
'.dl-hero-video-bg video{width:100%;height:100%;object-fit:cover;opacity:.15}',
'.dl-hero-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,rgba(26,5,16,.85),rgba(74,16,32,.6),rgba(42,10,20,.8),rgba(20,5,16,.9));z-index:1}',
'.dl-hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1.15fr 1fr;align-items:center;gap:40px;max-width:1240px;margin:0 auto;padding:140px 48px 100px}',
'.dl-hero-text h1{font-family:"Space Grotesk",sans-serif;font-size:52px;font-weight:700;color:#fff;line-height:1.1;margin-bottom:24px;letter-spacing:-0.02em}',
'.dl-hero-text h1 .line1{display:inline}',
'.dl-hero-text h1 .highlight{color:var(--crimson)}',
'.dl-hero-text .sub{font-size:16px;color:rgba(255,255,255,.75);line-height:1.6;max-width:500px;margin-bottom:32px}',
'.download-row{display:flex;gap:22px;align-items:flex-end}',
'.qr-card{background:#fff;border-radius:16px;padding:10px;text-align:center;flex-shrink:0;width:148px;box-shadow:0 16px 50px rgba(0,0,0,.35)}',
'.qr-card img{width:100%;height:auto;border-radius:8px}',
'.qr-label{display:block;text-align:center;font-size:10px;color:var(--maroon);font-weight:700;margin-top:6px;letter-spacing:1.5px;text-transform:uppercase;line-height:1.6}',
'.dl-final-cta .qr-card{width:130px}',
'.store-badges{display:flex;flex-direction:column;gap:10px}',
'.store-badges img{height:48px;cursor:pointer;transition:transform .15s}',
'.store-badges img:hover{transform:scale(1.04)}',
'.hero-meta{display:flex;align-items:center;gap:18px;margin-top:8px;font-size:13px;color:#fff}',
'.hero-meta strong{color:#fff!important;font-weight:600}',
'.hero-meta .dot{width:3px;height:3px;background:rgba(255,255,255,.35);border-radius:50%}',
'.dl-hero-visual{display:flex;justify-content:center;align-items:center}',
'.hero-iphone{width:400px;max-width:100%;filter:drop-shadow(0 40px 80px rgba(0,0,0,.55));position:relative;z-index:2}',

'/* ===== SCROLL HEADLINE ===== */',
'.dl-scroll-headline{background:#fff;padding:86px 48px;text-align:center}',
'.dl-scroll-headline h2{font-family:"Space Grotesk",sans-serif;font-size:56px;font-weight:700;line-height:1.1;max-width:820px;margin:0 auto}',
'.dl-scroll-headline h2 .word{display:inline-block;color:#e6e2dd;transition:color .6s ease;margin:0 6px}',
'.dl-scroll-headline h2 .word.active{color:#1a1a1a}',
'.dl-scroll-headline h2 .word.accent.active{color:var(--crimson)}',

'/* ===== FEATURES ===== */',
'.dl-features{background:var(--warm-gray);padding:44px 48px}',
'.dl-features-inner{max-width:1240px;margin:0 auto}',
'.dl-section-header{text-align:center;margin-bottom:36px}',
'.dl-section-tag{display:inline-block;font-size:12px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:var(--crimson);margin-bottom:16px;background:rgba(217,58,58,.08);padding:6px 16px;border-radius:50px}',
'.dl-section-header h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(28px,3.4vw,42px);font-weight:700;line-height:1.15;max-width:720px;margin:0 auto;color:var(--dark)}',
'.dl-section-header h2 span{color:var(--crimson)}',
'.dl-section-header p{font-size:16px;color:var(--light-text);max-width:560px;margin:14px auto 0;line-height:1.6}',
'.dl-feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}',
'.dl-feature-card{background:#fff;border-radius:var(--radius-lg);overflow:hidden;transition:transform var(--transition),box-shadow var(--transition)}',
'.dl-feature-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08)}',
'.dl-fc-vis{height:180px;background:var(--warm-gray-2);overflow:hidden;display:flex;align-items:center;justify-content:center}',
'.dl-fc-vis img{width:100%;height:100%;object-fit:cover}',
'.dl-fc-body{padding:20px 22px 24px}',
'.dl-fc-body h3{font-family:"Space Grotesk",sans-serif;font-size:18px;font-weight:600;color:var(--dark);margin-bottom:8px}',
'.dl-fc-body p{font-size:13px;color:var(--light-text);line-height:1.55}',

'/* ===== SAFETY ===== */',
'.dl-safety{background:var(--dark);padding:68px 48px}',
'.dl-safety-inner{max-width:1240px;margin:0 auto}',
'.dl-safety .dl-section-header{margin-bottom:42px}',
'.dl-safety .dl-section-header h2{color:#fff}',
'.dl-safety .dl-section-header p{color:rgba(255,255,255,.65)}',
'.dl-safety-lock{width:72px;height:72px;border-radius:20px;background:linear-gradient(135deg,rgba(217,58,58,.18),rgba(74,16,32,.3));border:1px solid rgba(217,58,58,.35);display:inline-flex;align-items:center;justify-content:center;margin-bottom:24px;color:var(--crimson)}',
'.dl-safety-lock svg{width:34px;height:34px}',
'.dl-safety-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px}',
'.dl-safety-card{background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.08);border-radius:var(--radius-lg);padding:32px 28px;transition:all var(--transition)}',
'.dl-safety-card:hover{background:rgba(255,255,255,.06);border-color:rgba(217,58,58,.3);transform:translateY(-4px)}',
'.dl-safety-card .sc-icon{width:44px;height:44px;border-radius:12px;background:rgba(217,58,58,.15);display:flex;align-items:center;justify-content:center;margin-bottom:18px;color:var(--crimson)}',
'.dl-safety-card .sc-icon svg{width:22px;height:22px}',
'.dl-safety-card h3{font-family:"Space Grotesk",sans-serif;font-size:18px;font-weight:700;color:#fff;line-height:1.25;margin-bottom:8px}',
'.dl-safety-card p{font-size:13px;color:rgba(255,255,255,.65);line-height:1.55}',

'/* ===== TALENT / IMPACT ===== */',
'.dl-talent{padding:82px 48px;overflow:hidden;background:linear-gradient(135deg,rgba(255,255,255,.73) 0%,rgba(250,247,244,.7) 50%,rgba(255,255,255,.73) 100%),#fff url(\"https://tparis7.github.io/Download-Page-Redesign/VersusWoman.png\") center/cover no-repeat}',
'.dl-talent-inner{display:grid;grid-template-columns:1.2fr 1fr;gap:60px;max-width:1240px;margin:0 auto;align-items:center;position:relative;z-index:1}',
'.dl-talent-statement{position:relative;overflow:visible}',
'.dl-quote-mark{font-family:"Space Grotesk",sans-serif;font-size:180px;line-height:.6;color:var(--crimson);opacity:.35;position:absolute;top:-40px;left:-20px;pointer-events:none;z-index:0;user-select:none}',
'.dl-talent-statement h2{font-family:"Space Grotesk",sans-serif;font-size:clamp(40px,5.8vw,80px);font-weight:700;line-height:1.02;color:var(--dark);letter-spacing:-0.03em;position:relative}',
'.dl-talent-statement h2 .accent{color:var(--crimson)}',
'.dl-talent-statement h2 .strike{position:relative;display:inline-block}',
'.dl-talent-statement h2 .strike::after{content:"";position:absolute;left:-4%;right:-4%;top:52%;height:6px;background:var(--crimson);border-radius:3px;transform:scaleX(0);transform-origin:left center;transition:transform .9s cubic-bezier(.2,.8,.2,1)}',
'.dl-talent-statement.in-view h2 .strike::after{transform:scaleX(1)}',
'.dl-talent-sub{margin-top:28px;font-size:16px;color:var(--light-text);max-width:480px;line-height:1.6}',
'.dl-talent-visual{display:flex;flex-direction:column;gap:16px}',
'.dl-talent-stat{background:var(--warm-gray);border-radius:var(--radius-lg);padding:24px 28px;border-left:3px solid var(--crimson);transition:all var(--transition)}',
'.dl-talent-stat:hover{transform:translateX(4px);box-shadow:0 12px 30px rgba(74,16,32,.08)}',
'.dl-talent-stat .num{font-family:"Space Grotesk",sans-serif;font-size:42px;font-weight:700;line-height:1;color:var(--dark);letter-spacing:-0.02em}',
'.dl-talent-stat .num .accent{color:var(--crimson)}',
'.dl-talent-stat .label{font-size:13px;color:var(--light-text);margin-top:6px;line-height:1.5}',

'/* ===== FINAL CTA ===== */',
'.dl-final-cta{background:linear-gradient(135deg,#2e0614 0%,#4a1020 50%,#2e0614 100%);padding:68px 48px;text-align:center}',
'.dl-final-cta-inner{max-width:900px;margin:0 auto}',
'.dl-final-cta h2{font-family:"Space Grotesk",sans-serif;font-size:46px;font-weight:700;color:#fff;margin-bottom:18px}',
'.dl-final-cta h2 .highlight{color:var(--crimson)}',
'.dl-final-cta .sub{font-size:16px;color:rgba(255,255,255,.7);margin-bottom:36px;line-height:1.6}',
'.dl-final-cta .final-cta-row{display:flex;justify-content:center;gap:22px;align-items:flex-end;margin-bottom:20px}',
'.dl-final-cta .final-cta-note{font-size:13px;color:#fff;margin-top:32px}',
'.dl-final-cta .final-cta-note strong{color:#fff!important;font-weight:600}',

'/* ===== FOOTER (pixel-match to homepage hp-shared-sections.js) ===== */',
'.dl-footer{background:#0a0a0a;padding:64px 40px 32px;color:rgba(255,255,255,.5)}',
'.dl-footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:40px;max-width:1100px;margin:0 auto;padding-bottom:40px;border-bottom:1px solid rgba(255,255,255,.1)}',
'.dl-footer-brand .p3-footer-logo{height:36px;width:auto;filter:brightness(0) invert(1)}',
'.dl-footer-brand .dl-footer-tagline{font-size:13px;color:rgba(255,255,255,.5);line-height:1.6;margin-top:0}',
'.dl-footer-brand .dl-footer-location{margin-top:10px;font-size:12px;color:rgba(255,255,255,.4)}',
'.dl-footer-col{display:flex;flex-direction:column;gap:4px}',
'.dl-footer-col h4{font-family:"Inter",sans-serif;font-size:11px;font-weight:700;color:rgba(255,255,255,.8);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:14px}',
'.dl-footer-col a{display:block;font-size:13px;color:rgba(255,255,255,.6);padding:3px 0;transition:color .2s;text-decoration:none}',
'.dl-footer-col a:hover{color:#fff}',
'.dl-footer-bottom{max-width:1100px;margin:0 auto;padding-top:24px;font-size:12px;color:rgba(255,255,255,.4);display:flex;justify-content:space-between;align-items:center}',
'.dl-footer-bottom p{margin:0;display:flex;justify-content:space-between;width:100%}',
'.dl-footer-bottom a{color:rgba(255,255,255,.4);text-decoration:underline;transition:color .2s}',
'.dl-footer-bottom a:hover{color:#fff}',

'/* ===== RESPONSIVE ===== */',
'@media(max-width:1024px){',
'  .dl-hero-inner{grid-template-columns:1fr;text-align:center;padding:120px 32px 60px}',
'  .dl-hero-text .sub{margin-left:auto;margin-right:auto}',
'  .download-row{justify-content:center}',
'  .hero-meta{justify-content:center}',
'  .dl-hero-visual{margin-top:24px}',
'  .hero-iphone{width:300px}',
'  .dl-scroll-headline h2{font-size:42px}',
'  .dl-feature-grid{grid-template-columns:repeat(2,1fr)}',
'  .dl-safety-grid{grid-template-columns:repeat(2,1fr)}',
'  .dl-talent-inner{grid-template-columns:1fr;gap:48px;text-align:center}',
'  .dl-talent-statement{text-align:center}',
'  .dl-quote-mark{position:relative;top:auto;left:auto;display:block;margin-bottom:-30px}',
'  .dl-talent-visual{flex-wrap:wrap;justify-content:center}',
'  .dl-talent-stat{flex:1 1 220px;max-width:280px}',
'  .dl-talent-sub{margin:28px auto 0}',
'  .dl-footer-grid{grid-template-columns:1fr 1fr;gap:32px}',
'}',
'@media(max-width:768px){',
'  .dl-nav{padding:14px 20px}',
'  .dl-nav-links{display:none}',
'  .dl-hamburger{display:flex}',
'  .dl-hero-inner{padding:110px 20px 50px;gap:24px}',
'  .dl-hero-text h1{font-size:36px}',
'  .dl-hero-text .sub{font-size:15px}',
'  .download-row{flex-direction:column;align-items:center;gap:16px}',
'  .store-badges{flex-direction:row;justify-content:center}',
'  .hero-iphone{width:260px}',
'  .dl-scroll-headline{padding:52px 24px}',
'  .dl-scroll-headline h2{font-size:32px}',
'  .dl-features{padding:48px 20px}',
'  .dl-feature-grid{grid-template-columns:1fr 1fr;gap:12px}',
'  .dl-fc-vis{height:120px}',
'  .dl-fc-body{padding:14px 14px 18px}',
'  .dl-fc-body h3{font-size:14px;margin-bottom:6px;line-height:1.25}',
'  .dl-fc-body p{font-size:12px;line-height:1.5}',
'  .dl-safety{padding:56px 20px}',
'  .dl-safety-lock{width:60px;height:60px;margin-bottom:18px}',
'  .dl-safety-lock svg{width:28px;height:28px}',
'  .dl-safety-grid{grid-template-columns:1fr;gap:14px}',
'  .dl-safety-card{padding:28px 22px;text-align:center;display:flex;flex-direction:column;align-items:center}',
'  .dl-safety-card .sc-icon{margin:0 auto 16px}',
'  .dl-safety-card p{max-width:360px;margin:0 auto}',
'  .dl-talent{padding:52px 20px}',
'  .dl-talent-statement{text-align:center}',
'  .dl-quote-mark{font-size:72px;position:relative;top:auto;left:auto;display:block;margin-bottom:-14px;opacity:.15}',
'  .dl-talent-statement h2{font-size:clamp(30px,8.5vw,44px);line-height:1.05}',
'  .dl-talent-sub{font-size:14px;margin:18px auto 0;max-width:440px}',
'  .dl-talent-visual{flex-direction:column;gap:8px;align-items:center}',
'  .dl-talent-stat{flex:0 0 auto;max-width:320px;width:100%;padding:10px 14px;text-align:center;border-left:none;border-top:2px solid var(--crimson);display:flex;flex-direction:column;align-items:center}',
'  .dl-talent-stat:hover{transform:none}',
'  .dl-talent-stat .num{font-size:22px;line-height:1}',
'  .dl-talent-stat .label{font-size:11.5px;margin-top:2px;max-width:260px;line-height:1.35}',
'  .dl-final-cta{padding:48px 20px}',
'  .dl-final-cta h2{font-size:32px}',
'  .dl-final-cta .final-cta-row{flex-direction:column;align-items:center;gap:16px}',
'  .dl-final-cta .final-cta-row .store-badges{flex-direction:row}',
'  .dl-footer{padding:40px 20px 24px}',
'  .dl-footer-grid{grid-template-columns:1fr;gap:32px}',
'  .dl-footer-bottom{text-align:center}',
'  .dl-footer-bottom p{flex-direction:column;gap:8px;align-items:center}',
'}',
'@media(max-width:480px){',
'  .dl-hero-text h1{font-size:30px}',
'  .dl-scroll-headline h2{font-size:26px}',
'  .dl-section-header h2{font-size:30px}',
'  .dl-final-cta h2{font-size:26px}',
'  .store-badges img{height:42px}',
'  .qr-card{display:none}',
'  .dl-talent-statement h2{font-size:30px}',
'  .dl-talent-stat .num{font-size:32px}',
'}'
    ].join('\n');

    var styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  /* ----------------------------------------------------------
     SVG ICONS (safety section)
  ---------------------------------------------------------- */
  var SVG_ICONS = {
    users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
    shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'
  };

  /* ----------------------------------------------------------
     4. BUILD NAV (matches homepage exactly)
  ---------------------------------------------------------- */
  function buildNav() {
    var nav = el('nav', { className: 'dl-nav' });

    // Logo — white SVG matching homepage
    var logoLink = lnk(LINKS.home, '');
    logoLink.appendChild(img(IMG.logoW, 'Pulse of Perseverance Project', 'dl-nav-logo'));
    nav.appendChild(logoLink);

    // Desktop links
    var links = el('div', { className: 'dl-nav-links' });

    // Home link — hidden on desktop, visible on mobile (matches homepage pattern)
    var homeLink = lnk(LINKS.home, 'pp-home-desktop-hide', 'Home');
    links.appendChild(homeLink);

    var navItems = [
      ['For Students', LINKS.students],
      ['For Institutions', LINKS.partner],
      ['For Mentors', LINKS.mentors],
      ['About', LINKS.about],
    ];
    navItems.forEach(function(item) { links.appendChild(lnk(item[1], '', item[0])); });

    var cta = lnk('#download', 'nav-cta', 'Get the App');
    links.appendChild(cta);
    nav.appendChild(links);

    // Hamburger
    var burger = el('div', { className: 'dl-hamburger' });
    burger.appendChild(el('span')); burger.appendChild(el('span')); burger.appendChild(el('span'));
    nav.appendChild(burger);

    // Mobile menu — Home IS visible here
    var mobileMenu = el('div', { className: 'dl-mobile-menu' });
    var mobItems = [
      ['Home', LINKS.home],
      ['For Students', LINKS.students],
      ['For Institutions', LINKS.partner],
      ['For Mentors', LINKS.mentors],
      ['About', LINKS.about],
    ];
    mobItems.forEach(function(item) { mobileMenu.appendChild(lnk(item[1], '', item[0])); });
    mobileMenu.appendChild(lnk('#download', 'mob-cta', 'Get the App'));

    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(function(a) {
      a.addEventListener('click', function () {
        burger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Scroll darken
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    return { nav: nav, mobileMenu: mobileMenu };
  }

  /* ----------------------------------------------------------
     5. HERO SECTION
  ---------------------------------------------------------- */
  function buildHero() {
    var section = el('section', { className: 'dl-hero', id: 'download' });

    // Video BG
    var videoBg = el('div', { className: 'dl-hero-video-bg' });
    var video = el('video', { autoplay: '', muted: '', loop: '', playsinline: '' });
    video.muted = true;
    video.appendChild(el('source', { src: IMG.video, type: 'video/mp4' }));
    videoBg.appendChild(video);
    section.appendChild(videoBg);

    // Overlay
    section.appendChild(el('div', { className: 'dl-hero-overlay' }));

    // Inner
    var inner = el('div', { className: 'dl-hero-inner' });

    // Left — text
    var textCol = el('div', { className: 'dl-hero-text' });
    var h1 = el('h1');
    h1.innerHTML = '<span class="line1">Download the P3 App</span><br>to <span class="highlight">Get Started</span>';
    textCol.appendChild(h1);
    textCol.appendChild(el('p', { className: 'sub' }, 'Join a growing community where students unlock life-changing opportunities and mentors share their expertise to open doors. Free on iOS & Android.'));

    // Download row
    var dlRow = el('div', { className: 'download-row' });
    var qrCard = el('div', { className: 'qr-card' });
    qrCard.appendChild(img(IMG.qr, 'Scan QR code to download the P3 app'));
    qrCard.appendChild(el('div', { className: 'qr-label' }, 'Scan to Download'));
    dlRow.appendChild(qrCard);

    var badges = el('div', { className: 'store-badges' });
    var iosLink = lnk(LINKS.ios, '');
    iosLink.target = '_blank'; iosLink.rel = 'noopener';
    iosLink.appendChild(img(IMG.ios, 'Download on the App Store'));
    badges.appendChild(iosLink);
    var andLink = lnk(LINKS.android, '');
    andLink.target = '_blank'; andLink.rel = 'noopener';
    andLink.appendChild(img(IMG.android, 'Get it on Google Play'));
    badges.appendChild(andLink);
    dlRow.appendChild(badges);
    textCol.appendChild(dlRow);

    // Stats
    var meta = el('div', { className: 'hero-meta' });
    meta.innerHTML = '<span><strong>\u2605 4.9</strong> App Store</span><span class="dot"></span><span><strong>900+</strong> users connected</span>';
    textCol.appendChild(meta);
    inner.appendChild(textCol);

    // Right — phone
    var visual = el('div', { className: 'dl-hero-visual' });
    visual.appendChild(img(IMG.iphone, 'P3 App shown on iPhone', 'hero-iphone'));
    inner.appendChild(visual);

    section.appendChild(inner);
    return section;
  }

  /* ----------------------------------------------------------
     6. SCROLL HEADLINE
  ---------------------------------------------------------- */
  function buildScrollHeadline() {
    var section = el('section', { className: 'dl-scroll-headline' });
    var h2 = el('h2');
    var words = [
      { text: 'The', accent: false },
      { text: 'free,', accent: false },
      { text: 'always-on', accent: false },
      { text: 'digital mentorship', accent: true },
      { text: 'platform', accent: false },
      { text: 'for', accent: false },
      { text: "today\u2019s", accent: false },
      { text: 'generation.', accent: false },
    ];
    words.forEach(function(w) {
      var span = el('span', { className: 'word' + (w.accent ? ' accent' : '') }, w.text);
      h2.appendChild(span);
      h2.appendChild(document.createTextNode(' '));
    });
    section.appendChild(h2);

    function revealWords() {
      var rect = section.getBoundingClientRect();
      var vh = window.innerHeight;
      var progress = 1 - (rect.top / (vh * 0.6));
      var spans = h2.querySelectorAll('.word');
      spans.forEach(function(s, i) {
        s.classList.toggle('active', progress > i / spans.length);
      });
    }
    window.addEventListener('scroll', revealWords, { passive: true });
    revealWords();

    return section;
  }

  /* ----------------------------------------------------------
     7. FEATURES SECTION
  ---------------------------------------------------------- */
  function buildFeatures() {
    var section = el('section', { className: 'dl-features' });
    var inner = el('div', { className: 'dl-features-inner' });

    var header = el('div', { className: 'dl-section-header' });
    header.appendChild(el('span', { className: 'dl-section-tag' }, 'Inside the app'));
    var h2 = el('h2');
    h2.innerHTML = 'Built for <span>ambitious</span> students.';
    header.appendChild(h2);
    header.appendChild(el('p', null, 'Six tools designed to turn curiosity into career momentum \u2014 without the friction.'));
    inner.appendChild(header);

    var grid = el('div', { className: 'dl-feature-grid' });
    var cards = [
      { img: IMG.feat1, alt: 'AI Smart Match', title: 'AI Smart Match', desc: 'AI-powered matching pairs students with the right industry mentor in seconds \u2014 across any field.' },
      { img: IMG.feat2, alt: 'Milestone Tracking', title: 'Milestone Tracking', desc: 'Students check off achievements \u2014 from first campus visit to first job \u2014 building longitudinal data.' },
      { img: IMG.feat3, alt: 'Career Opportunities', title: 'Career Opportunities', desc: 'A full marketplace of internships, jobs, college-readiness resources, and diverse career pathways.' },
      { img: IMG.feat4, alt: 'Monthly Scholarships', title: 'Monthly Scholarships', desc: "Reducing financial barriers with P3\u2019s own monthly scholarship plus hundreds of curated awards." },
      { img: IMG.feat5, alt: 'Mentorship Guide', title: 'Mentorship Guide', desc: 'A peer-reviewed guide co-developed with university partners to maximize mentor effectiveness.' },
      { img: IMG.feat6, alt: 'Mentor Question Portal', title: 'Mentor Question Portal', desc: 'Any student \u2014 even unregistered \u2014 can ask mentors questions 24/7, removing every barrier to guidance.' },
    ];
    cards.forEach(function(c) {
      var card = el('div', { className: 'dl-feature-card' });
      var vis = el('div', { className: 'dl-fc-vis' });
      vis.appendChild(img(c.img, c.alt));
      card.appendChild(vis);
      var body = el('div', { className: 'dl-fc-body' });
      body.appendChild(el('h3', null, c.title));
      body.appendChild(el('p', null, c.desc));
      card.appendChild(body);
      grid.appendChild(card);
    });
    inner.appendChild(grid);
    section.appendChild(inner);
    return section;
  }

  /* ----------------------------------------------------------
     8. SAFETY SECTION (no section tag — matches prototype)
  ---------------------------------------------------------- */
  function buildSafety() {
    var section = el('section', { className: 'dl-safety' });
    var inner = el('div', { className: 'dl-safety-inner' });

    var header = el('div', { className: 'dl-section-header' });
    // Lock icon
    var lockIcon = el('div', { className: 'dl-safety-lock' });
    lockIcon.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>';
    header.appendChild(lockIcon);
    header.appendChild(el('h2', null, 'Built with student safety at the core.'));
    header.appendChild(el('p', null, 'Every layer of the P3 platform is designed to keep students protected \u2014 from mentor onboarding to the messages they see in-app.'));
    inner.appendChild(header);

    var grid = el('div', { className: 'dl-safety-grid' });
    var items = [
      { icon: 'users', title: 'Vetted Mentors', desc: 'Every mentor is personally invited or sourced from trusted partner organizations \u2014 then onboarded with P3 workshops.' },
      { icon: 'check', title: 'Manual Approval', desc: 'Every mentor account is manually reviewed and approved by P3 before they can be matched with any mentee.' },
      { icon: 'shield', title: 'Safe by Design', desc: 'No private messaging. Mentors never see personal info. Students ask text questions; mentors respond via public video.' },
    ];
    items.forEach(function(item) {
      var card = el('div', { className: 'dl-safety-card' });
      var iconWrap = el('div', { className: 'sc-icon' });
      iconWrap.innerHTML = SVG_ICONS[item.icon];
      card.appendChild(iconWrap);
      card.appendChild(el('h3', null, item.title));
      card.appendChild(el('p', null, item.desc));
      grid.appendChild(card);
    });
    inner.appendChild(grid);
    section.appendChild(inner);
    return section;
  }

  /* ----------------------------------------------------------
     9. TALENT / IMPACT SECTION
  ---------------------------------------------------------- */
  function buildTalent() {
    var section = el('section', { className: 'dl-talent' });
    var inner = el('div', { className: 'dl-talent-inner' });

    // Left — statement
    var statement = el('div', { className: 'dl-talent-statement' });

    // Watermark quote mark — real DOM element (matches prototype exactly)
    statement.appendChild(el('div', { className: 'dl-quote-mark' }, '\u201C'));

    var h2 = el('h2');
    h2.innerHTML = '\n        Talent is <span class="accent">universal.</span><br>\n        <span class="strike">Access</span> <span class="accent">is not.</span>\n      ';
    statement.appendChild(h2);
    statement.appendChild(el('p', { className: 'dl-talent-sub' }, 'P3 exists to close that gap \u2014 one mentor, one scholarship, one career pathway at a time. Every student, regardless of zip code, deserves a mentor who can open the right door.'));
    inner.appendChild(statement);

    // Right — stats with accent-colored symbols
    var visual = el('div', { className: 'dl-talent-visual' });
    var stats = [
      { num: '30', symbol: '%', label: 'of students today can access a mentor' },
      { num: '85', symbol: '%', label: 'of jobs are filled through professional networks' },
      { num: '5', symbol: '\u00D7', label: 'more likely to succeed with a mentor in their corner' },
    ];
    stats.forEach(function(s) {
      var card = el('div', { className: 'dl-talent-stat' });
      var numEl = el('div', { className: 'num' });
      numEl.innerHTML = s.num + '<span class="accent">' + s.symbol + '</span>';
      card.appendChild(numEl);
      card.appendChild(el('div', { className: 'label' }, s.label));
      visual.appendChild(card);
    });
    inner.appendChild(visual);
    section.appendChild(inner);

    // IntersectionObserver for strike-through animation
    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            statement.classList.add('in-view');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      observer.observe(statement);
    } else {
      statement.classList.add('in-view');
    }

    return section;
  }

  /* ----------------------------------------------------------
     10. FINAL CTA
  ---------------------------------------------------------- */
  function buildFinalCTA() {
    var section = el('section', { className: 'dl-final-cta' });
    var inner = el('div', { className: 'dl-final-cta-inner' });

    var h2 = el('h2');
    h2.innerHTML = 'Your journey <span class="highlight">starts here.</span>';
    inner.appendChild(h2);
    inner.appendChild(el('p', { className: 'sub' }, 'Download P3 free on iOS or Android. Your mentor \u2014 and your next opportunity \u2014 are one tap away.'));

    var row = el('div', { className: 'final-cta-row' });
    var qr = el('div', { className: 'qr-card' });
    qr.appendChild(img(IMG.qr, 'Scan QR code to download the P3 app'));
    qr.appendChild(el('div', { className: 'qr-label' }, 'Scan to Download'));
    row.appendChild(qr);

    var badges = el('div', { className: 'store-badges' });
    var iosLink = lnk(LINKS.ios, '');
    iosLink.target = '_blank'; iosLink.rel = 'noopener';
    iosLink.appendChild(img(IMG.ios, 'Download on the App Store'));
    badges.appendChild(iosLink);
    var andLink = lnk(LINKS.android, '');
    andLink.target = '_blank'; andLink.rel = 'noopener';
    andLink.appendChild(img(IMG.android, 'Get it on Google Play'));
    badges.appendChild(andLink);
    row.appendChild(badges);
    inner.appendChild(row);

    var note = el('div', { className: 'final-cta-note' });
    note.innerHTML = '<strong>Free forever.</strong> No ads. No catch. Just opportunity.';
    inner.appendChild(note);

    section.appendChild(inner);
    return section;
  }

  /* ----------------------------------------------------------
     11. FOOTER
  ---------------------------------------------------------- */
  function buildFooter() {
    var footer = el('footer', { className: 'dl-footer' });
    var grid = el('div', { className: 'dl-footer-grid' });

    // Brand column — logo with brightness filter (matches homepage exactly)
    var brand = el('div', { className: 'dl-footer-brand' });
    var fLogo = img(IMG.logoW, 'Pulse of Perseverance Project', 'p3-footer-logo');
    brand.appendChild(fLogo);
    brand.appendChild(el('p', { className: 'dl-footer-tagline' }, 'Unlocking life-changing opportunities for young visionaries. Free on iOS & Android.'));
    brand.appendChild(el('p', { className: 'dl-footer-location' }, 'Chicago, IL \u00B7 Founded 2018'));
    grid.appendChild(brand);

    // Platform column
    var col1 = el('div', { className: 'dl-footer-col' });
    col1.appendChild(el('h4', null, 'Platform'));
    col1.appendChild(lnk(LINKS.students, '', 'For Students'));
    col1.appendChild(lnk(LINKS.mentors, '', 'For Mentors'));
    col1.appendChild(lnk(LINKS.partner, '', 'For Institutions'));
    col1.appendChild(lnk(LINKS.scholars, '', 'Scholarships'));
    grid.appendChild(col1);

    // About column
    var col2 = el('div', { className: 'dl-footer-col' });
    col2.appendChild(el('h4', null, 'About'));
    col2.appendChild(lnk(LINKS.about, '', 'Our Story'));
    col2.appendChild(lnk(LINKS.team, '', 'Team'));
    col2.appendChild(lnk(LINKS.annual, '', 'Annual Report'));
    col2.appendChild(lnk(LINKS.press, '', 'Press'));
    grid.appendChild(col2);

    // Connect column
    var col3 = el('div', { className: 'dl-footer-col' });
    col3.appendChild(el('h4', null, 'Connect'));
    var igLink = lnk(LINKS.ig, '', 'Instagram');
    igLink.target = '_blank'; igLink.rel = 'noopener'; col3.appendChild(igLink);
    var liLink = lnk(LINKS.li, '', 'LinkedIn');
    liLink.target = '_blank'; liLink.rel = 'noopener'; col3.appendChild(liLink);
    var ytLink = lnk(LINKS.yt, '', 'YouTube');
    ytLink.target = '_blank'; ytLink.rel = 'noopener'; col3.appendChild(ytLink);
    col3.appendChild(lnk(LINKS.donate, '', 'Donate'));
    grid.appendChild(col3);

    footer.appendChild(grid);

    // Bottom bar — single <p> with text + link (matches homepage exactly)
    var bottom = el('div', { className: 'dl-footer-bottom' });
    var bottomP = el('p');
    bottomP.appendChild(document.createTextNode('\u00A9 2026 Pulse of Perseverance Project. All rights reserved. '));
    bottomP.appendChild(lnk(LINKS.terms, '', 'Terms & Conditions'));
    bottom.appendChild(bottomP);
    footer.appendChild(bottom);

    return footer;
  }

  /* ----------------------------------------------------------
     12. INIT — HIDE WEBFLOW NATIVE & MOUNT
  ---------------------------------------------------------- */
  function init() {
    loadFonts();
    injectCSS();

    // Aggressively hide ALL Webflow native nav/footer elements
    var hideCSS = document.createElement('style');
    hideCSS.textContent = '.w-nav,.navbar,.footer-v2,.w--nav-menu,[data-wf-page]>.navbar,[data-wf-page]>footer,.w-nav-overlay{display:none!important;visibility:hidden!important;height:0!important;overflow:hidden!important}';
    document.head.appendChild(hideCSS);

    document.querySelectorAll('.w-nav, .navbar, .footer-v2, .w--nav-menu, .w-nav-overlay').forEach(function(e) {
      e.style.display = 'none';
      e.style.visibility = 'hidden';
    });

    // Create wrapper
    var wrapper = el('div', { className: 'dl-page' });

    var navResult = buildNav();
    wrapper.appendChild(navResult.nav);
    wrapper.appendChild(navResult.mobileMenu);
    wrapper.appendChild(buildHero());
    wrapper.appendChild(buildScrollHeadline());
    wrapper.appendChild(buildFeatures());
    wrapper.appendChild(buildSafety());
    wrapper.appendChild(buildTalent());
    wrapper.appendChild(buildFinalCTA());
    wrapper.appendChild(buildFooter());

    // Mount to body
    document.body.prepend(wrapper);

    // Fire GA page_view if gtag exists
    if (typeof gtag === 'function') {
      gtag('event', 'page_view', { page_title: 'Download the P3 App', page_path: '/download' });
    }

    // Track app download clicks for GA4
    document.querySelectorAll('.dl-page a').forEach(function(a) {
      var href = a.getAttribute('href') || '';
      if (href.indexOf('apps.apple.com') !== -1) {
        a.addEventListener('click', function () {
          if (typeof gtag === 'function') gtag('event', 'app_download_click', { platform: 'ios' });
        });
      }
      if (href.indexOf('play.google.com') !== -1) {
        a.addEventListener('click', function () {
          if (typeof gtag === 'function') gtag('event', 'app_download_click_android', { platform: 'android' });
        });
      }
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
