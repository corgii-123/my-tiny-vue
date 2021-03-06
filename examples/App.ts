import { h, TEXT, provide, reactive } from "../src";
import Foo from "./Foo";

const App: any = {
  render() {
    return h("div", {}, [
      h("div", {}, "Hello World"),
      h(
        "div",
        !this.state.count ? {} : { id: `my-count:${this.state.count}` },
        this.state.count.toString()
      ),
      h(
        Foo,
        {
          count: this.state.count,
          onSay: (v) => {
            this.state.count++;
          },
        },
        [h("p", {}, "slots"), h("p", {}, "slots"), h(TEXT, {}, "im TEXT")]
      ),
    ]);
  },
  setup(props, { emit }) {
    const state = reactive({
      count: 0,
    });
    provide("prov", 0);

    return {
      state,
    };
  },
};

export default App;
