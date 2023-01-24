import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useWrapping, UseWrappingProps } from "../src";
import "./index.css";

const UseWrapping = (props: UseWrappingProps) => {
  const { value, add, sub } = useWrapping(props);
  const [amount, setAmount] = useState<number>(1);

  return (
    <div>
      <pre>{`const { value, add, sub } = useWrapping({ min:  ${props.min}, max: ${props.max}, initial: ${props.initial} })`}</pre>
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
  title: "Hooks/useWrapping",
  component: UseWrapping,
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
} as ComponentMeta<typeof UseWrapping>;

const Template: ComponentStory<typeof UseWrapping> = (props) => (
  <UseWrapping {...props} />
);

export const Basic = Template.bind({});
Basic.args = {};
