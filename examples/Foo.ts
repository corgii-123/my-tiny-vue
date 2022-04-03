import { getCurrentInstance, h, inject, renderSlots } from "../src";
const Foo: any = {
  render() {
    return h("div", {}, [
      h("span", {}, this.props.count),
      h(
        "button",
        {
          onClick: this.handleClick,
        },
        "click"
      ),
      renderSlots(this.$slots),
    ]);
  },
  setup(props, { emit }) {
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
    };
  },
};

export default Foo;
