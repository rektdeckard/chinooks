import { useMemo, useRef } from "react";

import { Saturating, SaturatingOptions } from "../utils";
import { useRerender } from "./useRerender";

export type UseSaturatingIntegerProps = SaturatingOptions & {
  initial?: number;
};

export type UseSaturatingIntegerReturn<N extends Number> = {
  value: number;
  min: number;
  max: number;
  add: (addend: N) => void;
  sub: (subtrahend: N) => void;
  mul: (multiplier: N) => void;
  div: (divisor: N) => void;
};

export const useSaturatingInteger = <N extends Number>({
  initial,
  ...wrappingOptions
}: UseSaturatingIntegerProps): UseSaturatingIntegerReturn<N> => {
  const rerender = useRerender();
  const internal = useRef<Saturating>(new Saturating(wrappingOptions, initial));

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
      mul(multiplier: N) {
        internal.current.mul(multiplier);
        rerender();
      },
      div(divisor: N) {
        internal.current.div(divisor);
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
