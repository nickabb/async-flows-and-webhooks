#!/bin/bash
set -o allexport; source .env; set +o allexport;
PG_PASSWORD=$PG_PASSWORD docker exec -it postgres psql -U adonis -d adonis_app
