# ========================================
# Build Stage
# ========================================
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./

# Install dependencies
RUN npm ci --legacy-peer-deps

# Copy workspace files
COPY apps/api ./apps/api
COPY apps/api/tsconfig*.json ./apps/api/

# Build the API application
RUN npx nx build api --prod

# ========================================
# Production Stage
# ========================================
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Install production dependencies only
COPY package*.json ./
RUN npm ci --legacy-peer-deps --omit=dev && \
    npm cache clean --force

# Copy built application from builder stage
COPY --from=builder /app/dist/api ./dist/api
COPY --from=builder /app/apps/api/project.json ./apps/api/project.json

# Create a non-root user for security
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nestjs -u 1001 && \
    chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose the API port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node -e "require('http').get('http://localhost:3001/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3001

# Start the application
CMD ["node", "dist/api/main.js"]

