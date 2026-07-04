# TR Travel — Backend API

A **Node.js + Express** REST API powering the TR Travel admin portal, booking system, visa consultation scheduling, and dynamic site content management. Supports both **MongoDB** (production) and an **in-memory fallback** (development/demo without a database).

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Running the Server](#running-the-server)
- [Database Modes](#database-modes)
- [Authentication](#authentication)
- [API Reference](#api-reference)
  - [Health Check](#health-check)
  - [Auth Routes](#auth-routes)
  - [Booking Routes](#booking-routes)
  - [Visa Consultation Routes](#visa-consultation-routes)
  - [Site Content Routes](#site-content-routes)
- [Data Models](#data-models)
- [Middleware](#middleware)
- [Default Admin Account](#default-admin-account)
- [Registering a New Admin](#registering-a-new-admin)

---

## Tech Stack

| Package | Purpose |
|---|---|
| **Express 5** | HTTP server & routing |
| **Mongoose** | MongoDB ODM |
| **bcryptjs** | Password hashing |
| **jsonwebtoken** | JWT-based authentication |
| **dotenv** | Environment variable loading |
| **cors** | Cross-origin request support |
| **nodemon** | Auto-restart during development |

---

## Project Structure

```
backend/
├── server.js               # Entry point — loads .env, starts HTTP server
├── app.js                  # Express app setup, middleware, route mounting
├── .env                    # Your local environment variables (not committed)
├── .example.env            # Template showing required env variables
│
├── config/
│   └── db.config.js        # MongoDB connection logic
│
├── middleware/
│   └── auth.middleware.js  # JWT verification — protects admin routes
│
├── models/
│   ├── user.model.js        # Admin user schema
│   ├── booking.model.js     # Booking schema
│   ├── consultation.model.js # Visa consultation schema
│   └── content.model.js     # Site content (single document) schema
│
├── controllers/
│   ├── auth.controllers.js        # Register, login, default admin seeding
│   ├── booking.controllers.js     # CRUD for bookings
│   ├── consultation.controllers.js # CRUD for visa consultations
│   └── content.controllers.js     # Get/update/reset site content
│
└── routes/
    ├── auth.routes.js          # POST /api/auth/register, /api/auth/login
    ├── booking.routes.js       # /api/bookings
    ├── consultation.routes.js  # /api/visa-consultations
    └── content.routes.js       # /api/content
```

---

## Environment Setup

Copy `.example.env` to `.env` and fill in your values:

```bash
cp .example.env .env
```

`.env` variables:

```env
MONGO_URI=mongodb://localhost:27017/travel_app   # MongoDB connection string
JWT_SECRET=your_jwt_secret_key                   # Secret for signing JWT tokens
PORT=8080                                         # Port the server listens on
```

> **Note:** If `MONGO_URI` is not set, the backend automatically falls back to **in-memory storage** (data is lost on restart).

---

## Running the Server

```bash
# Install dependencies
npm install

# Development (auto-restart on file changes)
npm run dev

# Production
npm start
```

Server starts on `http://localhost:8080` by default (or whatever `PORT` is set to).

---

## Database Modes

The backend supports **two storage modes** that are automatically selected:

### MongoDB Mode (recommended for production)
- Activated when `MONGO_URI` is set in `.env`
- All data is persisted to MongoDB collections: `users`, `bookings`, `consultations`, `contents`
- Uses Mongoose models for schema validation

### In-Memory Mode (development/demo)
- Activated when `MONGO_URI` is **not** set
- Data is stored in Node.js global variables:
  - `global.__trTravelUsers`
  - `global.__trTravelBookings`
  - `global.__trTravelConsultations`
- ⚠️ All data is **lost when the server restarts**

---

## Authentication

The API uses **JWT (JSON Web Token)** Bearer token authentication for admin-only routes.

**How it works:**
1. Admin logs in via `POST /api/auth/login` and receives a `token`
2. For protected routes, include the token in the request header:
   ```
   Authorization: Bearer <your_token_here>
   ```
3. The `auth.middleware.js` verifies the token on every protected request
4. Tokens expire after **7 days**

**JWT Secret** is read from `process.env.JWT_SECRET`, defaulting to `'tr-travel-secret'` if not set (set a strong secret in production!).

---

## API Reference

### Health Check

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/health` | None | Check if the server is running |

**Response:**
```json
{ "success": true, "message": "TR Travel backend is running" }
```

---

### Auth Routes

Base path: `/api/auth`

#### `POST /api/auth/register` — Register a new admin

> ⚠️ **Open route** — no token required. Anyone can create an admin account.

**Request Body:**
```json
{
  "name": "New Admin",
  "email": "newadmin@trtravel.com",
  "password": "yourpassword"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": {
    "id": "...",
    "name": "New Admin",
    "email": "newadmin@trtravel.com",
    "role": "admin"
  }
}
```

**Error Responses:**
- `400` — Missing name, email, or password
- `409` — User with that email already exists
- `500` — Server error

---

#### `POST /api/auth/login` — Login

**Request Body:**
```json
{
  "email": "admin@trtravel.com",
  "password": "admin1234"
}
```

**Success Response (200):**
```json
{
  "success": true,
  "token": "<jwt_token>",
  "user": {
    "id": "...",
    "name": "TR Travel Admin",
    "email": "admin@trtravel.com",
    "role": "admin"
  }
}
```

**Error Responses:**
- `400` — Missing email or password
- `404` — User not found
- `401` — Wrong password
- `500` — Server error

---

### Booking Routes

Base path: `/api/bookings`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/bookings` | ❌ Public | Submit a new booking (from frontend checkout) |
| GET | `/api/bookings` | ✅ Admin | Get all bookings |
| PUT | `/api/bookings/:id` | ✅ Admin | Update a booking status |
| DELETE | `/api/bookings/:id` | ✅ Admin | Delete a booking |

#### `POST /api/bookings` — Create Booking (Public)

**Required fields in body:** `id`, `packageName`, `customerEmail`

**Full body shape:**
```json
{
  "id": "TRV-1234",
  "packageId": "pkg-001",
  "packageName": "Premium Maldives Tour",
  "packageType": "tour",
  "customerName": "John Doe",
  "customerEmail": "john@example.com",
  "customerPhone": "+880 1700000000",
  "travelDate": "2026-09-15",
  "travelersCount": 2,
  "totalPrice": 1500,
  "status": "Confirmed",
  "bookingDate": "2026-07-04",
  "specialRequests": "Vegetarian meals please"
}
```

`packageType` must be one of: `tour`, `hajj`, `umrah`, `visa`, `custom`

#### `PUT /api/bookings/:id` — Update Status (Admin)

**Body:**
```json
{ "status": "Confirmed" }
```

`status` must be `"Pending"` or `"Confirmed"`

---

### Visa Consultation Routes

Base path: `/api/visa-consultations`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/visa-consultations` | ❌ Public | Submit a consultation request |
| GET | `/api/visa-consultations` | ✅ Admin | Get all consultations |
| PUT | `/api/visa-consultations/:id` | ✅ Admin | Update consultation status |
| DELETE | `/api/visa-consultations/:id` | ✅ Admin | Delete a consultation |

#### `POST /api/visa-consultations` — Create Consultation (Public)

**Required fields:** `id`, `name`, `email`, `country`

**Full body shape:**
```json
{
  "id": "TRV-5678",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "+880 1800000000",
  "country": "United Kingdom",
  "date": "2026-08-10",
  "timeSlot": "10:00 AM - 11:00 AM",
  "notes": "Need Schengen visa info",
  "status": "Scheduled",
  "createdAtDate": "7/4/2026"
}
```

`status` must be `"Scheduled"` or `"Pending"`

#### `PUT /api/visa-consultations/:id` — Update Status (Admin)

**Body:**
```json
{ "status": "Pending" }
```

---

### Site Content Routes

Base path: `/api/content`

> ⚠️ These routes are **not protected by auth middleware** — the content is publicly readable and writable. Consider adding auth protection in production.

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/content` | ❌ Public | Fetch the full site content JSON |
| PUT | `/api/content` | ❌ Public | Overwrite the full site content JSON |
| POST | `/api/content/reset` | ❌ Public | Reset content to factory defaults |

The site content is stored as a **single document** in MongoDB (or in memory) with the name `"site-content"`. The entire homepage — hero text, destinations, packages, airlines, gallery, etc. — is controlled through this one document and is editable via the Admin Dashboard.

**GET `/api/content` — Response shape (abbreviated):**
```json
{
  "hero": { "title": "...", "subtitle": "...", "badge": "...", "backgroundImage": "..." },
  "navbar": { "brand": "TR Travel", "tagline": "..." },
  "destinations": [...],
  "packages": [...],
  "hajjPackages": [...],
  "visas": [...],
  "airlines": [...],
  "gallery": [...],
  "about": { ... },
  "contact": { ... },
  "footer": { ... }
}
```

---

## Data Models

### User (`user.model.js`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `name` | String | ✅ | Display name |
| `email` | String | ✅ | Must be unique |
| `password` | String | ✅ | Stored as bcrypt hash |
| `role` | String | ✅ | `"admin"` or `"user"`, default `"admin"` |

---

### Booking (`booking.model.js`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | String | ✅ | Client-generated unique ID (e.g. `TRV-1234`) |
| `packageName` | String | ✅ | |
| `packageType` | String | ✅ | `tour`, `hajj`, `umrah`, `visa`, `custom` |
| `customerName` | String | ✅ | |
| `customerEmail` | String | ✅ | |
| `customerPhone` | String | ✅ | |
| `travelDate` | String | ✅ | |
| `travelersCount` | Number | ✅ | |
| `totalPrice` | Number | ✅ | |
| `status` | String | ✅ | `Pending` or `Confirmed` (default: `Confirmed`) |
| `bookingDate` | String | ✅ | |
| `specialRequests` | String | ❌ | Optional notes |
| `visaCountry` | String | ❌ | For visa-type bookings |

---

### Visa Consultation (`consultation.model.js`)

| Field | Type | Required | Notes |
|---|---|---|---|
| `id` | String | ✅ | Client-generated unique ID |
| `name` | String | ✅ | |
| `email` | String | ✅ | |
| `phone` | String | ✅ | |
| `country` | String | ✅ | Visa destination country |
| `date` | String | ✅ | Preferred consultation date |
| `timeSlot` | String | ✅ | Preferred time slot |
| `notes` | String | ❌ | Optional notes |
| `status` | String | ✅ | `Scheduled` or `Pending` (default: `Scheduled`) |
| `createdAtDate` | String | ✅ | |

---

### Site Content (`content.model.js`)

| Field | Type | Notes |
|---|---|---|
| `name` | String | Always `"site-content"` (unique key) |
| `sections` | Object | The entire site content JSON blob |

---

## Middleware

### `auth.middleware.js`

Validates the JWT token on every protected request.

- Reads the `Authorization: Bearer <token>` header
- Verifies the token using `JWT_SECRET`
- Attaches the decoded user payload to `req.user`
- Returns `401` if the token is missing, invalid, or expired

Applied to all **admin-only** routes (GET/PUT/DELETE on bookings and consultations).

---

## Default Admin Account

When the server starts and the user collection is **empty**, a default admin is automatically seeded:

| Field | Value |
|---|---|
| **Email** | `admin@trtravel.com` |
| **Password** | `admin1234` |
| **Role** | `admin` |

> This happens in `ensureDefaultAdmin()` inside `auth.controllers.js`, called on every login and register attempt.

---

## Registering a New Admin

The `/api/auth/register` endpoint is open. Use any of these methods:

**PowerShell:**
```powershell
Invoke-WebRequest -Uri "http://localhost:8080/api/auth/register" `
  -Method POST `
  -ContentType "application/json" `
  -Body '{"name":"New Admin","email":"new@trtravel.com","password":"securepass"}'
```

**curl (bash/terminal):**
```bash
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"New Admin","email":"new@trtravel.com","password":"securepass"}'
```

**Postman / Thunder Client:**
- Method: `POST`
- URL: `http://localhost:8080/api/auth/register`
- Body: raw JSON with `name`, `email`, `password`
