import { useEffect, useMemo, useRef } from "react";

import { Wrapping, WrappingOptions } from "../utils";
import { useRerender } from "./useRerender";

export type UseWrappingProps = WrappingOptions & {
  initial?: number;
};

export type UseWrappingReturn<N extends Number> = {
  value: number;
  min: number;
  max: number;
  add: (addend: N) => void;
  sub: (subtrahend: N) => void;
};

/**
 * A state hook exposing a wrapping integer of arbitrary range.
 * The counter is reset to `initial` when any of the options change.
 *
 * @param options an object with `min`, `max`, and `initial` values.
 * @returns an object with the current `value`, `min`, and `max`, as well as
 * `add(n)` and `sub(n)` functions that update the value.
 * @see {@link Wrapping} for more information.
 */
export const useWrapping = <N extends Number>({
  initial,
  ...options
}: UseWrappingProps): UseWrappingReturn<N> => {
  const rerender = useRerender();
  const internal = useRef<Wrapping>(new Wrapping(options, initial));

  useEffect(() => {
    internal.current = new Wrapping(options, initial);
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
