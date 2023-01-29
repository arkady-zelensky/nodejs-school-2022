#!/bin/bash
#!/usr/bin/env bash

set -e
set -u

function create_databases() {
	local database=$1
	echo "  Creating user and database '$database'"
	psql --username "$POSTGRES_USER" <<-EOSQL
	    DROP DATABASE IF EXISTS $database;
	    CREATE DATABASE $database;
	    GRANT ALL PRIVILEGES ON DATABASE $database TO $POSTGRES_USER;
EOSQL
}

if [ -n "$POSTGRES_MULTIPLE_DATABASES" ]; then
	echo "Multiple database creation requested: $POSTGRES_MULTIPLE_DATABASES"

	for db in $(echo $POSTGRES_MULTIPLE_DATABASES | tr ',' ' '); do
		create_databases $db
	done
	echo "Multiple databases created"
fi
