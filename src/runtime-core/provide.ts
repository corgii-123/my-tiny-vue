import { getCurrentInstance } from "./setupComponent";

export function provide(key, value) {
  const instance = getCurrentInstance();
  instance.provide[key] = value;
}

export function inject(key, value?) {
  const instance = getCurrentInstance();

  if (key in instance.provide) {
    return instance.provide[key];
  }
  return value;
}
