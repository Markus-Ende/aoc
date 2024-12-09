import { chars, numbers, sum } from 'utils';

const EMPTY = -1;

export function part1(input: string): number {
  const blocks: number[] = [];
  let currentId = 0;
  chars(input).forEach((c, i) => {
    if (i % 2 === 0) {
      blocks.push(
        ...Array.from({ length: Number(c) }, () =>
          i % 2 === 0 ? currentId : EMPTY
        )
      );
      currentId++;
    } else {
      blocks.push(...Array.from({ length: Number(c) }, () => EMPTY));
    }
  });

  let emptyPointer = blocks.findIndex((v) => v === EMPTY);
  let blockPointer = blocks.length - 1;
  while (emptyPointer <= blockPointer) {
    blocks[emptyPointer] = blocks[blockPointer];
    blocks[blockPointer] = EMPTY;
    while (blocks[emptyPointer] !== EMPTY) {
      emptyPointer++;
    }
    blockPointer--;
  }

  console.log(blocks);

  return sum(blocks.map((b, i) => (b === EMPTY ? 0 : b * i)));
}

export function part2(input: string): number {
  const blocks: number[] = [];
  let currentId = 0;
  chars(input).forEach((c, i) => {
    if (i % 2 === 0) {
      blocks.push(
        ...Array.from({ length: Number(c) }, () =>
          i % 2 === 0 ? currentId : EMPTY
        )
      );
      currentId++;
    } else {
      blocks.push(...Array.from({ length: Number(c) }, () => EMPTY));
    }
  });

  const emptyMap = new Map<number, number>();
  let currentEmptyStart = -1;
  let pointer = 0;
  for (let i = 0; i < blocks.length; i++) {
    if (blocks[pointer] === EMPTY) {
      if (currentEmptyStart === -1) {
        currentEmptyStart = pointer;
      }
      emptyMap.set(
        currentEmptyStart,
        (emptyMap.get(currentEmptyStart) || 0) + 1
      );
    } else {
      currentEmptyStart = -1;
    }
    pointer++;
  }

  console.log(emptyMap);

  let currentFile = blocks[blocks.length - 1];

  while (currentFile >= 0) {
    const currentFileStartPointer = blocks.indexOf(currentFile);
    const currentFileEndPointer = blocks.lastIndexOf(currentFile);
    const currentFileLength =
      currentFileEndPointer - currentFileStartPointer + 1;
    // console.log({
    //   currentFile,
    //   currentFileStartPointer,
    //   currentFileEndPointer,
    //   currentFileLength,
    // });
    const freeEntry = Array.from(emptyMap.entries())
      .sort((a, b) => a[0] - b[0])
      .find(([, freeAmount]) => freeAmount >= currentFileLength);
    if (freeEntry) {
      // console.log('moving', currentFile);

      for (let i = 0; i < currentFileLength; i++) {
        blocks[freeEntry[0] + i] = currentFile;
        blocks[currentFileStartPointer + i] = EMPTY;
      }
      emptyMap.delete(freeEntry[0]);
      emptyMap.set(
        freeEntry[0] + currentFileLength,
        freeEntry[1] - currentFileLength
      );
      // console.log(blocks);
    }

    currentFile--;
  }

  // 8666607636406 too high
  return sum(blocks.map((b, i) => (b === EMPTY ? 0 : b * i)));
}
