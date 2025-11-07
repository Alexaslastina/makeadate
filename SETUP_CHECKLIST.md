# ✅ Setup Checklist - Make a Date

Используйте этот контрольный список для настройки проекта.

## 📋 Предварительные требования

- [ ] Node.js v16+ установлен
  ```bash
  node --version
  ```

- [ ] npm v8+ установлен
  ```bash
  npm --version
  ```

- [ ] Git установлен
  ```bash
  git --version
  ```

## 🔧 Установка проекта

- [ ] Клонирован репозиторий
  ```bash
  git clone https://github.com/Alexaslastina/makeadate.git
  cd makeadate
  ```

- [ ] Установлены зависимости
  ```bash
  npm install
  ```

## 🗄️ Настройка MongoDB

### Установка MongoDB

- [ ] MongoDB установлен

  **Ubuntu/WSL2:**
  ```bash
  sudo apt-get update
  sudo apt-get install -y mongodb-org
  ```

  **macOS:**
  ```bash
  brew tap mongodb/brew
  brew install mongodb-community@6.0
  ```

  **Windows:**
  Скачать с https://www.mongodb.com/try/download/community

- [ ] MongoDB запущен

  **Ubuntu/WSL2:**
  ```bash
  sudo systemctl start mongod
  sudo systemctl status mongod
  ```

  **macOS:**
  ```bash
  brew services start mongodb-community@6.0
  ```

  **Windows:**
  MongoDB Service должен запуститься автоматически

- [ ] MongoDB работает правильно
  ```bash
  mongosh
  # Должен подключиться без ошибок
  # Введите 'exit' для выхода
  ```

## ⚙️ Конфигурация проекта

- [ ] Создан файл .env
  ```bash
  cp .env.template .env
  ```

- [ ] Настроены переменные окружения в .env:
  ```env
  MONGO_URI=mongodb://localhost:27017/makeadate
  PORT=3001
  JWT_SECRET=измените-это-на-длинный-случайный-ключ
  JWT_EXPIRATION=7d
  ```

  **⚠️ ВАЖНО:** Замените JWT_SECRET на случайную строку!

  Сгенерировать случайный ключ:
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```

- [ ] Проверено подключение к MongoDB
  ```bash
  npm run test:mongodb
  ```

  Ожидаемый результат:
  ```
  ✅ Успешное подключение к MongoDB!
  📊 База данных: makeadate
  ```

## 🚀 Запуск проекта

### Backend API

- [ ] API сервер запускается без ошибок
  ```bash
  npm run start:api
  ```

  Ожидаемый вывод:
  ```
  🚀 Application is running on: http://0.0.0.0:3001/api
  ```

- [ ] API отвечает на запросы
  ```bash
  curl http://localhost:3001/api/users
  ```

  Или откройте в браузере:
  ```
  http://localhost:3001/api/users
  ```

### Frontend

- [ ] Frontend запускается без ошибок (в новом терминале)
  ```bash
  npm run start:frontend
  ```

  Ожидаемый вывод:
  ```
  Local:   http://localhost:4200/
  ```

- [ ] Frontend открывается в браузере
  ```
  http://localhost:4200
  ```

## 👤 Создание администратора (опционально)

- [ ] Создан аккаунт администратора
  ```bash
  npm run create:admin
  ```

- [ ] Сохранены данные для входа (см. ADMIN_CREDENTIALS.md)

## 🧪 Тестирование API

- [ ] Регистрация работает
  ```bash
  curl -X POST http://localhost:3001/api/auth/register \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password123"}'
  ```

- [ ] Логин работает
  ```bash
  curl -X POST http://localhost:3001/api/auth/login \
    -H "Content-Type: application/json" \
    -d '{"email":"test@example.com","password":"password123"}'
  ```

- [ ] Получение пользователей работает
  ```bash
  curl http://localhost:3001/api/users
  ```

## 📊 Проверка базы данных

- [ ] База данных создана
  ```bash
  mongosh
  > show dbs
  # Должна быть база 'makeadate'
  ```

- [ ] Коллекция users существует
  ```bash
  mongosh
  > use makeadate
  > show collections
  # Должна быть коллекция 'users'
  ```

- [ ] Данные записываются
  ```bash
  mongosh
  > use makeadate
  > db.users.find().pretty()
  # Должны отображаться созданные пользователи
  ```

## 🔒 Безопасность

- [ ] JWT_SECRET изменен на уникальный ключ
- [ ] .env файл не добавлен в Git (проверьте .gitignore)
- [ ] Пароли не хранятся в открытом виде

## 📚 Документация

- [ ] Прочитан README.md
- [ ] Изучен QUICKSTART.md
- [ ] Просмотрена ARCHITECTURE.md
- [ ] Знакомство с API_ENDPOINTS.md

## 🎯 Финальная проверка

- [ ] MongoDB работает
- [ ] Backend API работает на порту 3001
- [ ] Frontend работает на порту 4200
- [ ] API endpoints отвечают корректно
- [ ] Frontend может подключаться к Backend (если настроено)

## ✨ Готово!

Если все пункты отмечены ✅, ваш проект готов к разработке!

## 🐛 Возникли проблемы?

### MongoDB не запускается
```bash
# Ubuntu/WSL2
sudo rm /tmp/mongodb-27017.sock
sudo systemctl restart mongod
sudo tail -f /var/log/mongodb/mongod.log
```

### API не подключается к MongoDB
1. Проверьте статус MongoDB: `sudo systemctl status mongod`
2. Проверьте MONGO_URI в .env
3. Запустите: `npm run test:mongodb`

### Порт уже занят
```bash
# Проверить порт 3001
sudo lsof -i :3001

# Проверить порт 4200
sudo lsof -i :4200

# Проверить порт 27017
sudo lsof -i :27017
```

### Ошибки при установке npm
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

## 📞 Дополнительная помощь

- Смотрите [MONGODB_SETUP.md](MONGODB_SETUP.md) для детальной настройки MongoDB
- Смотрите [MONGODB_CONNECTION_STATUS.md](MONGODB_CONNECTION_STATUS.md) для проверки интеграции
- Смотрите [API_ENDPOINTS.md](API_ENDPOINTS.md) для списка endpoints

---

**Последнее обновление:** 2025-11-07  
**Версия:** 1.0.0

