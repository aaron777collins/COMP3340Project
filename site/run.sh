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
printf "This program will run npm start in the "
printYellow "/frontend/funstuff"
printf " and the "
printYellow "/backend"
echo " directories"

# running the backend
echo "moving to /backend"
cd backend
printf "Currently at:"
printYellow $PWD
echo ""

printGreen "Running back-end: "
printYellow "npm start\n"
npm start &
backendPID=$!

echo "moving to /site"
cd ..
printf "Currently at:"
printYellow $PWD
echo ""

printGreen "Running backend in background!\n"
echo "Backend PID: $backendPID"

# running the frontend
echo "moving to /frontend/funstuff"
cd frontend/funstuff
printf "Currently at:"
printYellow $PWD
echo ""

printGreen "Running front-end: "
printYellow "npm start\n"
npm start

echo "moving to /site"
cd ../..
printf "Currently at:"
printYellow $PWD
echo ""

# Kills backend PID when front-end finishes
kill $backendPID
