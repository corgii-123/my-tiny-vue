import { h, ref } from "../src";

const My: any = {
  render() {
    return h(
      "button",
      {
        onClick: this.handleClick,
      },
      `${this.props.count} and ${this.myCount}`
    );
  },
  setup() {
    const myCount = ref(0);

    function handleClick() {
      myCount.value++;
    }

    return {
      myCount,
      handleClick,
    };
  },
};

export default My;
