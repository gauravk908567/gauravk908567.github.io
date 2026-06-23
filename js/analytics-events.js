/* GA4 custom event tracking for the portfolio.
 * Relies on the gtag() already loaded in each page's <head> (G-802G39EQ2E).
 * Auto-wires meaningful interactions so no per-link markup changes are needed.
 *
 * Events sent:
 *   resume_view      - clicked "View My Resume"
 *   linkedin_click   - clicked any LinkedIn link
 *   github_click     - clicked any GitHub link
 *   email_click      - clicked the mailto / email button
 *   project_open     - clicked through to a project page (landing*.html)
 *   outbound_click   - clicked any other external link (pitch, itch.io, drive, etc.)
 *   video_play       - started playing a local gameplay <video>
 *   section_view     - scrolled a major section into view (once each)
 */
(function () {
    'use strict';

    // Safe wrapper: if gtag isn't present for any reason, do nothing.
    function track(name, params) {
        if (typeof window.gtag === 'function') {
            window.gtag('event', name, params || {});
        }
    }

    function hostOf(href) {
        try { return new URL(href, window.location.href).hostname; }
        catch (e) { return ''; }
    }

    function classifyLink(a) {
        var href = a.getAttribute('href') || '';
        var low = href.toLowerCase();

        if (low.indexOf('mailto:') === 0) return { name: 'email_click' };

        var host = hostOf(href);
        var internal = !host || host === window.location.hostname;

        // Resume: the Drive resume link or anything labelled resume
        var text = (a.textContent || '').toLowerCase();
        if (text.indexOf('resume') !== -1 || low.indexOf('1ghkvdyn0ecjbkzuglrs8xvmrbetu8pqj') !== -1) {
            return { name: 'resume_view', params: { link_url: href } };
        }

        if (host.indexOf('linkedin.com') !== -1) return { name: 'linkedin_click', params: { link_url: href } };
        if (host.indexOf('github.com') !== -1) return { name: 'github_click', params: { link_url: href } };

        if (internal && /landing\d*\.html/.test(low)) {
            return { name: 'project_open', params: { project_page: href } };
        }

        if (!internal) return { name: 'outbound_click', params: { link_url: href, link_domain: host } };

        return null; // internal nav we don't care about
    }

    function onLinkClick(e) {
        var a = e.target.closest && e.target.closest('a[href]');
        if (!a) return;
        var info = classifyLink(a);
        if (info) track(info.name, info.params);
    }

    function wireVideos() {
        var vids = document.querySelectorAll('video');
        for (var i = 0; i < vids.length; i++) {
            (function (v) {
                var fired = false;
                v.addEventListener('play', function () {
                    if (fired) return; // count one play per load
                    fired = true;
                    var src = '';
                    var s = v.querySelector('source');
                    if (s) src = s.getAttribute('src') || '';
                    track('video_play', { video_src: src, page: window.location.pathname });
                });
            })(vids[i]);
        }
    }

    function wireSections() {
        if (!('IntersectionObserver' in window)) return;
        var seen = {};
        var targets = document.querySelectorAll('.page-section[id], #experience, #projects, #skills, #certificates, #contact');
        if (!targets.length) return;
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    var id = en.target.id || 'unnamed';
                    if (!seen[id]) {
                        seen[id] = true;
                        track('section_view', { section_id: id });
                    }
                }
            });
        }, { threshold: 0.4 });
        for (var i = 0; i < targets.length; i++) io.observe(targets[i]);
    }

    function init() {
        document.addEventListener('click', onLinkClick, true);
        wireVideos();
        wireSections();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
