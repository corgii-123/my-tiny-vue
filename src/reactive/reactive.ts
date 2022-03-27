import { mutableHandlers, readonlyHandlers } from "./baseHandlers";

export enum STATIC_VAR {
  IS_REACTIVE = "IS_REACTIVE",
  IS_READONLY = "IS_READONLY",
}

export function reactive(raw) {
  return new Proxy(raw, mutableHandlers());
}

export function readonly(raw) {
  return new Proxy(raw, readonlyHandlers());
}

export function isReactive(raw) {
  return raw[STATIC_VAR.IS_REACTIVE];
}

export function isReadonly(raw) {
  return raw[STATIC_VAR.IS_READONLY];
}
