# Nova Web Studio — Portfolio

Portfolio site for our web agency, plus three fully working demo websites for local businesses.

| Page | Path |
|---|---|
| Agency portfolio (main page) | `index.html` |
| Hair salon demo — *Aurélia Hair Studio* | `demos/hair/index.html` |
| Nail salon demo — *Gyöngy Nail Lounge* | `demos/nails/index.html` |
| Tattoo studio demo — *Fekete Tinta Tattoo* | `demos/tattoo/index.html` |

Plain HTML/CSS/JS — no build step. Open `index.html` in a browser, or host it on GitHub Pages.

## Publish with GitHub Pages
1. Repo → **Settings → Pages**
2. Source: **Deploy from a branch**, Branch: `main`, folder: `/ (root)` → Save
3. After about a minute the site is live at `https://<username>.github.io/BusinessPortfolio/`

> The live previews inside the laptop/phone mockups auto-scroll on hover only when served over http(s) (e.g. GitHub Pages), not when opened directly as a local file.

## Placeholders to replace
- **Agency name** "nova / Nova Web Studio": `index.html` (logo, title, footer)
- **Contact details** `+36 30 000 0000`, `info@pelda.hu`: `index.html` (contact section and footer)
- **Contact form**: currently shows only a thank-you message. To actually receive submissions, connect it to e.g. [Formspree](https://formspree.io) (see the `submit` handler in `assets/js/main.js`).
- The demo businesses, names, addresses and prices are fictional. Photos are from Unsplash (free to use).
