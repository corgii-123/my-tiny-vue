import { isObject } from "../common";
import { createComponentInstance, setupComponent } from "./setupComponent";

export function render(vnode, container) {
  patch(vnode, container);
}

function patch(vnode, container) {
  if (typeof vnode.type === "string") {
    processElement(vnode, container);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container);
  }
}

function processElement(vnode, container) {
  mountElement(vnode, container);
}
function processComponent(vnode: any, container: any) {
  mountComponent(vnode, container);
}

function mountElement(vnode: any, container: any) {
  const { type, props, children } = vnode;
  const el = document.createElement(type);

  vnode.el = el;

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

  if (Array.isArray(children)) {
    mountChildren(el, children);
  } else {
    el.textContent = children;
  }

  container.append(el);
}
function mountChildren(el, children) {
  children.forEach((vnode) => {
    patch(vnode, el);
  });
}

function mountComponent(vnode: any, container: any) {
  const instance = createComponentInstance(vnode);

  if (instance) {
    setupComponent(instance);
  }

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render();
  patch(subTree, container);

  instance.vnode.el = subTree.el;
}
