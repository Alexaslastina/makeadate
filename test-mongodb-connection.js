/**
 * Скрипт для проверки подключения к MongoDB
 * Использование: node test-mongodb-connection.js
 */

const mongoose = require('mongoose');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/makeadate';

console.log('🔌 Попытка подключения к MongoDB...');
console.log(`📍 URI: ${MONGO_URI}`);

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ Успешное подключение к MongoDB!');
    console.log(`📊 База данных: ${mongoose.connection.db.databaseName}`);
    
    // Получить список коллекций
    return mongoose.connection.db.listCollections().toArray();
  })
  .then((collections) => {
    console.log('\n📦 Найденные коллекции:');
    if (collections.length === 0) {
      console.log('   (пусто - база данных новая)');
    } else {
      collections.forEach(col => {
        console.log(`   - ${col.name}`);
      });
    }
    
    // Подсчет документов в коллекции users
    return mongoose.connection.db.collection('users').countDocuments();
  })
  .then((userCount) => {
    console.log(`\n👥 Количество пользователей: ${userCount}`);
    console.log('\n🎉 Тест подключения завершен успешно!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n❌ Ошибка подключения к MongoDB:');
    console.error(error.message);
    console.log('\n💡 Возможные решения:');
    console.log('   1. Убедитесь, что MongoDB запущен: sudo systemctl status mongod');
    console.log('   2. Проверьте MONGO_URI в файле .env');
    console.log('   3. Убедитесь, что порт 27017 не занят: sudo lsof -i :27017');
    process.exit(1);
  });

