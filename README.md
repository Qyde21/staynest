# StayNest 🏡

**A Kenya-focused BnB booking platform** — discover extraordinary stays from the coast to the savannah.

## Live Demo

> _Coming soon — deploy to Vercel or Netlify (see below)_

---

## Features

- 🗺️ **8 curated Kenyan listings** — beach, safari, mountain, city, lakeside & farm stays
- 🔍 **Category filtering** — browse by stay type
- 🖼️ **Property gallery** with multi-image carousel
- 📅 **Full booking flow** — date selection, guest count, pricing breakdown
- 💳 **M-Pesa & card payment UI** — KES pricing throughout
- ✅ **Booking confirmation** with reference number
- 📱 **Responsive design** — mobile, tablet & desktop

## Tech Stack

- **React 18** with React Router v6
- **CSS custom properties** (design tokens, no CSS framework)
- Fonts: [Playfair Display](https://fonts.google.com/specimen/Playfair+Display) + [DM Sans](https://fonts.google.com/specimen/DM+Sans)

---

## Getting Started

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/staynest.git
cd staynest

# Install dependencies
npm install

# Start dev server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── components/
│   ├── layout/         # Navbar, Footer
│   ├── property/       # PropertyCard, CategoryFilter
│   ├── booking/        # BookingWidget
│   └── ui/             # SearchBar
├── pages/
│   ├── HomePage.jsx
│   ├── ListingsPage.jsx
│   ├── PropertyDetailPage.jsx
│   ├── BookingPage.jsx
│   └── BookingConfirmPage.jsx
└── data/
    └── properties.js   # Mock listings + formatKES utility
```

## Deployment

### Vercel (recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm run build
# Drag the /build folder into Netlify dashboard
```

---

## Roadmap

- [ ] Backend API (Node.js / Express)
- [ ] Real M-Pesa Daraja API integration
- [ ] User auth (sign up / sign in)
- [ ] Host dashboard for listing management
- [ ] Map view with property pins
- [ ] Reviews & ratings system
- [ ] Availability calendar

---

## License

MIT © StayNest Kenya
