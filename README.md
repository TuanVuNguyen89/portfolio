# Fullstack Portfolio with Cloudflare & Hono

A premium fullstack portfolio website built with modern web technologies, hosted entirely on the Cloudflare ecosystem.

## 🚀 Technologies

### Backend
- **[Hono](https://hono.dev/)**: Fast, lightweight web framework for Cloudflare Workers.
- **[Cloudflare Workers](https://workers.cloudflare.com/)**: Serverless execution environment.
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)**: Serverless SQLite database.
- **[Drizzle ORM](https://orm.drizzle.team/)**: TypeScript ORM for interacting with D1.
- **[Better-Auth](https://better-auth.com/)**: Authentication library (configured for Admin access).

### Frontend
- **[React](https://react.dev/)** (via [Vite](https://vitejs.dev/)): UI library.
- **Vanilla CSS**: Custom premium dark-themed styling.
- **Cloudflare Pages**: Frontend hosting.

## 🛠️ Prerequisites

- **Node.js** (v18 or later)
- **npm** or **pnpm**
- **Wrangler** CLI (`npm install -g wrangler`) - Authenticated with `wrangler login`

## 📦 Setup & Installation

### 1. Clone the repository
```bash
git clone <repository-url>
cd portfolio-fullstack
```

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
```

#### Database Setup (Cloudflare D1)
1. **Create the database**:
   ```bash
   npx wrangler d1 create portfolio-db
   ```
   *Copy the `database_id` from the output and update `wrangler.toml` if it's different.*

2. **Generate & Apply Migrations**:
   ```bash
   # Generate SQL migrations from schema
   npm run db:generate

   # Apply migrations to local D1 (dev)
   npm run db:migrate:local

   # Apply migrations to remote D1 (prod) - Optional for now
   npm run db:migrate:prod
   ```

3. **Seed Database**:
   Populate the database with initial resume data (profile, projects, experience).
   ```bash
   # Local
   npx wrangler d1 execute portfolio-db --file seed.sql --local
   
   # Remote (Production)
   npx wrangler d1 execute portfolio-db --file seed.sql --remote
   ```

### 3. Frontend Setup
Navigate to the frontend directory and install dependencies:
```bash
cd ../frontend
npm install
```

## 🏃‍♂️ Running Locally

### Start Backend
Run the Hono API locally using Wrangler:
```bash
cd backend
npm run dev
# Server will start at http://localhost:8787
```

### Start Frontend
Run the Vite development server:
```bash
cd frontend
npm run dev
# App will open at http://localhost:5173
```

*Note: The frontend is configured to proxy API requests to `http://localhost:8787` or use the `VITE_API_URL` environment variable.*

## 🔒 Authentication (Admin)
The project includes **Better-Auth** for admin features (content editing).
- **Admin Login Route**: `/api/auth/*` (Backend)
- **Admin Dashboard**: Plan to be implemented at `/admin` (Frontend).

## 🚢 Deployment

1. **Backend**:
   ```bash
   cd backend
   npm run deploy
   ```

2. **Frontend**:
   Connect your GitHub repository to **Cloudflare Pages**.
   - Build Command: `npm run build`
   - Output Directory: `dist`
