# 🐳 Docker Setup Guide for MakeADate

This guide covers the complete Docker setup for the MakeADate application, including the API and MongoDB database.

## 📋 Prerequisites

- Docker (v20.10 or higher)
- Docker Compose (v2.0 or higher)
- Git

## 🏗️ Architecture

The Docker setup includes:

- **API Service**: NestJS backend application (Port 3001)
- **MongoDB**: Database service (Port 27017)
- **Network**: Bridge network for service communication
- **Volumes**: Persistent storage for MongoDB data

## 🚀 Quick Start

### 1. Build and Run All Services

```bash
# Using npm scripts
npm run docker:run

# Or using docker-compose directly
docker-compose up -d
```

### 2. Check Service Status

```bash
docker-compose ps
```

### 3. View Logs

```bash
# All services
npm run docker:logs

# Specific service
docker-compose logs -f api
docker-compose logs -f mongodb
```

### 4. Test the API

```bash
# Health check
curl http://localhost:3001/api/health

# Expected response:
# {
#   "status": "ok",
#   "timestamp": "2024-01-01T00:00:00.000Z",
#   "uptime": 123.456
# }
```

### 5. Stop Services

```bash
# Stop (preserves data)
npm run docker:stop

# Stop and remove volumes (deletes data)
npm run docker:clean
```

## 📦 Building the API Image

### Using npm Script

```bash
npm run docker:build
```

### Using Docker Directly

```bash
docker build -t makeadate-api -f apps/api/Dockerfile .
```

### Using the Build Script

```bash
./scripts/docker-build.sh [tag]
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the project root (use `.env.example` as template):

```env
# MongoDB Configuration
MONGO_URI=mongodb://admin:admin123@mongodb:27017/makeadate?authSource=admin

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-in-production
JWT_EXPIRES_IN=24h

# API Configuration
PORT=3001
NODE_ENV=production
```

### Docker Compose Configuration

The `docker-compose.yml` file includes:

```yaml
services:
  mongodb:    # MongoDB v7.0 with health checks
  api:        # NestJS API with health checks
  # frontend: # (Optional) React frontend
```

## 🏃 Running Services

### All Services

```bash
docker-compose up -d
```

### Individual Services

```bash
# Start only MongoDB
docker-compose up -d mongodb

# Start only API (requires MongoDB)
docker-compose up -d api
```

### With Rebuild

```bash
# Rebuild and start
docker-compose up -d --build

# Rebuild specific service
docker-compose up -d --build api
```

## 📊 Monitoring

### Service Status

```bash
docker-compose ps
```

### Container Logs

```bash
# Follow all logs
docker-compose logs -f

# Follow specific service
docker-compose logs -f api

# Last 100 lines
docker-compose logs --tail=100 api
```

### Resource Usage

```bash
# Check container stats
docker stats

# Check specific container
docker stats makeadate-api
```

### Health Checks

```bash
# API health
curl http://localhost:3001/api/health

# MongoDB health (from inside container)
docker-compose exec mongodb mongosh -u admin -p admin123 --eval "db.adminCommand('ping')"
```

## 🔍 Debugging

### Access Container Shell

```bash
# API container
docker-compose exec api sh

# MongoDB container
docker-compose exec mongodb bash
```

### MongoDB Shell

```bash
# Connect to MongoDB
docker-compose exec mongodb mongosh -u admin -p admin123

# From MongoDB shell:
show dbs
use makeadate
show collections
db.users.find()
```

### Inspect Logs

```bash
# API logs with timestamps
docker-compose logs -f --timestamps api

# Filter logs
docker-compose logs api | grep ERROR
```

### Rebuild from Scratch

```bash
# Stop and remove everything
docker-compose down -v

# Remove images
docker rmi makeadate-api

# Rebuild
docker-compose build --no-cache
docker-compose up -d
```

## 🐛 Common Issues

### Port Already in Use

```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>

# Or change port in docker-compose.yml
ports:
  - "3002:3001"  # Use port 3002 instead
