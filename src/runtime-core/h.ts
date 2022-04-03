import { h } from ".";
import { FRAGMENT } from "./constant";

export { createVNode as default } from "./createVNode";

export function renderSlots(slots) {
  return h(FRAGMENT, {}, slots);
}
