# API Endpoints для MongoDB

## Текущие API Endpoints

### Базовый URL
```
http://localhost:3001/api
```

### 1. Users API (`/api/users`)
**Контроллер:** `apps/api/src/app/users/users.controller.ts`  
**Сервис:** `apps/api/src/app/users/users.service.ts`  
**Схема:** `apps/api/src/app/users/schemas/user.schema.ts`

#### Endpoints:
- `GET /api/users` - Получить всех пользователей
- `POST /api/users` - Создать нового пользователя
- `GET /api/users/:email` - Получить пользователя по email
- `PATCH /api/users/:id/role` - Обновить роль пользователя
- `DELETE /api/users/:id` - Удалить пользователя

### 2. Auth API (`/api/auth`)
**Контроллер:** `apps/api/src/app/auth/auth.controller.ts`  
**Сервис:** `apps/api/src/app/auth/auth.service.ts`

#### Endpoints:
- `POST /api/auth/register` - Регистрация нового пользователя
- `POST /api/auth/login` - Вход в систему
- `POST /api/auth/forgot-password` - Запрос на сброс пароля
- `POST /api/auth/reset-password` - Сброс пароля с токеном

## Структура файлов

```
apps/api/src/app/
├── app.module.ts          # Главный модуль приложения
├── main.ts                # Точка входа (порт 3001)
│
├── users/                 # Модуль пользователей
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── schemas/
│   │   └── user.schema.ts  # MongoDB схема для пользователей
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user-role.dto.ts
│
└── auth/                  # Модуль аутентификации
    ├── auth.module.ts
    ├── auth.controller.ts
    ├── auth.service.ts
    └── schemas/
        └── password-reset-token.schema.ts
```

## MongoDB Коллекции

### Текущие коллекции:
1. **users** - Пользователи системы
   - `email` (unique, required)
   - `passwordHash` (required)
   - `role` (default: 'user', может быть 'admin')
   - `createdAt`, `updatedAt` (автоматически)

2. **passwordresettokens** - Токены для сброса пароля
   - `userId`
   - `token`
   - `expiresAt`

## Подключение к MongoDB

Настройка подключения находится в:
- `apps/api/src/app/app.module.ts` (строка 10)
- Использует переменную окружения `MONGO_URI` или `mongodb://localhost:27017/makeadate`

## Возможные дополнительные API (для будущего развития)

Для полноценного сайта о свиданиях могут понадобиться:

1. **Dates API** (`/api/dates`)
   - GET /api/dates - Список всех свиданий
   - GET /api/dates/:id - Детали свидания
   - POST /api/dates - Создать новое свидание (admin)
   - PATCH /api/dates/:id - Обновить свидание (admin)
   - DELETE /api/dates/:id - Удалить свидание (admin)

2. **Reviews API** (`/api/reviews`)
   - GET /api/reviews - Список отзывов
   - GET /api/reviews/:dateId - Отзывы для конкретного свидания
   - POST /api/reviews - Создать отзыв (требует авторизации)
   - DELETE /api/reviews/:id - Удалить отзыв

3. **Favorites API** (`/api/favorites`)
   - GET /api/favorites - Избранные свидания пользователя
   - POST /api/favorites - Добавить в избранное
   - DELETE /api/favorites/:id - Удалить из избранного

## Как проверить API

1. Убедитесь, что API сервер запущен:
   ```bash
   npm run start:api
   ```

2. Проверьте доступность:
   ```bash
   curl http://localhost:3001/api/users
   ```

3. Или используйте Postman/Browser:
   - Откройте: `http://localhost:3001/api/users`

## Примечания

- Все API используют префикс `/api`
- CORS включен для всех источников
- Валидация данных выполняется через `class-validator`
- Пароли хешируются с помощью `bcrypt` (10 раундов)


