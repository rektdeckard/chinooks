import { useMemo, useRef } from "react";

import { Wrapping, WrappingOptions } from "../utils";
import { useRerender } from "./useRerender";

export type UseWrappingIntegerProps = WrappingOptions & {
  initial?: number;
};

export type UseWrappingIntegerReturn<N extends Number> = {
  value: number;
  min: number;
  max: number;
  add: (addend: N) => void;
  sub: (subtrahend: N) => void;
};

export const useWrappingInteger = <N extends Number>({
  initial,
  ...wrappingOptions
}: UseWrappingIntegerProps): UseWrappingIntegerReturn<N> => {
  const rerender = useRerender();
  const internal = useRef<Wrapping>(new Wrapping(wrappingOptions, initial));

  const methods = useMemo(
    () => ({
      add(addend: N) {
        internal.current.add(addend);
        rerender();
      },
      sub(subtrahend: N) {
        internal.current.sub(subtrahend);
        rerender();
      },
    }),
    []
  );

  return {
    value: internal.current.value,
    min: internal.current.min,
    max: internal.current.max,
    ...methods,
  };
};
