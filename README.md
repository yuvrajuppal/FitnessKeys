# FitnessKeys

A full-stack fitness workout application with an admin panel for content management. Browse exercise routines categorized by muscle group, and manage categories and workouts through a secure admin interface.

## Tech Stack

| Layer  | Technology                                                                                    |
| ------ | --------------------------------------------------------------------------------------------- |
| Frontend (Public)  | React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7, Lucide React                     |
| Frontend (Admin)   | React 19, TypeScript, Vite, Tailwind CSS 4, React Router 7, Redux Toolkit, Axios             |
| Backend            | Node.js, Express 5, Prisma ORM, MariaDB/MySQL                                                |
| Auth               | JWT (httpOnly cookies), bcrypt                                                               |

## Project Structure

```
fitnesskeys/
├── frontend_web/          # Public-facing website
│   └── src/
│       ├── components/    # Navbar, shared UI
│       ├── pages/         # Homepage, BodyCategories, CategotyWorkouts
│       └── utils/         # API configuration
├── adminpanel/            # Admin dashboard
│   └── src/
│       ├── components/    # Navbar
│       ├── pages/         # Login, Categories CRUD, Workouts CRUD
│       ├── store/         # Redux slice & store
│       └── utils/         # API configuration
├── backend/               # Express API server
│   ├── prisma/schema/     # Database models (AdminUser, Category, Workout)
│   ├── src/
│   │   ├── controller/    # Route handlers
│   │   ├── middleware/     # JWT auth middleware
│   │   ├── routes/        # API route definitions
│   │   └── config/        # Multer, production config
│   └── uploads/           # Uploaded category/workout images
└── fitnesskeys.sql        # Database dump (schema + seed data)
```

## Features

### Public Website
- Browse exercise categories by muscle group (Chest, Triceps, Back, Biceps, Legs, Shoulders, Abs)
- View workout routines with descriptions, exercise counts, duration, and difficulty ratings
- Category pages with color-coded accent themes
- Animated card layouts with staggered entrance effects

### Admin Panel
- Secure login with JWT-based authentication (httpOnly cookies)
- Dashboard to manage fitness categories (create, read, update, delete)
- Dashboard to manage workouts per category (create, read, update, delete)
- Image upload support for categories and workouts
- Category filtering for workout management
- Logout with confirmation modal

### Backend API
- RESTful endpoints for categories and workouts
- Admin authentication (create, login, check, logout)
- File uploads via Multer with disk storage
- Swagger API documentation at `/api-docs`
- JWT cookie-based auth with 7-day expiry

## Getting Started

### Prerequisites

- Node.js 18+
- MariaDB or MySQL
- npm

### 1. Database Setup (Prisma ORM)

The database schema is defined using **Prisma ORM** with a MariaDB/MySQL datasource. Prisma models are located in `backend/prisma/schema/`.

Create a database named `fitnesskeys`:

```bash
mysql -u root -p -e "CREATE DATABASE fitnesskeys"
```

Configure your database URL in `backend/.env`:

```
DATABASE_URL="mysql://user:password@localhost:3306/fitnesskeys"
```

Generate the Prisma client and push the schema:

```bash
cd backend
npx prisma generate
npx prisma db push
```

Optionally import the provided dump for seed data:

```bash
mysql -u root -p fitnesskeys < fitnesskeys.sql
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env    # configure database URL & JWT secret
npm run dev             # starts on http://localhost:3000
```

### 3. Admin Panel

```bash
cd adminpanel
npm install
npm run dev             # typically http://localhost:5173
```

### 4. Public Website

```bash
cd frontend_web
npm install
npm run dev             # typically http://localhost:5174
```

### Default Admin Account

From seed data:

- **Username:** any
- **Password:** (bcrypt-hashed in dump — set via registration or ask admin)

## API Endpoints

| Method | Endpoint                              | Auth    | Description              |
| ------ | ------------------------------------- | ------- | ------------------------ |
| `GET`  | `/`                                   | —       | Health check             |
| `GET`  | `/api-docs`                           | —       | Swagger UI               |
|        |                                       |         |                          |
| `GET`  | `/categories/GetAllCategories`        | —       | List all categories      |
| `GET`  | `/categories/GetCategoryById/:id`     | —       | Get category by ID       |
| `POST` | `/categories/CreateCategory`          | Admin   | Create category          |
| `PUT`  | `/categories/UpdateCategory/:id`      | Admin   | Update category          |
| `DEL`  | `/categories/DeleteCategory/:id`      | Admin   | Delete category          |
|        |                                       |         |                          |
| `GET`  | `/workouts/GetAllWorkouts`            | —       | List all workouts        |
| `GET`  | `/workouts/GetWorkoutById/:id`        | —       | Get workout by ID        |
| `GET`  | `/workouts/GetWorkoutsByCategory/:id` | —       | Filter by category       |
| `POST` | `/workouts/CreateWorkout`             | Admin   | Create workout           |
| `PUT`  | `/workouts/UpdateWorkout/:id`         | Admin   | Update workout           |
| `DEL`  | `/workouts/DeleteWorkout/:id`         | Admin   | Delete workout           |
|        |                                       |         |                          |
| `POST` | `/admin/CreateAdmin`                  | —       | Register new admin       |
| `POST` | `/admin/AdminLogin`                   | —       | Login (JWT cookie)       |
| `GET`  | `/admin/CheckUserLogin`               | Admin   | Validate session         |
| `GET`  | `/admin/LogoutAdmin`                  | Admin   | Logout (clear cookie)    |

## Design Theme

Dark theme with near-black background (`#0d0d0b`) and vibrant lime green accent (`#b4fe00`). Category-specific colors:

| Category  | Accent   |
| --------- | -------- |
| Chest     | `#b4fe00` |
| Triceps   | `#fb923c` |
| Back      | `#60a5fa` |
| Biceps    | `#f87171` |
| Legs      | `#a78bfa` |
| Shoulders | `#22d3ee` |
| Abs       | `#fbbf24` |

## License

MIT
