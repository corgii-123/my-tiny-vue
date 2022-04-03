import { createVNode } from "./createVNode";

export default function (render) {
  return function (rootComponent) {
    return {
      mount(rootContainer) {
        const vnode = createVNode(rootComponent);
        const rootContainerDOM = document.querySelector(rootContainer);
        render(null, vnode, rootContainerDOM, null);
      },
    };
  };
}
