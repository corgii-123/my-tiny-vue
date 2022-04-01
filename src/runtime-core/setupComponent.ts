import { createEmit } from "./componentInitEmit";
import { componentInitProxy } from "./componentInitProxy";
import { initProps } from "./componentProps";

export function createComponentInstance(vnode) {
  const instance = {
    vnode,
    type: vnode.type,
    setupState: {},
    render: () => {},
    emit: (event: any, ...params: any[]) => {},
    props: {},
    proxy: {},
  };
  instance.emit = createEmit(instance);

  return instance;
}

export function setupComponent(instance) {
  initProps(instance);
  // initSlot(instance)
  setupStatefulComponent(instance);
}

function setupStatefulComponent(instance: any) {
  const { setup } = instance.type;

  if (setup) {
    instance.setupState = setup(instance.props, { emit: instance.emit });
  }
  // Proxy代理
  const newInstance = componentInitProxy(instance, instance.setupState);

  finishStatefulComponent(instance, newInstance);
}

function finishStatefulComponent(instance, newInstance) {
  instance.render = instance.type.render.bind(newInstance);
}
