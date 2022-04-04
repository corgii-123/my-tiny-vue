import { createRender } from "../runtime-core";

export * from "../runtime-core";

function createElement(type) {
  return document.createElement(type);
}

function patchProps(el, oldProps, newProps) {
  if (!oldProps) {
    for (let k in newProps) {
      // 匹配事件
      if (k.match(/^on[A-Z]/)) {
        const str = k.split("on")[1];
        const event = str[0].toLowerCase() + str.slice(1);
        el.addEventListener(event, newProps[k]);
      } else {
        el.setAttribute(k, newProps[k]);
      }
    }
  } else {
    for (let k in newProps) {
      if (oldProps[k] !== newProps[k]) {
        el.setAttribute(k, newProps[k]);
      }
    }

    for (let k in oldProps) {
      if (newProps[k] === undefined) {
        el.removeAttribute(k);
      }
    }
  }
}

function insertEl(container, el) {
  container.append(el);
}

function appendText(el, children) {
  el.textContent = children;
}

function remove(childEl) {
  const parent = childEl.parentNode();
  parent.removeNode(childEl);
}

function mountText(n2, container) {
  const el = document.createTextNode(n2.children);
  container.append(el);
}

export const { createApp } = createRender({
  createElement,
  patchProps,
  insertEl,
  appendText,
  remove,
  mountText,
});
