# 🚀 Render.com Environment Variables for API Production Deployment

Complete list of environment variables to configure on Render.com for the MakeADate API service.

---

## Required Environment Variables

### 1. Database Configuration

**MONGO_URI**
```
mongodb+srv://username:password@cluster.mongodb.net/makeadate?retryWrites=true&w=majority
```
- **Required:** YES ✅
- **Description:** MongoDB connection string
- **Where to get it:**
  - MongoDB Atlas: Database → Connect → Connect your application → Copy connection string
  - Self-hosted: `mongodb://username:password@host:port/makeadate`
- **Example:** `mongodb+srv://makeadate_user:SecurePass123@cluster0.abc123.mongodb.net/makeadate?retryWrites=true&w=majority`
- **Security:** This is sensitive! Don't share publicly

---

### 2. Authentication Configuration

**JWT_SECRET**
```
<generate-a-strong-random-64-character-string>
```
- **Required:** YES ✅
- **Description:** Secret key for signing JWT tokens
- **Generate it:**
  ```bash
  node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
  ```
- **Example:** `a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8c9d0e1f2g3h4`
- **Security:** Must be at least 32 characters, use 64+ for production
- **CRITICAL:** Never use the default value `your-secret-key-change-in-production`

---

### 3. Application Configuration

**NODE_ENV**
```
production
```
- **Required:** YES ✅
- **Description:** Sets Node.js environment mode
- **Value:** `production` (exactly as shown)
- **Purpose:** Enables production optimizations, disables debug logging

**PORT**
```
3001
```
- **Required:** NO ⚠️ (Render auto-assigns this)
- **Description:** Port for the API server to listen on
- **Note:** Render automatically sets this. Only add if you need a specific port
- **Default:** Render typically uses `10000`, but app defaults to `3001`

---

### 4. JWT Token Configuration

**JWT_EXPIRES_IN**
```
7d
```
- **Required:** NO (has default)
- **Description:** How long JWT tokens remain valid
- **Default:** `24h` (24 hours)
- **Options:**
  - `1h` - 1 hour
  - `24h` - 24 hours
  - `7d` - 7 days
  - `30d` - 30 days
- **Recommended for production:** `7d` or `24h`

---

### 5. Logging Configuration

**LOG_LEVEL**
```
ERROR
```
- **Required:** NO (has default)
- **Description:** Controls logging verbosity
- **Default:** `LOG`
- **Options (most to least verbose):**
  - `VERBOSE` - Everything (development only)
  - `DEBUG` - Debug info + all below
  - `LOG` - General logs + all below
  - `WARN` - Warnings + errors
  - `ERROR` - Errors only (recommended for production)
- **Recommended for production:** `ERROR` or `WARN`

---

## Complete Production Configuration

### Copy-Paste Ready Format

Add these in Render.com Dashboard → Your Web Service → Environment:

```bash
# Database
MONGO_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/makeadate?retryWrites=true&w=majority

# Authentication (GENERATE A NEW SECRET!)
JWT_SECRET=<paste-output-from-crypto-command-here>
JWT_EXPIRES_IN=7d

# Application
NODE_ENV=production

# Logging
LOG_LEVEL=ERROR
```

---

## Step-by-Step Setup on Render.com

### Step 1: Create Web Service

