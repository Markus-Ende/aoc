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

    it('should pad the borders of the matrix with the given value and amount', () => {
      const matrix = new Matrix('12\n34', Number);
      matrix.pad(0, 2);

      expect(matrix.rowSize).toBe(6);
      expect(matrix.columnSize).toBe(6);
      expect(matrix.data).toEqual([
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 1, 2, 0, 0],
        [0, 0, 3, 4, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
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
      const matrix = new Matrix(`ABCDE\nFGHIJ\nKLMNO\nPQRST\nUVWXY`);

      // ABCDE
      // FGHIJ
      // KLMNO
      // PQRST
      // UVWXY
      const neighbors = matrix.getNeighbors(2, 2); // M

      expect(neighbors).toEqual([
        { value: 'H', x: 2, y: 1, dx: 0, dy: -1 },
        { value: 'N', x: 3, y: 2, dx: 1, dy: 0 },
        { value: 'R', x: 2, y: 3, dx: 0, dy: 1 },
        { value: 'L', x: 1, y: 2, dx: -1, dy: 0 },
      ]);
    });

    it('should return the correct neighbors including diagonals for a given position', () => {
      const matrix = new Matrix('123\n456\n789', Number);

      const neighbors = matrix.getNeighbors(1, 1, true);

      expect(neighbors).toEqual([
        { value: 2, x: 1, y: 0, dx: 0, dy: -1 },
        { value: 3, x: 2, y: 0, dx: 1, dy: -1 },
        { value: 6, x: 2, y: 1, dx: 1, dy: 0 },
        { value: 9, x: 2, y: 2, dx: 1, dy: 1 },
        { value: 8, x: 1, y: 2, dx: 0, dy: 1 },
        { value: 7, x: 0, y: 2, dx: -1, dy: 1 },
        { value: 4, x: 0, y: 1, dx: -1, dy: 0 },
        { value: 1, x: 0, y: 0, dx: -1, dy: -1 },
      ]);
    });

    it('should return an array with the out of bounds positions', () => {
      const matrix = new Matrix('123\n456\n789', Number);

      const neighbors = matrix.getNeighbors(0, 0);

      expect(neighbors).toEqual([
        { value: 2, x: 1, y: 0, dx: 1, dy: 0 },
        { value: 4, x: 0, y: 1, dx: 0, dy: 1 },
      ]);
    });
  });

  describe('findRow', () => {
    it('should return the index of the first row that satisfies the "some-cells" predicate', () => {
      const matrix = new Matrix('123\n456\n789', Number);
      const index = matrix.findRow('some-cells', (value) => value === 4);

      expect(index).toBe(1);
    });

    it('should return the index of the first row that satisfies the "all-cells" predicate', () => {
      const matrix = new Matrix('123\n456\n789', Number);
      const index = matrix.findRow('all-cells', (value) => value > 4);

      expect(index).toBe(2);
    });

    it('should return undefined if no row satisfies the predicate', () => {
      const matrix = new Matrix('123\n456\n789', Number);
      const index = matrix.findRow('some-cells', (value) => value === 0);

      expect(index).toBeUndefined();
    });
  });

  describe('findColumn', () => {
    it('should return the index of the first column that satisfies the "some-cells" predicate', () => {
      const matrix = new Matrix('0123\n4567\n8910', Number);
      const index = matrix.findColumn('some-cells', (value) => value === 4);

      expect(index).toBe(0);
    });

    it('should return the index of the first column that satisfies the "all-cells" predicate', () => {
      const matrix = new Matrix('23\n56\n89', Number);
      const index = matrix.findColumn('all-cells', (value) =>
        [3, 6, 9].includes(value)
      );

      expect(index).toBe(1);
    });

    it('should return undefined if no column satisfies the predicate', () => {
      const matrix = new Matrix('123\n456\n789', Number);
      const index = matrix.findColumn('some-cells', (value) => value === 0);

      expect(index).toBeUndefined();
    });
  });

  describe('duplicateRow', () => {
    it('should duplicate the specified row and increase the column size', () => {
      const matrix = new Matrix('123\n456\n789', Number);
      matrix.duplicateRow(1);

      expect(matrix.rowSize).toBe(3);
      expect(matrix.columnSize).toBe(4);
      expect(matrix.data).toEqual([
        [1, 2, 3],
        [4, 5, 6],
        [4, 5, 6], // Duplicated row
        [7, 8, 9],
      ]);
    });

    it('should throw an error if the specified row is out of bounds', () => {
      const matrix = new Matrix('123\n456\n789', Number);

      expect(() => matrix.duplicateRow(-1)).toThrow('Out of bounds');
      expect(() => matrix.duplicateRow(3)).toThrow('Out of bounds');
    });
  });

  describe('duplicateColumn', () => {
    it('should duplicate the specified column and increase the row size', () => {
      const matrix = new Matrix('123\n456\n789', Number);
      matrix.duplicateColumn(1);

      expect(matrix.rowSize).toBe(4);
      expect(matrix.columnSize).toBe(3);
      expect(matrix.data).toEqual([
        [1, 2, 2, 3],
        [4, 5, 5, 6],
        [7, 8, 8, 9],
      ]);
    });

    it('should throw an error if the specified column is out of bounds', () => {
      const matrix = new Matrix('123\n456\n789', Number);

      expect(() => matrix.duplicateColumn(-1)).toThrow('Out of bounds');
      expect(() => matrix.duplicateColumn(3)).toThrow('Out of bounds');
    });
  });
});
