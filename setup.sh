#!/bin/bash

# First build all the applications
echo "Installing Backend"
npm install --prefix timer-backend/
npm run build --prefix timer-backend/
echo "Installing Poller"
npm install --prefix timer-poller/
npm run build --prefix timer-poller/
echo "Installing Callback"
npm install --prefix timer-callback/
npm install --prefix setup/

# Then create the docker images for them
cd ./timer-backend && docker build -t timers-backend . && cd ..
cd ./timer-poller && docker build -t timers-consumer . && cd ..
cd ./timer-callback && docker build -t timers-callback . && cd ..
cd ./rabbiqmq && docker build -t timers-rabbitmq . && cd ..

# run DockerCompose
echo "docker-compose up "
docker-compose reset
docker-compose up&

sleep 15

# Setup the database
echo "Setup the Database"
node setup/setup.js