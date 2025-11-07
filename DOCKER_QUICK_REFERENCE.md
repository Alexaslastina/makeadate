# 🐳 Docker Quick Reference

Quick commands for working with the MakeADate Docker setup.

## 🚀 Getting Started

```bash
# Start everything
npm run docker:run

# Check health
curl http://localhost:3001/api/health

# View logs
npm run docker:logs

# Stop everything
npm run docker:stop
```

## 📦 Building

```bash
# Build API image
npm run docker:build

# Build with no cache
docker build --no-cache -t makeadate-api -f apps/api/Dockerfile .

# Using helper script
./scripts/docker-build.sh
```

## 🏃 Running

```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d api

# Start with rebuild
docker-compose up -d --build

# Start and view logs
docker-compose up
```

## 📊 Monitoring

```bash
# View all logs
docker-compose logs -f

# View API logs
docker-compose logs -f api

# View MongoDB logs
docker-compose logs -f mongodb

# Check status
docker-compose ps

# Check resource usage
docker stats
```

## 🔍 Debugging

```bash
# Enter API container
docker-compose exec api sh

# Enter MongoDB container
docker-compose exec mongodb bash

# MongoDB shell
docker-compose exec mongodb mongosh -u admin -p admin123

# Check health
docker inspect makeadate-api | grep -A 10 Health
```

## 🛑 Stopping

```bash
# Stop services (keep data)
docker-compose down

# Stop and remove volumes (delete data)
docker-compose down -v

# Stop and remove everything
docker-compose down -v --rmi all
```

## 🧹 Cleanup

```bash
# Remove stopped containers
docker-compose rm

# Remove unused images
docker image prune -a

# Remove unused volumes
docker volume prune

# Remove everything
docker system prune -a --volumes
```

## 🧪 Testing

```bash
# Run test suite
./scripts/test-docker-setup.sh

# Test health endpoint
curl http://localhost:3001/api/health

# Test with authentication
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password"}'
```

## 📝 Useful Commands

```bash
# View image details
docker images makeadate-api

# Inspect container
docker inspect makeadate-api

# View container processes
docker top makeadate-api

# Copy file from container
docker cp makeadate-api:/app/package.json ./package.json

# Execute command in container
docker-compose exec api node --version
```

## 🔧 Configuration

```bash
# Environment variables
cp .env.example .env
nano .env

# View compose config
docker-compose config

# Validate compose file
docker-compose config --quiet
```

## 🌐 API Endpoints

```bash
# Health check
curl http://localhost:3001/api/health

# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 🔐 MongoDB Commands

```bash
# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin -p admin123

# Inside MongoDB shell:
show dbs
use makeadate
show collections
db.users.find()
db.users.countDocuments()
```

## 📦 Production

```bash
# Tag for production
docker tag makeadate-api:latest myregistry/makeadate-api:v1.0.0

# Push to registry
docker push myregistry/makeadate-api:v1.0.0

# Pull from registry
docker pull myregistry/makeadate-api:v1.0.0

# Deploy with env file
docker-compose --env-file .env.production up -d
```

## 🆘 Troubleshooting

```bash
# Port already in use
lsof -i :3001
kill -9 <PID>

# Container won't start
docker-compose logs api
docker-compose build --no-cache api
docker-compose up -d api

# MongoDB connection issues
docker-compose logs mongodb
docker-compose exec mongodb mongosh -u admin -p admin123

# Reset everything
docker-compose down -v
docker system prune -a --volumes
npm run docker:build
npm run docker:run
```

## 📚 More Help

- Full documentation: `DOCKER.md`
- API docs: `apps/api/README.md`
- Implementation details: `DOCKER_IMPLEMENTATION_SUMMARY.md`

## ⚡ Keyboard Shortcuts

When viewing logs with `docker-compose logs -f`:
- `Ctrl+C` - Stop following logs
- `Ctrl+Z` - Background the process

When inside container shell:
- `Ctrl+D` or `exit` - Exit the shell
- `Ctrl+C` - Stop current command

---

**Quick Test:**
```bash
npm run docker:run && sleep 10 && curl http://localhost:3001/api/health
```

Expected output:
```json
{"status":"ok","timestamp":"2024-11-07T...","uptime":...}
```

