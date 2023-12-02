#!/bin/bash


GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}   ^   "
echo -e "  ^^^  "
echo -e " ^^^^^ "
echo -e "^^^^^^^${NC}"
echo -e "${YELLOW}   |   ${NC}"
echo

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

cp -r tools/create-day/templates/* $year/day$day/src
mv $year/day$day/src/day.ts $year/day$day/src/day$day.ts
mv $year/day$day/src/day.spec.ts $year/day$day/src/day$day.spec.ts

# Replace occurrences of {{year}} with $year and {{day}} with $day in the copied files
sed -i "s/{{year}}/$year/g" $year/day$day/src/*.*
sed -i "s/{{day}}/$day/g" $year/day$day/src/*.*

touch input/$year-day$day.txt
echo add input to input/$year-day$day.txt