import { isRef, proxyRef, ref, unRef } from "../ref";
import { effect } from "../effect";

describe("ref happy path", () => {
  test("ref", () => {
    const state = ref(0);
    const data = ref({
      message: 1,
    });
    const fn = jest.fn(() => {
      b = state.value + 1;
      c = data.value.message + 1;
    });

    expect(state.value).toBe(0);

    let b;
    let c;
    effect(fn);

    expect(b).toBe(1);
    expect(c).toBe(2);
    state.value++;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(b).toBe(2);
    data.value.message++;
    expect(c).toBe(3);
    expect(fn).toHaveBeenCalledTimes(3);

    state.value = 1;
    expect(fn).toHaveBeenCalledTimes(3);
  });
  test("isRef, unRef", () => {
    const state = ref(0);
    const raw = {
      value: 1,
    };

    expect(isRef(state)).toBeTruthy;
    expect(isRef(raw)).toBeFalsy;

    expect(unRef(raw)).toBe(raw);
    expect(unRef(state)).toBe(0);
  });
  test("proxyRef", () => {
    const state = {
      data: ref(0),
      message: "Hello World",
    };
    const fn = jest.fn(() => {
      stateProxy.data + 1;
    });

    const stateProxy = proxyRef(state);

    effect(fn);

    expect(stateProxy.data).toBe(0);
    expect(stateProxy.message).toBe("Hello World");

    stateProxy.data = 1;
    expect(fn).toHaveBeenCalledTimes(2);
    expect(stateProxy.data).toBe(1);
    expect(state.data.value).toBe(1);

    stateProxy.data = ref(2);
    expect(stateProxy.data).toBe(2);
    expect(state.data.value).toBe(2);
  });
});
