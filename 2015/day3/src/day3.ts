import { chars } from 'utils';

export function part1(input: string): number {
  const visited = visitHouses(input);
  return visited.size;
}

function visitHouses(input: string): Set<string> {
  let x = 0;
  let y = 0;
  const visited = new Set<string>();
  chars(input).forEach((char) => {
    switch (char) {
      case '^':
        y++;
        break;
      case 'v':
        y--;
        break;
      case '>':
        x++;
        break;
      case '<':
        x--;
        break;
    }
    visited.add(`${x},${y}`);
  });
  return visited;
}

function mergeSets(set1: Set<string>, set2: Set<string>): Set<string> {
  const mergedSet = new Set<string>(set1);
  set2.forEach((value) => {
    mergedSet.add(value);
  });
  return mergedSet;
}

export function part2(input: string): number {
  const santaInput: string[] = [];
  const roboSantaInput: string[] = [];
  chars(input).forEach((char, index) => {
    if (index % 2 === 0) {
      santaInput.push(char);
    } else {
      roboSantaInput.push(char);
    }
  });
  const santaHouses = visitHouses(santaInput.join(''));
  const roboSantaHouses = visitHouses(roboSantaInput.join(''));

  const mergedHouses = mergeSets(santaHouses, roboSantaHouses);
  return mergedHouses.size;
}
