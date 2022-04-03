import { isObject } from "../common";
import { effect } from "../reactive";
import { FRAGMENT, TEXT } from "./constant";
import createAppAPI from "./createApp";
import { createComponentInstance, setupComponent } from "./setupComponent";

export function createRender(options) {
  const { insertEl, createElement, patchProps } = options;

  function render(n1, n2, container, parentInstance) {
    patch(n1, n2, container, parentInstance);
  }

  // n1 -> old, n2 -> new
  function patch(n1, n2, container, parentInstance) {
    if (typeof n2.type === "string") {
      processElement(n1, n2, container, parentInstance);
    } else if (isObject(n2.type)) {
      processComponent(n2, container, parentInstance);
    } else if (n2.type === FRAGMENT) {
      processFragment(n1, n2, container, parentInstance);
    } else if (n2.type === TEXT) {
      processText(n1, n2, container);
    }
  }

  function processFragment(n1, n2, container: any, parentInstance) {
    if (n1) {
    } else {
      mountChildren(container, n2.children, parentInstance);
    }
  }
  function processText(n1, n2, container: any) {
    if (n1) {
    } else {
      mountText(n2, container);
    }
  }
  function processElement(n1, n2, container, parentInstance) {
    if (n1) {
      patchElement(n1, n2, container, parentInstance);
    } else {
      mountElement(n2, container, parentInstance);
    }
  }
  function processComponent(n2, container: any, parentInstance) {
    mountComponent(n2, container, parentInstance);
  }

  function patchElement(n1, n2, container, parentInstance) {
    console.log("old vnode", n1);
    console.log("new vnode", n2);
  }

  function mountText(n2, container) {
    const el = document.createTextNode(n2.children);
    container.append(el);
  }
  function mountElement(vnode: any, container: any, parentInstance) {
    const { type, props, children } = vnode;
    const el = createElement(type);

    vnode.el = el;

    patchProps(el, props);

    if (Array.isArray(children)) {
      mountChildren(el, children, parentInstance);
    } else {
      if (children) el.textContent = children;
    }

    insertEl(container, el);
  }
  function mountChildren(el, children, parentInstance) {
    children.forEach((vnode) => {
      patch(null, vnode, el, parentInstance);
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
    effect(() => {
      if (!instance.isMounted) {
        const subTree = instance.render.call(instance.proxy);
        patch(null, subTree, container, instance);

        instance.vnode.el = subTree.el;
        instance.isMounted = true;
        instance.oldTree = subTree;
      } else {
        const subTree = instance.render.call(instance.proxy);
        console.log(instance.oldTree);

        patch(instance.oldTree, subTree, container, instance);
        subTree.el = instance.oldTree.el;
        instance.oldTree = subTree;
      }
    });
  }

  return {
    createApp: createAppAPI(render),
  };
}
