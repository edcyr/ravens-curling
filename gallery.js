// Gallery slideshows. Photo lists come from images/gallery/gallery.json,
// which scripts/build-gallery.py writes from the photos in images/gallery/<event>/.
(function () {
  var INTERVAL = 5000;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setup(root, photos) {
    if (!photos || !photos.length) return;
    var key = root.getAttribute('data-gallery');
    var label = root.getAttribute('aria-label') || 'Photo';
    var stage = root.querySelector('.slides');
    var controls = root.querySelector('.slide-controls');
    var count = root.querySelector('.slide-count');
    var toggle = root.querySelector('[data-act="toggle"]');

    var figures = photos.map(function (p, i) {
      var fig = document.createElement('figure');
      fig.setAttribute('role', 'group');
      fig.setAttribute('aria-roledescription', 'slide');
      fig.setAttribute('aria-label', (i + 1) + ' of ' + photos.length);
      var img = document.createElement('img');
      img.alt = p.alt || label.replace(/ photos$/, '') + ', photo ' + (i + 1) + ' of ' + photos.length;
      img.width = p.w; img.height = p.h;
      img.decoding = 'async';
      img.setAttribute('data-src', p.src);
      fig.appendChild(img);
      stage.appendChild(fig);
      return fig;
    });

    function load(i) {
      var img = figures[i].querySelector('img');
      if (!img.src) img.src = img.getAttribute('data-src');
    }

    var current = 0, timer = null, playing = !reduceMotion, held = false;

    function show(i) {
      current = (i + figures.length) % figures.length;
      figures.forEach(function (f, j) {
        f.classList.toggle('is-active', j === current);
        f.setAttribute('aria-hidden', j === current ? 'false' : 'true');
      });
      load(current);
      load((current + 1) % figures.length);
      count.textContent = (current + 1) + ' / ' + figures.length;
    }

    function schedule() {
      clearInterval(timer);
      if (playing && !held && !document.hidden && figures.length > 1) {
        timer = setInterval(function () { show(current + 1); }, INTERVAL);
      }
    }

    function setPlaying(on) {
      playing = on;
      toggle.textContent = on ? 'Pause' : 'Play';
      toggle.setAttribute('aria-label', on ? 'Pause slideshow' : 'Play slideshow');
      schedule();
    }

    controls.addEventListener('click', function (e) {
      var act = e.target.closest('[data-act]');
      if (!act) return;
      var a = act.getAttribute('data-act');
      if (a === 'prev') { show(current - 1); schedule(); }
      if (a === 'next') { show(current + 1); schedule(); }
      if (a === 'toggle') setPlaying(!playing);
    });

    root.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { show(current - 1); schedule(); }
      if (e.key === 'ArrowRight') { show(current + 1); schedule(); }
    });

    // Hold the slideshow while the pointer or keyboard focus is on it.
    root.addEventListener('mouseenter', function () { held = true; schedule(); });
    root.addEventListener('mouseleave', function () { held = false; schedule(); });
    root.addEventListener('focusin', function () { held = true; schedule(); });
    root.addEventListener('focusout', function () { held = false; schedule(); });
    document.addEventListener('visibilitychange', schedule);

    // Swipe on touch screens.
    var startX = null;
    stage.addEventListener('touchstart', function (e) { startX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener('touchend', function (e) {
      if (startX === null) return;
      var dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) { show(current + (dx < 0 ? 1 : -1)); schedule(); }
      startX = null;
    });

    root.classList.add('has-photos');
    controls.hidden = false;
    show(0);
    setPlaying(playing);
  }

  fetch('images/gallery/gallery.json', { cache: 'no-cache' })
    .then(function (r) { return r.ok ? r.json() : {}; })
    .catch(function () { return {}; })
    .then(function (data) {
      document.querySelectorAll('.slideshow[data-gallery]').forEach(function (root) {
        setup(root, data[root.getAttribute('data-gallery')]);
      });
    });
})();
