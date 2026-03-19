# Axite — strona firmowa

Jednostronicowa witryna boutique consulting: **ERP**, finanse, transformacje, **governance** i **kontrola procesów**. Język: polski.

## Uruchomienie

Otwórz `index.html` w przeglądarce albo z serwera lokalnego:

```bash
cd erp-website
python -m http.server 8000
```

## Dostosowanie

- **E-mail** — w `index.html` zastąp `kontakt@axite.pl` prawdziwym adresem (i w `mailto:`).
- **Rotacja nagłówka w hero** — warianty w atrybucie `data-headlines` na elemencie `.hero-title-text`; wyłączana przy `prefers-reduced-motion`.
- **Formularz** — obecnie tylko symulacja wysyłki; podłącz Formspree, Netlify Forms lub własne API.
- **Hosting** — GitHub Pages / Netlify (patrz wcześniejsze instrukcje w README).

## Pliki

| Plik        | Rola                                      |
|------------|--------------------------------------------|
| `index.html` | Treść, struktura, SEO (meta description) |
| `styles.css` | Styl premium: granat, grafit, turkus, duża typografia |
| `script.js`  | Menu mobilne, rotacja hero, formularz      |

## Kolory (marka)

- Granat `#0F172A`
- Grafit `#1E293B`
- Biel
- Akcent turkus `#14B8A6`
