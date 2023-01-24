import React, { useState } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { Wrapping, WrappingOptions } from "../src";
import "./index.css";

type Props = {
  options: WrappingOptions;
  initialValue?: number;
  step?: number;
};

const WrappingExample = ({ options, initialValue, step = 1 }: Props) => {
  const [wrap, setWrap] = useState<Wrapping>(
    new Wrapping(options, initialValue)
  );

  return (
    <div>
      <pre>
        Range: [{options.min ?? 0}, {options.max}]
      </pre>
      <pre>Value: {wrap.value}</pre>
      <div>
        <button onClick={() => setWrap((w) => Wrapping.from(w).sub(step))}>
          sub({step})
        </button>
        <button onClick={() => setWrap((w) => Wrapping.from(w).add(step))}>
          add({step})
        </button>
      </div>
    </div>
  );
};

export default {
  title: "Utils/Wrapping",
  component: WrappingExample,
  argTypes: {
    options: {
      description:
        "An objet representing the allowed range { max: number; min?: number = 0 }",
      defaultValue: { max: 7 },
    },
    initialValue: {
      description: "Initial value of wrapping integer",
      defaultValue: 0,
      control: {
        type: "number",
      },
    },
  },
} as ComponentMeta<typeof WrappingExample>;

const Template: ComponentStory<typeof WrappingExample> = (props) => (
  <WrappingExample {...props} />
);

export const Basic = Template.bind({});
Basic.args = {};

export const CustomRange = Template.bind({});
CustomRange.args = {
  options: { min: -6, max: 6 },
  initialValue: 4,
};

const NumberExample: ComponentStory<() => JSX.Element> = () => {
  const [wrap, setWrap] = useState<Wrapping>(new Wrapping({ max: 1024 }, 0));

  return (
    <div>
      <pre>const w = new Wrapping({`{ max: ${wrap.max} }`}, 0);</pre>
      <hr />
      <pre>w.min: {wrap.min}</pre>
      <pre>w.max: {wrap.max}</pre>
      <pre>w.value: {wrap.value}</pre>
      <pre>w.valueOf(): {wrap.valueOf()}</pre>
      <pre>+w: {+wrap}</pre>
      <pre>w.toFixed(2): {wrap.toFixed(2)}</pre>
      <pre>w.toExponential(5): {wrap.toExponential(5)}</pre>
      <pre>w.toPrecision(3): {wrap.toPrecision(3)}</pre>

      <div>
        <button onClick={() => setWrap((w) => Wrapping.from(w).sub(100))}>
          sub(100)
        </button>
        <button onClick={() => setWrap((w) => Wrapping.from(w).sub(1))}>
          sub(1)
        </button>
        <button onClick={() => setWrap((w) => Wrapping.from(w).add(1))}>
          add(1)
        </button>
        <button onClick={() => setWrap((w) => Wrapping.from(w).add(100))}>
          add(100)
        </button>
      </div>
    </div>
  );
};
export const NumberImplementation = NumberExample.bind({});

const HexExample: ComponentStory<() => JSX.Element> = () => {
  const [wrap, setWrap] = useState<Wrapping>(new Wrapping({ max: 0xff }, 0));

  return (
    <div>
      <pre>
        Range: [0x{(wrap.max ?? 0).toString(16).toUpperCase()}, 0x
        {wrap.min.toString(16).toUpperCase()}]
      </pre>
      <pre>Value: 0x{wrap.value.toString(16).toUpperCase()}</pre>
      <div>
        <button onClick={() => setWrap((w) => Wrapping.from(w).sub(8))}>
          Sub 0x8
        </button>
        <button onClick={() => setWrap((w) => Wrapping.from(w).sub(1))}>
          Sub 0x1
        </button>
        <button onClick={() => setWrap((w) => Wrapping.from(w).add(1))}>
          Add 0x1
        </button>
        <button onClick={() => setWrap((w) => Wrapping.from(w).add(8))}>
          Add 0x8
        </button>
      </div>
    </div>
  );
};

export const Hex = HexExample.bind({});
