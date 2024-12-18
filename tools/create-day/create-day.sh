#!/bin/bash

git pull --rebase

GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo
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

current_year=$(date +%Y)
current_day=$(date +%-d)


# Prompt for project name
read -p "Enter year: (default $current_year)" year
year=${year:-$current_year}

read -p "Enter day: (default $current_day)" day
day=${day:-$current_day}

# Create a new nx project
npx nx generate @nx/node:application --name=day-$year-$day --directory=year$year/day$day --e2eTestRunner=none --projectNameAndRootFormat=as-provided --no-interactive

cp -r tools/create-day/templates/* year$year/day$day/src
mv year$year/day$day/src/day.ts year$year/day$day/src/day$day.ts
mv year$year/day$day/src/day.spec.ts year$year/day$day/src/day$day.spec.ts

# Replace occurrences of {{year}} with $year and {{day}} with $day in the copied files
sed -i "s/{{year}}/$year/g" year$year/day$day/src/*.*
sed -i "s/{{day}}/$day/g" year$year/day$day/src/*.*

touch input/$year-day$day.txt
touch input/$year-day$day-example.txt

echo Project for day $day of year $year created.
echo -e Go to ${BLUE}https://adventofcode.com/$year/day/$day/input${NC} and add your input to ${BLUE}input/$year-day$day.txt${NC}
echo -e Go to ${BLUE}https://adventofcode.com/$year/day/$day${NC} and add your example input to ${BLUE}input/$year-day$day-example.txt${NC}
echo -e Then open ${BLUE}year$year/day$day/src/day$day.spec.ts${NC} and start solving the puzzle: run ${BLUE}npm run test:watch${NC}