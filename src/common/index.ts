export const extend = Object.assign;

export function isObject(raw) {
  return Object.prototype.toString.call(raw) === "[object Object]";
}

export function isChanged(a, b) {
  return !Object.is(a, b);
}
