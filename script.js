(function () {
  'use strict';

  /* ── Year ─────────────────────────────────────────────────────────── */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ── Mobile navigation ────────────────────────────────────────────── */
  var navToggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.nav');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      var open = !nav.classList.contains('is-open');
      nav.classList.toggle('is-open', open);
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      navToggle.setAttribute('aria-label', open ? 'Zamknij menu' : 'Otwórz menu');
    });

    /* Close on outside click */
    document.addEventListener('click', function (e) {
      if (
        nav.classList.contains('is-open') &&
        !nav.contains(e.target) &&
        !navToggle.contains(e.target)
      ) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Otwórz menu');
      }
    });

    /* Close on Escape key */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Otwórz menu');
        navToggle.focus();
      }
    });
  }

  /* ── Hero headline rotation — respects prefers-reduced-motion ──────── */
  var headlineEl = document.querySelector('.hero-title-text');
  if (headlineEl && headlineEl.dataset.headlines) {
    var reduced =
      window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!reduced) {
      var headlines;
      try {
        headlines = JSON.parse(headlineEl.dataset.headlines);
      } catch (err) {
        headlines = null;
      }

      if (headlines && headlines.length > 1) {
        var i = 0;
        headlineEl.style.transition = 'opacity 0.45s ease';

        window.setInterval(function () {
          i = (i + 1) % headlines.length;
          headlineEl.style.opacity = '0';
          window.setTimeout(function () {
            headlineEl.textContent = headlines[i];
            headlineEl.style.opacity = '1';
          }, 220);
        }, 7000);
      }
    }
  }

  /* ── Contact form ─────────────────────────────────────────────────── */
  var form = document.getElementById('contact-form');
  if (form) {
    var errorBox = document.getElementById('form-error');

    function showError(msg) {
      if (!errorBox) return;
      errorBox.textContent = msg;
      errorBox.hidden = false;
    }

    function clearError() {
      if (!errorBox) return;
      errorBox.textContent = '';
      errorBox.hidden = true;
    }

    function setBtn(btn, state, originalText) {
      if (state === 'loading') {
        btn.disabled = true;
        btn.textContent = 'Wysyłanie…';
      } else if (state === 'success') {
        btn.textContent = 'Wysłano ✓';
        btn.classList.add('sent');
      } else {
        btn.disabled = false;
        btn.textContent = originalText;
        btn.classList.remove('sent');
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      clearError();

      /* Basic front-end validation */
      var name = form.querySelector('#name');
      var email = form.querySelector('#email');
      var message = form.querySelector('#message');

      if (!name.value.trim()) {
        showError('Proszę podać imię i nazwisko.');
        name.focus();
        return;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        showError('Proszę podać poprawny adres e-mail.');
        email.focus();
        return;
      }
      if (!message.value.trim()) {
        showError('Proszę wpisać wiadomość.');
        message.focus();
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var originalText = btn.textContent;
      setBtn(btn, 'loading');

      /*
       * ── Real submission ──────────────────────────────────────────────
       * Replace the URL below with your actual endpoint, e.g. Formspree:
       *   https://formspree.io/f/YOUR_FORM_ID
       *
       * To use Formspree:
       *   1. Sign up at formspree.io
       *   2. Create a new form and copy the endpoint URL
       *   3. Replace the placeholder URL below
       * ────────────────────────────────────────────────────────────────
       */
      var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

      fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: new FormData(form),
      })
        .then(function (res) {
          if (!res.ok) {
            return res.json().then(function (data) {
              throw new Error(
                (data.errors && data.errors.map(function (e) { return e.message; }).join(', ')) ||
                'Błąd serwera. Spróbuj ponownie lub napisz bezpośrednio na kontakt@axite.pl.'
              );
            });
          }
          return res.json();
        })
        .then(function () {
          setBtn(btn, 'success', originalText);
          form.reset();
          window.setTimeout(function () {
            setBtn(btn, 'reset', originalText);
          }, 3500);
        })
        .catch(function (err) {
          setBtn(btn, 'reset', originalText);
          showError(
            err.message ||
            'Nie udało się wysłać wiadomości. Napisz bezpośrednio na kontakt@axite.pl.'
          );
        });
    });
  }

})();
