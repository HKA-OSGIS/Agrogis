#!/bin/bash
# Detiene todos los servicios
docker-compose -f geoserver/docker-compose.yml down
docker-compose -f postgis/docker-compose.yml down
docker-compose -f pgadmin4/docker-compose.yml down
