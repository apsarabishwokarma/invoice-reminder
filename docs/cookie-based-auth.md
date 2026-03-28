# Cookie-Based Session Authentication (Express + Prisma)

## Overview

Session-based auth stores a **session ID in a cookie** and session data in the database.  
More secure than JWT for logout & session control.

---

## Prisma Models

```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  sessions  Session[]
}

model Session {
  id        String   @id @default(uuid())
  userId    String
  token     String   @unique
  expiresAt DateTime
  createdAt DateTime @default(now())

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)
}
```
