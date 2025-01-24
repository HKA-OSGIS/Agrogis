#!/bin/bash
# Inicia todos los servicios
docker-compose -f geoserver/docker-compose.yml up -d
docker-compose -f postgis/docker-compose.yml up -d
docker-compose -f pgadmin4/docker-compose.yml up -d
