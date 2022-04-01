import { h } from "../runtime-core";

export default {
  render() {
    window.my = this;
    return h("div", {}, [
      h("span", {}, this.props.count),
      h(
        "button",
        {
          onClick: this.handleClick,
        },
        "click"
      ),
    ]);
  },
  setup(props, { emit }) {
    console.log(props);

    function handleClick() {
      console.log("ok");
      emit("say", props);
    }

    return {
      handleClick,
    };
  },
};
