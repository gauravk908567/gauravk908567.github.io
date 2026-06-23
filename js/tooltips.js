/* Portfolio keyword tooltips
 * Any element with [data-tip] shows a proof bubble on hover.
 *   data-tip       -> the proof / explanation text (required)
 *   data-tip-key   -> the keyword shown as the bubble header (optional)
 *   data-tip-where -> "also shown in: Projects" style footnote (optional)
 * Behaviour: appears after a short hover delay, follows nothing (anchored to
 * the element), and dismisses when the cursor moves more than ~50px away.
 */
(function () {
    'use strict';

    var SHOW_DELAY = 200;   // ms before the bubble appears
    var DISMISS_DISTANCE = 50; // px of mouse travel from the element that hides it

    var tip = null;
    var activeEl = null;
    var showTimer = null;
    var anchorRect = null;

    function buildTip() {
        if (tip) return tip;
        tip = document.createElement('div');
        tip.id = 'pf-tooltip';
        tip.setAttribute('role', 'tooltip');
        document.body.appendChild(tip);
        return tip;
    }

    function fillTip(el) {
        var key = el.getAttribute('data-tip-key');
        var body = el.getAttribute('data-tip') || '';
        var where = el.getAttribute('data-tip-where');
        var html = '';
        if (key) html += '<span class="pf-tip-key">' + key + '</span>';
        html += body;
        if (where) html += '<span class="pf-tip-where">' + where + '</span>';
        tip.innerHTML = html;
    }

    function positionTip(rect) {
        // Default: above the element, centered. Flip below if no room up top.
        var tipRect = tip.getBoundingClientRect();
        var top = rect.top - tipRect.height - 10;
        var left = rect.left + (rect.width / 2) - (tipRect.width / 2);

        if (top < 8) top = rect.bottom + 10; // flip below
        if (left < 8) left = 8;
        var maxLeft = window.innerWidth - tipRect.width - 8;
        if (left > maxLeft) left = maxLeft;

        tip.style.top = top + 'px';
        tip.style.left = left + 'px';
    }

    function show(el) {
        buildTip();
        fillTip(el);
        tip.classList.remove('pf-show');
        // measure first (display via opacity, element already in flow)
        anchorRect = el.getBoundingClientRect();
        positionTip(anchorRect);
        // next frame so the transition runs
        requestAnimationFrame(function () {
            tip.classList.add('pf-show');
        });
        activeEl = el;
    }

    function hide() {
        if (showTimer) { clearTimeout(showTimer); showTimer = null; }
        if (tip) tip.classList.remove('pf-show');
        activeEl = null;
        anchorRect = null;
    }

    function onEnter(e) {
        var el = e.currentTarget;
        if (showTimer) clearTimeout(showTimer);
        showTimer = setTimeout(function () { show(el); }, SHOW_DELAY);
    }

    function onLeave() {
        // Slight grace: the global mousemove handler does the distance dismiss,
        // but a clean leave should also clear the pending timer.
        if (showTimer) { clearTimeout(showTimer); showTimer = null; }
    }

    // Distance-based dismiss: if the cursor strays > DISMISS_DISTANCE from the
    // anchored element's box, hide. Keeps the bubble up while reading nearby.
    function onMove(e) {
        if (!activeEl || !anchorRect) return;
        var x = e.clientX, y = e.clientY;
        var dx = 0, dy = 0;
        if (x < anchorRect.left) dx = anchorRect.left - x;
        else if (x > anchorRect.right) dx = x - anchorRect.right;
        if (y < anchorRect.top) dy = anchorRect.top - y;
        else if (y > anchorRect.bottom) dy = y - anchorRect.bottom;
        if (Math.sqrt(dx * dx + dy * dy) > DISMISS_DISTANCE) hide();
    }

    function bind() {
        var nodes = document.querySelectorAll('[data-tip]');
        for (var i = 0; i < nodes.length; i++) {
            nodes[i].addEventListener('mouseenter', onEnter);
            nodes[i].addEventListener('mouseleave', onLeave);
            nodes[i].addEventListener('focus', onEnter);
            nodes[i].addEventListener('blur', hide);
        }
        document.addEventListener('mousemove', onMove);
        window.addEventListener('scroll', hide, true);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', bind);
    } else {
        bind();
    }
})();
