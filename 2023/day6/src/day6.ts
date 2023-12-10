import { lines, multiply, range, sum, words } from 'utils';

interface Race {
  time: number;
  distance: number;
}

function parseInput(input: string): Race[] {
  const [times, distances] = lines(input).map((line) =>
    words(line).slice(1).map(Number)
  );
  return times.map((time, i) => ({ time, distance: distances[i] }));
}

export function part1(input: string): number {
  const races = parseInput(input);
  return multiply(races.map(calculateWinningOptions));
}

function calculateWinningOptions({ time, distance }: Race) {
  // example:  x * (7 - x) > 9
  return sum(range(0, time).map((x) => (x * (time - x) > distance ? 1 : 0)));
}

export function part2(input: string): number {
  const [race] = parseInput(input.replace(/ +/g, '').replace(/:/g, ': '));
  return calculateWinningOptions(race);
}
