import { isChanged, isObject } from "../common";
import { collectDeps, ReactiveEffect, triggerDeps } from "./effect";
import { isProxy, reactive } from "./reactive";

class RefImp {
  private _value;
  public deps: Set<ReactiveEffect> = new Set();

  constructor(value) {
    this._value = value;
  }

  get value() {
    collectDeps(this.deps);
    if (isObject(this._value) && !isProxy(this._value)) {
      return reactive(this._value);
    }
    return this._value;
  }

  set value(newValue) {
    if (isChanged(newValue, this._value)) {
      this._value = newValue;
      triggerDeps(this.deps);
    }
  }
}

export function ref(value) {
  const refImp = new RefImp(value);

  // 似乎可以用下面的方式直接就能完成ref功能
  // return reactive(refImp);

  return refImp;
}

export function isRef(raw) {
  return raw instanceof RefImp;
}

export function unRef(raw) {
  return isRef(raw) ? raw.value : raw;
}

export function proxyRef(state) {
  return new Proxy(state, {
    get(target, key) {
      const res = Reflect.get(target, key);
      return isRef(res) ? unRef(res) : res;
    },
    set(target, key, value) {
      let res;

      if (isRef(Reflect.get(target, key)) && !isRef(value)) {
        res = Reflect.set(target[key], "value", value);
      } else {
        res = Reflect.set(target, key, value);
      }
      return res;
    },
  });
}
