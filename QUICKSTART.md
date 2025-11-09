# 🚀 Quick Start Guide - Make a Date

Get up and running with the Make a Date platform in 5 minutes!

---

## Prerequisites

Before you begin, ensure you have:
- ✅ Node.js v16+ installed
- ✅ npm v8+ installed
- ✅ MongoDB v6.0+ installed and running

---

## Step 1: Clone & Install

```bash
# Clone the repository
git clone https://github.com/Alexaslastina/makeadate.git
cd makeadate

# Install dependencies
npm install
```

---

## Step 2: Setup MongoDB

### Ubuntu/WSL2
```bash
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
sudo systemctl status mongod  # Verify it's running
```

### macOS
```bash
brew tap mongodb/brew
brew install mongodb-community@6.0
brew services start mongodb-community@6.0
```

### Windows
Download and install from: https://www.mongodb.com/try/download/community

---

## Step 3: Configure Environment

Create a `.env` file in the project root:

```env
MONGO_URI=mongodb://localhost:27017/makeadate
PORT=3001
JWT_SECRET=your-super-secret-key-change-this-in-production
JWT_EXPIRATION=7d
```

⚠️ **Important:** Change `JWT_SECRET` to a strong, random string!

---

## Step 4: Create Admin Account

```bash
npm run create:admin
```

This creates:
- **Email:** admin@makeadate.com
- **Password:** Admin123!@#

---

## Step 5: Start the Application

### Terminal 1 - Start Backend API

```bash
npm run start:api
```

✅ Backend running at: `http://localhost:3001/api`

### Terminal 2 - Start Frontend

```bash
npm run start:frontend
```

✅ Frontend running at: `http://localhost:4200`

---

## Step 6: Test the Application

### 1. Open Your Browser
Navigate to: **http://localhost:4200**

### 2. Register a New Account
- Click **"Register"** in the header
- Choose account type (Customer or Admin)
- Fill in the form and create your account

### 3. Login
- Use your newly created account, or
- Use test credentials from [CREDENTIALS.md](CREDENTIALS.md)

### 4. Explore Features
- ✅ Browse 8 unique date experiences
- ✅ Add dates to favorites (❤️ button)
- ✅ Leave reviews and ratings
- ✅ Go to checkout and make a booking
- ✅ View your orders in the profile page

---

## 🧪 Verify Everything is Working

### Check MongoDB Connection
```bash
npm run test:mongodb
```

Expected output: `✅ Successfully connected to MongoDB!`

### Check Backend API
```bash
curl http://localhost:3001/api/users
```

Expected output: JSON array of users

### Check Frontend
Open `http://localhost:4200` in your browser - you should see the homepage with date cards.

---

## 🎯 Common Commands

```bash
# Backend
npm run start:api              # Start API server

# Frontend
npm run start:frontend         # Start dev server

# Database
npm run test:mongodb           # Test MongoDB connection
npm run create:admin           # Create/reset admin account

# Build for Production
npx nx build frontend --prod   # Build frontend
npx nx build api --prod        # Build backend

# Docker (Alternative)
npm run docker:build           # Build Docker image
npm run docker:run             # Start with docker-compose
npm run docker:stop            # Stop containers
```

---

## 🐛 Troubleshooting

### MongoDB Won't Start

**Ubuntu/WSL2:**
```bash
sudo systemctl start mongod
sudo systemctl enable mongod  # Auto-start on boot
```

**macOS:**
```bash
brew services restart mongodb-community@6.0
```

### Can't Connect to MongoDB

1. Check if MongoDB is running:
   ```bash
   sudo systemctl status mongod  # Linux
   brew services list            # macOS
   ```

2. Verify your `.env` file has correct MONGO_URI

3. Try the test script:
   ```bash
   npm run test:mongodb
   ```

### Port Already in Use

If port 3001 or 4200 is busy:

**Change Backend Port:**
Edit `.env` file:
```env
PORT=3002  # Or any available port
```

**Change Frontend Port:**
```bash
npx nx serve frontend --port=4300
```

### Admin Login Not Working

Recreate the admin account:
```bash
npm run create:admin
```

Then try logging in with:
- Email: `admin@makeadate.com`
- Password: `Admin123!@#`

---

## 📚 Next Steps

### For Development
- Read [ARCHITECTURE.md](ARCHITECTURE.md) - Understand the system design
- Check [API_ENDPOINTS.md](API_ENDPOINTS.md) - API documentation
- See [CHEATSHEET.md](CHEATSHEET.md) - Quick command reference

### For Deployment
- Review [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)
- Learn about [DOCKER.md](DOCKER.md) deployment
- Setup CI/CD with [docs/WORKFLOWS_GUIDE.md](docs/WORKFLOWS_GUIDE.md)

### For Setup Help
- Follow [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for detailed steps
- Read [MONGODB_SETUP.md](MONGODB_SETUP.md) for MongoDB details

---

## 🎉 You're All Set!

Your Make a Date platform is now running! Start exploring the features and building your romantic date planning business.

**Need Help?** Check out the full documentation in the [README.md](README.md)

---

**Happy Dating! 💕**




