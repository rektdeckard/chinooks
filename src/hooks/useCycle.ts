import { useCallback, useRef, useState } from "react";
import { Wrapping } from "../utils";

/**
 * A state hook that can transition between a list of possible states
 *
 * @param values an iterable (Array, Set) list of values
 * @param startIndex an optional index of the starting value (defaults to 0)
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

  const cycle = useCallback(
    (step?: number) => {
      const arr = [...values];
      setValue(arr[index.current.add(step ?? 1).value]);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [...values]
  );

  return [value, cycle];
};

/**
 * A state hook that can transition between a list of possible states.
 * Like `useCycle`, but more performant and guarantees a stable function reference
 * for the lifetime of the hook. Only safe when the cycle options do not change.
 *
 * @param values an iterable (Array, Set) list of values
 * @param startIndex an optional index of the starting value (defaults to 0)
 * @returns a tuple of current value and step function, to step n steps (wrapping) through values
 */
export const useCycleStable = <T>(
  values: Iterable<T>,
  startIndex?: number
): [T, (step?: number) => void] => {
  const valuesRef = useRef<T[]>(Array.isArray(values) ? values : [...values]);
  const [index, setIndex] = useState<Wrapping>(
    new Wrapping({ max: valuesRef.current.length - 1 }, startIndex ?? 0)
  );

  const cycle = useCallback((steps?: number) => {
    setIndex((idx) => Wrapping.from(idx).add(steps ?? 1));
  }, []);

  return [valuesRef.current[index.value], cycle];
};
