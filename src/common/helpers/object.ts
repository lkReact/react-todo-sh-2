export function hasOwnProperty(obj: object, key: string) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}

export function getPropertyValue(obj: object, key: string) {
  return Object.getOwnPropertyDescriptor(obj, key)?.value ?? null;
}

export function Clone<T = object | Array<unknown>>(objet: T): T {
  return JSON.parse(JSON.stringify(objet));
}
