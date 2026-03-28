# Auth Changes and Flow

This document explains the auth implementation currently present in the project.

## Auth endpoints

Base path: /api/auth

### 1) Register

- Method: POST
- Route: /api/auth/register
- Body:

{
"name": "Apsara",
"email": "user@example.com",
"password": "plain_password"
}

Behavior:

- checks if email already exists
- hashes password using bcrypt (salt rounds: 10)
- creates user in database
- returns created user without password

Possible responses:

- 201 Account created successfully
- 400 Account with this email address already exists.
- 500 Server error

### 2) Login

- Method: POST
- Route: /api/auth/login
- Body:

{
"email": "user@example.com",
"password": "plain_password"
}

Behavior:

- finds user by email
- compares password with bcrypt.compare
- generates a random session token using crypto.randomBytes(32)
- creates Session row with 7-day expiry
- sets cookie named session

Cookie settings now:

- httpOnly: true
- secure: false (comment indicates true in production)
- sameSite: strict
- maxAge: 7 days

Possible responses:

- 200 Logged in successfully
- 404 Account doesn't exist
- 401 Email or password is wrong
- 500 Server error

### 3) Me

- Method: GET
- Route: /api/auth/me
- Middleware: auth

Behavior:

- reads req.userId set by middleware
- fetches current user from DB
- returns user object without password via excludePassword

### 4) Update profile

- Method: PUT
- Route: /api/auth/update
- Middleware: auth
- Body:

{
"name": "Updated Name"
}

Behavior:

- reads req.userId from middleware
- updates authenticated user name
- returns updated user without password

## Auth middleware flow

From src/middleware/auth.ts:

1. Read token from req.cookies.session
2. If no token, return 401 Unauthorized
3. Find session by token
4. If not found or expired, return 401 Session expired
5. Set req.userId = session.userId
6. Call next()

## Protected route groups

In src/routes/index.ts, these groups require auth middleware:

- /api/clients/\*
- /api/invoices/\*
- /api/reminders/\*

Public route groups currently:

- /api/auth/\*
- /api/users/\*
- /api/test/\*

## Quick testing sequence

1. Register user via POST /api/auth/register
2. Login via POST /api/auth/login
3. Browser/client stores session cookie
4. Call GET /api/auth/me
5. Call protected APIs like GET /api/clients/:id with same cookie session

## Current implementation notes

- Session cleanup on logout is not implemented yet.
- Refresh/rotation of session token is not implemented yet.
- Input validation schema (zod/joi) is not added yet.
- Rate limiting and brute-force protection are not added yet.
- secure cookie should be true in production with HTTPS.
