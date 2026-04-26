# Axite — changelog rewizji

Naprawione na podstawie analizy v2 (z dostępem do CSS i JS). Pliki w paczce:
`index.html`, `styles.css`, `script.js`.

---

## ✅ NAPRAWIONE (gotowe do wdrożenia)

### Krytyczne / techniczne

- **Wyłączona rotacja H1 w hero.** Headline jest teraz statyczny: *„Po stronie klienta. Nie po stronie systemu."*. Powód: rotacja co 7 s rozwadnia komunikat i jest niewidzialna dla SEO. Stary kod rotacji zostawiłem zakomentowany w `script.js` na wypadek przyszłych testów A/B.
- **Guard na niedziałający formularz.** Dopóki `FORM_ENDPOINT` zawiera `YOUR_FORM_ID`, formularz nie wysyła w próżnię — pokazuje użytkownikowi czytelny komunikat *„Formularz jest jeszcze konfigurowany. Napisz prosto na kontakt@axite.pl — odpowiemy w ciągu 24h."* + warning w konsoli dla developera.
- **Lepsza walidacja i fallback komunikatów** w formularzu kontaktowym.
- **Mobile nav zamyka się** po kliknięciu w link nawigacyjny (wcześniej wymagało dodatkowego kliknięcia).

### Hero

- **Nowy headline:** *„Po stronie klienta. Nie po stronie systemu."* (decyzyjny, jasna propozycja wartości w 5 sek.).
- **Nowy lead:** wymienia konkretne systemy (SAP B1, Dynamics 365, Comarch) i kluczowy wyróżnik (*bez konfliktu interesów z dostawcami*).
- **Stat bar pod lead:** `20+ lat · 60+ spółek · 4 systemy ERP · 0 prowizji od dostawców` — z dużymi liczbami w Spectral.
- **Eyebrow uproszczony** z czterosłownego shotgunu do jednej etykiety: `BOUTIQUE ERP CONSULTING`.
- **CTA primary** zmienione z *Umów rozmowę* na *Umów bezpłatną rozmowę* — usuwa frykcję cenową.

### Trust bar (NOWA SEKCJA)

- Bezpośrednio pod hero, na białym tle, z hairline-borderem.
- Klienci wyświetleni jako tekst w Spectral: **Capital Park · Globalworth · Luxvet · KR Group**.
- **TODO:** kiedy będziesz miał logotypy w SVG/PNG, podmień te `<span>` na `<img>` z `loading="lazy"` i odpowiednim `alt`.

### Sekcja "Dla kogo" (NOWA)

- Bezpośrednio po trust bar, przed Ofertą.
- 3 krótkie karty: *Rośniecie szybciej niż procesy / System nie wspiera decyzji / Dane nie odzwierciedlają rzeczywistości*. To kwalifikuje leada od pierwszego ekranu i przejmuje treść, która wcześniej była zakopana w "Jak pracujemy".

### Oferta (przepisana)

- Stary nagłówek *"Oferta"* + 4 generyczne wartości (*Porządkowanie procesów / Jakość danych / Decyzje zarządcze / Spójność finansów i ERP*) → nowy nagłówek *"Co dostaje firma, która pracuje z nami"* + 4 wartości zorientowane na korzyść:
  - *Procesy, które się spinają*
  - *Raporty, którym można ufać*
  - *Decyzje oparte na faktach*
  - *Wdrożenie po stronie klienta*

### O nas (skrócone, przeniesione niżej)

- Kolejność: O nas trafiło **za** Doświadczenie (najpierw kompetencja, potem osoby).
- **Biogramy skrócone z 3 akapitów do 1 zdania kompetencyjnego.**
- Dodany link `LinkedIn ↗` przy każdej osobie. **TODO:** podmień `href="#"` na realne URL profili.
- Sekcja *„Wspólny mianownik"* skrócona z 3 akapitów do 1 paragrafu w `positioning-note` na końcu.
- Usunięte powtórzenie *„nie zaczynamy od systemu, zaczynamy od zrozumienia"* — występowało 3× w trzech różnych sekcjach.

### FAQ (NOWA SEKCJA)

- 6 pytań, m.in.:
  - **Czy bierzecie prowizję od dostawcy systemu?** — odpowiedź formalnie deklaruje brak partnerstwa wdrożeniowego, kickbacków etc. To wasz najsilniejszy moat — należy go napisać czarno na białym.
  - Z jakimi systemami pracujecie / Jak wygląda pierwsza rozmowa / Ile trwa typowy projekt / Model rozliczenia / Czy pracujecie spoza Polski.
