# Scalable REST API Assignment

## Features
- Register/Login with **hashed passwords** and **JWT**
- **Role-based access** (user/admin)
- **CRUD** for Tasks (user can CRUD own tasks; admin can see all)
- **Validation** with Zod
- **Centralized errors**, rate limit, security headers
- **API versioning**: `/api/v1`
- **Swagger** docs at `/api-docs`

## Setup
```bash
cd backend
cp .env.example .env
# set MONGO_URI and JWT_SECRET
npm install
npm run dev
