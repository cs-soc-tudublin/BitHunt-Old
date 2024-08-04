# Step 1: Build stage
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --force
COPY . .

# Step 2: Production stage
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app .
RUN npm run build
COPY start.sh start.sh
RUN chmod +x start.sh
CMD ["./start.sh"]
