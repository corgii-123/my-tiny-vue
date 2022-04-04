import { isOwned } from "../common";
const dollarKeyMap = {
  $el: (i) => i.vnode.el,
  props: (i) => i.props,
  $slots: (i) => i.slots,
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
      // 这里其实还需要设置set的情况，为了处理ref的情况
    }
  );
  return instance.proxy;
}
