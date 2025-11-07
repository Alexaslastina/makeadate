require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/makeadate';

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  passwordHash: { type: String, required: true },
  name: { type: String },
  role: { type: String, default: 'customer', enum: ['customer', 'admin'] },
}, { timestamps: true });

const User = mongoose.model('UserEntity', userSchema, 'users');

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB');

    const email = 'admin@makeadate.com';
    const password = 'Admin123!@#';
    const name = 'Administrator';

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email });
    if (existingAdmin) {
      console.log('Admin user already exists. Updating password...');
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      existingAdmin.passwordHash = passwordHash;
      existingAdmin.name = name;
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('✅ Admin password updated successfully!');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    } else {
      // Create new admin
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(password, saltRounds);
      
      const admin = new User({
        email,
        passwordHash,
        name,
        role: 'admin',
      });

      await admin.save();
      console.log('✅ Admin user created successfully!');
      console.log(`Email: ${email}`);
      console.log(`Password: ${password}`);
    }

    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
}

createAdmin();

