import { readonly } from "../reactive";

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
});
