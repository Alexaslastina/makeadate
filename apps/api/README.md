# MakeADate API

NestJS backend API for the MakeADate application.

## 🐳 Docker Setup

### Building the Docker Image

```bash
# Build from the project root
docker build -t makeadate-api -f apps/api/Dockerfile .
```

### Running with Docker Compose

```bash
# Start all services (MongoDB + API)
docker-compose up -d

# View logs
docker-compose logs -f api

# Stop services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### Running the Docker Image Standalone

```bash
# Run the API container
docker run -d \
  --name makeadate-api \
  -p 3001:3001 \
  -e MONGO_URI="mongodb://host.docker.internal:27017/makeadate" \
  -e JWT_SECRET="your-secret-key" \
  makeadate-api

# View logs
docker logs -f makeadate-api

# Stop container
docker stop makeadate-api
docker rm makeadate-api
```

## 📝 Environment Variables

Create a `.env` file in the project root with:

```env
MONGO_URI=mongodb://localhost:27017/makeadate
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=24h
PORT=3001
NODE_ENV=development
```

## 🚀 Local Development

```bash
# Install dependencies
npm install

# Start the API in development mode
npm run start:api

# The API will be available at http://localhost:3001/api
```

## 🔍 Health Check

The API includes a health check endpoint:

```bash
# Check API health
curl http://localhost:3001/api/health

# Expected response:
# {
#   "status": "ok",
#   "timestamp": "2024-01-01T00:00:00.000Z",
#   "uptime": 123.456
# }
```

## 📚 API Endpoints

- `GET /api/health` - Health check endpoint
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `GET /api/users` - Get all users (protected)

## 🏗️ Project Structure

```
apps/api/
├── src/
│   ├── app/
│   │   ├── auth/          # Authentication module
│   │   ├── health/        # Health check controller
│   │   ├── logger/        # Custom logger
│   │   ├── users/         # Users module
│   │   └── app.module.ts  # Root module
│   └── main.ts            # Application entry point
├── Dockerfile             # Multi-stage Docker build
├── .dockerignore          # Docker ignore patterns
├── project.json           # Nx project configuration
└── README.md             # This file
```

## 🔧 Dockerfile Features

- **Multi-stage build** - Optimized for production
- **Security** - Non-root user (nestjs:nodejs)
- **Health checks** - Built-in Docker health monitoring
- **Cache optimization** - Efficient layer caching
- **Small image size** - Alpine-based Node.js image

## 🛠️ Troubleshooting

### MongoDB Connection Issues

If you're having trouble connecting to MongoDB:

```bash
# Test MongoDB connection
docker-compose exec mongodb mongosh -u admin -p admin123

# Check MongoDB logs
docker-compose logs mongodb
```

### API Not Starting

```bash
# Check API logs
docker-compose logs api

# Rebuild the API image
docker-compose build --no-cache api
docker-compose up -d api
```

### Port Already in Use

```bash
# Find process using port 3001
lsof -i :3001

# Kill the process
kill -9 <PID>
```

## 📦 Building for Production

```bash
# Build the production image
docker build -t makeadate-api:latest -f apps/api/Dockerfile .

# Tag for registry
docker tag makeadate-api:latest your-registry/makeadate-api:latest

# Push to registry
docker push your-registry/makeadate-api:latest
```

## 🔐 Security Notes

1. Always change default credentials in production
2. Use strong JWT secrets
3. Enable HTTPS in production
4. Keep dependencies updated
5. Use environment-specific configuration

## 📖 Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Docker Documentation](https://docs.docker.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Nx Documentation](https://nx.dev/)

