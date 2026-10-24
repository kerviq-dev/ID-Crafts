# ID CRAFT — Luxury Identity & Bespoke Atelier

> **Kuwait's premier bespoke identity atelier.** Precision-crafted titanium NFC ID cards, silk lanyards, badge reels, and thermal vessels from Shuwaikh Industrial.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/kerviq-dev/ID-Crafts)

---

## Live Site

**Production:** https://id-crafts.vercel.app/
**Repository:** https://github.com/kerviq-dev/ID-Crafts

---

## Pages

| Page | Description |
|------|------------|
| `/` `index.html` | Homepage - hero video, curated collection, brand showcase |
| `/shop.html` | Full catalog with filter/sort |
| `/product-id-cards.html` | ID Cards product page |
| `/product-lanyards.html` | Lanyards product page |
| `/product-tumblers.html` | Tumblers product page |
| `/product-badge-reels.html` | Badge Reels product page |
| `/product-bottles.html` | Bottles product page |
| `/product-card-holders.html` | Card Holders product page |
| `/custom-order.html` | Custom bespoke order studio |
| `/corporate.html` | Corporate solutions & bulk inquiries |
| `/our-work.html` | Portfolio & gallery |
| `/about.html` | About the atelier |
| `/contact.html` | Contact & interactive map |
| `/cart.html` | Shopping cart |
| `/checkout.html` | Checkout flow |
| `/account.html` | Account dashboard |
| `/auth.html` | Login / Register |
| `/track-order.html` | Order tracking |
| `/order-confirmation.html` | Order success page |

---

## Deployment (Vercel)

### Option 1: GitHub Integration (Recommended)

1. Push this repo to GitHub: `https://github.com/kerviq-dev/ID-Crafts`
2. Visit https://vercel.com/new
3. Import the `kerviq-dev/ID-Crafts` repository
4. Vercel auto-detects the static site - no build command needed
5. Click **Deploy**

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

---

## Local Development

```bash
# Start local dev server on port 3000
npm run dev

# Or use any static server
npx serve . -l 3000
```

Open http://localhost:3000 in your browser.

---

## Tech Stack

- **HTML5** - Page structure & semantic markup
- **Tailwind CSS CDN** - Utility-first styling with custom design tokens
- **Vanilla CSS** - Custom component styles (css/custom.css)
- **Vanilla JavaScript** - App logic, state, drawers, cart (js/)
- **Leaflet.js** - Interactive map on contact page
- **Material Symbols** - Icon system
- **Google Fonts** - Syne + Plus Jakarta Sans typography
- **LocalStorage** - Cart, wishlist, and user state persistence

---

## Push to GitHub

```bash
git init
git add .
git commit -m "feat: initial ID Crafts luxury atelier platform"
git branch -M main
git remote add origin https://github.com/kerviq-dev/ID-Crafts.git
git push -u origin main
```

---

*Shuwaikh Industrial Metrology Lab - Kuwait - Est. 2026*
