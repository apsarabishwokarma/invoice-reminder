# Invoice Reminder App

A simple Express + TypeScript + Prisma starter for building an invoice reminder backend.

This project currently includes:

- Express server with a global `/api` router prefix
- Prisma ORM configured for PostgreSQL
- Core data models for users, clients, invoices, and reminders
- Basic sample routes for health checks and user creation/listing

## Tech Stack

- Node.js
- TypeScript
- Express 5
- Prisma 7
- PostgreSQL
- pnpm

## Project Structure

```
invoice-reminder/
├─ prisma/
│  └─ schema.prisma
├─ src/
│  ├─ index.ts
│  ├─ lib/
│  │  └─ prisma.ts
│  └─ generated/prisma/
├─ docs/
│  └─ DataModelRelationships.md
├─ prisma.config.ts
└─ package.json
```

## Prerequisites

- Node.js 20+
- pnpm
- A running PostgreSQL database

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DB_NAME"
```

`DATABASE_URL` is required. The app will throw an error at startup if it is missing.

## Installation

```bash
pnpm install
```

## Database Setup

Push the schema to your database:

```bash
pnpm db:push
```

Generate Prisma client after schema changes:

```bash
pnpm db:generate
```

## Run the App

Development mode (watch):

```bash
pnpm dev
```

Build:

```bash
pnpm build
```

Run built app:

```bash
pnpm start
```

Server runs on:

`http://localhost:3000`

## Current Routes

### Root Routes

- `GET /` → `Hello from Express + TypeScript`

### API Routes (prefixed with `/api`)

- `GET /api/hello` → sample JSON response
- `GET /api/html` → returns a small HTML page
- `GET /api/file` → serves `image.png` from project root
- `GET /api/create-user` → creates a sample user in DB
- `GET /api/users` → returns all users

## Data Model (Current)

### User

- `id` (UUID, primary key)
- `email` (unique)
- `name` (optional)
- `createdAt`
- has many `clients`

### Client

- `id` (UUID, primary key)
- `email` (unique)
- `name` (optional)
- `phone` (optional)
- `createdAt`
- `userId` (FK → User)
- has many `invoices`

### Invoice

- `id` (UUID, primary key)
- `amount`
- `status` (`PENDING | PAID | OVERDUE`)
- `dueDate`
- `issuedDate`
- `description` (optional)
- `paidAt`
- `clientId` (FK → Client)
- has many `reminders`

### Reminder

- `id` (UUID, primary key)
- `remindAt`
- `sent` (default `false`)
- `invoiceId` (FK → Invoice)

For full relation notes, see `docs/DataModelRelationships.md`.

## Available Scripts

- `pnpm dev` - start server in watch mode using `tsx`
- `pnpm build` - compile TypeScript into `dist/`
- `pnpm start` - run compiled app
- `pnpm db:push` - sync schema to database (creating structure)
- `pnpm db:generate` - generate Prisma client(type generate)

## Notes

- This is currently a starter backend and does not include auth yet.
- Current sample route `GET /api/create-user` uses static demo data.
- If you plan to use Prisma Migrate workflow, add migration scripts alongside the current `db:push` setup.
