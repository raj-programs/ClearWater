# 🌊 ClearWater — JalRakshak

A full-stack web application for monitoring and assessing river water quality across India. Built to help citizens check the safety of their local river water for drinking, bathing, and agriculture — powered by Government monitoring data and the E(P) Rules 1986.

---

## 📋 Table of Contents

- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Frontend](#-frontend)
- [Backend](#-backend)
- [API Endpoints](#-api-endpoints)
- [Database](#-database)
- [Environment Variables](#-environment-variables)
- [Features Implemented](#-features-implemented)
- [Future Scope](#-future-scope)

---

## 🛠 Tech Stack

| Layer      | Technology                                                                 |
| ---------- | -------------------------------------------------------------------------- |
| Frontend   | React 19, Vite 8, Tailwind CSS v4, React Router v7, Leaflet, React Icons  |
| Backend    | Node.js (v22), Express 5, dotenv, cors                                    |
| Database   | Supabase (PostgreSQL)                                                      |
| Map        | Leaflet + React-Leaflet + OpenStreetMap tiles                              |
| Geocoding  | Nominatim (OpenStreetMap) API                                              |

---

## 📁 Project Structure

```
ClearWater/
├── README.md                          # ← You are here
├── .gitignore
│
├── backend/
│   ├── .env                           # Environment variables (PORT, Supabase keys)
│   ├── package.json                   # Backend dependencies & scripts
│   ├── server.js                      # Express server entry point
│   └── src/
│       ├── controller/
│       │   ├── geocode.controller.js  # GET /geocode — geocode a place name
│       │   └── register.controller.js # POST /api/register — user registration
│       ├── database/
│       │   └── supabaseConfig.js      # Supabase client initialization
│       ├── routes/
│       │   └── geocode.router.js      # (Alternate route file, unused)
│       └── utils/
│           └── geocodeHelper.js       # Nominatim API helper with in-memory cache
│
└── frontend/
    ├── index.html                     # HTML entry point
    ├── package.json                   # Frontend dependencies & scripts
    ├── vite.config.js                 # Vite configuration
    ├── tailwind.config.js             # Tailwind CSS v4 configuration
    ├── postcss.config.js              # PostCSS with Tailwind plugin
    └── src/
        ├── main.jsx                   # React app bootstrap with BrowserRouter
        ├── App.jsx                    # Root component — routing & layout
        ├── index.css                  # Tailwind CSS import
        ├── App.css                    # Global app styles
        ├── assets/                    # Static images (river bg, NGO photos, logos)
        ├── components/
        │   ├── sidebar.jsx            # Collapsible sidebar navigation
        │   ├── sidebar.css
        │   ├── mapview.jsx            # Leaflet map component
        │   ├── controlPanel.jsx       # Water quality control panel
        │   ├── controlPanel.css
        │   ├── ResultCard.jsx         # Water quality result display card
        │   └── Resultcard.css
        └── pages/
            ├── login.jsx              # Login page
            ├── login.css
            ├── register.jsx           # Registration page
            ├── register.css
            ├── home.jsx               # Landing/home page
            ├── home.css
            ├── waterQuality.jsx       # Water quality checker with map
            ├── ngos.jsx               # NGO information page
            ├── ngos.css
            ├── profile.jsx            # User profile page
            └── profile.css
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18+ (tested on v22.18.0)
- **npm** (comes with Node.js)

### 1. Clone the repository

```bash
git clone https://github.com/satyajeet-ravan/ClearWater.git
cd ClearWater
```

### 2. Start the Backend

```bash
cd backend
npm install
npm start
```

The backend server starts at **http://localhost:5001**

### 3. Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts at **http://localhost:5173**

### 4. Open in Browser

Navigate to **http://localhost:5173** to use the application.

---

## 🎨 Frontend

### Pages & Routes

| Route        | Page             | Description                                                      |
| ------------ | ---------------- | ---------------------------------------------------------------- |
| `/`          | Login            | User login form with email/password                              |
| `/register`  | Register         | New user registration with all required fields                   |
| `/home`      | Home             | Landing page with project introduction and feature highlights    |
| `/check`     | Water Quality    | Interactive map + dropdowns for state/district/usage checking    |
| `/ngos`      | NGOs             | Cards for 4 water conservation NGOs with photos and "Join Us"    |
| `/profile`   | Profile          | User profile with stats, badges, contact info, recent activity   |

### Layout

- **Login & Register pages**: Full-screen centered forms, no sidebar/navbar
- **All other pages**: Top navbar with hamburger toggle + collapsible sidebar

### Sidebar Navigation

| Item           | Route      | Icon              |
| -------------- | ---------- | ----------------- |
| Home           | `/home`    | `FaHome`          |
| Water Quality  | `/check`   | `FaWater`         |
| History        | —          | `FaHistory`       |
| NGOs           | `/ngos`    | `RiUserCommunityFill` |
| Profile        | `/profile` | `CgProfile`       |
| Logout         | `/`        | `FaSignOutAlt`    |

### NGOs Featured

| # | NGO Name                                       | Website                                |
|---| ---------------------------------------------- | -------------------------------------- |
| 1 | Environmentalist Foundation of India (EFI)     | https://indiaenvironment.org           |
| 2 | Tarun Bharat Sangh (TBS)                       | https://tarunbharatsangh.in            |
| 3 | India Water Foundation                         | https://www.indiawaterfoundation.org   |
| 4 | WaterAid India                                 | https://www.wateraid.org/in            |

---

## ⚙️ Backend

### Server Configuration

- **Entry point**: `backend/server.js`
- **Default port**: `5001` (configurable via `.env`)
- **Module system**: ES Modules (`"type": "module"`)
- **Middleware**: `cors()`, `express.json()`

### Dependencies

| Package              | Purpose                               |
| -------------------- | ------------------------------------- |
| `express`            | Web framework                         |
| `dotenv`             | Load environment variables from .env  |
| `cors`               | Cross-Origin Resource Sharing         |
| `@supabase/supabase-js` | Supabase database client          |

---

## 📡 API Endpoints

### `GET /`

Health check endpoint.

- **Response**: `"Server Running..."`

---

### `GET /geocode?place={placeName}`

Geocodes a place name into latitude/longitude coordinates using the Nominatim (OpenStreetMap) API. Results are cached in memory.

**Query Parameters:**

| Parameter | Type   | Required | Description              |
| --------- | ------ | -------- | ------------------------ |
| `place`   | string | Yes      | Name of the place to geocode |

**Success Response (200):**

```json
{
  "lat": "19.0759837",
  "lon": "72.8776559",
  "name": "Mumbai, Maharashtra, India"
}
```

**Error Response (500):**

```json
{
  "error": "No result found"
}
```

---

### `POST /api/register`

Registers a new user. Currently returns a mock success response. Supabase integration code is pre-written and commented out — ready to activate once the database table is created.

**Request Body (JSON):**

| Field       | Type   | Required | Description              |
| ----------- | ------ | -------- | ------------------------ |
| `user_id`   | string | Yes      | Unique user identifier   |
| `full_name` | string | Yes      | User's full name         |
| `email`     | string | Yes      | Email address            |
| `phone`     | string | Yes      | Phone number             |
| `address`   | string | Yes      | Full address             |
| `dob`       | string | Yes      | Date of birth (YYYY-MM-DD) |
| `password`  | string | Yes      | Password (min 6 chars)   |

**Success Response (201):**

```json
{
  "message": "User registered successfully",
  "user": {
    "user_id": "user123",
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+91 98765 43210",
    "address": "Mumbai, Maharashtra",
    "dob": "2000-01-15"
  }
}
```

**Error Response (400):**

```json
{
  "error": "All fields are required"
}
```

---

## 🗄 Database

### Supabase Configuration

The app uses **Supabase** (hosted PostgreSQL) as its database. The client is initialized in `backend/src/database/supabaseConfig.js`.

### Database Integration Status

| Feature       | Status                   | Notes                                         |
| ------------- | ------------------------ | --------------------------------------------- |
| Supabase Client | ✅ Configured          | Client initialized with env variables         |
| User Registration | ⏳ Ready to activate  | Supabase insert code is commented out in `register.controller.js` |
| Water Quality Data | ⏳ Not yet connected | Dropdowns currently use static placeholders   |

### To Activate User Registration with Supabase

1. Create a `users` table in your Supabase dashboard with these columns:

   | Column      | Type    | Constraints       |
   | ----------- | ------- | ----------------- |
   | `user_id`   | text    | Primary Key       |
   | `full_name` | text    | Not Null          |
   | `email`     | text    | Unique, Not Null  |
   | `phone`     | text    | Not Null          |
   | `address`   | text    | Not Null          |
   | `dob`       | date    | Not Null          |
   | `password`  | text    | Not Null          |

2. Uncomment the Supabase block in `backend/src/controller/register.controller.js` (lines 20–44)
3. Remove the temporary success response (lines 46–50)

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
PORT=5001
SUPABASE_PROJECT_URI=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

> ⚠️ **Note**: The `.env` file is listed in `.gitignore` and should never be committed to version control.

---

## ✅ Features Implemented

- [x] **Authentication UI** — Login and Registration pages with form validation
- [x] **Collapsible Sidebar** — Navigation with icons, hamburger toggle, logout
- [x] **Home Page** — Landing page with project overview and feature highlights
- [x] **Water Quality Page** — Interactive Leaflet map with state/district/usage dropdowns
- [x] **Geocoding API** — Backend endpoint that converts place names to coordinates (with caching)
- [x] **Registration API** — Backend endpoint ready for Supabase database integration
- [x] **NGO Directory** — 4 NGO cards with photos, mission, impact, credibility, and "Join Us" links
- [x] **Profile Page** — User profile with stats, badges, contact info, and activity timeline
- [x] **Responsive Design** — Glassmorphism UI with river background, dark opaque cards
- [x] **CORS Enabled** — Frontend (port 5173) can communicate with backend (port 5001)

---

## 🔮 Future Scope

- [ ] Connect login/register to Supabase authentication
- [ ] Populate water quality data from Government monitoring datasets
- [ ] Dynamic state/district dropdowns from database
- [ ] History page — track past water quality checks
- [ ] Real-time water quality alerts
- [ ] Admin dashboard for data management
- [ ] Password hashing (bcrypt) before storing in database
- [ ] JWT-based session management

---

## 👥 Team

- **Repository**: [satyajeet-ravan/ClearWater](https://github.com/satyajeet-ravan/ClearWater)

---

## 📜 License

ISC
