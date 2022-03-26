import { track, trigger } from "./effect";

const get = createGetter();
const readonlyGet = createGetter(true);
const set = createSetter();
const readonlySet = createSetter(true);

function createSetter(isReadonly = false) {
  return function (target, key, value) {
    if (isReadonly) {
      console.warn(`readonly can't be setted`);
      return true;
    }
    const res = Reflect.set(target, key, value);
    trigger(target, key, value);
    return res;
  };
}

function createGetter(isReadonly = false) {
  return function (target, key) {
    isReadonly || track(target, key);

    return Reflect.get(target, key);
  };
}

export function mutableHandlers() {
  return {
    get,
    set,
  };
}

export function readonlyHandlers() {
  return {
    get: readonlyGet,
    set: readonlySet,
  };
}
