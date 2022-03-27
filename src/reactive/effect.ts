import { extend } from "../common";

let activeEffect: ReactiveEffect | null = null;

class ReactiveEffect {
  private _fn: () => any;
  schedule?: () => any;
  depsSet: Set<Set<ReactiveEffect>> = new Set();
  hasStopped = false;

  // hook
  onStop: (() => {}) | undefined;

  constructor(fn) {
    this._fn = fn;
  }

  run() {
    activeEffect = this;
    const res = this._fn();
    activeEffect = null;
    return res;
  }

  stop() {
    if (this.hasStopped) return;

    cleanEffect(this);
    this.hasStopped = true;

    if (!this.onStop) return;
    this.onStop();
  }
}

function cleanEffect(effect) {
  effect.depsSet.forEach((deps) => {
    deps.delete(effect);
  });
  // 清空集合
  effect.depsSet = new Set();
}

const targetMap = new Map();
export function track(target, key) {
  // 不是在依赖中访问，直接返回，不做收集
  if (!activeEffect) return;

  if (!targetMap.has(target)) {
    targetMap.set(target, new Map());
  }
  const depsMap = targetMap.get(target);
  if (!depsMap.has(key)) {
    depsMap.set(key, new Set());
  }
  const deps = depsMap.get(key);

  deps.add(activeEffect);
  activeEffect.depsSet.add(deps);
}

export function effect(fn, options?) {
  const reactiveEffect = new ReactiveEffect(fn);
  extend(reactiveEffect, options);

  reactiveEffect.run();

  const runner: any = reactiveEffect.run.bind(reactiveEffect);
  runner.reactiveEffect = reactiveEffect;
  return runner;
}

export function trigger(target, key, value) {
  const depsMap = targetMap.get(target);
  const deps = depsMap.get(key);

  deps.forEach((reactiveEffect) => {
    if (reactiveEffect.schedule) {
      reactiveEffect.schedule();
    } else {
      reactiveEffect.run();
    }
  });
}

export function stop({ reactiveEffect }: { reactiveEffect: ReactiveEffect }) {
  reactiveEffect.stop();
}