```

### MongoDB Connection Failed

```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check MongoDB logs
docker-compose logs mongodb

# Verify connection string in .env
MONGO_URI=mongodb://admin:admin123@mongodb:27017/makeadate?authSource=admin
```

### API Not Starting

```bash
# Check API logs
docker-compose logs api

# Rebuild API image
docker-compose build --no-cache api
docker-compose up -d api

# Check if MongoDB is healthy
docker-compose ps
```

### Container Keeps Restarting

```bash
# Check logs for errors
docker-compose logs --tail=50 api

# Check health status
docker inspect makeadate-api | grep -A 10 Health

# Disable health check temporarily
# Comment out healthcheck section in docker-compose.yml
```

## 🔐 Security Best Practices

### Production Checklist

- [ ] Change default MongoDB credentials
- [ ] Use strong JWT_SECRET
- [ ] Enable HTTPS/TLS
- [ ] Use Docker secrets for sensitive data
- [ ] Run containers as non-root user (already configured)
- [ ] Keep images updated
- [ ] Scan images for vulnerabilities
- [ ] Use .env file for environment-specific config
- [ ] Don't commit .env files to Git

### Secure MongoDB

```yaml
environment:
  MONGO_INITDB_ROOT_USERNAME: ${MONGO_USER}
  MONGO_INITDB_ROOT_PASSWORD: ${MONGO_PASSWORD}
```

### Use Docker Secrets

```bash
# Create secrets
echo "my-secret-jwt-key" | docker secret create jwt_secret -

# Use in docker-compose.yml
secrets:
  - jwt_secret
```

## 📈 Production Deployment

### Build for Production

```bash
# Build optimized image
docker build -t makeadate-api:latest -f apps/api/Dockerfile .

# Tag for registry
docker tag makeadate-api:latest your-registry.com/makeadate-api:latest

# Push to registry
docker push your-registry.com/makeadate-api:latest
```

### Deploy with Docker Swarm

```bash
# Initialize swarm
docker swarm init

# Deploy stack
docker stack deploy -c docker-compose.yml makeadate

# Check services
docker service ls
```

### Deploy with Kubernetes

```bash
# Convert docker-compose to k8s
kompose convert -f docker-compose.yml

# Apply to cluster
kubectl apply -f .
```

## 🧪 Testing

### Test API Endpoints

```bash
# Register user
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123","name":"Test User"}'

# Login
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

### Load Testing

```bash
# Using Apache Bench
ab -n 1000 -c 10 http://localhost:3001/api/health

# Using hey
hey -n 1000 -c 10 http://localhost:3001/api/health
```

## 📚 Useful Commands

```bash
# Remove stopped containers
docker-compose rm

# Remove all unused images
docker image prune -a

# Remove all unused volumes
docker volume prune

# View image layers
docker history makeadate-api

# Export container filesystem
docker export makeadate-api > api.tar

# Check image size
docker images makeadate-api

# Inspect container
docker inspect makeadate-api
```

## 📖 Additional Resources

- [Docker Documentation](https://docs.docker.com/)
- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [NestJS Docker Guide](https://docs.nestjs.com/recipes/docker)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [Best Practices for Writing Dockerfiles](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)

## 🤝 Contributing

When adding new Docker configurations:

1. Test locally with `docker-compose up`
2. Verify health checks work
3. Update this documentation
4. Add new environment variables to `.env.example`
5. Test build in clean environment

## 📝 Notes

- The API uses port 3001 (configurable via PORT env var)
- MongoDB uses port 27017 (standard MongoDB port)
- Health checks are configured for both services
- Data persists in Docker volumes
- Services restart automatically unless stopped
- The API runs as non-root user for security

## 🆘 Getting Help

If you encounter issues:

1. Check the logs: `docker-compose logs -f`
2. Verify environment variables in `.env`
3. Ensure ports are not in use: `lsof -i :3001`
4. Try rebuilding: `docker-compose build --no-cache`
5. Check Docker status: `docker system info`

For more help, see the API README at `apps/api/README.md`.

