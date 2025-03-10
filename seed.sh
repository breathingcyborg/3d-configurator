#!/bin/bash

CONTAINER_NAME="3d_configurator_temp-mongo_db-1"
DB_NAME="configurator"
MONGO_URI="mongodb://root:password@localhost:27017/?authSource=admin"
DUMP_PATH="./seed_data/mongo_dump"
UPLOADS_SEED_PATH="./seed_data/uploads/"
UPLOADS_PATH="./configurator_backend/public/uploads"

[ -d "$UPLOADS_PATH" ] && rm -rf "$UPLOADS_PATH"

cp -r "$UPLOADS_SEED_PATH" "$UPLOADS_PATH"

echo "Files Seeded"

docker cp "$DUMP_PATH" "$CONTAINER_NAME":/dump
docker exec "$CONTAINER_NAME" mongorestore --db "$DB_NAME" --uri="$MONGO_URI" /dump/"$DB_NAME"

echo "Database Seeded."
