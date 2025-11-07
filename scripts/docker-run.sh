#!/bin/bash

# Docker Run Script for MakeADate API
# Usage: ./scripts/docker-run.sh

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

IMAGE_NAME="makeadate-api"
CONTAINER_NAME="makeadate-api"

echo -e "${GREEN}🚀 Starting MakeADate API with Docker Compose${NC}"
echo ""

# Check if docker-compose.yml exists
if [ ! -f "docker-compose.yml" ]; then
    echo -e "${RED}❌ Error: docker-compose.yml not found${NC}"
    exit 1
fi

# Start services
echo -e "${YELLOW}Starting services...${NC}"
docker-compose up -d

# Wait for services to be healthy
echo ""
echo -e "${YELLOW}⏳ Waiting for services to be ready...${NC}"
sleep 5

# Check health
echo ""
echo -e "${GREEN}📊 Service Status:${NC}"
docker-compose ps

# Test API health
echo ""
echo -e "${YELLOW}🔍 Testing API health endpoint...${NC}"
sleep 2

if curl -f http://localhost:3001/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API is healthy!${NC}"
    echo ""
    echo -e "${YELLOW}Health Response:${NC}"
    curl -s http://localhost:3001/api/health | json_pp || curl -s http://localhost:3001/api/health
else
    echo -e "${RED}❌ API health check failed${NC}"
    echo -e "${YELLOW}Check logs with: docker-compose logs api${NC}"
fi

echo ""
echo -e "${GREEN}✨ Services are running!${NC}"
echo -e "${YELLOW}API URL: http://localhost:3001/api${NC}"
echo -e "${YELLOW}MongoDB: localhost:27017${NC}"
echo ""
echo -e "${YELLOW}Useful commands:${NC}"
echo "  docker-compose logs -f api          # View API logs"
echo "  docker-compose logs -f mongodb      # View MongoDB logs"
echo "  docker-compose down                 # Stop services"
echo "  docker-compose down -v              # Stop and remove volumes"

