import { ObjectMap } from './object-map';

describe('ObjectMap', () => {
  let objectMap: ObjectMap<{ id: string }, number>;

  beforeEach(() => {
    objectMap = new ObjectMap();
  });

  test('should set and get values correctly', () => {
    const key = { id: 'key' };
    const value = 42;

    objectMap.set(key, value);

    expect(objectMap.get(key)).toBe(value);
  });

  test('should return undefined for non-existing key', () => {
    const key = { id: 'non-existing-key' };

    expect(objectMap.get(key)).toBeUndefined();
  });

  test('should check if key exists correctly', () => {
    const key = { id: 'key' };

    objectMap.set(key, 42);

    expect(objectMap.has(key)).toBe(true);
  });

  test('should delete key correctly', () => {
    const key = { id: 'key' };

    objectMap.set(key, 42);
    objectMap.delete(key);

    expect(objectMap.has(key)).toBe(false);
  });

  test('should clear all keys', () => {
    const key1 = { id: 'key1' };
    const key2 = { id: 'key2' };

    objectMap.set(key1, 42);
    objectMap.set(key2, 24);
    objectMap.clear();

    expect(objectMap.size).toBe(0);
  });

  test('should iterate over entries correctly', () => {
    const key1 = { id: 'key1' };
    const key2 = { id: 'key2' };
    const value1 = 42;
    const value2 = 24;

    objectMap.set(key1, value1);
    objectMap.set(key2, value2);

    const entries = Array.from(objectMap.entries());

    expect(entries).toEqual([
      [key1, value1],
      [key2, value2],
    ]);
  });

  test('should iterate over keys correctly', () => {
    const key1 = { id: 'key1' };
    const key2 = { id: 'key2' };

    objectMap.set(key1, 42);
    objectMap.set(key2, 24);

    const keys = Array.from(objectMap.keys());

    expect(keys).toEqual([key1, key2]);
  });

  test('should iterate over values correctly', () => {
    const key1 = { id: 'key1' };
    const key2 = { id: 'key2' };
    const value1 = 42;
    const value2 = 24;

    objectMap.set(key1, value1);
    objectMap.set(key2, value2);

    const values = Array.from(objectMap.values());

    expect(values).toEqual([value1, value2]);
  });
});
