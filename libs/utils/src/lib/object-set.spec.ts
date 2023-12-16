import { ObjectSet } from './object-set';

describe('ObjectSet', () => {
  let objectSet: ObjectSet<{ id: string }>;

  beforeEach(() => {
    objectSet = new ObjectSet();
  });

  test('should add an object to the set', () => {
    const obj = { id: '1' };
    objectSet.add(obj);
    expect(objectSet.has(obj)).toBe(true);
  });

  test('should delete an object from the set', () => {
    const obj = { id: '1' };
    objectSet.add(obj);
    objectSet.delete(obj);
    expect(objectSet.has(obj)).toBe(false);
  });

  test('should clear the set', () => {
    const obj1 = { id: '1' };
    const obj2 = { id: '2' };
    objectSet.add(obj1);
    objectSet.add(obj2);
    objectSet.clear();
    expect(objectSet.size).toBe(0);
  });

  test('should return the correct size of the set', () => {
    const obj1 = { id: '1' };
    const obj2 = { id: '2' };
    objectSet.add(obj1);
    objectSet.add(obj2);
    expect(objectSet.size).toBe(2);
  });

  test('should return an iterator of keys', () => {
    const obj1 = { id: '1' };
    const obj2 = { id: '2' };
    objectSet.add(obj1);
    objectSet.add(obj2);
    const keys = Array.from(objectSet.keys());
    expect(keys).toEqual([obj1, obj2]);
  });

  test('should invoke the callback function for each value', () => {
    const obj1 = { id: '1' };
    const obj2 = { id: '2' };
    objectSet.add(obj1);
    objectSet.add(obj2);
    const callbackFn = jest.fn();
    objectSet.forEach(callbackFn);
    expect(callbackFn).toHaveBeenCalledTimes(2);
    expect(callbackFn).toHaveBeenCalledWith(obj1, obj1, objectSet);
    expect(callbackFn).toHaveBeenCalledWith(obj2, obj2, objectSet);
  });
});
