import { h } from "../runtime-core";

export default {
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
    ]);
  },
  setup(props, { emit }) {
    console.log(props);

    function handleClick() {
      console.log("ok");
    }

    return {
      handleClick,
    };
  },
};
