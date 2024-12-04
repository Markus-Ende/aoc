import { stringMatrix } from 'utils';

export function part1(input: string): number {
  const matrix = stringMatrix(input).pad('.', 3);

  let count = 0;

  for (let x = 3; x < matrix.rowSize - 3; x++) {
    for (let y = 3; y < matrix.columnSize - 3; y++) {
      const xEntry = matrix.getEntry(x, y);

      if (xEntry.value !== 'X') {
        continue;
      }

      const potentialMs = matrix.findAllNeighbors(
        xEntry,
        (m) => {
          const deltaX = m.x - xEntry.x;
          const deltaY = m.y - xEntry.y;

          return (
            m.value === 'M' &&
            matrix.hasNeighbor(
              m,
              (a) => {
                return (
                  a.value === 'A' &&
                  a.x - m.x === deltaX &&
                  a.y - m.y === deltaY &&
                  matrix.hasNeighbor(
                    a,
                    (s) => {
                      return (
                        s.value === 'S' &&
                        s.x - a.x === deltaX &&
                        s.y - a.y === deltaY
                      );
                    },
                    false,
                    true
                  )
                );
              },
              false,
              true
            )
          );
        },
        false,
        true
      );

      count += potentialMs.length;
    }
  }
  return count;
}

export function part2(input: string): number {
  const matrix = stringMatrix(input).pad('.', 1);

  let count = 0;

  for (let x = 1; x < matrix.rowSize - 1; x++) {
    for (let y = 1; y < matrix.columnSize - 1; y++) {
      const a = matrix.getEntry(x, y);

      if (a.value !== 'A') {
        continue;
      }

      const [, topRight, , bottomRight, , bottomLeft, , topLeft] =
        matrix.getNeighbors(x, y, true);

      if (
        (bottomLeft.value === 'M' &&
          topRight.value === 'S' &&
          topLeft.value === 'M' &&
          bottomRight.value === 'S') ||
        (bottomLeft.value === 'S' &&
          topRight.value === 'M' &&
          topLeft.value === 'M' &&
          bottomRight.value === 'S') ||
        (bottomLeft.value === 'S' &&
          topRight.value === 'M' &&
          topLeft.value === 'S' &&
          bottomRight.value === 'M') ||
        (bottomLeft.value === 'M' &&
          topRight.value === 'S' &&
          topLeft.value === 'S' &&
          bottomRight.value === 'M')
      ) {
        count++;
      }
    }
  }
  return count;
}
