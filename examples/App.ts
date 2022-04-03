import { h, TEXT, provide } from "../src";
import Foo from "./Foo";

const App: any = {
  render() {
    return h("div", { class: "root" }, [
      h("div", {}, "Hello World"),
      h("div", { id: "my-count" }, this.state.count),
      h("div", {}, this.$el),
      h(
        Foo,
        {
          count: this.state.count,
          onSay: (v) => {
            console.log("say emit", v);
          },
        },
        [h("p", {}, "slots"), h("p", {}, "slots"), h(TEXT, {}, "im TEXT")]
      ),
    ]);
  },
  setup(props, { emit }) {
    const state = {
      count: 2,
    };
    provide("prov", 0);

    return {
      state,
    };
  },
};

export default App;
