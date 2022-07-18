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
printf "This program will run npm install in the "
printYellow "/frontend/funstuff"
printf " and the "
printYellow "/backend"
echo " directories"

# installing the frontend
echo "moving to /frontend/funstuff"
cd frontend/funstuff
printf "Currently at:"
printYellow $PWD
echo ""

printGreen "Installing front-end by running "
printYellow "npm install\n"
npm install

echo "moving to /site"
cd ../..
printf "Currently at:"
printYellow $PWD
echo ""

# installing the backend
echo "moving to /backend"
cd backend
printf "Currently at:"
printYellow $PWD
echo ""

printGreen "Installing back-end by running "
printYellow "npm install\n"
npm install

echo "moving to /site"
cd ..
printf "Currently at:"
printYellow $PWD
echo ""

printGreen "Finished install!\n"