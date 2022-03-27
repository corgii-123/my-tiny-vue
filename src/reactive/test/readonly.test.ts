import { effect } from "../effect";
import { reactive, readonly, isReadonly, isReactive } from "../reactive";

describe("readonly happy path", () => {
  test("readonly", () => {
    console.warn = jest.fn();
    const ref = readonly({
      value: 1,
    });

    expect(ref).toEqual({ value: 1 });
    ref.value = 2;
    expect(console.warn).toHaveBeenCalledTimes(1);
  });
  test("isReadonly isReactive", () => {
    const state = reactive({
      value: 1,
      data: {
        message: "Hello World",
      },
    });
    const r = readonly({
      value: 1,
    });

    let m;
    effect(() => {
      m = state.data.message + "!";
    });

    expect(m).toBe("Hello World!");

    expect(isReadonly(r)).toBe(true);
    expect(isReactive(state)).toBe(true);
    expect(isReadonly(state)).toBe(false);
    expect(isReactive(r)).toBe(false);

    state.data.message = "Hello Vue";

    expect(m).toBe("Hello Vue!");
    expect(isReactive(state.data)).toBe(true);
  });
});
