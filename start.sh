#!/bin/sh

# Wait for the database to be ready
echo "Waiting for DB to be ready..."
until nc -z bithunte-db 5432; do
  sleep 1
done
echo "DB is ready."

# Check if the container has been started before. If not, run first start steps.
if [ ! -f ./first-start-fragment ] || grep -q "false" ./first-start-fragment; then
  echo "First start failed, or no previous first start fragment found. Running first start steps."

  echo "Generating Prisma Client"
  npx prisma generate

  # Run Prisma migrations
  echo "Running Prisma migrations..."
  npx prisma migrate deploy

  # If build was successful, write a token to the file system
  if [ $? -eq 0 ]; then
    echo "First Start successful."
    echo "true" > ./first-start-fragment
  else
    echo "First Start failed."
    echo "false" > ./first-start-fragment
  fi
else
  echo "First Start was successful. Skipping first start steps."
fi

# Start the server
echo "Starting server..."
node build