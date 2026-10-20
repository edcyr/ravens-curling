// In-page links (Tryout details, History, Goals, Tryouts). Scroll in script so they
// work everywhere, including previews that load the page from a data: URL.
document.addEventListener('click', function (e) {
  var a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  var id = a.getAttribute('href').slice(1);
  var smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (id === 'top' || id === '') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' });
    return;
  }
  var target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' });
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
  try { history.replaceState(null, '', '#' + id); } catch (err) { /* data: or sandboxed URL */ }
});

(function () {
  var el = document.getElementById('countdown');
  if (!el) return;
  // Tryout: Wednesday, October 28, 2026 at 9:00 pm Ottawa time (EDT, UTC−4)
  var tryout = new Date('2026-10-28T21:00:00-04:00');
  var now = new Date();
  var ms = tryout - now;
  if (ms <= 0) {
    el.textContent = 'This tryout has passed. Watch this page for the next date.';
    return;
  }
  var day = 86400000;
  var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  var startOfTryout = new Date(tryout.getFullYear(), tryout.getMonth(), tryout.getDate());
  var days = Math.round((startOfTryout - startOfToday) / day);
  el.textContent = days === 0 ? 'Tonight' : days === 1 ? 'Tomorrow night' : 'In ' + days + ' days';
})();
