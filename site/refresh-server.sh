#!/bin/bash

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m'

printGreen () {
   printf "${GREEN}$1${NC}"
}

printRed () {
   printf "${RED}$1${NC}"
}

printYellow () {
   printf "${YELLOW}$1${NC}"
}

# Functions to print colors

# Intro
printGreen "Running "
printYellow "git pull"
echo "to get the newest info"
cd ..
git pull
cd site

printf "Running "
printYellow "npm run build"
printf " in "
printYellow "/frontend/funstuff"
printf "and then "
printYellow "systemctl restart frontendWebServer"
printf " and "
printYellow "systemctl restart backendWebServer"
echo " to reload the services"

# moving to frontend
echo "moving to /frontend/funstuff"
cd frontend/funstuff
printf "Currently at:"
printYellow $PWD
echo ""

# Building frontend
printGreen "Building front-end (production): "
printYellow "npm run build\n"
npm run build

# Moving to site
echo "moving to /site"
cd ../..
printf "Currently at:"
printYellow $PWD
echo ""

# moving to backend
echo "moving to /backend"
cd backend
printf "Currently at:"
printYellow $PWD
echo ""

# Building backend
printGreen "Building backend: "
printYellow "npm run build\n"
npm run build

# Moving to site
echo "moving to /site"
cd ..
printf "Currently at:"
printYellow $PWD
echo ""

# Restarting backend
printGreen "Restarting backend: "
printYellow "systemctl restart backendWebServer\n"
systemctl restart backendWebServer

# Restarting frontend
printGreen "Restarting frontend: "
printYellow "systemctl restart frontendWebServer\n"
systemctl restart frontendWebServer


