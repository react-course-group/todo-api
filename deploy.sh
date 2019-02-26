#!/bin/bash

ssh root@hvps <<EOSSH
cd /var/www/todo-api

git checkout -- .
git pull origin master

cat <<EOF > docker-compose.override.yml
version: '3'
services:
  app:
    command: 'npm start'
    expose:
      - '5002'
    ports:
      - 5002:80
EOF

docker-compose down
docker-compose up -d
EOSSH