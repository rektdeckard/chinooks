import React, { ReactNode } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useCycleStable } from "../src";
import "./index.css";

type Props<T extends ReactNode> = {
  values: Iterable<T>;
  startIndex?: number;
  step?: number;
};

const UseCycle = <T extends ReactNode>({
  values,
  startIndex,
  step,
}: Props<T>) => {
  const [val, cycle] = useCycleStable(values, startIndex);

  return (
    <div>
      <pre>Value: {val}</pre>
      <button onClick={() => cycle(step)}>cycle({step ?? ""})</button>
    </div>
  );
};

export default {
  title: "Hooks/useCycleStable",
  component: UseCycle,
  argTypes: {
    values: {
      description: "An iterable list",
      defaultValue: ["First", "Second", "Third", "Fourth", "Fifth"],
    },
    startIndex: {
      description: "Index inv `values` of starting element",
      defaultValue: 0,
      control: {
        type: "number",
      },
    },
  },
} as ComponentMeta<typeof UseCycle>;

const Template: ComponentStory<typeof UseCycle> = (props) => (
  <UseCycle {...props} />
);

export const Basic = Template.bind({});
Basic.args = {
  values: ["First", "Second", "Third", "Fourth", "Fifth"],
};

export const StartIndex = Template.bind({});
StartIndex.args = {
  values: ["First", "Second", "Third", "Fourth", "Fifth"],
  startIndex: 2,
};

export const CustomStep = Template.bind({});
CustomStep.args = {
  step: -1,
};

export const AnyIterable = Template.bind({});
AnyIterable.args = {
  values: new Set([
    "Hyundai",
    "Subaru",
    "Lexus",
    "Tesla",
    "Toyota",
    "Mitsubishi",
  ]),
};
