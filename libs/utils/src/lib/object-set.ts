import { WithId } from './with-id.type';

/* eslint-disable @typescript-eslint/no-unused-vars */
export class ObjectSet<T extends WithId<unknown>> implements Set<T> {
  private readonly map = new Map<T['id'], T>();

  add(value: T): this {
    this.map.set(value.id, value);
    return this;
  }
  clear(): void {
    this.map.clear();
  }
  delete(value: T): boolean {
    return this.map.delete(value.id);
  }

  forEach(
    callbackfn: (value: T, value2: T, set: Set<T>) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any
  ): void {
    for (const value of this.map.values()) {
      callbackfn.call(thisArg, value, value, this);
    }
  }
  has(value: T): boolean {
    return this.map.has(value.id);
  }
  get size() {
    return this.map.size;
  }
  entries(): IterableIterator<[T, T]> {
    throw new Error('Method not implemented.');
  }
  keys(): IterableIterator<T> {
    return this.map.values();
  }
  values(): IterableIterator<T> {
    return this.map.values();
  }
  [Symbol.iterator](): IterableIterator<T> {
    return this.map.values();
  }
  readonly [Symbol.toStringTag] = 'ObjectSet';
}
