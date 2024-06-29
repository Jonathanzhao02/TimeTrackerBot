#!/bin/bash
sudo apt-get update
sudo apt-get install -yq build-essential git nodejs npm postgresql
sudo npm install --global yarn
sudo -u postgres psql -c "CREATE USER snowboy WITH SUPERUSER PASSWORD 'password'"

git clone https://github.com/Jonathanzhao02/TimeTrackerBot.git
cd TimeTrackerBot/app
sudo -u postgres psql -f init.sql
yarn install

# Fill in .env manually, then run exec.sh to start
touch .env
