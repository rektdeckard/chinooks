import React, { ReactNode } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useHover } from "../src";
import "./index.css";

type Props<T extends ReactNode> = {
  values: Iterable<T>;
  startIndex?: number;
  step?: number;
};

const UseHover = (props: {}) => {
  const [isHovered, hoverProps] = useHover<HTMLDivElement>();

  return (
    <div>
      <pre>isHovered: {isHovered.toString()}</pre>
      <div
        {...hoverProps}
        style={{
          width: 200,
          height: 200,
          backgroundColor: isHovered ? "pink" : "blue",
        }}
      />
    </div>
  );
};

export default {
  title: "Hooks/useHover",
  component: UseHover,
} as ComponentMeta<typeof UseHover>;

const Template: ComponentStory<typeof UseHover> = (props) => (
  <UseHover {...props} />
);

export const Basic = Template.bind({});
Basic.args = {};
