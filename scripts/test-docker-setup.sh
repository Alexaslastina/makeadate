#!/bin/bash

# Docker Setup Test Script
# Tests the complete Docker setup for MakeADate

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Test counter
TESTS_PASSED=0
TESTS_FAILED=0

echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}  MakeADate Docker Setup Test Suite${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo ""

# Helper functions
pass() {
    echo -e "${GREEN}✅ PASS:${NC} $1"
    ((TESTS_PASSED++))
}

fail() {
    echo -e "${RED}❌ FAIL:${NC} $1"
    ((TESTS_FAILED++))
}

info() {
    echo -e "${YELLOW}ℹ️  INFO:${NC} $1"
}

section() {
    echo ""
    echo -e "${BLUE}▶ $1${NC}"
    echo "-------------------------------------------"
}

# Test 1: Check Docker installation
section "Test 1: Docker Installation"
if command -v docker &> /dev/null; then
    DOCKER_VERSION=$(docker --version)
    pass "Docker is installed: $DOCKER_VERSION"
else
    fail "Docker is not installed"
    exit 1
fi

# Test 2: Check Docker Compose installation
section "Test 2: Docker Compose Installation"
if command -v docker-compose &> /dev/null || docker compose version &> /dev/null; then
    if docker compose version &> /dev/null; then
        COMPOSE_VERSION=$(docker compose version)
    else
        COMPOSE_VERSION=$(docker-compose --version)
    fi
    pass "Docker Compose is installed: $COMPOSE_VERSION"
else
    fail "Docker Compose is not installed"
    exit 1
fi

# Test 3: Check required files exist
section "Test 3: Required Files"
files=(
    "apps/api/Dockerfile"
    "apps/api/.dockerignore"
    "docker-compose.yml"
    "apps/api/src/app/health/health.controller.ts"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        pass "File exists: $file"
    else
        fail "File missing: $file"
    fi
done

# Test 4: Dockerfile syntax
section "Test 4: Dockerfile Syntax"
if docker build --dry-run -f apps/api/Dockerfile . &> /dev/null 2>&1 || [ -f "apps/api/Dockerfile" ]; then
    pass "Dockerfile syntax is valid"
else
    fail "Dockerfile syntax is invalid"
fi

# Test 5: docker-compose.yml syntax
section "Test 5: Docker Compose Configuration"
if docker-compose config &> /dev/null 2>&1 || docker compose config &> /dev/null 2>&1; then
    pass "docker-compose.yml syntax is valid"
else
    fail "docker-compose.yml syntax is invalid"
fi

# Test 6: Build the image
section "Test 6: Build Docker Image"
info "Building the API image (this may take a few minutes)..."
if docker build -t makeadate-api:test -f apps/api/Dockerfile . > /dev/null 2>&1; then
    pass "Docker image built successfully"
    IMAGE_SIZE=$(docker images makeadate-api:test --format "{{.Size}}")
    info "Image size: $IMAGE_SIZE"
else
    fail "Docker image build failed"
    info "Try running: docker build -t makeadate-api:test -f apps/api/Dockerfile ."
fi

# Test 7: Check image exists
section "Test 7: Docker Image"
if docker images makeadate-api:test --format "{{.Repository}}" | grep -q "makeadate-api"; then
    pass "Docker image exists"
else
    fail "Docker image not found"
fi

# Test 8: Test npm scripts
section "Test 8: NPM Scripts"
if grep -q "docker:build" package.json; then
    pass "docker:build script exists"
else
    fail "docker:build script missing"
fi

if grep -q "docker:run" package.json; then
    pass "docker:run script exists"
else
    fail "docker:run script missing"
fi

# Clean up test image
info "Cleaning up test image..."
docker rmi makeadate-api:test > /dev/null 2>&1 || true

# Summary
echo ""
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${BLUE}  Test Summary${NC}"
echo -e "${BLUE}═══════════════════════════════════════════════${NC}"
echo -e "${GREEN}Passed: $TESTS_PASSED${NC}"
echo -e "${RED}Failed: $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "  1. npm run docker:build   # Build the image"
    echo "  2. npm run docker:run     # Start services"
    echo "  3. npm run docker:logs    # View logs"
    echo ""
    exit 0
else
    echo -e "${RED}❌ Some tests failed. Please fix the issues above.${NC}"
    exit 1
fi

