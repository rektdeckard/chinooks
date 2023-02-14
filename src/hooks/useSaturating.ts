import { useEffect, useMemo, useRef } from "react";
import { Saturating, BoundedOptions } from "kdim";

import { useRerender } from "./useRerender";

export type UseSaturatingProps = BoundedOptions & {
  initial?: number;
};

export type UseSaturatingReturn<N extends Number> = {
  value: number;
  min: number;
  max: number;
  add: (addend: N) => void;
  sub: (subtrahend: N) => void;
  mul: (multiplier: N) => void;
  div: (divisor: N) => void;
};

/**
 * A state hook exposing a saturating (or clamping) integer of arbitrary range.
 * The counter is reset to `initial` when any of the options change.
 *
 * @param options an object with `min`, `max`, and `initial` values.
 * @returns an object with the current `value`, `min`, and `max`, as well as
 * `add(n)`, `sub(n)`, `mul(n)`, and `div(n)` functions that update the value.
 * @see {@link Saturating} for more information.
 */
export const useSaturating = <N extends Number>({
  initial,
  ...options
}: UseSaturatingProps): UseSaturatingReturn<N> => {
  const rerender = useRerender();
  const internal = useRef<Saturating>(new Saturating(options, initial));

  useEffect(() => {
    internal.current = new Saturating(options, initial);
  }, [options.min, options.max, initial]);

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