- Native HTML `<details>/<summary>` — działa bez JS, dostępne dla czytników ekranu.
- **TODO:** zweryfikuj odpowiedzi merytorycznie. Pisałem je na podstawie tonu strony — niektóre liczby (czas trwania projektów, model rozliczenia) są moimi założeniami i mogą wymagać korekty.

### Kontakt

- **Przycisk:** *Wyślij* → *Umów bezpłatną rozmowę*.
- **Microcopy pod przyciskiem:** *„Odpowiadamy w ciągu 24h (dni robocze). Bez zobowiązań."* — usuwa lęk o spam-mailing.
- **Promise box** w lewej kolumnie: *"Co dostaniesz: odpowiedź w ciągu 24h i propozycję bezpłatnej, 30-minutowej rozmowy bez zobowiązań."*.
- **Role partnerek** wyświetlone pod nazwiskami (*Partner · finanse i PM wdrożeń* / *Partner · księgowość i wdrożenia SAP B1*).
- Lepsze placeholdery w polach (*"np. Anna Kowalska"*, *"anna@firma.pl"*, *"Na jakim etapie jest projekt? Jaki system?"*).

### Design / paleta

- **Akcent zmieniony z Tailwind teal `#14b8a6` na deep wine `#8B2332`** (hover `#6E1A26`).
- Dla hero (na navy) dodatkowy `--accent-on-dark: #C04256` — jaśniejsza wersja, lepszy kontrast na ciemnym tle.
- Wszystkie miejsca, które używały `--accent` (CTA, eyebrow, hover na value cards, pull quote border, FAQ "+", focus ring formularza), korzystają teraz z nowego akcentu — spójność zachowana automatycznie.
- Box-shadow na hover primary CTA dopasowany do nowego koloru (`rgba(139, 35, 50, 0.32)`).
- **Dlaczego wine, nie inne:** premium, finansowy, classic editorial, distinctive vs. każdy inny SaaS w Tailwind. Pasuje do gravitas brandu.

### Meta / SEO

- **Title:** *Axite — niezależne doradztwo przy wdrożeniach ERP* (dawne *Axite — ERP na właściwej osi | Doradztwo wdrożeniowe* mówi nic).
- **Meta description** napisany pod intent searchera: *„Axite to butikowe doradztwo dla zarządów wdrażających systemy ERP (SAP Business One, Microsoft Dynamics 365, Comarch, Enova). Po stronie klienta — bez prowizji od dostawców systemów."*.
- **Open Graph + Twitter Card** dodane.
- **Canonical** ustawiony na `https://axite.pl/` (założenie, że domena będzie podpięta).
- `theme-color` ustawiony na navy `#0f172a` (paskuje bar adresu w mobile Chrome).
- **Preconnect** do Google Fonts dla szybszego renderingu typografii.
- Dodany `lang="pl"` w `<html>`.

### Drobne

- Drugi CTA-banner *„Jeśli ERP ma być fundamentem — nie zaczynaj bez struktury"* zostaje (jeden CTA przed sekcją kontakt to standard, działa). Skrócony i z lepszym buttonem.
- Wszystkie sekcje mają teraz `aria-labelledby` wskazujące na ich tytuł — czytniki ekranu mają poprawną strukturę.
- Lepszy tytuł logo: `aria-label="Axite — strona główna"`.
- Dodane unbreakable spaces (`&nbsp;`) w typograficznie wrażliwych miejscach (po krótkich wyrazach: w, i, z, na końcach linii w nagłówkach).

---

## ⚠️ TODO — wymaga twojej decyzji / inputu

Pogrupowane po priorytecie. **Pierwsza grupa kosztuje pieniądze codziennie** — wszystko, co użytkownik dziś wypełni w formularzu, znika w próżni.

### 🚨 Priorytet zero (zrób w tym tygodniu)

1. **Załóż Formspree, podmień `YOUR_FORM_ID` w `script.js` linia ~146** na realny endpoint. Bez tego formularz nie wysyła. Alternatywy: Web3Forms, Getform, Netlify Forms (jeśli przeniesiesz hosting).
2. **Skonfiguruj custom domain `axite.pl` w GitHub Pages.**
   - Dashboard repo → Settings → Pages → Custom domain → `axite.pl`.
   - W panelu domeny: rekordy DNS A na `185.199.108.153` / `.109` / `.110` / `.111` (4 rekordy A) lub CNAME `wojojoj0.github.io`.
   - Zaznacz *Enforce HTTPS* po propagacji DNS (do 24h).
   - Dopiero po tym kroku reszta linków (canonical, OG) ma sens.

