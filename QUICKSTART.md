# 🚀 Быстрый старт - Make a Date

Краткое руководство по запуску проекта с MongoDB

## Шаг 1: Установка зависимостей

```bash
npm install
```

## Шаг 2: Создание .env файла

Создайте файл `.env` в корне проекта:

```env
MONGO_URI=mongodb://localhost:27017/makeadate
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
JWT_EXPIRATION=7d
```

## Шаг 3: Установка и запуск MongoDB

### Ubuntu/WSL2:
```bash
# Установка
sudo apt-get update
sudo apt-get install -y mongodb-org

# Запуск
sudo systemctl start mongod

# Проверка статуса
sudo systemctl status mongod
```

### macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

### Windows:
Скачайте и установите с https://www.mongodb.com/try/download/community

## Шаг 4: Проверка подключения к MongoDB

```bash
npm run test:mongodb
```

Вы должны увидеть:
```
✅ Успешное подключение к MongoDB!
📊 База данных: makeadate
```

## Шаг 5: Запуск Backend API

```bash
npm run start:api
```

API будет доступен на: http://localhost:3001/api

## Шаг 6: Создание администратора (опционально)

```bash
npm run create:admin
```

Данные для входа смотрите в `ADMIN_CREDENTIALS.md`

## Шаг 7: Запуск Frontend

В новом терминале:

```bash
npm run start:frontend
```

Frontend будет доступен на: http://localhost:4200

## ✅ Готово!

Теперь у вас работает:
- 🟢 MongoDB на порту 27017
- 🟢 Backend API на http://localhost:3001/api
- 🟢 Frontend на http://localhost:4200

## 🧪 Проверка API

```bash
# Получить список пользователей
curl http://localhost:3001/api/users

# Или откройте в браузере
http://localhost:3001/api/users
```

## 📚 Дополнительная документация

- [MONGODB_SETUP.md](MONGODB_SETUP.md) - Полное руководство по MongoDB
- [API_ENDPOINTS.md](API_ENDPOINTS.md) - Все доступные API endpoints
- [README.md](README.md) - Полная документация проекта

## 🐛 Проблемы?

### MongoDB не запускается
```bash
sudo systemctl restart mongod
sudo tail -f /var/log/mongodb/mongod.log
```

### API не подключается к MongoDB
1. Проверьте, что MongoDB запущен
2. Проверьте MONGO_URI в .env
3. Запустите `npm run test:mongodb`

### Порт уже занят
```bash
# Проверить порт 3001 (API)
sudo lsof -i :3001

# Проверить порт 27017 (MongoDB)
sudo lsof -i :27017
```

## 💡 Полезные команды

```bash
# Тестирование MongoDB
npm run test:mongodb

# Запуск API
npm run start:api

# Запуск Frontend
npm run start:frontend

# Создание админа
npm run create:admin

# Подключение к MongoDB shell
mongosh

# Просмотр данных
mongosh
> use makeadate
> db.users.find().pretty()
```

