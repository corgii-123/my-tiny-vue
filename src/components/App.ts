import { h } from "../runtime-core";
import Foo from "./Foo";

export default {
  render() {
    return h("div", { class: "root" }, [
      h("div", {}, "Hello World"),
      h("div", { id: "my-count" }, this.state.count),
      h("div", {}, this.$el),
      h(Foo, {
        count: this.state.count,
        onSay: (v) => {
          console.log("say emit", v);
        },
      }),
    ]);
  },
  setup(props, { emit }) {
    const state = {
      count: 2,
    };

    return {
      state,
    };
  },
};
