import { shallowReadonly } from "../reactive/reactive";

export function initProps(instance) {
  const { props } = instance.vnode;
  instance.props = shallowReadonly(props);
}
