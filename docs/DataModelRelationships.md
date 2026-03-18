# Data Model & Relationships

## Overview

This document describes the core database models and relationships for an Invoice Reminder Application using:

- Node.js + Express
- Prisma ORM
- PostgreSQL

---

# Core Models

## 1. User

Represents the application user (owner of clients and invoices).

### Fields:

- id (Primary Key)
- email (Unique)
- name (Optional)
- createdAt

### Relationships:

- One User has many Clients

---

## 2. Client

Represents a customer belonging to a user.

### Fields:

- id
- name
- email (Optional)
- phone (Optional)
- createdAt
- userId (Foreign Key)

### Relationships:

- Many Clients belong to one User
- One Client has many Invoices

---

## 3. Invoice

Represents a bill issued to a client.

### Fields:

- id
- amount
- status (PENDING, PAID, OVERDUE)
- paidAt
- dueDate
- issuedDate
- description (Optional)
- clientId (Foreign Key)

### Relationships:

- Many Invoices belong to one Client
- One Invoice has many Reminders
- One Invoice has many Payments

---

## 4. Reminder

Handles scheduled notifications for invoices.

### Fields:

- id
- remindAt (DateTime)
- sent (Boolean)
- type (EMAIL, SMS)
- invoiceId (Foreign Key)

### Relationships:

- Many Reminders belong to one Invoice

---

# 🔗 Relationship Diagram

User (1)
└── Client (many)
└── Invoice (many)
├── Reminder (many)

---

# Key Relationship Rules

## One-to-Many Relationships

| Parent  | Child    | Description                             |
| ------- | -------- | --------------------------------------- |
| User    | Client   | One user can have multiple clients      |
| Client  | Invoice  | One client can have multiple invoices   |
| Invoice | Reminder | One invoice can have multiple reminders |
| Invoice | Payment  | One invoice can have multiple payments  |

---

## Foreign Keys

| Model    | Field     | References |
| -------- | --------- | ---------- |
| Client   | userId    | User.id    |
| Invoice  | clientId  | Client.id  |
| Reminder | invoiceId | Invoice.id |
| Payment  | invoiceId | Invoice.id |

---

# Enums (Recommended)

## InvoiceStatus

- PENDING
- PAID
- OVERDUE

## ReminderType

- EMAIL
- SMS

---

# 🧠 Design Principles

- Normalize data (avoid duplication)
- Use foreign keys for relationships
- Keep models simple and focused
- Prefer enums over raw strings
- Always track timestamps

---

# 🚀 MVP Scope (Start Here)

Start with:

- User
- Client
- Invoice
- Reminder

Add Payment later.

---

# ⚠️ Common Mistakes

- Missing foreign keys (userId, clientId)
- Incorrect or missing relations
- Using plain strings instead of enums
- Overcomplicating schema early
- Skipping Reminder model (core feature)

---

# 🔍 Example Flow

1. User signs up
2. User creates Clients
3. User creates Invoices
4. System schedules Reminders
5. Notifications are sent
6. Payments update Invoice status

---

# 🧠 Mental Model

User owns Clients  
Client owns Invoices  
Invoice triggers Reminders  
Invoice receives Payments

# 📄 Invoice Reminder App — Data Model & Relationships

## 🧠 Overview

This document describes the core database models and relationships for an Invoice Reminder Application using:

- Node.js + Express
- Prisma ORM
- PostgreSQL

---

# 🧱 Core Models

## 1. User

Represents the application user (owner of clients and invoices).

### Fields:

- id (Primary Key)
- email (Unique)
- name (Optional)
- createdAt

### Relationships:

- One User has many Clients

---

## 2. Client

Represents a customer belonging to a user.

### Fields:

- id
- name
- email (Optional)
- phone (Optional)
- createdAt
- userId (Foreign Key)

### Relationships:

- Many Clients belong to one User
- One Client has many Invoices

---

## 3. Invoice

Represents a bill issued to a client.

### Fields:

- id
- amount
- status (PENDING, PAID, OVERDUE)
- dueDate
- issuedDate
- description (Optional)
- clientId (Foreign Key)

### Relationships:

- Many Invoices belong to one Client
- One Invoice has many Reminders
- One Invoice has many Payments

---

## 4. Reminder

Handles scheduled notifications for invoices.

### Fields:

- id
- remindAt (DateTime)
- sent (Boolean)
- invoiceId (Foreign Key)

### Relationships:

- Many Reminders belong to one Invoice

---

## 5. Payment (Optional)

Tracks payments made against invoices.

### Fields:

- id
- amount
- paidAt
- invoiceId (Foreign Key)

### Relationships:

- Many Payments belong to one Invoice

---

# Relationship Diagram

User (1)
└── Client (many)
└── Invoice (many)
├── Reminder (many)

---

# Key Relationship Rules

## One-to-Many Relationships

| Parent  | Child    | Description                             |
| ------- | -------- | --------------------------------------- |
| User    | Client   | One user can have multiple clients      |
| Client  | Invoice  | One client can have multiple invoices   |
| Invoice | Reminder | One invoice can have multiple reminders |

---

## Foreign Keys

| Model    | Field     | References |
| -------- | --------- | ---------- |
| Client   | userId    | User.id    |
| Invoice  | clientId  | Client.id  |
| Reminder | invoiceId | Invoice.id |

---

# Enums (Recommended)

## InvoiceStatus

- PENDING
- PAID
- OVERDUE

---

# Design Principles

- Normalize data (avoid duplication)
- Use foreign keys for relationships
- Keep models simple and focused
- Prefer enums over raw strings
- Always track timestamps

---

# MVP Scope (Start Here)

Start with:

- User
- Client
- Invoice
- Reminder

---

# Example Flow

1. User signs up
2. User creates Clients
3. User creates Invoices
4. System schedules Reminders
5. Notifications are sent
6. Payments update Invoice status

---

# Mental Model

User owns Clients  
Client owns Invoices  
Invoice triggers Reminders  
Invoice receives Payments
