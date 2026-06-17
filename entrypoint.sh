#!/bin/sh
set -e

mkdir -p /data

echo "Applying database migrations..."
node /app/migrate.mjs

echo "Running production seed..."
node /app/seed-production.mjs

echo "Starting application..."
exec "$@"
