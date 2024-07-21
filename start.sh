#!/bin/sh

# Wait for the database to be ready
echo "Waiting for DB to be ready..."
until nc -z db 5432; do
  sleep 1
done
echo "DB is ready."

echo "Generating Prisma Client"
npx prisma generate

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

echo "Building Site"
npm run build

echo "Serving site"
node build