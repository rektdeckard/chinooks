import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Saturating, SaturatingOptions } from "../src";
import "./index.css";

type Props = {
  options: SaturatingOptions;
  initialValue?: number;
  step?: number;
};

const SaturatingExample = ({ options, initialValue, step = 1 }: Props) => {
  const [saturating, setSaturating] = useState<Saturating>(
    new Saturating(options, initialValue)
  );

  return (
    <div>
      <pre>
        Range: [{options.min ?? 0}, {options.max}]
      </pre>
      <pre>Value: {saturating.value}</pre>
      <div>
        <button
          onClick={() => setSaturating((w) => Saturating.from(w).div(step * 2))}
        >
          div({step * 2})
        </button>
        <button
          onClick={() => setSaturating((w) => Saturating.from(w).sub(step))}
        >
          sub({step})
        </button>
        <button
          onClick={() => setSaturating((w) => Saturating.from(w).add(step))}
        >
          add({step})
        </button>
        <button
          onClick={() => setSaturating((w) => Saturating.from(w).mul(step * 2))}
        >
          mul({step * 2})
        </button>
      </div>
    </div>
  );
};

export default {
  title: "Utils/Saturating",
  component: SaturatingExample,
  argTypes: {
    options: {
      description:
        "An objet representing the allowed range { max: number; min?: number = 0 }",
      defaultValue: { max: 7 },
    },
    initialValue: {
      description: "Initial value of saturatingping integer",
      defaultValue: 0,
      control: {
        type: "number",
      },
    },
  },
} as ComponentMeta<typeof SaturatingExample>;

const Template: ComponentStory<typeof SaturatingExample> = (props) => (
  <SaturatingExample {...props} />
);

export const Basic = Template.bind({});
Basic.args = {};

export const CustomRange = Template.bind({});
CustomRange.args = {
  options: { min: -6, max: 6 },
  initialValue: 4,
};

const NumberExample: ComponentStory<() => JSX.Element> = () => {
  const [saturating, setSaturating] = useState<Saturating>(
    new Saturating({ max: 1024 }, 0)
  );

  return (
    <div>
      <pre>const s = new Saturating({`{ max: ${saturating.max} }`}, 0);</pre>
      <hr />
      <pre>s.min: {saturating.min}</pre>
      <pre>s.max: {saturating.max}</pre>
      <pre>s.value: {saturating.value}</pre>
      <pre>s.valueOf(): {saturating.valueOf()}</pre>
      <pre>+s: {+saturating}</pre>
      <pre>s.toFixed(2): {saturating.toFixed(2)}</pre>
      <pre>s.toExponential(5): {saturating.toExponential(5)}</pre>
      <pre>s.toPrecision(3): {saturating.toPrecision(3)}</pre>

      <div>
        <button
          onClick={() => setSaturating((w) => Saturating.from(w).sub(100))}
        >
          sub(100)
        </button>
        <button onClick={() => setSaturating((w) => Saturating.from(w).sub(1))}>
          sub(1)
        </button>
        <button onClick={() => setSaturating((w) => Saturating.from(w).add(1))}>
          add(1)
        </button>
        <button
          onClick={() => setSaturating((w) => Saturating.from(w).add(100))}
        >
          add(100)
        </button>
      </div>
    </div>
  );
};
export const NumberImplementation = NumberExample.bind({});

const HexExample: ComponentStory<() => JSX.Element> = () => {
  const [saturating, setSaturating] = useState<Saturating>(
    new Saturating({ max: 0xff }, 0)
  );

  return (
    <div>
      <pre>
        Range: [0x{(saturating.max ?? 0).toString(16).toUpperCase()}, 0x
        {saturating.min.toString(16).toUpperCase()}]
      </pre>
      <pre>Value: 0x{saturating.value.toString(16).toUpperCase()}</pre>
      <div>
        <button onClick={() => setSaturating((w) => Saturating.from(w).sub(8))}>
          Sub 0x8
        </button>
        <button onClick={() => setSaturating((w) => Saturating.from(w).sub(1))}>
          Sub 0x1
        </button>
        <button onClick={() => setSaturating((w) => Saturating.from(w).add(1))}>
          Add 0x1
        </button>
        <button onClick={() => setSaturating((w) => Saturating.from(w).add(8))}>
          Add 0x8
        </button>
      </div>
    </div>
  );
};

export const Hex = HexExample.bind({});
