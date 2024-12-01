import { combinations } from './utils';

describe('utils', () => {
  describe('combinations', () => {
    it('should return all combinations of length k', () => {
      const arr = [1, 2, 3, 4];
      const k = 2;
      const expected = [
        [1, 2],
        [1, 3],
        [1, 4],
        [2, 3],
        [2, 4],
        [3, 4],
      ];
      const result = Array.from(combinations(arr, k));
      expect(result).toEqual(expected);
    });

    it('should return an empty array if k is greater than the length of the array', () => {
      const arr = [1, 2, 3];
      const k = 4;
      const expected: number[][] = [];
      const result = Array.from(combinations(arr, k));
      expect(result).toEqual(expected);
    });

    it('should return an empty array if the array is empty', () => {
      const arr: number[] = [];
      const k = 2;
      const expected: number[][] = [];
      const result = Array.from(combinations(arr, k));
      expect(result).toEqual(expected);
    });
  });
});
