/* ============================================================
   dl-page.js  v1.1.0
   Download Page — Pulse of Perseverance (P3)
   Repo: tparis7/Download-Page-Redesign
   ============================================================
   Renders the full /download page inside Webflow.
   Loads via a small inline Webflow script tag (footer).
   v1.1.0 — Fixes: duplicate guard, H1 styling, iPhone size,
            section-tag pill, safety icons + card radius,
            talent gap, final CTA spacing, nav/footer match
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
    logoH:    WF + '69b04a49d86c8d9ea145304a_p3-logo-horizontal.png',
    logoW:    WF + '69b02f65f0068e9fb16f0df1_P3%20Logo.svg',
    logoNav:  WF + '69b02f65f0068e9fb16f0df1_P3%20Logo.svg',
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
    const e = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(k => {
      if (k === 'className') e.className = attrs[k];
      else if (k === 'innerHTML') e.innerHTML = attrs[k];
      else if (k === 'style' && typeof attrs[k] === 'object') Object.assign(e.style, attrs[k]);
      else e.setAttribute(k, attrs[k]);
    });
    kids.forEach(c => { if (c) e.appendChild(typeof c === 'string' ? document.createTextNode(c) : c); });
    return e;
  }

  function img(src, alt, cls) {
    const i = document.createElement('img');
    i.src = src; i.alt = alt || ''; i.loading = 'lazy';
    if (cls) i.className = cls;
    return i;
  }

  function link(href, cls, ...kids) {
    const a = el('a', { href: href, className: cls || '' });
    kids.forEach(c => a.appendChild(typeof c === 'string' ? document.createTextNode(c) : c));
    return a;
  }

  /* ----------------------------------------------------------
     2. INJECT FONTS
  ---------------------------------------------------------- */
  function loadFonts() {
    const f1 = document.createElement('link');
    f1.rel = 'preconnect'; f1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(f1);

    const f2 = document.createElement('link');
    f2.rel = 'preconnect'; f2.href = 'https://fonts.gstatic.com'; f2.crossOrigin = '';
    document.head.appendChild(f2);

    const f3 = document.createElement('link');
    f3.rel = 'stylesheet';
    f3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600;700&display=swap';
    document.head.appendChild(f3);
  }

  /* ----------------------------------------------------------
     3. INJECT CSS
  ---------------------------------------------------------- */
  function injectCSS() {
    const css = `
/* ===== RESET / BASE ===== */
.dl-page *,.dl-page *::before,.dl-page *::after{box-sizing:border-box;margin:0;padding:0}
.dl-page{font-family:'Inter',sans-serif;color:#1a1a1a;overflow-x:hidden;-webkit-font-smoothing:antialiased}
.dl-page img{max-width:100%;display:block}
.dl-page a{text-decoration:none;color:inherit}
.dl-page section{position:relative}

/* ===== NAV ===== */
.dl-nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:16px 40px;display:flex;align-items:center;justify-content:space-between;transition:background .3s,box-shadow .3s}
.dl-nav.scrolled{background:rgba(10,10,10,.95);box-shadow:0 1px 12px rgba(0,0,0,.25)}
.dl-nav-logo{height:36px;max-height:36px}
.dl-nav-links{display:flex;align-items:center;gap:28px}
.dl-nav-links a{color:rgba(255,255,255,.85);font-size:14px;font-weight:500;transition:color .2s}
.dl-nav-links a:hover{color:#fff}
.dl-nav-links .nav-cta{background:#D93A3A;color:#fff;padding:10px 22px;border-radius:100px;font-weight:600;font-size:14px;transition:background .2s}
.dl-nav-links .nav-cta:hover{background:#c03030}
.dl-hamburger{display:none;flex-direction:column;gap:5px;cursor:pointer;padding:8px;z-index:1001}
.dl-hamburger span{width:22px;height:2px;background:#fff;border-radius:2px;transition:transform .3s,opacity .3s}
.dl-hamburger.open span:nth-child(1){transform:rotate(45deg) translate(5px,5px)}
.dl-hamburger.open span:nth-child(2){opacity:0}
.dl-hamburger.open span:nth-child(3){transform:rotate(-45deg) translate(5px,-5px)}

/* Mobile overlay */
.dl-mobile-menu{position:fixed;top:0;left:0;right:0;bottom:0;background:rgba(10,10,10,.98);z-index:999;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:28px;opacity:0;pointer-events:none;transition:opacity .3s}
.dl-mobile-menu.open{opacity:1;pointer-events:auto}
.dl-mobile-menu a{color:#fff;font-size:20px;font-weight:500}
.dl-mobile-menu .mob-cta{background:#D93A3A;color:#fff;padding:14px 36px;border-radius:100px;font-weight:600;font-size:16px;margin-top:12px}

/* ===== HERO ===== */
.dl-hero{position:relative;background:linear-gradient(135deg,#1a0510 0%,#4a1020 35%,#2a0a14 60%,#140510 100%);min-height:100vh;overflow:hidden}
.dl-hero-video-bg{position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:0}
.dl-hero-video-bg video{width:100%;height:100%;object-fit:cover;opacity:.15}
.dl-hero-overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(135deg,rgba(26,5,16,.85),rgba(74,16,32,.6),rgba(42,10,20,.8),rgba(20,5,16,.9));z-index:1}
.dl-hero-inner{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:40px;max-width:1240px;margin:0 auto;padding:140px 48px 100px}
.dl-hero-text h1{font-family:'Space Grotesk',sans-serif;font-size:52px;font-weight:700;color:#fff;line-height:1.1;margin-bottom:14px}
.dl-hero-text h1 .line1{display:block}
.dl-hero-text h1 .highlight{color:#D93A3A}
.dl-hero-text .sub{font-size:16px;color:rgba(255,255,255,.75);line-height:1.6;max-width:480px;margin-bottom:28px}
.download-row{display:flex;gap:22px;align-items:flex-end}
.qr-card{background:#fff;border-radius:16px;padding:10px;text-align:center;flex-shrink:0}
.qr-card img{width:128px;border-radius:8px}
.qr-label{font-size:10px;color:#4a1020;font-weight:600;margin-top:6px;letter-spacing:.5px}
.store-badges{display:flex;flex-direction:column;gap:10px}
.store-badges img{height:48px;cursor:pointer;transition:transform .15s}
.store-badges img:hover{transform:scale(1.04)}
.hero-meta{display:flex;align-items:center;gap:18px;margin-top:8px;font-size:13px;color:rgba(255,255,255,.65)}
.hero-meta .dot{width:3px;height:3px;background:rgba(255,255,255,.35);border-radius:50%}
.dl-hero-visual{display:flex;justify-content:center;align-items:center}
.hero-iphone{max-width:320px;width:100%;filter:drop-shadow(0 24px 48px rgba(0,0,0,.4))}

/* ===== SCROLL HEADLINE ===== */
.dl-scroll-headline{background:#fff;padding:86px 48px;text-align:center}
.dl-scroll-headline h2{font-family:'Space Grotesk',sans-serif;font-size:56px;font-weight:700;line-height:1.1;max-width:820px;margin:0 auto}
.dl-scroll-headline h2 .word{display:inline-block;color:#e6e2dd;transition:color .6s ease;margin:0 6px}
.dl-scroll-headline h2 .word.active{color:#1a1a1a}
.dl-scroll-headline h2 .word.accent.active{color:#D93A3A}

/* ===== FEATURES ===== */
.dl-features{background:#faf7f4;padding:68px 48px}
.dl-features-inner{max-width:1240px;margin:0 auto}
.dl-section-header{text-align:center;margin-bottom:48px}
.dl-section-tag{display:inline-block;font-size:12px;font-weight:600;letter-spacing:1.5px;text-transform:uppercase;color:#D93A3A;margin-bottom:12px;background:rgba(217,58,58,.08);padding:6px 16px;border-radius:50px}
.dl-section-header h2{font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:700;color:#1a1a1a;margin-bottom:14px}
.dl-section-header h2 span{color:#D93A3A}
.dl-section-header p{font-size:16px;color:#666;max-width:540px;margin:0 auto;line-height:1.6}
.dl-feature-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.dl-feature-card{background:#fff;border-radius:20px;overflow:hidden;transition:transform .2s,box-shadow .2s}
.dl-feature-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08)}
.dl-fc-vis{height:180px;background:#f0ebe5;overflow:hidden;display:flex;align-items:center;justify-content:center}
.dl-fc-vis img{width:100%;height:100%;object-fit:cover}
.dl-fc-body{padding:20px 22px 24px}
.dl-fc-body h3{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;color:#1a1a1a;margin-bottom:8px}
.dl-fc-body p{font-size:13px;color:#666;line-height:1.55}

/* ===== SAFETY ===== */
.dl-safety{background:#111;padding:68px 48px}
.dl-safety-inner{max-width:1240px;margin:0 auto}
.dl-safety .dl-section-header{margin-bottom:42px}
.dl-safety .dl-section-header h2{color:#fff}
.dl-safety .dl-section-header p{color:rgba(255,255,255,.65)}
.dl-safety .dl-section-tag{background:rgba(217,58,58,.15);color:#ff6b6b}
.dl-safety-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:22px}
.dl-safety-card{background:rgba(255,255,255,.04);padding:32px 28px;border-radius:20px;border:1px solid rgba(255,255,255,.06)}
.dl-safety-card .sc-icon{width:44px;height:44px;background:rgba(217,58,58,.15);border-radius:12px;display:flex;align-items:center;justify-content:center;margin-bottom:16px}
.dl-safety-card .sc-icon svg{width:22px;height:22px;color:#D93A3A}
.dl-safety-card h3{font-family:'Space Grotesk',sans-serif;font-size:18px;font-weight:600;color:#fff;margin-bottom:10px}
.dl-safety-card p{font-size:13px;color:rgba(255,255,255,.55);line-height:1.6}

/* ===== TALENT / IMPACT ===== */
.dl-talent{background:#fff;padding:82px 48px}
.dl-talent-inner{display:grid;grid-template-columns:55% 45%;gap:60px;max-width:1240px;margin:0 auto;align-items:center}
.dl-talent-statement{}
.dl-quote-mark{font-size:180px;line-height:.6;color:#D93A3A;font-family:Georgia,serif;margin-bottom:0}
.dl-talent h2{font-family:'Space Grotesk',sans-serif;font-size:clamp(42px,5.5vw,78px);font-weight:700;color:#111;line-height:1.05;margin-bottom:18px}
.dl-talent-sub{font-size:16px;color:#666;line-height:1.65;max-width:520px}
.dl-talent-visual{display:flex;flex-direction:column;gap:16px}
.dl-talent-stat{background:#faf7f4;border-radius:20px;padding:24px 28px}
.dl-talent-stat .num{font-family:'Space Grotesk',sans-serif;font-size:42px;font-weight:700;color:#111;margin-bottom:4px}
.dl-talent-stat .label{font-size:13px;color:#666;line-height:1.5}

/* ===== FINAL CTA ===== */
.dl-final-cta{background:linear-gradient(135deg,#2e0614 0%,#4a1020 50%,#2e0614 100%);padding:68px 48px;text-align:center}
.dl-final-cta-inner{max-width:900px;margin:0 auto}
.dl-final-cta h2{font-family:'Space Grotesk',sans-serif;font-size:46px;font-weight:700;color:#fff;margin-bottom:18px}
.dl-final-cta h2 .highlight{color:#D93A3A}
.dl-final-cta .sub{font-size:16px;color:rgba(255,255,255,.7);margin-bottom:36px;line-height:1.6}
.dl-final-cta .final-cta-row{display:flex;justify-content:center;gap:22px;align-items:flex-end;margin-bottom:20px}
.dl-final-cta .final-cta-note{font-size:13px;color:rgba(255,255,255,.5);margin-top:32px}
.dl-final-cta .final-cta-note strong{color:rgba(255,255,255,.7);font-weight:600}

/* ===== FOOTER ===== */
.dl-footer{background:#0a0a0a;padding:64px 40px 32px;color:#fff}
.dl-footer-grid{display:grid;grid-template-columns:1.5fr 1fr 1fr 1fr;gap:48px;max-width:1240px;margin:0 auto}
.dl-footer-brand p{font-size:13px;color:rgba(255,255,255,.55);line-height:1.6;margin-top:14px}
.dl-footer-brand .loc{margin-top:8px;font-size:12px;color:rgba(255,255,255,.35)}
.dl-footer-brand img{height:28px;margin-bottom:4px}
.dl-footer-col h4{font-family:'Space Grotesk',sans-serif;font-size:13px;font-weight:600;color:rgba(255,255,255,.4);text-transform:uppercase;letter-spacing:1.5px;margin-bottom:18px}
.dl-footer-col a{display:block;font-size:14px;color:rgba(255,255,255,.7);margin-bottom:12px;transition:color .2s}
.dl-footer-col a:hover{color:#fff}
.dl-footer-bottom{border-top:1px solid rgba(255,255,255,.08);margin-top:48px;padding-top:24px;display:flex;justify-content:space-between;align-items:center;max-width:1240px;margin-left:auto;margin-right:auto;font-size:12px;color:rgba(255,255,255,.35)}
.dl-footer-bottom a{color:rgba(255,255,255,.5);transition:color .2s}
.dl-footer-bottom a:hover{color:#fff}

/* ===== RESPONSIVE ===== */
@media(max-width:1024px){
  .dl-hero-inner{grid-template-columns:1fr;text-align:center;padding:120px 32px 60px}
  .dl-hero-text .sub{margin-left:auto;margin-right:auto}
  .download-row{justify-content:center}
  .hero-meta{justify-content:center}
  .dl-hero-visual{margin-top:24px}
  .hero-iphone{max-width:280px}
  .dl-scroll-headline h2{font-size:42px}
  .dl-feature-grid{grid-template-columns:repeat(2,1fr)}
  .dl-safety-grid{grid-template-columns:repeat(2,1fr)}
  .dl-talent-inner{grid-template-columns:1fr}
  .dl-talent-statement{text-align:center}
  .dl-talent-sub{margin:0 auto}
  .dl-footer-grid{grid-template-columns:1fr 1fr}
}
@media(max-width:768px){
  .dl-nav{padding:14px 20px}
  .dl-nav-links{display:none}
  .dl-hamburger{display:flex}
  .dl-hero-inner{padding:110px 20px 50px;gap:24px}
  .dl-hero-text h1{font-size:36px}
  .dl-hero-text .sub{font-size:15px}
  .download-row{flex-direction:column;align-items:center;gap:16px}
  .store-badges{flex-direction:row;justify-content:center}
  .hero-iphone{max-width:240px}
  .dl-scroll-headline{padding:52px 24px}
  .dl-scroll-headline h2{font-size:32px}
  .dl-features{padding:48px 20px}
  .dl-feature-grid{grid-template-columns:1fr}
  .dl-safety{padding:48px 20px}
  .dl-safety-grid{grid-template-columns:1fr}
  .dl-talent{padding:52px 20px}
  .dl-talent h2{font-size:36px}
  .dl-final-cta{padding:48px 20px}
  .dl-final-cta h2{font-size:32px}
  .dl-final-cta .final-cta-row{flex-direction:column;align-items:center;gap:16px}
  .dl-final-cta .final-cta-row .store-badges{flex-direction:row}
  .dl-footer{padding:40px 20px 24px}
  .dl-footer-grid{grid-template-columns:1fr;gap:32px}
  .dl-footer-bottom{flex-direction:column;gap:12px;text-align:center}
}
@media(max-width:480px){
  .dl-hero-text h1{font-size:30px}
  .dl-scroll-headline h2{font-size:26px}
  .dl-section-header h2{font-size:30px}
  .dl-final-cta h2{font-size:26px}
  .store-badges img{height:42px}
  .qr-card{display:none}
  .dl-talent h2{font-size:30px}
  .dl-talent-stat .num{font-size:32px}
}
`;
    const styleEl = document.createElement('style');
    styleEl.textContent = css;
    document.head.appendChild(styleEl);
  }

  /* ----------------------------------------------------------
     4. BUILD NAV (matches homepage nav style)
  ---------------------------------------------------------- */
  function buildNav() {
    const nav = el('nav', { className: 'dl-nav' });

    // Logo — white SVG to match homepage nav
    const logoLink = link(LINKS.home, '');
    logoLink.appendChild(img(IMG.logoNav, 'Pulse of Perseverance Project', 'dl-nav-logo'));
    nav.appendChild(logoLink);

    // Desktop links
    const links = el('div', { className: 'dl-nav-links' });
    [
      ['Home', LINKS.home],
      ['For Students', LINKS.students],
      ['For Institutions', LINKS.partner],
      ['For Mentors', LINKS.mentors],
      ['About', LINKS.about],
    ].forEach(([text, href]) => links.appendChild(link(href, '', text)));

    const cta = link('#download', 'nav-cta', 'Get the App');
    links.appendChild(cta);
    nav.appendChild(links);

    // Hamburger
    const burger = el('div', { className: 'dl-hamburger' });
    burger.appendChild(el('span')); burger.appendChild(el('span')); burger.appendChild(el('span'));
    nav.appendChild(burger);

    // Mobile menu
    const mobileMenu = el('div', { className: 'dl-mobile-menu' });
    [
      ['Home', LINKS.home],
      ['For Students', LINKS.students],
      ['For Institutions', LINKS.partner],
      ['For Mentors', LINKS.mentors],
      ['About', LINKS.about],
    ].forEach(([text, href]) => mobileMenu.appendChild(link(href, '', text)));
    mobileMenu.appendChild(link('#download', 'mob-cta', 'Get the App'));

    burger.addEventListener('click', function () {
      burger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });

    mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', function () {
      burger.classList.remove('open');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    }));

    // Scroll darken
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    });

    return { nav, mobileMenu };
  }

  /* ----------------------------------------------------------
     5. HERO SECTION
  ---------------------------------------------------------- */
  function buildHero() {
    const section = el('section', { className: 'dl-hero', id: 'download' });

    // Video BG
    const videoBg = el('div', { className: 'dl-hero-video-bg' });
    const video = el('video', { autoplay: '', muted: '', loop: '', playsinline: '' });
    video.muted = true;
    const source = el('source', { src: IMG.video, type: 'video/mp4' });
    video.appendChild(source);
    videoBg.appendChild(video);
    section.appendChild(videoBg);

    // Overlay
    section.appendChild(el('div', { className: 'dl-hero-overlay' }));

    // Inner
    const inner = el('div', { className: 'dl-hero-inner' });

    // Left — text
    const textCol = el('div', { className: 'dl-hero-text' });
    const h1 = el('h1');
    h1.innerHTML = '<span class="line1">Download the P3 App</span><br>to <span class="highlight">Get Started</span>';
    textCol.appendChild(h1);
    textCol.appendChild(el('p', { className: 'sub' }, 'Join a growing community where students unlock life-changing opportunities and mentors share their expertise to open doors. Free on iOS & Android.'));

    // Download row
    const dlRow = el('div', { className: 'download-row' });
    const qrCard = el('div', { className: 'qr-card' });
    qrCard.appendChild(img(IMG.qr, 'Scan QR code to download the P3 app'));
    qrCard.appendChild(el('div', { className: 'qr-label' }, 'Scan to Download'));
    dlRow.appendChild(qrCard);

    const badges = el('div', { className: 'store-badges' });
    const iosLink = link(LINKS.ios, '');
    iosLink.target = '_blank'; iosLink.rel = 'noopener';
    iosLink.appendChild(img(IMG.ios, 'Download on the App Store'));
    badges.appendChild(iosLink);
    const andLink = link(LINKS.android, '');
    andLink.target = '_blank'; andLink.rel = 'noopener';
    andLink.appendChild(img(IMG.android, 'Get it on Google Play'));
    badges.appendChild(andLink);
    dlRow.appendChild(badges);
    textCol.appendChild(dlRow);

    // Stats
    const meta = el('div', { className: 'hero-meta' });
    meta.innerHTML = '<span>\u2605 4.9 App Store</span><span class="dot"></span><span>900+ users connected</span>';
    textCol.appendChild(meta);
    inner.appendChild(textCol);

    // Right — phone
    const visual = el('div', { className: 'dl-hero-visual' });
    visual.appendChild(img(IMG.iphone, 'P3 App shown on iPhone', 'hero-iphone'));
    inner.appendChild(visual);

    section.appendChild(inner);
    return section;
  }

  /* ----------------------------------------------------------
     6. SCROLL HEADLINE
  ---------------------------------------------------------- */
  function buildScrollHeadline() {
    const section = el('section', { className: 'dl-scroll-headline' });
    const h2 = el('h2');
    const words = [
      { text: 'The', accent: false },
      { text: 'free,', accent: false },
      { text: 'always-on', accent: false },
      { text: 'digital mentorship', accent: true },
      { text: 'platform', accent: false },
      { text: 'for', accent: false },
      { text: "today\u2019s", accent: false },
      { text: 'generation.', accent: false },
    ];
    words.forEach(w => {
      const span = el('span', { className: 'word' + (w.accent ? ' accent' : '') }, w.text);
      h2.appendChild(span);
      h2.appendChild(document.createTextNode(' '));
    });
    section.appendChild(h2);

    // Scroll reveal logic
    function revealWords() {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = 1 - (rect.top / (vh * 0.6));
      const spans = h2.querySelectorAll('.word');
      spans.forEach((s, i) => {
        const threshold = i / spans.length;
        s.classList.toggle('active', progress > threshold);
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
    const section = el('section', { className: 'dl-features' });
    const inner = el('div', { className: 'dl-features-inner' });

    // Header
    const header = el('div', { className: 'dl-section-header' });
    header.appendChild(el('span', { className: 'dl-section-tag' }, 'Inside the app'));
    const h2 = el('h2');
    h2.innerHTML = 'Built for <span>ambitious</span> students.';
    header.appendChild(h2);
    header.appendChild(el('p', null, 'Six tools designed to turn curiosity into career momentum \u2014 without the friction.'));
    inner.appendChild(header);

    // Grid
    const grid = el('div', { className: 'dl-feature-grid' });
    const cards = [
      { img: IMG.feat1, alt: 'AI Smart Match \u2014 mentor matching screen', title: 'AI Smart Match', desc: 'AI-powered matching pairs students with the right industry mentor in seconds \u2014 across any field.' },
      { img: IMG.feat2, alt: 'Milestone Tracking \u2014 student achievement pathway', title: 'Milestone Tracking', desc: 'Students check off achievements \u2014 from first campus visit to first job \u2014 building longitudinal data.' },
      { img: IMG.feat3, alt: 'Career Opportunities \u2014 student exploring pathways', title: 'Career Opportunities', desc: 'A full marketplace of internships, jobs, college-readiness resources, and diverse career pathways.' },
      { img: IMG.feat4, alt: 'Monthly Scholarships \u2014 P3 scholarship recipients', title: 'Monthly Scholarships', desc: "Reducing financial barriers with P3\u2019s own monthly scholarship plus hundreds of curated awards." },
      { img: IMG.feat5, alt: 'Mentorship Guide \u2014 mentor and student collaboration', title: 'Mentorship Guide', desc: 'A peer-reviewed guide co-developed with university partners to maximize mentor effectiveness.' },
      { img: IMG.feat6, alt: 'Mentor Question Portal \u2014 video response collage', title: 'Mentor Question Portal', desc: 'Any student \u2014 even unregistered \u2014 can ask mentors questions 24/7, removing every barrier to guidance.' },
    ];
    cards.forEach(c => {
      const card = el('div', { className: 'dl-feature-card' });
      const vis = el('div', { className: 'dl-fc-vis' });
      vis.appendChild(img(c.img, c.alt));
      card.appendChild(vis);
      const body = el('div', { className: 'dl-fc-body' });
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
     8. SAFETY SECTION (with SVG icons)
  ---------------------------------------------------------- */
  function buildSafety() {
    const section = el('section', { className: 'dl-safety' });
    const inner = el('div', { className: 'dl-safety-inner' });

    const header = el('div', { className: 'dl-section-header' });
    header.appendChild(el('span', { className: 'dl-section-tag' }, 'Trust & safety'));
    header.appendChild(el('h2', null, 'Built with student safety at the core.'));
    header.appendChild(el('p', null, 'Every layer of the P3 platform is designed to keep students protected \u2014 from mentor onboarding to the way conversations happen.'));
    inner.appendChild(header);

    const grid = el('div', { className: 'dl-safety-grid' });

    // SVG icon markup for each card
    var svgIcons = {
      users: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      check: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>',
      shield: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>'
    };

    const items = [
      { icon: 'users', title: 'Vetted Mentors', desc: 'Every mentor is personally invited or sourced from trusted partner organizations \u2014 then onboarded with P3 workshops.' },
      { icon: 'check', title: 'Manual Approval', desc: 'Every mentor account is manually reviewed and approved by P3 before they can be matched with any mentee.' },
      { icon: 'shield', title: 'Safe by Design', desc: 'No private messaging. Mentors never see personal info. Students ask text questions; mentors respond via public video.' },
    ];
    items.forEach(item => {
      const card = el('div', { className: 'dl-safety-card' });
      var iconWrap = el('div', { className: 'sc-icon' });
      iconWrap.innerHTML = svgIcons[item.icon];
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
    const section = el('section', { className: 'dl-talent' });
    const inner = el('div', { className: 'dl-talent-inner' });

    // Left — statement
    const statement = el('div', { className: 'dl-talent-statement' });
    statement.appendChild(el('div', { className: 'dl-quote-mark' }, '\u201C'));
    const h2 = el('h2');
    h2.innerHTML = 'Talent is <span style="display:block">universal.</span><span style="color:#D93A3A">Access</span> <span>is not.</span>';
    statement.appendChild(h2);
    statement.appendChild(el('p', { className: 'dl-talent-sub' }, 'P3 exists to close that gap \u2014 one mentor, one scholarship, one career pathway at a time. Every student, regardless of zip code, deserves a mentor who can open the right door.'));
    inner.appendChild(statement);

    // Right — stats
    const visual = el('div', { className: 'dl-talent-visual' });
    const stats = [
      { num: '30%', label: 'of students today can access a mentor' },
      { num: '85%', label: 'of jobs are filled through professional networks' },
      { num: '5\u00D7', label: 'more likely to succeed with a mentor in their corner' },
    ];
    stats.forEach(s => {
      const card = el('div', { className: 'dl-talent-stat' });
      card.appendChild(el('div', { className: 'num' }, s.num));
      card.appendChild(el('div', { className: 'label' }, s.label));
      visual.appendChild(card);
    });
    inner.appendChild(visual);
    section.appendChild(inner);
    return section;
  }

  /* ----------------------------------------------------------
     10. FINAL CTA
  ---------------------------------------------------------- */
  function buildFinalCTA() {
    const section = el('section', { className: 'dl-final-cta' });
    const inner = el('div', { className: 'dl-final-cta-inner' });

    const h2 = el('h2');
    h2.innerHTML = 'Your journey <span class="highlight">starts here.</span>';
    inner.appendChild(h2);
    inner.appendChild(el('p', { className: 'sub' }, 'Download P3 free on iOS or Android. Your mentor \u2014 and your next opportunity \u2014 are one tap away.'));

    // CTA row
    const row = el('div', { className: 'final-cta-row' });
    const qr = el('div', { className: 'qr-card' });
    qr.appendChild(img(IMG.qr, 'Scan QR code to download the P3 app'));
    qr.appendChild(el('div', { className: 'qr-label' }, 'Scan to Download'));
    row.appendChild(qr);

    const badges = el('div', { className: 'store-badges' });
    const iosLink = link(LINKS.ios, '');
    iosLink.target = '_blank'; iosLink.rel = 'noopener';
    iosLink.appendChild(img(IMG.ios, 'Download on the App Store'));
    badges.appendChild(iosLink);
    const andLink = link(LINKS.android, '');
    andLink.target = '_blank'; andLink.rel = 'noopener';
    andLink.appendChild(img(IMG.android, 'Get it on Google Play'));
    badges.appendChild(andLink);
    row.appendChild(badges);
    inner.appendChild(row);

    const note = el('div', { className: 'final-cta-note' });
    note.innerHTML = '<strong>Free forever.</strong> No ads. No catch. Just opportunity.';
    inner.appendChild(note);

    section.appendChild(inner);
    return section;
  }

  /* ----------------------------------------------------------
     11. FOOTER
  ---------------------------------------------------------- */
  function buildFooter() {
    const footer = el('footer', { className: 'dl-footer' });

    const grid = el('div', { className: 'dl-footer-grid' });

    // Brand column — white SVG logo to match homepage footer
    const brand = el('div', { className: 'dl-footer-brand' });
    brand.appendChild(img(IMG.logoW, 'Pulse of Perseverance Project'));
    brand.appendChild(el('p', null, 'Unlocking life-changing opportunities for young visionaries. Free on iOS & Android.'));
    brand.appendChild(el('div', { className: 'loc' }, 'Chicago, IL \u00B7 Founded 2018'));
    grid.appendChild(brand);

    // Platform column
    const col1 = el('div', { className: 'dl-footer-col' });
    col1.appendChild(el('h4', null, 'Platform'));
    col1.appendChild(link(LINKS.students, '', 'For Students'));
    col1.appendChild(link(LINKS.mentors, '', 'For Mentors'));
    col1.appendChild(link(LINKS.partner, '', 'For Institutions'));
    col1.appendChild(link(LINKS.scholars, '', 'Scholarships'));
    grid.appendChild(col1);

    // About column
    const col2 = el('div', { className: 'dl-footer-col' });
    col2.appendChild(el('h4', null, 'About'));
    col2.appendChild(link(LINKS.about, '', 'Our Story'));
    col2.appendChild(link(LINKS.team, '', 'Team'));
    col2.appendChild(link(LINKS.annual, '', 'Annual Report'));
    col2.appendChild(link(LINKS.press, '', 'Press'));
    grid.appendChild(col2);

    // Connect column
    const col3 = el('div', { className: 'dl-footer-col' });
    col3.appendChild(el('h4', null, 'Connect'));
    const igLink = link(LINKS.ig, '', 'Instagram');
    igLink.target = '_blank'; igLink.rel = 'noopener';
    col3.appendChild(igLink);
    const liLink = link(LINKS.li, '', 'LinkedIn');
    liLink.target = '_blank'; liLink.rel = 'noopener';
    col3.appendChild(liLink);
    const ytLink = link(LINKS.yt, '', 'YouTube');
    ytLink.target = '_blank'; ytLink.rel = 'noopener';
    col3.appendChild(ytLink);
    col3.appendChild(link(LINKS.donate, '', 'Donate'));
    grid.appendChild(col3);

    footer.appendChild(grid);

    // Bottom bar
    const bottom = el('div', { className: 'dl-footer-bottom' });
    bottom.appendChild(el('span', null, '\u00A9 2026 Pulse of Perseverance Project. All rights reserved.'));
    bottom.appendChild(link(LINKS.terms, '', 'Terms & Conditions'));
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

    // Also hide via JS for any late-loading elements
    document.querySelectorAll('.w-nav, .navbar, .footer-v2, .w--nav-menu, .w-nav-overlay').forEach(function(e) {
      e.style.display = 'none';
      e.style.visibility = 'hidden';
    });

    // Create wrapper
    const wrapper = el('div', { className: 'dl-page' });

    // Build all sections
    const { nav, mobileMenu } = buildNav();
    wrapper.appendChild(nav);
    wrapper.appendChild(mobileMenu);
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
    document.querySelectorAll('.dl-page a').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href.includes('apps.apple.com')) {
        a.addEventListener('click', function () {
          if (typeof gtag === 'function') gtag('event', 'app_download_click', { platform: 'ios' });
        });
      }
      if (href.includes('play.google.com')) {
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
