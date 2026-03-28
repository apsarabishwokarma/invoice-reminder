# API Routes Guide

This project currently exposes one endpoint per model: GET by id.

## Base setup

- Server: http://localhost:3000
- API prefix: /api

Health check:

- GET /
- Response: "Invoice Reminder API is running"

## Available GET routes

1. GET /api/users/:id
2. GET /api/sessions/:id
3. GET /api/clients/:id
4. GET /api/invoices/:id
5. GET /api/reminders/:id

---

## 1) Get User by id

Route:
GET /api/users/:id

Example:
curl http://localhost:3000/api/users/USER_ID

Success response (200):
{
"id": "uuid",
"email": "user@example.com",
"password": "hashed_password",
"name": "Apsara",
"createdAt": "2026-03-28T12:00:00.000Z",
"updatedAt": "2026-03-28T12:00:00.000Z",
"verifiedAt": null,
"avatar": null
}

Not found (404):
{
"message": "User not found"
}

---

## 2) Get Session by id

Route:
GET /api/sessions/:id

Example:
curl http://localhost:3000/api/sessions/SESSION_ID

Success response (200):
{
"id": "uuid",
"userId": "uuid",
"token": "session_token",
"expiresAt": "2026-03-30T12:00:00.000Z",
"createdAt": "2026-03-28T12:00:00.000Z"
}

Not found (404):
{
"message": "Session not found"
}

---

## 3) Get Client by id

Route:
GET /api/clients/:id

Example:
curl http://localhost:3000/api/clients/CLIENT_ID

Success response (200):
{
"id": "uuid",
"email": "client@example.com",
"name": "Client Name",
"phone": "+123456789",
"createdAt": "2026-03-28T12:00:00.000Z",
"updatedAt": "2026-03-28T12:00:00.000Z",
"userId": "uuid"
}

Not found (404):
{
"message": "Client not found"
}

---

## 4) Get Invoice by id

Route:
GET /api/invoices/:id

Example:
curl http://localhost:3000/api/invoices/INVOICE_ID

Success response (200):
{
"id": "uuid",
"amount": 1200,
"status": "PENDING",
"dueDate": "2026-04-10T00:00:00.000Z",
"issuedDate": "2026-03-28T12:00:00.000Z",
"description": "Website development",
"paidAt": "2026-03-28T12:00:00.000Z",
"clientId": "uuid",
"createdAt": "2026-03-28T12:00:00.000Z",
"updatedAt": "2026-03-28T12:00:00.000Z"
}

Not found (404):
{
"message": "Invoice not found"
}

---

## 5) Get Reminder by id

Route:
GET /api/reminders/:id

Example:
curl http://localhost:3000/api/reminders/REMINDER_ID

Success response (200):
{
"id": "uuid",
"remindAt": "2026-04-05T09:00:00.000Z",
"sent": false,
"invoiceId": "uuid",
"createdAt": "2026-03-28T12:00:00.000Z",
"updatedAt": "2026-03-28T12:00:00.000Z"
}

Not found (404):
{
"message": "Reminder not found"
}

---

## Common errors

Unknown route (404):
{
"message": "Route not found"
}

Server error (500):
{
"message": "Internal server error"
}

## Quick mental map

- /api/users/:id -> user table
- /api/sessions/:id -> session table
- /api/clients/:id -> client table
- /api/invoices/:id -> invoice table
- /api/reminders/:id -> reminder table
