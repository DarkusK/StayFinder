# StayFinder 🏡

A responsive apartment-booking web app — a modern lodging platform built with **React + Vite**.

Palette: dark navy `#1E3A8A` · white · light gray, styled to match the StayFinder logo.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL Vite prints (default http://localhost:5173).

```bash
npm run build     # production build → dist/
npm run preview   # preview the production build
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero search, popular destinations, featured stays, features, footer |
| `/search` | Search results — filter sidebar (price, guests, rating, type), sort, skeleton loaders, empty state |
| `/apartment/:id` | Apartment details — gallery + lightbox, amenities, reviews, sticky booking form |
| `/confirmation/:bookingId` | Booking confirmation — reference number, full summary, success toast |
| `/admin` | Admin dashboard — stats, searchable/filterable bookings table, editable status |

## How it works

- **Catalog** — 12 demo apartments in `src/data/apartments.js` (Unsplash images).
- **Bookings** — persisted in `localStorage` via `src/context/BookingContext.jsx`, so a booking made
  in the flow immediately appears in the Admin dashboard and survives page reloads.
- **Design system** — CSS variables + global styles in `src/index.css`.

## Features

- **Bilingual (English / Ukrainian)** with a language switch in the navbar — the whole UI *and*
  the listing content (names, descriptions, reviews, amenities, cities) translate, with
  Ukrainian plural rules and localized dates. The choice persists in `localStorage`.
- Fully responsive (desktop → mobile with hamburger nav)
- Basic form validation (required fields, email format, date order, guest limits)
- Loading (spinner / skeletons) and empty states
- Live price calculation, status badges, star ratings, toast notifications

## Internationalization

- `src/i18n/translations.js` — the EN/UK dictionary + Ukrainian plural helper.
- `src/context/LanguageContext.jsx` — `useI18n()` exposes `{ lang, setLang, t }`.
- `src/data/apartments.uk.js` + `src/data/useLocalizedData.js` — Ukrainian listing content and
  hooks that merge it with the base catalog by the active language (search still matches in both
  languages, and bookings store canonical names so the admin table localizes correctly).

## Project structure

```
src/
  components/   # Navbar, Footer, cards, forms, filters, gallery, icons, states
  pages/        # Home, SearchResults, ApartmentDetails, BookingConfirmation, AdminDashboard
  context/      # BookingContext (localStorage-backed)
  data/         # apartments + seed bookings
  hooks/        # useLocalStorage
  utils/        # date & price formatting
  index.css     # design tokens + all styles
```

## License

The original source code in this repository is licensed under the
[PolyForm Noncommercial License 1.0.0](LICENSE.md). Commercial use of this project's original
source code, in whole or in part, is not licensed. Third-party dependencies and media remain
subject to their respective licenses and terms.
