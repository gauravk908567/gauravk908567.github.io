/* Lightweight dependency-free carousel.
 * Auto-initialises every .pf-carousel on the page.
 *   - builds dots + count badge
 *   - prev/next arrows, dot clicks, keyboard arrows (when focused)
 *   - touch / mouse swipe
 *   - optional autoplay via data-autoplay="<ms>" (pauses on hover & when a
 *     video inside is playing)
 */
(function () {
    'use strict';

    function initCarousel(root) {
        var track = root.querySelector('.pf-track');
        if (!track) return;
        var slides = Array.prototype.slice.call(track.children);
        if (slides.length === 0) return;

        var index = 0;
        var autoplayMs = parseInt(root.getAttribute('data-autoplay') || '0', 10);
        var timer = null;

        // count badge
        var count = document.createElement('div');
        count.className = 'pf-count';
        root.appendChild(count);

        // dots
        var dotsWrap = root.querySelector('.pf-dots');
        if (!dotsWrap) {
            dotsWrap = document.createElement('div');
            dotsWrap.className = 'pf-dots';
            root.appendChild(dotsWrap);
        }
        var dots = slides.map(function (_, i) {
            var d = document.createElement('button');
            d.className = 'pf-dot';
            d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
            d.addEventListener('click', function () { go(i); });
            dotsWrap.appendChild(d);
            return d;
        });

        function render() {
            track.style.transform = 'translateX(' + (-index * 100) + '%)';
            dots.forEach(function (d, i) { d.classList.toggle('is-active', i === index); });
            count.textContent = (index + 1) + ' / ' + slides.length;
            // pause any video that scrolled away
            slides.forEach(function (s, i) {
                if (i !== index) {
                    var v = s.querySelector('video');
                    if (v && !v.paused) v.pause();
                }
            });
        }

        function go(i) {
            index = (i + slides.length) % slides.length;
            render();
        }
        function next() { go(index + 1); }
        function prev() { go(index - 1); }

        // arrows
        var btnPrev = root.querySelector('.pf-prev');
        var btnNext = root.querySelector('.pf-next');
        if (btnPrev) btnPrev.addEventListener('click', prev);
        if (btnNext) btnNext.addEventListener('click', next);

        // keyboard (when carousel focused)
        root.setAttribute('tabindex', '0');
        root.addEventListener('keydown', function (e) {
            if (e.key === 'ArrowLeft') { prev(); }
            else if (e.key === 'ArrowRight') { next(); }
        });

        // swipe
        var startX = 0, dragging = false;
        function down(x) { dragging = true; startX = x; stopAuto(); }
        function up(x) {
            if (!dragging) return;
            dragging = false;
            var dx = x - startX;
            if (Math.abs(dx) > 40) { dx < 0 ? next() : prev(); }
            startAuto();
        }
        root.addEventListener('touchstart', function (e) { down(e.touches[0].clientX); }, { passive: true });
        root.addEventListener('touchend', function (e) { up((e.changedTouches[0] || {}).clientX || startX); });
        root.addEventListener('mousedown', function (e) { down(e.clientX); });
        window.addEventListener('mouseup', function (e) { up(e.clientX); });

        // autoplay (skip while a video is playing or on hover)
        function anyVideoPlaying() {
            return slides.some(function (s) {
                var v = s.querySelector('video');
                return v && !v.paused && !v.ended;
            });
        }
        function tick() { if (!anyVideoPlaying()) next(); }
        function startAuto() {
            if (autoplayMs > 0 && !timer) timer = setInterval(tick, autoplayMs);
        }
        function stopAuto() {
            if (timer) { clearInterval(timer); timer = null; }
        }
        root.addEventListener('mouseenter', stopAuto);
        root.addEventListener('mouseleave', startAuto);

        render();
        startAuto();
    }

    function init() {
        var carousels = document.querySelectorAll('.pf-carousel');
        for (var i = 0; i < carousels.length; i++) initCarousel(carousels[i]);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
