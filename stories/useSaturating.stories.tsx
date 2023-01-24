import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useSaturating, UseSaturatingProps } from "../src";
import "./index.css";

const UseSaturating = (props: UseSaturatingProps) => {
  const { value, add, sub, mul, div } = useSaturating(props);
  const [amount, setAmount] = useState<number>(1);

  return (
    <div>
      <pre>{`const { value, add, sub, mul, div } = useSaturating({ min: ${props.min}, max: ${props.max}, initial: ${props.initial} })`}</pre>
      <hr />
      <pre>value: {value}</pre>
      <button onClick={() => div(amount)}>div{amount}</button>
      <button onClick={() => sub(amount)}>sub({amount})</button>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.valueAsNumber)}
      />
      <button onClick={() => add(amount)}>add({amount})</button>
      <button onClick={() => mul(amount)}>mul{amount}</button>
    </div>
  );
};

export default {
  title: "Hooks/useSaturating",
  component: UseSaturating,
  argTypes: {
    min: {
      description: "Minimum value for saturating integer",
      defaultValue: 0,
      control: {
        type: "number",
      },
    },
    max: {
      description: "Maximum value for saturating integer",
      defaultValue: 7,
      control: {
        type: "number",
      },
    },
    initial: {
      description: "Initial value for saturating integer",
      defaultValue: 0,
      control: {
        type: "number",
      },
    },
  },
} as ComponentMeta<typeof UseSaturating>;

const Template: ComponentStory<typeof UseSaturating> = (props) => (
  <UseSaturating {...props} />
);

export const Basic = Template.bind({});
Basic.args = {};
