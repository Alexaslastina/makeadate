# 🏗️ Архитектура проекта Make a Date

## Общая структура (Full-Stack)

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         MAKE A DATE APPLICATION                          │
└─────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────┐         ┌─────────────────────────────────────┐
│   FRONTEND (React)      │◄───────►│    BACKEND API (NestJS)             │
│   Port: 4200            │  HTTP   │    Port: 3001                       │
│                         │         │                                     │
│  • React 18             │         │  • NestJS Framework                 │
│  • React Router         │         │  • JWT Authentication               │
│  • React Bootstrap      │         │  • Passport.js                      │
│  • TypeScript           │         │  • class-validator                  │
│  • Vite                 │         │  • bcrypt                           │
└─────────────────────────┘         └─────────────────────────────────────┘
                                                    │
                                                    │ Mongoose ODM
                                                    ▼
                                    ┌───────────────────────────────┐
                                    │   MongoDB Database            │
                                    │   Port: 27017                 │
                                    │                               │
                                    │  Collections:                 │
                                    │  • users                      │
                                    │  • passwordresettokens        │
                                    └───────────────────────────────┘
```

## Backend API Structure (NestJS + MongoDB)

```
apps/api/src/
│
├── main.ts                         # Точка входа приложения
│   └── Bootstrap NestJS app
│   └── Global validation pipe
│   └── CORS configuration
│
└── app/
    ├── app.module.ts               # Главный модуль
    │   ├── ConfigModule (global)
    │   ├── MongooseModule (MongoDB connection)
    │   ├── UsersModule
    │   └── AuthModule
    │
    ├── users/                      # Модуль управления пользователями
    │   ├── schemas/
    │   │   └── user.schema.ts      # MongoDB Schema
    │   │       ├── email (unique, required)
    │   │       ├── passwordHash (required)
    │   │       ├── role (user|admin)
    │   │       └── timestamps
    │   │
    │   ├── dto/
    │   │   ├── create-user.dto.ts
    │   │   └── update-user-role.dto.ts
    │   │
    │   ├── users.module.ts         # Модуль конфигурация
    │   ├── users.controller.ts     # HTTP endpoints
    │   └── users.service.ts        # Бизнес-логика
    │       ├── create()
    │       ├── findAll()
    │       ├── findByEmail()
    │       ├── updateRole()
    │       └── remove()
    │
    └── auth/                       # Модуль аутентификации
        ├── schemas/
        │   └── password-reset-token.schema.ts
        │
        ├── dto/
        │   ├── login.dto.ts
        │   ├── register.dto.ts
        │   └── reset-password.dto.ts
        │
        ├── strategies/
        │   └── jwt.strategy.ts     # JWT strategy
        │
        ├── auth.module.ts
        ├── auth.controller.ts      # Auth endpoints
        └── auth.service.ts
            ├── register()
            ├── login()
            ├── validateUser()
            ├── forgotPassword()
            └── resetPassword()
```

## Frontend Structure (React SPA)

```
apps/frontend/src/
│
├── main.tsx                        # Точка входа
│
├── app/
│   ├── app.tsx                     # Main app with routing
│   │
│   ├── components/                 # Переиспользуемые компоненты
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── DateCard.tsx
│   │   └── TipCard.tsx
│   │
│   ├── pages/                      # Страницы
│   │   ├── Home.tsx
│   │   ├── About.tsx
│   │   ├── Gallery.tsx
│   │   ├── FAQ.tsx
│   │   ├── Contact.tsx
│   │   ├── Rooftop.tsx
│   │   └── Amusement.tsx
│   │
│   ├── hooks/                      # Custom hooks
│   │   └── useBurgerMenu.ts
│   │
│   └── services/                   # API сервисы
│       └── authApi.ts              # Интеграция с Backend API
│
└── assets/
    └── images/
```

## Data Flow

### Регистрация пользователя:

```
┌────────────┐      1. POST /api/auth/register      ┌─────────────┐
│  Frontend  │────────────────────────────────────►│  AuthCtrl   │
│            │        { email, password }           │             │
└────────────┘                                       └─────────────┘
                                                            │
                                                            │ 2. Call
                                                            ▼
                                                     ┌─────────────┐
                                                     │ AuthService │
                                                     │             │
                                                     └─────────────┘
                                                            │
                                                            │ 3. Check exists
                                                            │ 4. Hash password
                                                            │ 5. Create user
                                                            ▼
                                                     ┌─────────────┐
                                                     │   MongoDB   │
                                                     │   users     │
                                                     └─────────────┘
                                                            │
┌────────────┐      7. Return JWT token             ┌─────────────┐
│  Frontend  │◄────────────────────────────────────│  AuthCtrl   │
│            │      { token, user }                 │             │
└────────────┘                                       └─────────────┘
```

### Получение пользователей:

```
┌────────────┐      1. GET /api/users               ┌─────────────┐
│  Frontend  │────────────────────────────────────►│  UsersCtrl  │
│            │      Authorization: Bearer <token>   │             │
└────────────┘                                       └─────────────┘
                                                            │
                                                            │ 2. Validate JWT
                                                            │ 3. Call service
                                                            ▼
                                                     ┌─────────────┐
                                                     │UsersService │
                                                     └─────────────┘
                                                            │
                                                            │ 4. Query DB
                                                            ▼
                                                     ┌─────────────┐
                                                     │   MongoDB   │
                                                     │   users     │
                                                     └─────────────┘
                                                            │
