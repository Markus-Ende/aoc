import { Matrix } from './matrix'; // Import the Matrix class from the appropriate module

describe('Matrix', () => {
  describe('padBorders', () => {
    it('should pad the borders of the matrix with the given value', () => {
      const matrix = new Matrix('12\n34', Number);
      matrix.pad(0);

      expect(matrix.rowSize).toBe(4);
      expect(matrix.columnSize).toBe(4);
      expect(matrix.data).toEqual([
        [0, 0, 0, 0],
        [0, 1, 2, 0],
        [0, 3, 4, 0],
        [0, 0, 0, 0],
      ]);
    });

    it('should pad the borders of an empty matrix with the given value', () => {
      const matrix = new Matrix('', Number);
      matrix.pad(0);

      expect(matrix.rowSize).toBe(2);
      expect(matrix.columnSize).toBe(2);
      expect(matrix.data).toEqual([
        [0, 0],
        [0, 0],
      ]);
    });
  });

  describe('getNeighbors', () => {
    it('should return the correct neighbors for a given position', () => {
      const matrix = new Matrix('123\n456\n789', Number);

      const neighbors = matrix.getNeighbors(1, 1);

      expect(neighbors).toEqual([
        { value: 2, x: 1, y: 0 },
        { value: 6, x: 2, y: 1 },
        { value: 8, x: 1, y: 2 },
        { value: 4, x: 0, y: 1 },
      ]);
    });

    it('should return an empty array if the position is out of bounds', () => {
      const matrix = new Matrix('123\n456\n789', Number);

      const neighbors = matrix.getNeighbors(0, 0);

      expect(neighbors).toEqual([
        { value: 2, x: 1, y: 0 },
        { value: 4, x: 0, y: 1 },
      ]);
    });
  });
});
