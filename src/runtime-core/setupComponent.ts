import { createEmit } from "./componentInitEmit";
import { componentInitProxy } from "./componentInitProxy";
import { initSlots } from "./componentInitSlots";
import { initProps } from "./componentProps";

export function createComponentInstance(vnode, parentInstance) {
  const instance = {
    vnode,
    type: vnode.type,
    setupState: {},
    render: () => {},
    emit: (event: any, ...params: any[]) => {},
    props: {},
    proxy: {},
    slots: [],
    provide: Object.create(parentInstance ? parentInstance.provide : {}),
    parentInstance: parentInstance || {},
  };
  instance.emit = createEmit(instance);

  return instance;
}

export function setupComponent(instance) {
  initProps(instance);
  initSlots(instance);
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const { setup } = instance.type;

  setCurrentInstance(instance);
  if (setup) {
    instance.setupState = setup(instance.props, { emit: instance.emit });
  }
  setCurrentInstance(null);

  // Proxy代理
  instance.proxy = componentInitProxy(instance, instance.setupState);

  handleStateResult(instance);
}

let currentInstance;
function setCurrentInstance(ins) {
  currentInstance = ins;
}
export function getCurrentInstance() {
  return currentInstance;
}

function handleStateResult(instance: any) {
  finishStatefulComponent(instance);
}
function finishStatefulComponent(instance) {
  instance.render = instance.type.render;
}
