import { computed } from "../computed";
import { reactive } from "../reactive";

describe("computed happy path", () => {
  test("computed", () => {
    const state = reactive({
      data: 0,
    });
    const fn = jest.fn(() => {
      return state.data + 1;
    });

    const dynamic = computed(fn);

    expect(fn).not.toHaveBeenCalled();
    expect(dynamic.value).toBe(1);
    expect(fn).toHaveBeenCalledTimes(1);

    dynamic.value;
    expect(fn).toHaveBeenCalledTimes(1);

    state.data = 2;

    expect(fn).toHaveBeenCalledTimes(1);
    expect(dynamic.value).toBe(3);
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
