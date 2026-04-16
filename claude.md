# ClearWater (JalRakshak) — Project Intelligence File

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    FRONTEND (Vite + React 19)            │
│  Port 5173  •  SPA with react-router-dom v7              │
│                                                          │
│  Landing ─► Login/Register ─► Dashboard (Sidebar layout) │
│                                  ├── Home                │
│                                  ├── Water Quality (Map)  │
│                                  ├── NGOs                │
│                                  └── Profile             │
└──────────────────────┬──────────────────────────────────┘
                       │  Vite proxy: /api → :5001
                       ▼
┌─────────────────────────────────────────────────────────┐
│               BACKEND (Express 5 + Node.js)              │
│  Port 5001  •  REST API  •  ES Modules                   │
│                                                          │
│  Routes:                                                 │
│    GET  /api/states              → unique state names     │
│    GET  /api/districts/:state    → districts for state    │
│    GET  /api/rivers?state=&districts= → monitoring locs   │
│    GET  /geocode?place=          → lat/lon from Nominatim │
│    POST /api/register            → user registration (WIP)│
└──────────────────────┬──────────────────────────────────┘
                       │  @supabase/supabase-js
                       ▼
┌─────────────────────────────────────────────────────────┐
│                  SUPABASE (PostgreSQL)                    │
│                                                          │
│  Tables:                                                 │
│    "State"              → columns: "State Name", District │
│    "water_quality_data" → columns: id, "Monitoring        │
│                           Location", District,            │
│                           "State Name", lattitude,        │
│                           longitude                       │
│    "users"              → (planned, not yet active)       │
└─────────────────────────────────────────────────────────┘
```

---

## Key Files

### Backend

| File | Purpose |
|------|---------|
| `backend/server.js` | Express entry point. Mounts all routes, enables CORS & JSON parsing. Runs on PORT from `.env` (default 5001). |
| `backend/src/database/supabaseConfig.js` | Creates and exports the Supabase client using `SUPABASE_PROJECT_URI` and `SUPABASE_ANON_KEY` from `.env`. |
| `backend/src/controller/stateFetch.controller.js` | Queries `"State"` table, returns deduplicated array of `"State Name"` values. |
| `backend/src/controller/districtFetch.controller.js` | Accepts `:state` URL param, queries `"State"` table for matching `District` values using `ilike`. |
| `backend/src/controller/monitoringLocation.controller.js` | Accepts `?state=&districts=` query params, queries `"water_quality_data"` for `"Monitoring Location"`, `lattitude`, `longitude`. |
| `backend/src/controller/geocode.controller.js` | Accepts `?place=` query param, delegates to `geocodeHelper.js` for Nominatim lookup. |
| `backend/src/controller/register.controller.js` | Express sub-router for `POST /`. Validates fields (`user_id`, `full_name`, `email`, `phone`, `address`, `dob`, `password`). **DB insert is commented out** — currently returns a mock success response. |
| `backend/src/utils/geocodeHelper.js` | Wraps the Nominatim OpenStreetMap geocoding API with an in-memory cache. Returns `{ lat, lon, name }`. |
| `backend/src/scripts/geoCoding.script.js` | **Standalone batch script** (not part of the server). Reads rows from `water_quality_data` where `lattitude IS NULL`, geocodes them via the OpenCage API, and updates the DB. Includes a 1-second delay per row for rate-limiting. |
| `backend/src/routes/stateRoute.js` | `GET /states` → `stateFetch` controller |
| `backend/src/routes/districtFetch.router.js` | `GET /districts/:state` → `districtFetch` controller |
| `backend/src/routes/monitoringLocation.router.js` | `GET /rivers` → `monitoringLocation` controller |
| `backend/src/routes/geocode.router.js` | `GET /` → `getGeocode` controller |

### Frontend

| File | Purpose |
|------|---------|
| `frontend/src/main.jsx` | React entry. Wraps `<App>` in `<BrowserRouter>` and `<StrictMode>`. |
| `frontend/src/App.jsx` | Central router. Conditionally renders Sidebar + hamburger menu (for authenticated pages) vs. clean layout (for `/`, `/login`, `/register`). Defines all `<Route>` elements. Uses a `river.png` background image. |
| `frontend/src/pages/Landingpage.jsx` | Public landing page. Composes: `Navbar → Hero → WhatWeDo → About → HelpCenter → Footer`. |
| `frontend/src/pages/login.jsx` | Login form (email + password). On submit, navigates to `/home` (no real auth yet). Links to `/register`. |
| `frontend/src/pages/register.jsx` | Registration form with 8 fields. Posts to `http://localhost:5001/api/register`. Client-side validates required fields, password match, and min length. On success navigates to `/`. |
| `frontend/src/pages/home.jsx` | Post-login dashboard home. Shows a hero card with a "Water Quality" CTA linking to `/check`. Lists feature bullets (E(P) Rules 1986, Gov data, usage types). |
| `frontend/src/pages/waterQuality.jsx` | **Core feature page.** Split layout: left = `MapView` (Leaflet map), right = `Dropdown` filters (State→District→River cascade) + usage selector (Drinking/Bathing/Treatment/Wildlife/Irrigation) + "Check Quality" button → toggles `ResultCard`. |
| `frontend/src/pages/ngos.jsx` | NGO directory. Hardcoded data for 4 organizations (EFI, TBS, IWF, WaterAid) with images, missions, activities, impact stats, credibility assessments, and external "Join Us" links. |
| `frontend/src/pages/profile.jsx` | User profile page with **hardcoded demo data** for "Satyajeet Ravan". Shows contact info, bio, badges (Water Guardian, Quality Expert, Eco Warrior), statistics, and recent activity timeline. |
| `frontend/src/components/navbar.jsx` | Animated top nav (framer-motion). Hash-links for in-page scrolling. "Login / Sign Up" button navigates to `/login` via `useNavigate`. |
| `frontend/src/components/hero.jsx` | Hero section with animated entrance. "Explore Water Quality" button navigates to `/login`. "Learn More" smooth-scrolls to `#aboutus`. Includes a bouncing scroll indicator. |
| `frontend/src/components/about.jsx` | Slide-in animated section describing the platform's mission (CPCB-based water quality assessment). Uses an Unsplash image. |
| `frontend/src/components/whatwedo.jsx` | Grid of 4 `FeatureCard` components (Monitoring, Real-time Data, Map Visualization, Community Awareness). |
| `frontend/src/components/featurecard.jsx` | Reusable animated card (framer-motion `whileHover` scale, `whileInView` fade-up). Accepts `icon`, `title`, `description`, `delay` props. |
| `frontend/src/components/helpcenter.jsx` | FAQ section with 3 animated cards + "Contact Support" button. |
| `frontend/src/components/footer.jsx` | Site footer with branding, quick links (hash anchors), contact email, and social media icons (Facebook, Twitter, Instagram). |
| `frontend/src/components/sidebar.jsx` | Collapsible sidebar for authenticated pages. Links: Home, Water Quality, History (placeholder), NGOs, Profile, Logout (→ `/`). Uses react-icons. |
| `frontend/src/components/dropdown.jsx` | **Cascading dropdown system.** Three `useEffect` hooks: (1) fetch all states on mount → `/api/states`, (2) on state change → `/api/districts/:state`, (3) on district change → `/api/rivers?state=&districts=`. Lifts selections up to parent via `setState`, `setDistrict`, `setRiver` props. |
| `frontend/src/components/mapview.jsx` | Leaflet `MapContainer` rendering `Circle` markers (red, 5km radius) for each monitoring location. Re-fetches `/api/rivers` when state/district/river change. Uses `AutoZoom` helper. |
| `frontend/src/components/ResultCard.jsx` | **Static/hardcoded** result display showing "Mula River, Aundh" as UNSAFE with BOD/DO issues and recommendations. Not yet dynamic. |
| `frontend/src/components/controlPanel.jsx` | **Unused legacy component.** Static dropdowns with hardcoded values (Maharashtra, Pune, Drinking). |
| `frontend/src/helpers/zooming.helper.jsx` | `AutoZoom` — a renderless Leaflet component. Filters valid lat/lng points, then calls `map.fitBounds()` or `map.setView()` with a 100ms delay for proper sizing. |

