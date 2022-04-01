import { isOwned } from "../common";

export function createEmit(instance) {
  const { props } = instance.vnode;
  if (!props) return () => {};

  function emit(event, ...params) {
    const e = `on${event[0].toLocaleUpperCase() + event.slice(1)}`;
    return isOwned(props, e)
      ? props[e](...params)
      : console.warn(`can't emit this event`);
  }

  return emit;
}
