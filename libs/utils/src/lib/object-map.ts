import { WithId } from './with-id.type';

export class ObjectMap<K extends WithId<unknown>, V> implements Map<K, V> {
  private readonly map = new Map<K['id'], [K, V]>();

  clear(): void {
    this.map.clear();
  }
  delete(key: K): boolean {
    return this.map.delete(key.id);
  }
  forEach(
    callbackfn: (value: V, key: K, map: Map<K, V>) => void,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    thisArg?: any
  ): void {
    for (const [, value] of this.map.entries()) {
      callbackfn.call(thisArg, value[1], value[0], this);
    }
  }
  get(key: K): V | undefined {
    return this.map.get(key.id)?.[1];
  }
  has(key: K): boolean {
    return this.map.has(key.id);
  }
  set(key: K, value: V): this {
    this.map.set(key.id, [key, value]);
    return this;
  }
  get size() {
    return this.map.size;
  }
  entries(): IterableIterator<[K, V]> {
    return this.map.values();
  }
  keys(): IterableIterator<K> {
    // inperformant
    return Array.from(this.map.values())
      .map((value) => value[0])
      .values();
  }
  values(): IterableIterator<V> {
    // inperformant
    return Array.from(this.map.values())
      .map((value) => value[1])
      .values();
  }
  [Symbol.iterator](): IterableIterator<[K, V]> {
    return this.map.values();
  }
  readonly [Symbol.toStringTag] = 'ObjectMap';
}
