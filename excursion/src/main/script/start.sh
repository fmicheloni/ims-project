#!/bin/bash

until nc -z -v -w30 $1 3306
do
  echo "Waiting for database connection..."
  sleep 5
done

java -Djava.security.egd=file:/dev/./urandom -jar /app.jar