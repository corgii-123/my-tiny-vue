import { getCurrentInstance, h, inject, ref, renderSlots } from "../src";
import My from "./My";

const Foo: any = {
  render() {
    return h("div", {}, [
      h("span", {}, this.data.toString()),
      h(
        "button",
        {
          onClick: this.handleClick,
        },
        "click"
      ),
      renderSlots(this.$slots),
      h(My, {
        count: this.data,
      }),
    ]);
  },
  setup(props, { emit }) {
    const data = ref(0);
    console.log(props);
    console.log(getCurrentInstance());

    function handleClick() {
      console.log("ok");
      emit("say", props);
    }

    const prov = inject("prov");
    const p = inject("p", "default value");
    console.log(`prov:`, prov, `default:`, p);

    return {
      handleClick,
      data,
    };
  },
};

export default Foo;
