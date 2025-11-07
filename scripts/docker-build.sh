#!/bin/bash

# Docker Build Script for MakeADate API
# Usage: ./scripts/docker-build.sh [tag]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Default tag
TAG=${1:-latest}
IMAGE_NAME="makeadate-api"

echo -e "${GREEN}🐳 Building Docker image for MakeADate API${NC}"
echo -e "${YELLOW}Image: ${IMAGE_NAME}:${TAG}${NC}"
echo ""

# Check if we're in the project root
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Must run from project root${NC}"
    exit 1
fi

# Check if Dockerfile exists
if [ ! -f "apps/api/Dockerfile" ]; then
    echo -e "${RED}❌ Error: Dockerfile not found at apps/api/Dockerfile${NC}"
    exit 1
fi

# Build the image
echo -e "${GREEN}📦 Building image...${NC}"
docker build -t ${IMAGE_NAME}:${TAG} -f apps/api/Dockerfile .

# Check build status
if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Build successful!${NC}"
    echo ""
    echo -e "${YELLOW}Image Details:${NC}"
    docker images ${IMAGE_NAME}:${TAG}
    echo ""
    echo -e "${YELLOW}Run the container with:${NC}"
    echo "docker run -d -p 3001:3001 --name makeadate-api ${IMAGE_NAME}:${TAG}"
    echo ""
    echo -e "${YELLOW}Or use docker-compose:${NC}"
    echo "docker-compose up -d"
else
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

