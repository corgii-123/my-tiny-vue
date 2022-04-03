import { createRender } from "../runtime-core";

export * from "../runtime-core";

function createElement(type) {
  return document.createElement(type);
}

function patchProps(el, props) {
  for (let k in props) {
    // 匹配事件
    if (k.match(/^on[A-Z]/)) {
      const str = k.split("on")[1];
      const event = str[0].toLowerCase() + str.slice(1);
      el.addEventListener(event, props[k]);
    } else {
      el.setAttribute(k, props[k]);
    }
  }
}

function insertEl(container, el) {
  container.append(el);
}

export const { createApp } = createRender({
  createElement,
  patchProps,
  insertEl,
});
