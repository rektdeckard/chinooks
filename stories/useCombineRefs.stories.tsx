import React, { LegacyRef, useEffect, useRef } from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import { useCombineRefs, useRerender } from "../src";
import "./index.css";

type Props = {};

const UseCombineRefs = (props: {}) => {
  const refOne = useRef<HTMLDivElement>(null);
  const refTwo = useRef<HTMLDivElement>(null);
  const legacyRef: LegacyRef<HTMLDivElement> = console.log;
  const combinedRef = useCombineRefs<HTMLDivElement>(refOne, refTwo, legacyRef);

  const rerender = useRerender();

  useEffect(() => {
    rerender();
  }, []);

  return (
    <div>
      <pre>refOne: {refOne.current?.outerHTML}</pre>
      <pre>refTwo: {refTwo.current?.outerHTML}</pre>
      <div
        ref={combinedRef}
        style={{
          width: 200,
          height: 200,
          color: "white",
          backgroundColor: "blue",
        }}
      />
    </div>
  );
};

export default {
  title: "Hooks/useCombineRefs",
  component: UseCombineRefs,
} as ComponentMeta<typeof UseCombineRefs>;

const Template: ComponentStory<typeof UseCombineRefs> = (props) => (
  <UseCombineRefs {...props} />
);

export const Basic = Template.bind({});
Basic.args = {};
