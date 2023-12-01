#!/bin/bash

# Check if the nx command is available
if ! command -v nx &> /dev/null; then
    echo "Error: nx command not found. Please make sure you have nx installed."
    exit 1
fi

# Prompt for project name
read -p "Enter year: " year
read -p "Enter day: " day
 
# Create a new nx project
npx nx generate @nx/node:application --name=day-$year-$day --directory=$year/day$day --e2eTestRunner=none --projectNameAndRootFormat=as-provided --no-interactive

touch input/$year-day$day.txt
echo add input to input/$year-day$day.txt