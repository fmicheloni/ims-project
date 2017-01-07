#!/bin/bash

until nc -z -v -w30 $1 27017
do
  echo "Waiting for mongodb connection..."
  sleep 5
done

sleep 30

java -Djava.security.egd=file:/dev/./urandom -jar /app.jar