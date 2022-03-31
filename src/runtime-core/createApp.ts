import { createVNode } from "./createVNode";
import { render } from "./render";

export default function (rootComponent) {
  return {
    mount(rootContainer) {
      const vnode = createVNode(rootComponent);
      const rootContainerDOM = document.querySelector(rootContainer);
      render(vnode, rootContainerDOM);
    },
  };
}
