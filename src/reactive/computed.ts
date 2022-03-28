import { ReactiveEffect } from "./effect";

class ComputedImp {
  private _getter: any;
  private _effect: ReactiveEffect;
  private _dirty: Boolean = true;
  private _value: any;
  constructor(getter) {
    this._getter = getter;

    this._effect = new ReactiveEffect(this._getter);
    this._effect.schedule = () => {
      if (!this._dirty) {
        this._dirty = true;
      }
    };
  }

  get value() {
    if (this._dirty) {
      this._dirty = false;
      this._value = this._effect.run();
    }
    return this._value;
  }
}

export function computed(getter) {
  const computedImp = new ComputedImp(getter);
  return computedImp;
}