---

## Tech Stack

### Frontend
| Technology | Version | Role |
|------------|---------|------|
| React | 19.2.4 | UI framework (functional components, hooks) |
| Vite | 8.0.1 | Build tool & dev server with HMR |
| react-router-dom | 7.14.0 | Client-side SPA routing (`BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `useLocation`) |
| Leaflet | 1.9.4 | Interactive map engine |
| react-leaflet | 5.0.0 | React bindings for Leaflet (`MapContainer`, `TileLayer`, `Circle`, `Popup`, `useMap`) |
| framer-motion | (latest) | Entrance/scroll/hover animations on landing page components |
| react-icons | 5.6.0 | Icon library (FaHome, FaWater, FaBars, FaTint, etc.) |
| Tailwind CSS | 4.2.2 | Utility-first CSS (imported via `@import "tailwindcss"` in index.css) |
| PostCSS + Autoprefixer | 8.5.8 / 10.4.27 | CSS processing pipeline |

### Backend
| Technology | Version | Role |
|------------|---------|------|
| Node.js | (runtime) | JavaScript server runtime |
| Express | 5.2.1 | HTTP server framework (ES module syntax) |
| @supabase/supabase-js | 2.103.0 | Supabase client for PostgreSQL queries |
| dotenv | 17.4.1 | Environment variable loading from `.env` |
| cors | 2.8.6 | Cross-origin request handling |

### External Services
| Service | Usage |
|---------|-------|
| **Supabase** | Hosted PostgreSQL database. Tables: `State` (state-district mapping), `water_quality_data` (monitoring locations with coordinates and quality data) |
| **Nominatim (OpenStreetMap)** | Runtime geocoding via `geocodeHelper.js` — converts place names to lat/lon for the `/geocode` endpoint |
| **OpenCage Geocoder API** | Batch geocoding in `geoCoding.script.js` — enriches database rows missing coordinates. Uses `OPENCAGE_API_KEY` from `.env` |
| **OpenStreetMap Tiles** | Map tile layer rendered in the Leaflet MapContainer (`tile.openstreetmap.org`) |

### Dev Proxy Configuration
`vite.config.js` proxies `/api` requests from the frontend dev server (port 5173) to the backend (port 5001), enabling same-origin API calls during development.

---

## Data Flow: Water Quality Check

```
User selects State
  → Dropdown fetches GET /api/states (on mount)
  → Dropdown fetches GET /api/districts/:state
User selects District
  → Dropdown fetches GET /api/rivers?state=X&districts=Y
  → MapView also fetches GET /api/rivers?state=X&districts=Y
  → Leaflet renders Circle markers at each (lattitude, longitude)
  → AutoZoom fits map bounds to visible markers
User clicks "Check Quality"
  → Shows static ResultCard (not yet connected to real quality analysis)
```

---

## Current Limitations / TODOs

- **No real authentication** — Login just navigates to `/home`, no token/session management
- **Registration DB insert is commented out** — returns mock success
- **ResultCard is static** — hardcoded "Mula River" data, not connected to actual water quality metrics
- **Profile is hardcoded** — displays demo data for "Satyajeet Ravan"
- **History page** — sidebar link exists but no route/page is implemented
- **controlPanel.jsx** — legacy unused component with hardcoded dropdowns
- **`register.jsx` navigates to `/`** after success — should navigate to `/login` now that routes changed
- **Column typo** — database column is `lattitude` (double-t) throughout the codebase
