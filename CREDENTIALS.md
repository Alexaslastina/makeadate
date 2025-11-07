# 🔐 Test Credentials for MakeADate

## 👤 Regular Customer Account

For testing customer features (booking dates, favorites, orders):

```
Email:    test@example.com
Password: test123
Role:     Customer
```

**Features available:**
- Browse and view all dates
- Add dates to favorites
- Book and purchase dates
- View order history and receipts
- Rate and review dates

---

## 👨‍💼 Administrator Account

For testing admin features and dashboard:

```
Email:    admin@makeadate.com
Password: Admin123!@#
Role:     Administrator
```

**Features available:**
- All customer features
- Access to Admin Panel
- Manage users (future feature)
- View analytics (future feature)
- Manage dates and bookings (future feature)

---

## 🚀 Quick Start

### 1. Start the Application
```bash
# Terminal 1 - Start Backend
npm run start:api

# Terminal 2 - Start Frontend
npm run start:frontend
```

### 2. Access the Application
- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3000

### 3. Login
- Navigate to http://localhost:4200/login
- Use one of the credentials above
- Start exploring!

---

## 📝 Notes

- **Customer account** (`test@example.com`) is created automatically when you first register
- **Admin account** can be recreated anytime with: `npm run create:admin`
- All passwords are hashed using bcrypt for security
- Test data (favorites, orders) is stored in localStorage for demo purposes

---

## 🔒 Security Note

**⚠️ IMPORTANT**: These are test credentials for development only!

In production:
- Change all default passwords
- Remove test accounts
- Use environment variables for sensitive data
- Implement proper user management
- Add password reset functionality (already included!)

---

## 💡 Tips

1. **Forgot your admin password?**
   ```bash
   npm run create:admin
   ```
   This will reset the admin password to the default.

2. **Want to create more test users?**
   - Use the registration page: http://localhost:4200/register
   - Or use the API directly: POST to `/auth/register`

3. **Testing the full flow:**
   - Login as customer
   - Add dates to favorites (♥ button)
   - Go to Favorites page
   - Click "Buy All" or "Buy Now"
   - Fill checkout form with test data
   - Complete purchase
   - View your order in Profile page
   - Print receipt if needed

---

## 🆘 Troubleshooting

**Can't login?**
- Check if MongoDB is running: `sudo systemctl status mongod`
- Check if backend is running: `npm run start:api`
- Recreate admin: `npm run create:admin`

**Frontend not loading?**
- Clear browser cache
- Check if frontend is running: `npm run start:frontend`
- Try http://localhost:4200 in incognito mode

---

Last Updated: November 7, 2024

