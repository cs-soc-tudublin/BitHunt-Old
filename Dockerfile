# Step 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm ci

# Step 2: Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .
RUN npm run build
RUN chmod +x ./start.sh

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --start-interval=5s \
    CMD ["sh", "-c", "wget -q --spider http://127.0.0.1:3000/ || exit 1"]

CMD ["./start.sh"]