import { isOwned } from "../common";
const dollarKeyMap = {
  $el: (i) => i.vnode.el,
  props: (i) => i.props,
};

export function componentInitProxy(instance, setupResult) {
  instance.proxy = new Proxy(
    {},
    {
      get(target, key) {
        if (isOwned(setupResult, key)) {
          return Reflect.get(setupResult, key);
        } else if (isOwned(dollarKeyMap, key)) {
          const res = Reflect.get(dollarKeyMap, key)(instance);
          return res;
        }
      },
    }
  );
  return instance.proxy;
}
