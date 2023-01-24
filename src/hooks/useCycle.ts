import { useCallback, useEffect, useRef, useState } from "react";

import { Wrapping } from "../utils";
import { useRerender } from "./useRerender";

/**
 * A state hook that can transition between a list of possible states
 *
 * @param values an iterable list of values
 * @param startIndex an optional index of the starting value (default 0)
 * @returns a tuple of current value and step function, to step n steps (wrapping) through values
 */
export const useCycle = <T>(
  values: Iterable<T>,
  startIndex?: number
): [T, (idx?: number) => void] => {
  const index = useRef<Wrapping>(
    new Wrapping({ max: [...values].length - 1 }, startIndex ?? 0)
  );
  const [value, setValue] = useState<T>([...values][index.current.value]);

  useEffect(() => {
    const arr = [...values];
    if (arr.length - 1 !== index.current.max) {
      index.current = new Wrapping({ max: arr.length - 1 }, startIndex ?? 0);
      setValue(arr[index.current.value]);
    }
  }, [values]);

  const cycle = useCallback(
    (step?: number) => {
      const arr = [...values];
      setValue(arr[index.current.add(step ?? 1).value]);
    },
    [values]
  );

  console.log(index.current.value);

  return [value, cycle];
};

/**
 * A state hook that can transition between a list of possible states.
 * Like `useCycle`, but more performant and guarantees a stable function reference
 * for the lifetime of the hook. Only safe when the cycle options do not change.
 *
 * @param values an iterable list of values
 * @param startIndex an optional index of the starting value (default 0)
 * @returns a tuple of current value and step function, to step n steps (wrapping) through values
 */
export const useCycleStable = <T>(
  values: Iterable<T>,
  startIndex?: number
): [T, (step?: number) => void] => {
  const rerender = useRerender();
  const valuesRef = useRef<T[]>(Array.isArray(values) ? values : [...values]);
  const index = useRef<Wrapping>(
    new Wrapping({ max: valuesRef.current.length - 1 }, startIndex ?? 0)
  );

  const cycle = useCallback((steps?: number) => {
    index.current.add(steps ?? 1);
    rerender();
  }, []);

  return [valuesRef.current[index.current.value], cycle];
};