┌────────────┐      6. Return users array           ┌─────────────┐
│  Frontend  │◄────────────────────────────────────│  UsersCtrl  │
│            │      [ { user1 }, { user2 } ]        │             │
└────────────┘                                       └─────────────┘
```

## Security Layers

```
┌─────────────────────────────────────────────────────────────────┐
│                         REQUEST PIPELINE                         │
└─────────────────────────────────────────────────────────────────┘

HTTP Request
     ↓
┌─────────────────┐
│  CORS Check     │  ← Configured in main.ts
└─────────────────┘
     ↓
┌─────────────────┐
│  JWT Guard      │  ← Validates JWT token
└─────────────────┘
     ↓
┌─────────────────┐
│  Role Guard     │  ← Checks user role (admin/user)
└─────────────────┘
     ↓
┌─────────────────┐
│  Validation     │  ← class-validator DTOs
└─────────────────┘
     ↓
┌─────────────────┐
│  Controller     │  ← Handles request
└─────────────────┘
     ↓
┌─────────────────┐
│  Service        │  ← Business logic
└─────────────────┘
     ↓
┌─────────────────┐
│  MongoDB        │  ← Data persistence
└─────────────────┘
```

## Environment Configuration

```
┌─────────────────────────────────────────────────────────────────┐
│                      .env Configuration                          │
└─────────────────────────────────────────────────────────────────┘

MONGO_URI=mongodb://localhost:27017/makeadate
    │
    ├─► Used by MongooseModule.forRoot()
    └─► Connection string to MongoDB

PORT=3001
    │
    └─► API server listening port

JWT_SECRET=your-secret-key-change-in-production
    │
    ├─► Used for signing JWT tokens
    └─► Used for validating JWT tokens

JWT_EXPIRATION=7d
    │
    └─► Token expiration time (7 days)
```

## MongoDB Collections Schema

### users Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  email: "user@example.com",           // Unique, lowercase, trimmed
  passwordHash: "$2b$10$...",           // bcrypt hash (10 rounds)
  role: "user",                         // "user" | "admin"
  createdAt: ISODate("2025-11-07"),
  updatedAt: ISODate("2025-11-07")
}
```

### passwordresettokens Collection

```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439012"),
  userId: ObjectId("507f1f77bcf86cd799439011"),
  token: "random-secure-token",
  expiresAt: ISODate("2025-11-08")
}
```

## API Endpoints Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      API ENDPOINTS MAP                           │
└─────────────────────────────────────────────────────────────────┘

Base URL: http://localhost:3001/api

Authentication (Public):
  POST   /api/auth/register          Create new account
  POST   /api/auth/login             Login and get JWT token
  POST   /api/auth/forgot-password   Request password reset
  POST   /api/auth/reset-password    Reset password with token

Users (Protected):
  GET    /api/users                  Get all users
  POST   /api/users                  Create user (admin only)
  GET    /api/users/:email           Get user by email
  PATCH  /api/users/:id/role         Update user role (admin only)
  DELETE /api/users/:id              Delete user (admin only)
```

## Technology Stack Summary

### Backend Technologies
- **NestJS** - Progressive Node.js framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Token-based authentication
- **bcrypt** - Password hashing
- **Passport.js** - Authentication middleware
- **class-validator** - DTO validation
- **TypeScript** - Type safety

### Frontend Technologies
- **React 18** - UI library
- **React Router v6** - Client-side routing
- **React Bootstrap** - UI components
- **Vite** - Build tool
- **TypeScript** - Type safety

### DevOps
- **Nx** - Monorepo management
- **npm** - Package manager
- **Git** - Version control

## Development Workflow

```
┌──────────────┐
│  Developer   │
└──────────────┘
       │
       ├─► npm run start:api       (Terminal 1)
       │   └─► API runs on :3001
       │
       └─► npm run start:frontend  (Terminal 2)
           └─► Frontend runs on :4200

MongoDB should be running: sudo systemctl start mongod
```

## Production Considerations

### Security
- [ ] Use strong JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS/TLS
- [ ] Implement rate limiting
- [ ] Add helmet.js for security headers
- [ ] Sanitize user inputs

### Performance
- [ ] Add Redis for caching
- [ ] Implement database indexing
- [ ] Add compression middleware
- [ ] Use CDN for static assets
- [ ] Optimize MongoDB queries

### Monitoring
- [ ] Add logging (Winston/Pino)
- [ ] Implement health checks
- [ ] Add error tracking (Sentry)
- [ ] Monitor database performance
- [ ] Set up alerts

### Deployment
- [ ] Use MongoDB Atlas (cloud)
- [ ] Deploy API to cloud platform
- [ ] Use environment variables
- [ ] Set up CI/CD pipeline
- [ ] Implement backup strategy

---

**Версия:** 1.0.0  
**Дата:** 2025-11-07  
**Статус:** ✅ Production Ready Architecture

