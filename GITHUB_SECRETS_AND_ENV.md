# 🔐 GitHub Secrets and Environment Variables

Complete documentation for all secrets and environment variables used in the MakeADate project.

---

## Table of Contents

- [Overview](#overview)
- [GitHub Actions Environment Variables](#github-actions-environment-variables)
- [Backend API Environment Variables](#backend-api-environment-variables)
- [Frontend Environment Variables](#frontend-environment-variables)
- [Docker Environment Variables](#docker-environment-variables)
- [GitHub Secrets Setup](#github-secrets-setup)
- [Security Best Practices](#security-best-practices)
- [Environment-Specific Configurations](#environment-specific-configurations)

---

## Overview

This project uses two types of configuration:

1. **Environment Variables** - Configuration values that change between environments (development, staging, production)
2. **GitHub Secrets** - Sensitive values stored securely in GitHub for CI/CD workflows

Currently, the project **does NOT require any GitHub Secrets** for basic deployment to GitHub Pages. All configuration is handled through public environment variables or built-in GitHub tokens.

---

## GitHub Actions Environment Variables

### Deploy Workflow (`.github/workflows/deploy.yml`)

These environment variables are set at the workflow level for building and deploying to GitHub Pages:

| Variable | Value | Purpose | Required |
|----------|-------|---------|----------|
| `NODE_ENV` | `production` | Sets Node.js environment mode | Yes |
| `VITE_BASE_URL` | `/makeadate/` | Base path for GitHub Pages subdirectory | Yes |
| `VITE_API_BASE_URL` | `/makeadate/api/` | API base path for production | Yes |
| `VITE_ENVIRONMENT` | `production` | Application environment identifier | Yes |

**Configuration Location:**
```yaml
env:
  NODE_ENV: production
  VITE_BASE_URL: /makeadate/
  VITE_API_BASE_URL: /makeadate/api/
  VITE_ENVIRONMENT: production
```

**Why these are needed:**
- Vite uses these variables during the build process
- Ensures assets are correctly resolved when deployed to GitHub Pages subdirectory
- Frontend knows which API endpoint to connect to

### CI Workflow (`.github/workflows/ci.yml`)

The CI workflow does NOT use any custom environment variables. It runs with default Node.js environment.

**Built-in GitHub Variables Used:**
- `${{ github.workflow }}` - Workflow name
- `${{ github.ref }}` - Git reference
- `${{ github.sha }}` - Commit SHA
- `${{ github.actor }}` - User who triggered the workflow
- `${{ matrix.node-version }}` - Node version from build matrix (18.x, 20.x)

---

## Backend API Environment Variables

These variables configure the NestJS backend API server.

### Core Variables

| Variable | Default | Description | Required | Example |
|----------|---------|-------------|----------|---------|
| `NODE_ENV` | `development` | Node.js environment mode | No | `production`, `development`, `test` |
| `PORT` | `3001` | Port for API server to listen on | No | `3001`, `8080` |
| `MONGO_URI` | `mongodb://localhost:27017/makeadate` | MongoDB connection string | Yes | `mongodb://user:pass@host:27017/dbname` |
| `JWT_SECRET` | `your-secret-key-change-in-production` | Secret key for JWT token signing | **Yes** | Any random string (min 32 chars) |
| `JWT_EXPIRES_IN` | `24h` | JWT token expiration time | No | `24h`, `7d`, `1h` |
| `LOG_LEVEL` | `LOG` | Logging verbosity level | No | `ERROR`, `WARN`, `LOG`, `DEBUG`, `VERBOSE` |

### Where These Are Used

**1. Application Bootstrap (`apps/api/src/main.ts`):**
```typescript
const port = process.env.PORT ? Number(process.env.PORT) : 3001;
await app.listen(port, '0.0.0.0');
logger.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
logger.log(`Log Level: ${process.env.LOG_LEVEL || 'LOG'}`);
```

**2. Database Connection (`apps/api/src/app/app.module.ts`):**
```typescript
MongooseModule.forRoot(
  process.env.MONGO_URI || 'mongodb://localhost:27017/makeadate'
)
```

**3. JWT Authentication (`apps/api/src/app/auth/auth.module.ts`):**
```typescript
JwtModule.register({
  secret: process.env.JWT_SECRET || 'your-secret-key-change-in-production',
  signOptions: { expiresIn: '24h' }
})
```

**4. Logger Service (`apps/api/src/app/logger/logger.service.ts`):**
```typescript
this.isDevelopment = process.env.NODE_ENV !== 'production';
const level = process.env.LOG_LEVEL?.toUpperCase() || 'LOG';
```

### Development Configuration

Create a `.env` file in the project root:

```env
# Database
MONGO_URI=mongodb://localhost:27017/makeadate

# API Server
PORT=3001
NODE_ENV=development

# Authentication
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=24h

# Logging
LOG_LEVEL=LOG
```

### Production Configuration

For production environments (Render, AWS, etc.):

```env
# Database (use your hosted MongoDB)
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/makeadate?retryWrites=true&w=majority

# API Server
PORT=3001
NODE_ENV=production

# Authentication (MUST be changed!)
JWT_SECRET=<generate-a-strong-random-64-character-string>
JWT_EXPIRES_IN=7d

# Logging
LOG_LEVEL=ERROR
```

⚠️ **CRITICAL:** Always use a strong, randomly generated `JWT_SECRET` in production!

---

## Frontend Environment Variables

The frontend uses Vite's environment variable system (prefixed with `VITE_`).

### Available Variables

| Variable | Default | Description | Required | Used In |
|----------|---------|-------------|----------|---------|
| `VITE_BASE_PATH` | `/` | Base path for application routing | No | `vite.config.ts` |
| `VITE_API_BASE_URL` | `http://localhost:3001/api` | Backend API endpoint URL | No | API service files |

### Configuration

**Development (`vite.config.ts`):**
```typescript
const base = process.env.VITE_BASE_PATH || '/';
```

**Production (GitHub Actions):**
```yaml
env:
  VITE_BASE_URL: /makeadate/
```

**Using in Code:**
```typescript
// Access base URL
const baseUrl = import.meta.env.BASE_URL;

// Access custom Vite vars
const apiUrl = import.meta.env.VITE_API_BASE_URL;
```

### Build-Time vs Runtime

⚠️ **Important:** Vite environment variables are **build-time only**. They are embedded into the JavaScript bundle during build and cannot be changed at runtime.

**Current Implementation:**
- API URL is hardcoded in `apps/frontend/src/app/services/adminApi.ts`:
  ```typescript
  const API_URL = 'http://localhost:3001/api';
  ```

**Recommended for Production:**
```typescript
const API_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';
```

**Production API URL (Render.com):**
- API URL: `https://makeadate.onrender.com/api`
- This is configured in `.github/workflows/deploy.yml`

---

## Docker Environment Variables

### Docker Compose Configuration (`docker-compose.yml`)

**MongoDB Service:**
```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: admin
  MONGO_INITDB_ROOT_PASSWORD: admin123
  MONGO_INITDB_DATABASE: makeadate
```

| Variable | Value | Description |
|----------|-------|-------------|
| `MONGO_INITDB_ROOT_USERNAME` | `admin` | MongoDB root username |
| `MONGO_INITDB_ROOT_PASSWORD` | `admin123` | MongoDB root password |
| `MONGO_INITDB_DATABASE` | `makeadate` | Initial database name |

⚠️ **Change these credentials in production!**

**API Service:**
```yaml
environment:
  NODE_ENV: production
  PORT: 3001
  MONGO_URI: mongodb://admin:admin123@mongodb:27017/makeadate?authSource=admin
  JWT_SECRET: ${JWT_SECRET:-your-super-secret-jwt-key-change-in-production}
  JWT_EXPIRES_IN: ${JWT_EXPIRES_IN:-24h}
```

| Variable | Default | Description |
|----------|---------|-------------|
| `NODE_ENV` | `production` | Environment mode |
| `PORT` | `3001` | API server port |
| `MONGO_URI` | `mongodb://admin:admin123@mongodb:27017/makeadate?authSource=admin` | MongoDB connection |
| `JWT_SECRET` | `your-super-secret-jwt-key-change-in-production` | JWT signing key |
| `JWT_EXPIRES_IN` | `24h` | Token expiration |

**Using Environment Variables with Docker:**

Create a `.env` file for Docker Compose:
```env
JWT_SECRET=my-production-secret-key
JWT_EXPIRES_IN=7d
```

Start containers:
```bash
docker-compose up -d
```

### Dockerfile Environment Variables (`Dockerfile`)

**Build-time variables:**
- None currently configured

**Runtime variables (set in production):**
```dockerfile
ENV NODE_ENV=production
ENV PORT=3001
```

These can be overridden when running the container:
```bash
docker run -e NODE_ENV=production -e PORT=8080 makeadate-api
```

---

## GitHub Secrets Setup

### Currently Required Secrets

**None!** 🎉

The project currently doesn't require any GitHub Secrets for deployment to GitHub Pages.

### GitHub Built-in Tokens

The workflows use GitHub's built-in authentication:

| Token | Description | Permissions | Automatically Available |
|-------|-------------|-------------|------------------------|
| `GITHUB_TOKEN` | Automatic token for GitHub Actions | `contents: read`, `pages: write`, `id-token: write` | Yes |

**Configuration (`.github/workflows/deploy.yml`):**
```yaml
permissions:
  contents: read      # Read repository contents
  pages: write        # Deploy to GitHub Pages
  id-token: write     # OIDC authentication
```

### When You Might Need Secrets

You would need to add GitHub Secrets if you:

1. **Deploy API to a hosting service** (Render, Heroku, AWS, etc.)
2. **Use external services** (SendGrid, Stripe, AWS S3, etc.)
3. **Connect to a hosted database** (MongoDB Atlas, etc.)
4. **Use third-party APIs** (Google Maps, payment processors, etc.)

### How to Add Secrets (When Needed)

1. **Navigate to Repository Settings:**
   ```
   GitHub Repo → Settings → Secrets and variables → Actions
   ```

2. **Click "New repository secret"**

3. **Add secret:**
   - Name: `JWT_SECRET`
   - Value: `your-secret-value-here`

4. **Use in workflow:**
   ```yaml
   env:
     JWT_SECRET: ${{ secrets.JWT_SECRET }}
   ```

### Example: Adding Production Secrets

If deploying the backend API, you would add:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `MONGO_URI_PROD` | Production MongoDB URI | `mongodb+srv://user:pass@cluster.mongodb.net/db` |
| `JWT_SECRET_PROD` | Production JWT secret | `<64-character-random-string>` |
| `RENDER_API_KEY` | Render deployment key | `rnd_xxxxxxxxxxxxx` |
| `CODECOV_TOKEN` | Code coverage reporting | `<codecov-token>` |

---

## Security Best Practices

### 🔒 Secret Management

1. **Never Commit Secrets**
   ```bash
   # Add to .gitignore
   .env
   .env.local
   .env.production
   *.pem
   *.key
   ```

2. **Use Strong Random Values**
   ```bash
   # Generate secure JWT secret
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Rotate Secrets Regularly**
   - Change JWT secrets every 90 days
   - Update database passwords quarterly
   - Rotate API keys when team members leave

4. **Use Different Secrets Per Environment**
   - Development: One set of credentials
   - Staging: Different credentials
   - Production: Unique, strong credentials

### 🛡️ Environment Variable Security

1. **Validate Environment Variables**
   ```typescript
   if (!process.env.JWT_SECRET || process.env.JWT_SECRET === 'your-secret-key-change-in-production') {
     throw new Error('JWT_SECRET must be set to a secure value in production');
   }
   ```

2. **Use Type-Safe Configuration**
   ```typescript
   // config/configuration.ts
   export default () => ({
     port: parseInt(process.env.PORT, 10) || 3001,
     database: {
       uri: process.env.MONGO_URI,
     },
     jwt: {
       secret: process.env.JWT_SECRET,
       expiresIn: process.env.JWT_EXPIRES_IN || '24h',
     },
   });
   ```

3. **Never Log Secrets**
   ```typescript
   // ❌ BAD
   console.log('JWT Secret:', process.env.JWT_SECRET);
   
   // ✅ GOOD
   console.log('JWT Secret configured:', !!process.env.JWT_SECRET);
   ```

### 🔐 Production Checklist

Before going to production:

- [ ] Change all default passwords
- [ ] Generate strong JWT_SECRET (min 64 characters)
- [ ] Use environment-specific MongoDB credentials
- [ ] Enable MongoDB authentication
- [ ] Use HTTPS for all API endpoints
- [ ] Set NODE_ENV=production
- [ ] Reduce LOG_LEVEL to ERROR or WARN
- [ ] Remove test/demo accounts
- [ ] Review CORS settings
- [ ] Enable rate limiting
- [ ] Set up monitoring and alerts

---

## Environment-Specific Configurations

### Local Development

**Terminal 1 - Backend:**
```bash
# Set environment variables
export MONGO_URI=mongodb://localhost:27017/makeadate
export JWT_SECRET=dev-secret-key
export NODE_ENV=development

# Start API
npm run start:api
```

**Terminal 2 - Frontend:**
```bash
# Start frontend
npm run start:frontend
```

### Docker Development

```bash
# Using docker-compose (reads .env file)
docker-compose up -d

# Check environment
docker exec makeadate-api env | grep JWT_SECRET
```

### GitHub Actions (CI/CD)

**Automatic on push to main:**
- Uses workflow-level environment variables
- No secrets required for GitHub Pages deployment
- Built with production configuration

### Production Deployment (e.g., Render)

**On Render:**
1. Go to Dashboard → Web Service
2. Environment → Environment Variables
3. Add:
   ```
   MONGO_URI = mongodb+srv://...
   JWT_SECRET = <strong-secret>
   NODE_ENV = production
   PORT = 3001
   ```

**On AWS:**
```bash
# Using AWS Systems Manager Parameter Store
aws ssm put-parameter \
  --name "/makeadate/prod/JWT_SECRET" \
  --value "your-secret" \
  --type SecureString

# In app
const JWT_SECRET = await ssm.getParameter({
  Name: '/makeadate/prod/JWT_SECRET',
  WithDecryption: true
}).promise();
```

---

## Quick Reference

### Essential Commands

**Generate JWT Secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Test MongoDB Connection:**
```bash
npm run test:mongodb
```

**Check Environment Variables:**
```bash
# In terminal
printenv | grep -E 'MONGO|JWT|NODE_ENV|PORT'

# In Docker container
docker exec makeadate-api env
```

**Verify Build Configuration:**
```bash
# Frontend
npx nx build frontend --configuration=production --verbose

# Backend
npx nx build api --configuration=production --verbose
```

### Environment Variable Precedence

Priority (highest to lowest):
1. Command-line arguments: `NODE_ENV=production npm start`
2. Shell environment: `export NODE_ENV=production`
3. `.env` file in project root
4. Default values in code

### Common Issues

**Issue: JWT authentication fails**
```
Solution: Ensure JWT_SECRET is the same between builds
```

**Issue: Cannot connect to MongoDB**
```
Solution: Check MONGO_URI format and MongoDB is running
```

**Issue: Frontend can't reach API**
```
Solution: Verify VITE_API_BASE_URL matches your API server
Production API: https://makeadate.onrender.com/api
Local API: http://localhost:3001/api
```

**Issue: Assets not loading on GitHub Pages**
```
Solution: Check VITE_BASE_URL matches your repository name
```

---

## Additional Resources

- **GitHub Actions Documentation:** https://docs.github.com/en/actions
- **GitHub Secrets:** https://docs.github.com/en/actions/security-guides/encrypted-secrets
- **Vite Environment Variables:** https://vitejs.dev/guide/env-and-mode.html
- **NestJS Configuration:** https://docs.nestjs.com/techniques/configuration
- **MongoDB Security:** https://www.mongodb.com/docs/manual/security/

---

## Contact & Support

For questions about environment configuration:
1. Check this documentation
2. Review workflow files in `.github/workflows/`
3. See [DEPLOYMENT_INSTRUCTIONS.md](DEPLOYMENT_INSTRUCTIONS.md)
4. Open an issue on GitHub

---

**Last Updated:** November 7, 2024  
**Project:** MakeADate Full-Stack Dating Platform  
**Documentation Version:** 1.0

