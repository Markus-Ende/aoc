import { stringMatrix, ObjectSet, Matrix } from 'utils';

type Direction = number;
const directions = ['^', '>', 'v', '<'];

export function part1(input: string): number {
  const map = stringMatrix(input).pad('x', 1);
  const { visited } = getVisited(map);

  return visited.size;
}

export function getVisited(map: Matrix<string>): {
  visited: ObjectSet<{ id: `${number},${number}` }>;
  visitedWithDirection: ObjectSet<{ id: `${number},${number},${Direction}` }>;
  isLoop: boolean;
} {
  const visited = new ObjectSet<{ id: `${number},${number}` }>();
  const visitedWithDirection = new ObjectSet<{
    id: `${number},${number},${Direction}`;
  }>();
  const start = map.find((value) => directions.includes(value));
  if (start === undefined) {
    throw new Error('No starting point found.');
  }

  map.set(start.x, start.y, '.');

  let direction = directions.indexOf(start.value);
  let x = start.x;
  let y = start.y;
  visited.add({ id: `${x},${y}` });
  visitedWithDirection.add({ id: `${x},${y},${direction}` });

  const maxTries = 9999999;
  let i = 0;
  while (i < maxTries) {
    i++;
    const nextX = direction === 1 ? x + 1 : direction === 3 ? x - 1 : x;
    const nextY = direction === 0 ? y - 1 : direction === 2 ? y + 1 : y;
    if (map.get(nextX, nextY) === 'x') {
      return { visited, visitedWithDirection, isLoop: false };
    } else if (map.get(nextX, nextY) === '#') {
      direction = (direction + 1) % directions.length;
    } else {
      x = nextX;
      y = nextY;
      if (visitedWithDirection.has({ id: `${x},${y},${direction}` })) {
        // loop detected
        return { visited, visitedWithDirection, isLoop: true };
      }
      visited.add({ id: `${x},${y}` });
      visitedWithDirection.add({ id: `${x},${y},${direction}` });
    }
  }

  return { visited, visitedWithDirection, isLoop: false };
}

export function part2(input: string): number {
  const map = stringMatrix(input).pad('x', 1);
  const { visitedWithDirection } = getVisited(map);
  const checked = new ObjectSet<{ id: `${number},${number}` }>();
  let count = 0;
  Array.from(visitedWithDirection.values()).forEach((position) => {
    const [x, y, direction] = position.id.split(',').map(Number);
    const nextX = direction === 1 ? x + 1 : direction === 3 ? x - 1 : x;
    const nextY = direction === 0 ? y - 1 : direction === 2 ? y + 1 : y;
    if (checked.has({ id: `${nextX},${nextY}` })) {
      return;
    }
    checked.add({ id: `${nextX},${nextY}` });
    // checked.add({ id: `${nextX},${nextY}` });
    if (map.get(nextX, nextY) === '.') {
      const changedMap = stringMatrix(input).pad('x', 1);
      if (directions.includes(changedMap.get(nextX, nextY))) {
        return;
      }
      changedMap.set(nextX, nextY, '#');
      if (getVisited(changedMap).isLoop) {
        count++;
      }
    }
  });
  return count;
}
