import { effect, stop } from "../effect";
import { reactive } from "../reactive";

describe("happy path", () => {
  test("reactive", () => {
    const raw = {
      value: 1,
    };
    const state = reactive(raw);

    expect(state.value).toBe(raw.value);
    expect(state).not.toBe(raw);
  });
  test("effect", () => {
    const state = reactive({
      value: 1,
    });

    let b;
    effect(() => {
      b = state.value + 1;
    });
    expect(b).toBe(2);

    state.value++;
    expect(b).toBe(3);
  });
  test("runner", () => {
    const state = reactive({
      data: {
        value: 10,
      },
    });
    const effectFn = jest.fn(() => {
      v = state.data.value + 1;
      return true;
    });

    let v;
    const runner = effect(effectFn);

    expect(v).toBe(11);
    const r = runner();
    expect(r).toBe(true);
    expect(effectFn).toHaveBeenCalledTimes(2);
  });
  test("schedule", () => {
    let run;
    const schedule = jest.fn(() => {
      run = runner;
    });

    const state = reactive({
      data: 10,
    });

    let b;
    const runner = effect(
      () => {
        b = state.data + 1;
      },
      {
        schedule,
      }
    );

    expect(b).toBe(11);
    expect(schedule).not.toHaveBeenCalled();
    state.data++;
    expect(schedule).toHaveBeenCalledTimes(1);
    expect(b).toBe(11);
    run();
    expect(schedule).toHaveBeenCalledTimes(1);
    expect(b).toBe(12);
  });
  test("stop", () => {
    const state = reactive({
      data: 10,
    });
    const onStop = jest.fn();

    let b;
    const runner = effect(
      () => {
        b = state.data + 1;
      },
      {
        onStop,
      }
    );

    expect(b).toBe(11);
    stop(runner);
    state.data++;
    expect(b).toBe(11);
    expect(onStop).toHaveBeenCalledTimes(1);

    runner();
    expect(b).toBe(12);
  });
});
