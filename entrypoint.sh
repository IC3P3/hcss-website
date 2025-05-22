#!/bin/sh

mkdir -p /database

if [ ! -f "/database/website-data.sqlite" ]; then
  echo "Database file not found in /database. Copying default data."
  cp /default/website-data.sqlite /database/
else
  echo "Database file found in /database."
fi

exec "$@"
