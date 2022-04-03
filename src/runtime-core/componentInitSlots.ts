export function initSlots(instance) {
  const { children } = instance.vnode;
  instance.slots = Array.isArray(children) ? children : [children];
}
