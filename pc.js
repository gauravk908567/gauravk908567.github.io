/* Shared script for every page except the landing page (which carries its own copy inline). Built by build_pages.py. */
(function () {
  var $ = function (id) { return document.getElementById(id); };
  function h(tag, cls, parent, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text != null) e.textContent = text;
    if (parent) parent.appendChild(e);
    return e;
  }

  /* ================= star formations (decoration only; never explained on the page) =================
     Positions: right ascension in hours, declination in degrees, 1 = the main star.
     Lines join stars by index. Ardra is one star; Shatabhisha ("the hundred stars") is drawn as a ring. */
  var F = {
    ardra:     { name: 'Ardra', single: true },
    ashwini:   { name: 'Ashwini', s: [[2.120, 23.46, 1], [1.911, 20.81], [1.892, 19.29]], l: [[0, 1], [1, 2]] },
    magha:     { name: 'Magha', s: [[10.140, 11.97, 1], [10.122, 16.76], [10.333, 19.84], [10.278, 23.42], [9.879, 26.01], [9.764, 23.77]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]] },
    mula:      { name: 'Mula', s: [[16.836, -34.29], [16.865, -38.05], [16.910, -42.36], [17.203, -43.24], [17.622, -43.00], [17.793, -40.13], [17.708, -39.03], [17.560, -37.10, 1], [17.513, -37.30]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 8]] },
    shravana:  { name: 'Shravana', s: [[19.771, 10.61], [19.846, 8.87, 1], [19.922, 6.41]], l: [[0, 1], [1, 2]] },
    vishakha:  { name: 'Vishakha', s: [[14.848, -16.04], [15.283, -9.38, 1], [15.592, -14.79], [15.204, -19.79]], l: [[0, 1], [1, 2], [2, 0], [0, 3]] },
    hasta:     { name: 'Hasta', s: [[12.140, -24.73], [12.169, -22.62], [12.263, -17.54, 1], [12.498, -16.52], [12.573, -23.40]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]] },
    pushya:    { name: 'Pushya', s: [[8.721, 21.47], [8.745, 18.15, 1], [8.526, 18.09]], l: [[0, 1], [1, 2]] },
    punarvasu: { name: 'Punarvasu', s: [[7.577, 31.89], [7.755, 28.03, 1]], l: [[0, 1]] },
    revati:    { name: 'Revati', s: [[0.811, 7.59], [1.049, 7.89], [1.229, 7.58, 1], [1.503, 6.14], [1.690, 5.49], [2.034, 2.76]], l: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5]] },
    dhanishta: { name: 'Dhanishta', s: [[20.625, 14.60, 1], [20.660, 15.91], [20.778, 16.12], [20.725, 15.07]], l: [[0, 1], [1, 2], [2, 3], [3, 0]] },
    pphalguni: { name: 'Purva Phalguni', s: [[11.235, 20.52, 1], [11.237, 15.43]], l: [[0, 1]] },
    shatabhisha: { name: 'Shatabhisha', ring: true }
  };
  var STAR4 = 'M20 6L23.2 16.8 34 20 23.2 23.2 20 34 16.8 23.2 6 20 16.8 16.8Z';

  // shapes for one formation, fitted to a 40 x 40 box; size = the pixel size it will be shown at
  function shapes(key, size) {
    var f = F[key], k = 40 / size, i;
    if (f.single) return '<path class="stb" d="' + STAR4 + '"/>';
    if (f.ring) {
      var rr = Math.max(1.1, size * 0.036) * k, ring = '';
      for (i = 0; i < 14; i++) { var an = i * Math.PI / 7; ring += '<circle class="' + (i ? 'st' : 'stb') + '" cx="' + (20 + 13 * Math.sin(an)).toFixed(1) + '" cy="' + (20 - 13 * Math.cos(an)).toFixed(1) + '" r="' + (i ? rr : rr * 1.7).toFixed(2) + '"/>'; }
      return ring;
    }
    var d0 = f.s.reduce(function (a, p) { return a + p[1]; }, 0) / f.s.length, c = Math.cos(d0 * Math.PI / 180);
    var pts = f.s.map(function (p) { return [-p[0] * 15 * c, -p[1]]; });   // east is left, north is up, as in the sky
    var xs = pts.map(function (p) { return p[0]; }), ys = pts.map(function (p) { return p[1]; });
    var x0 = Math.min.apply(0, xs), x1 = Math.max.apply(0, xs), y0 = Math.min.apply(0, ys), y1 = Math.max.apply(0, ys);
    var pad = Math.max(5, 3.2 * k), sc = (40 - 2 * pad) / Math.max(x1 - x0, y1 - y0, 0.001);
    var ox = (40 - (x1 - x0) * sc) / 2, oy = (40 - (y1 - y0) * sc) / 2;
    var q = pts.map(function (p) { return [(ox + (p[0] - x0) * sc).toFixed(1), (oy + (p[1] - y0) * sc).toFixed(1)]; });
    var r = Math.max(1.15, size * 0.042) * k, lw = Math.max(0.8, size * 0.022) * k, out = '';
    f.l.forEach(function (a) { out += '<line class="sl" stroke-width="' + lw.toFixed(2) + '" x1="' + q[a[0]][0] + '" y1="' + q[a[0]][1] + '" x2="' + q[a[1]][0] + '" y2="' + q[a[1]][1] + '"/>'; });
    f.s.forEach(function (p, j) { out += '<circle class="' + (p[2] ? 'stb' : 'st') + '" cx="' + q[j][0] + '" cy="' + q[j][1] + '" r="' + (p[2] ? r * 1.7 : r).toFixed(2) + '"/>'; });
    return out;
  }
  // every string below is fixed markup built from the table above, never from outside data
  function glyph(key, size) {
    return '<svg class="g" viewBox="0 0 40 40" width="' + size + '" height="' + size + '" aria-hidden="true">' + shapes(key, size) + '</svg>';
  }
  // skill-tree node with a formation inside
  function node(key, size) {
    return '<svg class="g" viewBox="0 0 64 64" width="' + size + '" height="' + size + '" aria-hidden="true"><circle class="o" cx="32" cy="32" r="25"/><circle class="n" cx="32" cy="32" r="20.5"/><path class="tk" d="M32 1v4M32 59v4M1 32h4M59 32h4"/><svg x="15" y="15" width="34" height="34" viewBox="0 0 40 40">' + shapes(key, size * 0.53) + '</svg></svg>';
  }
  // the name mark: initials in the Ardra diamond, with the Ardra star on the top point
  function mark(size) {
    return '<svg class="g" viewBox="-6 -6 76 76" width="' + size + '" height="' + size + '" aria-hidden="true"><path class="o" d="M32 3L61 32 32 61 3 32Z"/><path class="n" d="M32 10L54 32 32 54 10 32Z"/><circle class="st" cx="61" cy="32" r="2"/><circle class="st" cx="32" cy="61" r="2"/><circle class="st" cx="3" cy="32" r="2"/><path class="stb" d="M32 -5L33.9 1.1 40 3 33.9 4.9 32 11 30.1 4.9 24 3 30.1 1.1Z"/><text class="mt" x="32" y="33">GK</text></svg>';
  }
  document.querySelectorAll('[data-mark]').forEach(function (e) { e.innerHTML = mark(+e.dataset.mark); });
  document.querySelectorAll('[data-node]').forEach(function (e) { e.innerHTML = node(e.dataset.node, +e.dataset.s); });
  document.querySelectorAll('[data-g]').forEach(function (e) { e.innerHTML = glyph(e.dataset.g, +e.dataset.s); });

  // short clips play, muted, only while they are on screen
  var still = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!still && 'IntersectionObserver' in window) {
    var vo = new IntersectionObserver(function (es) {
      es.forEach(function (en) {
        var v = en.target;
        if (en.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); } else v.pause();
      });
    }, { threshold: 0.5 });
    document.querySelectorAll('video[data-auto]').forEach(function (v) { vo.observe(v); });
  }

  // "the full story" panels: count which ones get opened
  var bulk = false;
  document.querySelectorAll('details.more[data-item]').forEach(function (dt) {
    dt.addEventListener('toggle', function () { if (dt.open && !bulk) track('story_open', { item: dt.dataset.item }); });
  });
  // one button opens or closes every panel in its section
  document.querySelectorAll('[data-open-all]').forEach(function (bt) {
    var box = document.getElementById(bt.dataset.openAll);
    bt.addEventListener('click', function () {
      var open = bt.getAttribute('aria-pressed') !== 'true';
      bulk = true;
      box.querySelectorAll('details.more').forEach(function (dt) { dt.open = open; });
      setTimeout(function () { bulk = false; }, 0);
      bt.setAttribute('aria-pressed', open ? 'true' : 'false');
      bt.textContent = open ? bt.dataset.close : bt.dataset.label;
      track(open ? 'story_open_all' : 'story_close_all', { item: bt.dataset.openAll });
    });
  });

  // a game that plays inside the page: nothing loads from itch.io until the visitor presses Play
  document.querySelectorAll('.play').forEach(function (pl) {
    var stage = pl.querySelector('.stage'), W = +pl.dataset.w, H = +pl.dataset.h;
    function fit() {
      var f = stage.querySelector('iframe'); if (!f) return;
      var r = stage.getBoundingClientRect();
      f.style.transform = 'translate(-50%,-50%) scale(' + Math.min(r.width / W, r.height / H) + ')';
    }
    pl.querySelector('[data-play]').addEventListener('click', function () {
      var f = document.createElement('iframe');
      f.src = pl.dataset.src; f.title = pl.dataset.title; f.width = W; f.height = H;
      f.setAttribute('allow', 'autoplay; fullscreen; gamepad');
      stage.innerHTML = ''; stage.appendChild(f); fit(); f.focus();
    });
    if ('ResizeObserver' in window) new ResizeObserver(fit).observe(stage); else addEventListener('resize', fit);
  });

  /* ================= analytics =================
     The Google tag loads only on the live site, never from the test folder or a local file.
     Add ?debug to the address to see every event in the browser console. Add ?eu to force the cookie notice. */
  var GA_ID = 'G-802G39EQ2E';
  var CLARITY_ID = 'yrfy477nky';  // Microsoft Clarity project id (heatmaps and recordings)
  var LIVE = location.hostname === 'gauravk908567.github.io' && location.pathname.indexOf('/test/') === -1;
  var DEBUG = /[?&]debug\b/.test(location.search);

  // Visitors in Europe and the UK must agree before analytics cookies are set. Everyone else can opt out in the footer.
  var tz = ''; try { tz = Intl.DateTimeFormat().resolvedOptions().timeZone || ''; } catch (e) {}
  var NEEDS = /[?&]eu\b/.test(location.search) || /^Europe\//.test(tz) || /^Atlantic\/(Canary|Madeira|Azores|Reykjavik|Faroe)$/.test(tz) || /^Asia\/(Nicosia|Famagusta)$/.test(tz) || tz === 'Africa/Ceuta';
  var choice = null; try { choice = localStorage.getItem('pc-consent'); } catch (e) {}
  function allowed() { return choice === 'granted' || (choice === null && !NEEDS); }

  if (LIVE) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: allowed() ? 'granted' : 'denied', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
    window.gtag('js', new Date());
    window.gtag('config', GA_ID);
    var gs = document.createElement('script'); gs.async = true; gs.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID; document.head.appendChild(gs);
  }
  var clarityOn = false;
  function clarity() {
    if (!clarityOn && LIVE && CLARITY_ID && allowed()) {
      clarityOn = true;
      (function (c, l, a, r, i, t, y) { c[a] = c[a] || function () { (c[a].q = c[a].q || []).push(arguments); }; t = l.createElement(r); t.async = 1; t.src = 'https://www.clarity.ms/tag/' + i; y = l.getElementsByTagName(r)[0]; y.parentNode.insertBefore(t, y); })(window, document, 'clarity', 'script', CLARITY_ID);
    }
    // pass the visitor's cookie choice on to Clarity (also covers a later Decline from the footer)
    if (clarityOn && choice !== null) window.clarity('consentv2', { ad_Storage: 'denied', analytics_Storage: choice });
  }
  clarity();

  function track(name, params) {
    if (DEBUG) console.log('[track]', name, JSON.stringify(params || {}));
    if (typeof window.gtag === 'function') window.gtag('event', name, params || {});
  }

  // cookie notice
  var box = $('consent');
  if (NEEDS && choice === null) box.hidden = false;
  $('cookie-open').addEventListener('click', function () { box.hidden = false; });
  box.addEventListener('click', function (e) {
    var b = e.target.closest('[data-consent]'); if (!b) return;
    choice = b.dataset.consent;
    try { localStorage.setItem('pc-consent', choice); } catch (err) {}
    if (typeof window.gtag === 'function') window.gtag('consent', 'update', { analytics_storage: choice });
    box.hidden = true;
    track('consent_choice', { item: choice });
    clarity();
  });

  window.pcTrack = track;
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-track]');
    if (a) track(a.dataset.track, { item: a.dataset.item || '', place: a.dataset.place || '' });
  });
  // which sections were seen, and for how long
  if ('IntersectionObserver' in window) {
    var seen = {}, since = {}, total = {};
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        var s = en.target.dataset.section, now = Date.now();
        if (en.isIntersecting) {
          since[s] = now;
          if (!seen[s]) { seen[s] = 1; track('section_view', { section: s }); }
        } else if (since[s]) { total[s] = (total[s] || 0) + (now - since[s]); since[s] = 0; }
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    document.querySelectorAll('[data-section]').forEach(function (s) { io.observe(s); });
    var sent = false;
    function flush() {
      if (sent) return; sent = true;
      var now = Date.now();
      Object.keys(since).forEach(function (s) { if (since[s]) { total[s] = (total[s] || 0) + (now - since[s]); since[s] = 0; } });
      Object.keys(total).forEach(function (s) {
        var sec = Math.round(total[s] / 1000);
        if (sec > 0) track('section_time', { section: s, seconds: sec, transport_type: 'beacon' });
      });
    }
    document.addEventListener('visibilitychange', function () { if (document.visibilityState === 'hidden') flush(); else sent = false; });
    addEventListener('pagehide', flush);
  }
})();
