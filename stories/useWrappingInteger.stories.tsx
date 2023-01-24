import { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
// import {
//   Title,
//   Subtitle,
//   Description,
//   Primary,
//   ArgsTable,
//   Stories,
//   PRIMARY_STORY,
// } from "@storybook/addon-docs";

import "./index.css";
import { useWrappingInteger } from "../src";

const UseWrappingInteger = () => {
  const { value, add, sub } = useWrappingInteger({
    min: -5,
    max: 5,
    initial: 0,
  });
  const [amount, setAmount] = useState<number>(1);

  return (
    <div>
      <pre>{`const { value, add, sub } = useWrappingInteger({ min: -5, max: 5, initial: 0 })`}</pre>
      <hr />
      <pre>value: {value}</pre>
      <button onClick={() => sub(amount)}>sub({amount})</button>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
      />
      <button onClick={() => add(amount)}>add({amount})</button>
    </div>
  );
};

export default {
  title: "Hooks/useWrappingInteger",
  component: UseWrappingInteger,
  argTypes: {
    min: {
      description: "Minimum value for wrapping integer",
      defaultValue: 0,
      control: {
        type: "number",
      },
    },
    max: {
      description: "Maximum value for wrapping integer",
      defaultValue: 7,
      control: {
        type: "number",
      },
    },
    initial: {
      description: "Initial value for wrapping integer",
      defaultValue: 0,
      control: {
        type: "number",
      },
    },
  },
} as ComponentMeta<typeof UseWrappingInteger>;

const Template: ComponentStory<typeof UseWrappingInteger> = () => (
  <UseWrappingInteger />
);

export const Basic = Template.bind({});
Basic.args = {};
