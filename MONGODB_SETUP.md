# MongoDB Setup для Make a Date

## 🚀 Быстрый старт

### 1. Установка MongoDB

#### Для Ubuntu/WSL2:
```bash
# Импорт публичного ключа MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Добавление репозитория MongoDB
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu jammy/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Обновление пакетов
sudo apt-get update

# Установка MongoDB
sudo apt-get install -y mongodb-org
```

#### Для macOS:
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
```

#### Для Windows:
Скачайте и установите MongoDB Community Server с официального сайта:
https://www.mongodb.com/try/download/community

### 2. Запуск MongoDB

#### Ubuntu/WSL2:
```bash
# Запуск MongoDB
sudo systemctl start mongod

# Проверка статуса
sudo systemctl status mongod

# Автозапуск при старте системы (опционально)
sudo systemctl enable mongod
```

#### macOS:
```bash
brew services start mongodb-community@6.0
```

#### Windows:
MongoDB запустится автоматически как служба после установки.

### 3. Создание файла .env

Создайте файл `.env` в корне проекта со следующим содержимым:

```env
# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/makeadate

# API Configuration
PORT=3001

# JWT Configuration (для аутентификации)
JWT_SECRET=your-secret-key-change-this-in-production
JWT_EXPIRATION=7d
```

**⚠️ ВАЖНО:** Для production замените `JWT_SECRET` на надежный ключ!

### 4. Запуск API сервера

```bash
# Из корня проекта
npm run start:api
```

Сервер запустится на `http://localhost:3001/api`

## 🧪 Проверка подключения

### 1. Проверьте MongoDB:
```bash
# Подключитесь к MongoDB shell
mongosh

# Проверьте базу данных
show dbs
use makeadate
show collections
```

### 2. Проверьте API:
```bash
# Получить список пользователей
curl http://localhost:3001/api/users

# Или откройте в браузере
http://localhost:3001/api/users
```

## 📊 Структура базы данных

### Коллекции:

1. **users** - Пользователи системы
   ```javascript
   {
     _id: ObjectId,
     email: String (unique),
     passwordHash: String,
     role: String ('user' | 'admin'),
     createdAt: Date,
     updatedAt: Date
   }
   ```

2. **passwordresettokens** - Токены для сброса пароля
   ```javascript
   {
     _id: ObjectId,
     userId: ObjectId,
     token: String,
     expiresAt: Date
   }
   ```

## 🔧 Полезные команды MongoDB

```bash
# Подключение к MongoDB
mongosh

# Выбор базы данных
use makeadate

# Просмотр всех пользователей
db.users.find().pretty()

# Подсчет пользователей
db.users.countDocuments()

# Удаление всех данных (осторожно!)
db.users.deleteMany({})

# Создание админа вручную (если нужно)
db.users.insertOne({
  email: "admin@makeadate.com",
  passwordHash: "$2b$10$...", // используйте bcrypt для хеширования
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

## 🛠️ Создание первого админа

В проекте есть скрипт для создания администратора:

```bash
# Убедитесь, что API сервер запущен
node create-admin.js
```

Данные для входа смотрите в `ADMIN_CREDENTIALS.md`

## 🌐 API Endpoints

Полный список endpoints смотрите в файле `API_ENDPOINTS.md`

Основные endpoints:
- `POST /api/auth/register` - Регистрация
- `POST /api/auth/login` - Вход
- `GET /api/users` - Список пользователей
- `POST /api/users` - Создание пользователя

## 🔒 Безопасность

1. **Никогда не коммитьте .env файл** в Git
2. Используйте **надежный JWT_SECRET** в production
3. Настройте **правильные CORS** для production
4. Используйте **HTTPS** в production
5. Настройте **MongoDB authentication** для production

## 🐛 Решение проблем

### MongoDB не запускается:
```bash
# Ubuntu/WSL2
sudo rm /tmp/mongodb-27017.sock
sudo systemctl restart mongod

# Проверьте логи
sudo tail -f /var/log/mongodb/mongod.log
```

### API не может подключиться к MongoDB:
1. Проверьте, что MongoDB запущен: `sudo systemctl status mongod`
2. Проверьте MONGO_URI в .env файле
3. Убедитесь, что порт 27017 не занят: `sudo lsof -i :27017`

### Ошибки авторизации:
1. Проверьте JWT_SECRET в .env
2. Убедитесь, что токен не истек
3. Проверьте формат заголовка: `Authorization: Bearer <token>`

## 📚 Дополнительные ресурсы

- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [NestJS MongoDB Documentation](https://docs.nestjs.com/techniques/mongodb)

## 🚀 Production Setup

Для production используйте:
- **MongoDB Atlas** (облачная MongoDB)
- **Environment variables** для всех секретов
- **MongoDB authentication** и **SSL/TLS**
- **Backup strategy** для данных

### MongoDB Atlas (рекомендуется для production):

1. Создайте аккаунт на https://www.mongodb.com/cloud/atlas
2. Создайте бесплатный кластер (M0)
3. Получите connection string
4. Обновите MONGO_URI в .env:
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/makeadate?retryWrites=true&w=majority
   ```

## ✅ Checklist

- [ ] MongoDB установлен и запущен
- [ ] Создан .env файл с правильными настройками
- [ ] API сервер успешно запускается
- [ ] API отвечает на запросы (curl/browser)
- [ ] Создан первый администратор
- [ ] Тестовые запросы работают

После выполнения всех шагов ваше приложение готово к работе с MongoDB! 🎉

