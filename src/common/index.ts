export const extend = Object.assign;

export function isObject(raw) {
  return Object.prototype.toString.call(raw) === "[object Object]";
}
