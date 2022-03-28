import { extend, isChanged, isObject } from "../common";
import { track, trigger } from "./effect";
import { isProxy, reactive, readonly, STATIC_VAR } from "./reactive";

const get = createGetter();
const readonlyGet = createGetter(true);
const set = createSetter();
const readonlySet = createSetter(true);
const shallowReadonlyGet = createGetter(true, true);

function createSetter(isReadonly = false) {
  return function (target, key, value) {
    if (isReadonly) {
      console.warn(`readonly can't be setted`);
      return true;
    }

    if (isChanged(value, Reflect.get(target, key))) {
      const res = Reflect.set(target, key, value);
      trigger(target, key, value);
      return res;
    }
    return true;
  };
}

function createGetter(isReadonly = false, isShallow = false) {
  return function (target, key) {
    if (key === STATIC_VAR.IS_REACTIVE) return !isReadonly;
    if (key === STATIC_VAR.IS_READONLY) return isReadonly;

    // 收集依赖
    isReadonly || track(target, key);

    const res = Reflect.get(target, key);

    if (isShallow) {
      return res;
    }

    // 判断是否需要嵌套
    if (isObject(res) && !isProxy(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }

    // 增加完嵌套后再返回
    return res;
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

export function shallowReadonlyHandlers() {
  return extend(readonlyHandlers(), {
    get: shallowReadonlyGet,
  });
}
