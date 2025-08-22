#!/bin/sh
set -e

# It's a good practice to wait for the database to be ready before running migrations.
# This part of the script should be customized with your database connection details.
# For example, for PostgreSQL, you could use pg_isready.
# echo "Waiting for database to be ready..."
# while ! pg_isready -h $DB_HOST -p $DB_PORT -U $DB_USER; do
#   sleep 1
# done

echo "Running migrations..."
npm run migration:run

echo "Starting application..."
npm run start:prod