### 🟡 Priorytet 1 (zrób w ciągu 2 tygodni)

3. **Linki LinkedIn założycielek** — w `index.html` znajdź dwa komentarze `TODO: podmień #` w sekcji `#o-nas` i podmień `href="#"` na realne URL.
4. **Zdjęcia założycielek** — sesja czarno-białych portretów w studio (1 dzień). Szablon jest gotowy: dodaj `<img src="..." alt="..." class="person-photo">` w `.person-card` przed `<h3>`. Jeśli chcesz, mogę dopisać CSS pod fotografię.
5. **Logotypy klientów (`.trust-clients`)** — jeśli macie zgodę Capital Park / Globalworth / Luxvet / KR Group na publikację logotypów, zamień `<span>` na `<img>` z monochromatycznymi SVG. Bez zgody — zostaw nazwy w Spectral, też wygląda klasowo.
6. **Telefon kontaktowy** — jeśli udostępniacie, dopisz w sekcji Kontakt pod mailem. Gotowe miejsce w `.contact-intro`.
7. **Favicon** — wyeksportuj literę "A" w Spectral z accent burgundy na jasnym tle do `favicon.svg` + 512×512 PNG. Dodaj `<link rel="icon">` w `<head>`.
8. **Open Graph image (1200×630)** — typograficzna grafika z headline brandu. Dodaj `<meta property="og:image">` w `<head>`.

### 🟢 Priorytet 2 (kiedy będzie czas)

9. **Zweryfikuj odpowiedzi w FAQ** — szczególnie *„Ile trwa typowy projekt"* (pisałem 4–8 tyg / 6–12 mies / kilka tyg–kwartał) i *„Jaki jest model rozliczenia"* (stawka dzienna lub retainer). Jeśli wasza praktyka wygląda inaczej — popraw.
10. **Calendly / Cal.com** zamiast formularza. Przy boutique consultingu B2B kalendarz konwertuje 2–3× lepiej niż formularz, bo usuwa krok *„czekam na odpowiedź"*. Dodaj jako alternatywę: po prawej formularz, po lewej widget kalendarza.
11. **Testimonial z imienia, nazwiska i stanowiska** — choćby jeden, od osoby z Capital Park / Globalworth. Najmocniejszy social proof, jaki istnieje w B2B. Dodaj nową sekcję między *Doświadczeniem* a *O nas*.
12. **Sitemap.xml + robots.txt** — przed indeksacją. Mogę wygenerować, jeśli powiesz.

---

## 🔧 Co celowo zostawiłem bez zmian

- **Architektura plików** (1 HTML + 1 CSS + 1 JS) — nie ma powodu dzielić, jest czytelna.
- **Cały case study o go-live** — to wasz najmocniejszy content. Skrócenie zabiłoby siłę. Zmieniłem tylko drobne typo i dodałem `&nbsp;` w newralgicznych miejscach.
- **Lista projektów** — dodałem wyróżnione `<strong>` na nazwach systemów dla skanowalności, reszta bez zmian.
- **Header sticky z backdrop-blur** — subtelny, premium, pasuje do brandu.
- **Border-radius 2px na buttonach** — intencjonalny brutalism-light, dobry detal.
- **Copyright "© 2026"** zostaje auto-aktualizujący się przez JS — działa.

---

## 🎯 Spodziewany efekt zmian

Z mojej oceny v2 (przed zmianami):
- Komunikat: 5/10
- Struktura: 4/10
- Copy: 7/10
- Design: 7,5/10
- Wykonanie techniczne: **2/10** (martwy formularz, github.io, rotujący H1)

Po wdrożeniu paczki (zakładając, że punkty 1–2 z TODO są zrobione):
- Komunikat: **8/10** (jasny value prop w hero, FAQ rozwiewa wątpliwości)
- Struktura: **8/10** (logiczna kolejność: hero → trust → problem → oferta → praktyka → doświadczenie → o nas → FAQ → kontakt)
- Copy: **8/10** (krótsze, mocniejsze, mniej "my", więcej konkretu)
- Design: **8/10** (ten sam dobry editorial minimalism, ale z brandowym kolorem)
- Wykonanie techniczne: **8/10** (formularz działa z fallbackiem, własna domena, statyczny H1)

Średnia idzie z ~5/10 na ~8/10 przy nakładzie ~jednego dnia roboczego (głównie Formspree + DNS + linki LinkedIn).
