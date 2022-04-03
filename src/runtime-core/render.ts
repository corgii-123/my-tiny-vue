import { isObject } from "../common";
import { FRAGMENT, TEXT } from "./constant";
import { createComponentInstance, setupComponent } from "./setupComponent";

export function render(vnode, container, parentInstance) {
  patch(vnode, container, parentInstance);
}

function patch(vnode, container, parentInstance) {
  if (typeof vnode.type === "string") {
    processElement(vnode, container, parentInstance);
  } else if (isObject(vnode.type)) {
    processComponent(vnode, container, parentInstance);
  } else if (vnode.type === FRAGMENT) {
    processFragment(vnode, container, parentInstance);
  } else if (vnode.type === TEXT) {
    processText(vnode, container);
  }
}

function processFragment(vnode: any, container: any, parentInstance) {
  mountChildren(container, vnode.children, parentInstance);
}
function processText(vnode: any, container: any) {
  mountText(vnode, container);
}
function processElement(vnode, container, parentInstance) {
  mountElement(vnode, container, parentInstance);
}
function processComponent(vnode: any, container: any, parentInstance) {
  mountComponent(vnode, container, parentInstance);
}
function mountText(vnode, container) {
  const el = document.createTextNode(vnode.children);
  container.append(el);
}
function mountElement(vnode: any, container: any, parentInstance) {
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
    mountChildren(el, children, parentInstance);
  } else {
    el.textContent = children;
  }

  container.append(el);
}
function mountChildren(el, children, parentInstance) {
  children.forEach((vnode) => {
    patch(vnode, el, parentInstance);
  });
}

function mountComponent(vnode: any, container: any, parentInstance) {
  const instance = createComponentInstance(vnode, parentInstance);

  if (instance) {
    setupComponent(instance);
  }

  setupRenderEffect(instance, container);
}

function setupRenderEffect(instance, container) {
  const subTree = instance.render.call(instance.proxy);
  patch(subTree, container, instance);

  instance.vnode.el = subTree.el;
}
