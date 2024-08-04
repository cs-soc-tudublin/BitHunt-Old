#!/bin/sh

# Wait for the database to be ready
echo "Waiting for DB to be ready..."
until nc -z db 5432; do
  sleep 1
done
echo "DB is ready."

echo "Serving site"
node build