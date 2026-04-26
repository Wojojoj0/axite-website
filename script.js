(function () {
  'use strict';

  /* ── Year (auto-update w stopce) ──────────────────────────────────── */
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

    /* Close after clicking a nav link (mobile UX) */
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        if (nav.classList.contains('is-open')) {
          nav.classList.remove('is-open');
          navToggle.setAttribute('aria-expanded', 'false');
          navToggle.setAttribute('aria-label', 'Otwórz menu');
        }
      });
    });
  }

  /*
   * ── Hero headline rotation — WYŁĄCZONE ────────────────────────────
   *
   * Decyzja: jeden mocny headline ("Po stronie klienta. Nie po stronie systemu.")
   * pozwala odbiorcy zrozumieć propozycję wartości w pierwszych 3 sekundach.
   * Rotacja co 7s rozwadniała komunikat i była niewidzialna dla SEO/indexerów.
   *
   * Kod rotacji zostaje zakomentowany na wypadek, gdyby kiedyś był potrzebny
   * (np. w ramach testów A/B obsługiwanych po stronie serwera).
   *
   *   var headlineEl = document.querySelector('.hero-title-text');
   *   if (headlineEl && headlineEl.dataset.headlines) { ... }
   */

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

      /* Front-end validation */
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
       * ════════════════════════════════════════════════════════════════
       *  KONFIGURACJA FORMULARZA — WYMAGA UZUPEŁNIENIA
       * ════════════════════════════════════════════════════════════════
       *
       *  WAŻNE: Bez prawidłowego endpointu formularz NIE WYSYŁA wiadomości.
       *
       *  Krok 1: Załóż konto na https://formspree.io (darmowy plan: 50 wiadomości/mies)
       *  Krok 2: Utwórz nowy formularz, skopiuj endpoint URL
       *          (format: https://formspree.io/f/abcdef12)
       *  Krok 3: Podmień wartość poniżej na swój prawdziwy endpoint.
       *  Krok 4: Pierwsza wiadomość musi być potwierdzona w mailu (Formspree
       *          weryfikuje adres dostarczenia przy pierwszym użyciu).
       *
       *  Alternatywy: Web3Forms, Getform, Basin, Netlify Forms, własny backend.
       *
       *  Dopóki FORM_ENDPOINT zawiera 'YOUR_FORM_ID', formularz pokazuje
       *  użytkownikowi wyraźny komunikat z fallbackiem mailowym, zamiast
       *  cicho wysyłać dane w próżnię.
       * ════════════════════════════════════════════════════════════════
       */
      var FORM_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

      /* Guard: jeśli endpoint nie został podmieniony, nie wysyłaj — pokaż fallback */
      if (FORM_ENDPOINT.indexOf('YOUR_FORM_ID') !== -1) {
        setBtn(btn, 'reset', originalText);
        showError(
          'Formularz jest jeszcze konfigurowany. Napisz prosto na ' +
          'kontakt@axite.pl — odpowiemy w ciągu 24h.'
        );
        // eslint-disable-next-line no-console
        console.warn(
          '[Axite] Form endpoint not configured. ' +
          'Edit script.js → FORM_ENDPOINT and replace YOUR_FORM_ID.'
        );
        return;
      }

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
            (err && err.message) ||
            'Nie udało się wysłać wiadomości. Napisz bezpośrednio na kontakt@axite.pl.'
          );
        });
    });
  }

})();