1. Log in to [Render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select the **makeadate** repository

### Step 2: Configure Build Settings

| Setting | Value |
|---------|-------|
| **Name** | `makeadate-api` |
| **Region** | Choose closest to your users |
| **Branch** | `main` |
| **Root Directory** | Leave empty |
| **Runtime** | `Docker` |
| **Dockerfile Path** | `Dockerfile` |
| **Docker Build Context Directory** | `.` |

### Step 3: Add Environment Variables

Click **"Advanced"** → Scroll to **"Environment Variables"** → Add each variable:

#### Variable 1: MONGO_URI
```
Key:   MONGO_URI
Value: mongodb+srv://...your-connection-string...
```

#### Variable 2: JWT_SECRET
First, generate the secret locally:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Then add it:
```
Key:   JWT_SECRET
Value: <paste-the-generated-hash>
```

#### Variable 3: JWT_EXPIRES_IN
```
Key:   JWT_EXPIRES_IN
Value: 7d
```

#### Variable 4: NODE_ENV
```
Key:   NODE_ENV
Value: production
```

#### Variable 5: LOG_LEVEL
```
Key:   LOG_LEVEL
Value: ERROR
```

### Step 4: Configure Health Check (Optional but Recommended)

| Setting | Value |
|---------|-------|
| **Health Check Path** | `/api/health` |
| **Health Check Timeout** | 30 seconds |

### Step 5: Deploy

1. Click **"Create Web Service"**
2. Render will automatically:
   - Clone your repository
   - Build the Docker image
   - Deploy the service
   - Assign a URL: `https://makeadate-api.onrender.com`

---

## MongoDB Atlas Setup (If You Don't Have It)

### Step 1: Create MongoDB Atlas Account

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free tier
3. Create a new cluster (Free M0 tier available)

### Step 2: Create Database User

1. Go to **Database Access**
2. Click **"Add New Database User"**
3. Create user:
   - Username: `makeadate_user`
   - Password: Generate a strong password (save it!)
   - Database User Privileges: **Read and write to any database**

### Step 3: Whitelist Render IP Addresses

1. Go to **Network Access**
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (for Render)
   - Or add Render's specific IPs if you want tighter security
4. Confirm

### Step 4: Get Connection String

1. Go to **Database** → **Connect** → **Connect your application**
2. Driver: **Node.js**
3. Copy the connection string:
   ```
   mongodb+srv://makeadate_user:<password>@cluster0.xxxxx.mongodb.net/makeadate?retryWrites=true&w=majority
   ```
4. Replace `<password>` with your actual database user password

---

## Verification After Deployment

### 1. Check Build Logs

In Render dashboard:
- Go to your service
- Click **"Logs"**
- Look for:
  ```
  🚀 Application is running on: http://0.0.0.0:10000/api
  Environment: production
  ```

### 2. Test Health Endpoint

```bash
curl https://your-service-name.onrender.com/api/health
```

Expected response:
```json
{
  "status": "ok",
  "timestamp": "2024-11-07T..."
}
```

### 3. Test API Connection

```bash
# Test registration
curl -X POST https://your-service-name.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "Test123!",
    "name": "Test User"
  }'
```

---

## Security Checklist

Before going live, verify:

- [ ] `JWT_SECRET` is a strong, randomly generated string (64+ chars)
- [ ] `JWT_SECRET` is NOT the default value
- [ ] `MONGO_URI` uses a strong password
- [ ] MongoDB Atlas has network access configured
- [ ] `NODE_ENV` is set to `production`
- [ ] `LOG_LEVEL` is set to `ERROR` or `WARN`
- [ ] Health check endpoint is working
- [ ] CORS is properly configured for your frontend domain
- [ ] Rate limiting is enabled (if implemented)

---

## Update Frontend to Use Render API

After deployment, update your frontend to use the Render API URL:

**File:** `apps/frontend/src/app/services/adminApi.ts`

```typescript
// Before (local development)
const API_URL = 'http://localhost:3001/api';

// After (production)
const API_URL = import.meta.env.VITE_API_URL || 'https://makeadate-api.onrender.com/api';
```

Then add to your GitHub Actions deploy workflow:

```yaml
env:
  VITE_API_URL: https://makeadate-api.onrender.com/api
```

---

## Common Issues & Solutions

### Issue: "Cannot connect to database"

**Solution:**
1. Check MONGO_URI is correct
2. Verify MongoDB Atlas network access allows Render IPs
3. Check database user credentials are correct
4. Ensure database name in URI matches your database

### Issue: "JWT token invalid"

**Solution:**
1. Ensure JWT_SECRET is set and matches across all instances
2. Check JWT_EXPIRES_IN format is valid
3. Verify tokens aren't expired

### Issue: "Port already in use"

**Solution:**
- Remove the PORT environment variable and let Render auto-assign it
- Or ensure your code uses `process.env.PORT` correctly

### Issue: "Build fails"

**Solution:**
1. Check Dockerfile path is correct
2. Verify all dependencies are in package.json
3. Check build logs for specific errors
4. Test Docker build locally: `docker build -t test .`

---

## Environment Variables Summary Table

| Variable | Required | Default | Production Value | Purpose |
|----------|----------|---------|------------------|---------|
| `MONGO_URI` | ✅ Yes | `mongodb://localhost:27017/makeadate` | Your MongoDB Atlas URI | Database connection |
| `JWT_SECRET` | ✅ Yes | Default (change!) | 64+ char random string | JWT signing |
| `NODE_ENV` | ✅ Yes | `development` | `production` | Environment mode |
| `JWT_EXPIRES_IN` | ⚠️ Optional | `24h` | `7d` | Token lifetime |
| `LOG_LEVEL` | ⚠️ Optional | `LOG` | `ERROR` | Logging verbosity |
| `PORT` | ⚠️ Optional | `3001` | Auto-assigned by Render | Server port |

---

## Render.com Free Tier Limitations

Be aware of Render's free tier limits:
- **Sleeps after 15 minutes of inactivity**
- **750 hours per month** (enough for one always-on service)
- **First request may be slow** (cold start ~30 seconds)
- **Database:** Use MongoDB Atlas free tier (512 MB storage)

For production, consider upgrading to:
- **Starter Plan:** $7/month (always-on, no sleep)
- **Standard Plan:** $25/month (more resources)

---

## Next Steps

1. ✅ Set up MongoDB Atlas (if not done)
2. ✅ Generate JWT_SECRET
3. ✅ Create Render Web Service
4. ✅ Add all environment variables
5. ✅ Deploy and verify
6. ✅ Update frontend API URL
7. ✅ Test full application flow
8. ✅ Monitor logs for errors

---

## Quick Reference: Generate JWT Secret

```bash
# Linux/Mac/WSL
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

# Or use OpenSSL
openssl rand -hex 64

# Or use online generator (use a trusted source only!)
# https://randomkeygen.com/
```

Save the output and use it as your `JWT_SECRET` value.

---

## Support & Resources

- **Render Documentation:** https://render.com/docs
- **MongoDB Atlas:** https://www.mongodb.com/docs/atlas/
- **Project Documentation:** [README.md](README.md)
- **API Documentation:** [API_ENDPOINTS.md](API_ENDPOINTS.md)

---

**Created:** November 7, 2024  
**For:** MakeADate API Production Deployment  
**Platform:** Render.com


