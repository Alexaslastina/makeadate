# 📝 Шпаргалка - Make a Date MongoDB

Быстрый справочник по командам и настройкам проекта.

---

## 🚀 Запуск проекта

```bash
# Запустить MongoDB
sudo systemctl start mongod

# Запустить Backend API (порт 3001)
npm run start:api

# Запустить Frontend (порт 4200, в новом терминале)
npm run start:frontend
```

---

## 🔧 npm команды

```bash
npm run start:api          # Запустить Backend API
npm run start:frontend     # Запустить Frontend
npm run test:mongodb       # Проверить подключение к MongoDB
npm run create:admin       # Создать администратора
```

---

## 🗄️ MongoDB команды

```bash
# Управление MongoDB
sudo systemctl start mongod      # Запустить
sudo systemctl stop mongod       # Остановить
sudo systemctl status mongod     # Проверить статус
sudo systemctl restart mongod    # Перезапустить

# MongoDB Shell
mongosh                          # Подключиться к MongoDB
```

### В MongoDB Shell:

```javascript
// Выбрать базу данных
use makeadate

// Показать коллекции
show collections

// Показать всех пользователей
db.users.find().pretty()

// Подсчитать пользователей
db.users.countDocuments()

// Найти пользователя по email
db.users.findOne({ email: "user@example.com" })

// Удалить всех пользователей (осторожно!)
db.users.deleteMany({})

// Создать индекс
db.users.createIndex({ email: 1 }, { unique: true })

// Показать индексы
db.users.getIndexes()
```

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:3001/api`

### Auth:
```bash
# Регистрация
POST /api/auth/register
Body: { "email": "user@example.com", "password": "password123" }

# Вход
POST /api/auth/login
Body: { "email": "user@example.com", "password": "password123" }

# Сброс пароля (запрос)
POST /api/auth/forgot-password
Body: { "email": "user@example.com" }

# Сброс пароля (с токеном)
POST /api/auth/reset-password
Body: { "token": "reset-token", "newPassword": "newpass123" }
```

### Users:
```bash
# Получить всех пользователей
GET /api/users

# Создать пользователя
POST /api/users
Body: { "email": "user@example.com", "password": "password123" }

# Получить по email
GET /api/users/:email

# Обновить роль
PATCH /api/users/:id/role
Body: { "role": "admin" }

# Удалить пользователя
DELETE /api/users/:id
```

---

## 🧪 Тестирование с curl

```bash
# Получить список пользователей
curl http://localhost:3001/api/users

# Регистрация
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# Вход
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'

# С JWT токеном
curl http://localhost:3001/api/users \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## 📁 Важные файлы

```bash
# Конфигурация
.env                                      # Переменные окружения (создать из .env.template)
.env.template                             # Шаблон конфигурации

# Backend
apps/api/src/main.ts                      # Точка входа API
apps/api/src/app/app.module.ts            # Главный модуль (MongoDB подключение)
apps/api/src/app/users/users.service.ts   # Users бизнес-логика
apps/api/src/app/auth/auth.service.ts     # Auth бизнес-логика

# Схемы MongoDB
apps/api/src/app/users/schemas/user.schema.ts
apps/api/src/app/auth/schemas/password-reset-token.schema.ts

# Документация
START_HERE.md                             # Начать отсюда!
QUICKSTART.md                             # Быстрый старт
SETUP_CHECKLIST.md                        # Контрольный список
MONGODB_SETUP.md                          # Руководство по MongoDB
ARCHITECTURE.md                           # Архитектура системы
API_ENDPOINTS.md                          # API документация
```

---

## 🔒 .env переменные

```bash
# MongoDB
MONGO_URI=mongodb://localhost:27017/makeadate

# API
PORT=3001

# JWT
JWT_SECRET=your-very-long-random-secret-key-here
JWT_EXPIRATION=7d
```

### Генерация JWT_SECRET:

```bash
# Node.js
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# OpenSSL
openssl rand -hex 64
```

---

## 🐛 Решение проблем

```bash
# MongoDB не запускается
sudo rm /tmp/mongodb-27017.sock
sudo systemctl restart mongod
sudo tail -f /var/log/mongodb/mongod.log

# Проверить порты
sudo lsof -i :3001    # API порт
sudo lsof -i :4200    # Frontend порт
sudo lsof -i :27017   # MongoDB порт

# Убить процесс на порту
sudo kill -9 $(sudo lsof -t -i:3001)

# Переустановка зависимостей
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# Проверка подключения
npm run test:mongodb
```

---

## 📦 MongoDB схемы

### User:
```typescript
{
  email: string;        // unique, lowercase, trimmed
  passwordHash: string; // bcrypt, 10 rounds
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
}
```

### Password Reset Token:
```typescript
{
  userId: ObjectId;
  token: string;
  expiresAt: Date;
}
```

---

## 🔑 Частые команды

```bash
# Быстрый старт
sudo systemctl start mongod && npm run start:api

# Проверка статуса всего
sudo systemctl status mongod
curl http://localhost:3001/api/users

# Очистка и перезапуск
npm run test:mongodb
sudo systemctl restart mongod
npm run start:api

# Создать админа и запустить
npm run create:admin
npm run start:api
```

---

## 🌐 URLs

```
Frontend:        http://localhost:4200
Backend API:     http://localhost:3001/api
Users API:       http://localhost:3001/api/users
MongoDB:         mongodb://localhost:27017
MongoDB Shell:   mongosh
```

---

## 📚 Документация

```
START_HERE.md              → 🎯 Начать здесь
QUICKSTART.md              → ⚡ Быстрый старт
SETUP_CHECKLIST.md         → ✅ Контрольный список
MONGODB_SETUP.md           → 🗄️ MongoDB руководство
ARCHITECTURE.md            → 📐 Архитектура
API_ENDPOINTS.md           → 🌐 API endpoints
INTEGRATION_SUMMARY.md     → 📊 Полная сводка
CHEATSHEET.md              → 📝 Эта шпаргалка
```

---

## 🎯 Горячие клавиши (в MongoDB Shell)

```
Ctrl + C    Выход из mongosh
Ctrl + L    Очистить экран
↑ / ↓       История команд
Tab         Автодополнение
```

---

## ⚡ Pro Tips

```bash
# Запустить всё в фоне
sudo systemctl start mongod
npm run start:api &
npm run start:frontend &

# Логи в реальном времени
tail -f /var/log/mongodb/mongod.log

# Backup базы данных
mongodump --db makeadate --out ./backup

# Restore базы данных
mongorestore --db makeadate ./backup/makeadate

# Проверка производительности
db.users.explain("executionStats").find()
```

---

**Сохраните эту шпаргалку для быстрого доступа!** 📌

