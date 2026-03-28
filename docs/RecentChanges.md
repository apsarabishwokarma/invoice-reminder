# Recent Backend Changes

This file summarizes the latest backend structure and route-level changes.

## 1. Routing moved to modular files

You now have route modules under src/routes:

- auth.routes.ts
- users.routes.ts
- clients.routes.ts
- invoices.routes.ts
- reminders.routes.ts
- test.routers.ts
- index.ts (main route aggregator)

## 2. Central API router setup

The API entry router in src/routes/index.ts now mounts:

- /api/users
- /api/auth
- /api/clients (protected)
- /api/invoices (protected)
- /api/reminders (protected)
- /api/test

## 3. Auth middleware introduced

The middleware src/middleware/auth.ts now:

- reads the session token from req.cookies.session
- validates token against Session table
- checks expiry date
- attaches req.userId for authenticated requests

Unauthorized responses:

- 401 Unauthorized (missing token)
- 401 Session expired (invalid or expired token)

## 4. Cookie parsing enabled globally

In src/index.ts:

- cookie-parser middleware is enabled
- this is required for auth middleware to read session cookies

## 5. Model GET-by-id routes are in place

Current model read routes:

- GET /api/users/:id
- GET /api/clients/:id (auth required)
- GET /api/invoices/:id (auth required)
- GET /api/reminders/:id (auth required)

Notes:

- Session route file is no longer mounted in src/routes/index.ts.
- /api/users/:id currently returns full user object from DB (including password hash) unless sanitized in route.

## 6. Utility for safe user response

A helper was added in src/lib/utils/cleanup.ts:

- excludePassword(user)

This removes password before sending user data in responses.

## 7. Auth route capabilities added

In src/routes/auth.routes.ts:

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me (auth required)
- PUT /api/auth/update (auth required)

See docs/AuthChanges.md for full details.

## 8. App-level route behavior

In src/index.ts:

- GET / health route
- global 404 handler -> { "message": "Route not found" }
- global error handler -> { "message": "Internal server error" }
