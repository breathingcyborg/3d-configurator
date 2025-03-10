#!/bin/bash

CONTAINER_NAME="3d_configurator_temp-mongo_db-1"
DB_NAME="configurator"
MONGO_URI="mongodb://root:password@localhost:27017/?authSource=admin"
DUMP_PATH="./seed_data/mongo_dump"

[ -f "$DUMP_PATH" ] && rm -rf "$DUMP_PATH"

docker exec "$CONTAINER_NAME" mongodump --db "$DB_NAME" --uri="$MONGO_URI" --out /dump

docker cp "$CONTAINER_NAME":/dump "$DUMP_PATH"

docker exec "$CONTAINER_NAME" rm -r /dump

echo "Dump completed."