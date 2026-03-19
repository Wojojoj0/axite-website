(function () {
  'use strict';

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* Nawigacja mobilna */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');
  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    });
    document.addEventListener('click', function (e) {
      if (nav.classList.contains('is-open') && !nav.contains(e.target) && !navToggle.contains(e.target)) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Otwórz menu');
      }
    });
  }

  /* Rotacja nagłówka hero (A/B) — wyłączona przy prefers-reduced-motion */
  var headlineEl = document.querySelector('.hero-title-text');
  if (headlineEl && headlineEl.dataset.headlines) {
    var reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!reduced) {
      var headlines;
      try {
        headlines = JSON.parse(headlineEl.dataset.headlines);
      } catch (err) {
        headlines = null;
      }
      if (headlines && headlines.length > 1) {
        var i = 0;
        window.setInterval(function () {
          i = (i + 1) % headlines.length;
          headlineEl.style.opacity = '0';
          window.setTimeout(function () {
            headlineEl.textContent = headlines[i];
            headlineEl.style.transition = 'opacity 0.45s ease';
            headlineEl.style.opacity = '1';
          }, 220);
        }, 7000);
        headlineEl.style.transition = 'opacity 0.45s ease';
      }
    }
  }

  /* Formularz — front-end; podłącz usługę lub backend później */
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      btn.disabled = true;
      btn.textContent = 'Wysyłanie…';
      window.setTimeout(function () {
        btn.textContent = 'Wysłano';
        btn.classList.add('sent');
        form.reset();
        window.setTimeout(function () {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.classList.remove('sent');
        }, 2800);
      }, 600);
    });
  }
})();
